import React, { useState } from 'react'
import { certificates } from '../data/certificates'

function CertificateImage({ cert }) {
  const [failed, setFailed] = useState(false)
  const alt = `Sertifikat ${cert.id}`

  const media = failed ? (
    <div className="cert-card__placeholder" role="img" aria-label={alt}>
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
        <path d="M14 2v6h6M8 13h8M8 17h5" strokeLinecap="round" />
      </svg>
      <span>Taruh gambar di public/certificates/</span>
    </div>
  ) : (
    <img
      className="cert-card__img"
      src={cert.image}
      alt={alt}
      loading="lazy"
      onError={() => setFailed(true)}
    />
  )

  if (cert.link) {
    return (
      <a
        href={cert.link}
        className="cert-card__link"
        target="_blank"
        rel="noreferrer"
        aria-label={`Buka sertifikat ${cert.id}`}
      >
        {media}
      </a>
    )
  }

  return <div className="cert-card__media">{media}</div>
}

function Certificates() {
  return (
    <section id="certificates" className="section section--certificates">
      <div className="container">
        <p className="section-eyebrow">Pencapaian</p>
        <h2 className="section-title">Sertifikat</h2>

        {certificates.length === 0 ? (
          <div className="card cert-empty">
            <p>Belum ada sertifikat. Tambahkan di <code>src/data/certificates.js</code></p>
          </div>
        ) : (
          <div className="cert-grid">
            {certificates.map((cert) => (
              <article key={cert.id} className="cert-card">
                <CertificateImage cert={cert} />
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

export default Certificates
