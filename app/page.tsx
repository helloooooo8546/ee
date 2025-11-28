"use client";

import { useState } from "react";

export default function Home() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  async function sendMessage() {
    const newMessages = [...messages, { role: "user", content: input }];
    setMessages(newMessages);

    const res = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ messages: newMessages }),
    });

    const data = await res.json();
    const reply = data.choices[0].message.content;

    setMessages([...newMessages, { role: "assistant", content: reply }]);
    setInput("");
  }

  return (
    <main style={{ padding: 20, maxWidth: 800, margin: "auto" }}>
      <h1>My Coding AI</h1>

      <div style={{ border: "1px solid #ccc", padding: 10, height: 400, overflowY: "auto", marginBottom: 20 }}>
        {messages.map((m, i) => (
          <div key={i} style={{ margin: "10px 0" }}>
            <b>{m.role}:</b> {m.content}
          </div>
        ))}
      </div>

      <input
        value={input}
        onChange={e => setInput(e.target.value)}
        style={{ width: "80%", padding: 10 }}
        placeholder="Ask me to write code..."
      />
      <button onClick={sendMessage} style={{ padding: 10, marginLeft: 10 }}>
        Send
      </button>
    </main>
  );
}
