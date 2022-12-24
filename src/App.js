import "./App.css";
import SideBar from "./components/SideBar.js";
import bootstrap from "bootstrap";
import sendLogo from "./assets/send.svg";
import bot from "./assets/bot.svg";
import user from "./assets/user.svg";
import { useRef, useEffect } from "react";



function App() {
  const formRef = useRef(null);
  const chatContainerRef = useRef(null);
  const messageDivRef = useRef(null);

  useEffect(() => {
    // you can now use the `formRef` variable to access the form element
    const form = formRef.current;
    const chatContainer = chatContainerRef.current;
    const messageDiv = messageDivRef.current;
    
    form.addEventListener("submit",handleSubmit);
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
      form.removeEventListener('submit', handleSubmit);
    };
  }, []);

  let loadInterval;
  // Function for loading animation of bot
  function loader(element) {
    element.textContent = "";
    loadInterval = setInterval(() => {
      element.textContent += ".";
      if (element.textContent === "....") {
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
  // Function for generating chatstripe
  function chatStripe(isAi, value, uniqueId) {
    return `
      <div className = "wrapper ${isAi && "ai"}">
      <div className = "chat">
        <div className = "profile">
        <img src = "${isAi ? bot : user}" alt = "${isAi ? "bot" : "user"}"/>
        
        </div>
        <div className = "message" id = ${uniqueId}>${value}</div>
      </div>

      </div>
      `;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = formRef.current;
    
    


    const data = new FormData(form);

    // user's chat stripe
    const chatContainer = chatContainerRef.current;
    chatContainer.innerHTML += chatStripe(false, data.get("prompt"));

    form.reset();

    // ai's chat stripes
    const uniqueId = generateUniqueId();
    const messageDiv = document.getElementById(uniqueId);
    chatContainer.innerHTML += chatStripe(true, " ", uniqueId);

    chatContainer.scrollTop = chatContainer.scrollHeight;

    
    
    loader(messageDiv);
  };

  return (
    <>
      <div id = "app">
        {/* <header className="App-header">
          <p>ChatGPT Hindi</p>
        </header> */}
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
        </div>
      </div>
    </>
  );
}

export default App;
