export type TargetModel = "claude" | "gpt" | "gemini" | "universal";

export interface PromptConfig {
  task: string;
  context: string;
  targetModel: TargetModel;
  role: string;
  tone: "professional" | "casual" | "technical" | "creative" | "educational";
  outputFormat: string;
  constraints: string[];
  exampleInput: string;
  exampleOutput: string;
}

export interface ModelProfile {
  name: string;
  description: string;
  icon: string;
  buildPrompt: (config: PromptConfig) => string;
}
