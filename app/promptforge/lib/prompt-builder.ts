import type { PromptConfig, ModelProfile, TargetModel } from "./types";

function escapeXml(s: string) {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function buildClaude(c: PromptConfig): string {
  const parts: string[] = [];

  if (c.role) {
    parts.push(`You are ${c.role}.`);
  }

  if (c.context) {
    parts.push(`\n<context>\n${escapeXml(c.context)}\n</context>`);
  }

  parts.push(`\n<task>\n${escapeXml(c.task)}\n</task>`);

  if (c.constraints.length > 0) {
    parts.push(
      `\n<constraints>\n${c.constraints.map((ct) => `- ${escapeXml(ct)}`).join("\n")}\n</constraints>`
    );
  }

  if (c.outputFormat) {
    parts.push(`\n<format>\n${escapeXml(c.outputFormat)}\n</format>`);
  }

  if (c.tone !== "professional") {
    parts.push(`\n<tone>\n${c.tone}\n</tone>`);
  }

  if (c.exampleInput && c.exampleOutput) {
    parts.push(
      `\n<example>\n<input>${escapeXml(c.exampleInput)}</input>\n<output>${escapeXml(c.exampleOutput)}</output>\n</example>`
    );
  }

  parts.push(`\nThink through this step by step before answering.`);

  return parts.join("\n");
}

function buildGPT(c: PromptConfig): string {
  const parts: string[] = [];

  if (c.role) {
    parts.push(`ROLE: You are ${c.role}.`);
  }

  if (c.context) {
    parts.push(`\nCONTEXT:\n${c.context}`);
  }

  parts.push(`\nTASK:\n${c.task}`);

  if (c.constraints.length > 0) {
    parts.push(
      `\nCONSTRAINTS:\n${c.constraints.map((ct, i) => `${i + 1}. ${ct}`).join("\n")}`
    );
  }

  if (c.outputFormat) {
    parts.push(`\nOUTPUT FORMAT:\n${c.outputFormat}`);
  }

  if (c.tone !== "professional") {
    parts.push(`\nTONE: ${c.tone}`);
  }

  if (c.exampleInput && c.exampleOutput) {
    parts.push(
      `\nEXAMPLE:\nInput: ${c.exampleInput}\nExpected Output: ${c.exampleOutput}`
    );
  }

  return parts.join("\n");
}

function buildGemini(c: PromptConfig): string {
  const parts: string[] = [];

  if (c.role) {
    parts.push(`## Role\n${c.role}`);
  }

  if (c.context) {
    parts.push(`\n## Context\n${c.context}`);
  }

  parts.push(`\n## Task\n${c.task}`);

  if (c.constraints.length > 0) {
    parts.push(
      `\n## Requirements\n${c.constraints.map((ct) => `- ${ct}`).join("\n")}`
    );
  }

  if (c.outputFormat) {
    parts.push(`\n## Output Format\n${c.outputFormat}`);
  }

  if (c.tone !== "professional") {
    parts.push(`\n## Tone\n${c.tone}`);
  }

  if (c.exampleInput && c.exampleOutput) {
    parts.push(
      `\n## Example\n**Input:** ${c.exampleInput}\n**Output:** ${c.exampleOutput}`
    );
  }

  parts.push(`\nThink step by step.`);

  return parts.join("\n");
}

function buildUniversal(c: PromptConfig): string {
  const parts: string[] = [];

  if (c.role) {
    parts.push(`ROLE: ${c.role}`);
  }

  parts.push(`\nTASK: ${c.task}`);

  if (c.context) {
    parts.push(`\nCONTEXT: ${c.context}`);
  }

  if (c.outputFormat) {
    parts.push(`\nOUTPUT: ${c.outputFormat}`);
  }

  if (c.constraints.length > 0) {
    parts.push(
      `\nCONSTRAINTS:\n${c.constraints.map((ct) => `- ${ct}`).join("\n")}`
    );
  }

  if (c.tone !== "professional") {
    parts.push(`\nTONE: ${c.tone}`);
  }

  if (c.exampleInput && c.exampleOutput) {
    parts.push(
      `\nEXAMPLE:\nInput: ${c.exampleInput}\nExpected: ${c.exampleOutput}`
    );
  }

  return parts.join("\n");
}

export const MODEL_PROFILES: Record<TargetModel, ModelProfile> = {
  claude: {
    name: "Claude",
    description: "XML-strukturiert, Chain-of-Thought",
    icon: "🟠",
    buildPrompt: buildClaude,
  },
  gpt: {
    name: "GPT",
    description: "Rollenbasiert, nummerierte Schritte",
    icon: "🟢",
    buildPrompt: buildGPT,
  },
  gemini: {
    name: "Gemini",
    description: "Markdown-Sektionen, direkt",
    icon: "🔵",
    buildPrompt: buildGemini,
  },
  universal: {
    name: "Universal",
    description: "Funktioniert mit allen Modellen",
    icon: "⚪",
    buildPrompt: buildUniversal,
  },
};

export function generatePrompt(config: PromptConfig): string {
  const profile = MODEL_PROFILES[config.targetModel];
  return profile.buildPrompt(config);
}
