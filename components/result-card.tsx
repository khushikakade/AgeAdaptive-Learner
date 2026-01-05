"use client"

import { useState } from "react"

interface ResultCardProps {
  result: any
  theme: any
  selectedAge: number
}

export function ResultCard({ result, theme, selectedAge }: ResultCardProps) {
  const [copied, setCopied] = useState(false)
  const [isListening, setIsListening] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(result.explanation || "")
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleAudio = () => {
    if ("speechSynthesis" in window) {
      if (isListening) {
        speechSynthesis.cancel()
        setIsListening(false)
      } else {
        const utterance = new SpeechSynthesisUtterance(result.explanation || "")
        utterance.rate = selectedAge <= 10 ? 0.9 : 1
        utterance.onend = () => setIsListening(false)
        setIsListening(true)
        speechSynthesis.speak(utterance)
      }
    }
  }

  if (result.error) {
    return (
      <div className="p-6 rounded-2xl" style={{ backgroundColor: "#fee", border: "2px solid #f99" }}>
        <p style={{ color: "#c33", fontSize: theme.fonts.bodySize }}>{result.error}</p>
      </div>
    )
  }

  return (
    <div
      className="p-8 rounded-2xl space-y-6"
      style={{ backgroundColor: theme.colors.secondary, border: `3px solid ${theme.colors.accent}` }}
    >
      {/* Main Explanation */}
      <div>
        <h2 className="font-bold mb-3" style={{ fontSize: theme.fonts.headingSize, color: theme.colors.accent }}>
          {selectedAge <= 10 ? "✨ Here's the Answer!" : "📚 Explanation"}
        </h2>
        <p
          style={{
            fontSize: theme.fonts.bodySize,
            lineHeight: selectedAge <= 10 ? "1.8" : "1.6",
            color: theme.colors.foreground,
          }}
          className="leading-relaxed"
        >
          {result.explanation}
        </p>
      </div>

      {/* AI Explanation */}
      {result.aiExplanation && (
        <div
          className="p-4 rounded-xl border-l-4"
          style={{ backgroundColor: theme.colors.background, borderColor: theme.colors.accent }}
        >
          <h3 className="font-bold mb-2" style={{ fontSize: theme.fonts.bodySize }}>
            🤖 AI Insight:
          </h3>
          <p style={{ fontSize: theme.fonts.captionSize, color: theme.colors.muted }}>{result.aiExplanation}</p>
        </div>
      )}

      {/* Action Buttons */}
      <div className="grid grid-cols-3 gap-3">
        <button
          onClick={handleAudio}
          className="py-3 rounded-lg font-bold transition-all hover:scale-105"
          style={{
            backgroundColor: isListening ? theme.colors.accentAlt || "#ff6b6b" : theme.colors.accent,
            color: theme.colors.accentForeground,
            fontSize: theme.fonts.captionSize,
          }}
        >
          {isListening ? "⏹️ Stop" : "🔊 Listen"}
        </button>
        <button
          onClick={handleCopy}
          className="py-3 rounded-lg font-bold transition-all hover:scale-105"
          style={{
            backgroundColor: theme.colors.accent,
            color: theme.colors.accentForeground,
            fontSize: theme.fonts.captionSize,
          }}
        >
          {copied ? "✓ Copied" : "📋 Copy"}
        </button>
        <button
          onClick={() => window.print()}
          className="py-3 rounded-lg font-bold transition-all hover:scale-105"
          style={{
            backgroundColor: theme.colors.accent,
            color: theme.colors.accentForeground,
            fontSize: theme.fonts.captionSize,
          }}
        >
          📄 Save
        </button>
      </div>
    </div>
  )
}
