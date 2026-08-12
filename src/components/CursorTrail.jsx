import { useEffect, useRef } from 'react'

/**
 * CursorGlow – a very subtle radial spotlight that follows the cursor.
 * Inspired by Vercel / Linear's approach: no custom cursor,
 * just a soft ambient glow that makes the page feel alive.
 * Invisible on touch devices.
 */
export default function CursorTrail() {
  const ref = useRef(null)

  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) return

    const el = ref.current
    if (!el) return

    let cx = window.innerWidth  / 2
    let cy = window.innerHeight / 2
    let tx = cx, ty = cy
    let animId

    const onMove = ({ clientX, clientY }) => {
      tx = clientX
      ty = clientY
    }
    window.addEventListener('mousemove', onMove, { passive: true })

    const tick = () => {
      // smooth lerp toward mouse
      cx += (tx - cx) * 0.08
      cy += (ty - cy) * 0.08
      el.style.transform = `translate(${cx}px, ${cy}px)`
      animId = requestAnimationFrame(tick)
    }
    animId = requestAnimationFrame(tick)

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('mousemove', onMove)
    }
  }, [])

  return (
    <div
      ref={ref}
      aria-hidden="true"
      style={{
        position:      'fixed',
        top:           0,
        left:          0,
        width:         500,
        height:        500,
        borderRadius:  '50%',
        pointerEvents: 'none',
        zIndex:        0,
        translate:     '-50% -50%',
        background:    'radial-gradient(circle, rgba(59,130,246,0.045) 0%, transparent 65%)',
        willChange:    'transform',
      }}
    />
  )
}
