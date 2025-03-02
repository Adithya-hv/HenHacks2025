import React, { useState } from "react";
import { fetchAiResponse } from "./ai_service";

const AiPageDefault = () => {
  const [query, setQuery] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChatRequest = async () => {
    if (!query.trim()) return;
    setLoading(true);
    setError("");

    try {
      const aiResponse = await fetchAiResponse(query);
      const responseText = aiResponse || "No response received.";

      // Update chat history
      setChatHistory((prevHistory) => [
        ...prevHistory,
        { user: query, bot: responseText },
      ]);
      setQuery(""); // Clear input after sending
    } catch (error) {
      setError("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="chat-window">
      <h1>Your God</h1>
      <p>Ask me anything!</p>

      {/* Chat History */}
      {chatHistory.length > 0 && (
        <div className="chat-history">
          {chatHistory.map((chat, index) => (
            <div key={index} className="p-2 border-b">
              <p>
                <strong>User:</strong> {chat.user}
              </p>
              <p>
                <strong>God:</strong> {chat.bot}
              </p>
            </div>
          ))}
        </div>
      )}

      <textarea
        className="chat-box"
        placeholder="Ask your God anything..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      <button
        className="chat-box-send"
        onClick={handleChatRequest}
        disabled={loading || !query.trim()}
      >
        {loading ? "..." : "↑"}
      </button>

      {/* Error Handling */}
      {error && <div style={{ color: "red" }}>{error}</div>}
    </main>
  );
};

export default AiPageDefault;
