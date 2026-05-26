import React from 'react'

function Contact() {
  const contacts = [
    {
      label: 'Email',
      value: 'gammaalfatah@smkwikrama.sch.id',
      icon: '📧',
      link: 'mailto:gammaalfatah@smkwikrama.sch.id',
    },
    {
      label: 'Instagram',
      value: '@gammaalfatah',
      icon: '📷',
      link: 'https://instagram.com/gammaalfatah',
    },
    {
      label: 'WhatsApp',
      value: '+62 89604130077',
      icon: '💬',
      link: 'https://wa.me/6289604130077',
    },
  ]

  return (
    <section id="contact" className="section section--white">
      <div className="container container--contact">
        <p className="section-eyebrow">Kontak</p>
        <h2 className="section-title">Hubungi Saya</h2>
        <div className="contact-list">
          {contacts.map((contact) => (
            <div key={contact.label} className="card contact-card">
              <div className="contact-card__icon" aria-hidden="true">
                {contact.icon}
              </div>
              <div>
                <div className="contact-card__label">{contact.label}</div>
                <a
                  href={contact.link}
                  className="contact-card__value"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {contact.value}
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Contact
