"use client"

interface AgeSelectorProps {
  selectedAge: number
  onAgeChange: (age: number) => void
  theme: any
}

export function AgeSelector({ selectedAge, onAgeChange, theme }: AgeSelectorProps) {
  const getAgeGroup = (age: number) => {
    if (age <= 10) return "👶 Kids (5-10)"
    if (age <= 17) return "🧑 Teens (11-17)"
    if (age <= 30) return "👨 Adults (18-30)"
    return "👴 Seniors (30+)"
  }

  return (
    <div
      className="p-6 rounded-2xl space-y-4"
      style={{ backgroundColor: theme.colors.secondary, border: `2px solid ${theme.colors.border}` }}
    >
      <h3 style={{ fontSize: theme.fonts.bodySize }} className="font-bold">
        {selectedAge <= 10 ? "🎂 How Old?" : "Age Group"}
      </h3>

      <div
        className="p-4 rounded-xl text-center font-bold"
        style={{
          backgroundColor: theme.colors.accent,
          color: theme.colors.accentForeground,
          fontSize: theme.fonts.headingSize,
        }}
      >
        {getAgeGroup(selectedAge)}
      </div>

      <input
        type="range"
        min="5"
        max="100"
        value={selectedAge}
        onChange={(e) => onAgeChange(Number.parseInt(e.target.value))}
        className="w-full h-2 rounded-lg appearance-none cursor-pointer"
        style={{
          backgroundColor: theme.colors.border,
          accentColor: theme.colors.accent,
        }}
      />

      <div
        className="flex justify-between text-xs"
        style={{ color: theme.colors.muted, fontSize: theme.fonts.captionSize }}
      >
        <span>5</span>
        <span style={{ fontSize: theme.fonts.bodySize }} className="font-bold">
          {selectedAge} years
        </span>
        <span>100</span>
      </div>

      <div className="grid grid-cols-2 gap-2">
        {[
          { age: 8, label: selectedAge <= 10 ? "🎈 Kid" : "Young" },
          { age: 14, label: selectedAge <= 10 ? "🎮 Teen" : "Teens" },
          { age: 25, label: selectedAge <= 10 ? "👨 Adult" : "Adult" },
          { age: 65, label: selectedAge <= 10 ? "👴 Senior" : "Senior" },
        ].map((preset) => (
          <button
            key={preset.age}
            onClick={() => onAgeChange(preset.age)}
            className={`p-2 rounded-lg font-semibold transition-all ${
              Math.abs(selectedAge - preset.age) < 5 ? "ring-2" : "opacity-60"
            }`}
            style={{
              backgroundColor: theme.colors.background,
              color: theme.colors.foreground,
              fontSize: theme.fonts.captionSize,
              ringColor: theme.colors.accent,
            }}
          >
            {preset.label}
          </button>
        ))}
      </div>
    </div>
  )
}
