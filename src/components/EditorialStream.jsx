import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, ArrowRight, ArrowLeft, Plus } from 'lucide-react';

export default function EditorialStream({ products, onOpenQuickView, onAddToCart }) {
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = direction === 'left' ? -420 : 420;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <section className="editorial-stream-section">
      <div className="stream-header-row">
        <div>
          <span className="section-tag">
            <Sparkles size={13} style={{ display: 'inline', marginRight: '6px' }} />
            LOOKBOOK STREAM
          </span>
          <h2 className="stream-title">The Runway Stream</h2>
          <p className="stream-subtitle">
            Glide horizontally to explore our signature silhouettes in edge-to-edge high-definition craftsmanship.
          </p>
        </div>

        <div className="stream-nav-buttons">
          <button className="stream-nav-btn" onClick={() => scroll('left')} aria-label="Scroll left">
            <ArrowLeft size={18} />
          </button>
          <button className="stream-nav-btn" onClick={() => scroll('right')} aria-label="Scroll right">
            <ArrowRight size={18} />
          </button>
        </div>
      </div>

      {/* Full Width Horizontal Stream Track */}
      <div className="stream-track-container" ref={scrollRef}>
        {products.map((product, index) => (
          <motion.div
            key={product.id}
            className="stream-card"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="stream-card-img-wrap" onClick={() => onOpenQuickView(product)}>
              <span className="stream-number">
                Edition 0{index + 1}
              </span>
              <img src={product.image} alt={product.name} className="stream-card-img" />
              <div className="stream-card-overlay">
                <button
                  className="btn btn-primary"
                  onClick={(e) => {
                    e.stopPropagation();
                    onAddToCart(product, product.sizes[0]);
                  }}
                  style={{ padding: '10px 18px', fontSize: '0.75rem' }}
                >
                  <Plus size={14} /> Quick Add • ₹{product.price.toLocaleString('en-IN')}
                </button>
              </div>
            </div>

            <div className="stream-card-meta">
              <span className="stream-cat">{product.category}</span>
              <h4 onClick={() => onOpenQuickView(product)}>{product.name}</h4>
              <div className="stream-price-row">
                <strong>₹{product.price.toLocaleString('en-IN')}</strong>
                <span>₹{product.originalPrice.toLocaleString('en-IN')}</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
