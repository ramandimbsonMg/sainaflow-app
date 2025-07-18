"use server";

import { openai } from "@/lib/openai";
import { getServerSession } from "@/lib/auth/session";

export async function improveTaskDescription(description: string) {
  const session = await getServerSession();
  if (!session?.user?.id) {
    throw new Error("Unauthorized");
  }

  if (!description || description.trim().length === 0) {
    throw new Error("Description is required");
  }

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: `You are a project management assistant for SainaFlow, a digital agency project management tool. 
Your job is to improve task descriptions to make them clearer, more actionable, and better structured.

Rules:
1. Keep the original meaning and intent
2. Add specific, measurable outcomes where possible
3. Break down vague instructions into concrete steps
4. Use action verbs to start sentences
5. Include acceptance criteria if appropriate
6. Keep it concise - don't add unnecessary fluff
7. Maintain the same language as the original description

Return ONLY the improved description, no explanations or prefixes.`,
        },
        {
          role: "user",
          content: `Improve this task description:\n\n${description}`,
        },
      ],
      temperature: 0.7,
      max_tokens: 500,
    });

    const improvedDescription =
      completion.choices[0]?.message?.content || description;

    return { improvedDescription };
  } catch (error) {
    console.error("AI description improvement failed:", error);
    throw new Error("Failed to improve description");
  }
}

export async function getTaskPrioritySuggestions(userId: string) {
  const session = await getServerSession();
  if (!session?.user?.id) {
    throw new Error("Unauthorized");
  }

  // This would analyze the user's task history and suggest priorities
  // For now, return a placeholder
  return {
    suggestions: [],
    message: "Priority suggestions coming soon",
  };
}
