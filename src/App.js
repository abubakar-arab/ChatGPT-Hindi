import "./App.css";
import ChatGPT from "./components/ChatGPT";
import SideBar from "./components/SideBar.js";
import bootstrap from 'bootstrap';

function App() {
  return (
    <>
      <div className="App">
      <div className="sidebar">
          <SideBar/>
          </div>
        <header className="App-header">
          <p>ChatGPT Hindi</p>
          <ChatGPT />
        </header>
        
      </div>
    </>
  );
}

export default App;
