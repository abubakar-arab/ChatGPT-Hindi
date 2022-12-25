import "./App.css";
import SideBar from "./components/SideBar.js";
import bootstrap from "bootstrap";
import sendLogo from "./assets/send.svg";
import { useRef, useEffect, useState } from "react";
import ChatStripe from "./components/ChatStripe";

function App() {
  const [chatStripes, setChatStripes] = useState([]);
  const [chatUserStripes, setChatUserStripes] = useState([]);
  const formRef = useRef(null);
  const chatContainerRef = useRef(null);
  const messageDivRef = useRef(null);

  useEffect(() => {
    // you can now use the `formRef` variable to access the form element
    const form = formRef.current;
    const chatContainer = chatContainerRef.current;
    const messageDiv = messageDivRef.current;

    form.addEventListener("submit", handleSubmit);
    // form.addEventListener("keyup", (e) => {
    //   if (e.keyCode === 13) {
    //     handleSubmit(e);
    //   }
    // });

    // add an event listener to the form element
    // form.addEventListener('submit',handleSubmit);

    // the returned function will be called when the component is unmounted
    return () => {
      // remove the event listener when the component is unmounted
      form.removeEventListener("submit", handleSubmit);
    };
  }, []);

  let loadInterval;
  // Function for loading animation of bot
  function loader(element) {
    element.textContent = "";
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
    const form = formRef.current;
    const data = new FormData(form);

    // user's chat stripe
    const chatContainer = chatContainerRef.current;
    // Add a new ChatStripe component to the chat container element
    const uniqueUserId = generateUniqueId();
    setChatUserStripes([
      ...chatUserStripes,
      <ChatStripe
        isAi={false}
        value={data.get("prompt")}
        uniqueId={uniqueUserId}
        key = {uniqueUserId}
      />,
    ]);

    form.reset();

    // ai's chat stripes
    const uniqueId = generateUniqueId();
    const messageDiv = document.getElementById(uniqueId);
    setChatStripes([
      ...chatStripes,
      <ChatStripe isAi={true} value="" uniqueId={uniqueId} key = {uniqueId}/>,
    ]);

    chatContainer.scrollTop = chatContainer.scrollHeight;
    loader(messageDiv);
  };

  return (
    <>
      <div id="app">
        <div id="chat_container" ref={chatContainerRef}>
          
          <form ref={formRef}>
            <textarea
              name="prompt"
              cols="1"
              rows="1"
              placeholder="Ask Codebuddy..."
            ></textarea>
            <button type="submit">
              <img src={sendLogo} alt="Send" />
            </button>
          </form>
          {chatUserStripes}
          {chatStripes}
        </div>
      </div>
    </>
  );
}

export default App;
