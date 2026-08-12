import { useEffect, useRef, useState } from 'react'

const links = [
  { id: 'about',        label: 'About'   },
  { id: 'projects',     label: 'Work'    },
  { id: 'skills',       label: 'Skills'  },
  { id: 'certificates', label: 'Certs'   },
  { id: 'contact',      label: 'Contact' },
]

export default function Footer() {
  const ref = useRef(null)
  const [vis, setVis] = useState(false)
  const go  = id => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })

  useEffect(() => {
    const el = ref.current; if (!el) return
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVis(true); obs.disconnect() } },
      { threshold: 0.3 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  return (
    <footer
      className="footer"
      ref={ref}
      style={{
        opacity:    vis ? 1 : 0,
        transform:  vis ? 'none' : 'translateY(14px)',
        transition: 'opacity 0.6s cubic-bezier(0.22,1,0.36,1), transform 0.6s cubic-bezier(0.22,1,0.36,1)',
      }}
    >
      <div className="footer__inner">
        <p className="footer__copy">
          &copy; {new Date().getFullYear()} <strong>Gamma Alfatah</strong>
        </p>
        <nav className="footer__nav" aria-label="Footer nav">
          {links.map((l, i) => (
            <button
              key={l.id}
              className="footer__link"
              onClick={() => go(l.id)}
              style={{
                opacity:    vis ? 1 : 0,
                transform:  vis ? 'none' : 'translateY(8px)',
                transition: `opacity 0.4s ease ${0.1 + i * 0.06}s, transform 0.4s ease ${0.1 + i * 0.06}s`,
              }}
            >
              {l.label}
            </button>
          ))}
        </nav>
      </div>
    </footer>
  )
}
