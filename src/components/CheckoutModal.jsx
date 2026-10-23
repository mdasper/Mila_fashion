import React, { useState } from 'react';
import { X, ArrowRight, ArrowLeft, QrCode, CreditCard, Building2, Banknote, CheckCircle, Printer, MessageCircle, ShieldCheck, Loader2 } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function CheckoutModal({
  isOpen,
  onClose,
  cart,
  onClearCart
}) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
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

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleProceedToPayment = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.address) {
      alert('Please fill out all required fields.');
      return;
    }
    setStep(2);
  };

  const handleProcessPayment = () => {
    setIsProcessing(true);

    setTimeout(() => {
      setIsProcessing(false);
      const generatedOrderId = `MILA-${Math.floor(100000 + Math.random() * 900000)}`;

      const placedOrder = {
        orderId: generatedOrderId,
        customer: { ...formData },
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

      // Trigger celebration confetti
      try {
        confetti({
          particleCount: 120,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#D1DDC2', '#98B195', '#5E715F', '#C6A25C']
        });
      } catch (err) {
        // fallback
      }

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

    const message = `*Mila Fashions - New Website Order*%0A%0A*Order ID:* %23${orderInfo.orderId}%0A*Name:* ${encodeURIComponent(orderInfo.customer.name)}%0A*Phone:* ${orderInfo.customer.phone}%0A*Address:* ${encodeURIComponent(orderInfo.customer.address + ', ' + orderInfo.customer.city + ' - ' + orderInfo.customer.pincode)}%0A%0A*Items:*%0A${itemsText}%0A%0A*Payment Method:* ${orderInfo.paymentMethod.toUpperCase()}%0A*Total Paid:* ₹${orderInfo.total.toLocaleString('en-IN')}%0A%0APlease confirm my order shipment! ✨`;

    window.open(`https://wa.me/919876543210?text=${message}`, '_blank');
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay active" onClick={(e) => {
      if (e.target === e.currentTarget && step !== 2) onClose();
    }}>
      <div className="checkout-modal">
        <button className="modal-close" onClick={onClose} aria-label="Close modal">
          <X size={18} />
        </button>

        {/* Step Indicator Header */}
        <div className="checkout-steps">
          <div className={`step-indicator ${step >= 1 ? 'active' : ''}`}>
            <span className="step-num">1</span>
            <span>Shipping</span>
          </div>
          <div className="step-line" />
          <div className={`step-indicator ${step >= 2 ? 'active' : ''}`}>
            <span className="step-num">2</span>
            <span>Payment</span>
          </div>
          <div className="step-line" />
          <div className={`step-indicator ${step >= 3 ? 'active' : ''}`}>
            <span className="step-num">3</span>
            <span>Confirmation</span>
          </div>
        </div>

        {/* STEP 1: Shipping Details */}
        {step === 1 && (
          <div>
            <h3 className="checkout-heading">Delivery Address</h3>
            <p className="checkout-subheading">Enter your shipping details for insured express delivery</p>

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

              <div className="order-mini-summary">
                <span>Total Payable ({cart.length} items):</span>
                <strong>₹{totalAmount.toLocaleString('en-IN')}</strong>
              </div>

              <button type="submit" className="btn btn-primary btn-block">
                CONTINUE TO PAYMENT <ArrowRight size={16} />
              </button>
            </form>
          </div>
        )}

        {/* STEP 2: Realistic Payment Gateway */}
        {step === 2 && (
          <div>
            <h3 className="checkout-heading">Select Payment Method</h3>
            <p className="checkout-subheading">100% Encrypted Bank Gateway</p>

            <div className="payment-method-selector">
              <label
                className={`payment-option ${paymentMethod === 'upi' ? 'selected' : ''}`}
                onClick={() => setPaymentMethod('upi')}
              >
                <input
                  type="radio"
                  name="payOption"
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
                  name="payOption"
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
                  name="payOption"
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
                  name="payOption"
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

            {/* Dynamic Payment Method Box */}
            <div className="payment-details-box">
              {paymentMethod === 'upi' && (
                <div className="upi-box">
                  <div className="qr-mockup">
                    <QrCode size={90} color="var(--palette-forest-dark)" />
                    <span className="qr-text">Scan with any UPI App</span>
                  </div>
                  <div className="upi-id-row">
                    Official Store VPA: <strong>milafashions@icici</strong>
                  </div>
                </div>
              )}

              {paymentMethod === 'card' && (
                <div style={{ maxWidth: '400px', margin: '0 auto', textAlign: 'left' }}>
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
                <div style={{ maxWidth: '400px', margin: '0 auto', textAlign: 'left' }}>
                  <label style={{ fontSize: '0.8rem', fontWeight: 600, display: 'block', marginBottom: '8px' }}>
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
                <div style={{ padding: '8px' }}>
                  <Banknote size={36} color="var(--palette-forest-moss)" style={{ margin: '0 auto 8px' }} />
                  <p style={{ fontWeight: 600, color: 'var(--palette-forest-dark)' }}>
                    Doorstep Cash / QR Payment on Delivery
                  </p>
                  <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '4px' }}>
                    Complimentary verification call will be made prior to dispatch.
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
                className="btn btn-primary"
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
          </div>
        )}

        {/* STEP 3: Order Confirmation & Invoice */}
        {step === 3 && orderInfo && (
          <div className="order-success-card">
            <div className="success-checkmark">
              <CheckCircle size={38} />
            </div>
            <span className="success-badge">ORDER CONFIRMED</span>
            <h2>Thank You, {orderInfo.customer.name}!</h2>
            <p className="success-text">
              Your bespoke Mila Fashions order has been confirmed and forwarded to our master karigars for packing.
            </p>

            <div className="order-receipt-box">
              <div className="receipt-row">
                <span>Order ID:</span>
                <strong>#{orderInfo.orderId}</strong>
              </div>
              <div className="receipt-row">
                <span>Payment Mode:</span>
                <strong>{orderInfo.paymentMethod.toUpperCase()} Prepaid</strong>
              </div>
              <div className="receipt-row">
                <span>Shipping Address:</span>
                <span>
                  {orderInfo.customer.address}, {orderInfo.customer.city} - {orderInfo.customer.pincode}
                </span>
              </div>
              <div className="receipt-row total-highlight">
                <span>Total Paid:</span>
                <strong>₹{orderInfo.total.toLocaleString('en-IN')}</strong>
              </div>
            </div>

            <div className="success-actions">
              <button className="btn btn-whatsapp" onClick={handleWhatsAppShare}>
                <MessageCircle size={18} /> Send Order Details to Mila Fashions on WhatsApp
              </button>
              <button
                className="btn btn-outline"
                style={{ color: 'var(--palette-forest-dark)', borderColor: 'var(--palette-forest-dark)' }}
                onClick={() => window.print()}
              >
                <Printer size={16} /> Print Tax Invoice
              </button>
              <button
                className="btn btn-secondary"
                onClick={() => {
                  onClose();
                  setStep(1);
                }}
              >
                Continue Shopping
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
