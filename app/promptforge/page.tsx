import { PromptForge } from '../../components/prompt-forge'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Prompt Forge | Agent Bot',
  description: 'Build model-optimized prompts — no API key needed',
}

export default function PromptForgePage() {
  return (
    <main className="min-h-screen bg-zinc-950 px-4 py-12">
      <div className="mx-auto max-w-2xl">
        <div className="mb-8">
          <a href="/" className="text-sm text-zinc-500 hover:text-zinc-300 transition-colors">
            ← Back to Home
          </a>
        </div>
        
        <div className="mb-10 text-center">
          <h1 className="text-3xl font-semibold tracking-tight text-zinc-50">
            Prompt Forge
          </h1>
          <p className="mt-2 text-sm text-zinc-500">
            Build model-optimized prompts — no API key needed
          </p>
        </div>
        
        <PromptForge />
      </div>
    </main>
  )
}
