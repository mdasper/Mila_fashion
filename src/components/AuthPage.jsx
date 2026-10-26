import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, ShieldCheck, Sparkles, User, Lock, Mail, Phone, Crown, Eye, EyeOff, CheckCircle2 } from 'lucide-react';

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
    <div className="atelier-auth-viewport">
      {/* Top Editorial Navigation Bar */}
      <header className="atelier-auth-navbar">
        <button className="atelier-nav-back" onClick={onBackToStore} aria-label="Return to Boutique">
          <ArrowLeft size={16} />
          <span className="nav-back-full">RETURN TO BOUTIQUE</span>
          <span className="nav-back-short">BOUTIQUE</span>
        </button>

        <div className="atelier-nav-brand" onClick={onBackToStore} role="button" tabIndex={0}>
          <span className="atelier-brand-crest">M</span>
          <span className="atelier-brand-title">MILA FASHIONS</span>
          <span className="atelier-brand-sub">ATELIER PRIVÉ</span>
        </div>

        <div className="atelier-nav-security">
          <ShieldCheck size={15} color="var(--accent-gold)" />
          <span className="nav-sec-full">256-BIT SSL PROTECTED</span>
          <span className="nav-sec-short">SECURE SSL</span>
        </div>
      </header>

      {/* Centered Haute Couture Atelier Portal */}
      <main className="atelier-auth-main">
        <div className="atelier-auth-card">
          {/* Top Gold Crest Icon */}
          <div className="atelier-card-crest">
            <div className="crest-halo-gold">
              <Crown size={20} color="var(--accent-gold)" />
            </div>
            <span className="crest-eyebrow">THE PATRON CIRCLE</span>
            <h1 className="crest-headline">
              {authMode === 'login' ? 'Patron Sign In' : 'Join The Atelier'}
            </h1>
            <p className="crest-tagline">
              {authMode === 'login'
                ? 'Sign in to access your private wardrobe, orders & master consultations.'
                : 'Create your bespoke patron account to claim 10% welcome privileges.'}
            </p>
          </div>

          {/* If user is ordering a specific product, show sleek preview badge */}
          {latestPiece && (
            <div className="atelier-order-preview">
              <img src={latestPiece.image} alt={latestPiece.name} className="order-preview-thumb" />
              <div className="order-preview-meta">
                <span className="preview-label">CURRENT ORDER IN PROGRESS</span>
                <strong className="preview-name">{latestPiece.name}</strong>
                <span className="preview-price">₹{latestPiece.price.toLocaleString('en-IN')} • Size {latestPiece.size}</span>
              </div>
            </div>
          )}

          {/* Mode Switch Tabs */}
          <div className="atelier-tabs-nav">
            <button
              type="button"
              className={`atelier-tab-btn ${authMode === 'login' ? 'active' : ''}`}
              onClick={() => setAuthMode('login')}
            >
              Sign In
            </button>
            <button
              type="button"
              className={`atelier-tab-btn ${authMode === 'signup' ? 'active' : ''}`}
              onClick={() => setAuthMode('signup')}
            >
              Create Account
            </button>
          </div>

          {/* Quick 1-Click VIP Patron Demo Access */}
          <div
            className="atelier-vip-demo-card"
            onClick={handleDemoLogin}
            role="button"
            tabIndex={0}
            title="Click to instantly sign in as VIP Patron"
          >
            <div className="vip-icon-wrap">
              <Sparkles size={16} color="var(--accent-gold)" />
            </div>
            <div className="vip-text-wrap">
              <span className="vip-badge-tag">1-CLICK INSTANT TEST PATRON</span>
              <strong>Priyadharshini Raman (VIP Patron) ➔</strong>
            </div>
          </div>

          {/* Sign In Form */}
          {authMode === 'login' && (
            <form onSubmit={handleLoginSubmit} className="atelier-form-body">
              <div className="atelier-input-group">
                <label className="atelier-label">EMAIL ADDRESS OR MOBILE NUMBER</label>
                <div className="atelier-input-wrapper">
                  <Mail size={16} className="atelier-icon-field" />
                  <input
                    type="text"
                    required
                    placeholder="e.g. priyadharshini@example.com"
                    value={loginIdentifier}
                    onChange={(e) => setLoginIdentifier(e.target.value)}
                  />
                </div>
              </div>

              <div className="atelier-input-group">
                <div className="atelier-label-row">
                  <label className="atelier-label">PASSWORD</label>
                  <a href="#forgot" onClick={(e) => { e.preventDefault(); alert("Password reset link has been dispatched to your registered email."); }} className="atelier-forgot-link">
                    Forgot Password?
                  </a>
                </div>
                <div className="atelier-input-wrapper">
                  <Lock size={16} className="atelier-icon-field" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    placeholder="••••••••"
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                  />
                  <button
                    type="button"
                    className="atelier-pwd-toggle"
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label="Toggle password visibility"
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              <button type="submit" className="atelier-submit-btn">
                <span>SIGN IN & CONTINUE</span>
                <ArrowRight size={16} />
              </button>
            </form>
          )}

          {/* Create Account Form */}
          {authMode === 'signup' && (
            <form onSubmit={handleSignupSubmit} className="atelier-form-body">
              <div className="atelier-input-group">
                <label className="atelier-label">FULL NAME</label>
                <div className="atelier-input-wrapper">
                  <User size={16} className="atelier-icon-field" />
                  <input
                    type="text"
                    required
                    placeholder="e.g. Priyadharshini Raman"
                    value={signupData.name}
                    onChange={(e) => setSignupData({ ...signupData, name: e.target.value })}
                  />
                </div>
              </div>

              <div className="atelier-input-row">
                <div className="atelier-input-group">
                  <label className="atelier-label">MOBILE NUMBER</label>
                  <div className="atelier-input-wrapper">
                    <Phone size={16} className="atelier-icon-field" />
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

                <div className="atelier-input-group">
                  <label className="atelier-label">EMAIL ADDRESS</label>
                  <div className="atelier-input-wrapper">
                    <Mail size={16} className="atelier-icon-field" />
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

              <div className="atelier-input-group">
                <label className="atelier-label">CREATE SECURE PASSWORD</label>
                <div className="atelier-input-wrapper">
                  <Lock size={16} className="atelier-icon-field" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    placeholder="Minimum 6 characters"
                    value={signupData.password}
                    onChange={(e) => setSignupData({ ...signupData, password: e.target.value })}
                  />
                  <button
                    type="button"
                    className="atelier-pwd-toggle"
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label="Toggle password visibility"
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              <button type="submit" className="atelier-submit-btn">
                <span>CREATE ACCOUNT & CLAIM 10% PERK</span>
                <ArrowRight size={16} />
              </button>
            </form>
          )}

          {/* Guest Checkout Alternative */}
          <div className="atelier-divider">
            <span>OR</span>
          </div>

          <div className="atelier-guest-wrap">
            <button type="button" className="atelier-guest-btn" onClick={handleGuestCheckout}>
              Continue as Guest Patron (Skip Password) ➔
            </button>
          </div>

          {/* Trust Guarantees */}
          <div className="atelier-trust-strip">
            <div className="trust-item">
              <Sparkles size={13} color="var(--accent-gold)" />
              <span>Pure Handloom Silk</span>
            </div>
            <div className="trust-item">
              <CheckCircle2 size={13} color="var(--palette-forest-moss)" />
              <span>Insured Delivery</span>
            </div>
            <div className="trust-item">
              <ShieldCheck size={13} color="var(--accent-gold)" />
              <span>256-Bit SSL</span>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
