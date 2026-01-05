"use client"

interface HistoryPanelProps {
  history: any[]
  onHistoryClick: (entry: any) => void
  theme: any
}

export function HistoryPanel({ history, onHistoryClick, theme }: HistoryPanelProps) {
  return (
    <div
      className="p-6 rounded-2xl space-y-4"
      style={{ backgroundColor: theme.colors.secondary, border: `2px solid ${theme.colors.border}` }}
    >
      <h3 style={{ fontSize: theme.fonts.bodySize }} className="font-bold">
        {history.length > 0 ? "⏰ Recent" : "📝 History"}
      </h3>

      <div className="space-y-2 max-h-96 overflow-y-auto">
        {history.map((entry) => (
          <button
            key={entry.id}
            onClick={() => onHistoryClick(entry)}
            className="w-full p-3 rounded-lg text-left transition-all hover:scale-105 hover:shadow-md"
            style={{
              backgroundColor: theme.colors.background,
              color: theme.colors.foreground,
              fontSize: theme.fonts.captionSize,
              borderLeft: `4px solid ${theme.colors.accent}`,
            }}
          >
            <div className="font-bold truncate">{entry.question}</div>
            <div style={{ color: theme.colors.muted, fontSize: theme.fonts.captionSize }}>
              Age: {entry.age} • {entry.mode}
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}
