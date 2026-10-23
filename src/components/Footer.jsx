import React from 'react';
import { MapPin, Mail, Phone, Share2, Globe, MessageCircle } from 'lucide-react';

export default function Footer({ onOpenSizeGuide }) {
  return (
    <footer className="site-footer" id="contact">
      <div className="footer-top">
        <div className="footer-col brand-col">
          <div className="footer-logo">MILA FASHIONS</div>
          <p>
            Bespoke haute couture, pure handloom sarees, artisanal bridal ensembles, and contemporary silhouettes.
          </p>
          <div className="social-links">
            <a href="#" aria-label="Social"><Share2 size={17} /></a>
            <a href="#" aria-label="Website"><Globe size={17} /></a>
            <a href="https://wa.me/919876543210" target="_blank" rel="noreferrer" aria-label="WhatsApp">
              <MessageCircle size={17} />
            </a>
          </div>
        </div>

        <div className="footer-col">
          <h4>Client Services</h4>
          <ul>
            <li>
              <a href="javascript:void(0)" onClick={onOpenSizeGuide}>
                Size & Measurement Guide
              </a>
            </li>
            <li><a href="#collections">Explore All Creations</a></li>
            <li><a href="#about">Custom Stitching & Tailoring</a></li>
            <li><a href="#contact">Insured Express Shipping</a></li>
          </ul>
        </div>

        <div className="footer-col">
          <h4>Flagship Boutique</h4>
          <p>
            <MapPin size={15} style={{ display: 'inline', marginRight: '6px', color: 'var(--palette-sage-light)' }} />
            Mila Fashions Haute Atelier<br />
            14, Anna Salai / Luxury Avenue,<br />
            Tamil Nadu, India.
          </p>
          <p>
            <Mail size={15} style={{ display: 'inline', marginRight: '6px', color: 'var(--palette-sage-light)' }} />
            contact@milafashions.com
          </p>
          <p>
            <Phone size={15} style={{ display: 'inline', marginRight: '6px', color: 'var(--palette-sage-light)' }} />
            +91 98765 43210
          </p>
        </div>

        <div className="footer-col">
          <h4>Private Newsletter</h4>
          <p>Receive exclusive invites to private trunk shows and new collection releases.</p>
          <div style={{ display: 'flex', marginTop: '12px' }}>
            <input
              type="email"
              placeholder="Your email address"
              style={{
                background: 'rgba(255, 255, 255, 0.08)',
                border: '1px solid rgba(255, 255, 255, 0.15)',
                padding: '10px 14px',
                color: '#fff',
                fontSize: '0.82rem',
                borderRadius: '4px 0 0 4px',
                outline: 'none',
                flex: 1
              }}
            />
            <button
              type="button"
              className="btn btn-secondary"
              style={{
                borderRadius: '0 4px 4px 0',
                padding: '10px 20px',
                background: 'var(--palette-forest-moss)'
              }}
            >
              JOIN
            </button>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; 2026 Mila Fashions Haute Couture. All rights reserved.</p>
        <div className="payment-badges">
          <span>VISA</span>
          <span>MasterCard</span>
          <span>UPI Instant</span>
          <span>NetBanking</span>
          <span>Doorstep COD</span>
        </div>
      </div>
    </footer>
  );
}
