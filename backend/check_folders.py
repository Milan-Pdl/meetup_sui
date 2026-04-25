import cloudinary
import cloudinary.api
import os
from dotenv import load_dotenv

load_dotenv(dotenv_path=os.path.join(os.path.dirname(__file__), '..', '.env'))

cloudinary.config(
    cloud_name=os.getenv("CLOUDINARY_CLOUD_NAME"),
    api_key=os.getenv("CLOUDINARY_API_KEY"),
    api_secret=os.getenv("CLOUDINARY_API_SECRET"),
    secure=True,
)

def list_folders():
    try:
        result = cloudinary.api.subfolders("meetup")
        print("Folders in 'meetup':")
        for folder in result.get("folders", []):
            print(f"- {folder['name']}")
    except Exception as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    list_folders()
