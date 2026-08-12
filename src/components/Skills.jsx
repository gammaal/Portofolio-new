import { useEffect, useRef, useState } from 'react'
import { skills } from '../data/skills'
import { FaHtml5, FaJs, FaReact, FaLaravel, FaCode } from 'react-icons/fa'
import { SiFlutter, SiExpress, SiTailwindcss, SiBootstrap, SiMysql, SiTypescript, SiVite, SiNextdotjs } from 'react-icons/si'
import SplitHeading from './SplitHeading'

const ICONS = {
  html:       <FaHtml5       style={{ color: '#e34f26' }} />,
  css:        <FaHtml5       style={{ color: '#1572b6' }} />,
  javascript: <FaJs          style={{ color: '#f7df1e' }} />,
  js:         <FaJs          style={{ color: '#f7df1e' }} />,
  react:      <FaReact       style={{ color: '#61dafb' }} />,
  laravel:    <FaLaravel     style={{ color: '#ff2d20' }} />,
  flutter:    <SiFlutter     style={{ color: '#54c5f8' }} />,
  express:    <SiExpress     style={{ color: '#aab4be' }} />,
  tailwind:   <SiTailwindcss style={{ color: '#06b6d4' }} />,
  bootstrap:  <SiBootstrap   style={{ color: '#7952b3' }} />,
  mysql:      <SiMysql       style={{ color: '#4479a1' }} />,
  typescript: <SiTypescript  style={{ color: '#3178c6' }} />,
  vite:       <SiVite        style={{ color: '#646cff' }} />,
  nextjs:     <SiNextdotjs />,
}
const getIcon = n => (!n ? <FaCode /> : ICONS[n.toLowerCase().trim()] ?? <FaCode />)

/* ── Skill card with ripple ──────────────────────── */
function SkCard({ skill, index, barFired }) {
  const ref        = useRef(null)
  const [vis, setVis] = useState(false)
  const [hov, setHov] = useState(false)

  useEffect(() => {
    const el = ref.current; if (!el) return
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVis(true); obs.disconnect() } },
      { threshold: 0.15 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  // click ripple
  const createRipple = e => {
    const el   = ref.current; if (!el) return
    const rect = el.getBoundingClientRect()
    const size = Math.max(rect.width, rect.height) * 2
    const span = document.createElement('span')
    span.className = 'ripple-wave'
    Object.assign(span.style, {
      position: 'absolute',
      width: size + 'px', height: size + 'px',
      left: (e.clientX - rect.left - size / 2) + 'px',
      top:  (e.clientY - rect.top  - size / 2) + 'px',
      borderRadius: '50%',
      background: 'rgba(59,130,246,0.15)',
      pointerEvents: 'none',
      transform: 'scale(0)',
      animation: 'ripple-expand 0.55s cubic-bezier(0.4,0,0.2,1) forwards',
    })
    el.appendChild(span)
    span.addEventListener('animationend', () => span.remove(), { once: true })
  }

  const fromLeft = index % 2 === 0

  return (
    <div
      ref={ref}
      className="sk-card"
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      onClick={createRipple}
      style={{
        opacity:   vis ? 1 : 0,
        transform: vis ? 'none' : `translateX(${fromLeft ? '-28px' : '28px'})`,
        transition: `opacity 0.55s cubic-bezier(0.22,1,0.36,1) ${index * 0.06}s,
                     transform 0.55s cubic-bezier(0.22,1,0.36,1) ${index * 0.06}s`,
        position: 'relative', overflow: 'hidden',
      }}
    >
      <span className="sk-icon" style={{
        transition: `transform 0.45s cubic-bezier(0.22,1,0.36,1) ${index * 0.06 + 0.2}s`,
        transform:  vis ? (hov ? 'rotate(8deg) scale(1.12)' : 'rotate(0deg) scale(1)')
                        : 'rotate(-30deg) scale(0.6)',
      }}>
        {getIcon(skill.icon)}
      </span>
      <div className="sk-info">
        <span className="sk-name">{skill.name}</span>
        <div className="sk-bar-wrap">
          <div
            className="sk-bar"
            style={{
              width: (barFired && vis) ? `${skill.level}%` : '0%',
              transition: `width 1.1s cubic-bezier(0.4,0,0.2,1) ${index * 0.07 + 0.25}s`,
            }}
          />
        </div>
        <span className="sk-level" style={{
          opacity: (barFired && vis) ? 1 : 0,
          transition: `opacity 0.4s ease ${index * 0.07 + 0.85}s`,
        }}>
          {skill.level}%
        </span>
      </div>
    </div>
  )
}

export default function Skills() {
  const sec        = useRef(null)
  const [barFired, setBarFired] = useState(false)
  const [headVis,  setHeadVis]  = useState(false)   // FIX: was never observed before

  useEffect(() => {
    const el = sec.current; if (!el) return

    // fire bar animation
    const secObs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setBarFired(true); secObs.disconnect() } },
      { threshold: 0.1 }
    )
    secObs.observe(el)

    // heading reveal — FIX for permanently-hidden heading
    const row = el.querySelector('.skills__heading-row')
    if (row) {
      const rowObs = new IntersectionObserver(
        ([e]) => { if (e.isIntersecting) { setHeadVis(true); rowObs.disconnect() } },
        { threshold: 0.1 }
      )
      rowObs.observe(row)
    }

    return () => secObs.disconnect()
  }, [])

  return (
    <section id="skills" className="skills" ref={sec}>
      <div className="wrap">
        <div
          className="skills__heading-row"
          style={{
            opacity:    headVis ? 1 : 0,
            transform:  headVis ? 'none' : 'translateY(18px)',
            transition: 'opacity 0.65s cubic-bezier(0.22,1,0.36,1), transform 0.65s cubic-bezier(0.22,1,0.36,1)',
          }}
        >
          <SplitHeading as="h2" className="skills__heading" stagger={70}>
            {`Teknologi yang\nsaya kuasai`}
          </SplitHeading>
          <p className="skills__note">
            Stack yang sering saya pakai dalam project sehari-hari,
            dari frontend sampai backend.
          </p>
        </div>

        <div className="skills__grid">
          {skills.map((s, i) => (
            <SkCard key={s.name} skill={s} index={i} barFired={barFired} />
          ))}
        </div>
      </div>
    </section>
  )
}
