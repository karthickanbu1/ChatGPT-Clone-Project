import './App.css';
import gptlogo from './assets/assets/chatgpt.svg';
import addBtn from './assets/assets/add-30.png';
import msgIcon from './assets/assets/message.svg';
import home from './assets/assets/home.svg';
import saved from './assets/assets/bookmark.svg';
import rocket from './assets/assets/rocket.svg';
import sendBtn from './assets/assets/send.svg';
import userIcon from './assets/assets/user-icon.png';
import gptImgLogo from './assets/assets/chatgptLogo.svg';
import { sendMsgToOpenAI } from './openai';
import { useState, useEffect, useRef } from 'react';

function App() {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([
    { text: "Hi! I'm ChatGPT. How can I help you today?", isBot: true }
  ]);

  const chatContainerRef = useRef(null);

  const handleSend = async (customInput) => {
    const userInput = customInput || input;
    if (userInput.trim() === '') return;

    setMessages(prev => [...prev, { text: userInput, isBot: false }]);
    setInput('');

    const res = await sendMsgToOpenAI(userInput);

    setMessages(prev => [...prev, { text: res, isBot: true }]);
  };

  const handleNewChat = () => {
    setMessages([
      { text: "Hi! I'm ChatGPT. How can I help you today?", isBot: true }
    ]);
    setInput('');
  };

  const handleQuickPrompt = (prompt) => {
    setInput(prompt);
    handleSend(prompt);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  useEffect(() => {
    chatContainerRef.current?.scrollTo({
      top: chatContainerRef.current.scrollHeight,
      behavior: 'smooth'
    });
  }, [messages]);

  return (
    <div className="App">
      {/* Sidebar */}
      <div className="sidebar">
        <div>
          <div className="logo">
            <img src={gptlogo} alt="Logo" className="logo" />
            <span className="brand">ChatGPT</span>
          </div>
          <button onClick={handleNewChat}>+ New Chat</button>
          <button onClick={() => handleQuickPrompt("What is coding?")}>💬 What is coding?</button>
          <button onClick={() => handleQuickPrompt("How to use an API?")}>🔧 How to use an API?</button>
        </div>

        <div className="nav-bottom">
          <div className="listItems">
            <img src={home} alt="Home" className="listitemsImg" />
            Home
          </div>
          <div className="listItems">
            <img src={saved} alt="Saved" className="listitemsImg" />
            Save
          </div>
          <div className="listItems">
            <img src={rocket} alt="Upgrade" className="listitemsImg" />
            Upgrade to Pro
          </div>
        </div>
      </div>

      {/* Main Chat Section */}
      <div className="main">
        <div className="chats" ref={chatContainerRef}>
          {messages.map((message, i) => (
            <div key={i} className={message.isBot ? 'chat bot' : 'chat'}>
              <img
                className="chatimg"
                src={message.isBot ? gptImgLogo : userIcon}
                alt="icon"
              />
              <p className="txt">{message.text}</p>
            </div>
          ))}
        </div>

        <div className="chatfooter">
          <div className="inp">
            <input
              type="text"
              placeholder="Send a message"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            <button className="send" onClick={() => handleSend()}>
              <img src={sendBtn} alt="Send" />
            </button>
          </div>
          <p>ChatGPT version 122.22</p>
        </div>
      </div>
    </div>
  );
}

export default App;
