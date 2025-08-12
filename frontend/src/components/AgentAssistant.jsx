// frontend/src/components/AgentAssistant.jsx
import React, { useState } from "react";
import api from "../utils/api";

export default function AgentAssistant() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");

    try {
      const res = await api.post("/assistant", { message: input });
      const botMessage = { role: "assistant", content: res.data.reply };
      setMessages((prev) => [...prev, botMessage]);
    } catch (err) {
      console.error("Assistant error:", err);
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "Error connecting to assistant." },
      ]);
    }
  };

  return (
    <div className="bg-white rounded shadow p-4">
      <h3 className="font-medium mb-2">GreenNova Assistant</h3>
      <div className="border p-2 h-48 overflow-y-auto">
        {messages.map((m, i) => (
          <div
            key={i}
            className={`my-1 p-1 rounded ${
              m.role === "user" ? "bg-green-100" : "bg-gray-100"
            }`}
          >
            {m.content}
          </div>
        ))}
      </div>
      <div className="mt-2 flex">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="border p-1 flex-grow rounded-l"
          placeholder="Type your message..."
        />
        <button
          onClick={sendMessage}
          className="bg-green-600 text-white px-3 rounded-r"
        >
          Send
        </button>
      </div>
    </div>
  );
}
