import { useRef } from 'react'

/**
 * useTilt – attach to any card-like element for mouse 3D tilt + shine.
 * Returns { ref, onMouseMove, onMouseLeave }
 *
 * @param {object} opts
 * @param {number} opts.maxTilt  – max rotation degrees (default 10)
 * @param {number} opts.scale    – scale on hover (default 1.03)
 * @param {number} opts.shine    – shine overlay opacity 0-1 (default 0.08)
 */
export function useTilt({ maxTilt = 10, scale = 1.03, shine = 0.08 } = {}) {
  const ref      = useRef(null)
  const shineRef = useRef(null)

  const onMouseMove = e => {
    const el = ref.current
    if (!el) return
    const { left, top, width, height } = el.getBoundingClientRect()
    const x = (e.clientX - left) / width  - 0.5   // -0.5 → 0.5
    const y = (e.clientY - top)  / height - 0.5

    el.style.transform =
      `perspective(700px) rotateY(${x * maxTilt}deg) rotateX(${-y * maxTilt}deg) scale(${scale})`
    el.style.transition = 'transform 0.1s ease'

    if (shineRef.current) {
      shineRef.current.style.background =
        `radial-gradient(circle at ${(x + 0.5) * 100}% ${(y + 0.5) * 100}%,
          rgba(255,255,255,${shine}) 0%, transparent 60%)`
    }
  }

  const onMouseLeave = () => {
    const el = ref.current
    if (el) {
      el.style.transform  = ''
      el.style.transition = 'transform 0.55s cubic-bezier(0.22,1,0.36,1)'
    }
    if (shineRef.current) shineRef.current.style.background = 'none'
  }

  return { ref, shineRef, onMouseMove, onMouseLeave }
}
