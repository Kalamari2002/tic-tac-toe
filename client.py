import asyncio
import websockets
from dotenv import load_dotenv
import os

load_dotenv()

HOST = os.getenv('HOST')
PORT = os.getenv('PORT')

async def hello():
    uri = f"ws://{HOST}:{PORT}"
    async with websockets.connect(uri) as websocket:
        name = input("Name: ")

        await websocket.send(name)
        print(f'Client sent: {name}')

        greeting = await websocket.recv()
        print(f"Client received: {greeting}")

if __name__ == "__main__":
    asyncio.run(hello())