"use client"

import { useState, useEffect } from "react"
import { AgeSelector } from "@/components/age-selector"
import { QuestionBox } from "@/components/question-box"
import { ResultCard } from "@/components/result-card"
import { HistoryPanel } from "@/components/history-panel"
import { useThemeEngine } from "@/hooks/use-theme-engine"
import { useExplainAPI } from "@/hooks/use-explain-api"

export default function Home() {
  const [selectedAge, setSelectedAge] = useState<number>(10)
  const [question, setQuestion] = useState("")
  const [mode, setMode] = useState<"normal" | "ai" | "hybrid">("normal")
  const [result, setResult] = useState<any>(null)
  const [history, setHistory] = useState<any[]>([])
  const [loading, setLoading] = useState(false)

  const theme = useThemeEngine(selectedAge)
  const { explainQuestion } = useExplainAPI()

  // Load history
  useEffect(() => {
    const saved = localStorage.getItem("aal-history")
    if (saved) setHistory(JSON.parse(saved))
  }, [])

  // Save history
  useEffect(() => {
    localStorage.setItem("aal-history", JSON.stringify(history))
  }, [history])

  const handleExplain = async () => {
    if (!question.trim()) return

    setLoading(true)
    setResult(null)

    try {
      const response: any = await explainQuestion(question, selectedAge, mode)


      /**
       * Normalize backend response
       * Backend returns: answer / final_answer
       */
      const explanation =
        response.answer ||
        response.final_answer ||
        response.explanation ||
        "No explanation received."

      const normalizedResult = {
        ...response,
        explanation,
      }

      setResult(normalizedResult)

      // History entry
      const newEntry = {
        id: Date.now(),
        question,
        age: selectedAge,
        mode,
        timestamp: new Date().toISOString(),
        summary: explanation.substring(0, 100) + "...",
      }

      setHistory([newEntry, ...history.slice(0, 9)])
    } catch (err) {
      console.error(err)
      setResult({ explanation: "❌ Failed to get explanation." })
    } finally {
      setLoading(false)
    }
  }

  const handleHistoryClick = (entry: any) => {
    setQuestion(entry.question)
    setSelectedAge(entry.age)
    setMode(entry.mode)
  }

  return (
    <div style={{ backgroundColor: theme.colors.background, color: theme.colors.foreground }}>
      <style>{`
        :root {
          --bg-primary: ${theme.colors.background};
          --bg-secondary: ${theme.colors.secondary};
          --accent: ${theme.colors.accent};
          --text-primary: ${theme.colors.foreground};
          --text-secondary: ${theme.colors.muted};
        }
        body {
          background-color: var(--bg-primary);
          color: var(--text-primary);
        }
      `}</style>

      {/* Header */}
      <header
        className="sticky top-0 z-40 border-b"
        style={{ borderColor: theme.colors.border, backgroundColor: theme.colors.background }}
      >
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="font-bold text-xl">🧠 AgeAdaptive Learner</h1>
        </div>
      </header>

      {/* Main */}
      <main className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="space-y-6">
            <AgeSelector selectedAge={selectedAge} onAgeChange={setSelectedAge} theme={theme} />

            {/* Mode Selector */}
            <div className="p-6 rounded-xl" style={{ backgroundColor: theme.colors.secondary }}>
              {["normal", "ai", "hybrid"].map((m) => (
                <button
                  key={m}
                  onClick={() => setMode(m as any)}
                  className={`block w-full p-3 mb-2 rounded ${
                    mode === m ? "ring-2" : "opacity-70"
                  }`}
                >
                  {m.toUpperCase()}
                </button>
              ))}
            </div>

            {history.length > 0 && (
              <HistoryPanel history={history} onHistoryClick={handleHistoryClick} theme={theme} />
            )}
          </div>

          <div className="lg:col-span-2 space-y-6">
            <QuestionBox
              question={question}
              onQuestionChange={setQuestion}
              onExplain={handleExplain}
              loading={loading}
              theme={theme}
              selectedAge={selectedAge}
            />

            {result && <ResultCard result={result} theme={theme} selectedAge={selectedAge} />}
          </div>
        </div>
      </main>
    </div>
  )
}
