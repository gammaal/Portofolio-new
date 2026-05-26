import React from 'react'

function Header() {
  const scrollTo = (id) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const links = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'projects', label: 'Projects' },
    { id: 'skills', label: 'Skills' },
    { id: 'certificates', label: 'Sertifikat' },
    { id: 'contact', label: 'Contact' },
  ]

  return (
    <header className="site-header">
      <nav className="site-header__bar" aria-label="Navigasi utama">
        <button
          type="button"
          className="site-logo"
          onClick={() => scrollTo('home')}
          aria-label="Ke beranda"
        >
          Portofolio<span className="site-logo__dot">.</span>
        </button>

        <ul className="site-nav">
          {links.map((item) => (
            <li key={item.id} className="site-nav__item">
              <button
                type="button"
                className="site-nav__link"
                onClick={() => scrollTo(item.id)}
              >
                {item.label}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  )
}

export default Header
