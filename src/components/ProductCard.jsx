import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Eye, Plus, Star } from 'lucide-react';

export default function ProductCard({
  product,
  index,
  isWishlisted,
  onToggleWishlist,
  onOpenQuickView,
  onAddToCart,
  onOrderNow
}) {
  return (
    <motion.div
      className="product-card"
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{
        duration: 0.65,
        delay: (index % 4) * 0.12, // Staggered stream one by one on scroll
        ease: [0.16, 1, 0.3, 1]
      }}
      whileHover={{ y: -6, transition: { duration: 0.3 } }}
    >
      <div className="product-thumb-wrap" onClick={() => onOpenQuickView(product)}>
        {product.badge && (
          <span className={`product-badge ${product.badgeType}`}>{product.badge}</span>
        )}

        <button
          className={`wishlist-toggle ${isWishlisted ? 'active' : ''}`}
          onClick={(e) => {
            e.stopPropagation();
            onToggleWishlist(product.id);
          }}
          title="Save to Wishlist"
          aria-label="Wishlist"
        >
          <Heart size={18} fill={isWishlisted ? 'currentColor' : 'none'} />
        </button>

        <img src={product.image} alt={product.name} className="product-thumb" loading="lazy" />

        <div className="thumb-actions">
          <button
            className="btn-quick-view"
            onClick={(e) => {
              e.stopPropagation();
              onOpenQuickView(product);
            }}
          >
            <Eye size={14} style={{ display: 'inline', marginRight: '4px' }} /> Quick View
          </button>
          <button
            className="btn-quick-add"
            onClick={(e) => {
              e.stopPropagation();
              if (onOrderNow) {
                onOrderNow(product, product.sizes[0]);
              } else {
                onAddToCart(product, product.sizes[0]);
              }
            }}
          >
            Order Now
          </button>
        </div>
      </div>

      <div className="product-info">
        <span className="product-cat">{product.category}</span>
        <h3 className="product-name" onClick={() => onOpenQuickView(product)}>
          {product.name}
        </h3>

        <div className="product-rating">
          <span className="stars" style={{ display: 'inline-flex', gap: '2px' }}>
            {[...Array(5)].map((_, i) => (
              <Star key={i} size={12} fill="#D4A346" stroke="#D4A346" />
            ))}
          </span>
          <span>{product.rating} ({product.reviewsCount})</span>
        </div>

        <div className="sizes-preview">
          {product.sizes.slice(0, 4).map((s, idx) => (
            <span key={idx} className="size-pill">{s}</span>
          ))}
        </div>

        <div className="product-pricing">
          <span className="price-current">₹{product.price.toLocaleString('en-IN')}</span>
          <span className="price-original">₹{product.originalPrice.toLocaleString('en-IN')}</span>
          <span className="discount-badge">{product.discount}</span>
        </div>

        <div className="card-order-action-bar">
          <button
            className="btn-card-order-now"
            onClick={(e) => {
              e.stopPropagation();
              if (onOrderNow) {
                onOrderNow(product, product.sizes[0]);
              } else {
                onAddToCart(product, product.sizes[0]);
              }
            }}
          >
            ORDER NOW
          </button>
        </div>
      </div>
    </motion.div>
  );
}
