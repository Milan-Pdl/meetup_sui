from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from motor.motor_asyncio import AsyncIOMotorClient
from datetime import datetime, timezone
from dotenv import load_dotenv
from cloudinary_helper import get_all_friend_urls
from urllib.parse import urlparse
import json
import os, random

load_dotenv(dotenv_path=os.path.join(os.path.dirname(__file__), '..', '.env'))

app = FastAPI(title="Chaotic Meetup API", description="Where chaos meets friendship 💥")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

MONGO_URI = os.getenv("MONGO_CONNECTION_STRING", "mongodb://localhost:27017")

def normalize_mongo_uri(uri: str) -> str:
    """
    Convert mongodb+srv URI to regular mongodb URI as a DNS fallback.
    Some networks block SRV lookups, causing timeouts for Atlas URIs.
    """
    if not uri.startswith("mongodb+srv://"):
        return uri
    parsed = urlparse(uri)
    host = parsed.hostname or ""
    auth = ""
    if parsed.username and parsed.password:
        auth = f"{parsed.username}:{parsed.password}@"
    query = parsed.query
    sep = "&" if query else ""
    return f"mongodb://{auth}{host}/?{query}{sep}tls=true"

def make_client(uri: str) -> AsyncIOMotorClient:
    return AsyncIOMotorClient(
        uri,
        serverSelectionTimeoutMS=5000,
        connectTimeoutMS=5000,
        socketTimeoutMS=5000,
    )

client = make_client(MONGO_URI)
db = client["meetup"]
responses_col = db["responses"]
OFFLINE_QUEUE_PATH = os.path.join(os.path.dirname(__file__), "offline_submissions.jsonl")

# --- Funny roast banks ---
ROASTS = {
    "name": [
        "Okay {v}, your parents did their best.",
        "{v}? Bold name. Chaotic energy. We respect it.",
        "Ah yes, {v}. A legend in their own mind.",
        "{v} has entered the chat. God help us all.",
    ],
    "gender": [
        "Noted. The vibe checks out.",
        "Approved by the council. Welcome.",
        "Very valid. Very chaotic. We love it.",
    ],
    "favorite_food": [
        "{v}?? That's your answer?? Questionable taste but okay.",
        "Ah, a {v} person. We'll allow it.",
        "{v} — the choice of someone who has SEEN things.",
        "Classic {v} energy. The snack table has been notified.",
    ],
    "favorite_drink": [
        "{v}?? So that's how it's gonna be.",
        "A {v} drinker. The party has been warned.",
        "{v}. Solid choice from someone with zero chill.",
        "Note taken. We'll have {v} ready. Or not. Chaos decides.",
    ],
    "had_divorce": [
        "Drama detected. We love you anyway.",
        "Respect. You survived. That's enough.",
        "No judgment here. Just vibes.",
        "The lore deepens. We're intrigued.",
    ],
    "favorite_teacher": [
        "{v}? Legend. Absolute legend.",
        "Ah, {v}. The one who probably regrets meeting you. JK.",
        "{v} — a person who shaped the chaos you are today.",
        "Pour one out for {v}. They tried their best.",
    ],
    "samira_answer": [
        "{v}? Alright, see you there.",
        "Okay, {v} it is.",
    ],
}

def get_roast(field: str, value: str) -> str:
    bank = ROASTS.get(field, ["{v} — interesting choice."])
    template = random.choice(bank)
    return template.replace("{v}", value)

# --- Models ---
class MeetupResponse(BaseModel):
    name: str
    gender: str
    favorite_food: str
    favorite_drink: str
    had_divorce: bool
    samira_answer: str

class SubmitResponse(BaseModel):
    message: str
    roasts: dict
    id: str

# --- Routes ---
@app.get("/")
async def root():
    return {"message": "Chaotic Meetup API is alive. Buckle up. 🎢"}

@app.post("/api/submit", response_model=SubmitResponse)
async def submit_response(data: MeetupResponse):
    try:
        doc = data.model_dump()
        doc["submitted_at"] = datetime.now(timezone.utc)
        inserted_id = None
        try:
            # First try with the primary URI from .env
            result = await responses_col.insert_one(doc)
            inserted_id = str(result.inserted_id)
        except Exception:
            # Retry once with non-SRV fallback URI for DNS-restricted networks
            fallback_uri = normalize_mongo_uri(MONGO_URI)
            if fallback_uri != MONGO_URI:
                fallback_client = make_client(fallback_uri)
                fallback_db = fallback_client["meetup"]
                fallback_col = fallback_db["responses"]
                result = await fallback_col.insert_one(doc)
                inserted_id = str(result.inserted_id)
            else:
                raise

        roasts = {
            "name": get_roast("name", data.name),
            "gender": get_roast("gender", data.gender),
            "favorite_food": get_roast("favorite_food", data.favorite_food),
            "favorite_drink": get_roast("favorite_drink", data.favorite_drink),
            "had_divorce": get_roast("had_divorce", str(data.had_divorce)),
            "samira_answer": get_roast("samira_answer", data.samira_answer),
        }
        return SubmitResponse(
            message="You're in. Or at least we'll pretend you are. 😈",
            roasts=roasts,
            id=inserted_id or "unknown",
        )
    except Exception as e:
        # Keep data safe locally when Mongo is temporarily unreachable.
        fallback_doc = data.model_dump()
        fallback_doc["submitted_at"] = datetime.now(timezone.utc).isoformat()
        with open(OFFLINE_QUEUE_PATH, "a", encoding="utf-8") as f:
            f.write(json.dumps(fallback_doc) + "\n")
        raise HTTPException(status_code=500, detail=f"Database unreachable right now. Saved locally to retry later. ({str(e)})")

@app.get("/api/responses")
async def get_responses():
    try:
        docs = []
        async for doc in responses_col.find({}, {"_id": 0}):
            if "submitted_at" in doc and isinstance(doc["submitted_at"], datetime):
                doc["submitted_at"] = doc["submitted_at"].isoformat()
            docs.append(doc)
        return {"count": len(docs), "responses": docs}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Database went rogue. Classic. ({str(e)})")

@app.get("/api/health")
async def health():
    return {"status": "alive", "vibe": "chaotic", "event": "May 1 & 2, 2026"}

@app.get("/api/photos")
async def get_photos():
    """Returns Cloudinary URLs for all friend photos. Frontend falls back to blob if URL is None."""
    try:
        urls = get_all_friend_urls()
        return {"photos": urls, "ready": any(v is not None for v in urls.values())}
    except Exception as e:
        return {"photos": {}, "ready": False, "error": str(e)}
