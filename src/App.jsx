import React, { useState, useEffect, useRef } from "react";
import "./chat-ui_App.css";

const INITIAL_MESSAGES = [
  {
    id: "1",
    sender: "bot",
    text: "Hello! I am EchoBot, your AI Assistant demo. How can I help you today?",
    timestamp: "10:00 AM"
  }
];

const QUICK_PROMPTS = [
  "What features do you support?",
  "Tell me a programming joke!",
  "How was this chat UI built?",
  "Clear chat history"
];

const BOT_RESPONSES = {
  "What features do you support?": "I support simulated bot auto-replies, auto-scrolling message streams, real-time typing indicators, and message timestamps!",
  "Tell me a programming joke!": "Why do programmers prefer dark mode? Because light attracts bugs! 🐛",
  "How was this chat UI built?": "Built using React (Vite) hooks like useState, useEffect, and useRef with pure CSS styling!",
};

export default function App() {
  const [messages, setMessages] = useState(() => {
    const saved = localStorage.getItem("chat_ui_messages");
    return saved ? JSON.parse(saved) : INITIAL_MESSAGES;
  });

  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    localStorage.setItem("chat_ui_messages", JSON.stringify(messages));
    scrollToBottom();
  }, [messages, isTyping]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const getFormattedTime = () => {
    return new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  const handleSendMessage = (textToSend = null) => {
    const text = textToSend || input;
    if (!text.trim()) return;

    if (text === "Clear chat history") {
      setMessages([]);
      setInput("");
      return;
    }

    const userMsg = {
      id: Date.now().toString(),
      sender: "user",
      text: text.trim(),
      timestamp: getFormattedTime()
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInput("");
    setIsTyping(true);

    // Simulate Bot Response with delay
    setTimeout(() => {
      let replyText = BOT_RESPONSES[text.trim()];
      if (!replyText) {
        replyText = `Echo: "${text.trim()}". I received your message loud and clear! 🚀`;
      }

      const botMsg = {
        id: (Date.now() + 1).toString(),
        sender: "bot",
        text: replyText,
        timestamp: getFormattedTime()
      };

      setMessages((prev) => [...prev, botMsg]);
      setIsTyping(false);
    }, 1200);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="chat-app">
      <div className="chat-container">
        {/* Header */}
        <header className="chat-header">
          <div className="bot-info">
            <div className="bot-avatar">🤖</div>
            <div>
              <h2>EchoBot AI</h2>
              <span className="status-indicator">
                <span className="dot"></span> Online
              </span>
            </div>
          </div>
          <button className="clear-btn" onClick={() => handleSendMessage("Clear chat history")}>
            Clear Chat
          </button>
        </header>

        {/* Message Stream */}
        <div className="messages-area">
          {messages.length === 0 ? (
            <div className="empty-chat">No messages yet. Send a message to start!</div>
          ) : (
            messages.map((msg) => (
              <div key={msg.id} className={`message-wrapper ${msg.sender}`}>
                {msg.sender === "bot" && <div className="msg-avatar">🤖</div>}
                <div className="message-bubble">
                  <p className="message-text">{msg.text}</p>
                  <span className="message-time">{msg.timestamp}</span>
                </div>
                {msg.sender === "user" && <div className="msg-avatar user-avatar">👤</div>}
              </div>
            ))
          )}

          {isTyping && (
            <div className="message-wrapper bot">
              <div className="msg-avatar">🤖</div>
              <div className="message-bubble typing-indicator">
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Quick Suggestions */}
        <div className="quick-prompts">
          {QUICK_PROMPTS.map((prompt) => (
            <button key={prompt} className="prompt-pill" onClick={() => handleSendMessage(prompt)}>
              {prompt}
            </button>
          ))}
        </div>

        {/* Input Bar */}
        <div className="input-area">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type a message... (Press Enter to send)"
            rows="1"
            className="chat-textarea"
          />
          <button
            onClick={() => handleSendMessage()}
            className="send-btn"
            disabled={!input.trim()}
          >
            Send ➔
          </button>
        </div>
      </div>
    </div>
  );
}
