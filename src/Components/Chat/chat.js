import React, { useState, useEffect } from 'react';
import { io } from 'socket.io-client';

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [socket, setSocket] = useState(null);
  const [myValues, setMyValues] = useState([]);

  useEffect(() => {
    const newSocket = io("http://localhost:3002");
    setSocket(newSocket);

    newSocket.on('initial messages', (msgs) => {
      setMessages(msgs.map(msg => msg.content));
    });

    newSocket.on('chat message', (msg) => {
      setMessages(prevMessages => [...prevMessages, msg]);
    });

    newSocket.on("ShowTyping", () => {
      setIsTyping(true);
    });

    newSocket.on("StopTyping", () => {
        setTimeout(() => {
            setIsTyping(false);
        }, 1800);
    });

    return () => {
      newSocket.off('chat message');
      newSocket.off("ShowTyping");
      newSocket.off("StopTyping");
      newSocket.disconnect();
    };
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputValue) {
      socket.emit('chat message', inputValue);
      setInputValue('');
      setMyValues(prevValues => [...prevValues, inputValue]);
    }
  };

  const handleTyping = () => {
    socket.emit("typing");
  };

  const handleStopTyping = () => {
    socket.emit("stop-typing");
  };

  return (
    <div>
      <ul id="messages">
        {messages.map((msg, index) => (
          <li key={index}>{msg}</li>
        ))}
      </ul>
      {isTyping && <span id="span-typing">userTyping</span>}
      <form id="form" onSubmit={handleSubmit}>
        <input 
          id="input" 
          autoComplete="off" 
          value={inputValue} 
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleTyping}
          onKeyUp={handleStopTyping}
          />
        <button type="submit">Send</button>
          <ul>
        {myValues.map((value, index) => (
          <li key={index}>{value}</li>
        ))}
      </ul>
      </form>
    </div>
  );
};

export default Chat;
