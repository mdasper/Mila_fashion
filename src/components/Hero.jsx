import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Flame } from 'lucide-react';

export default function Hero() {
  return (
    <section className="hero-section fullwidth-hero">
      <div className="hero-overlay" />

      {/* Soft ambient static glow */}
      <div className="hero-ambient-glow" />

      <div className="hero-content fullwidth-hero-content">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="hero-subhead">
            <Sparkles size={13} /> THE AUTUMN / FESTIVE '26 EDIT • BESPOKE COUTURE
          </span>
        </motion.div>

        <motion.h1
          className="hero-title"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
        >
          Timeless Grace.<br />
          <em>Organic Silhouette.</em>
        </motion.h1>

        <motion.p
          className="hero-desc"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
        >
          A bespoke collection combining pure Kanchipuram mulberry silks, hand-done zardozi, and contemporary fluid drapes tailored for grand moments.
        </motion.p>

        <motion.div
          className="hero-actions"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
        >
          <a href="#collections" className="btn btn-primary btn-glow">
            EXPLORE THE COLLECTION
          </a>
          <a href="#about" className="btn btn-outline">
            THE ATELIER STORY
          </a>
        </motion.div>
      </div>

      {/* Floating Badge without 10 mention */}
      <motion.div
        className="hero-floating-capsule-badge"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="badge-inner">
          <div className="badge-icon-ring">
            <Flame size={20} color="var(--palette-cream)" />
          </div>
          <div>
            <strong>Heirloom Collection</strong>
            <p>Handcrafted Masterpieces</p>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
