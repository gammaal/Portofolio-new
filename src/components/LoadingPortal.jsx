import { useEffect, useRef, useState } from 'react'

export default function LoadingPortal({ onDone }) {
  const canvasRef = useRef(null)
  const [phase, setPhase] = useState('enter')
  const animRef  = useRef(null)

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

    const CX = () => W / 2
    const CY = () => H / 2

    // ring particles — slower, more elegant
    const RINGS = 3
    const PER_RING = 32
    const rings = Array.from({ length: RINGS }, (_, ri) => ({
      radius: 85 + ri * 52,
      speed:  0.0025 + ri * 0.0012,
      offset: (ri * Math.PI * 2) / RINGS,
      particles: Array.from({ length: PER_RING }, (__, pi) => ({
        angle: (pi / PER_RING) * Math.PI * 2,
        size:  0.8 + Math.random() * 1.4,
        alpha: 0.25 + Math.random() * 0.45,
        drift: (Math.random() - 0.5) * 0.002,
      })),
    }))

    // streaking stars — fewer, longer trails
    const STARS = 55
    const stars = Array.from({ length: STARS }, () => ({
      angle: Math.random() * Math.PI * 2,
      dist:  Math.random() * 0.45 + 0.55,
      speed: 0.45 + Math.random() * 0.9,
      size:  0.5 + Math.random() * 1.0,
      alpha: Math.random() * 0.5 + 0.15,
    }))

    let elapsed  = 0
    let lastTime = null
    let done     = false

    const draw = (ts) => {
      if (done) return
      if (!lastTime) lastTime = ts
      const dt = Math.min(ts - lastTime, 50)
      lastTime = ts
      elapsed += dt

      // global fade-in over first 600 ms
      const fadeIn = Math.min(elapsed / 600, 1)

      ctx.clearRect(0, 0, W, H)

      // background
      const bg = ctx.createRadialGradient(CX(), CY(), 0, CX(), CY(), Math.max(W, H) * 0.75)
      bg.addColorStop(0,   'rgba(8, 15, 40, 0.97)')
      bg.addColorStop(0.5, 'rgba(5, 9, 25, 0.99)')
      bg.addColorStop(1,   'rgba(3, 5, 15, 1)')
      ctx.fillStyle = bg
      ctx.fillRect(0, 0, W, H)

      const t = elapsed / 1000

      // portal glow — 4 layers breathing gently
      const portalSizes  = [230, 165, 105, 52]
      const portalColors = [
        [29,  78, 216],
        [37,  99, 235],
        [59, 130, 246],
        [96, 165, 250],
      ]
      portalSizes.forEach((sz, i) => {
        const col   = portalColors[i]
        // gentle sine pulse — amplitude reduced for smoothness
        const pulse = 1 + Math.sin(t * 1.8 + i * 0.9) * 0.05
        const alpha = (0.5 - i * 0.09) * fadeIn
        const g = ctx.createRadialGradient(CX(), CY(), 0, CX(), CY(), sz * pulse)
        g.addColorStop(0,   `rgba(${col[0]}, ${col[1]}, ${col[2]}, ${alpha})`)
        g.addColorStop(0.55,`rgba(${col[0]}, ${col[1]}, ${col[2]}, ${alpha * 0.25})`)
        g.addColorStop(1,   'rgba(0,0,0,0)')
        ctx.fillStyle = g
        ctx.beginPath()
        ctx.arc(CX(), CY(), sz * pulse, 0, Math.PI * 2)
        ctx.fill()
      })

      // ring particles — smooth, no harsh flicker
      rings.forEach(ring => {
        ring.offset += ring.speed
        ring.particles.forEach(p => {
          p.angle += p.drift
          const a     = p.angle + ring.offset
          const pulse = 1 + Math.sin(t * 2 + p.angle) * 0.04
          const x     = CX() + Math.cos(a) * ring.radius * pulse
          const y     = CY() + Math.sin(a) * ring.radius * pulse
          // slow sinusoidal brightness instead of rapid flicker
          const bright = 0.55 + 0.45 * Math.sin(t * 1.5 + p.angle * 5)
          ctx.beginPath()
          ctx.arc(x, y, p.size, 0, Math.PI * 2)
          ctx.fillStyle = `rgba(96, 165, 250, ${p.alpha * bright * fadeIn})`
          ctx.fill()
        })
      })

      // inward-streaking stars
      const half = Math.sqrt(W * W + H * H) / 2
      stars.forEach(s => {
        s.dist -= s.speed * dt * 0.0008
        if (s.dist < 0.04) {
          s.dist  = 0.55 + Math.random() * 0.45
          s.angle = Math.random() * Math.PI * 2
          s.speed = 0.45 + Math.random() * 0.9
        }
        const d      = s.dist * half
        const x      = CX() + Math.cos(s.angle) * d
        const y      = CY() + Math.sin(s.angle) * d
        const streak = s.speed * 14
        // fade tail toward center
        const trailAlpha = s.alpha * (1 - s.dist * 0.5) * fadeIn
        ctx.beginPath()
        ctx.moveTo(x, y)
        ctx.lineTo(
          CX() + Math.cos(s.angle) * (d + streak),
          CY() + Math.sin(s.angle) * (d + streak),
        )
        ctx.strokeStyle = `rgba(147, 197, 253, ${trailAlpha})`
        ctx.lineWidth   = s.size
        ctx.stroke()
      })

      // center core — slow breathe
      const corePulse = 1 + Math.sin(t * 2.2) * 0.12
      const coreG = ctx.createRadialGradient(CX(), CY(), 0, CX(), CY(), 38 * corePulse)
      coreG.addColorStop(0,   `rgba(219, 234, 254, ${0.9 * fadeIn})`)
      coreG.addColorStop(0.35,`rgba(59, 130, 246, ${0.5 * fadeIn})`)
      coreG.addColorStop(1,   'rgba(0,0,0,0)')
      ctx.fillStyle = coreG
      ctx.beginPath()
      ctx.arc(CX(), CY(), 38 * corePulse, 0, Math.PI * 2)
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
    // hold longer so letter animations finish comfortably
    const t1 = setTimeout(() => setPhase('exit'), 2400)
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

      <div className="portal-label">
        <p className="portal-label__sub">Portfolio</p>
        <h1 className="portal-label__name">
          {'Welcome'.split('').map((ch, i) => (
            <span
              key={i}
              className="portal-label__char"
              style={{ animationDelay: `${0.35 + i * 0.08}s` }}
            >
              {ch}
            </span>
          ))}
        </h1>
        <div className="portal-label__bar-wrap">
          <div className="portal-label__bar" />
        </div>
        <span className="portal-label__dots">
          <span /><span /><span />
        </span>
      </div>
    </div>
  )
}
