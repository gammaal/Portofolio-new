import React from "react";
import fotoSaya from "../assets/saya.jpeg";

function About() {
  return (
    <section id="about" className="section section--white">
      <div className="container">
        <p className="section-eyebrow">Profil</p>
        <h2 className="section-title">Tentang Saya</h2>
        <div className="about-grid">
          <div className="card about-card">
            <p className="about-text">
              <b>
              Saya pelajar di SMK Wikrama Bogor, jurusan PPLG (RPL).
              </b>
            </p>
            <p className="about-text">
              Saya seorang pengembang web antusias yang memiliki ketertarikan
              besar dalam dunia teknologi dan pemrograman. Saat ini saya sedang
              mendalami pengembangan aplikasi mobile dengan Flutter dan terus
              memperdalam rekayasa perangkat lunak web modern. Berkomitmen untuk
              terus belajar dan berkontribusi dalam proyek open-source, serta
              selalu mengikuti perkembangan arsitektur software dan best
              practices terbaru.
            </p>
          </div>

          <div className="card about-photo-wrap">
            <img
              src={fotoSaya}
              alt="Foto Gamma Alfatah"
              className="about-photo"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;
