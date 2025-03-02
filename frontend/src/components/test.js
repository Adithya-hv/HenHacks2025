import {
  getResources,
  updateResource,
  deleteResource,
  getAIResponse,
} from "./api_service";

const runTests = async () => {
  console.log("Running tests...");

  // Test getResources
  try {
    const resources = await getResources();
    console.log("getResources result:", resources);
  } catch (error) {
    console.error("getResources error:", error);
  }

  // Test updateResource
  try {
    const updatedResource = await updateResource(1, {
      name: "resource1",
      amount: 100,
      price: 10,
      equiGold: 100,
      changePerDay: 1,
    });
    console.log("updateResource result:", updatedResource);
  } catch (error) {
    console.error("updateResource error:", error);
  }

  // Test deleteResource
  try {
    const deleteResult = await deleteResource(1);
    console.log("deleteResource result:", deleteResult);
  } catch (error) {
    console.error("deleteResource error:", error);
  }

  // Test getAIResponse
  try {
    const aiResponse = await getAIResponse("Explain how AI works");
    console.log("getAIResponse result:", aiResponse);
  } catch (error) {
    console.error("getAIResponse error:", error);
  }

  console.log("Tests completed.");
};

const main = () => {
  runTests();
};

main();
