import Messages from "./Messages";
import InputChat from "./InputChat";
import { ChatContext } from "../Context/ChatContext";
import React, { useContext } from "react";
function Chat() {
  const { data } = useContext(ChatContext);
  return (
    <div className="chat">
      <div className="chatInfo">
      <span>{data.user?.displayName}</span>
        <div className="chatIcons">
          {/* <img
            src="https://www.clipartmax.com/png/middle/57-572154_video-camera-svg-png-icon-free-download-video-cam-icon-outline-png.png"
            alt=""
          />
          <img
            src="https://www.pngfind.com/pngs/m/678-6781804_add-people-person-add-icon-png-transparent-png.png"
            alt=""
          />
          <img
            src="https://cdn-icons-png.flaticon.com/512/16/16073.png"
            alt=""
          /> */}
        </div>
      </div>
      <Messages />
      <InputChat />
    </div>
  );
}
export default Chat;
