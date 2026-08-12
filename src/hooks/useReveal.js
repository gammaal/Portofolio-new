import { useEffect, useRef } from 'react'

/**
 * Adds .visible to [data-reveal] elements when they enter the viewport.
 * Supports data-reveal-delay="N" → adds reveal-dN class.
 * Supports data-reveal-dir="left|right|scale" → adds reveal-left/right/scale.
 */
export function useReveal(threshold = 0.1) {
  const ref = useRef(null)

  useEffect(() => {
    const section = ref.current
    if (!section) return

    const els = section.querySelectorAll('[data-reveal]')

    // pre-assign classes based on data attributes
    els.forEach(el => {
      el.classList.add('reveal')
      const dir   = el.dataset.revealDir
      const delay = el.dataset.revealDelay
      if (dir)   el.classList.add(`reveal-${dir}`)
      if (delay) el.classList.add(`reveal-d${delay}`)
    })

    const obs = new IntersectionObserver(
      entries => entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('visible')
          obs.unobserve(e.target)
        }
      }),
      { threshold }
    )
    els.forEach(el => obs.observe(el))
    return () => obs.disconnect()
  }, [threshold])

  return ref
}
