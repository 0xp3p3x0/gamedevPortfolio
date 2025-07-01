"use client"

import { useEffect, useState } from "react"
import GameCanvas from "@/components/GameCanvas"

export default function GameDevPortfolioPlay() {
  const [activeSection, setActiveSection] = useState("hero")

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["hero"]
      const scrollPosition = window.scrollY + 100

      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const offsetTop = element.offsetTop
          const offsetHeight = element.offsetHeight

          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/20 backdrop-blur-md border-b border-white/10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="text-2xl font-bold text-white">{"Hiroshi Tanabe"}</div>
            <div className="hidden md:flex space-x-8">
              {["hero"].map((section) => (
                <button
                  key={section}
                  onClick={() => scrollToSection(section)}
                  className={`capitalize transition-colors ${activeSection === section ? "text-purple-400" : "text-white hover:text-purple-300"}`}
                >
                  Home
                </button>
              ))}
            </div>
          </div>

        </div>
      </nav>

      {/* Canvas Section */}
      <section id="hero" className="pt-24 container mx-auto px-4">
        <h2 className="text-4xl font-bold text-white text-center mb-4">Play</h2>
        <GameCanvas />
      </section>
    </div>
  )
}