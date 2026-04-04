'use client'

import { useState, useCallback } from 'react'
import { generatePrompt, MODEL_PROFILES } from '@/lib/prompt-builder'
import type { PromptConfig, TargetModel } from '@/types/pipeline'
import { Copy, Check, RotateCcw, ChevronRight, ChevronDown, Sparkles, Loader2 } from 'lucide-react'

const TONES = [
  { value: 'professional', label: 'Professional', icon: '💼' },
  { value: 'casual', label: 'Casual', icon: '😊' },
  { value: 'technical', label: 'Technical', icon: '⚙️' },
  { value: 'creative', label: 'Creative', icon: '🎨' },
  { value: 'educational', label: 'Educational', icon: '📚' },
] as const

const EMPTY_CONFIG: PromptConfig = {
  task: '', context: '', targetModel: 'claude', role: '',
  tone: 'professional', outputFormat: '', constraints: [],
  exampleInput: '', exampleOutput: '',
}

export function PromptForge() {
  const [config, setConfig] = useState<PromptConfig>(EMPTY_CONFIG)
  const [output, setOutput] = useState('')
  const [copied, setCopied] = useState(false)
  const [showExamples, setShowExamples] = useState(false)
  const [constraintInput, setConstraintInput] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const update = useCallback(<K extends keyof PromptConfig>(key: K, value: PromptConfig[K]) => {
    setConfig(prev => ({ ...prev, [key]: value }))
    if (error) setError(null)
  }, [error])

  const addConstraint = () => {
    const trimmed = constraintInput.trim()
    if (!trimmed) return
    update('constraints', [...config.constraints, trimmed])
    setConstraintInput('')
  }

  const removeConstraint = (index: number) => {
    update('constraints', config.constraints.filter((_, i) => i !== index))
  }

  const handleGenerate = () => {
    const task = config.task?.trim()
    if (!task) {
      setError('Please enter a task to generate a prompt.')
      return
    }
    setError(null)
    setIsGenerating(true)
    
    // Simulate async for better UX (remove if not needed)
    setTimeout(() => {
      try {
        const result = generatePrompt(config)
        setOutput(result)
      } catch (e) {
        setError('Failed to generate prompt. Please try again.')
        console.error(e)
      } finally {
        setIsGenerating(false)
      }
    }, 150)
  }

  const handleCopy = async () => {
    if (!output) return
    await navigator.clipboard.writeText(output)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleReset = () => {
    setConfig(EMPTY_CONFIG)
    setOutput('')
    setConstraintInput('')
    setShowExamples(false)
    setError(null)
  }

  const canGenerate = config.task?.trim().length > 0 && !isGenerating

  return (
    <div className="space-y-8">
      {/* Model Selector */}
      <div>
        <label className="mb-3 block text-xs font-medium uppercase tracking-wider text-zinc-500">
          Target Model
        </label>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
          {(Object.entries(MODEL_PROFILES) as [TargetModel, typeof MODEL_PROFILES[TargetModel]][]).map(
            ([key, profile]) => (
              <button
                key={key}
                onClick={() => update('targetModel', key)}
                className={`rounded-lg border px-3 py-3 text-left transition-all ${
                  config.targetModel === key
                    ? 'border-zinc-500 bg-zinc-800/80 ring-1 ring-zinc-500/30'
                    : 'border-zinc-800 bg-zinc-900/50 hover:border-zinc-700 hover:bg-zinc-800/40'
                }`}
                aria-pressed={config.targetModel === key}
              >
                <div className="flex items-center gap-2">
                  <span className="text-lg" aria-hidden="true">{profile.icon}</span>
                  <span className="text-sm font-medium text-zinc-200">{profile.name}</span>
                </div>
                <p className="mt-1 text-xs text-zinc-500">{profile.description}</p>
              </button>
            )
          )}
        </div>
      </div>

      {/* Task (required) */}
      <div>
        <label className="mb-2 block text-xs font-medium uppercase tracking-wider text-zinc-500">
          Task <span className="text-red-400" aria-hidden="true">*</span>
        </label>
        <textarea
          value={config.task}
          onChange={e => update('task', e.target.value)}
          placeholder="What should the AI do? e.g. 'Write a product description for a smart water bottle'"
          rows={3}
          className="w-full rounded-lg border border-zinc-800 bg-zinc-900/50 px-4 py-3 text-sm text-zinc-200 placeholder-zinc-600 outline-none transition-colors focus:border-zinc-600 focus:ring-1 focus:ring-zinc-600/30"
          aria-required="true"
          aria-invalid={!!error && !config.task?.trim()}
        />
        {error && !config.task?.trim() && (
          <p className="mt-1 text-xs text-red-400" role="alert">{error}</p>
        )}
      </div>

      {/* Role */}
      <div>
        <label className="mb-2 block text-xs font-medium uppercase tracking-wider text-zinc-500">Role</label>
        <input type="text" value={config.role} onChange={e => update('role', e.target.value)}
          placeholder="e.g. 'a senior copywriter with 10 years of experience'"
          className="w-full rounded-lg border border-zinc-800 bg-zinc-900/50 px-4 py-3 text-sm text-zinc-200 placeholder-zinc-600 outline-none transition-colors focus:border-zinc-600 focus:ring-1 focus:ring-zinc-600/30" />
      </div>

      {/* Context */}
      <div>
        <label className="mb-2 block text-xs font-medium uppercase tracking-wider text-zinc-500">Context</label>
        <textarea value={config.context} onChange={e => update('context', e.target.value)}
          placeholder="Background info the AI needs to know" rows={2}
          className="w-full rounded-lg border border-zinc-800 bg-zinc-900/50 px-4 py-3 text-sm text-zinc-200 placeholder-zinc-600 outline-none transition-colors focus:border-zinc-600 focus:ring-1 focus:ring-zinc-600/30" />
      </div>

      {/* Tone */}
      <div>
        <label className="mb-3 block text-xs font-medium uppercase tracking-wider text-zinc-500">Tone</label>
        <div className="flex flex-wrap gap-2" role="radiogroup" aria-label="Select tone">
          {TONES.map(t => (
            <button key={t.value} onClick={() => update('tone', t.value)}
              role="radio" aria-checked={config.tone === t.value}
              className={`rounded-full border px-3 py-1.5 text-xs font-medium transition-all ${
                config.tone === t.value ? 'border-zinc-500 bg-zinc-800 text-zinc-200' : 'border-zinc-800 text-zinc-500 hover:border-zinc-700 hover:text-zinc-400'
              }`}>
              <span aria-hidden="true">{t.icon}</span> {t.label}
            </button>
          ))}
        </div>
      </div>

      {/* Output Format */}
      <div>
        <label className="mb-2 block text-xs font-medium uppercase tracking-wider text-zinc-500">Output Format</label>
        <input type="text" value={config.outputFormat} onChange={e => update('outputFormat', e.target.value)}
          placeholder="e.g. 'JSON with title, description, and bullet points'"
          className="w-full rounded-lg border border-zinc-800 bg-zinc-900/50 px-4 py-3 text-sm text-zinc-200 placeholder-zinc-600 outline-none transition-colors focus:border-zinc-600 focus:ring-1 focus:ring-zinc-600/30" />
      </div>

      {/* Constraints */}
      <div>
        <label className="mb-2 block text-xs font-medium uppercase tracking-wider text-zinc-500">Constraints</label>
        <div className="flex gap-2">
          <input type="text" value={constraintInput} onChange={e => setConstraintInput(e.target.value)}
            onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); addConstraint() } }}
            placeholder="Add a constraint and press Enter"
            className="flex-1 rounded-lg border border-zinc-800 bg-zinc-900/50 px-4 py-2.5 text-sm text-zinc-200 placeholder-zinc-600 outline-none transition-colors focus:border-zinc-600 focus:ring-1 focus:ring-zinc-600/30" />
          <button onClick={addConstraint} className="rounded-lg border border-zinc-700 px-3 py-2.5 text-xs font-medium text-zinc-400 transition-colors hover:bg-zinc-800 hover:text-zinc-200">Add</button>
        </div>
        {config.constraints.length > 0 && (
          <div className="mt-2 flex flex-wrap gap-1.5">
            {config.constraints.map((c, i) => (
              <span key={i} className="inline-flex items-center gap-1 rounded-md border border-zinc-800 bg-zinc-900 px-2.5 py-1 text-xs text-zinc-400">
                {c}
                <button onClick={() => removeConstraint(i)} className="ml-1 text-zinc-600 hover:text-red-400" aria-label={`Remove constraint: ${c}`}>×</button>
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Examples (collapsible) */}
      <div>
        <button onClick={() => setShowExamples(!showExamples)}
          className="flex items-center gap-1.5 text-xs font-medium uppercase tracking-wider text-zinc-500 hover:text-zinc-400"
          aria-expanded={showExamples} aria-controls="examples-section">
          {showExamples ? <ChevronDown className="h-3.5 w-3.5" aria-hidden="true" /> : <ChevronRight className="h-3.5 w-3.5" aria-hidden="true" />}
          Few-Shot Example (optional)
        </button>
        {showExamples && (
          <div id="examples-section" className="mt-3 space-y-3 rounded-lg border border-zinc-800/50 bg-zinc-900/30 p-4">
            <div>
              <label className="mb-1.5 block text-xs text-zinc-500">Example Input</label>
              <textarea value={config.exampleInput} onChange={e => update('exampleInput', e.target.value)}
                placeholder="What would the user say?" rows={2}
                className="w-full rounded-lg border border-zinc-800 bg-zinc-900/50 px-3 py-2 text-sm text-zinc-200 placeholder-zinc-600 outline-none focus:border-zinc-600" />
            </div>
            <div>
              <label className="mb-1.5 block text-xs text-zinc-500">Expected Output</label>
              <textarea value={config.exampleOutput} onChange={e => update('exampleOutput', e.target.value)}
                placeholder="What should the AI respond?" rows={2}
                className="w-full rounded-lg border border-zinc-800 bg-zinc-900/50 px-3 py-2 text-sm text-zinc-200 placeholder-zinc-600 outline-none focus:border-zinc-600" />
            </div>
          </div>
        )}
      </div>

      {/* Generate Button */}
      <div className="flex gap-3">
        <button onClick={handleGenerate} disabled={!canGenerate}
          className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-zinc-100 px-6 py-3 text-sm font-semibold text-zinc-900 transition-all hover:bg-white disabled:opacity-30 disabled:hover:bg-zinc-100"
          aria-busy={isGenerating}>
          {isGenerating ? <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" /> : <Sparkles className="h-4 w-4" aria-hidden="true" />}
          {isGenerating ? 'Forging...' : 'Forge Prompt'}
        </button>
        {output && (
          <button onClick={handleReset} className="rounded-lg border border-zinc-800 px-4 py-3 text-zinc-500 transition-colors hover:border-zinc-600 hover:text-zinc-300" aria-label="Reset form">
            <RotateCcw className="h-4 w-4" aria-hidden="true" />
          </button>
        )}
      </div>

      {/* Output */}
      {output && (
        <div className="relative">
          <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
            <div className="flex items-center gap-2">
              <span className="text-lg" aria-hidden="true">{MODEL_PROFILES[config.targetModel].icon}</span>
              <h3 className="text-sm font-medium text-zinc-300">{MODEL_PROFILES[config.targetModel].name}-optimized Prompt</h3>
            </div>
            <button onClick={handleCopy} className="flex items-center gap-1.5 rounded-md border border-zinc-700 px-3 py-1.5 text-xs font-medium text-zinc-400 transition-all hover:bg-zinc-800 hover:text-zinc-200" aria-live="polite">
              {copied ? <Check className="h-3.5 w-3.5 text-green-400" aria-hidden="true" /> : <Copy className="h-3.5 w-3.5" aria-hidden="true" />}
              {copied ? 'Copied!' : 'Copy'}
            </button>
          </div>
          <pre className="mt-4 max-h-96 overflow-auto whitespace-pre-wrap rounded-lg border border-zinc-800 bg-zinc-900/80 p-4 font-mono text-sm leading-relaxed text-zinc-300" aria-label="Generated prompt">
            {output}
          </pre>
        </div>
      )}
    </div>
  )
}
