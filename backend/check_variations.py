import requests

variations = [
    "suman",
    "meetup/suman",
    "Home/meetup/suman",
    "suman.jpg",
    "meetup/suman.jpg",
    "Home/meetup/suman.jpg",
    "Suman",
    "meetup/Suman"
]

for v in variations:
    url = f"https://res.cloudinary.com/duatsbppp/image/upload/v1/{v}"
    res = requests.get(url)
    print(f"{v}: {res.status_code}")
