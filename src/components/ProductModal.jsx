import React, { useState, useEffect } from 'react';
import { X, ShoppingBag, Heart, Star, Sparkles, CheckCircle2 } from 'lucide-react';

export default function ProductModal({
  product,
  isOpen,
  onClose,
  onAddToCart,
  onOrderNow,
  onOpenSizeGuide,
  isWishlisted,
  onToggleWishlist
}) {
  const [selectedSize, setSelectedSize] = useState('');

  useEffect(() => {
    if (product && product.sizes && product.sizes.length > 0) {
      setSelectedSize(product.sizes[0]);
    }
  }, [product]);

  if (!isOpen || !product) return null;

  return (
    <div className="modal-overlay active" onClick={(e) => {
      if (e.target === e.currentTarget) onClose();
    }}>
      <div className="quick-view-modal">
        <button className="modal-close" onClick={onClose} aria-label="Close modal">
          <X size={18} />
        </button>

        <div className="quick-view-grid">
          <div className="qv-gallery-col">
            <img src={product.image} alt={product.name} className="qv-gallery-main" />
          </div>

          <div className="qv-info-col">
            <span className="qv-meta-cat">{product.category} • Mila Signature</span>
            <h2 className="qv-title">{product.name}</h2>

            <div className="product-rating" style={{ marginBottom: '14px' }}>
              <span className="stars" style={{ display: 'inline-flex', gap: '2px' }}>
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={14} fill="#D4A346" stroke="#D4A346" />
                ))}
              </span>
              <span>{product.rating} / 5.0 ({product.reviewsCount} reviews)</span>
            </div>

            <div className="qv-pricing">
              <span className="price-current current">₹{product.price.toLocaleString('en-IN')}</span>
              <span className="price-original original">₹{product.originalPrice.toLocaleString('en-IN')}</span>
              <span className="discount-badge">{product.discount}</span>
            </div>

            <p className="qv-desc">{product.description}</p>

            <div className="selector-heading">
              <span>Select Size:</span>
              <button className="size-guide-link" onClick={onOpenSizeGuide}>
                Size Guide
              </button>
            </div>

            <div className="size-selector-group">
              {product.sizes.map((s, idx) => (
                <button
                  key={idx}
                  className={`size-btn ${selectedSize === s ? 'selected' : ''}`}
                  onClick={() => setSelectedSize(s)}
                >
                  {s}
                </button>
              ))}
            </div>

            <div className="qv-actions-row">
              <button
                className="btn btn-primary"
                onClick={() => {
                  if (onOrderNow) {
                    onOrderNow(product, selectedSize);
                  } else {
                    onAddToCart(product, selectedSize);
                  }
                  onClose();
                }}
              >
                <Sparkles size={16} /> ORDER NOW
              </button>
              <button
                className="btn btn-secondary"
                onClick={() => {
                  onAddToCart(product, selectedSize);
                  onClose();
                }}
              >
                <ShoppingBag size={16} /> ADD TO BAG
              </button>
              <button
                className="icon-btn"
                onClick={() => onToggleWishlist(product.id)}
                title="Wishlist"
              >
                <Heart size={18} fill={isWishlisted ? 'var(--accent-rose)' : 'none'} color={isWishlisted ? 'var(--accent-rose)' : 'currentColor'} />
              </button>
            </div>

            <div style={{
              background: 'var(--bg-main)',
              padding: '16px',
              borderRadius: '8px',
              fontSize: '0.82rem',
              color: 'var(--text-muted)',
              border: '1px solid var(--border-light)'
            }}>
              <p style={{ marginBottom: '6px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Sparkles size={16} color="var(--palette-forest-moss)" />
                <strong>Fabric & Care:</strong> {product.fabricCare}
              </p>
              <p style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <CheckCircle2 size={16} color="var(--palette-forest-moss)" />
                Complimentary insured express delivery within 2–4 business days.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
