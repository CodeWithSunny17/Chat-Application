import React, { useEffect, useMemo, useState } from "react";
import { Socket, io } from "socket.io-client";

export default function App() {
  const [message, setMessage] = useState("");
  const [room, setRoom] = useState("");
  const [socketId, setSocketId] = useState("");
  const [senderMessage, setSenderMessage] = useState("");
  const [recieverMessage, setRecieverMessage] = useState([]);
  console.log(recieverMessage);
  const socket = useMemo(() => io("http://localhost:3000"), []);
  useEffect(() => {
    socket.on("connect", () => {
      setSocketId(socket.id);
      console.log("connected", socket.id);
    });
    socket.on("welcome", (s) => {
      console.log(s);
    });
    socket.on("recieve-message", (data) => {
      // console.log(data);
      setRecieverMessage((recieverMessage) => [...recieverMessage, data]);
    });
    return () => {
      socket.disconnect();
    };
  }, []);

  const handleSubmit = (e) => {
    socket.emit("message", { message, room });

    setMessage("");
    e.preventDefault();
  };
  return (
    <div>
      <h1>welcome to chat app</h1>
      <div>
        <div className=""></div>
        <h4>Receiver</h4>
        <div className="flex flex-col">
          {recieverMessage?.map((m, i) => {
            return <span key={i}>{m}</span>;
          })}
        </div>
        <div className="">
          <h3>Sender: {socketId}</h3>
        </div>
        <form action="" onSubmit={handleSubmit}>
          <label htmlFor="">Message: </label>
          <input
            onChange={(e) => {
              setMessage(e.target.value);
            }}
            type="text"
          />
          <br />
          <label htmlFor="">Room: </label>
          <input
            onChange={(e) => {
              setRoom(e.target.value);
            }}
            type="text"
          />
          <br />
          <button>send</button>
        </form>
      </div>
    </div>
  );
}
