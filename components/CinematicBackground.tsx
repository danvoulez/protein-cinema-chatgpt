// components/CinematicBackground.tsx
'use client'

import { useEffect, useRef } from 'react'

export function CinematicBackground({ active = true }: { active?: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const rafRef = useRef<number | undefined>(undefined)

  useEffect(() => {
    if (!active) return
    const canvas = canvasRef.current!
    const ctx = canvas.getContext('2d')!
    let w = (canvas.width = window.innerWidth)
    let h = (canvas.height = window.innerHeight)
    const onResize = () => {
      w = canvas.width = window.innerWidth
      h = canvas.height = window.innerHeight
    }
    window.addEventListener('resize', onResize)

    type Star = { x: number; y: number; z: number; s: number }
    const stars: Star[] = Array.from({ length: Math.min(250, Math.floor(w / 6)) }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      z: Math.random() * 0.5 + 0.5,
      s: Math.random() * 1.5 + 0.3
    }))

    const gradient = ctx.createLinearGradient(0, 0, w, h)
    gradient.addColorStop(0, 'rgba(6, 14, 47, 0.9)')
    gradient.addColorStop(1, 'rgba(2, 0, 20, 1)')

    const loop = () => {
      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, w, h)

      // "respiração" do glow
      const t = Date.now() * 0.001
      const glow = Math.floor((Math.sin(t) * 0.5 + 0.5) * 80) + 50

      for (const s of stars) {
        s.x += s.z // parallax leve
        if (s.x > w) s.x = 0
        ctx.beginPath()
        ctx.arc(s.x, s.y, s.s, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${glow}, ${180 + glow / 2}, 255, ${0.6 * s.z})`
        ctx.fill()
      }

      // barras laterais sutis (cinema vibes)
      ctx.fillStyle = 'rgba(0,255,255,0.06)'
      ctx.fillRect(0, 0, 2, h)
      ctx.fillRect(w - 2, 0, 2, h)

      rafRef.current = requestAnimationFrame(loop)
    }
    loop()

    return () => {
      window.removeEventListener('resize', onResize)
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [active])

  if (!active) return null
  return <canvas ref={canvasRef} className="fixed inset-0 z-0" aria-hidden />
}
