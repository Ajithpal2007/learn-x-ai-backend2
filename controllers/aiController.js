// /controllers/aiController.js

import asyncHandler from 'express-async-handler';
import ChatHistory from '../models/chatHistoryModel.js';
import { GoogleGenerativeAI } from '@google/generative-ai';

// Ensure the API key is present before proceeding
if (!process.env.GEMINI_API_KEY) {
    throw new Error('GEMINI_API_KEY is not defined in .env file');
}
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// @desc    Chat with the AI counselor
// @route   POST /api/ai/chat
// @access  Private
const chatWithAI = asyncHandler(async (req, res) => {
  const { message } = req.body;
  const user = req.user.id;

  let chat = await ChatHistory.findOne({ user });
  if (!chat) {
    chat = await ChatHistory.create({ user, messages: [] });
  }

  chat.messages.push({ sender: 'user', text: message });

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash-latest" }); 

    const systemPrompt = "You are 'Learn-x-AI', a friendly and encouraging AI career counselor for Indian students. Your goal is to provide helpful, clear, and supportive guidance. Keep your answers concise and easy to understand. Here is the student's question: ";
    const fullPrompt = systemPrompt + message;

    const result = await model.generateContent(fullPrompt);
    const response = await result.response;
    
    if (!response || !response.text) {
        throw new Error("Invalid response structure from Gemini API");
    }

    const aiResponse = response.text();
    chat.messages.push({ sender: 'ai', text: aiResponse });

    await chat.save();
    res.status(200).json(chat.messages);

  } catch (error) {
    console.error("Gemini API Error (Chat):", error);
    res.status(500);
    throw new Error('Failed to get a response from the AI service.');
  }
});

// @desc    Get a step-by-step solution for a problem
// @route   POST /api/ai/solve-step-by-step
// @access  Private
const solveProblemStepByStep = asyncHandler(async (req, res) => {
    const { problem } = req.body;

    if (!problem) {
        res.status(400);
        throw new Error('Please provide a problem to solve.');
    }

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash-latest" });
    const prompt = `
        You are an expert math and science tutor. Your task is to solve the following problem 
        and provide a step-by-step explanation. Your response MUST be a valid JSON array.
        Do NOT include any text, markdown, or formatting like "\`\`\`json" before or after the JSON array.
        Each object in the array represents one step and must have exactly three keys: "step" (number), 
        "title" (string), and "content" (string).

        Problem: "${problem}"
    `;

    try {
        const result = await model.generateContent(prompt);
        const responseText = await result.response.text();

        // --- THE ROBUST FIX ---
        // 1. Use a regular expression to find the JSON array within the AI's text.
        const jsonMatch = responseText.match(/\[.*\]/s);

        // 2. Check if we found a match.
        if (jsonMatch && jsonMatch[0]) {
            const jsonString = jsonMatch[0];
            // 3. Parse only the extracted JSON string.
            const solutionSteps = JSON.parse(jsonString);
            res.status(200).json(solutionSteps);
        } else {
            // 4. If no JSON is found, the AI failed to follow instructions.
            console.error("AI response did not contain a valid JSON array. Response was:", responseText);
            throw new Error('AI response was not in the expected format.');
        }

    } catch (error) {
        // This will catch both Gemini API errors and our JSON parsing errors.
        console.error("Backend Solver Error:", error);
        res.status(500);
        throw new Error('Failed to get a valid solution from the AI service.');
    }
});


export { chatWithAI, solveProblemStepByStep };
