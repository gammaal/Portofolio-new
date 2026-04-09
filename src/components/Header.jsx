import React from 'react'

function Header() {
  const styles = {
    header: {
      backgroundColor: '#2c3e50',
      padding: '15px 20px',
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      width: '100%',
      zIndex: 1000,
      boxShadow: '0 2px 5px rgba(0,0,0,0.1)'
    },
    nav: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      width: '100%'
    },
    logo: {
      color: 'white',
      fontSize: '24px',
      fontWeight: 'bold',
      marginLeft: '20px'
    },
    navLinks: {
      display: 'flex',
      gap: '20px',
      marginRight: '20px'
    },
    link: {
      color: 'white',
      textDecoration: 'none',
      cursor: 'pointer',
      padding: '5px 10px'
    }
  }

  const scrollTo = (id) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <header style={styles.header}>
      <nav style={styles.nav}>
        <div style={styles.logo}>My Portfolio</div>
        <div style={styles.navLinks}>
          <a style={styles.link} onClick={() => scrollTo('home')}>Home</a>
          <a style={styles.link} onClick={() => scrollTo('about')}>About</a>
          <a style={styles.link} onClick={() => scrollTo('projects')}>Projects</a>
          <a style={styles.link} onClick={() => scrollTo('skills')}>Skills</a>
          <a style={styles.link} onClick={() => scrollTo('contact')}>Contact</a>
        </div>
      </nav>
    </header>
  )
}

export default Header