import React from 'react'

function Projects() {
  const styles = {
    section: {
      padding: '60px 20px',
      backgroundColor: '#f8f9fa'
    },
    container: {
      maxWidth: '1200px',
      margin: '0 auto'
    },
    title: {
      textAlign: 'center',
      fontSize: '36px',
      marginBottom: '40px',
      color: '#2c3e50'
    },
    emptyMessage: {
      textAlign: 'center',
      padding: '60px 20px',
      color: '#7f8c8d',
      fontSize: '18px',
      backgroundColor: 'white',
      borderRadius: '8px',
      boxShadow: '0 2px 5px rgba(0,0,0,0.1)'
    }
  }

  return (
    <section id="projects" style={styles.section}>
      <div style={styles.container}>
        <h2 style={styles.title}>Project Saya</h2>
        <div style={styles.emptyMessage}>
          <p>Belum ada project yang ditampilkan</p>
          <p style={{ fontSize: '14px', marginTop: '10px' }}>Project akan segera ditambahkan</p>
        </div>
      </div>
    </section>
  )
}

export default Projects