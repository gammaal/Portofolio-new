import { useEffect, useRef, useState } from 'react'
import { skills } from '../data/skills'
import { FaHtml5, FaJs, FaReact, FaLaravel, FaCode } from 'react-icons/fa'
import { SiFlutter, SiExpress, SiTailwindcss, SiBootstrap, SiMysql, SiTypescript, SiVite, SiNextdotjs } from 'react-icons/si'

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

/* ── Single animated skill card ─────────────────── */
function SkCard({ skill, index, barFired }) {
  const ref      = useRef(null)
  const [vis, setVis] = useState(false)

  useEffect(() => {
    const el = ref.current; if (!el) return
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVis(true); obs.disconnect() } },
      { threshold: 0.15 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  // alternate left/right slide per row
  const fromLeft = index % 2 === 0

  return (
    <div
      ref={ref}
      className="sk-card"
      style={{
        opacity:   vis ? 1 : 0,
        transform: vis ? 'none' : `translateX(${fromLeft ? '-28px' : '28px'})`,
        transition: `opacity 0.55s cubic-bezier(0.22,1,0.36,1) ${index * 0.06}s,
                     transform 0.55s cubic-bezier(0.22,1,0.36,1) ${index * 0.06}s`,
      }}
    >
      <span className="sk-icon" style={{
        transition: `transform 0.4s cubic-bezier(0.22,1,0.36,1) ${index * 0.06 + 0.25}s`,
        transform:  vis ? 'rotate(0deg) scale(1)' : 'rotate(-30deg) scale(0.7)',
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
              transition: `width 1s cubic-bezier(0.4,0,0.2,1) ${index * 0.07 + 0.3}s`,
            }}
          />
        </div>
        <span className="sk-level" style={{
          opacity: (barFired && vis) ? 1 : 0,
          transition: `opacity 0.4s ease ${index * 0.07 + 0.8}s`,
        }}>
          {skill.level}%
        </span>
      </div>
    </div>
  )
}

export default function Skills() {
  const sec   = useRef(null)
  const [barFired, setBarFired] = useState(false)

  useEffect(() => {
    const el = sec.current; if (!el) return
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setBarFired(true); obs.disconnect() } },
      { threshold: 0.1 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  return (
    <section id="skills" className="skills" ref={sec}>
      <div className="wrap">
        <div className="skills__heading-row reveal">
          <h2 className="skills__heading">Teknologi yang<br />saya kuasai</h2>
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
