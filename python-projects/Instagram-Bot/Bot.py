import random
from instagrapi import Client

with open("credentials.txt", "r") as f:
    username, password = f.read().splitlines()

client = Client()
client.login(username, password)

hashtag = "vegan"
comments = ["I like steak", "Who likes meat?", "Meat!"]

medias = client.hashtag_medias_recent(hashtag, 20)

for i, media in enumerate(medias):
    client.media_like(media.id)
    print(f"Liked post number {i+1} of hashtag {hashtag}")
    if i % 5 == 0:
        client.user_follow(media.user.pk)
        print(f"Followed user {media.user.username}")
        client.media_comment(media.id, "Cute")
        comment = media.choice(comments)
        print(f"Commented {comment} under post number {i+1}")