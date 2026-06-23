import type { PromptConfig, TargetModel } from "./types";

export function generatePrompt(config: PromptConfig): string {
  const { task, role, context, outputFormat, tone, constraints, exampleInput, exampleOutput, targetModel, temperature } = config;

  const sections: string[] = [];

  if (role.trim()) {
    sections.push(`ROLE: ${role.trim()}`);
  }

  sections.push(`TASK: ${task.trim()}`);

  if (context.trim()) {
    sections.push(`CONTEXT: ${context.trim()}`);
  }

  if (outputFormat.trim()) {
    sections.push(`OUTPUT FORMAT: ${outputFormat.trim()}`);
  }

  if (constraints.length > 0) {
    sections.push(`CONSTRAINTS:\n${constraints.map((c) => `- ${c}`).join("\n")}`);
  }

  if (tone !== "professional") {
    sections.push(`TONE: ${tone}`);
  }

  sections.push(`CREATIVITY / TEMPERATURE: ${temperature.toFixed(1)}`);

  if (exampleInput.trim() && exampleOutput.trim()) {
    sections.push(`EXAMPLE:\nInput: ${exampleInput.trim()}\nOutput: ${exampleOutput.trim()}`);
  }

  let prompt = sections.join("\n\n");

  const modelNotes: Record<TargetModel, string> = {
    claude: "\n\nThink through this step by step before answering.",
    gpt: "\n\nThink step by step and answer in a structured way.",
    gemini: "\n\nProvide a clear, well-structured response.",
    universal: "\n\nThink step by step before answering.",
  };

  prompt += modelNotes[targetModel];

  return prompt;
}
