// Helper function to delay execution
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Retry function with exponential backoff
export async function retryWithBackoff(fn, maxRetries = 3, baseDelay = 1000) {
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      return await fn();
    } catch (error) {
      console.log(`Attempt ${attempt} failed:`, error.message);
      
      // Don't retry on certain errors
      if (error.status === 400 || error.status === 401 || error.status === 403) {
        throw error;
      }
      
      if (attempt === maxRetries) {
        throw error;
      }
      
      // Exponential backoff: 1s, 2s, 4s
      const delayTime = baseDelay * Math.pow(2, attempt - 1);
      console.log(`Waiting ${delayTime}ms before retry...`);
      await delay(delayTime);
    }
  }
}

// Initialize Groq client with proper configuration
export function initializeGemini(modelName = "llama-3.3-70b-versatile") {
  if (!process.env.GROQ_API_KEY) {
    throw new Error("GROQ_API_KEY is not configured");
  }
  
  return {
    model: modelName,
    apiKey: process.env.GROQ_API_KEY,
    baseURL: "https://api.groq.com/openai/v1",
    temperature: 0.7,
    max_tokens: 2048,
  };
}

// Generate content with retry logic
export async function generateContentWithRetry(prompt, modelName = "llama-3.3-70b-versatile") {
  if (!process.env.GROQ_API_KEY) {
    throw new Error("GROQ_API_KEY is not configured");
  }
  
  const config = initializeGemini(modelName);
  
  return await retryWithBackoff(async () => {
    const response = await fetch(config.baseURL + "/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${config.apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: config.model,
        messages: [
          {
            role: "user",
            content: prompt
          }
        ],
        temperature: config.temperature,
        max_tokens: config.max_tokens,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      const error = new Error(errorData.error?.message || `HTTP ${response.status}: ${response.statusText}`);
      error.status = response.status;
      throw error;
    }

    const data = await response.json();
    
    // Return object that matches Gemini's response structure
    return {
      response: {
        text: () => data.choices[0]?.message?.content || "",
        candidates: [{
          content: {
            parts: [{
              text: data.choices[0]?.message?.content || ""
            }]
          }
        }]
      }
    };
  });
}

// Handle common Groq API errors
export function handleGeminiError(error) {
  console.error("Groq API error:", error);
  
  // Handle network errors
  if (error.message.includes("fetch")) {
    return {
      message: "Network error. Please check your internet connection and try again.",
      status: 503
    };
  }
  
  // Handle service unavailable
  if (error.status === 503 || error.message.includes("Service Unavailable") || error.message.includes("503")) {
    return {
      message: "AI service is temporarily unavailable. Please try again in a few moments.",
      status: 503
    };
  }
  
  // Handle rate limiting
  if (error.status === 429 || error.message.includes("429") || error.message.includes("Too Many Requests") || error.message.includes("quota")) {
    return {
      message: "API rate limit exceeded. Please try again in a minute.",
      status: 429
    };
  }
  
  // Handle authentication errors
  if (error.status === 401 || error.status === 403 || error.message.includes("API key")) {
    return {
      message: "Authentication error. Please check your API configuration.",
      status: 401
    };
  }
  
  // Handle bad requests
  if (error.status === 400) {
    return {
      message: "Invalid request. Please check your input and try again.",
      status: 400
    };
  }
  
  // Handle timeout errors
  if (error.message.includes("timeout")) {
    return {
      message: "Request timed out. Please try again.",
      status: 408
    };
  }
  
  return {
    message: "Failed to process request. Please try again later.",
    status: 500
  };
}