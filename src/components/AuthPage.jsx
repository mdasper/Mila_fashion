import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, ShieldCheck, Sparkles, User, Lock, Mail, Phone, Check, Crown, Eye, EyeOff } from 'lucide-react';

export default function AuthPage({
  onAuthSuccess,
  onBackToStore,
  targetView = 'cart',
  cart = []
}) {
  const [authMode, setAuthMode] = useState('login'); // 'login' or 'signup'
  const [showPassword, setShowPassword] = useState(false);
  const [loginIdentifier, setLoginIdentifier] = useState('priyadharshini@example.com');
  const [loginPassword, setLoginPassword] = useState('••••••••');
  
  const [signupData, setSignupData] = useState({
    name: 'Priyadharshini Raman',
    phone: '9876543210',
    email: 'priyadharshini@example.com',
    password: 'password123'
  });

  const latestPiece = cart && cart.length > 0 ? cart[cart.length - 1] : null;

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    const user = {
      name: loginIdentifier.includes('@') 
        ? loginIdentifier.split('@')[0].replace('.', ' ').replace(/\b\w/g, c => c.toUpperCase())
        : 'Priyadharshini Raman',
      email: loginIdentifier.includes('@') ? loginIdentifier : `${loginIdentifier}@example.com`,
      phone: '9876543210'
    };
    onAuthSuccess(user, targetView, false); // false = existing login
  };

  const handleSignupSubmit = (e) => {
    e.preventDefault();
    const user = {
      name: signupData.name || 'Valued Patron',
      email: signupData.email,
      phone: signupData.phone
    };
    onAuthSuccess(user, targetView, true); // true = new account created
  };

  // Quick 1-click test login for client demonstration
  const handleDemoLogin = () => {
    const demoUser = {
      name: 'Priyadharshini Raman',
      email: 'priya.raman@example.com',
      phone: '9876543210'
    };
    onAuthSuccess(demoUser, targetView, false);
  };

  const handleGuestCheckout = () => {
    const guestUser = {
      name: 'Guest Patron',
      email: 'patron.guest@milafashions.com',
      phone: '9876543210'
    };
    onAuthSuccess(guestUser, targetView, false);
  };

  return (
    <div className="luxe-auth-viewport">
      {/* Top Editorial Navigation Bar */}
      <header className="luxe-auth-nav">
        <button className="luxe-nav-back" onClick={onBackToStore}>
          <ArrowLeft size={16} />
          <span className="nav-back-desktop">RETURN TO BOUTIQUE</span>
          <span className="nav-back-mobile">BOUTIQUE</span>
        </button>

        <div className="luxe-nav-brand" onClick={onBackToStore}>
          <span className="luxe-monogram">M</span>
          <span className="luxe-brand-name">MILA FASHIONS</span>
          <span className="luxe-brand-tag">ATELIER PRIVÉ</span>
        </div>

        <div className="luxe-nav-security" title="256-Bit Encrypted Secure Atelier">
          <ShieldCheck size={14} color="var(--accent-gold)" />
          <span className="nav-sec-text">256-BIT ENCRYPTED</span>
        </div>
      </header>

      {/* Main Luxury Split Stage */}
      <main className="luxe-auth-stage">
        {/* Left Column: Atmospheric Editorial Visual */}
        <section className="luxe-auth-hero-col">
          <div className="luxe-hero-media-wrap">
            <img
              src="https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?q=80&w=1200&auto=format&fit=crop"
              alt="Mila Fashions Haute Couture"
              className="luxe-hero-img"
            />
            <div className="luxe-hero-overlay" />
          </div>

          <div className="luxe-hero-content">
            <div className="luxe-crest-chip">
              <Crown size={13} color="var(--accent-gold)" />
              <span>THE PATRON CIRCLE</span>
            </div>

            <h2 className="luxe-hero-tagline">
              "Every silhouette woven with heritage, crafted for royalty."
            </h2>

            {/* If user is ordering a specific product, show sleek preview */}
            {latestPiece && (
              <div className="luxe-piece-order-badge">
                <img src={latestPiece.image} alt={latestPiece.name} className="luxe-piece-thumb" />
                <div className="luxe-piece-meta">
                  <span className="luxe-piece-caption">PENDING BESPOKE ORDER:</span>
                  <strong>{latestPiece.name}</strong>
                  <span className="luxe-piece-price">₹{latestPiece.price.toLocaleString('en-IN')} • Size {latestPiece.size}</span>
                </div>
              </div>
            )}

            <div className="luxe-hero-perks-row">
              <div className="luxe-perk-item">
                <Sparkles size={14} color="var(--accent-gold)" />
                <span>10% Welcome Atelier Privilege</span>
              </div>
              <div className="luxe-perk-item">
                <Check size={14} color="var(--palette-sage-light)" />
                <span>Complimentary Master Fitting</span>
              </div>
              <div className="luxe-perk-item">
                <Check size={14} color="var(--palette-sage-light)" />
                <span>Insured Express Delivery across India</span>
              </div>
            </div>
          </div>
        </section>

        {/* Right Column: Clean, Elegant High-End Form */}
        <section className="luxe-auth-form-col">
          <div className="luxe-form-container">
            {/* Header info */}
            <div className="luxe-form-header">
              <span className="luxe-section-eyebrow">EXCLUSIVE ACCESS</span>
              <h1 className="luxe-form-title">
                {authMode === 'login' ? 'Patron Sign In' : 'Join the Atelier'}
              </h1>
              <p className="luxe-form-subtitle">
                {authMode === 'login'
                  ? 'Access your private wardrobe, orders & master tailor consultations.'
                  : 'Create your bespoke patron account to claim 10% welcome privileges.'}
              </p>
            </div>

            {/* Seamless Luxury Mode Tabs */}
            <div className="luxe-tabs-wrapper">
              <button
                type="button"
                className={`luxe-tab-trigger ${authMode === 'login' ? 'active' : ''}`}
                onClick={() => setAuthMode('login')}
              >
                Sign In
              </button>
              <button
                type="button"
                className={`luxe-tab-trigger ${authMode === 'signup' ? 'active' : ''}`}
                onClick={() => setAuthMode('signup')}
              >
                Create Account
              </button>
            </div>

            {/* Clean, Refined VIP Quick Demo Pill */}
            <div className="luxe-vip-demo-pill" onClick={handleDemoLogin}>
              <div className="vip-pill-icon">
                <Crown size={14} color="var(--accent-gold)" />
              </div>
              <div className="vip-pill-text">
                <span className="vip-pill-label">1-Click Test Patron Access</span>
                <strong>Priyadharshini Raman (VIP Patron) ➔</strong>
              </div>
            </div>

            {/* Sign In Form */}
            {authMode === 'login' && (
              <form onSubmit={handleLoginSubmit} className="luxe-input-form">
                <div className="luxe-field-group">
                  <label>EMAIL ADDRESS OR MOBILE NUMBER</label>
                  <div className="luxe-input-shell">
                    <Mail size={16} className="luxe-input-icon" />
                    <input
                      type="text"
                      required
                      placeholder="e.g. priyadharshini@example.com"
                      value={loginIdentifier}
                      onChange={(e) => setLoginIdentifier(e.target.value)}
                    />
                  </div>
                </div>

                <div className="luxe-field-group">
                  <div className="luxe-label-row">
                    <label>PASSWORD</label>
                    <a href="javascript:void(0)" className="luxe-forgot-link">
                      Forgot?
                    </a>
                  </div>
                  <div className="luxe-input-shell">
                    <Lock size={16} className="luxe-input-icon" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      required
                      placeholder="••••••••"
                      value={loginPassword}
                      onChange={(e) => setLoginPassword(e.target.value)}
                    />
                    <button
                      type="button"
                      className="luxe-pwd-toggle"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                    </button>
                  </div>
                </div>

                <button type="submit" className="luxe-cta-button">
                  <span>SIGN IN & CONTINUE</span>
                  <ArrowRight size={16} />
                </button>
              </form>
            )}

            {/* Create Account (Sign Up) Form */}
            {authMode === 'signup' && (
              <form onSubmit={handleSignupSubmit} className="luxe-input-form">
                <div className="luxe-field-group">
                  <label>FULL NAME</label>
                  <div className="luxe-input-shell">
                    <User size={16} className="luxe-input-icon" />
                    <input
                      type="text"
                      required
                      placeholder="e.g. Priyadharshini Raman"
                      value={signupData.name}
                      onChange={(e) => setSignupData({ ...signupData, name: e.target.value })}
                    />
                  </div>
                </div>

                <div className="luxe-field-row">
                  <div className="luxe-field-group">
                    <label>MOBILE NUMBER</label>
                    <div className="luxe-input-shell">
                      <Phone size={16} className="luxe-input-icon" />
                      <input
                        type="tel"
                        required
                        pattern="[0-9]{10}"
                        placeholder="9876543210"
                        value={signupData.phone}
                        onChange={(e) => setSignupData({ ...signupData, phone: e.target.value })}
                      />
                    </div>
                  </div>
                  <div className="luxe-field-group">
                    <label>EMAIL ADDRESS</label>
                    <div className="luxe-input-shell">
                      <Mail size={16} className="luxe-input-icon" />
                      <input
                        type="email"
                        required
                        placeholder="priya@example.com"
                        value={signupData.email}
                        onChange={(e) => setSignupData({ ...signupData, email: e.target.value })}
                      />
                    </div>
                  </div>
                </div>

                <div className="luxe-field-group">
                  <label>CREATE SECURE PASSWORD</label>
                  <div className="luxe-input-shell">
                    <Lock size={16} className="luxe-input-icon" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      required
                      placeholder="Minimum 6 characters"
                      value={signupData.password}
                      onChange={(e) => setSignupData({ ...signupData, password: e.target.value })}
                    />
                    <button
                      type="button"
                      className="luxe-pwd-toggle"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                    </button>
                  </div>
                </div>

                <button type="submit" className="luxe-cta-button">
                  <span>CREATE ACCOUNT & CLAIM 10% PERK</span>
                  <ArrowRight size={16} />
                </button>
              </form>
            )}

            {/* Guest Checkout Alternative */}
            <div className="luxe-guest-divider">
              <span>OR</span>
            </div>

            <div style={{ textAlign: 'center' }}>
              <button type="button" className="luxe-guest-link" onClick={handleGuestCheckout}>
                Continue as Guest Patron (Skip password) ➔
              </button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
