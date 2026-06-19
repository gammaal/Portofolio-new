import React from 'react'

const links = [
  { id: 'about',        label: 'About' },
  { id: 'projects',     label: 'Work' },
  { id: 'skills',       label: 'Skills' },
  { id: 'certificates', label: 'Certs' },
  { id: 'contact',      label: 'Contact' },
]

export default function Footer() {
  const go = id => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })

  return (
    <footer className="footer">
      <div className="footer__inner">
        <p className="footer__copy">
          &copy; {new Date().getFullYear()} <strong>Gamma Alfatah</strong>
        </p>
        <nav className="footer__nav" aria-label="Footer nav">
          {links.map(l => (
            <button key={l.id} className="footer__link" onClick={() => go(l.id)}>
              {l.label}
            </button>
          ))}
        </nav>
      </div>
    </footer>
  )
}
