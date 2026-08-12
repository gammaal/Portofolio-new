import { useRef, useCallback } from 'react'

/**
 * useRipple – adds a material-style ripple to any clickable element.
 * Returns { ref, createRipple }
 *
 * Usage:
 *   const { ref, createRipple } = useRipple()
 *   <button ref={ref} onClick={createRipple} style={{ position:'relative', overflow:'hidden' }}>
 */
export function useRipple(color = 'rgba(255,255,255,0.25)') {
  const ref = useRef(null)

  const createRipple = useCallback(e => {
    const el = ref.current
    if (!el) return

    const existing = el.querySelector('.ripple-wave')
    if (existing) existing.remove()

    const rect   = el.getBoundingClientRect()
    const size   = Math.max(rect.width, rect.height) * 2
    const x      = e.clientX - rect.left - size / 2
    const y      = e.clientY - rect.top  - size / 2

    const circle = document.createElement('span')
    circle.className = 'ripple-wave'
    Object.assign(circle.style, {
      position:   'absolute',
      width:      size + 'px',
      height:     size + 'px',
      left:       x + 'px',
      top:        y + 'px',
      borderRadius: '50%',
      background:   color,
      pointerEvents: 'none',
      transform:  'scale(0)',
      animation:  'ripple-expand 0.55s cubic-bezier(0.4,0,0.2,1) forwards',
    })
    el.appendChild(circle)
    circle.addEventListener('animationend', () => circle.remove(), { once: true })
  }, [color])

  return { ref, createRipple }
}
