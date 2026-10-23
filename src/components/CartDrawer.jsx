import React from 'react';
import { X, ShoppingBag, ArrowRight, ShieldCheck, Trash2 } from 'lucide-react';

const FREE_SHIPPING_THRESHOLD = 1499;

export default function CartDrawer({
  isOpen,
  onClose,
  cart,
  onUpdateQty,
  onRemoveItem,
  onProceedCheckout
}) {
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  const totalItems = cart.reduce((sum, item) => sum + item.qty, 0);

  const isFreeShipping = subtotal >= FREE_SHIPPING_THRESHOLD;
  const progressPercent = Math.min(100, Math.round((subtotal / FREE_SHIPPING_THRESHOLD) * 100));
  const amountNeeded = FREE_SHIPPING_THRESHOLD - subtotal;

  return (
    <>
      <div
        className={`cart-drawer-overlay ${isOpen ? 'active' : ''}`}
        onClick={onClose}
      />
      <aside className={`cart-drawer ${isOpen ? 'active' : ''}`}>
        <div className="cart-drawer-header">
          <div className="drawer-title-wrap">
            <h3>Shopping Bag</h3>
            <span className="cart-item-count">
              ({totalItems} {totalItems === 1 ? 'piece' : 'pieces'})
            </span>
          </div>
          <button className="drawer-close-btn" onClick={onClose} aria-label="Close cart">
            <X size={22} />
          </button>
        </div>

        {/* Free Shipping Progress Tracker */}
        <div className="shipping-progress-container">
          <p className="shipping-progress-text">
            {isFreeShipping ? (
              <span>🎉 <strong>Complimentary Express Shipping</strong> Unlocked!</span>
            ) : (
              <span>
                Add <strong>₹{amountNeeded.toLocaleString('en-IN')}</strong> more for <strong>FREE Express Shipping</strong>!
              </span>
            )}
          </p>
          <div className="progress-bar-bg">
            <div
              className="progress-bar-fill"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* Cart Item List */}
        <div className="cart-items-list">
          {cart.length === 0 ? (
            <div className="cart-empty-state">
              <ShoppingBag size={48} strokeWidth={1.5} />
              <h4>Your Bag is Empty</h4>
              <p>Explore our handcrafted signature creations.</p>
              <button
                className="btn btn-outline"
                onClick={onClose}
                style={{
                  color: 'var(--palette-forest-dark)',
                  borderColor: 'var(--palette-forest-dark)'
                }}
              >
                DISCOVER COLLECTION
              </button>
            </div>
          ) : (
            cart.map((item) => (
              <div className="cart-item" key={`${item.id}-${item.size}`}>
                <img src={item.image} alt={item.name} className="cart-item-thumb" />
                <div className="cart-item-details">
                  <h4 className="cart-item-name">{item.name}</h4>
                  <span className="cart-item-meta">Size: <strong>{item.size}</strong></span>
                  <span className="cart-item-price">
                    ₹{(item.price * item.qty).toLocaleString('en-IN')}
                  </span>
                  <div className="cart-item-actions">
                    <div className="qty-control">
                      <button className="qty-btn" onClick={() => onUpdateQty(item.id, item.size, -1)}>
                        -
                      </button>
                      <span className="qty-val">{item.qty}</span>
                      <button className="qty-btn" onClick={() => onUpdateQty(item.id, item.size, 1)}>
                        +
                      </button>
                    </div>
                    <button
                      className="remove-item-btn"
                      onClick={() => onRemoveItem(item.id, item.size)}
                    >
                      <Trash2 size={13} style={{ display: 'inline', marginRight: '3px' }} /> Remove
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Cart Drawer Footer (Clean without promo code box) */}
        {cart.length > 0 && (
          <div className="cart-drawer-footer">
            <div className="cart-pricing-breakdown">
              <div className="price-row">
                <span>Subtotal</span>
                <span>₹{subtotal.toLocaleString('en-IN')}</span>
              </div>
              <div className="price-row">
                <span>Estimated Delivery</span>
                <span>
                  {isFreeShipping ? (
                    <strong style={{ color: 'var(--palette-forest-moss)' }}>FREE</strong>
                  ) : (
                    '₹150'
                  )}
                </span>
              </div>
              <div className="price-row total-row">
                <span>Total Amount</span>
                <span>
                  ₹{(subtotal + (isFreeShipping ? 0 : 150)).toLocaleString('en-IN')}
                </span>
              </div>
            </div>

            <button
              className="btn btn-primary btn-block"
              onClick={() => {
                onClose();
                onProceedCheckout();
              }}
            >
              PROCEED TO SECURE CHECKOUT <ArrowRight size={16} />
            </button>

            <div className="cart-guarantee">
              <ShieldCheck size={14} color="var(--palette-forest-moss)" />
              <span>100% Encrypted & Authenticated Payment</span>
            </div>
          </div>
        )}
      </aside>
    </>
  );
}
