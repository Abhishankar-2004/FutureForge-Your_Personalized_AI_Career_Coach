// Test quiz generation with Gemini 2.5 Flash
const { GoogleGenerativeAI } = require("@google/generative-ai");
require('dotenv').config();

async function testQuizGeneration() {
  console.log("Testing Quiz Generation with Gemini 2.5 Flash...\n");
  
  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
  const model = genAI.getGenerativeModel({ model: "models/gemini-2.5-flash" });
  
  const prompt = `
    Generate 3 interview questions for a Software Engineer position.
    
    **CRITICAL OUTPUT REQUIREMENTS:**
    1. Return ONLY valid JSON - no markdown, no code blocks, no explanatory text
    2. Start your response with { and end with }
    3. Do not include \`\`\`json or \`\`\` markers
    
    {
      "questions": [
        {
          "question": "What is your question here?",
          "options": ["Option A", "Option B", "Option C", "Option D"],
          "correctAnswer": "Option A",
          "explanation": "Why this is correct",
          "type": "technical"
        }
      ]
    }
  `;
  
  try {
    console.log("Sending request to Gemini...");
    const result = await model.generateContent(prompt);
    const response = await result.response;
    let text = response.text();
    
    console.log("\n=== RAW RESPONSE ===");
    console.log(text);
    console.log("\n=== CLEANING ===");
    
    // Clean up
    text = text
      .replace(/```json\n?/g, '')
      .replace(/```\n?/g, '')
      .replace(/^[^{[]*/, '')
      .replace(/[^}\]]*$/, '')
      .trim();
    
    console.log("Cleaned text:", text.substring(0, 200) + "...");
    
    console.log("\n=== PARSING ===");
    const quiz = JSON.parse(text);
    
    console.log("\n✅ SUCCESS!");
    console.log("Number of questions:", quiz.questions?.length || 0);
    console.log("\nFirst question:");
    console.log(JSON.stringify(quiz.questions[0], null, 2));
    
  } catch (error) {
    console.error("\n❌ ERROR:", error.message);
    console.error("\nFull error:", error);
  }
}

testQuizGeneration();
