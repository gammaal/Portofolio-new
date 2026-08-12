import { useEffect, useRef, useState } from 'react'
import fotoSaya from '../assets/saya.jpeg'
import { useReveal } from '../hooks/useReveal'
import SplitHeading from './SplitHeading'

/* ── Count-up with spring easing ─────────────────── */
function useCountUp(target, duration = 1400, enabled = false) {
  const [val, setVal] = useState(0)
  useEffect(() => {
    if (!enabled) return
    const start = performance.now()
    const tick = now => {
      const p    = Math.min((now - start) / duration, 1)
      const ease = 1 - Math.pow(1 - p, 4)   // ease-out quart
      setVal(Math.round(ease * target))
      if (p < 1) requestAnimationFrame(tick)
    }
    requestAnimationFrame(tick)
  }, [enabled, target, duration])
  return val
}

/* ── 3-D tilt photo with shine ───────────────────── */
function TiltPhoto({ src, alt }) {
  const wrapRef  = useRef(null)
  const shineRef = useRef(null)

  const onMove = e => {
    const el = wrapRef.current; if (!el) return
    const { left, top, width, height } = el.getBoundingClientRect()
    const x = (e.clientX - left) / width  - 0.5
    const y = (e.clientY - top)  / height - 0.5
    el.style.transform =
      `perspective(700px) rotateY(${x * 7}deg) rotateX(${-y * 7}deg) scale(1.02)`
    if (shineRef.current) {
      shineRef.current.style.background =
        `radial-gradient(circle at ${(x + 0.5) * 100}% ${(y + 0.5) * 100}%,
          rgba(255,255,255,0.06) 0%, transparent 55%)`
    }
  }
  const onLeave = () => {
    if (wrapRef.current)  wrapRef.current.style.transform  = ''
    if (shineRef.current) shineRef.current.style.background = 'none'
  }

  return (
    <div className="about__photo-frame" ref={wrapRef} onMouseMove={onMove} onMouseLeave={onLeave}>
      <img src={src} alt={alt} className="about__photo-img" />
      <div className="about__photo-shine" ref={shineRef} aria-hidden="true" />
    </div>
  )
}

const counters = [
  { label: 'Teknologi', value: 6,  suffix: '+' },
  { label: 'Project',   value: 4,  suffix: '+' },
  { label: 'Sertifikat',value: 5,  suffix: '+' },
]

export default function About() {
  const sec   = useReveal(0.1)
  const [fired, setFired] = useState(false)

  useEffect(() => {
    const el = sec.current; if (!el) return
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setFired(true); obs.disconnect() } },
      { threshold: 0.2 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [sec])

  return (
    <section id="about" className="about" ref={sec}>
      <div className="wrap">
        <div className="about__grid">
          {/* Left */}
          <div>
            <p className="section-label" data-reveal>Tentang saya</p>
            <h2 className="about__heading" data-reveal data-reveal-delay="1">
              Kode yang rapi,<br />hasil yang <em>nyata</em>
            </h2>            <div className="about__body" data-reveal data-reveal-delay="2">
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

            <div className="about__counters" data-reveal data-reveal-delay="3">
              {counters.map(c => (
                <CounterCell key={c.label} {...c} enabled={fired} />
              ))}
            </div>
          </div>

          {/* Right — floating + tilt photo */}
          <div className="about__photo-side" data-reveal data-reveal-dir="right" data-reveal-delay="2">
            <div className="about__photo-float">
              <TiltPhoto src={fotoSaya} alt="Gamma Alfatah" />
            </div>
            <div className="about__photo-deco" />
          </div>
        </div>
      </div>
    </section>
  )
}

function CounterCell({ label, value, suffix = '+', enabled }) {
  const n = useCountUp(value, 1200, enabled)
  return (
    <div className="about__counter">
      <span className="about__counter-num">{n}{suffix}</span>
      <span className="about__counter-text">{label}</span>
    </div>
  )
}
