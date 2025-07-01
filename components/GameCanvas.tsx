"use client"

import { useRef, useEffect } from "react"

export default function GameCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const context = canvas.getContext("2d")
    if (!context) return

    let x = 50
    let y = 50
    let dx = 2
    let dy = 2
    const radius = 20
    let animationFrame: number

    const draw = () => {
      context.clearRect(0, 0, canvas.width, canvas.height)
      context.fillStyle = "#6366F1"
      context.beginPath()
      context.arc(x, y, radius, 0, Math.PI * 2)
      context.fill()

      x += dx
      y += dy
      if (x + radius > canvas.width || x - radius < 0) dx *= -1
      if (y + radius > canvas.height || y - radius < 0) dy *= -1

      animationFrame = requestAnimationFrame(draw)
    }

    draw()
    return () => cancelAnimationFrame(animationFrame)
  }, [])

  return (
    <canvas
      ref={canvasRef}
      width={600}
      height={400}
      className="mx-auto my-8 bg-black rounded shadow-md"
    />
  )
}
