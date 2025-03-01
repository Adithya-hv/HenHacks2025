import asyncio
import websockets
import datetime


async def time(websocket, path):
    while True:
        now = datetime.datetime.utcnow().isoformat() + "Z"
        await websocket.send(f"Message from server at {now}")
        await asyncio.sleep(2)


async def main():
    async with websockets.serve(time, "localhost", 8080):
        print("WebSocket server is running on ws://localhost:8080")
        await asyncio.Future()  # Run forever


if __name__ == "__main__":
    asyncio.run(main())
