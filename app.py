import asyncio
import itertools
import json
from websockets.asyncio.server import serve
from game import PLAYER1, PLAYER2, Game

# Taken from the documentation:
# For each connection, the handler() coroutine runs an infinite loop that 
# receives messages from the browser and prints them.
async def handler(websocket):
    game = Game()
    turns = itertools.cycle([PLAYER1, PLAYER2])
    player = next(turns)
    async for message in websocket:
        event = json.loads(message)
        response = {}
        print(event)
        
        if event["type"] == "reset":
            game.resetGame()
            turns = itertools.cycle([PLAYER1, PLAYER2])
            player = next(turns)
            response = {
                "type" : "reset" 
            }
            await websocket.send(json.dumps(response))
            continue
        
        victory = False
        if event["type"] == "play":
            try:
                cell = event["cell"]
                victory = game.selectCell(cell, player)
                response = {
                    "type" : "play",
                    "cell" : cell,
                    "player" : player
                }
                await websocket.send(json.dumps(response))
            except RuntimeError as exc:
                response = {
                    "type" : "error",
                    "message" : str(exc)
                }
                await websocket.send(json.dumps(response))
                continue
        
        if not (victory or game.placedMarks == 9):
            player = next(turns)
            continue
        
        winner = player if victory else None
        result = player if victory else "none"

        game.endGame(winner)

        response = {
            "type" : "result",
            "winner" : result,
            "p1_wins" : game.wins[0],
            "p2_wins" : game.wins[1]
        }
        await websocket.send(json.dumps(response))

async def main():
    async with serve(handler, "localhost", 8001) as server:
        await server.serve_forever()

if __name__ == "__main__":
    asyncio.run(main())