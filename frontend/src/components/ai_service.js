const GEMINI_API_KEY = "AIzaSyBxgUfXacntHKe-O8L-i3vUBTaKphzZQVQ"; 
const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`;

export const generateAiPrompt = (query) => {
  return {
    contents: [{
      parts: [{
        text: query 
      }]
    }]
  };
};

export const fetchAiResponse = async (query) => {
  const requestBody = generateAiPrompt(query);

  try {
    const response = await fetch(GEMINI_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    });

    if (!response.ok) {
      throw new Error("Failed to fetch AI response");
    }

    const data = await response.json();
    console.log("AI API Response Data:", data); 

    if (data.candidates && data.candidates[0]?.content?.parts?.[0]?.text) {
      return data.candidates[0].content.parts[0].text;
    } else {
      throw new Error("Invalid response format");
    }
  } catch (error) {
    console.error("AI API Error:", error);
    return "Sorry, I couldn't process your request.";
  }
};
