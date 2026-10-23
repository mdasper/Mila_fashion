import React from 'react';
import { motion } from 'framer-motion';

export default function AboutSection() {
  const stats = [
    { number: "5,000+", label: "Boutique Patrons" },
    { number: "100%", label: "Pure Authentic Fabrics" },
    { number: "4.9 ★", label: "Customer Rating" }
  ];

  return (
    <section className="about-section" id="about">
      <div className="about-container">
        <motion.div
          className="about-image-wrapper"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <img
            src="https://images.unsplash.com/photo-1558769132-cb1aea458c5e?q=80&w=1000&auto=format&fit=crop"
            alt="Mila Fashions Atelier"
            className="about-img-main"
          />
          <div className="about-badge">
            <span className="years">15+</span>
            <span className="label">Years of Artisan Excellence</span>
          </div>
        </motion.div>

        <motion.div
          className="about-text-content"
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <motion.span
            className="section-tag"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            THE ATELIER HERITAGE
          </motion.span>

          <motion.h2
            className="section-title"
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65, delay: 0.1 }}
          >
            Rooted in Tradition,<br />
            Designed for Today.
          </motion.h2>

          <motion.p
            className="about-body"
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65, delay: 0.2 }}
          >
            <strong>Mila Fashions</strong> was established with a singular devotion: bringing together age-old Indian loom craftsmanship with contemporary cuts that flatter modern women. Each garment in our capsule is tailored using authentic silks, organzas, and pure linens with ethical needlework by master karigars.
          </motion.p>

          <div className="about-stats">
            {stats.map((s, idx) => (
              <motion.div
                key={idx}
                className="stat-box"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 + idx * 0.12 }}
              >
                <h3>{s.number}</h3>
                <p>{s.label}</p>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <a href="#collections" className="btn btn-primary">
              EXPLORE THE CREATIONS
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
