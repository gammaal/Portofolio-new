import { useEffect, useRef, useState } from 'react'

/**
 * SplitHeading – splits text into words, reveals each word one at a time
 * when the element enters the viewport.
 *
 * Props:
 *   as        – tag name ('h2', 'h3', …)  default 'h2'
 *   children  – plain string (no JSX children with nested elements)
 *   className – forwarded to the wrapper
 *   delay     – base delay in ms before first word (default 0)
 *   stagger   – ms between each word (default 60)
 */
export default function SplitHeading({
  as: Tag = 'h2',
  children,
  className = '',
  delay = 0,
  stagger = 60,
  ...rest
}) {
  const ref = useRef(null)
  const [vis, setVis] = useState(false)

  useEffect(() => {
    const el = ref.current; if (!el) return
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVis(true); obs.disconnect() } },
      { threshold: 0.2 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  // split on spaces but keep line-breaks (\n) as <br />
  const segments = String(children).split('\n')

  let wordIndex = 0

  return (
    <Tag ref={ref} className={className} {...rest}>
      {segments.map((line, li) => (
        <span key={li} style={{ display: 'block' }}>
          {line.split(' ').map(word => {
            const wi   = wordIndex++
            const ms   = delay + wi * stagger
            return (
              <span
                key={wi}
                className="split-word"
                style={{
                  display:         'inline-block',
                  overflow:        'hidden',
                  verticalAlign:   'bottom',
                  marginRight:     '0.28em',
                }}
              >
                <span
                  style={{
                    display:    'inline-block',
                    transform:  vis ? 'translateY(0)' : 'translateY(110%)',
                    opacity:    vis ? 1 : 0,
                    transition: `transform 0.65s cubic-bezier(0.22,1,0.36,1) ${ms}ms,
                                 opacity   0.45s ease ${ms}ms`,
                  }}
                >
                  {word}
                </span>
              </span>
            )
          })}
        </span>
      ))}
    </Tag>
  )
}
