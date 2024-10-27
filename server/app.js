import express from "express";
import { Server } from "socket.io";
import { createServer } from "http"

const port = 3000;

const app = express();
const server = createServer(app);
const io = new Server(server, {
    cors: {
        origin: "http://localhost:5173",
        methods: ["GET", "POST"],
        credentials: true
    }
});

app.get("/", (req, res) => {
    res.send("hello world")
})

io.on("connection", (socket) => {
    console.log("user connected", socket.id);

    // socket.emit("welcome", `welcome to the server: ${socket.id}`)
    // socket.broadcast.emit("welcome", `${socket.id} joined the server`)

    socket.on("message", (data) => {
        console.log(data);
        // io.emit("recieve-message", data)    //sending messages to everyone
        socket.broadcast.emit("recieve-message", data)    //sending messages to everyone except himself
    })

    socket.on("disconnect", () => {
        console.log("user disconnected", socket.id);
    })
})

server.listen(port, () => {
    console.log(`server is running on port ${port}`);
})