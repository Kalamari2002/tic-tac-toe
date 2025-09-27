import asyncio
import json
from websockets.asyncio.server import serve

# Taken from the documentation:
# For each connection, the handler() coroutine runs an infinite loop that 
# receives messages from the browser and prints them.
async def handler(websocket):
    async for message in websocket:
        print(message)
        await websocket.send(json.dumps({"MARCO" : "POLO"}))

async def main():
    async with serve(handler, "localhost", 8001) as server:
        await server.serve_forever()

if __name__ == "__main__":
    asyncio.run(main())