"use server";

import { db } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { generateAIInsights } from "./dashboard";
import { getCurrentUser, ensureUserExists } from "@/lib/user-utils";

export async function updateUser(data) {
  console.log("updateUser called with data:", JSON.stringify(data, null, 2));
  
  if (!data) {
    throw new Error("No data provided for update");
  }

  const { userId, user } = await getCurrentUser();
  console.log("User found:", { userId, userExists: !!user, userIndustry: user?.industry });

  try {
    // Validate required fields
    if (!data.industry) {
      throw new Error("Industry is required");
    }

    // Check if industry exists first (outside transaction)
    let industryInsight = await db.industryInsight.findUnique({
      where: {
        industry: data.industry,
      },
    });

    // Generate AI insights outside transaction if needed
    let insights = null;
    if (!industryInsight) {
      try {
        // Add timeout to AI generation
        const timeoutPromise = new Promise((_, reject) => 
          setTimeout(() => reject(new Error("AI generation timeout")), 30000)
        );
        
        insights = await Promise.race([
          generateAIInsights(data.industry),
          timeoutPromise
        ]);
      } catch (aiError) {
        console.warn("AI insights generation failed, using defaults:", aiError.message);
        // Use default insights if AI fails
        insights = {
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
    }

    // Prepare the update data
    const updateData = {
      industry: data.industry,
      experience: data.experience ? parseInt(data.experience) : null,
      bio: data.bio || null,
      skills: data.skills ? (Array.isArray(data.skills) ? data.skills : data.skills.split(',').map(skill => skill.trim()).filter(Boolean)) : [],
    };
    
    console.log("Update data prepared:", JSON.stringify(updateData, null, 2));

    // Update user first (this is the critical operation)
    const updatedUser = await db.user.update({
      where: {
        id: user.id,
      },
      data: updateData,
    });

    // Create industry insight separately if needed (non-blocking)
    if (!industryInsight && insights) {
      try {
        await db.industryInsight.create({
          data: {
            industry: data.industry,
            ...insights,
            nextUpdate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
          },
        });
        console.log("Industry insight created successfully");
      } catch (industryError) {
        console.warn("Failed to create industry insight, but user update succeeded:", industryError.message);
        // Don't throw error here - user update was successful
      }
    }

    const result = { success: true, user: updatedUser };

    console.log("Transaction completed successfully:", result);
    revalidatePath("/");
    return result;
  } catch (error) {
    console.error("Error updating user and industry:", error);
    
    // Provide more specific error messages
    if (error.message.includes("timeout")) {
      throw new Error("Request timed out. Please try again.");
    }
    
    if (error.message.includes("industry")) {
      throw new Error("Failed to process industry information. Please try again.");
    }
    
    if (error.message.includes("Unique constraint")) {
      throw new Error("This industry already exists. Please refresh and try again.");
    }
    
    // Generic fallback
    throw new Error(`Failed to update profile. Please try again. ${error.message}`);
  }
}

export async function getUserOnboardingStatus() {
  try {
    const { user } = await getCurrentUser();

    return {
      isOnboarded: !!user.industry,
    };
  } catch (error) {
    console.error("Error checking onboarding status:", error);
    throw new Error("Failed to check onboarding status");
  }
}
