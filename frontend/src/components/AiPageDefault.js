import React, { useState } from "react";
import { getAIResponse } from "./api_service";

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
      const aiResponse = await getAIResponse(
        " SO your an all knowing genie at a guild and people come to you with questions and you answer them you dont really grant wishes but you give people knowledge also its medivel europe and your answers are like 3lines long, Please only respond in text NO md" +
          query
      );
      const responseText = aiResponse || "No response received.";

      // Update chat history
      setChatHistory((prevHistory) => [
        ...prevHistory,
        { user: query, bot: responseText },
      ]);
      setQuery(""); // Clear input after sending
    } catch (error) {
      console.error("Error fetching AI response:", error); // Debugging information
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
      <h1>Your Genie</h1>
      <p>Ask me anything!</p>

      {/* Chat History */}
      {chatHistory.length > 0 && (
        <div className="chat-history">
          {chatHistory.map((chat, index) => (
            <div key={index} className="p-2 border-b">
              <p>
                <strong>You:</strong> {chat.user}
              </p>
              <p>
                <strong>Genie:</strong> {chat.bot}
              </p>
            </div>
          ))}
        </div>
      )}

      <textarea
        className="chat-box"
        placeholder="Ask your Genie anything..."
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
