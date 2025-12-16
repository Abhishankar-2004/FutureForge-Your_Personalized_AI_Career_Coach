"use server";

import { db } from "@/lib/prisma";
import { generateContentWithRetry, handleGeminiError } from "@/lib/gemini-utils";
import { getCurrentUser } from "@/lib/user-utils";

export const generateAIInsights = async (industry) => {
  try {
    const prompt = `
            Analyze the current state of the ${industry} industry and provide insights in ONLY the following JSON format without any additional notes or explanations:
            {
              "salaryRanges": [
                { "role": "string", "min": number, "max": number, "median": number, "location": "string" }
              ],
              "growthRate": number,
              "demandLevel": "High" | "Medium" | "Low",
              "topSkills": ["skill1", "skill2"],
              "marketOutlook": "Positive" | "Neutral" | "Negative",
              "keyTrends": ["trend1", "trend2"],
              "recommendedSkills": ["skill1", "skill2"]
            }
            
            IMPORTANT: Return ONLY the JSON. No additional text, notes, or markdown formatting.
            Include at least 3 common roles for salary ranges.
            Growth rate should be a percentage number.
            Include at least 3 skills and trends.
          `;

    const result = await generateContentWithRetry(prompt, "llama-3.3-70b-versatile");
    const response = result.response;
    const text = response.text();
    const cleanedText = text.replace(/```(?:json)?\n?/g, "").trim();

    const parsed = JSON.parse(cleanedText);
    
    // Validate the parsed data has required fields
    if (!parsed.salaryRanges || !Array.isArray(parsed.salaryRanges)) {
      throw new Error("Invalid salary ranges data");
    }
    
    return parsed;
  } catch (error) {
    console.error("Error generating AI insights:", error);
    
    // Return default insights if AI generation fails
    return {
      salaryRanges: [
        { role: "Entry Level", min: 40000, max: 60000, median: 50000, location: "Global" },
        { role: "Mid Level", min: 60000, max: 90000, median: 75000, location: "Global" },
        { role: "Senior Level", min: 90000, max: 130000, median: 110000, location: "Global" }
      ],
      growthRate: 5.2,
      demandLevel: "Medium",
      topSkills: ["Communication", "Problem Solving", "Technical Skills"],
      marketOutlook: "Positive",
      keyTrends: ["Digital Transformation", "Remote Work", "Automation"],
      recommendedSkills: ["Leadership", "Data Analysis", "Project Management"]
    };
  }
};

export async function getIndustryInsights() {
  const { user } = await getCurrentUser();
  
  // Get user with industry insights
  const userWithInsights = await db.user.findUnique({
    where: { id: user.id },
    include: {
      industryInsight: true,
    },
  });

  // If no insights exist, generate them
  if (!userWithInsights.industryInsight) {
    const insights = await generateAIInsights(userWithInsights.industry);

    const industryInsight = await db.industryInsight.create({
      data: {
        industry: userWithInsights.industry,
        ...insights,
        nextUpdate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      },
    });

    return industryInsight;
  }

  return userWithInsights.industryInsight;
}
