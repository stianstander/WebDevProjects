import socket

lang = input("If you are German type - de, or French type - fr and English - en: ")

client = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
client.connect(("localhost", 5555))

while True:
    message = input("")
    if message == "!q":
        client.close()
        break
    else:
        client.send(f"[{lang}]{message}".encode())
