import "./App.css";
import axios from "axios";
import Typing from "./components/Typing";
import bootstrap from "bootstrap";
import sendLogo from "./assets/send.svg";
import { useRef, useEffect, useState } from "react";
import bot from "./assets/bot.svg";
import user from "./assets/user.svg";

function App() {
  const [input, setInput] = useState("");
  const [chatLog, setChatLog] = useState([
    {
      user: "me",
      message: "Hi Chatbot, I am Abu",
    },
    {
      user: "gpt",
      message: "Hi Abu, How can I help you today?",
    },
  ]);
  function clearChat() {
    setChatLog([]);
  }

  const formRef = useRef(null);
  const chatContainerRef = useRef(null);

  let loadInterval;
  // Function for loading animation of bot
  function loader(element) {
    element.textContent = " ";
    loadInterval = setInterval(() => {
      element.textContent += ".";
      if (element.textContext === "....") {
        element.textContent = "";
      }
    }, 300);
  }
  // Function for typing animation of bot
  function typeText(element, text) {
    let index = 0;
    let interval = setInterval(() => {
      if (index < text.length) {
        element.innerHTML += text.charAt(index);
      } else {
        clearInterval(interval);
      }
    }, 20);
  }
  // Function for generating unique id
  function generateUniqueId() {
    const timestamp = Date.now();
    const randomNumber = Math.random();
    const hexadecimalString = randomNumber.toString(16);

    return `id-${timestamp}-${hexadecimalString}`;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    let chatLogNew = [...chatLog, { user: "me", message: `${input}` }];
    await setInput("");
    setChatLog(chatLogNew);
    //fetch data from the server
    const messages = chatLogNew.map((message) => message.message).join("\n");
    const response = await fetch("http://localhost:5000", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message: messages,
      }),
    });

    const data = await response.json();
    await setChatLog([
      ...chatLogNew,
      { user: "gpt", message: `${data.message}` },
    ]);
  };

  return (
    <>
      <div className="App">
        <aside className="sidemenu">
          <div className="side-menu-button" onClick={clearChat}>
            <span>+</span>
            New Chat
          </div>
        </aside>
        <section className="chatbox" ref={chatContainerRef}>
          <div className="fixed-chat-box">
            <div className="chat-log">
              {chatLog.map((message, index) => (
                <ChatMessage
                  key={index}
                  message={message}
                  chatLog={chatLog}
                  setChatLog={setChatLog}
                />
              ))}
            </div>
          </div>

          <div className="chat-input-holder">
            <form className="form" ref={formRef} onSubmit={handleSubmit}>
              <input
                className="chat-input-text-area"
                name="prompt"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                rows="1"
              ></input>
              <button type="submit">
                <img src={sendLogo} alt="Send" />
              </button>
            </form>
            <div className="footer">
              A ChatGPT clone developed by{" "}
              <a href="https://github.com/abubakar-arab">Abubakar Arab</a>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

const ChatMessage = ({ message, chatLog, setChatLog }) => {
  // Function to translate a message to Hindi
  const translateToHindi = async (message) => {
    const encodedParams = new URLSearchParams();
    encodedParams.append("q", message);
    encodedParams.append("target", "hi");
    encodedParams.append("source", "en");
    const options = {
      method: "POST",
      url: "https://google-translate1.p.rapidapi.com/language/translate/v2",
      headers: {
        "content-type": "application/x-www-form-urlencoded",
        "X-RapidAPI-Key": "5a5aa87e8bmshb1f4d88e4a07574p1b6a40jsn149f9c1f4619",
        "X-RapidAPI-Host": "google-translate1.p.rapidapi.com",
      },
      data: encodedParams,
    };
    try {
      const { data } = await axios.post(options.url, encodedParams, { headers: options.headers });
      return data.data.translations[0].translatedText;
    } catch (error) {
      console.error(error);
    }
  };
  // Handles translation of message
  const handleTranslate = async (message) => {
    const translatedMessage = await translateToHindi(message);
    console.log(`translatedMessage,${translatedMessage}`)
    const newChatLog = [...chatLog, {
      user: "gpt",
      message: translatedMessage,
    }];
    // console.log(newChatLog)
    // setChatLog(newChatLog);
    // console.log(...chatLog);
    
  };
  return (
    <div className={`chat-message ${message.user === "gpt" && "chatgpt"}`}>
      <div className="chat-message-center">
        <div className={`avatar ${message.user === "gpt" && "chatgpt"}`}>
          <img
            className={"pic"}
            src={message.user === "gpt" ? bot : user}
            alt=""
          />
        </div>
        <div className="message">
          {" "}
          {message.user === "gpt" ? (
            <>
              <Typing text={message.message} typingSpeed={20} />
              <button onClick={() => handleTranslate(message.message)}>
                Translate in Hindi
              </button>
            </>
          ) : (
            message.message
          )}
        </div>
      </div>
    </div>
  );
};

export default App;
