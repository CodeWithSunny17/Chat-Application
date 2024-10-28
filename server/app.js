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

    socket.on("message", ({ message, room }) => {
        console.log({ message, room });
        // io.emit("recieve-message", message)    //sending messages to everyone including you
        // socket.broadcast.emit("recieve-message", message)    //sending messages to everyone except yourself
        io.to(room).emit("recieve-message", message)    //sending message to specific/ a particular group of people
    })

    socket.on("disconnect", () => {
        console.log("user disconnected", socket.id);
    })
})

server.listen(port, () => {
    console.log(`server is running on port ${port}`);
})