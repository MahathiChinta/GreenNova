import React, { useState } from 'react';
import assistantApi from '../utils/assistantApi';

export default function GreenNovaAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const newMessages = [...messages, { from: 'user', text: input }];
    setMessages(newMessages);
    setInput('');
    setLoading(true);

    try {
      const reply = await assistantApi.ask(input);
      setMessages(prev => [...prev, { from: 'bot', text: reply }]);
    } catch (err) {
      console.error(err);
      setMessages(prev => [...prev, { from: 'bot', text: "Sorry, I couldn't process that." }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 bg-emerald-600 text-white p-4 rounded-full shadow-lg hover:bg-emerald-700 transition"
        >
          💬
        </button>
      )}

      {isOpen && (
        <div className="fixed bottom-6 right-6 w-96 bg-white rounded-lg shadow-lg flex flex-col border">
          <div className="bg-emerald-600 text-white p-3 flex justify-between items-center rounded-t-lg">
            <span>🌱 GreenNova Assistant</span>
            <button onClick={() => setIsOpen(false)}>✖</button>
          </div>
          <div className="flex-1 overflow-y-auto p-3 space-y-2">
            {messages.map((m, i) => (
              <div key={i} className={m.from === 'user' ? 'text-right' : 'text-left'}>
                <span className={`inline-block p-2 rounded-lg ${m.from === 'user' ? 'bg-emerald-100' : 'bg-gray-100'}`}>
                  {m.text}
                </span>
              </div>
            ))}
            {loading && <div className="text-gray-500">Thinking...</div>}
          </div>
          <div className="p-3 border-t flex gap-2">
            <input
              className="flex-1 border rounded px-2"
              value={input}
              onChange={e => setInput(e.target.value)}
              placeholder="Ask me anything..."
              onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
            />
            <button className="bg-emerald-600 text-white px-3 rounded" onClick={sendMessage}>Send</button>
          </div>
        </div>
      )}
    </div>
  );
}
