// Test script to check available Gemini models
import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from 'dotenv';

dotenv.config({ path: '.env' });

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

async function listModels() {
  try {
    console.log("Testing Gemini API connection...\n");
    console.log("API Key (first 10 chars):", process.env.GEMINI_API_KEY?.substring(0, 10) + "...");
    
    // Try different model names
    const modelsToTest = [
      "gemini-pro",
      "gemini-1.5-pro",
      "gemini-2.5-flash",
      "gemini-2.5-flash-latest",
      "models/gemini-pro",
      "models/gemini-2.5-flash"
    ];
    
    console.log("\nTesting models:\n");
    
    for (const modelName of modelsToTest) {
      try {
        const model = genAI.getGenerativeModel({ model: modelName });
        const result = await model.generateContent("Say 'Hello'");
        const response = await result.response;
        const text = response.text();
        console.log(`✅ ${modelName} - WORKS! Response: ${text.substring(0, 50)}`);
      } catch (error) {
        console.log(`❌ ${modelName} - FAILED: ${error.message.substring(0, 100)}`);
      }
    }
    
  } catch (error) {
    console.error("Error:", error.message);
  }
}

listModels();
