import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PRODUCTS } from './data/products';
import Header from './components/Header';
import Hero from './components/Hero';
import MarqueeStream from './components/MarqueeStream';
import Perks from './components/Perks';
import ProductCard from './components/ProductCard';
import ProductModal from './components/ProductModal';
import SizeGuideModal from './components/SizeGuideModal';
import CartDrawer from './components/CartDrawer';
import CheckoutPage from './components/CheckoutPage';
import AuthPage from './components/AuthPage';
import AuthWelcomeModal from './components/AuthWelcomeModal';
import AboutSection from './components/AboutSection';
import ReviewsSection from './components/ReviewsSection';
import Footer from './components/Footer';
import MobileBottomNav from './components/MobileBottomNav';
import { Search } from 'lucide-react';

export default function App() {
  // Navigation view: 'home' | 'auth' | 'checkout'
  const [currentView, setCurrentView] = useState('home');
  const [authRedirectTarget, setAuthRedirectTarget] = useState('checkout');

  // Patron Auth State
  const [currentUser, setCurrentUser] = useState(() => {
    try {
      const saved = localStorage.getItem('mila_patron_user');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  // Cart & Wishlist persistence
  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem('mila_react_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [wishlist, setWishlist] = useState(() => {
    try {
      const saved = localStorage.getItem('mila_react_wishlist');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [toasts, setToasts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('featured');
  const [searchQuery, setSearchQuery] = useState('');

  // Modals
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  // Sync localStorage
  useEffect(() => {
    try {
      localStorage.setItem('mila_react_cart', JSON.stringify(cart));
    } catch (e) {
      console.error(e);
    }
  }, [cart]);

  useEffect(() => {
    try {
      localStorage.setItem('mila_react_wishlist', JSON.stringify(wishlist));
    } catch (e) {
      console.error(e);
    }
  }, [wishlist]);

  useEffect(() => {
    try {
      if (currentUser) {
        localStorage.setItem('mila_patron_user', JSON.stringify(currentUser));
      } else {
        localStorage.removeItem('mila_patron_user');
      }
    } catch (e) {
      console.error(e);
    }
  }, [currentUser]);

  // Toast helper
  const showToast = (message) => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3400);
  };

  // Welcome Perks Modal State
  const [welcomeModal, setWelcomeModal] = useState({
    isOpen: false,
    type: 'login', // 'signup' | 'login'
    userName: '',
    targetView: 'cart'
  });

  // Auth Success Handler
  const handleAuthSuccess = (user, targetView = 'cart', isSignup = false) => {
    setCurrentUser(user);
    setWelcomeModal({
      isOpen: true,
      type: isSignup ? 'signup' : 'login',
      userName: user.name,
      targetView: targetView
    });
  };

  const handleProceedFromWelcomeModal = () => {
    const target = welcomeModal.targetView || 'cart';
    setWelcomeModal((prev) => ({ ...prev, isOpen: false }));

    if (target === 'cart') {
      setCurrentView('home');
      setIsCartOpen(true);
      showToast(`Welcome to Mila Fashions, ${welcomeModal.userName}! Your bag is ready.`);
    } else if (target === 'checkout') {
      setCurrentView('checkout');
      showToast(`Welcome, ${welcomeModal.userName}! Proceeding to payment.`);
    } else {
      setCurrentView('home');
      showToast(`Welcome back, ${welcomeModal.userName}!`);
    }
  };

  const handleLogout = () => {
    setCurrentUser(null);
    showToast('Signed out of your patron account.');
  };

  // Direct Order Now trigger (prompts Login if unauthenticated, then takes to Cart -> Payment)
  const handleOrderNow = (product, size) => {
    const selectedSize = size || product.sizes[0];
    setCart((prev) => {
      const existingIndex = prev.findIndex(
        (item) => item.id === product.id && item.size === selectedSize
      );
      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex].qty += 1;
        return updated;
      } else {
        return [
          ...prev,
          {
            id: product.id,
            name: product.name,
            price: product.price,
            size: selectedSize,
            image: product.image,
            qty: 1
          }
        ];
      }
    });

    if (!currentUser) {
      setAuthRedirectTarget('cart');
      setCurrentView('auth');
      showToast(`Selected "${product.name}". Please sign in or register to complete your order.`);
    } else {
      setIsCartOpen(true);
      showToast(`Added "${product.name}" to Bag.`);
    }
  };

  // Cart operations
  const handleAddToCart = (product, size, qty = 1) => {
    setCart((prev) => {
      const existingIndex = prev.findIndex(
        (item) => item.id === product.id && item.size === size
      );
      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex].qty += qty;
        return updated;
      } else {
        return [
          ...prev,
          {
            id: product.id,
            name: product.name,
            price: product.price,
            size: size || product.sizes[0],
            image: product.image,
            qty: qty
          }
        ];
      }
    });

    setIsCartOpen(true);
    showToast(`Added "${product.name}" (${size || product.sizes[0]}) to Bag.`);
  };

  const handleUpdateQty = (productId, size, delta) => {
    setCart((prev) => {
      return prev
        .map((item) => {
          if (item.id === productId && item.size === size) {
            return { ...item, qty: item.qty + delta };
          }
          return item;
        })
        .filter((item) => item.qty > 0);
    });
  };

  const handleRemoveItem = (productId, size) => {
    setCart((prev) => prev.filter((item) => !(item.id === productId && item.size === size)));
    showToast('Piece removed from your bag.');
  };

  const handleClearCart = () => {
    setCart([]);
  };

  // Wishlist operations
  const handleToggleWishlist = (productId) => {
    setWishlist((prev) => {
      if (prev.includes(productId)) {
        showToast('Piece removed from wishlist.');
        return prev.filter((id) => id !== productId);
      } else {
        showToast('Piece saved to your wishlist!');
        return [...prev, productId];
      }
    });
  };

  // Filtered & Sorted products list
  const filteredProducts = PRODUCTS.filter((product) => {
    if (selectedCategory !== 'all' && product.category.toLowerCase() !== selectedCategory.toLowerCase()) {
      return false;
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        product.name.toLowerCase().includes(q) ||
        product.category.toLowerCase().includes(q) ||
        product.description.toLowerCase().includes(q)
      );
    }
    return true;
  }).sort((a, b) => {
    if (sortBy === 'price-low') return a.price - b.price;
    if (sortBy === 'price-high') return b.price - a.price;
    if (sortBy === 'rating') return b.rating - a.rating;
    return a.id - b.id; // Featured
  });

  const cartTotalItems = cart.reduce((sum, item) => sum + item.qty, 0);

  // 1. DEDICATED AUTH / LOGIN VIEW
  if (currentView === 'auth') {
    return (
      <div className="mila-fashions-app fullwidth-layout">
        <AuthPage
          onAuthSuccess={handleAuthSuccess}
          onBackToStore={() => setCurrentView('home')}
          targetView={authRedirectTarget}
          cart={cart}
        />
        {/* Patron Welcome Perks Modal */}
        <AuthWelcomeModal
          isOpen={welcomeModal.isOpen}
          type={welcomeModal.type}
          userName={welcomeModal.userName}
          onClose={() => setWelcomeModal((prev) => ({ ...prev, isOpen: false }))}
          onProceed={handleProceedFromWelcomeModal}
        />
        {/* Toast Notifications */}
        <div className="toast-container">
          {toasts.map((toast) => (
            <div key={toast.id} className="toast">
              <span>{toast.message}</span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // 2. DEDICATED FULL-PAGE CHECKOUT VIEW
  if (currentView === 'checkout') {
    return (
      <div className="mila-fashions-app fullwidth-layout">
        <CheckoutPage
          cart={cart}
          currentUser={currentUser}
          onClearCart={handleClearCart}
          onBackToStore={() => setCurrentView('home')}
        />
        {/* Toast Notifications */}
        <div className="toast-container">
          {toasts.map((toast) => (
            <div key={toast.id} className="toast">
              <span>{toast.message}</span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // 3. MAIN STORE VIEW
  return (
    <div className="mila-fashions-app fullwidth-layout">
      {/* Luxury Full-Width Header with User Account integration */}
      <Header
        cartCount={cartTotalItems}
        wishlistCount={wishlist.length}
        currentUser={currentUser}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenAuth={() => {
          setAuthRedirectTarget('home');
          setCurrentView('auth');
        }}
        onLogout={handleLogout}
        onOpenWishlist={() => {
          if (wishlist.length === 0) {
            showToast('Your wishlist is empty. Tap the heart icon on any piece!');
          } else {
            showToast(`You have ${wishlist.length} items in your wishlist.`);
          }
        }}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      {/* Cinematic Full-Width Parallax Hero */}
      <Hero />

      {/* Full-Width Infinite Marquee Stream */}
      <MarqueeStream />

      {/* Brand Perks Strip (Streaming entrance) */}
      <Perks />

      {/* Main Catalog Section with Streaming Animation */}
      <main className="catalog-section fullwidth-section" id="collections">
        <div className="fullwidth-inner">
          <motion.div
            className="section-header"
            initial={{ opacity: 0, y: 35 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="section-tag">THE MASTER CAPSULE</span>
            <h2 className="section-title">The Signature Creations</h2>
            <p className="section-subtitle">
              Individually crafted by master karigars in limited quantities. Select pieces to view fit and instant checkout.
            </p>
          </motion.div>

          {/* Controls Bar: Category tabs & Sort (Streaming in) */}
          <motion.div
            className="controls-bar"
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-30px" }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="category-tabs">
              {[
                { label: 'All Creations', value: 'all' },
                { label: 'Sarees', value: 'Sarees' },
                { label: 'Kurtis & Sets', value: 'Kurtis' },
                { label: 'Lehengas', value: 'Lehengas' },
                { label: 'Indo-Western', value: 'Western' }
              ].map((cat) => (
                <button
                  key={cat.value}
                  className={`cat-tab ${selectedCategory === cat.value ? 'active' : ''}`}
                  onClick={() => setSelectedCategory(cat.value)}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            <div className="sort-wrapper">
              <label htmlFor="sortSelect">Sort By:</label>
              <select
                id="sortSelect"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="featured">Featured First</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Top Customer Rated</option>
              </select>
            </div>
          </motion.div>

          {/* Streaming Products Grid (Animated one by one on scroll) */}
          {filteredProducts.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '60px 20px' }}>
              <Search size={36} color="var(--palette-forest-moss)" style={{ margin: '0 auto 12px' }} />
              <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.4rem' }}>
                No pieces found for "{searchQuery}"
              </h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: '6px' }}>
                Try searching for "Silk", "Saree", "Kurti", or "Lehenga".
              </p>
            </div>
          ) : (
            <div className="products-grid fullwidth-grid">
              {filteredProducts.map((product, index) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  index={index}
                  isWishlisted={wishlist.includes(product.id)}
                  onToggleWishlist={handleToggleWishlist}
                  onOpenQuickView={(p) => setSelectedProduct(p)}
                  onAddToCart={handleAddToCart}
                  onOrderNow={handleOrderNow}
                />
              ))}
            </div>
          )}
        </div>
      </main>

      {/* Atelier Heritage Section */}
      <AboutSection />

      {/* Customer Testimonials */}
      <ReviewsSection />

      {/* Luxury Footer */}
      <Footer onOpenSizeGuide={() => setIsSizeGuideOpen(true)} />

      {/* Mobile Floating Bottom Bar */}
      <MobileBottomNav
        cartCount={cartTotalItems}
        wishlistCount={wishlist.length}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenWishlist={() => {
          if (wishlist.length === 0) {
            showToast('Your wishlist is empty. Tap the heart icon on any piece!');
          } else {
            showToast(`You have ${wishlist.length} items in your wishlist.`);
          }
        }}
      />

      {/* Quick View Modal */}
      <ProductModal
        product={selectedProduct}
        isOpen={!!selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={handleAddToCart}
        onOrderNow={handleOrderNow}
        onOpenSizeGuide={() => setIsSizeGuideOpen(true)}
        isWishlisted={selectedProduct ? wishlist.includes(selectedProduct.id) : false}
        onToggleWishlist={handleToggleWishlist}
      />

      {/* Size Guide Modal */}
      <SizeGuideModal
        isOpen={isSizeGuideOpen}
        onClose={() => setIsSizeGuideOpen(false)}
      />

      {/* Slide-out Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        onUpdateQty={handleUpdateQty}
        onRemoveItem={handleRemoveItem}
        onProceedCheckout={() => {
          setIsCartOpen(false);
          if (!currentUser) {
            // Prompt Login / Sign Up first!
            setAuthRedirectTarget('checkout');
            setCurrentView('auth');
            showToast('Please sign in or create an account to proceed with your order.');
          } else {
            // Already authenticated -> Direct to Checkout
            setCurrentView('checkout');
          }
        }}
      />

      {/* Patron Welcome Perks Modal */}
      <AuthWelcomeModal
        isOpen={welcomeModal.isOpen}
        type={welcomeModal.type}
        userName={welcomeModal.userName}
        onClose={() => setWelcomeModal((prev) => ({ ...prev, isOpen: false }))}
        onProceed={handleProceedFromWelcomeModal}
      />

      {/* Toast Notifications */}
      <div className="toast-container">
        {toasts.map((toast) => (
          <div key={toast.id} className="toast">
            <span>{toast.message}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
