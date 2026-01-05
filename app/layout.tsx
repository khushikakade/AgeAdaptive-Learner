import type React from "react"
import { Geist, Geist_Mono } from "next/font/google"
import "./globals.css"

const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata = {
  title: "AgeAdaptiveLearner - Smart Explanations for Every Age",
  description:
    "Get intelligent, age-appropriate explanations for any question. Dynamic UI that adapts to kids, teens, adults, and seniors.",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`font-sans antialiased`}>{children}</body>
    </html>
  )
}
