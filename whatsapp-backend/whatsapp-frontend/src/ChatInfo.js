import React from 'react'
import { Avatar } from '@material-ui/core'

function ChatInfo() {
    return (
        <div className="sideBar_chatInfo">
                <div class="p-4 mx-auto flex items-center space-x-4">
                    <div className="flex-initial">
                        <Avatar alt="Het Patel" src="https://avatars.githubusercontent.com/u/44050446?v=4" />
                    </div>
                    <div className="chatInfo_right flex-auto pb-2">
                        <div class="text-xl font-medium text-white">ChitChat</div>
                        <p class="text-gray-300">You have a new message!</p>
                    </div>
                </div>
            </div>
    )
}

export default ChatInfo
