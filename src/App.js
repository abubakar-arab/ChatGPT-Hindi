import "./App.css";
import SideBar from "./components/SideBar.js";
import bootstrap from "bootstrap";
import sendLogo from "./assets/send.svg"




function App() {
  let loadInterval;
  // Function for loading animation of bot
  function loader(element){
    element.textContent = "";
    loadInterval = setInterval(() => {
      element.textContent += ".";
      if(element.textContent === "...."){
        element.textContent = "";
      }
    }, 300)
  }
  // Function for typing animation of bot
  function typeText(element, text){
    let index = 0;
    let interval = setInterval(()=>{
      if(index<text.length){
        element.innerHTML += text.charAt(index);

      }else{
        clearInterval(interval);
      }
    },20)

  }

  return (
    <>
      <div className="app">
        {/* <header className="App-header">
          <p>ChatGPT Hindi</p>
        </header> */}
        <div className="chat_container">
          <form>
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
