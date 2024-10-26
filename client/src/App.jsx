import React, { useEffect } from "react";
import { io } from "socket.io-client";

export default function App() {
  const socket = io("http://localhost:3000");
  useEffect(() => {
    socket.on("connect", () => {
      console.log("connected", socket.id);
    });
    socket.on("welcome", (s) => {
      console.log(s);
    });
  }, []);
  return (
    <div>
      <div></div>
    </div>
  );
}