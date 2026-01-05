"use client"

interface QuestionBoxProps {
  question: string
  onQuestionChange: (q: string) => void
  onExplain: () => void
  loading: boolean
  theme: any
  selectedAge: number
}

export function QuestionBox({ question, onQuestionChange, onExplain, loading, theme, selectedAge }: QuestionBoxProps) {
  return (
    <div
      className="p-6 rounded-2xl space-y-4"
      style={{ backgroundColor: theme.colors.secondary, border: `2px solid ${theme.colors.border}` }}
    >
      <label style={{ fontSize: theme.fonts.bodySize }} className="font-bold block">
        {selectedAge <= 10 ? "💭 Ask Me Anything!" : "Ask Your Question"}
      </label>

      <textarea
        value={question}
        onChange={(e) => onQuestionChange(e.target.value)}
        placeholder={
          selectedAge <= 10
            ? "What do you want to know? 🤔"
            : selectedAge <= 17
              ? "Ask anything you are curious about..."
              : "Enter your question here..."
        }
        className="w-full p-4 rounded-xl resize-none focus:outline-none focus:ring-2"
        rows={4}
        style={{
          backgroundColor: theme.colors.background,
          color: theme.colors.foreground,
          borderColor: theme.colors.border,
          ringColor: theme.colors.accent,
          fontSize: theme.fonts.bodySize,
          minHeight: selectedAge <= 10 ? "100px" : "80px",
        }}
      />

      <button
        onClick={onExplain}
        disabled={!question.trim() || loading}
        className="w-full py-4 rounded-xl font-bold transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
        style={{
          backgroundColor: theme.colors.accent,
          color: theme.colors.accentForeground,
          fontSize: theme.fonts.bodySize,
        }}
      >
        {loading ? (
          <span className="inline-flex items-center gap-2">
            <span className="inline-block animate-spin">⏳</span>
            {selectedAge <= 10 ? "Thinking..." : "Processing..."}
          </span>
        ) : (
          <span>{selectedAge <= 10 ? "✨ Explain!" : selectedAge <= 17 ? "🚀 Explain" : "→ Explain"}</span>
        )}
      </button>

      {question && !loading && (
        <div style={{ fontSize: theme.fonts.captionSize, color: theme.colors.muted }} className="text-center">
          {Math.ceil(question.length / 50)} {selectedAge <= 10 ? "words" : "words"} ready
        </div>
      )}
    </div>
  )
}
