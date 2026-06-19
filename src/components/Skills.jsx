import React, { useEffect, useRef, useState } from 'react'
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

export default function Skills() {
  const sec      = useRef(null)
  const [fired, setFired] = useState(false)   // trigger bar animation once

  useEffect(() => {
    const els = sec.current?.querySelectorAll('.reveal') ?? []
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => e.isIntersecting && e.target.classList.add('visible')),
      { threshold: 0.08 }
    )
    els.forEach(el => obs.observe(el))

    // fire bar animation when section enters viewport
    const secObs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setFired(true); secObs.disconnect() } },
      { threshold: 0.15 }
    )
    if (sec.current) secObs.observe(sec.current)

    return () => { obs.disconnect(); secObs.disconnect() }
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
            <div key={s.name} className={`sk-card reveal reveal-d${Math.min(i + 1, 5)}`}>
              <span className="sk-icon">{getIcon(s.icon)}</span>
              <div className="sk-info">
                <span className="sk-name">{s.name}</span>
                <div className="sk-bar-wrap">
                  <div
                    className="sk-bar"
                    style={{ width: fired ? `${s.level}%` : '0%' }}
                  />
                </div>
                <span className="sk-level">{s.level}%</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
