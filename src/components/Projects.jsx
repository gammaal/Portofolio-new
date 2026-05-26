import React, { useState } from 'react'
import { projects } from '../data/projects'

function ProjectImage({ src, alt }) {
  const [failed, setFailed] = useState(false)

  if (!src || failed) {
    return (
      <div className="project-card-placeholder" role="img" aria-label={alt}>
        <span>Taruh foto di public/projects/</span>
      </div>
    )
  }

  return (
    <img
      className="project-card-media"
      src={src}
      alt={alt}
      loading="lazy"
      onError={() => setFailed(true)}
    />
  )
}

function Projects() {
  return (
    <section id="projects" className="projects-section">
      <div className="container">
        <p className="section-eyebrow">Portofolio</p>
        <h2 className="section-title">Project Saya</h2>

        {projects.length === 0 ? (
          <div className="card projects-empty">
            <p>Belum ada project. Tambahkan di src/data/projects.js</p>
          </div>
        ) : (
          <div className="projects-grid">
            {projects.map((project) => (
              <article key={project.id} className="project-card">
                <div className="project-card__media-wrap">
                  <ProjectImage src={project.image} alt={project.title} />
                </div>

                <div className="project-card-body">
                  <h3 className="project-card-title">{project.title}</h3>
                  <p className="project-card-desc">{project.description}</p>

                  {(project.tags?.length ?? 0) > 0 && (
                    <div className="project-tag-row">
                      {project.tags.map((tag) => (
                        <span key={`${project.id}-${tag}`} className="project-tag">
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}

                  <div className="project-actions">
                    {project.demoUrl ? (
                      <a
                        href={project.demoUrl}
                        className="project-btn-primary"
                        target={project.demoUrl.startsWith('http') ? '_blank' : undefined}
                        rel={project.demoUrl.startsWith('http') ? 'noreferrer' : undefined}
                      >
                        Lihat
                      </a>
                    ) : null}
                    {project.repoUrl ? (
                      <a
                        href={project.repoUrl}
                        className="project-btn-secondary"
                        target={project.repoUrl.startsWith('http') ? '_blank' : undefined}
                        rel={project.repoUrl.startsWith('http') ? 'noreferrer' : undefined}
                      >
                        Repo
                      </a>
                    ) : null}
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

export default Projects
