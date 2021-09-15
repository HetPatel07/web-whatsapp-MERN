import React, { useState } from "react";
import { Avatar, IconButton } from "@material-ui/core";
// import DonutLargeIcon from "@material-ui/icons/DonutLarge";
import SearchOutlinedIcon from "@material-ui/icons/SearchOutlined";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import EmojiEmotionsOutlinedIcon from "@material-ui/icons/EmojiEmotionsOutlined";
import AttachmentOutlinedIcon from "@material-ui/icons/AttachmentOutlined";
import MicOutlinedIcon from "@material-ui/icons/MicOutlined";
import axios from "./axios";
import "./MainChat.css";
// import SearchIcon from '@material-ui/icons/Search';

function Main({ messages }) {
  const [newMessage,setMessage] = useState("");

  const onSearch = async (e) => {
    e.preventDefault()
    console.log(newMessage)
    await axios.post("/messages/new",{
        name: "you",
        message: newMessage,
        timeStamp: "date",
        received: false
    })

    setMessage("")
  }
  
  const chat = messages.map((element) => (
    <div className={"mainChat_message w-fit-ontent py-6 " + (element.received ? "message_sender" : "")}>
      <span className="name text-white font-semibold">{element.name}</span>
      <div className="mainMessage flex p-2 rounded-md">
        <p className="mainMessage text-white text-sm">{element.message}</p>
        <span className="text-white text-xs ml-4 font-thin self-end">
          {new Date().toLocaleString()}
        </span>
      </div>  

    </div>
  ));

  return (
    <div className="mainChat flex flex-col">
      <div className="mainChat_header flex p-4 w-100 ">
        <Avatar
          alt="Het Patel"
          src="https://avatars.githubusercontent.com/u/44050446?v=4" 
        />
        <div className="mainChat_headerInfo flex-1 ml-4">
          <h2 className="text-gray-50 font-semibold">Room</h2>
          <p className="text-gray-500 text-sm font-medium">online</p>
        </div>
        <div className="sideBar_headerRight ">
          <IconButton>
            <SearchOutlinedIcon style={{ fill: "lightgrey" }} />
          </IconButton>

          <IconButton>
            <MoreVertIcon style={{ fill: "lightgrey" }} />
          </IconButton>
        </div>
      </div>
      <div className="mainChat_content flex-1 px-10 py-6 flex flex-col">

        {chat}
        
      </div>
      <div className="mainChat_footer flex px-4 py-2 w-100 ">
        <IconButton>
          <EmojiEmotionsOutlinedIcon style={{ fill: "lightgrey" }} />
        </IconButton>
        <IconButton>
          <AttachmentOutlinedIcon style={{ fill: "lightgrey" }} />
        </IconButton>
        <form action="" className="flex-1 flex chatForm">
          <input
            type="text"
            value = {newMessage}
            onChange = {e => {
              setMessage(e.target.value)
            }}
            placeholder="Type a message"
            className="w-100 flex-1 rounded-full px-4 py-2 text-white"
          />
          <button onClick={onSearch} type="submit">Send</button>
        </form>
        <IconButton>
          <MicOutlinedIcon style={{ fill: "lightgrey" }} />
        </IconButton>
      </div>
    </div>
  );
}

export default Main;
