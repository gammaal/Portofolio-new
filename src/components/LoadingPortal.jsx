import React, { useEffect, useRef, useState } from 'react'

export default function LoadingPortal({ onDone }) {
  const canvasRef = useRef(null)
  const [phase, setPhase] = useState('enter') // enter | hold | exit
  const animRef  = useRef(null)
  const startRef = useRef(null)

  /* ── Canvas portal ─────────────────────────────── */
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')

    let W, H
    const resize = () => {
      W = canvas.width  = window.innerWidth
      H = canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    // portal config
    const CX = () => W / 2
    const CY = () => H / 2

    // ring particles orbiting the portal
    const RINGS = 3
    const PER_RING = 38
    const rings = Array.from({ length: RINGS }, (_, ri) => ({
      radius: 80 + ri * 55,
      speed:  0.004 + ri * 0.002,
      offset: (ri * Math.PI * 2) / RINGS,
      particles: Array.from({ length: PER_RING }, (__, pi) => ({
        angle: (pi / PER_RING) * Math.PI * 2,
        size:  1 + Math.random() * 1.8,
        alpha: 0.3 + Math.random() * 0.5,
        drift: (Math.random() - 0.5) * 0.003,
      })),
    }))

    // stardust flying inward
    const STARS = 80
    const stars = Array.from({ length: STARS }, () => ({
      angle: Math.random() * Math.PI * 2,
      dist:  Math.random() * 0.5 + 0.5,   // 0.5…1 of half-diagonal
      speed: 0.6 + Math.random() * 1.2,
      size:  0.6 + Math.random() * 1.2,
      alpha: Math.random() * 0.6 + 0.2,
    }))

    let elapsed = 0
    let lastTime = null
    let done = false

    const draw = (ts) => {
      if (done) return
      if (!lastTime) lastTime = ts
      const dt = Math.min(ts - lastTime, 50)
      lastTime = ts
      elapsed += dt

      ctx.clearRect(0, 0, W, H)

      // ── background vignette
      const bg = ctx.createRadialGradient(CX(), CY(), 0, CX(), CY(), Math.max(W, H) * 0.75)
      bg.addColorStop(0,   'rgba(8, 15, 40, 0.96)')
      bg.addColorStop(0.5, 'rgba(5, 9, 25, 0.98)')
      bg.addColorStop(1,   'rgba(3, 5, 15, 1)')
      ctx.fillStyle = bg
      ctx.fillRect(0, 0, W, H)

      const t = elapsed / 1000   // seconds

      // ── portal glow layers
      const portalSizes  = [220, 160, 100, 50]
      const portalColors = [
        [29,  78, 216],   // blue-dark  #1d4ed8
        [37,  99, 235],   // blue       #2563eb
        [59, 130, 246],   // blue-500   #3b82f6
        [96, 165, 250],   // blue-light #60a5fa
      ]
      portalSizes.forEach((sz, i) => {
        const col   = portalColors[i]
        const pulse = 1 + Math.sin(t * 2.5 + i) * 0.08
        const g = ctx.createRadialGradient(CX(), CY(), 0, CX(), CY(), sz * pulse)
        g.addColorStop(0,   `rgba(${col[0]}, ${col[1]}, ${col[2]}, ${0.55 - i * 0.1})`)
        g.addColorStop(0.6, `rgba(${col[0]}, ${col[1]}, ${col[2]}, ${0.15 - i * 0.02})`)
        g.addColorStop(1,   'rgba(0,0,0,0)')
        ctx.fillStyle = g
        ctx.beginPath()
        ctx.arc(CX(), CY(), sz * pulse, 0, Math.PI * 2)
        ctx.fill()
      })

      // ── ring particles
      rings.forEach(ring => {
        ring.offset += ring.speed
        ring.particles.forEach(p => {
          p.angle += p.drift
          const a = p.angle + ring.offset
          const pulse = 1 + Math.sin(t * 3 + p.angle) * 0.06
          const x = CX() + Math.cos(a) * ring.radius * pulse
          const y = CY() + Math.sin(a) * ring.radius * pulse
          const flicker = 0.5 + 0.5 * Math.sin(t * 8 + p.angle * 12)
          ctx.beginPath()
          ctx.arc(x, y, p.size, 0, Math.PI * 2)
          ctx.fillStyle = `rgba(96, 165, 250, ${p.alpha * flicker})`
          ctx.fill()
        })
      })

      // ── inward-streaking stars
      const half = Math.sqrt(W * W + H * H) / 2
      stars.forEach(s => {
        s.dist -= s.speed * dt * 0.001
        if (s.dist < 0.05) {
          s.dist  = 0.6 + Math.random() * 0.4
          s.angle = Math.random() * Math.PI * 2
          s.speed = 0.6 + Math.random() * 1.2
        }
        const d = s.dist * half
        const x = CX() + Math.cos(s.angle) * d
        const y = CY() + Math.sin(s.angle) * d
        const streak = s.speed * 10
        ctx.beginPath()
        ctx.moveTo(x, y)
        ctx.lineTo(
          CX() + Math.cos(s.angle) * (d + streak),
          CY() + Math.sin(s.angle) * (d + streak),
        )
        ctx.strokeStyle = `rgba(147, 197, 253, ${s.alpha})`
        ctx.lineWidth   = s.size
        ctx.stroke()
      })

      // ── center bright core
      const coreG = ctx.createRadialGradient(CX(), CY(), 0, CX(), CY(), 36)
      coreG.addColorStop(0,   'rgba(219, 234, 254, 0.95)')
      coreG.addColorStop(0.3, 'rgba(59, 130, 246, 0.6)')
      coreG.addColorStop(1,   'rgba(0,0,0,0)')
      ctx.fillStyle = coreG
      ctx.beginPath()
      ctx.arc(CX(), CY(), 36, 0, Math.PI * 2)
      ctx.fill()

      animRef.current = requestAnimationFrame(draw)
    }

    animRef.current = requestAnimationFrame(draw)

    return () => {
      done = true
      cancelAnimationFrame(animRef.current)
      window.removeEventListener('resize', resize)
    }
  }, [])

  /* ── Phase timeline ─────────────────────────────── */
  useEffect(() => {
    // hold for 1.8s then start exit
    const t1 = setTimeout(() => setPhase('exit'), 1800)
    return () => clearTimeout(t1)
  }, [])

  const handleAnimEnd = () => {
    if (phase === 'exit') {
      cancelAnimationFrame(animRef.current)
      onDone()
    }
  }

  return (
    <div
      className={`portal-overlay portal-overlay--${phase}`}
      onAnimationEnd={handleAnimEnd}
    >
      <canvas ref={canvasRef} className="portal-canvas" />

      {/* center label */}
      <div className="portal-label">
        <span className="portal-label__name">Welcome</span>
        <span className="portal-label__dots">
          <span /><span /><span />
        </span>
      </div>
    </div>
  )
}
