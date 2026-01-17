const { generateWithFallback } = require("../services/llm");
const { HumanMessage, SystemMessage } = require("@langchain/core/messages");

async function graderAgent(state) {
    const { messages } = state;
    const originalQuery = messages[0].content;
    const analysisMsg = messages[messages.length - 1];
    const analysisContent = analysisMsg.content;

    console.log(`[Grader] Grading the analysis...`);

    const systemPrompt = `You are a Truth Adjudicator.
  Your task is to assign a **Truth Score (0-100)** by evaluating the **Analysis Content**.

  Current Date: ${new Date().toDateString()}
  User Query: "${originalQuery}"
  
  CRITICAL RULES:
  1. **IGNORE SOURCE URL TITLES**. The search engine sometimes returns messy URLs (e.g., "Horoscope" or "NFL" pages that contain relevant news snippets).
  2. **FOCUS ON THE ANALYSIS CONTENT**: Read the Conclusion, Summary, and Evidence sections.
  3. **COMPARE**: Does the Evidence TEXT support or contradict the User Query?
  
  SCORING:
  - If **Conclusion: True** AND the Evidence section contains relevant facts supporting the query → Score **85-100**.
  - If **Conclusion: False** AND the Evidence shows the query is debunked → Score **0-15**.
  - If **Conclusion: Misleading** or unclear → Score **40-60**.
  
  QUALITY BONUSES (if Conclusion: True):
  - **100**: Multiple detailed evidence points (3+) with specific facts/dates.
  - **90-95**: 2-3 solid evidence points.
  - **80-85**: Single evidence point or weaker support.

  DO NOT penalize based on URL titles like "Horoscope" or "NFL" in the Sources section.
  
  Output ONLY a JSON object:
  {
    "score": <number 0-100>,
    "reasoning": "<short explanation>"
  }
  `;

    try {
        const result = await generateWithFallback([
            new SystemMessage(systemPrompt),
            new HumanMessage(`Grade this analysis: ${analysisContent}`)
        ], 0);

        const content = result.content;

        let gradingData = { score: 0, reasoning: "Unable to grade content." };

        try {
            // Attempt 1: Extract JSON between braces
            const jsonMatch = content.match(/\{[\s\S]*\}/);
            const jsonString = jsonMatch ? jsonMatch[0] : content.replace(/```json/g, '').replace(/```/g, '').trim();

            gradingData = JSON.parse(jsonString);
        } catch (e) {
            console.warn("[Grader] JSON Parsing failed. Raw output:", content);
            // Fallback for simple number presence if JSON fails
            const scoreMatch = content.match(/\d{2,3}/);
            if (scoreMatch) {
                gradingData.score = parseInt(scoreMatch[0]);
                gradingData.reasoning = "Parsed score from raw text.";
            }
        }

        return {
            messages: [new HumanMessage({ content: JSON.stringify(gradingData), name: "grader_result" })],
            grading_data: gradingData
        };
    } catch (error) {
        console.error("[Grader] Error:", error);
        const errorGrading = { score: 0, reasoning: "Error in grading" };
        return {
            messages: [new HumanMessage({ content: JSON.stringify(errorGrading), name: "grader_error" })],
            grading_data: errorGrading
        }
    }
}

module.exports = { graderAgent };
