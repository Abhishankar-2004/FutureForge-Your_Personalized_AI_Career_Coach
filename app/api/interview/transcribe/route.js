import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";

export async function POST(request) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const formData = await request.formData();
    const audioFile = formData.get("audio");

    if (!audioFile) {
      return NextResponse.json({ error: "No audio file provided" }, { status: 400 });
    }

    // Convert audio file to form data for OpenAI Whisper API
    const audioFormData = new FormData();
    audioFormData.append('file', audioFile);
    audioFormData.append('model', 'whisper-1');

    // Use OpenAI Whisper API for audio transcription (compatible with Groq's infrastructure)
    const response = await fetch('https://api.openai.com/v1/audio/transcriptions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.GROQ_API_KEY}`,
      },
      body: audioFormData,
    });

    if (!response.ok) {
      // Fallback: Return a message indicating transcription is not available
      console.warn("Audio transcription not available with current API configuration");
      return NextResponse.json(
        { error: "Audio transcription is temporarily unavailable. Please type your answer instead." },
        { status: 503 }
      );
    }

    const data = await response.json();
    const transcription = data.text?.trim();

    if (!transcription) {
      return NextResponse.json(
        { error: "Could not transcribe the audio. Please try speaking more clearly." },
        { status: 400 }
      );
    }

    return NextResponse.json({ transcription });
  } catch (error) {
    console.error("Error transcribing audio:", error);
    return NextResponse.json(
      { error: "Audio transcription is temporarily unavailable. Please type your answer instead." },
      { status: 503 }
    );
  }
}




