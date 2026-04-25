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

try:
    resources = cloudinary.api.resources(type="upload", max_results=50)
    print("Found resources:")
    for res in resources.get('resources', []):
        print(f"Public ID: {res['public_id']}, URL: {res['secure_url']}")
except Exception as e:
    print(f"Error: {e}")
