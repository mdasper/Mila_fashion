import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight, CheckCircle2, ShieldCheck, QrCode, CreditCard, Building2, Banknote, Printer, MessageCircle, Truck, Sparkles, Loader2, ShoppingBag } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function CheckoutPage({
  cart,
  currentUser,
  onClearCart,
  onBackToStore
}) {
  const [step, setStep] = useState(1); // 1: Shipping, 2: Payment, 3: Success Celebration
  const [formData, setFormData] = useState({
    name: currentUser?.name || '',
    phone: currentUser?.phone || '',
    email: currentUser?.email || '',
    address: '',
    city: 'Chennai',
    state: 'Tamil Nadu',
    pincode: '600001'
  });
  const [paymentMethod, setPaymentMethod] = useState('upi');
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderInfo, setOrderInfo] = useState(null);

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  const isFreeShipping = subtotal >= 1499;
  const shippingFee = isFreeShipping ? 0 : 150;
  const totalAmount = subtotal + shippingFee;

  // Scroll to top when view changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [step]);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleProceedToPayment = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.address) {
      alert('Please fill in all required shipping fields.');
      return;
    }
    setStep(2);
  };

  // Grand celebration animation
  const triggerGrandCelebration = () => {
    const duration = 3.5 * 1000;
    const animationEnd = Date.now() + duration;
    const colors = ['#D1DDC2', '#98B195', '#5E715F', '#C6A25C', '#FAFBF5'];

    const frame = () => {
      confetti({
        particleCount: 5,
        angle: 60,
        spread: 60,
        origin: { x: 0, y: 0.7 },
        colors: colors
      });
      confetti({
        particleCount: 5,
        angle: 120,
        spread: 60,
        origin: { x: 1, y: 0.7 },
        colors: colors
      });

      if (Date.now() < animationEnd) {
        requestAnimationFrame(frame);
      }
    };
    frame();
  };

  const formatCustomerName = (name) => {
    if (!name) return 'Valued Patron';
    return name
      .toLowerCase()
      .split(' ')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  const handleProcessPayment = () => {
    setIsProcessing(true);

    setTimeout(() => {
      setIsProcessing(false);
      const generatedOrderId = `MILA-${Math.floor(100000 + Math.random() * 900000)}`;

      const placedOrder = {
        orderId: generatedOrderId,
        customer: { ...formData, formattedName: formatCustomerName(formData.name) },
        items: [...cart],
        paymentMethod: paymentMethod,
        total: totalAmount,
        date: new Date().toLocaleDateString('en-IN', {
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        })
      };

      setOrderInfo(placedOrder);
      setStep(3);
      triggerGrandCelebration();
      onClearCart();
    }, 1200);
  };

  const handleWhatsAppShare = () => {
    if (!orderInfo) return;
    const itemsText = orderInfo.items
      .map(
        (i) => `• ${i.name} (${i.size}) x ${i.qty} = ₹${(i.price * i.qty).toLocaleString('en-IN')}`
      )
      .join('%0A');

    const message = `*Mila Fashions - New Boutique Order*%0A%0A*Order ID:* %23${orderInfo.orderId}%0A*Name:* ${encodeURIComponent(orderInfo.customer.formattedName || orderInfo.customer.name)}%0A*Phone:* ${orderInfo.customer.phone}%0A*Address:* ${encodeURIComponent(orderInfo.customer.address + ', ' + orderInfo.customer.city + ' - ' + orderInfo.customer.pincode)}%0A%0A*Items:*%0A${itemsText}%0A%0A*Payment Method:* ${orderInfo.paymentMethod.toUpperCase()}%0A*Total Paid:* ₹${orderInfo.total.toLocaleString('en-IN')}%0A%0APlease confirm my order shipment! ✨`;

    window.open(`https://wa.me/919876543210?text=${message}`, '_blank');
  };

  return (
    <div className="checkout-page-container">
      {/* Top Checkout Header */}
      <header className="checkout-top-header">
        <div className="checkout-header-inner">
          <button className="back-to-store-btn" onClick={onBackToStore}>
            <ArrowLeft size={16} />
            <span className="checkout-back-desktop">Return to Boutique</span>
            <span className="checkout-back-mobile">Boutique</span>
          </button>

          <div className="brand-logo" onClick={onBackToStore} style={{ cursor: 'pointer' }}>
            <span className="brand-monogram">M</span>
            <span className="brand-name">MILA FASHIONS</span>
          </div>

          <div className="secure-badge" title="256-Bit Encrypted Bank Grade Gateway">
            <ShieldCheck size={16} color="var(--palette-forest-moss)" />
            <span className="checkout-sec-text">256-Bit Encrypted</span>
          </div>
        </div>
      </header>

      {/* Main Checkout Workspace */}
      <div className="checkout-body-wrapper">
        {step < 3 ? (
          <>
            {/* Stepper Tabs Bar - Aligned across checkout top */}
            <div className="checkout-steps-pill-bar">
              <div className={`step-pill ${step === 1 ? 'active' : ''} ${step > 1 ? 'completed' : ''}`}>
                <span className="num">1</span>
                <span>Delivery Address</span>
              </div>
              <div className="step-pill-divider" />
              <div className={`step-pill ${step === 2 ? 'active' : ''}`}>
                <span className="num">2</span>
                <span>Payment Gateway</span>
              </div>
            </div>

            <div className="checkout-grid-2col">
              {/* Left Column: Form & Payment Steps */}
              <div className="checkout-left-col">
                {/* STEP 1: Address Form */}
                {step === 1 && (
                  <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                    className="checkout-card-section"
                  >
                  <h2 className="step-title">Where should we deliver your order?</h2>
                  <p className="step-desc">Enter your shipping details for insured express delivery.</p>

                  <form onSubmit={handleProceedToPayment}>
                    <div className="form-row">
                      <div className="form-group">
                        <label>Full Name *</label>
                        <input
                          type="text"
                          name="name"
                          required
                          placeholder="e.g. Priyadharshini Raman"
                          value={formData.name}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div className="form-group">
                        <label>Mobile Number (For WhatsApp Updates) *</label>
                        <input
                          type="tel"
                          name="phone"
                          required
                          placeholder="9876543210"
                          pattern="[0-9]{10}"
                          value={formData.phone}
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>

                    <div className="form-group">
                      <label>Email Address (For Tax Invoice) *</label>
                      <input
                        type="email"
                        name="email"
                        required
                        placeholder="priya@example.com"
                        value={formData.email}
                        onChange={handleInputChange}
                      />
                    </div>

                    <div className="form-group">
                      <label>Street Address & Flat / House No. *</label>
                      <input
                        type="text"
                        name="address"
                        required
                        placeholder="e.g. 42B, Rose Villa, 2nd Main Road"
                        value={formData.address}
                        onChange={handleInputChange}
                      />
                    </div>

                    <div className="form-row">
                      <div className="form-group">
                        <label>City *</label>
                        <input
                          type="text"
                          name="city"
                          required
                          value={formData.city}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div className="form-group">
                        <label>State *</label>
                        <select name="state" value={formData.state} onChange={handleInputChange}>
                          <option value="Tamil Nadu">Tamil Nadu</option>
                          <option value="Karnataka">Karnataka</option>
                          <option value="Kerala">Kerala</option>
                          <option value="Andhra Pradesh">Andhra Pradesh</option>
                          <option value="Telangana">Telangana</option>
                          <option value="Maharashtra">Maharashtra</option>
                          <option value="Delhi">Delhi</option>
                        </select>
                      </div>
                      <div className="form-group">
                        <label>Pincode *</label>
                        <input
                          type="text"
                          name="pincode"
                          required
                          pattern="[0-9]{6}"
                          value={formData.pincode}
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>

                    <div style={{ marginTop: 'auto', paddingTop: '28px', display: 'flex', justifyContent: 'flex-end' }}>
                      <button type="submit" className="btn btn-primary btn-luxe-submit">
                        PROCEED TO PAYMENT <ArrowRight size={16} />
                      </button>
                    </div>
                  </form>
                </motion.div>
              )}

              {/* STEP 2: Realistic Payment Methods */}
              {step === 2 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="checkout-card-section"
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px' }}>
                    <div>
                      <h2 className="step-title">Choose Payment Method</h2>
                      <p className="step-desc">100% Secure Encrypted Bank Gateway</p>
                    </div>
                    <button className="btn-link" onClick={() => setStep(1)}>
                      Edit Address
                    </button>
                  </div>

                  <div className="payment-method-selector">
                    <label
                      className={`payment-option ${paymentMethod === 'upi' ? 'selected' : ''}`}
                      onClick={() => setPaymentMethod('upi')}
                    >
                      <input
                        type="radio"
                        name="payMethod"
                        checked={paymentMethod === 'upi'}
                        onChange={() => setPaymentMethod('upi')}
                      />
                      <div className="option-info">
                        <div className="option-title">
                          <QrCode size={18} color="var(--palette-forest-moss)" />
                          <strong>Instant UPI (Google Pay / PhonePe / Paytm / CRED)</strong>
                          <span className="badge-fast">Fastest</span>
                        </div>
                        <p>Scan dynamic store QR or enter UPI VPA</p>
                      </div>
                    </label>

                    <label
                      className={`payment-option ${paymentMethod === 'card' ? 'selected' : ''}`}
                      onClick={() => setPaymentMethod('card')}
                    >
                      <input
                        type="radio"
                        name="payMethod"
                        checked={paymentMethod === 'card'}
                        onChange={() => setPaymentMethod('card')}
                      />
                      <div className="option-info">
                        <div className="option-title">
                          <CreditCard size={18} />
                          <strong>Credit / Debit Card</strong>
                        </div>
                        <p>Visa, MasterCard, RuPay, American Express</p>
                      </div>
                    </label>

                    <label
                      className={`payment-option ${paymentMethod === 'netbanking' ? 'selected' : ''}`}
                      onClick={() => setPaymentMethod('netbanking')}
                    >
                      <input
                        type="radio"
                        name="payMethod"
                        checked={paymentMethod === 'netbanking'}
                        onChange={() => setPaymentMethod('netbanking')}
                      />
                      <div className="option-info">
                        <div className="option-title">
                          <Building2 size={18} />
                          <strong>Net Banking</strong>
                        </div>
                        <p>HDFC, ICICI, SBI, Axis, Kotak & 40+ banks</p>
                      </div>
                    </label>

                    <label
                      className={`payment-option ${paymentMethod === 'cod' ? 'selected' : ''}`}
                      onClick={() => setPaymentMethod('cod')}
                    >
                      <input
                        type="radio"
                        name="payMethod"
                        checked={paymentMethod === 'cod'}
                        onChange={() => setPaymentMethod('cod')}
                      />
                      <div className="option-info">
                        <div className="option-title">
                          <Banknote size={18} />
                          <strong>Cash on Delivery (COD)</strong>
                        </div>
                        <p>Pay cash or scan QR when package arrives</p>
                      </div>
                    </label>
                  </div>

                  {/* Payment Details Container */}
                  <div className="payment-details-box" style={{ margin: '24px 0' }}>
                    {paymentMethod === 'upi' && (
                      <div className="upi-box">
                        <div className="qr-mockup">
                          <QrCode size={110} color="var(--palette-forest-dark)" />
                          <span className="qr-text">Scan with Google Pay, PhonePe, or Paytm</span>
                        </div>
                        <div className="upi-id-row">
                          Official Store UPI ID: <strong>milafashions@icici</strong>
                        </div>
                      </div>
                    )}

                    {paymentMethod === 'card' && (
                      <div style={{ maxWidth: '420px', margin: '0 auto', textAlign: 'left' }}>
                        <div className="form-group">
                          <label>Card Number</label>
                          <input type="text" placeholder="4111 •••• •••• 1234" maxLength="19" defaultValue="4111 2345 6789 1024" />
                        </div>
                        <div className="form-row">
                          <div className="form-group">
                            <label>Expiry Date</label>
                            <input type="text" placeholder="12/28" defaultValue="08/28" />
                          </div>
                          <div className="form-group">
                            <label>CVV</label>
                            <input type="password" placeholder="•••" defaultValue="874" />
                          </div>
                        </div>
                      </div>
                    )}

                    {paymentMethod === 'netbanking' && (
                      <div style={{ maxWidth: '420px', margin: '0 auto', textAlign: 'left' }}>
                        <label style={{ fontSize: '0.85rem', fontWeight: 600, display: 'block', marginBottom: '8px' }}>
                          Select Your Bank:
                        </label>
                        <select style={{ width: '100%', padding: '12px', borderRadius: '6px', border: '1px solid var(--border-light)' }}>
                          <option>HDFC Bank</option>
                          <option>ICICI Bank</option>
                          <option>State Bank of India (SBI)</option>
                          <option>Axis Bank</option>
                          <option>Kotak Mahindra Bank</option>
                        </select>
                      </div>
                    )}

                    {paymentMethod === 'cod' && (
                      <div style={{ padding: '12px', textAlign: 'center' }}>
                        <Banknote size={42} color="var(--palette-forest-moss)" style={{ margin: '0 auto 10px' }} />
                        <h4 style={{ color: 'var(--palette-forest-dark)', marginBottom: '4px' }}>
                          Doorstep Cash / QR Payment on Delivery
                        </h4>
                        <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                          Complimentary order confirmation call will be made prior to atelier dispatch.
                        </p>
                      </div>
                    )}
                  </div>

                  <div className="payment-action-buttons">
                    <button
                      type="button"
                      className="btn btn-outline"
                      style={{ color: 'var(--palette-forest-dark)', borderColor: 'var(--border-forest)' }}
                      onClick={() => setStep(1)}
                    >
                      <ArrowLeft size={16} /> Back
                    </button>

                    <button
                      type="button"
                      className="btn btn-primary btn-luxe-submit"
                      onClick={handleProcessPayment}
                      disabled={isProcessing}
                    >
                      {isProcessing ? (
                        <>
                          <Loader2 size={16} className="animate-spin" /> Verifying Payment...
                        </>
                      ) : (
                        <>AUTHORIZE & PAY ₹{totalAmount.toLocaleString('en-IN')}</>
                      )}
                    </button>
                  </div>
                </motion.div>
              )}
            </div>

            {/* Right Column: Sticky Order Summary */}
            <div className="checkout-right-col">
              <div className="checkout-summary-card">
                <h3 className="summary-title">Order Summary ({cart.length} items)</h3>

                <div className="checkout-items-scroll">
                  {cart.map((item) => (
                    <div className="checkout-item-row" key={`${item.id}-${item.size}`}>
                      <img src={item.image} alt={item.name} className="checkout-item-img" />
                      <div className="checkout-item-details">
                        <h4>{item.name}</h4>
                        <span className="size">Size: {item.size} • Qty: {item.qty}</span>
                        <strong className="price">₹{(item.price * item.qty).toLocaleString('en-IN')}</strong>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="summary-pricing-rows">
                  <div className="price-row">
                    <span>Subtotal</span>
                    <span>₹{subtotal.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="price-row">
                    <span>Shipping</span>
                    <span>
                      {isFreeShipping ? (
                        <strong style={{ color: 'var(--palette-forest-moss)' }}>COMPLIMENTARY FREE</strong>
                      ) : (
                        '₹150'
                      )}
                    </span>
                  </div>
                  <div className="price-row total-row">
                    <span>Total Amount</span>
                    <span>₹{totalAmount.toLocaleString('en-IN')}</span>
                  </div>
                </div>

                <div className="summary-perks">
                  <div className="perk-bullet">
                    <Truck size={16} color="var(--palette-forest-moss)" />
                    <span>Express Dispatch within 24 Hours</span>
                  </div>
                  <div className="perk-bullet">
                    <ShieldCheck size={16} color="var(--palette-forest-moss)" />
                    <span>Insured Transit & Tamper-Proof Box</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
          /* STEP 3: HAUTE COUTURE LUXURY CELEBRATION SCREEN */
          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="celebration-screen-container"
          >
            <div className="celebration-card-luxury">
              {/* Inner Decorative Watermark Border */}
              <div className="celebration-inner-border">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 220, damping: 14, delay: 0.2 }}
                  className="celebration-seal-ring"
                >
                  <CheckCircle2 size={46} color="var(--palette-forest-dark)" />
                </motion.div>

                <div className="celebration-badge-pill">
                  <Sparkles size={13} />
                  <span>BESPOKE ORDER CONFIRMED</span>
                </div>

                <h1 className="celebration-heading-luxury">
                  Celebrations, {orderInfo?.customer.formattedName || orderInfo?.customer.name}!
                </h1>
                <p className="celebration-subtext-luxury">
                  Your bespoke creation has been placed and forwarded to our atelier for final artisan inspection & signature gift packaging.
                </p>

                {/* Receipt Card */}
                <div className="celebration-receipt-box">
                  <div className="receipt-row">
                    <span>Order Identifier:</span>
                    <strong className="receipt-highlight">#{orderInfo?.orderId}</strong>
                  </div>
                  <div className="receipt-row">
                    <span>Payment Status:</span>
                    <strong>{orderInfo?.paymentMethod.toUpperCase()} (Confirmed)</strong>
                  </div>
                  <div className="receipt-row">
                    <span>Delivery Address:</span>
                    <span>{orderInfo?.customer.address}, {orderInfo?.customer.city} - {orderInfo?.customer.pincode}</span>
                  </div>
                  <div className="receipt-row total-highlight">
                    <span>Total Amount Paid:</span>
                    <strong className="receipt-amount">₹{orderInfo?.total.toLocaleString('en-IN')}</strong>
                  </div>
                </div>

                {/* REFINED HAUTE COUTURE BUTTONS (COMPACT, BALANCED & ELEGANT) */}
                <div className="celebration-actions-refined">
                  {/* Primary Centerpiece Action */}
                  <button className="btn-luxe-primary-whatsapp" onClick={handleWhatsAppShare}>
                    <div className="btn-icon-bubble">
                      <MessageCircle size={17} />
                    </div>
                    <span>Share Order via WhatsApp</span>
                  </button>

                  {/* Secondary Side-by-Side Dual Action Row */}
                  <div className="celebration-secondary-action-row">
                    <button className="btn-luxe-secondary-pill" onClick={() => window.print()}>
                      <Printer size={15} />
                      <span>Print Tax Invoice</span>
                    </button>

                    <button className="btn-luxe-secondary-pill dark" onClick={onBackToStore}>
                      <ShoppingBag size={15} />
                      <span>Continue Shopping</span>
                    </button>
                  </div>
                </div>

              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
