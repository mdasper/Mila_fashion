import React from 'react';
import { Home, Sparkles, Heart, ShoppingBag, MessageCircle } from 'lucide-react';

export default function MobileBottomNav({
  cartCount,
  wishlistCount,
  onOpenCart,
  onOpenWishlist
}) {
  return (
    <nav className="mobile-bottom-bar" aria-label="Mobile Navigation">
      <button
        className="mobile-nav-item active"
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      >
        <Home size={20} />
        <span>Home</span>
      </button>

      <button
        className="mobile-nav-item"
        onClick={() => {
          const el = document.getElementById('collections');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }}
      >
        <Sparkles size={20} />
        <span>Capsule</span>
      </button>

      <button className="mobile-nav-item" onClick={onOpenWishlist}>
        <Heart size={20} />
        <span>Wishlist</span>
        {wishlistCount > 0 && <span className="badge">{wishlistCount}</span>}
      </button>

      <button className="mobile-nav-item" onClick={onOpenCart}>
        <ShoppingBag size={20} />
        <span>Bag</span>
        {cartCount > 0 && <span className="badge">{cartCount}</span>}
      </button>

      <a
        href="https://wa.me/919876543210"
        target="_blank"
        rel="noreferrer"
        className="mobile-nav-item"
        style={{ color: '#25D366' }}
      >
        <MessageCircle size={20} />
        <span>Stylist</span>
      </a>
    </nav>
  );
}
