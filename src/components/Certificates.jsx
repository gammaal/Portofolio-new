import { useState, useEffect, useRef } from 'react'
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

/* ── Single cert with 3-D flip reveal ───────────── */
function CertCard({ cert, index }) {
  const ref     = useRef(null)
  const [vis, setVis] = useState(false)

  useEffect(() => {
    const el = ref.current; if (!el) return
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVis(true); obs.disconnect() } },
      { threshold: 0.12 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  return (
    <article
      ref={ref}
      className="cert"
      style={{
        opacity:   vis ? 1 : 0,
        transform: vis ? 'perspective(600px) rotateX(0deg) translateY(0)'
                       : 'perspective(600px) rotateX(18deg) translateY(24px)',
        transition: `opacity 0.6s cubic-bezier(0.22,1,0.36,1) ${index * 0.08}s,
                     transform 0.6s cubic-bezier(0.22,1,0.36,1) ${index * 0.08}s`,
      }}
    >
      {cert.link ? (
        <a
          href={cert.link}
          className="cert__inner"
          target="_blank"
          rel="noreferrer"
          aria-label={`Buka sertifikat ${cert.id}`}
        >
          <CertImg cert={cert} />
          <div className="cert__hover"><FiExternalLink size={20} /></div>
        </a>
      ) : (
        <div className="cert__inner">
          <CertImg cert={cert} />
        </div>
      )}
    </article>
  )
}

export default function Certificates() {
  const sec = useRef(null)
  const [headVis, setHeadVis] = useState(false)

  useEffect(() => {
    const row = sec.current?.querySelector('.certs__heading-row')
    if (!row) return
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setHeadVis(true); obs.disconnect() } },
      { threshold: 0.1 }
    )
    obs.observe(row)
    return () => obs.disconnect()
  }, [])

  return (
    <section id="certificates" className="certs" ref={sec}>
      <div className="wrap">
        <div
          className="certs__heading-row"
          style={{
            opacity:    headVis ? 1 : 0,
            transform:  headVis ? 'none' : 'translateY(16px)',
            transition: 'opacity 0.6s cubic-bezier(0.22,1,0.36,1), transform 0.6s cubic-bezier(0.22,1,0.36,1)',
          }}
        >
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
              <CertCard key={c.id} cert={c} index={i} />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
