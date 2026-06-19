import React, { useState, useEffect, useRef } from 'react'
import { certificates } from '../data/certificates'
import { FiExternalLink } from 'react-icons/fi'

function CertImg({ cert }) {
  const [failed, setFailed] = useState(false)
  if (failed) {
    return (
      <div className="cert__placeholder">
        <FiExternalLink size={18} style={{ opacity: 0.3 }} />
        <span>Belum ada gambar</span>
      </div>
    )
  }
  return (
    <img
      className="cert__img"
      src={cert.image}
      alt={`Sertifikat ${cert.id}`}
      loading="lazy"
      onError={() => setFailed(true)}
    />
  )
}

export default function Certificates() {
  const sec = useRef(null)

  useEffect(() => {
    const els = sec.current?.querySelectorAll('.reveal') ?? []
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => e.isIntersecting && e.target.classList.add('visible')),
      { threshold: 0.08 }
    )
    els.forEach(el => obs.observe(el))
    return () => obs.disconnect()
  }, [])

  return (
    <section id="certificates" className="certs" ref={sec}>
      <div className="wrap">
        <div className="certs__heading-row reveal">
          <h2 className="certs__heading">
            Sertifikat &amp; <em>Pencapaian</em>
          </h2>
          <span className="certs__num">{certificates.length} sertifikat</span>
        </div>

        {certificates.length === 0 ? (
          <p style={{ color: 'var(--text-3)', fontStyle: 'italic' }}>
            Tambahkan di src/data/certificates.js
          </p>
        ) : (
          <div className="certs__grid">
            {certificates.map((c, i) => (
              <article
                key={c.id}
                className={`cert reveal reveal-d${Math.min(i + 1, 5)}`}
              >
                {c.link ? (
                  <a
                    href={c.link}
                    className="cert__inner"
                    target="_blank"
                    rel="noreferrer"
                    aria-label={`Buka sertifikat ${c.id}`}
                  >
                    <CertImg cert={c} />
                    <div className="cert__hover">
                      <FiExternalLink size={20} />
                    </div>
                  </a>
                ) : (
                  <div className="cert__inner">
                    <CertImg cert={c} />
                  </div>
                )}
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
