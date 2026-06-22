import React, { useEffect, useRef, useState } from 'react'
import fotoSaya from '../assets/saya.jpeg'

/* count-up hook */
function useCountUp(target, duration = 1200, enabled = false) {
  const [val, setVal] = useState(0)
  useEffect(() => {
    if (!enabled) return
    const start = performance.now()
    const tick = (now) => {
      const p = Math.min((now - start) / duration, 1)
      // ease out cubic
      const ease = 1 - Math.pow(1 - p, 3)
      setVal(Math.round(ease * target))
      if (p < 1) requestAnimationFrame(tick)
    }
    requestAnimationFrame(tick)
  }, [enabled, target, duration])
  return val
}

/* 3-D tilt on photo */
function TiltPhoto({ src, alt }) {
  const ref = useRef(null)

  const onMove = (e) => {
    const el  = ref.current
    if (!el) return
    const { left, top, width, height } = el.getBoundingClientRect()
    const x = (e.clientX - left) / width  - 0.5   // -0.5 … 0.5
    const y = (e.clientY - top)  / height - 0.5
    el.style.transform = `perspective(600px) rotateY(${x * 8}deg) rotateX(${-y * 8}deg) scale(1.02)`
  }
  const onLeave = () => {
    if (ref.current) ref.current.style.transform = ''
  }

  return (
    <div
      className="about__photo-frame"
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
    >
      <img src={src} alt={alt} className="about__photo-img" />
    </div>
  )
}

const counters = [
  { label: 'Teknologi', value: 6 },
  { label: 'Project',   value: 4 },
  { label: 'Sertifikat', value: 5 },
]

export default function About() {
  const sec        = useRef(null)
  const [fired, setFired] = useState(false)

  useEffect(() => {
    const els = sec.current?.querySelectorAll('.reveal') ?? []
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => e.isIntersecting && e.target.classList.add('visible')),
      { threshold: 0.1 }
    )
    els.forEach(el => obs.observe(el))

    const secObs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setFired(true); secObs.disconnect() } },
      { threshold: 0.2 }
    )
    if (sec.current) secObs.observe(sec.current)

    return () => { obs.disconnect(); secObs.disconnect() }
  }, [])

  return (
    <section id="about" className="about" ref={sec}>
      <div className="wrap">
        <div className="about__grid">
          {/* Left */}
          <div>
            <p className="about__label reveal">Tentang saya</p>
            <h2 className="about__heading reveal reveal-d1">
              Kode yang rapi,<br />
              hasil yang <em>nyata</em>
            </h2>
            <div className="about__body reveal reveal-d2">
              <p>
                Saya Gamma Alfatah, pelajar di SMK Wikrama Bogor jurusan
                Pengembangan Perangkat Lunak dan Gim (PPLG). Tertarik pada
                persimpangan antara desain visual yang baik dan rekayasa
                perangkat lunak yang solid.
              </p>
              <p>
                Saat ini fokus mendalami pengembangan web modern dan aplikasi
                mobile dengan Flutter. Saya percaya bahwa detail kecil
                membuat perbedaan besar dalam produk akhir.
              </p>
            </div>

            <div className="about__counters reveal reveal-d3">
              {counters.map(c => (
                <CounterCell key={c.label} {...c} enabled={fired} />
              ))}
            </div>
          </div>

          {/* Right — photo with tilt */}
          <div className="about__photo-side reveal reveal-d2">
            <TiltPhoto src={fotoSaya} alt="Gamma Alfatah" />
            <div className="about__photo-deco" />
          </div>
        </div>
      </div>
    </section>
  )
}

function CounterCell({ label, value, enabled }) {
  const n = useCountUp(value, 1000, enabled)
  return (
    <div className="about__counter">
      <span className="about__counter-num">{n}+</span>
      <span className="about__counter-text">{label}</span>
    </div>
  )
}
