export type TargetModel = "claude" | "gpt" | "gemini" | "universal";

export interface PromptConfig {
  task: string;
  role: string;
  context: string;
  outputFormat: string;
  tone: "professional" | "casual" | "technical" | "creative" | "educational";
  constraints: string[];
  exampleInput: string;
  exampleOutput: string;
  targetModel: TargetModel;
  temperature: number;
}
