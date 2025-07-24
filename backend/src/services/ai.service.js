import { GoogleGenAI } from "@google/genai";
import config from "../config/config.js";

const ai = new GoogleGenAI({
    apiKey: config.GEMINI_API_KEY,
});


export async function generateCaption(file) {

    const base64Image = new Buffer.from(file.buffer).toString('base64');

    const contents = [
        {
            inlineData: {
                mimeType: file.mimetype,        // file.mimetype , not file.mimeType
                data: base64Image,
            },
        },
        { text: "Caption this image." },
    ];

    const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: contents,
        config: {
            systemInstruction:
                `You are a helpful AI assistant that creates engaging social media captions for images.
                When analyzing images, focus on:
                - Create a caption between 50-100 characters
                - Use a friendly, conversational tone
                - Include 1-2 relevant emojis that match the image's mood
                - Add 3-5 relevant hashtags at the end
                - Ensure the caption tells a story or creates emotional connection
                - Keep it natural and authentic, avoiding overly promotional language
                - Make it engaging but not clickbaity
                The caption should be in simple text format with hashtags at the end.`
        }
    });

    return response.text
}

// console.log(await generateCaption());