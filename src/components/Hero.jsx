import React, { useEffect, useRef } from 'react'
import { FiArrowDown, FiArrowRight } from 'react-icons/fi'

export default function Hero() {
  const go      = id => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  const spotRef = useRef(null)

  // subtle cursor-following glow — only on desktop
  useEffect(() => {
    const el = spotRef.current
    if (!el || window.matchMedia('(pointer: coarse)').matches) return
    const move = ({ clientX: x, clientY: y }) => {
      el.style.transform = `translate(${x}px, ${y}px)`
    }
    window.addEventListener('mousemove', move, { passive: true })
    return () => window.removeEventListener('mousemove', move)
  }, [])

  return (
    <section id="home" className="hero">
      {/* cursor spotlight */}
      <div className="hero__spot-wrap" aria-hidden="true">
        <div className="hero__spot" ref={spotRef} />
      </div>

      <div className="hero__wrap hero__wrap--centered">
        <div className="hero__left">
          <div className="hero__tag">
            <span className="hero__tag-line" />
            Web &amp; Mobile Developer
          </div>

          <h1 className="hero__name">
            Gamma <em>Alfatah</em>
          </h1>

          <p className="hero__role">
            Pelajar SMK Wikrama Bogor, jurusan PPLG. Fokus membangun
            antarmuka yang bersih dan fungsional dengan teknologi modern.
          </p>

          <div className="hero__actions">
            <button className="btn btn--gold" onClick={() => go('projects')}>
              Lihat Karya <FiArrowRight size={14} />
            </button>
            <button className="btn btn--ghost" onClick={() => go('contact')}>
              Hubungi Saya
            </button>
          </div>
        </div>
      </div>

      <button
        className="hero__scroll"
        onClick={() => go('about')}
        aria-label="Scroll ke bawah"
      >
        <FiArrowDown size={13} />
        Scroll
      </button>
    </section>
  )
}
