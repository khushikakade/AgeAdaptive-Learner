export function useThemeEngine(age: number) {
  if (age <= 10) {
    return {
      colors: {
        background: "#FFE5F0",
        secondary: "#FFF0F7",
        accent: "#FF6FB4",
        accentForeground: "#FFFFFF",
        foreground: "#2D1B35",
        muted: "#8B5C7B",
        border: "#FFD4E5",
      },
      fonts: {
        headingFamily: "Comic Sans MS, cursive",
        headingSize: "2.5rem",
        bodySize: "1.1rem",
        captionSize: "0.9rem",
        heroSize: "3rem",
      },
      animations: {
        duration: 400,
        bounce: true,
      },
    }
  } else if (age <= 17) {
    return {
      colors: {
        background: "#0F1419",
        secondary: "#1A1F2E",
        accent: "#00D9FF",
        accentForeground: "#0F1419",
        foreground: "#E0E6FF",
        muted: "#8B92B0",
        border: "#2A3F5F",
      },
      fonts: {
        headingFamily: "Poppins, sans-serif",
        headingSize: "2rem",
        bodySize: "1rem",
        captionSize: "0.85rem",
        heroSize: "2.5rem",
      },
      animations: {
        duration: 300,
        bounce: false,
      },
    }
  } else if (age <= 30) {
    return {
      colors: {
        background: "#FFFFFF",
        secondary: "#F5F5F5",
        accent: "#2563EB",
        accentForeground: "#FFFFFF",
        foreground: "#1F2937",
        muted: "#9CA3AF",
        border: "#E5E7EB",
      },
      fonts: {
        headingFamily: "Inter, sans-serif",
        headingSize: "1.875rem",
        bodySize: "0.95rem",
        captionSize: "0.8rem",
        heroSize: "2rem",
      },
      animations: {
        duration: 200,
        bounce: false,
      },
    }
  } else {
    return {
      colors: {
        background: "#FEFEF8",
        secondary: "#F5F5F0",
        accent: "#1E40AF",
        accentForeground: "#FFFFFF",
        foreground: "#1A1A1A",
        muted: "#666666",
        border: "#D4D4D0",
      },
      fonts: {
        headingFamily: "Georgia, serif",
        headingSize: "1.75rem",
        bodySize: "1.1rem",
        captionSize: "0.9rem",
        heroSize: "1.8rem",
      },
      animations: {
        duration: 500,
        bounce: false,
      },
    }
  }
}
