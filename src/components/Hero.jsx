import React, { useEffect, useRef, useState } from 'react'
import { FiArrowDown, FiArrowRight } from 'react-icons/fi'

/* ── Particle canvas ─────────────────────────────── */
function ParticleCanvas() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')

    let W, H, particles = [], animId

    const resize = () => {
      W = canvas.width  = canvas.offsetWidth
      H = canvas.height = canvas.offsetHeight
    }

    const rand = (min, max) => Math.random() * (max - min) + min

    const initParticles = () => {
      particles = []
      const count = Math.floor((W * H) / 14000)
      for (let i = 0; i < count; i++) {
        particles.push({
          x: rand(0, W),
          y: rand(0, H),
          r: rand(0.6, 1.8),
          vx: rand(-0.18, 0.18),
          vy: rand(-0.18, 0.18),
          alpha: rand(0.2, 0.6),
        })
      }
    }

    const draw = () => {
      ctx.clearRect(0, 0, W, H)
      for (const p of particles) {
        p.x += p.vx
        p.y += p.vy
        if (p.x < 0) p.x = W
        if (p.x > W) p.x = 0
        if (p.y < 0) p.y = H
        if (p.y > H) p.y = 0

        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(96,165,250,${p.alpha})`
        ctx.fill()
      }

      // draw lines between nearby particles
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < 90) {
            ctx.beginPath()
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.strokeStyle = `rgba(59,130,246,${0.08 * (1 - dist / 90)})`
            ctx.lineWidth = 0.6
            ctx.stroke()
          }
        }
      }

      animId = requestAnimationFrame(draw)
    }

    resize()
    initParticles()
    draw()

    const ro = new ResizeObserver(() => { resize(); initParticles() })
    ro.observe(canvas)

    return () => { cancelAnimationFrame(animId); ro.disconnect() }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{
        position: 'absolute', inset: 0,
        width: '100%', height: '100%',
        pointerEvents: 'none', zIndex: 0,
      }}
    />
  )
}

/* ── Typing effect ───────────────────────────────── */
const ROLES = [
  'Web Developer',
  'Mobile Developer',
  'UI Enthusiast',
  'PPLG Student',
]

function TypingText() {
  const [display, setDisplay] = useState('')
  const [roleIdx, setRoleIdx] = useState(0)
  const [phase, setPhase]     = useState('typing') // typing | pause | erasing
  const [charIdx, setCharIdx] = useState(0)

  useEffect(() => {
    const current = ROLES[roleIdx]
    let timeout

    if (phase === 'typing') {
      if (charIdx < current.length) {
        timeout = setTimeout(() => {
          setDisplay(current.slice(0, charIdx + 1))
          setCharIdx(c => c + 1)
        }, 65)
      } else {
        timeout = setTimeout(() => setPhase('pause'), 1400)
      }
    } else if (phase === 'pause') {
      timeout = setTimeout(() => setPhase('erasing'), 400)
    } else if (phase === 'erasing') {
      if (charIdx > 0) {
        timeout = setTimeout(() => {
          setDisplay(current.slice(0, charIdx - 1))
          setCharIdx(c => c - 1)
        }, 38)
      } else {
        setRoleIdx(i => (i + 1) % ROLES.length)
        setPhase('typing')
      }
    }

    return () => clearTimeout(timeout)
  }, [phase, charIdx, roleIdx])

  return (
    <span className="hero__typing">
      {display}
      <span className="hero__cursor" aria-hidden="true">|</span>
    </span>
  )
}

/* ── Magnetic button ─────────────────────────────── */
function MagneticBtn({ children, className, onClick }) {
  const ref = useRef(null)

  const onMove = (e) => {
    const el  = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const cx   = rect.left + rect.width / 2
    const cy   = rect.top  + rect.height / 2
    const dx   = (e.clientX - cx) * 0.28
    const dy   = (e.clientY - cy) * 0.28
    el.style.transform = `translate(${dx}px, ${dy}px)`
  }

  const onLeave = () => {
    if (ref.current) ref.current.style.transform = ''
  }

  return (
    <button
      ref={ref}
      className={className}
      onClick={onClick}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
    >
      {children}
    </button>
  )
}

/* ── Hero ────────────────────────────────────────── */
export default function Hero() {
  const go      = id => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  const spotRef = useRef(null)

  useEffect(() => {
    const el = spotRef.current
    if (!el || window.matchMedia('(pointer: coarse)').matches) return
    const move = ({ clientX: x, clientY: y }) => {
      el.style.transform = `translate(${x}px, ${y}px)`
    }
    window.addEventListener('mousemove', move, { passive: true })
    return () => window.removeEventListener('mousemove', move)
  }, [])

  return (
    <section id="home" className="hero">
      {/* particle background */}
      <ParticleCanvas />

      {/* cursor spotlight */}
      <div className="hero__spot-wrap" aria-hidden="true">
        <div className="hero__spot" ref={spotRef} />
      </div>

      <div className="hero__wrap hero__wrap--centered">
        <div className="hero__left">
          <div className="hero__tag">
            <span className="hero__tag-line" />
            <TypingText />
          </div>

          <h1 className="hero__name">
            Gamma <em data-text="Alfatah">Alfatah</em>
          </h1>

          <p className="hero__role">
            Pelajar SMK Wikrama Bogor, jurusan PPLG. Fokus membangun
            antarmuka yang bersih dan fungsional dengan teknologi modern.
          </p>

          <div className="hero__actions">
            <MagneticBtn className="btn btn--gold" onClick={() => go('projects')}>
              Lihat Karya <FiArrowRight size={14} />
            </MagneticBtn>
            <MagneticBtn className="btn btn--ghost" onClick={() => go('contact')}>
              Hubungi Saya
            </MagneticBtn>
          </div>
        </div>
      </div>

      <button
        className="hero__scroll"
        onClick={() => go('about')}
        aria-label="Scroll ke bawah"
      >
        <FiArrowDown size={13} />
        Scroll
      </button>
    </section>
  )
}
