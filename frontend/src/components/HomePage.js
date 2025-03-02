import React, { useState, useEffect } from 'react';
import { fetchAiResponse } from "./ai_service";
import '../App.css';

const HomePage = () => {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [aiSuggestion, setAiSuggestion] = useState("");

  useEffect(() => {
    const getAiSuggestion = async () => {
      setLoading(true);
      setError("");
      try {
        const aiResponse = await fetchAiResponse("Give me a suggestion no longer than 2 sentences about the guild. Short and sweet. only txt no md");
        setAiSuggestion(aiResponse || "No suggestion available.");
      } catch (error) {
        setError("An error occurred while fetching AI suggestion.");
      } finally {
        setLoading(false);
      }
    };

    getAiSuggestion();
  }, []);

  return (
    <div className="home-page">
      <h1>Welcome to the Home Page</h1>
      <p>This is the home page of the Guild Management AI application.</p>
      <ul>
        <li className="box">
          <h3>Members</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum</p>
        </li>
        <li className="box">
          <h3>Notifications</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum</p>
        </li>
        <li className="box">
          <h3>AI Suggestion</h3>
          {loading ? <p>Loading...</p> : <p>{aiSuggestion}</p>}
          {error && <p style={{ color: "red" }}>{error}</p>}
        </li>
      </ul>
    </div>
  );
};

export default HomePage;