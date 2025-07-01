"use client"

import { useEffect, useRef } from "react"
import Link from "next/link"

export default function GameDevPortfolioPlay() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let x = canvas.width / 2
    let y = canvas.height / 2
    let vx = 2
    let vy = 2
    const radius = 20
    let animationFrame: number

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      ctx.fillStyle = "#9333ea"
      ctx.beginPath()
      ctx.arc(x, y, radius, 0, Math.PI * 2)
      ctx.fill()
      x += vx
      y += vy
      if (x + radius > canvas.width || x - radius < 0) {
        vx *= -1
      }
      if (y + radius > canvas.height || y - radius < 0) {
        vy *= -1
      }
      animationFrame = requestAnimationFrame(draw)
    }

    draw()
    return () => cancelAnimationFrame(animationFrame)
  }, [])

  return (
    <div className="relative flex items-center justify-center min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <Link href="/" className="absolute top-4 left-4 px-3 py-1 bg-purple-600 text-white rounded hover:bg-purple-700">
        Back
      </Link>
      <canvas ref={canvasRef} width={600} height={400} className="bg-black rounded-lg" />
    </div>
  )
}
