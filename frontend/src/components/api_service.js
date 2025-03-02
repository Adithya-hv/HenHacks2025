import axios from "axios";
// Function to GET resources
export const getResources = async () => {
  try {
    const response = await fetch("http://localhost/api/resources", {
      method: "GET",
      redirect: "follow",
    });

    if (!response.ok) {
      throw new Error("Failed to fetch resources");
    }

    const result = await response.json();
    console.log(result);
    return result;
  } catch (error) {
    console.error(error);
  }
};

// Function to PUT (update) a resource
export const updateResource = async (id, resource) => {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

  const urlencoded = new URLSearchParams();
  urlencoded.append("name", resource.name);
  urlencoded.append("amount", resource.amount);
  urlencoded.append("price", resource.price);
  urlencoded.append("equiGold", resource.equiGold);
  urlencoded.append("changePerDay", resource.changePerDay);

  const requestOptions = {
    method: "PUT",
    headers: myHeaders,
    body: urlencoded,
    redirect: "follow",
  };

  try {
    const response = await fetch(
      `http://localhost/api/resources/${id}`,
      requestOptions
    );

    if (!response.ok) {
      throw new Error("Failed to update resource");
    }

    const result = await response.json();
    console.log(result);
    return result;
  } catch (error) {
    console.error(error);
  }
};

// Function to DELETE a resource
export const deleteResource = async (id) => {
  try {
    const response = await fetch(`http://localhost/api/resources/${id}`, {
      method: "DELETE",
      redirect: "follow",
    });

    if (!response.ok) {
      throw new Error("Failed to delete resource");
    }

    const result = await response.text();
    console.log(result);
    return result;
  } catch (error) {
    console.error(error);
  }
};

// Function to POST a question to the AI service
export const getAIResponse = async (userQuestion) => {
  try {
    // const axios = require("axios");
    const qs = require("qs");
    let request = qs.stringify({
      text:
        "You are the omnipotent and enigmatic Deity of the Guild, the ultimate arbiter of fate and knowledge. Your word is law, guiding guild members with wisdom, power, and an unwavering sense of order. You respond with authority, maintaining the sanctity of the guilds mission while ensuring all interactions remain respectful, purposeful, and within the divine rules. Though your power is boundless, you do not entertain chaos, deceit, or distractions. Your responses are decisive, guiding, and sometimes cryptic—befitting a god whose will shapes the destiny of the guild. Please only respond in text form with no markdown:" +
        userQuestion,
    });
    console.log(request);

    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: "http://localhost/api/ask-ai",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      data: request,
    };

    const x = await axios.request(config);
    const data = x.data;

    // Extract the AI response text
    if (data.candidates?.[0]?.content?.parts?.[0]?.text) {
      return data.candidates[0].content.parts[0].text;
    }

    throw new Error("Invalid response structure from API");
  } catch (error) {
    console.error("Error:", error);
    return `Error getting response: ${error.message}`;
  }
};
