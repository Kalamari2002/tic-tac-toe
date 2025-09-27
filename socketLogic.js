const socket = new WebSocket("ws://localhost:8001/");

export function receiveMoves(){
    socket.addEventListener("message", ({ data })=>{
        const event = JSON.parse(data);
        console.log(event);
    });
}

export function sendMoves(cell){
    console.log("Sending Moves...");
    const event = { type : "play", cell : cell };
    socket.send(JSON.stringify(event));
}
