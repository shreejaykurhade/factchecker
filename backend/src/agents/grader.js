const { generateWithFallback } = require("../services/llm");
const { HumanMessage, SystemMessage } = require("@langchain/core/messages");

async function graderAgent(state) {
    const { messages } = state;
    const analysisMsg = messages[messages.length - 1];
    const analysisContent = analysisMsg.content;

    console.log(`[Grader] Grading the analysis...`);

    const systemPrompt = `You are a Trust Scorer (Grader).
  Your task is to assign a reliability score (0-100) to the fact-check analysis provided.

  Current Date: ${new Date().toDateString()}
  
  Criteria:
  - Consistency (Does the evidence text match the claim?): HIGHEST PRIORITY.
  - Conclusion Agreement (If Analyst says TRUE and provides snippets, score MUST be > 80).
  - Source Authority (Is it from standard news?): Good points.
  - URL Relevance (Ignore strictly matching URL slugs if the snippet text is relevant. News sites often redirect or have messy URLs).
  
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
        return {
            messages: [new HumanMessage({ content: JSON.stringify({ score: 0, reasoning: "Error in grading" }), name: "grader_error" })]
        }
    }
}

module.exports = { graderAgent };
