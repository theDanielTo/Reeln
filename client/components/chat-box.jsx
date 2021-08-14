import React, { useState } from 'react';

export default function Chatbox(props) {
  const [messages, setMessages] = useState(['test', 'msg1', 'msg2']);
  const [chatInput, setChatInput] = useState('');

  function handleChatInputChange(e) {
    setChatInput(chatInput => e.target.value);
  }

  function displayMsgs() {
    return messages.map(msg => {
      return (
        <p key={msg}>{msg}</p>
      );
    });
  }

  function sendMsg(e) {
    e.preventDefault();
    setMessages(prevMsgs => [...prevMsgs, chatInput.value]);
  }

  return (
    <div className="chat-container">
      <div className="messages-container">
        {displayMsgs()}
      </div>
      <form onSubmit={sendMsg} className="chat-input-row">
        <label htmlFor="chatInput">
          <i className="fas fa-plus-circle" />
        </label>
        <input type="text" className="border-none"
          id="chat-input" name="chatInput"
          onChange={handleChatInputChange} />
        <button type="submit"
          id="chat-send-button" className="border-none">
          Send
        </button>
      </form>
    </div>
  );

}
