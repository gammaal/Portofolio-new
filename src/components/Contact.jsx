import { useEffect, useRef, useState } from 'react'
import { FiMail, FiInstagram, FiMessageCircle, FiArrowRight } from 'react-icons/fi'

const contacts = [
  {
    label: 'Email',
    value: 'gammaalfatah@smkwikrama.sch.id',
    icon:  FiMail,
    href:  'mailto:gammaalfatah@smkwikrama.sch.id',
  },
  {
    label: 'Instagram',
    value: '@gammaalfatah',
    icon:  FiInstagram,
    href:  'https://instagram.com/gammaalfatah',
  },
  {
    label: 'WhatsApp',
    value: '+62 896-0413-0077',
    icon:  FiMessageCircle,
    href:  'https://wa.me/6289604130077',
  },
]

/* ── Animated contact item ───────────────────────── */
function ContactItem({ item, index }) {
  const ref = useRef(null)
  const [vis,     setVis]     = useState(false)
  const [hovered, setHovered] = useState(false)
  const Icon = item.icon

  useEffect(() => {
    const el = ref.current; if (!el) return
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVis(true); obs.disconnect() } },
      { threshold: 0.2 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  return (
    <a
      ref={ref}
      href={item.href}
      className="contact__item"
      target="_blank"
      rel="noopener noreferrer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        opacity:   vis ? 1 : 0,
        transform: vis ? 'none' : 'translateX(32px)',
        transition: `opacity 0.55s cubic-bezier(0.22,1,0.36,1) ${index * 0.1}s,
                     transform 0.55s cubic-bezier(0.22,1,0.36,1) ${index * 0.1}s`,
      }}
    >
      <span
        className="contact__item-icon"
        style={{
          transform:  hovered ? 'scale(1.18) rotate(-8deg)' : 'scale(1) rotate(0deg)',
          transition: 'transform 0.35s cubic-bezier(0.22,1,0.36,1)',
        }}
      >
        <Icon size={17} />
      </span>
      <span style={{ flex: 1 }}>
        <span className="contact__item-label">{item.label}</span>
        <span className="contact__item-val">{item.value}</span>
      </span>
      <FiArrowRight
        size={14}
        style={{
          color: 'var(--blue-2)',
          opacity:   hovered ? 1 : 0,
          transform: hovered ? 'translateX(0)' : 'translateX(-6px)',
          transition: 'opacity 0.25s ease, transform 0.25s ease',
        }}
      />
    </a>
  )
}

export default function Contact() {
  const sec = useRef(null)
  const [leftVis, setLeftVis] = useState(false)

  useEffect(() => {
    const left = sec.current?.querySelector('.contact__left')
    if (!left) return
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setLeftVis(true); obs.disconnect() } },
      { threshold: 0.15 }
    )
    obs.observe(left)
    return () => obs.disconnect()
  }, [])

  return (
    <section id="contact" className="contact" ref={sec}>
      <div className="wrap">
        <div className="contact__grid">
          <div
            className="contact__left"
            style={{
              opacity:    leftVis ? 1 : 0,
              transform:  leftVis ? 'none' : 'translateX(-28px)',
              transition: 'opacity 0.65s cubic-bezier(0.22,1,0.36,1), transform 0.65s cubic-bezier(0.22,1,0.36,1)',
            }}
          >
            <h2 className="contact__heading">
              Punya ide?<br /><em>Ayo ngobrol.</em>
            </h2>
            <p className="contact__body">
              Terbuka untuk kolaborasi, pertanyaan, atau sekadar berkenalan.
              Hubungi lewat channel di bawah ini.
            </p>
          </div>

          <div className="contact__items">
            {contacts.map((c, i) => (
              <ContactItem key={c.label} item={c} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
