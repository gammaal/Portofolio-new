import { useEffect, useRef } from 'react'

/**
 * CursorTrail – renders a canvas full-page that draws a soft glowing trail
 * following the mouse. Completely invisible on touch devices.
 */
export default function CursorTrail() {
  const canvasRef = useRef(null)

  useEffect(() => {
    // skip on touch screens
    if (window.matchMedia('(pointer: coarse)').matches) return

    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')

    let W = canvas.width  = window.innerWidth
    let H = canvas.height = window.innerHeight

    const onResize = () => {
      W = canvas.width  = window.innerWidth
      H = canvas.height = window.innerHeight
    }
    window.addEventListener('resize', onResize)

    // trail dots
    const TRAIL_LEN = 18
    const trail = Array.from({ length: TRAIL_LEN }, () => ({ x: -999, y: -999 }))
    let mouse = { x: -999, y: -999 }
    let animId

    const onMove = ({ clientX: x, clientY: y }) => { mouse.x = x; mouse.y = y }
    window.addEventListener('mousemove', onMove, { passive: true })

    const draw = () => {
      ctx.clearRect(0, 0, W, H)

      // shift trail
      for (let i = TRAIL_LEN - 1; i > 0; i--) {
        trail[i].x = trail[i - 1].x
        trail[i].y = trail[i - 1].y
      }
      // lerp head toward mouse
      trail[0].x += (mouse.x - trail[0].x) * 0.35
      trail[0].y += (mouse.y - trail[0].y) * 0.35

      // draw dots
      for (let i = 0; i < TRAIL_LEN; i++) {
        const t     = 1 - i / TRAIL_LEN        // 1 → 0 (head → tail)
        const r     = 4 * t                     // radius shrinks toward tail
        const alpha = 0.28 * t

        ctx.beginPath()
        ctx.arc(trail[i].x, trail[i].y, r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(96,165,250,${alpha})`
        ctx.fill()

        // extra outer glow on head
        if (i < 4) {
          const g = ctx.createRadialGradient(
            trail[i].x, trail[i].y, 0,
            trail[i].x, trail[i].y, 14 * t
          )
          g.addColorStop(0,   `rgba(59,130,246,${0.06 * t})`)
          g.addColorStop(1,   'rgba(0,0,0,0)')
          ctx.fillStyle = g
          ctx.beginPath()
          ctx.arc(trail[i].x, trail[i].y, 14 * t, 0, Math.PI * 2)
          ctx.fill()
        }
      }

      animId = requestAnimationFrame(draw)
    }
    animId = requestAnimationFrame(draw)

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', onResize)
      window.removeEventListener('mousemove', onMove)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{
        position:      'fixed',
        inset:         0,
        pointerEvents: 'none',
        zIndex:        9998,
        mixBlendMode:  'screen',
      }}
    />
  )
}
