import React, { useState, useEffect, useRef } from 'react'
import { projects } from '../data/projects'
import { FiExternalLink, FiGithub } from 'react-icons/fi'

function PjImage({ src, alt }) {
  const [failed, setFailed] = useState(false)
  if (!src || failed)
    return <div className="pj__placeholder">Belum ada gambar</div>
  return (
    <img
      className="pj__img"
      src={src}
      alt={alt}
      loading="lazy"
      onError={() => setFailed(true)}
    />
  )
}

export default function Projects() {
  const sec = useRef(null)

  useEffect(() => {
    const els = sec.current?.querySelectorAll('.reveal') ?? []
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => e.isIntersecting && e.target.classList.add('visible')),
      { threshold: 0.1 }
    )
    els.forEach(el => obs.observe(el))
    return () => obs.disconnect()
  }, [])

  return (
    <section id="projects" className="projects" ref={sec}>
      <div className="wrap">
        <div className="projects__header reveal">
          <h2 className="projects__heading">
            Karya &amp; <span>Project</span>
          </h2>
          <span className="projects__count">{projects.length} project</span>
        </div>

        {projects.length === 0 ? (
          <p style={{ color: 'var(--text-3)', fontStyle: 'italic' }}>
          </p>
        ) : (
          <div className="projects__grid reveal reveal-d1">
            {projects.map((p) => (
              <article key={p.id} className="pj">
                <div className="pj__img-wrap">
                  <PjImage src={p.image} alt={p.title} />
                </div>
                <div className="pj__body">
                  <div className="pj__meta">
                    {p.tags?.map((t, i) => (
                      <React.Fragment key={t}>
                        {i > 0 && <span className="pj__sep" />}
                        <span className="pj__tag">{t}</span>
                      </React.Fragment>
                    ))}
                  </div>
                  <h3 className="pj__title">{p.title}</h3>
                  <p className="pj__desc">{p.description}</p>
                  <div className="pj__links">
                    {p.demoUrl && (
                      <a
                        href={p.demoUrl}
                        className="pj__link pj__link--primary"
                        target="_blank"
                        rel="noreferrer"
                      >
                        <FiExternalLink size={12} /> Demo
                      </a>
                    )}
                    {p.repoUrl && (
                      <a
                        href={p.repoUrl}
                        className="pj__link"
                        target="_blank"
                        rel="noreferrer"
                      >
                        <FiGithub size={12} /> Kode
                      </a>
                    )}
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
