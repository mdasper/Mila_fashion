import React from 'react';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

export default function ReviewsSection() {
  const reviews = [
    {
      stars: 5,
      text: "The Banarasi Organza Saree is an absolute dream! The subtle mint sage tone matches the photograph 100%, and the fall is effortlessly royal.",
      author: "Pooja Venkatesh",
      location: "Chennai, TN • Verified Patron"
    },
    {
      stars: 5,
      text: "The 3D detailing on the raw silk lehenga was praised by everyone at our reception. Pure craftsmanship without any shortcuts.",
      author: "Ananya Sharma",
      location: "Bengaluru, KA • Verified Patron"
    },
    {
      stars: 5,
      text: "WhatsApp customer service was super responsive regarding fit questions. Delivery reached in 2 days in sustainable fabric packaging.",
      author: "Divya Mehra",
      location: "Coimbatore, TN • Verified Patron"
    }
  ];

  return (
    <section className="reviews-section">
      <div className="container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.7 }}
        >
          <span className="section-tag">PATRON LOVE</span>
          <h2 className="section-title">Words from Our Patrons</h2>
        </motion.div>

        <div className="testimonials-grid">
          {reviews.map((r, i) => (
            <motion.div
              className="testimonial-card"
              key={i}
              initial={{ opacity: 0, y: 45 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.7, delay: i * 0.15, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="stars" style={{ display: 'flex', gap: '3px' }}>
                {[...Array(r.stars)].map((_, idx) => (
                  <Star key={idx} size={15} fill="#D4A346" stroke="#D4A346" />
                ))}
              </div>
              <p className="review-text">"{r.text}"</p>
              <div className="reviewer">
                <strong>{r.author}</strong>
                <span>{r.location}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
