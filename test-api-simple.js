// Simple test for Gemini API
const { GoogleGenerativeAI } = require("@google/generative-ai");
require('dotenv').config();

async function testAPI() {
  console.log("Testing Gemini API...");
  console.log("API Key:", process.env.GEMINI_API_KEY ? "Found" : "Missing");
  
  try {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    
    const result = await model.generateContent("Say hello");
    const response = await result.response;
    const text = response.text();
    
    console.log("✅ SUCCESS! Response:", text);
  } catch (error) {
    console.error("❌ ERROR:", error.message);
  }
}

testAPI();
