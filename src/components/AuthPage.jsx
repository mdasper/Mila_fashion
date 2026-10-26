import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, ShieldCheck, Sparkles, User, Lock, Mail, Phone, Eye, EyeOff, CheckCircle2 } from 'lucide-react';

export default function AuthPage({
  onAuthSuccess,
  onBackToStore,
  targetView = 'cart',
  cart = []
}) {
  const [authMode, setAuthMode] = useState('login'); // 'login' or 'signup'
  const [showLoginPassword, setShowLoginPassword] = useState(false);
  const [showSignupPassword, setShowSignupPassword] = useState(false);
  
  // Real password strings (not literal bullet characters) so eye toggle works seamlessly
  const [loginIdentifier, setLoginIdentifier] = useState('priyadharshini@example.com');
  const [loginPassword, setLoginPassword] = useState('Mila@Patron2026');
  
  const [signupData, setSignupData] = useState({
    name: 'Priyadharshini Raman',
    phone: '9876543210',
    email: 'priyadharshini@example.com',
    password: 'Mila@Patron2026'
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
      {/* Top Luxury Navigation Bar */}
      <header className="atelier-auth-navbar">
        <button className="atelier-nav-back" onClick={onBackToStore} aria-label="Return to Boutique">
          <ArrowLeft size={16} />
          <span>BOUTIQUE</span>
        </button>

        <div className="atelier-nav-brand" onClick={onBackToStore} role="button" tabIndex={0}>
          <span className="atelier-brand-crest">M</span>
          <span className="atelier-brand-title">MILA FASHIONS</span>
          <span className="atelier-brand-sub">ATELIER PRIVÉ</span>
        </div>

        <div className="atelier-nav-security" title="256-Bit SSL Encrypted">
          <ShieldCheck size={14} color="var(--accent-gold)" />
          <span>SECURE SSL</span>
        </div>
      </header>

      {/* Main Centered Stage */}
      <main className="atelier-auth-main">
        <div className="atelier-auth-card">
          {/* Card Top Monogram & Heading */}
          <div className="atelier-card-crest">
            <div className="crest-seal">
              <span>M</span>
            </div>
            <h1 className="crest-headline">
              {authMode === 'login' ? 'Patron Sign In' : 'Join The Atelier'}
            </h1>
            <p className="crest-tagline">
              {authMode === 'login'
                ? 'Access your bespoke wardrobe, private orders & master tailoring.'
                : 'Create your bespoke patron account to claim 10% welcome privileges.'}
            </p>
          </div>

          {/* Minimalist Switch Tabs */}
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

          {/* Sign In Form */}
          {authMode === 'login' && (
            <form onSubmit={handleLoginSubmit} className="atelier-form-body">
              <div className="atelier-input-group">
                <label className="atelier-label">EMAIL ADDRESS OR MOBILE</label>
                <div className="atelier-input-wrapper">
                  <Mail size={16} className="atelier-icon-field" />
                  <input
                    type="text"
                    required
                    placeholder="name@example.com or mobile"
                    value={loginIdentifier}
                    onChange={(e) => setLoginIdentifier(e.target.value)}
                  />
                </div>
              </div>

              <div className="atelier-input-group">
                <div className="atelier-label-row">
                  <label className="atelier-label">PASSWORD</label>
                  <a
                    href="#forgot"
                    onClick={(e) => {
                      e.preventDefault();
                      alert("Password reset link has been dispatched to your registered email.");
                    }}
                    className="atelier-forgot-link"
                  >
                    Forgot?
                  </a>
                </div>
                <div className="atelier-input-wrapper">
                  <Lock size={16} className="atelier-icon-field" />
                  <input
                    type={showLoginPassword ? 'text' : 'password'}
                    required
                    placeholder="Enter password"
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                  />
                  <button
                    type="button"
                    className="atelier-pwd-toggle"
                    onClick={(e) => {
                      e.preventDefault();
                      setShowLoginPassword(!showLoginPassword);
                    }}
                    aria-label={showLoginPassword ? "Hide password" : "Show password"}
                    title={showLoginPassword ? "Hide password" : "Show password"}
                  >
                    {showLoginPassword ? <EyeOff size={16} /> : <Eye size={16} />}
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
                    placeholder="Priyadharshini Raman"
                    value={signupData.name}
                    onChange={(e) => setSignupData({ ...signupData, name: e.target.value })}
                  />
                </div>
              </div>

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

              <div className="atelier-input-group">
                <label className="atelier-label">CREATE PASSWORD</label>
                <div className="atelier-input-wrapper">
                  <Lock size={16} className="atelier-icon-field" />
                  <input
                    type={showSignupPassword ? 'text' : 'password'}
                    required
                    placeholder="Minimum 6 characters"
                    value={signupData.password}
                    onChange={(e) => setSignupData({ ...signupData, password: e.target.value })}
                  />
                  <button
                    type="button"
                    className="atelier-pwd-toggle"
                    onClick={(e) => {
                      e.preventDefault();
                      setShowSignupPassword(!showSignupPassword);
                    }}
                    aria-label={showSignupPassword ? "Hide password" : "Show password"}
                    title={showSignupPassword ? "Hide password" : "Show password"}
                  >
                    {showSignupPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              <button type="submit" className="atelier-submit-btn">
                <span>CREATE ACCOUNT & CLAIM 10% PERK</span>
                <ArrowRight size={16} />
              </button>
            </form>
          )}

          {/* Discreet, elegant 1-Click VIP Patron Demo chip (below button, neat and tidy) */}
          <div
            className="atelier-vip-pill"
            onClick={handleDemoLogin}
            role="button"
            tabIndex={0}
            title="Click to instantly sign in as VIP Patron"
          >
            <Sparkles size={13} color="var(--accent-gold)" />
            <span>1-Click VIP Demo: <strong>Priyadharshini Raman</strong></span>
            <ArrowRight size={12} />
          </div>

          {/* Guest Checkout Alternative */}
          <div className="atelier-guest-wrap">
            <span className="atelier-guest-or">or</span>
            <button type="button" className="atelier-guest-btn" onClick={handleGuestCheckout}>
              Continue as Guest Patron ➔
            </button>
          </div>

          {/* Trust Guarantees */}
          <div className="atelier-trust-strip">
            <div className="trust-item">
              <Sparkles size={12} color="var(--accent-gold)" />
              <span>Pure Silk</span>
            </div>
            <div className="trust-item">
              <CheckCircle2 size={12} color="var(--palette-forest-moss)" />
              <span>Insured Delivery</span>
            </div>
            <div className="trust-item">
              <ShieldCheck size={12} color="var(--accent-gold)" />
              <span>256-Bit SSL</span>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
