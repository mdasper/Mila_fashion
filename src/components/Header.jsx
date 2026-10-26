import React, { useState, useEffect, useRef } from 'react';
import { ShoppingBag, Heart, Search, X, Sparkles, User, LogOut, ChevronDown, Check, ShieldCheck, Crown } from 'lucide-react';

export default function Header({
  cartCount,
  wishlistCount,
  onOpenCart,
  onOpenWishlist,
  searchQuery,
  onSearchChange,
  currentUser,
  onOpenAuth,
  onLogout
}) {
  const [showAnnouncement, setShowAnnouncement] = useState(true);
  const [scrolled, setScrolled] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const profileDropdownRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 30) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close profile dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (profileDropdownRef.current && !profileDropdownRef.current.contains(e.target)) {
        setIsProfileDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const getInitials = (name) => {
    if (!name) return 'M';
    const parts = name.trim().split(' ');
    if (parts.length >= 2) {
      return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
    }
    return name.slice(0, 2).toUpperCase();
  };

  return (
    <>
      {showAnnouncement && (
        <aside className="announcement-bar">
          <span>
            <Sparkles size={14} style={{ display: 'inline', marginRight: '6px', verticalAlign: 'middle' }} />
            AUTUMN / FESTIVE COUTURE: <strong>Complimentary Express Delivery</strong> across India on all orders
          </span>
          <button
            onClick={() => setShowAnnouncement(false)}
            style={{
              position: 'absolute',
              right: '16px',
              background: 'none',
              border: 'none',
              color: 'var(--palette-cream)',
              cursor: 'pointer',
              opacity: 0.8
            }}
            aria-label="Close"
          >
            <X size={16} />
          </button>
        </aside>
      )}

      <header className={`site-header ${scrolled ? 'scrolled' : ''}`}>
        <div className="header-container">
          <div className="header-left">
            <nav className="nav-links">
              <a href="#collections" className="nav-link active">Collections</a>
              <a href="#about" className="nav-link">Our Atelier</a>
              <a href="#contact" className="nav-link">Boutique</a>
            </nav>
            <div className="mobile-header-tag">
              <span>EST. 2024</span>
            </div>
          </div>

          <div className="header-center">
            <a href="#" className="brand-logo">
              <span className="brand-monogram">M</span>
              <span className="brand-name">MILA FASHIONS</span>
              <span className="brand-tagline">HAUTE COUTURE & BOUTIQUE</span>
            </a>
          </div>

          <div className="header-right">
            <div className="search-box desktop-only-search">
              <Search className="search-icon" size={16} />
              <input
                type="text"
                placeholder="Search pieces..."
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
              />
              {searchQuery && (
                <button
                  onClick={() => onSearchChange('')}
                  style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)' }}
                >
                  <X size={14} />
                </button>
              )}
            </div>

            {/* NEAT & ATTRACTIVE PATRON PROFILE LOGO / BADGE */}
            {currentUser ? (
              <div className="patron-profile-container" ref={profileDropdownRef}>
                <button
                  className="patron-profile-chip"
                  onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
                  aria-label="Patron Account Menu"
                >
                  <div className="patron-avatar-badge">
                    <span>{getInitials(currentUser.name)}</span>
                    <span className="patron-status-pip" />
                  </div>
                  <div className="patron-meta-text">
                    <span className="patron-name-label">{currentUser.name.split(' ')[0]}</span>
                    <span className="patron-tier-tag">VIP PATRON</span>
                  </div>
                  <ChevronDown
                    size={14}
                    className={`patron-chevron ${isProfileDropdownOpen ? 'rotate' : ''}`}
                  />
                </button>

                {/* Luxury Dropdown Menu */}
                {isProfileDropdownOpen && (
                  <div className="patron-dropdown-card">
                    <div className="dropdown-patron-header">
                      <div className="dropdown-avatar-large">
                        {getInitials(currentUser.name)}
                      </div>
                      <div className="dropdown-patron-info">
                        <div className="patron-title-row">
                          <strong>{currentUser.name}</strong>
                          <Crown size={14} color="var(--accent-gold)" />
                        </div>
                        <span className="dropdown-patron-email">{currentUser.email}</span>
                        <div className="patron-status-badge">
                          <Check size={11} /> Mila Patron Circle Member
                        </div>
                      </div>
                    </div>

                    <div className="dropdown-perks-reminder">
                      <Sparkles size={13} color="var(--accent-gold)" />
                      <span><strong>10% Atelier Privilege Active</strong> on current order</span>
                    </div>

                    <div className="dropdown-menu-list">
                      <button
                        className="dropdown-item"
                        onClick={() => {
                          setIsProfileDropdownOpen(false);
                          onOpenCart();
                        }}
                      >
                        <ShoppingBag size={15} />
                        <span>Shopping Bag ({cartCount})</span>
                      </button>
                      <button
                        className="dropdown-item"
                        onClick={() => {
                          setIsProfileDropdownOpen(false);
                          onOpenWishlist();
                        }}
                      >
                        <Heart size={15} />
                        <span>Wishlist Pieces ({wishlistCount})</span>
                      </button>
                      <button
                        className="dropdown-item logout-item"
                        onClick={() => {
                          setIsProfileDropdownOpen(false);
                          onLogout();
                        }}
                      >
                        <LogOut size={15} />
                        <span>Sign Out of Atelier</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <button
                className="btn-header-signin"
                onClick={onOpenAuth}
                title="Sign In / Register"
              >
                <User size={15} />
                <span>Sign In</span>
              </button>
            )}

            <button className="icon-btn desktop-only-wishlist" onClick={onOpenWishlist} title="Wishlist">
              <Heart size={18} />
              {wishlistCount > 0 && <span className="badge">{wishlistCount}</span>}
            </button>

            <button className="icon-btn" onClick={onOpenCart} title="Shopping Bag">
              <ShoppingBag size={18} />
              {cartCount > 0 && <span className="badge">{cartCount}</span>}
            </button>
          </div>
        </div>
      </header>
    </>
  );
}
