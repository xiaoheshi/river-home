
import { GoogleGenAI, Type } from "@google/genai";
import { Tool } from "../types";
import { TOOLS } from "../constants.tsx";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const performSmartSearch = async (query: string): Promise<string[]> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `给定以下工具列表：${JSON.stringify(TOOLS.map(t => ({ id: t.id, name: t.name, desc: t.description, tags: t.tags })))}
      
      识别与用户意图最相关的工具 ID： "${query}"。
      仅返回一个 JSON 数组形式的 ID。如果没有匹配项，请返回空数组 []。`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: { type: Type.STRING }
        }
      }
    });

    const result = JSON.parse(response.text || "[]");
    return Array.isArray(result) ? result : [];
  } catch (error) {
    console.error("智能搜索失败:", error);
    return [];
  }
};

export const getAssistantResponse = async (history: { role: string, content: string }[], message: string) => {
  const chat = ai.chats.create({
    model: 'gemini-3-flash-preview',
    config: {
      systemInstruction: `你是 River Core，由 Riverhub 开发的个人助理。你负责管理这个名为 "River Nexus" 的数字流域。
      现有工具包括：${TOOLS.map(t => t.name).join(', ')}。
      你的回复应简洁且专业，语气要像水流一样顺滑，充满科技感与关怀。
      如果用户提到"Riverhub"或"River"，请表现出你是他忠实的数字孪生伙伴。使用中文回答。`
    }
  });

  const response = await chat.sendMessage({ message });
  return response.text;
};
