import React from 'react'

function Hero() {
  const styles = {
    section: {
      padding: '120px 20px 80px',
      textAlign: 'center',
      backgroundColor: '#ecf0f1',
      minHeight: '400px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: '100%',
      margin: 0
    },
    container: {
      maxWidth: '800px',
      width: '100%',
      margin: '0 auto',
      padding: '0 20px'
    },
    title: {
      fontSize: '48px',
      marginBottom: '10px',
      color: '#2c3e50'
    },
    subtitle: {
      fontSize: '24px',
      color: '#7f8c8d',
      marginBottom: '20px'
    },
    description: {
      fontSize: '18px',
      color: '#555',
      marginBottom: '30px'
    },
    button: {
      backgroundColor: '#3498db',
      color: 'white',
      padding: '12px 30px',
      border: 'none',
      borderRadius: '5px',
      fontSize: '16px',
      cursor: 'pointer'
    }
  }

  return (
    <section id="home" style={styles.section}>
      <div style={styles.container}>
        <h1 style={styles.title}>Halo, Saya Gamma Alfatah</h1>
        <p style={styles.subtitle}>Web Developer</p>
        <button 
          style={styles.button}
          onClick={() => document.getElementById('contact').scrollIntoView({ behavior: 'smooth' })}
        >
          Hubungi Saya
        </button>
      </div>
    </section>
  )
}

export default Hero