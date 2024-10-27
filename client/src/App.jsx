import React, { useEffect, useMemo, useState } from "react";
import { Socket, io } from "socket.io-client";

export default function App() {
  const [message, setMessage] = useState("");

  const socket = useMemo(() => io("http://localhost:3000"), []);
  useEffect(() => {
    socket.on("connect", () => {
      console.log("connected", socket.id);
    });
    socket.on("welcome", (s) => {
      console.log(s);
    });
    socket.on("recieve-message", (data) => {
      console.log(data);
    });
    return () => {
      socket.disconnect();
    };
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    socket.emit("message", message);
    setMessage("");
  };
  return (
    <div>
      <h1>welcome to chat app</h1>
      <div>
        <form action="" onSubmit={handleSubmit}>
          <input
            onChange={(e) => {
              setMessage(e.target.value);
            }}
            type="text"
          />
          <button>send</button>
        </form>
      </div>
    </div>
  );
}
