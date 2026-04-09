import React from 'react'
import fotoSaya from '../assets/saya.jpeg'

function About() {
  const styles = {
    section: {
      padding: '60px 20px',
      backgroundColor: 'white'
    },
    container: {
      maxWidth: '1000px',
      margin: '0 auto'
    },
    title: {
      textAlign: 'center',
      fontSize: '36px',
      marginBottom: '40px',
      color: '#2c3e50'
    },
    content: {
      display: 'flex',
      gap: '40px',
      alignItems: 'center'
    },
    text: {
      flex: 1,
      lineHeight: '1.8',
      color: '#555'
    },
    image: {
      flex: 1,
      width: '100%',
      maxWidth: '250px',  
      height: 'auto',
      borderRadius: '10px',
      objectFit: 'cover',
      display: 'block',
      margin: '0 auto'
    }
  }

  return (
    <section id="about" style={styles.section}>
      <div style={styles.container}>
        <h2 style={styles.title}>Tentang Saya</h2>
        <div style={styles.content}>
          <div style={styles.text}>
            <p>
              Saya pelajar di SMK Wikrama Bogor, jurusan PPLG (RPL).
            </p>
            <p style={{ marginTop: '15px' }}>
              Sedang belajar membuat website dan aplikasi.
            </p>
          </div>
          <img 
            src={fotoSaya} 
            alt="Foto Saya" 
            style={styles.image}
          />
        </div>
      </div>
    </section>
  )
}

export default About