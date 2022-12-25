import React from "react";
import bot from "../assets/bot.svg";
import user from "../assets/user.svg";

function ChatStripe(props) {
  const { isAi, value, uniqueId } = props;

  return (
    <div className={`wrapper ${isAi && "ai"}`}>
      <div className="chat">
        <div className="profile">
          <img src={isAi ? bot : user} alt={isAi ? "bot" : "user"} />
        </div>
        <div className="message" id={uniqueId}>
          {value}
        </div>
      </div>
    </div>
  );
}

export default ChatStripe;
// ALTERNATE WAY Function for generating chatstripe, Paste it in App.js to make it work.
//  function chatStripe(isAi, value, uniqueId) {
//     return `
//       <div class = "wrapper ${isAi && "ai"}">
//       <div class = "chat">
//         <div class = "profile">
//         <img src = "${isAi ? bot : user}" alt = "${isAi ? "bot" : "user"}"/>

//         </div>
//         <div class = "message" id = ${uniqueId}>${value}</div>
//       </div>

//       </div>
//       `;
//   }
