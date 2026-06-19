import React, { useState, useEffect } from 'react'

const links = [
  { id: 'home',         label: 'Home' },
  { id: 'about',        label: 'About' },
  { id: 'projects',     label: 'Work' },
  { id: 'skills',       label: 'Skills' },
  { id: 'certificates', label: 'Certs' },
  { id: 'contact',      label: 'Contact' },
]

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive]     = useState('home')

  useEffect(() => {
    const handler = () => {
      setScrolled(window.scrollY > 40)
      const ids = links.map(l => l.id)
      for (let i = ids.length - 1; i >= 0; i--) {
        const el = document.getElementById(ids[i])
        if (el && window.scrollY >= el.offsetTop - 120) {
          setActive(ids[i]); break
        }
      }
    }
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  const go = id => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })

  return (
    <header className={`nav${scrolled ? ' scrolled' : ''}`}>
      <div className="nav__inner">
        <button className="nav__logo" onClick={() => go('home')}>
          Gamma Alfatah
        </button>
        <ul className="nav__links">
          {links.map(l => (
            <li key={l.id}>
              <button
                className={`nav__btn${active === l.id ? ' is-active' : ''}`}
                onClick={() => go(l.id)}
              >
                {l.label}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </header>
  )
}
