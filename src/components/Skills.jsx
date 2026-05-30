import React from 'react'
import { skills } from '../data/skills'
import { FaHtml5, FaJs, FaReact, FaLaravel, FaCode } from 'react-icons/fa'
import { SiFlutter, SiExpress, SiTailwindcss, SiBootstrap, SiMysql, SiTypescript, SiVite, SiNextdotjs } from 'react-icons/si'

const iconMap = {
  html: <FaHtml5 className="text-[#e34f26]" />,
  css: <FaHtml5 className="text-[#1572b6]" />,
  javascript: <FaJs className="text-[#f7df1e]" />,
  js: <FaJs className="text-[#f7df1e]" />,
  react: <FaReact className="text-[#61dafb]" />,
  laravel: <FaLaravel className="text-[#ff2d20]" />,
  flutter: <SiFlutter className="text-[#02569b]" />,
  express: <SiExpress className="text-[#a8b9c0]" />,
  tailwind: <SiTailwindcss className="text-[#06b6d4]" />,
  bootstrap: <SiBootstrap className="text-[#7952b3]" />,
  mysql: <SiMysql className="text-[#4479a1]" />,
  typescript: <SiTypescript className="text-[#3178c6]" />,
  vite: <SiVite className="text-[#646cff]" />,
  nextjs: <SiNextdotjs className="text-[#ffffff]" />,
}

const renderSkillIcon = (iconName) => {
  if (!iconName) return <FaCode />
  const key = iconName.toLowerCase().trim()
  if (iconMap[key]) return iconMap[key]
  return <span style={{ fontStyle: 'normal' }}>{iconName}</span>
}

function Skills() {
  return (
    <section id="skills" className="section section--alt">
      <div className="container container--narrow">
        <p className="section-eyebrow">Kompetensi</p>
        <h2 className="section-title">Keahlian</h2>

        <div className="card skills-card">
          {skills.length === 0 ? (
            <p className="skills-empty">Belum ada keahlian.</p>
          ) : (
            <div className="skills-list">
              {skills.map((skill) => (
                <div key={skill.name} className="skill-item">
                  <div className="skill-item__label">
                    <span className="skill-item__title-group">
                      {skill.icon && <span className="skill-item__icon">{renderSkillIcon(skill.icon)}</span>}
                      <span>{skill.name}</span>
                    </span>
                    <span className="skill-item__percent">{skill.level}%</span>
                  </div>
                  <div className="skill-bar">
                    <div
                      className="skill-bar__fill"
                      style={{ width: `${Math.min(100, Math.max(0, skill.level))}%` }}
                      role="progressbar"
                      aria-valuenow={skill.level}
                      aria-valuemin={0}
                      aria-valuemax={100}
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

export default Skills
