import React from 'react'

function Hero() {
  return (
    <section id="home" className="hero">
      <div className="hero__inner">
        <span className="hero__badge">Web Developer</span>
        <h1 className="hero__title">
          Halo, Saya <span>Gamma Alfatah</span>
        </h1>
        <p className="hero__subtitle">
          Selamat Datang di Portofolio Saya
        </p>
        <button
          type="button"
          className="btn-primary"
          onClick={() =>
            document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
          }
        >
          Hubungi Saya
        </button>
      </div>
    </section>
  )
}

export default Hero
