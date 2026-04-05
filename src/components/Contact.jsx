import React from 'react'

function Contact() {
  const styles = {
    section: {
      padding: '60px 20px',
      backgroundColor: '#f8f9fa'
    },
    container: {
      maxWidth: '600px',
      margin: '0 auto'
    },
    title: {
      textAlign: 'center',
      fontSize: '36px',
      marginBottom: '40px',
      color: '#2c3e50'
    },
    contactList: {
      display: 'flex',
      flexDirection: 'column',
      gap: '20px'
    },
    contactItem: {
      backgroundColor: 'white',
      padding: '20px',
      borderRadius: '8px',
      boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
      display: 'flex',
      alignItems: 'center',
      gap: '15px'
    },
    contactIcon: {
      fontSize: '30px'
    },
    contactInfo: {
      flex: 1
    },
    contactLabel: {
      fontSize: '14px',
      color: '#7f8c8d',
      marginBottom: '5px'
    },
    contactValue: {
      fontSize: '18px',
      color: '#2c3e50',
      textDecoration: 'none'
    }
  }

  const contacts = [
    {
      label: 'Email',
      value: 'gammaalfatah@smkwikrama.sch.id',
      icon: '📧',
      link: 'mailto:gammaalfatah@smkwikrama.sch.id'
    },
    {
      label: 'Instagram',
      value: '@gammaalfatah',
      icon: '📷',
      link: 'https://instagram.com/gammaalfatah'
    },
    {
      label: 'WhatsApp',
      value: '+62 89604130077',
      icon: '💬',
      link: 'https://wa.me/6289604130077'
    }
  ]

  return (
    <section id="contact" style={styles.section}>
      <div style={styles.container}>
        <h2 style={styles.title}>Hubungi Saya</h2>
        <div style={styles.contactList}>
          {contacts.map((contact, index) => (
            <div key={index} style={styles.contactItem}>
              <div style={styles.contactIcon}>{contact.icon}</div>
              <div style={styles.contactInfo}>
                <div style={styles.contactLabel}>{contact.label}</div>
                <a 
                  href={contact.link} 
                  style={styles.contactValue}
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