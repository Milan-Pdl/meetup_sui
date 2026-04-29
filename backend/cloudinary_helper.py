import cloudinary
import cloudinary.uploader
import cloudinary.api
import cloudinary.search
from dotenv import load_dotenv
import os

load_dotenv(dotenv_path=os.path.join(os.path.dirname(__file__), '..', '.env'))

cloudinary.config(
    cloud_name=os.getenv("CLOUDINARY_CLOUD_NAME"),
    api_key=os.getenv("CLOUDINARY_API_KEY"),
    api_secret=os.getenv("CLOUDINARY_API_SECRET"),
    secure=True,
)

# Mapping: friend key → Cloudinary folder name
FRIEND_FOLDERS = {
    "samyam": "meetup/samyam",
    "uttam": "meetup/uttam",
    "suman": "meetup/suman",
    # above three for the landing page with this image from cloudnary
    "cheena": "meetup/sudip",
    # cheena while asking name
    "sabina": "meetup/sabina",
    # sabina while asking food
    "sabina_audio": "meetup/sabina_audio",
    # audio for sabina's question
    "sudipp": "meetup/sudipp",
    # sudipp while asking drink
    "kiran": "meetup/kiran",
    # kiran while asking divorce
    "samira": "meetup/samira",
    # samira asking meetup place
    "samira_audio": "meetup/samira_audio",
    # audio that plays on samira's page
    "last": "meetup/last",
    # last while asking last question and making a poster
}

def get_transformed_url(public_id: str) -> str:
    """Generates an optimized face-cropped URL for a public_id."""
    return cloudinary.CloudinaryImage(public_id).build_url(
        width=400,
        height=400,
        crop="fill",
        gravity="face",
        quality="auto",
        fetch_format="auto",
        secure=True
    )

def get_all_friend_urls() -> dict:
    """Dynamically finds the latest image in each friend's folder."""
    urls = {}
    try:
        # Fetch all resources in the meetup folder recursively
        # We use asset_folder filter to be precise
        for key, folder in FRIEND_FOLDERS.items():
            result = cloudinary.Search().expression(f"folder:{folder}/*").sort_by("created_at", "desc").max_results(1).execute()
            resources = result.get("resources", [])
            if resources:
                # Use the public_id from the result
                public_id = resources[0]["public_id"]
                resource_type = resources[0].get("resource_type", "image")
                
                if resource_type == "video" or key == "samira_audio" or key == "sabina_audio":
                    urls[key] = cloudinary.CloudinaryVideo(public_id).build_url(secure=True)
                else:
                    urls[key] = get_transformed_url(public_id)
            else:
                urls[key] = None
    except Exception as e:
        print(f"Cloudinary search error: {e}")
        return {key: None for key in FRIEND_FOLDERS}
    
    return urls
