import type { PromptConfig, ModelProfile, TargetModel } from '@/types/pipeline'

function escapeXml(s: string) {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
}

// ── Shared Tone Instructions ──
const TONE_INSTRUCTIONS: Record<PromptConfig['tone'], string> = {
  professional: 'Use formal, clear, and business-appropriate language. Avoid slang and emojis unless explicitly requested.',
  casual: 'Write in a friendly, conversational tone as if chatting with a colleague. Feel free to use contractions and light humor.',
  technical: 'Use precise terminology and assume the reader has domain expertise. Prioritize accuracy over accessibility.',
  creative: 'Be imaginative, use varied sentence structure, metaphors, and engage the reader emotionally.',
  educational: 'Explain concepts clearly with examples, analogies, and structured progression. Define jargon when first used.',
}

// ── Format Helpers ──
type PromptFormat = 'xml' | 'markdown' | 'keyvalue'

function formatSection(key: string, value: string, format: PromptFormat, escape = false): string {
  const safeValue = escape ? escapeXml(value) : value
  switch (format) {
    case 'xml': return `<${key}>\n${safeValue}\n</${key}>`
    case 'markdown': return `## ${key}\n${safeValue}`
    case 'keyvalue': return `${key.toUpperCase()}: ${safeValue}`
  }
}

function formatList(items: string[], format: PromptFormat, escape = false): string {
  const safeItems = escape ? items.map(escapeXml) : items
  switch (format) {
    case 'xml':
    case 'markdown': return safeItems.map(item => `- ${item}`).join('\n')
    case 'keyvalue': return safeItems.map((item, i) => `${i + 1}. ${item}`).join('\n')
  }
}

// ── Core Builder mit Prompt-Engineering-Boostern ──
function buildBasePrompt(c: PromptConfig, format: PromptFormat): string {
  const parts: string[] = []
  const escape = format === 'xml'
  
  // 1. Role (wenn vorhanden)
  if (c.role?.trim()) {
    const roleText = format === 'xml' ? `You are ${c.role}.` : c.role
    parts.push(formatSection('role', roleText, format, escape))
  }
  
  // 2. Context
  if (c.context?.trim()) {
    parts.push(formatSection('context', c.context, format, escape))
  }
  
  // 3. Task (immer erforderlich)
  parts.push(formatSection('task', c.task, format, escape))
  
  // 4. Constraints
  if (c.constraints?.length > 0) {
    parts.push(formatSection('constraints', formatList(c.constraints, format, escape), format, false))
  }
  
  // 5. Output Format
  if (c.outputFormat?.trim()) {
    const key = format === 'xml' ? 'format' : 'outputFormat'
    parts.push(formatSection(key, c.outputFormat, format, escape))
  }
  
  // 6. Few-Shot Example
  if (c.exampleInput?.trim() && c.exampleOutput?.trim()) {
    if (format === 'xml') {
      parts.push(`<example>\n<input>${escapeXml(c.exampleInput)}</input>\n<output>${escapeXml(c.exampleOutput)}</output>\n</example>`)
    } else if (format === 'markdown') {
      parts.push(`## Example\n**Input:** ${c.exampleInput}\n**Output:** ${c.exampleOutput}`)
    } else {
      parts.push(`EXAMPLE:\nInput: ${c.exampleInput}\nExpected Output: ${c.exampleOutput}`)
    }
  }
  
  // 7. Tone Instruction
  parts.push(formatSection('tone', TONE_INSTRUCTIONS[c.tone], format, false))
  
  // 8. Prompt-Engineering Booster (modellspezifisch)
  if (format === 'xml') {
    // Claude: XML + Chain-of-Thought + Self-Correction
    parts.push('\n<instructions>\n1. Think through this step by step before answering.\n2. If unsure, state your reasoning explicitly.\n3. Format your final answer clearly after your reasoning.\n</instructions>')
  } else if (format === 'markdown') {
    // Gemini: Markdown + Structured reasoning
    parts.push('\n## Instructions\n- Think step by step and show your reasoning.\n- If the task is ambiguous, ask clarifying questions first.\n- Format your final answer distinctly from your reasoning.')
  } else {
    // GPT/Universal: Clear directives
    parts.push('\nINSTRUCTIONS:\n- Think through this step by step.\n- If uncertain, explain your reasoning before concluding.\n- Ensure your final answer directly addresses the task.')
  }
  
  // 9. Output delimiter for easy parsing
  if (format === 'xml') {
    parts.push('\n<answer>\n[Your response here]\n</answer>')
  } else {
    parts.push('\n---\n[Your response]')
  }
  
  return parts.join('\n')
}

// ── Model-Specific Builders (Wrapper) ──
function buildClaude(c: PromptConfig): string { return buildBasePrompt(c, 'xml') }
function buildGPT(c: PromptConfig): string { return buildBasePrompt(c, 'keyvalue') }
function buildGemini(c: PromptConfig): string { return buildBasePrompt(c, 'markdown') }
function buildUniversal(c: PromptConfig): string { return buildBasePrompt(c, 'keyvalue') }

// ── Exports ──
export const MODEL_PROFILES: Record<TargetModel, ModelProfile> = {
  claude: { name: 'Claude', description: 'XML-structured, chain-of-thought', icon: '🟠', buildPrompt: buildClaude },
  gpt: { name: 'GPT', description: 'Role-driven, numbered steps', icon: '🟢', buildPrompt: buildGPT },
  gemini: { name: 'Gemini', description: 'Markdown sections, direct', icon: '🔵', buildPrompt: buildGemini },
  universal: { name: 'Universal', description: 'Works across all models', icon: '⚪', buildPrompt: buildUniversal },
}

export function generatePrompt(config: PromptConfig): string {
  const profile = MODEL_PROFILES[config.targetModel]
  return profile.buildPrompt(config)
}
