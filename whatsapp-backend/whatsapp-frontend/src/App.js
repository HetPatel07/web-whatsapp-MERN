import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import "./App.css";
import MainChat from "./MainChat";
import Pusher from "pusher-js";
import axios from "./axios";

function App() {

  const [messages,setMessages] = useState([])
  useEffect(() => {
    axios.get("/messages/sync")
    .then((res) => {
      // console.log(res.data)
      setMessages(res.data)
    })
  }, []);

  useEffect(() => {
    const pusher = new Pusher("9ef64557a83c05270202", {
      cluster: "ap2",
    });

    const channel = pusher.subscribe("messages");
    channel.bind("inserted", function (data) {
      // alert(JSON.stringify(data));
      setMessages([...messages,data])
      // console.log("hello world")
    });
    return () => {
      channel.unbind_all()
      channel.unsubscribe()
    }
  }, [messages]);

  console.log(messages)
  return (
    <div className="main rounded-full">
      <Sidebar />
      <MainChat messages = {messages}/>
      {/* <div className="mainChat">This is main chat</div> */}
    </div>
  );
}

export default App;
