export function useExplainAPI() {
  const explainQuestion = async (
    question: string,
    age: number,
    mode: string
  ) => {
    try {
      const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000"
      const response = await fetch(`${API_URL}/explain`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          question,
          age,
          mode,
        }),
      })

      if (!response.ok) {
        throw new Error("Backend error")
      }

      const data = await response.json()
      return data
    } catch (error) {
      console.error("Explain API error:", error)
      throw error
    }
  }

  return { explainQuestion }
}
