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

  // Handle ESC key to close modal
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen || !product) return null;

  return (
    <div
      className="modal-overlay active"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="quick-view-modal luxe-modal-box">
        <button className="modal-close" onClick={onClose} aria-label="Close modal">
          <X size={18} />
        </button>

        <div className="quick-view-grid">
          {/* Gallery Column */}
          <div className="qv-gallery-col">
            <div className="qv-image-wrapper">
              <img src={product.image} alt={product.name} className="qv-gallery-main" />
              {product.badge && (
                <span className={`product-badge ${product.badgeType || 'badge-trending'}`}>
                  {product.badge}
                </span>
              )}
            </div>
          </div>

          {/* Info Column */}
          <div className="qv-info-col">
            <div className="qv-header-tag-row">
              <span className="qv-meta-cat">{product.category} • Mila Atelier</span>
              <div className="qv-rating-pill">
                <Star size={12} fill="#D4A346" stroke="#D4A346" />
                <span>{product.rating} ({product.reviewsCount} reviews)</span>
              </div>
            </div>

            <h2 className="qv-title">{product.name}</h2>

            <div className="qv-pricing">
              <span className="price-current current">₹{product.price.toLocaleString('en-IN')}</span>
              <span className="price-original original">₹{product.originalPrice.toLocaleString('en-IN')}</span>
              <span className="discount-badge">{product.discount}</span>
            </div>

            <p className="qv-desc">{product.description}</p>

            <div className="selector-heading">
              <span>Select Size:</span>
              <button className="size-guide-link" onClick={onOpenSizeGuide}>
                Size Guide ➔
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

            {/* Clean, perfectly aligned action buttons */}
            <div className="qv-actions-stack">
              <button
                className="btn btn-primary btn-modal-order"
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

              <div className="qv-secondary-actions-row">
                <button
                  className="btn btn-secondary btn-modal-addbag"
                  onClick={() => {
                    onAddToCart(product, selectedSize);
                    onClose();
                  }}
                >
                  <ShoppingBag size={15} /> ADD TO BAG
                </button>
                <button
                  className={`icon-btn qv-wishlist-btn ${isWishlisted ? 'active' : ''}`}
                  onClick={() => onToggleWishlist(product.id)}
                  title="Save to Wishlist"
                  aria-label="Wishlist"
                >
                  <Heart
                    size={18}
                    fill={isWishlisted ? 'var(--accent-rose)' : 'none'}
                    color={isWishlisted ? 'var(--accent-rose)' : 'currentColor'}
                  />
                </button>
              </div>
            </div>

            {/* Fabric & Delivery Assurance */}
            <div className="qv-assurance-box">
              <div className="assurance-line">
                <Sparkles size={14} color="var(--palette-forest-moss)" />
                <span><strong>Fabric & Craft:</strong> {product.fabricCare}</span>
              </div>
              <div className="assurance-line">
                <CheckCircle2 size={14} color="var(--palette-forest-moss)" />
                <span>Complimentary insured express delivery across India.</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
