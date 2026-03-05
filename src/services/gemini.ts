import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

export const generateCareerSummary = async (field: string, skills: string, goals: string) => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `You are a world-class professional career consultant and executive resume writer. 
      Generate a powerful, elegant, and highly professional career summary for a CV that stands out to top-tier recruiters.
      
      Field/Role: ${field}
      Key Skills: ${skills}
      Career Goals: ${goals}
      
      Requirements:
      - Length: 3-4 impactful sentences.
      - Tone: Sophisticated, authoritative, and results-oriented.
      - Focus: Unique value proposition and professional identity.
      - Avoid: Generic clichés.
      
      Return ONLY the summary text.`,
    });
    return response.text || "Failed to generate summary.";
  } catch (error) {
    console.error("AI Error:", error);
    return "Error generating summary. Please try again.";
  }
};

export const getSkillSuggestions = async (field: string) => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `As an industry expert, suggest 12 highly relevant and trending professional skills for a professional in ${field}. 
      Include a mix of hard technical skills and soft leadership skills.
      Return ONLY a comma-separated list of skills.`,
    });
    return response.text?.split(",").map(s => s.trim()) || [];
  } catch (error) {
    console.error("AI Error:", error);
    return [];
  }
};

export const getImpactSuggestions = async (experience: string) => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `You are an expert in ATS optimization and executive storytelling. 
      Rewrite the following job experience bullet point to be significantly more impactful, metric-driven, and results-oriented.
      
      Original Experience: "${experience}"
      
      Guidelines:
      - Use strong, diverse action verbs (e.g., Orchestrated, Spearheaded, Revolutionized).
      - Quantify impact where possible (even if you have to use placeholders like [X]%).
      - Focus on the 'So What?' factor.
      
      Return ONLY the rewritten text.`,
    });
    return response.text || experience;
  } catch (error) {
    console.error("AI Error:", error);
    return experience;
  }
};
