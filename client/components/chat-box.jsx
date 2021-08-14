import React from 'react';

export default function Chatbox(props) {
  function displayMessage(msg) {

  }

  return (
    <div className="chat-container">
      <div className="messages-container">

      </div>
      <form onSubmit={displayMessage}>
        <label htmlFor="message-input"></label>
        <input type="text" id="message-input"/>
        <button type="submit" id="send-button">Send</button>
      </form>
    </div>
  );

}
