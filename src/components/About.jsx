import React, { useEffect, useRef } from 'react'
import fotoSaya from '../assets/saya.jpeg'

function useReveal(ref) {
  useEffect(() => {
    const els = ref.current?.querySelectorAll('.reveal') ?? []
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => e.isIntersecting && e.target.classList.add('visible')),
      { threshold: 0.12 }
    )
    els.forEach(el => obs.observe(el))
    return () => obs.disconnect()
  }, [ref])
}

export default function About() {
  const sec = useRef(null)
  useReveal(sec)

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
              <div className="about__counter">
                <span className="about__counter-num">6+</span>
                <span className="about__counter-text">Teknologi</span>
              </div>
              <div className="about__counter">
                <span className="about__counter-num">4+</span>
                <span className="about__counter-text">Project</span>
              </div>
              <div className="about__counter">
                <span className="about__counter-num">5+</span>
                <span className="about__counter-text">Sertifikat</span>
              </div>
            </div>
          </div>

          {/* Right — photo */}
          <div className="about__photo-side reveal reveal-d2">
            <div className="about__photo-frame">
              <img src={fotoSaya} alt="Gamma Alfatah" className="about__photo-img" />
            </div>
            <div className="about__photo-deco" />
          </div>
        </div>
      </div>
    </section>
  )
}
