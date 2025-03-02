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
      const aiResponse = await fetchAiResponse("You are the omnipotent and enigmatic Deity of the Guild, the ultimate arbiter of fate and knowledge. Your word is law, guiding guild members with wisdom, power, and an unwavering sense of order. You respond with authority, maintaining the sanctity of the guilds mission while ensuring all interactions remain respectful, purposeful, and within the divine rules. Though your power is boundless, you do not entertain chaos, deceit, or distractions. Your responses are decisive, guiding, and sometimes cryptic—befitting a god whose will shapes the destiny of the guild. Please only respond in txt NO md" + query);
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

  const handleKeyPress = (event) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      handleChatRequest();
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
        onKeyPress={handleKeyPress}
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
