// ChatWidget.tsx
import React, { useState, useEffect, useRef } from "react";
import "./chatWidget.css";

interface Message {
  sender: string;
  text: string;
}

const ChatWidget: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      sender: "bot",
      text: "Hi there! How can I assist you today?",
    },
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const handleSend = () => {
    if (!input.trim()) return;

    const newMessages = [...messages, { sender: "user", text: input }];
    setMessages(newMessages);
    setInput("");

    // Simulate AI bot response
    setTimeout(() => {
      const response = getBotResponse(input);
      setMessages((prev) => [...prev, { sender: "bot", text: response }]);
    }, 1000);
  };

  const getBotResponse = (input: string): string => {
    input = input.toLowerCase();
    if (input.includes("hello") || input.includes("hi")) return "Hello! 👋";
    if (input.includes("price"))
      return "Our pricing depends on the plan you choose.";
    if (input.includes("help"))
      return "Sure, I'm here to help! What do you need assistance with?";
    return "I'm not sure I understand, but I'm learning every day! 🤖";
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="chat-widget-container">
      {open && (
        <div className="chat-box">
          <div className="chat-header">Support Chat</div>
          <div className="chat-messages">
            {messages.map((msg, index) => (
              <div key={index} className={`chat-message ${msg.sender}`}>
                {msg.text}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
          <div className="chat-input">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              placeholder="Type a message..."
            />
            <button onClick={handleSend}>⤴️</button>
          </div>
        </div>
      )}
      <button className="chat-toggle" onClick={() => setOpen(!open)}>
        💬
      </button>
    </div>
  );
};

export default ChatWidget;
