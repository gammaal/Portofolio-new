import React from 'react'

function Footer() {
  const styles = {
    footer: {
      backgroundColor: '#2c3e50',
      color: 'white',
      textAlign: 'center',
      padding: '20px',
      marginTop: '0'
    }
  }

  return (
    <footer style={styles.footer}>
      <p>&copy;Portofolio</p>
    </footer>
  )
}

export default Footer