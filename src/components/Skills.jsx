import React from 'react'
import { skills } from '../data/skills'

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
                      {skill.icon && <span className="skill-item__icon">{skill.icon}</span>}
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
