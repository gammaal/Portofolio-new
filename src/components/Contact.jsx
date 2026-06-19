import React, { useEffect, useRef } from 'react'
import { FiMail, FiInstagram, FiMessageCircle } from 'react-icons/fi'

const contacts = [
  {
    label: 'Email',
    value: 'gammaalfatah@smkwikrama.sch.id',
    icon: <FiMail size={17} />,
    href: 'mailto:gammaalfatah@smkwikrama.sch.id',
  },
  {
    label: 'Instagram',
    value: '@gammaalfatah',
    icon: <FiInstagram size={17} />,
    href: 'https://instagram.com/gammaalfatah',
  },
  {
    label: 'WhatsApp',
    value: '+62 896-0413-0077',
    icon: <FiMessageCircle size={17} />,
    href: 'https://wa.me/6289604130077',
  },
]

export default function Contact() {
  const sec = useRef(null)

  useEffect(() => {
    const els = sec.current?.querySelectorAll('.reveal') ?? []
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => e.isIntersecting && e.target.classList.add('visible')),
      { threshold: 0.12 }
    )
    els.forEach(el => obs.observe(el))
    return () => obs.disconnect()
  }, [])

  return (
    <section id="contact" className="contact" ref={sec}>
      <div className="wrap">
        <div className="contact__grid">
          <div className="contact__left reveal">
            <h2 className="contact__heading">
              Punya ide?<br />
              <em>Ayo ngobrol.</em>
            </h2>
            <p className="contact__body">
              Terbuka untuk kolaborasi, pertanyaan, atau sekadar berkenalan.
              Hubungi lewat channel di bawah ini.
            </p>
          </div>

          <div className="contact__items">
            {contacts.map((c, i) => (
              <a
                key={c.label}
                href={c.href}
                className={`contact__item reveal reveal-d${i + 1}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="contact__item-icon" aria-hidden="true">
                  {c.icon}
                </span>
                <span>
                  <span className="contact__item-label">{c.label}</span>
                  <span className="contact__item-val">{c.value}</span>
                </span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
