import cloudinary
import cloudinary.api
from dotenv import load_dotenv
import os

load_dotenv(dotenv_path=os.path.join(os.path.dirname(__file__), '..', '.env'))

cloudinary.config(
    cloud_name=os.getenv("CLOUDINARY_CLOUD_NAME"),
    api_key=os.getenv("CLOUDINARY_API_KEY"),
    api_secret=os.getenv("CLOUDINARY_API_SECRET"),
    secure=True,
)

friends = ["samyam", "uttam", "suman", "casey", "riley", "group", "kiran", "milan", "sudip"]
mapping = {}

for friend in friends:
    # Try meetup/{friend}/ as prefix
    prefix = f"meetup/{friend}/"
    res = cloudinary.api.resources(type="upload", prefix=prefix, max_results=1)
    items = res.get('resources', [])
    if items:
        mapping[friend] = items[0]['public_id']
    else:
        # Try without trailing slash just in case
        prefix = f"meetup/{friend}"
        res = cloudinary.api.resources(type="upload", prefix=prefix, max_results=1)
        items = res.get('resources', [])
        if items:
            mapping[friend] = items[0]['public_id']

print("MAPPING_START")
for k, v in mapping.items():
    print(f"{k}:{v}")
print("MAPPING_END")
