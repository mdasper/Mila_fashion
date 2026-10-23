import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, CheckCircle2, ShieldCheck, ArrowRight, Gift, Scissors, Truck, Crown } from 'lucide-react';

export default function AuthWelcomeModal({
  isOpen,
  onClose,
  type = 'login', // 'signup' | 'login'
  userName = 'Valued Patron',
  onProceed
}) {
  if (!isOpen) return null;

  const isSignup = type === 'signup';

  return (
    <AnimatePresence>
      <div className="modal-overlay active" style={{ zIndex: 9999 }} onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}>
        <motion.div
          className="auth-welcome-modal"
          initial={{ opacity: 0, scale: 0.92, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.92, y: 20 }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Top Decorative Monogram Crest */}
          <div className="welcome-modal-crest">
            <div className="crest-halo">
              <span className="crest-letter">M</span>
            </div>
            <span className="crest-tag">MILA PATRON PRIVILEGES</span>
          </div>

          {/* Heading */}
          <div className="welcome-modal-heading">
            <div className="success-pill">
              <CheckCircle2 size={15} color="var(--palette-forest-moss)" />
              <span>{isSignup ? 'Account Created Successfully' : 'Login Successful'}</span>
            </div>
            <h2 className="welcome-modal-title">
              Welcome to Mila Fashions, <span className="highlight-patron-name">{userName}</span>
            </h2>
            <p className="welcome-modal-desc">
              {isSignup
                ? 'Your patron account is active. Enjoy exclusive couture atelier privileges on every piece.'
                : 'Welcome back to your private wardrobe. Your preferences and benefits have been synced.'}
            </p>
          </div>

          {/* Exclusive Perks Grid */}
          <div className="welcome-perks-grid">
            <div className="welcome-perk-card">
              <div className="perk-icon-wrap">
                <Gift size={18} color="var(--accent-gold)" />
              </div>
              <div className="perk-text-wrap">
                <h4>Atelier Welcome Privileges</h4>
                <p>10% complimentary privilege applied toward your bespoke handloom & couture creations.</p>
              </div>
            </div>

            <div className="welcome-perk-card">
              <div className="perk-icon-wrap">
                <Scissors size={18} color="var(--palette-forest-moss)" />
              </div>
              <div className="perk-text-wrap">
                <h4>Master Tailor Fitting</h4>
                <p>Custom sleeve, drape, and neckline bespoke sizing consultations with our master tailors.</p>
              </div>
            </div>

            <div className="welcome-perk-card">
              <div className="perk-icon-wrap">
                <Truck size={18} color="var(--palette-forest-moss)" />
              </div>
              <div className="perk-text-wrap">
                <h4>Complimentary Express Shipping</h4>
                <p>Insured expedited white-glove dispatch across all Indian pin codes.</p>
              </div>
            </div>

            <div className="welcome-perk-card">
              <div className="perk-icon-wrap">
                <Crown size={18} color="var(--accent-gold)" />
              </div>
              <div className="perk-text-wrap">
                <h4>VIP Trunk Show Access</h4>
                <p>First-in-line access to limited-edition festive edits and heirloom heritage sarees.</p>
              </div>
            </div>
          </div>

          {/* Action Button */}
          <div className="welcome-modal-action">
            <button
              className="btn btn-primary welcome-continue-btn"
              onClick={() => {
                onClose();
                if (onProceed) onProceed();
              }}
            >
              <span>CONTINUE TO SHOPPING BAG</span>
              <ArrowRight size={16} />
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
