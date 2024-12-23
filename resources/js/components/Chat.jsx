import React, { useState, useEffect, useRef } from "react";
import axios from "../api";
import echo from "../echo"; 

const Chat = () => {
  const [messages, setMessages] = useState([]); 
  const [newMessage, setNewMessage] = useState(""); 
  const [sender, setSender] = useState(""); 
  const messagesEndRef = useRef(null); 


  useEffect(() => {
 
    const channel = echo.channel('chat');
    
    // Listen for new messages
    channel.listen('.MessageSent', (event) => {
      console.log('New message received:', event);
      setMessages(prevMessages => [...prevMessages, event.message]);
    });

    return () => {
      channel.stopListening('.MessageSent');
    };
  }, []);

  const fetchMessages = async () => {
    try {
      const response = await axios.get("/messages");
      console.log('Fetched messages:', response.data);
      setMessages(response.data);
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  };
  useEffect(() => {
    fetchMessages();
}, []);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const handleSend = async () => {
    if (!sender || !newMessage) {
      alert("Please enter your name and a message!");
      return;
    }

    try {
      const response = await axios.post("/send-message", { 
        sender, 
        message: newMessage 
      });
      setMessages(prevMessages => [...prevMessages, response.data]);
      setNewMessage("");
    } catch (error) {
      console.error("Error sending message:", error);
      alert("Failed to send message. Please try again.");
    }
  };
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  return (
    <div style={{ padding: "20px", maxWidth: "600px", margin: "auto" }}>
      <h2>Chat</h2>
      <div
        style={{
          border: "1px solid #ccc",
          padding: "10px",
          marginBottom: "10px",
          maxHeight: "300px",
          overflowY: "scroll",
          backgroundColor: "#f9f9f9",
          borderRadius: "5px",
        }}
      >
        {messages.map((msg, index) => (
          <div 
            key={msg.id || index} 
            style={{ 
              marginBottom: "10px",
              padding: "8px",
              backgroundColor: "#fff",
              borderRadius: "4px",
              boxShadow: "0 1px 2px rgba(0,0,0,0.1)"
            }}
          >
            <strong>{msg.sender}:</strong> {msg.message}
            <span style={{ fontSize: '0.8em', color: '#666', marginLeft: '8px' }}>
              {msg.created_at ? new Date(msg.created_at).toLocaleTimeString() : ''}
            </span>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <div style={{ display: "flex", gap: "10px" }}>
        <input
          type="text"
          placeholder="Your Name"
          value={sender}
          onChange={(e) => setSender(e.target.value)}
          style={{ 
            padding: "8px",
            borderRadius: "4px",
            border: "1px solid #ddd",
            flexGrow: "0.3"
          }}
        />
        <input
          type="text"
          placeholder="Type a message"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyPress={handleKeyPress}
          style={{ 
            padding: "8px",
            borderRadius: "4px",
            border: "1px solid #ddd",
            flexGrow: "1"
          }}
        />
        <button 
          onClick={handleSend} 
          style={{ 
            padding: "8px 16px",
            backgroundColor: "#007bff",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer"
          }}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat;