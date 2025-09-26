import asyncio
import websockets
from dotenv import load_dotenv
import os

load_dotenv()

HOST = os.getenv('HOST')
PORT = os.getenv('PORT')

async def test(websocket):
    name = await websocket.recv()
    print(f'Received: {name}')

    await websocket.send(f'Hello, {name}')

async def main():
    async with websockets.serve(test, HOST, 8765): #8765 is a standard port for websockets
        await asyncio.Future() # run forever

if __name__ == "__main__":
    asyncio.run(main())