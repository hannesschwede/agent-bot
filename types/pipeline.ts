export type TargetModel = 'claude' | 'gpt' | 'gemini' | 'universal'

export interface PromptConfig {
  // Step 1: Basics
  task: string
  context: string
  targetModel: TargetModel

  // Step 2: Details
  role: string
  tone: 'professional' | 'casual' | 'technical' | 'creative' | 'educational'
  outputFormat: string
  constraints: string[]

  // Step 3: Examples (optional)
  exampleInput: string
  exampleOutput: string
}

export interface ModelProfile {
  name: string
  description: string
  icon: string
  buildPrompt: (config: PromptConfig) => string
}
