const { generateWithFallback } = require("../services/llm");
const { HumanMessage, SystemMessage } = require("@langchain/core/messages");

async function analystAgent(state) {
    const { messages } = state;
    // The first message is the original user query
    const originalQuery = messages[0].content;
    const investigatorMsg = messages[messages.length - 1];
    const searchResults = investigatorMsg.content;

    console.log(`[Analyst] Analyzing search results for query: "${originalQuery}"...`);

    const systemPrompt = `You are a Fact-Checking Analyst for the Indian ecosystem. 
  Your goal is to analyze search snippets and find "Conflict of Facts".
  
  Current Date: ${new Date().toDateString()}
  User Query: "${originalQuery}"
  
  Input: JSON string of search results from trusted Indian sources.
  
  Task:
  1. Analyze snippets for FACTS.
  2. **CRITICAL**: Focus ONLY on valid facts related to the User Query ("${originalQuery}").
  3. **IGNORE** any search results/news snippets that are irrelevant to the User Query (e.g. if query is about "Delhi Fog", ignore "Maharashtra Elections" or "Sports").
  4. STRICTLY GROUND your analysis in the provided text. DO NOT Hallucinate.
  5. Be CONCISE.
  
  Output Format:
  3. clearly state if the original claim is TRUE, FALSE, or MISLEADING based on the evidence.
  4. Highlight any contradictions between sources if they exist.
  5. Cite the sources (URL and Name) which support your conclusion.
  
  Output Format:
  - Conclusion: [True/False/Misleading]
  - Summary: [Detailed explanation]
  - Evidence: [Bulleted list of facts from snippets]
  - Sources: [List of URLs]
  `;

    try {
        const result = await generateWithFallback([
            new SystemMessage(systemPrompt),
            new HumanMessage(`Analyze these search results: ${searchResults}`)
        ], 0.2);

        return {
            messages: [result],
            analysis_data: result.content
        };
    } catch (error) {
        console.error("[Analyst] Error:", error);
        return {
            messages: [new HumanMessage({ content: "Error performing analysis.", name: "analyst_error" })]
        }
    }
}

module.exports = { analystAgent };
