import { useState, useEffect, useRef } from 'react'

const links = [
  { id: 'home',         label: 'Home' },
  { id: 'about',        label: 'About' },
  { id: 'projects',     label: 'Work' },
  { id: 'skills',       label: 'Skills' },
  { id: 'certificates', label: 'Certs' },
  { id: 'contact',      label: 'Contact' },
]

/* ── Magnetic nav button ─────────────────────────── */
function MagNavBtn({ label, isActive, onClick }) {
  const ref = useRef(null)

  const onMove = e => {
    const el = ref.current; if (!el) return
    const r  = el.getBoundingClientRect()
    const dx = (e.clientX - r.left - r.width  / 2) * 0.22
    const dy = (e.clientY - r.top  - r.height / 2) * 0.22
    el.style.transform  = `translate(${dx}px, ${dy}px)`
    el.style.transition = 'transform 0.1s ease'
  }
  const onLeave = () => {
    if (ref.current) {
      ref.current.style.transform  = ''
      ref.current.style.transition = 'transform 0.45s cubic-bezier(0.22,1,0.36,1)'
    }
  }

  return (
    <button
      ref={ref}
      className={`nav__btn${isActive ? ' is-active' : ''}`}
      onClick={onClick}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
    >
      {label}
    </button>
  )
}

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [active,   setActive]   = useState('home')
  const [progress, setProgress] = useState(0)
  const [visible,  setVisible]  = useState(false)   // entrance animation

  useEffect(() => {
    // entrance: short delay after mount
    const t = setTimeout(() => setVisible(true), 80)
    return () => clearTimeout(t)
  }, [])

  useEffect(() => {
    const handler = () => {
      const sy    = window.scrollY
      const total = document.documentElement.scrollHeight - window.innerHeight
      setProgress(total > 0 ? (sy / total) * 100 : 0)
      setScrolled(sy > 40)

      const ids = links.map(l => l.id)
      for (let i = ids.length - 1; i >= 0; i--) {
        const el = document.getElementById(ids[i])
        if (el && sy >= el.offsetTop - 120) { setActive(ids[i]); break }
      }
    }
    window.addEventListener('scroll', handler, { passive: true })
    handler()   // run once on mount
    return () => window.removeEventListener('scroll', handler)
  }, [])

  const go = id => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })

  return (
    <header
      className={`nav${scrolled ? ' scrolled' : ''}`}
      style={{
        opacity:    visible ? 1 : 0,
        transform:  visible ? 'translateY(0)' : 'translateY(-12px)',
        transition: 'opacity 0.5s ease 0.1s, transform 0.5s cubic-bezier(0.22,1,0.36,1) 0.1s',
      }}
    >
      {/* scroll progress bar */}
      <div className="nav__progress" style={{ width: `${progress}%` }} aria-hidden="true" />

      <div className="nav__inner">
        <button
          className="nav__logo"
          onClick={() => go('home')}
          style={{
            opacity:    visible ? 1 : 0,
            transform:  visible ? 'none' : 'translateX(-8px)',
            transition: 'opacity 0.45s ease 0.2s, transform 0.45s ease 0.2s',
          }}
        >
          Gamma Alfatah
        </button>

        <ul className="nav__links">
          {links.map((l, i) => (
            <li
              key={l.id}
              style={{
                opacity:    visible ? 1 : 0,
                transform:  visible ? 'none' : 'translateY(-6px)',
                transition: `opacity 0.4s ease ${0.15 + i * 0.05}s,
                             transform 0.4s ease ${0.15 + i * 0.05}s`,
              }}
            >
              <MagNavBtn
                label={l.label}
                isActive={active === l.id}
                onClick={() => go(l.id)}
              />
            </li>
          ))}
        </ul>
      </div>
    </header>
  )
}
