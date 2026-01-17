const { ChatGoogleGenerativeAI } = require("@langchain/google-genai");

const MODELS = ["gemini-3-flash-preview", "gemini-2.0-flash-exp", "gemini-1.5-flash", "gemini-1.5-pro"];

async function generateWithFallback(messages, temperature = 0.2) {
    let lastError = null;

    for (const modelName of MODELS) {
        try {
            console.log(`[LLM] Attempting with model: ${modelName}`);
            const llm = new ChatGoogleGenerativeAI({
                model: modelName,
                temperature: temperature,
                maxOutputTokens: 8192, // Increased to prevent cutoffs
                apiKey: process.env.GOOGLE_API_KEY
            });

            const result = await llm.invoke(messages);
            return result;
        } catch (error) {
            console.warn(`[LLM] Failed with ${modelName}: ${error.message}`);
            lastError = error;
            // Continue to next model
        }
    }

    throw new Error(`All LLM models failed. Last error: ${lastError?.message}`);
}

module.exports = { generateWithFallback };
