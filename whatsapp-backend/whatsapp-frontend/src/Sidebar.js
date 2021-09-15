import React from 'react'
import { Avatar,IconButton } from '@material-ui/core'
import DonutLargeIcon from '@material-ui/icons/DonutLarge'
import ChatIcon from '@material-ui/icons/Chat'
import MoreVertIcon from '@material-ui/icons/MoreVert'
import SearchIcon from '@material-ui/icons/Search';
import './Sidebar.css'
import ChatInfo from './ChatInfo'

function Sidebar() {
    return (
        <div className="sideBar">
            <div className="sideBar_header p-4">
                <Avatar alt="Het Patel" src="https://avatars.githubusercontent.com/u/44050446?v=4" />
                <div className="sideBar_headerRight">
                    <IconButton>                        
                        <DonutLargeIcon  style={{fill: "lightgrey" }} />
                    </IconButton>
                    <IconButton>
                        <ChatIcon style={{fill: "lightgrey" }}/>
                    </IconButton>
                    <IconButton>
                        <MoreVertIcon style={{fill: "lightgrey" }}/>
                    </IconButton>
                </div>
            </div>
            <div className="sideBar_search px-4 py-2">
                <div className="inputMain flex w-full rounded-full p-2">
                    <SearchIcon className="flex-0 ml-4" fontSize="small"/>
                    <input type="text" className="flex-auto ml-6 bg-transparent text-white" placeholder="Search or start new chat"/>
                </div>
            </div>
            <ChatInfo />
            <ChatInfo />
            <ChatInfo />
            <ChatInfo />

        </div>
    )
}

export default Sidebar
