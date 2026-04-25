import requests

url = "https://res.cloudinary.com/duatsbppp/image/upload/v1/meetup/suman"
res = requests.get(url)
print(f"Status for meetup/suman: {res.status_code}")

url2 = "https://res.cloudinary.com/duatsbppp/image/upload/v1/Home/meetup/suman"
res2 = requests.get(url2)
print(f"Status for Home/meetup/suman: {res2.status_code}")
