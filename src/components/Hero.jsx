import { useEffect, useRef, useState } from 'react'
import { FiArrowDown, FiArrowRight } from 'react-icons/fi'

/* ── Particle canvas — particles flee cursor ─────── */
function ParticleCanvas() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')

    let W, H, particles = [], animId
    let mouse = { x: -9999, y: -9999 }

    const resize = () => {
      W = canvas.width  = canvas.offsetWidth
      H = canvas.height = canvas.offsetHeight
    }
    const rand = (a, b) => Math.random() * (b - a) + a

    const initParticles = () => {
      particles = []
      const count = Math.floor((W * H) / 18000)  // fewer particles
      for (let i = 0; i < count; i++) {
        particles.push({
          x: rand(0, W), y: rand(0, H),
          ox: 0, oy: 0,
          vx: rand(-0.12, 0.12), vy: rand(-0.12, 0.12),
          r:  rand(0.6, 1.5),
          alpha: rand(0.12, 0.35),  // more transparent
        })
      }
    }

    const REPEL = 70   // smaller radius
    const FORCE = 1.8  // gentler push

    const draw = () => {
      ctx.clearRect(0, 0, W, H)

      for (const p of particles) {
        // mouse repulsion
        const dx = p.x - mouse.x
        const dy = p.y - mouse.y
        const dist = Math.sqrt(dx * dx + dy * dy)
        if (dist < REPEL) {
          const force = (1 - dist / REPEL) * FORCE
          p.vx += (dx / dist) * force * 0.08
          p.vy += (dy / dist) * force * 0.08
        }

        // friction + dampen
        p.vx *= 0.97
        p.vy *= 0.97

        p.x += p.vx
        p.y += p.vy

        // wrap
        if (p.x < 0) p.x = W
        if (p.x > W) p.x = 0
        if (p.y < 0) p.y = H
        if (p.y > H) p.y = 0

        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(96,165,250,${p.alpha})`
        ctx.fill()
      }

      // connection lines — only very close pairs, very faint
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx   = particles[i].x - particles[j].x
          const dy   = particles[i].y - particles[j].y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < 70) {
            ctx.beginPath()
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.strokeStyle = `rgba(59,130,246,${0.055 * (1 - dist / 70)})`
            ctx.lineWidth = 0.5
            ctx.stroke()
          }
        }
      }

      animId = requestAnimationFrame(draw)
    }

    const onMouse = ({ clientX: x, clientY: y }) => { mouse.x = x; mouse.y = y }
    const onLeave = () => { mouse.x = -9999; mouse.y = -9999 }

    resize(); initParticles(); draw()

    const ro = new ResizeObserver(() => { resize(); initParticles() })
    ro.observe(canvas)
    canvas.closest('section')?.addEventListener('mousemove', onMouse, { passive: true })
    canvas.closest('section')?.addEventListener('mouseleave', onLeave)

    return () => {
      cancelAnimationFrame(animId)
      ro.disconnect()
      canvas.closest('section')?.removeEventListener('mousemove', onMouse)
      canvas.closest('section')?.removeEventListener('mouseleave', onLeave)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{ position:'absolute', inset:0, width:'100%', height:'100%', pointerEvents:'none', zIndex:0 }}
    />
  )
}

/* ── Typing effect ───────────────────────────────── */
const ROLES = ['Web Developer', 'Mobile Developer', 'UI Enthusiast', 'PPLG Student']

function TypingText() {
  const [display, setDisplay] = useState('')
  const [roleIdx, setRoleIdx] = useState(0)
  const [phase,   setPhase]   = useState('typing')
  const [charIdx, setCharIdx] = useState(0)

  useEffect(() => {
    const current = ROLES[roleIdx]
    let t
    if (phase === 'typing') {
      if (charIdx < current.length) {
        t = setTimeout(() => { setDisplay(current.slice(0, charIdx + 1)); setCharIdx(c => c + 1) }, 60)
      } else {
        t = setTimeout(() => setPhase('pause'), 1600)
      }
    } else if (phase === 'pause') {
      t = setTimeout(() => setPhase('erasing'), 400)
    } else {
      if (charIdx > 0) {
        t = setTimeout(() => { setDisplay(current.slice(0, charIdx - 1)); setCharIdx(c => c - 1) }, 32)
      } else {
        setRoleIdx(i => (i + 1) % ROLES.length)
        setPhase('typing')
      }
    }
    return () => clearTimeout(t)
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
  const onMove = e => {
    const el = ref.current; if (!el) return
    const r  = el.getBoundingClientRect()
    el.style.transform = `translate(${(e.clientX - r.left - r.width  / 2) * 0.18}px,
                                     ${(e.clientY - r.top  - r.height / 2) * 0.18}px)`
  }
  const onLeave = () => { if (ref.current) ref.current.style.transform = 'translate(0,0)' }
  return (
    <button ref={ref} className={className} onClick={onClick}
      onMouseMove={onMove} onMouseLeave={onLeave}
      style={{ transition: 'transform 0.35s cubic-bezier(0.22,1,0.36,1), background 0.2s, box-shadow 0.2s' }}>
      {children}
    </button>
  )
}

/* ── Hero ────────────────────────────────────────── */
export default function Hero() {
  const go         = id => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  const spotRef    = useRef(null)
  const contentRef = useRef(null)

  // cursor spotlight
  useEffect(() => {
    const el = spotRef.current
    if (!el || window.matchMedia('(pointer: coarse)').matches) return
    const move = ({ clientX: x, clientY: y }) => {
      el.style.transform = `translate(${x}px, ${y}px)`
    }
    window.addEventListener('mousemove', move, { passive: true })
    return () => window.removeEventListener('mousemove', move)
  }, [])

  // parallax: content drifts up gently as user scrolls
  useEffect(() => {
    const el = document.querySelector('.hero__wrap')
    if (!el || window.matchMedia('(pointer: coarse)').matches) return
    const onScroll = () => {
      const y = window.scrollY
      el.style.transform = `translateY(${y * 0.16}px)`
      el.style.opacity   = Math.max(0, 1 - y / 480)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <section id="home" className="hero">
      <ParticleCanvas />

      <div className="hero__spot-wrap" aria-hidden="true">
        <div className="hero__spot" ref={spotRef} />
      </div>

      <div className="hero__wrap">
        <div className="hero__left">
          <div className="hero__tag">
            <span className="hero__tag-line" />
            <TypingText />
          </div>

          <h1 className="hero__name">
            Gamma <em data-text="Alfatah">Alfatah</em>
          </h1>

          <p className="hero__role">
            Pelajar SMK Wikrama Bogor, jurusan PPLG — membangun antarmuka
            yang bersih, cepat, dan fungsional dengan teknologi modern.
          </p>

          <div className="hero__actions">
            <MagneticBtn className="btn btn--gold" onClick={() => go('projects')}>
              Lihat Karya <FiArrowRight size={13} />
            </MagneticBtn>
            <MagneticBtn className="btn btn--ghost" onClick={() => go('contact')}>
              Hubungi Saya
            </MagneticBtn>
          </div>
        </div>
      </div>

      <button className="hero__scroll" onClick={() => go('about')} aria-label="Scroll ke bawah">
        <FiArrowDown size={13} />
        Scroll
      </button>
    </section>
  )
}
