import React from 'react'

function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="site-footer">
      <p>
        &copy; {year} <strong>Gamma Alfatah</strong> — Portofolio
      </p>
    </footer>
  )
}

export default Footer
