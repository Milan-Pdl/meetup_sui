import os
import sys
# Add current dir to path
sys.path.append(os.getcwd())

from cloudinary_helper import get_all_friend_urls
from dotenv import load_dotenv

load_dotenv(dotenv_path=os.path.join(os.path.dirname(__file__), '..', '.env'))

print("Cloudinary Config:")
print(f"Cloud Name: {os.getenv('CLOUDINARY_CLOUD_NAME')}")
print(f"API Key: {os.getenv('CLOUDINARY_API_KEY')}")

urls = get_all_friend_urls()
print("\nGenerated URLs:")
for key, url in urls.items():
    print(f"{key}: {url}")
