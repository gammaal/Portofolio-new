import { useState, useEffect, useRef } from 'react'
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

/* ── Animated project card ───────────────────────── */
function PjCard({ project, index }) {
  const ref  = useRef(null)
  const [vis, setVis] = useState(false)

  useEffect(() => {
    const el = ref.current; if (!el) return
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVis(true); obs.disconnect() } },
      { threshold: 0.08 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  return (
    <article
      ref={ref}
      className="pj"
      style={{
        opacity:   vis ? 1 : 0,
        transform: vis ? 'scale(1) translateY(0)' : 'scale(0.95) translateY(24px)',
        transition: `opacity 0.6s cubic-bezier(0.22,1,0.36,1) ${index * 0.1}s,
                     transform 0.6s cubic-bezier(0.22,1,0.36,1) ${index * 0.1}s`,
      }}
    >
      <div className="pj__img-wrap">
        <PjImage src={project.image} alt={project.title} />
      </div>
      <div className="pj__body">
        <div className="pj__meta">
          {project.tags?.map((t, i) => (
            <span key={t}>
              {i > 0 && <span className="pj__sep" />}
              <span className="pj__tag">{t}</span>
            </span>
          ))}
        </div>
        <h3 className="pj__title">{project.title}</h3>
        <p className="pj__desc">{project.description}</p>
        <div className="pj__links">
          {project.demoUrl && (
            <a href={project.demoUrl} className="pj__link pj__link--primary"
               target="_blank" rel="noreferrer">
              <FiExternalLink size={12} /> Demo
            </a>
          )}
          {project.repoUrl && (
            <a href={project.repoUrl} className="pj__link"
               target="_blank" rel="noreferrer">
              <FiGithub size={12} /> Kode
            </a>
          )}
        </div>
      </div>
    </article>
  )
}

export default function Projects() {
  const sec     = useRef(null)
  const [headVis, setHeadVis] = useState(false)

  useEffect(() => {
    const header = sec.current?.querySelector('.projects__header')
    if (!header) return
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setHeadVis(true); obs.disconnect() } },
      { threshold: 0.1 }
    )
    obs.observe(header)
    return () => obs.disconnect()
  }, [])

  return (
    <section id="projects" className="projects" ref={sec}>
      <div className="wrap">
        <div
          className="projects__header"
          style={{
            opacity:    headVis ? 1 : 0,
            transform:  headVis ? 'none' : 'translateY(16px)',
            transition: 'opacity 0.6s cubic-bezier(0.22,1,0.36,1), transform 0.6s cubic-bezier(0.22,1,0.36,1)',
          }}
        >
          <h2 className="projects__heading">
            Karya &amp; <span>Project</span>
          </h2>
          <span className="projects__count">{projects.length} project</span>
        </div>

        {projects.length === 0 ? (
          <p style={{ color: 'var(--text-3)', fontStyle: 'italic' }} />
        ) : (
          <div className="projects__grid">
            {projects.map((p, i) => (
              <PjCard key={p.id} project={p} index={i} />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
