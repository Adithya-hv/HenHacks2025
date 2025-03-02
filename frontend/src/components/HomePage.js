import React, { useState, useEffect } from "react";
import { getAIResponse, getResources } from "./api_service";
import "../App.css";

const HomePage = () => {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [aiSuggestion, setAiSuggestion] = useState("");
  const [members, setMembers] = useState([]);
  const [geminiPrompt, setGeminiPrompt] = useState("");

  useEffect(() => {
    const getAiSuggestion = async () => {
      setLoading(true);
      setError("");
      try {
        const aiResponse = await getAIResponse(
          "Give me a suggestion no longer than 2 sentences about the guild. Short and sweet. only txt no md"
        );
        setAiSuggestion(aiResponse || "No suggestion available.");
      } catch (error) {
        console.error("Error fetching AI suggestion:", error); // Debugging information
        setError("An error occurred while fetching AI suggestion.");
      } finally {
        setLoading(false);
      }
    };

    getAiSuggestion();
  }, []);

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const membersData = await getResources();
        setMembers(membersData.length ? membersData : ["Alice"]);
      } catch (error) {
        console.error("Error fetching members:", error);
        setMembers(["Alice"]);
      }
    };

    fetchMembers();
  }, []);

  useEffect(() => {
    const fetchGeminiPrompt = async () => {
      try {
        const geminiResponse = await getAIResponse(
          "Provide a Gemini prompt for the guild members giving them notifications and information that would be relevent in medival europe, make it like 2 lines and keep it only text no markdown"
        );
        setGeminiPrompt(geminiResponse || "No Gemini prompt available.");
      } catch (error) {
        console.error("Error fetching Gemini prompt:", error);
        setGeminiPrompt("An error occurred while fetching Gemini prompt.");
      }
    };

    fetchGeminiPrompt();
  }, []);

  return (
    <div className="home-page">
      <h1>Welcome to the Home Page</h1>
      <p>This is the home page of the Guild Management AI application.</p>
      <ul>
        <li className="box">
          <h3>Members</h3>
          {members.length > 0 ? (
            members.map((member, index) => (
              <p key={index}>
                {typeof member === "string"
                  ? member
                  : `Name: ${member.name}, Age: ${member.age}, Role: ${member.role}, Tasks: ${member.tasks}`}
              </p>
            ))
          ) : (
            <p>No members available.</p>
          )}
        </li>
        <li className="box">
          <h3>Notifications</h3>
          {loading ? <p>Loading...</p> : <p>{geminiPrompt}</p>}
          {error && <p style={{ color: "red" }}>{error}</p>}
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
