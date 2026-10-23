/**
 * MILA FASHIONS - LUXURY E-COMMERCE ENGINE
 * 10 Handcrafted Signature Products, Cart Drawer, Realistic Payment Gateway,
 * Wishlist, Size Guide & WhatsApp Order Integration.
 */

// ================= 1. THE 10 SIGNATURE PRODUCTS =================
const PRODUCTS = [
  {
    id: 1,
    name: "Royal Kanjivaram Pure Silk Saree",
    category: "Sarees",
    price: 12499,
    originalPrice: 15999,
    discount: "22% OFF",
    rating: 4.9,
    reviewsCount: 38,
    badge: "Bestseller",
    badgeType: "gold",
    image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?q=80&w=800&auto=format&fit=crop",
    sizes: ["Free Size (6.3m with Blouse)"],
    colors: ["Crimson Red & Antique Gold Zari"],
    description: "Woven by master weavers in Tamil Nadu with authentic pure mulberry silk. Features a regal korvai border with intricate peacock motifs in pure antique gold zari.",
    fabricCare: "100% Pure Kanchipuram Silk. Dry Clean Only. Store wrapped in pure muslin cloth."
  },
  {
    id: 2,
    name: "Banarasi Organza Handloom Saree",
    category: "Sarees",
    price: 7899,
    originalPrice: 9500,
    discount: "17% OFF",
    rating: 4.8,
    reviewsCount: 24,
    badge: "Festive Edit",
    badgeType: "crimson",
    image: "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?q=80&w=800&auto=format&fit=crop",
    sizes: ["Free Size (5.5m + 0.8m Blouse)"],
    colors: ["Blush Rose & Silver Weave"],
    description: "Featherlight translucent organza crafted with delicate meenakari floral jaal. Comes with an unstitched contrast brocade blouse piece.",
    fabricCare: "Pure Sheer Organza Silk. Dry Clean Only. Low iron inside-out."
  },
  {
    id: 3,
    name: "Hand-Embroidered Zardozi Raw Silk Lehenga",
    category: "Lehengas",
    price: 24999,
    originalPrice: 32000,
    discount: "22% OFF",
    rating: 5.0,
    reviewsCount: 19,
    badge: "Haute Couture",
    badgeType: "gold",
    image: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?q=80&w=800&auto=format&fit=crop",
    sizes: ["XS", "S", "M", "L", "XL", "Custom"],
    colors: ["Heritage Emerald Forest Green"],
    description: "Designed for grand celebrations. Embellished with 120+ hours of hand-done dabka, zardozi, and micro-pearl needlework on rich heavy raw silk.",
    fabricCare: "Heavy Raw Silk & Fine Net Dupatta. Strictly Dry Clean."
  },
  {
    id: 4,
    name: "Mirror-Work Pastel Chiffon Anarkali Suit",
    category: "Kurtis",
    price: 6499,
    originalPrice: 8200,
    discount: "21% OFF",
    rating: 4.8,
    reviewsCount: 42,
    badge: "Trending",
    badgeType: "dark",
    image: "https://images.unsplash.com/photo-1609357605129-26f69add5d6e?q=80&w=800&auto=format&fit=crop",
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: ["Champagne Ivory & Mirror Accents"],
    description: "Floor-length 32-kali flared pure chiffon anarkali with real mirror embroidery on yoke and sleeves. Paired with churidar and mukaish dupatta.",
    fabricCare: "Pure Bamberg Chiffon. Hand Wash Cold / Gentle Dry Clean."
  },
  {
    id: 5,
    name: "Brocade Silk Peplum Kurti & Dhoti Set",
    category: "Western",
    price: 5899,
    originalPrice: 7499,
    discount: "21% OFF",
    rating: 4.7,
    reviewsCount: 15,
    badge: "Contemporary",
    badgeType: "dark",
    image: "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?q=80&w=800&auto=format&fit=crop",
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["Midnight Sapphire Blue"],
    description: "Modern fusion at its finest. Structured peplum blazer-cut kurti with Banarasi brocade weave, paired with tulip draped dhoti pants.",
    fabricCare: "Silk Brocade & Satin Blend. Professional Dry Clean."
  },
  {
    id: 6,
    name: "Chanderi Silk Straight Kurta with Organza Dupatta",
    category: "Kurtis",
    price: 4299,
    originalPrice: 5500,
    discount: "22% OFF",
    rating: 4.9,
    reviewsCount: 56,
    badge: "Pure Loom",
    badgeType: "gold",
    image: "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?q=80&w=800&auto=format&fit=crop",
    sizes: ["S", "M", "L", "XL"],
    colors: ["Mustard Ochre & Antique Gota"],
    description: "Handcrafted Chanderi silk straight kurta adorned with delicate gota-patti scallops. Paired with tailored cigarette trousers and hand-painted organza dupatta.",
    fabricCare: "Authentic Handloom Chanderi. Dry Clean Recommended."
  },
  {
    id: 7,
    name: "Draped Pre-Stitched Concept Cocktail Saree",
    category: "Sarees",
    price: 8999,
    originalPrice: 11500,
    discount: "22% OFF",
    rating: 4.8,
    reviewsCount: 29,
    badge: "Ready-to-Wear",
    badgeType: "dark",
    image: "https://images.unsplash.com/photo-1566737236500-c8ac43014a67?q=80&w=800&auto=format&fit=crop",
    sizes: ["XS-S (Waist 26-30)", "M-L (Waist 31-35)", "XL (Waist 36-40)"],
    colors: ["Metallic Obsidian Black & Gunmetal"],
    description: "Zip-and-go glamour for evening galas. Pleats pre-stitched with precision satin lycra drape and sculpted hand-beaded corseted blouse.",
    fabricCare: "Lycra Satin & Metallic Shimmer. Dry Clean Only."
  },
  {
    id: 8,
    name: "Embellished Velvet Crop Top & Cape Jacket Set",
    category: "Western",
    price: 7299,
    originalPrice: 9000,
    discount: "19% OFF",
    rating: 4.9,
    reviewsCount: 18,
    badge: "Limited Stock",
    badgeType: "crimson",
    image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=800&auto=format&fit=crop",
    sizes: ["S", "M", "L", "XL"],
    colors: ["Deep Wine Merlot"],
    description: "Three-piece statement silhouette: micro-velvet crop top with cut-dana work, floor-sweeping sheer cape jacket, and wide-leg palazzos.",
    fabricCare: "Plush Micro-Velvet & Georgette. Dry Clean Only."
  },
  {
    id: 9,
    name: "Lucknowi Chikankari Mukaish Georgette Kurta Set",
    category: "Kurtis",
    price: 5499,
    originalPrice: 6800,
    discount: "19% OFF",
    rating: 5.0,
    reviewsCount: 31,
    badge: "Master Craft",
    badgeType: "gold",
    image: "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?q=80&w=800&auto=format&fit=crop",
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: ["Powder Mint Blue & Silver Dana"],
    description: "Authentic hand-embroidered Bakhiya and Phanda stitches from Lucknow artisans. Decorated with luminous silver mukaish Badla dots.",
    fabricCare: "Pure Viscose Georgette. Gentle Hand Wash / Dry Clean."
  },
  {
    id: 10,
    name: "Hand-Dyed Bandhani Silk Festive Lehenga Set",
    category: "Lehengas",
    price: 18499,
    originalPrice: 22999,
    discount: "20% OFF",
    rating: 4.9,
    reviewsCount: 22,
    badge: "Festive Edit",
    badgeType: "crimson",
    image: "https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=800&auto=format&fit=crop",
    sizes: ["S", "M", "L", "XL", "Custom"],
    colors: ["Sunset Coral Pink & Golden Foil"],
    description: "Crafted in authentic Kutch bandhani tie-dye technique on pure gajji silk with heavy marodi and mirror border. Includes matching blouse and bandhej dupatta.",
    fabricCare: "Pure Gajji Silk. Strictly Dry Clean."
  }
];

// ================= 2. STATE MANAGEMENT =================
let cart = JSON.parse(localStorage.getItem('mila_cart')) || [];
let wishlist = JSON.parse(localStorage.getItem('mila_wishlist')) || [];
let appliedCoupon = null; // e.g. { code: 'MILA10', percent: 10 }
let selectedCategory = 'all';
let currentSort = 'featured';
let searchQuery = '';
let selectedPaymentMethod = 'upi';
let activeQuickViewProduct = null;
let selectedQuickViewSize = null;

// Free Shipping threshold
const FREE_SHIPPING_MIN = 1499;
const STANDARD_SHIPPING_FEE = 150;

// ================= 3. INITIALIZATION =================
document.addEventListener('DOMContentLoaded', () => {
  renderProducts();
  updateCartUI();
  updateWishlistUI();
  setupEventListeners();
});

// ================= 4. EVENT LISTENERS SETUP =================
function setupEventListeners() {
  // Category tabs
  const catTabs = document.querySelectorAll('.cat-tab');
  catTabs.forEach(tab => {
    tab.addEventListener('click', (e) => {
      catTabs.forEach(t => t.classList.remove('active'));
      e.target.classList.add('active');
      selectedCategory = e.target.dataset.category;
      renderProducts();
    });
  });

  // Sorting dropdown
  const sortSelect = document.getElementById('sortSelect');
  if (sortSelect) {
    sortSelect.addEventListener('change', (e) => {
      currentSort = e.target.value;
      renderProducts();
    });
  }

  // Search input
  const searchInput = document.getElementById('searchInput');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      searchQuery = e.target.value.toLowerCase().trim();
      renderProducts();
    });
  }

  // Cart Drawer open/close
  const cartHeaderBtn = document.getElementById('cartHeaderBtn');
  const closeCartBtn = document.getElementById('closeCartBtn');
  const cartOverlay = document.getElementById('cartOverlay');

  if (cartHeaderBtn) cartHeaderBtn.addEventListener('click', openCartDrawer);
  if (closeCartBtn) closeCartBtn.addEventListener('click', closeCartDrawer);
  if (cartOverlay) cartOverlay.addEventListener('click', closeCartDrawer);

  // Quick view close
  const closeQuickViewBtn = document.getElementById('closeQuickViewBtn');
  const quickViewOverlay = document.getElementById('quickViewOverlay');
  if (closeQuickViewBtn) closeQuickViewBtn.addEventListener('click', closeQuickView);
  if (quickViewOverlay) {
    quickViewOverlay.addEventListener('click', (e) => {
      if (e.target === quickViewOverlay) closeQuickView();
    });
  }

  // Size Guide close
  const closeSizeGuideBtn = document.getElementById('closeSizeGuideBtn');
  const sizeGuideOverlay = document.getElementById('sizeGuideOverlay');
  if (closeSizeGuideBtn) closeSizeGuideBtn.addEventListener('click', closeSizeGuideModal);
  if (sizeGuideOverlay) {
    sizeGuideOverlay.addEventListener('click', (e) => {
      if (e.target === sizeGuideOverlay) closeSizeGuideModal();
    });
  }

  // Checkout Modal open/close
  const proceedToCheckoutBtn = document.getElementById('proceedToCheckoutBtn');
  const closeCheckoutBtn = document.getElementById('closeCheckoutBtn');
  const checkoutOverlay = document.getElementById('checkoutOverlay');

  if (proceedToCheckoutBtn) {
    proceedToCheckoutBtn.addEventListener('click', () => {
      if (cart.length === 0) {
        showToast("Your shopping bag is empty!");
        return;
      }
      closeCartDrawer();
      openCheckoutModal();
    });
  }
  if (closeCheckoutBtn) closeCheckoutBtn.addEventListener('click', closeCheckoutModal);

  // Apply Coupon Button
  const applyCouponBtn = document.getElementById('applyCouponBtn');
  if (applyCouponBtn) {
    applyCouponBtn.addEventListener('click', handleApplyCoupon);
  }

  // Close announcement bar
  const closeAnnouncement = document.getElementById('closeAnnouncement');
  const announcementBar = document.getElementById('announcementBar');
  if (closeAnnouncement && announcementBar) {
    closeAnnouncement.addEventListener('click', () => {
      announcementBar.style.display = 'none';
    });
  }

  // Mobile menu toggle
  const mobileMenuToggle = document.getElementById('mobileMenuToggle');
  const navLinks = document.getElementById('navLinks');
  if (mobileMenuToggle && navLinks) {
    mobileMenuToggle.addEventListener('click', () => {
      navLinks.classList.toggle('open');
    });
  }

  // Wishlist icon header action
  const wishlistHeaderBtn = document.getElementById('wishlistHeaderBtn');
  if (wishlistHeaderBtn) {
    wishlistHeaderBtn.addEventListener('click', () => {
      if (wishlist.length === 0) {
        showToast("Your wishlist is currently empty. Tap the heart icon on any piece!");
      } else {
        showToast(`You have saved ${wishlist.length} luxury pieces to your wishlist.`);
      }
    });
  }
}

// ================= 5. RENDER PRODUCTS =================
function renderProducts() {
  const grid = document.getElementById('productsGrid');
  if (!grid) return;

  // Filter by category
  let list = PRODUCTS.filter(p => {
    if (selectedCategory === 'all') return true;
    return p.category.toLowerCase() === selectedCategory.toLowerCase();
  });

  // Filter by search
  if (searchQuery) {
    list = list.filter(p => 
      p.name.toLowerCase().includes(searchQuery) ||
      p.category.toLowerCase().includes(searchQuery) ||
      p.description.toLowerCase().includes(searchQuery)
    );
  }

  // Sort
  if (currentSort === 'price-low') {
    list.sort((a, b) => a.price - b.price);
  } else if (currentSort === 'price-high') {
    list.sort((a, b) => b.price - a.price);
  } else if (currentSort === 'rating') {
    list.sort((a, b) => b.rating - a.rating);
  }

  if (list.length === 0) {
    grid.innerHTML = `
      <div style="grid-column: 1 / -1; text-align: center; padding: 60px 20px;">
        <i class="fa-solid fa-magnifying-glass" style="font-size: 2.5rem; color: #a39e97; margin-bottom: 16px;"></i>
        <h3 style="font-family: var(--font-serif); font-size: 1.4rem;">No pieces found matching "${searchQuery}"</h3>
        <p style="color: #6b6864; font-size: 0.9rem; margin-top: 6px;">Try searching for "Saree", "Kurti", "Silk", or "Lehenga".</p>
      </div>
    `;
    return;
  }

  grid.innerHTML = list.map(product => {
    const isWishlisted = wishlist.includes(product.id);
    const badgeHtml = product.badge ? `<span class="product-badge ${product.badgeType}">${product.badge}</span>` : '';

    return `
      <div class="product-card" data-id="${product.id}">
        <div class="product-thumb-wrap" onclick="openQuickView(${product.id})">
          ${badgeHtml}
          <button class="wishlist-toggle ${isWishlisted ? 'active' : ''}" 
                  onclick="event.stopPropagation(); toggleWishlist(${product.id})" 
                  title="Save to Wishlist">
            <i class="${isWishlisted ? 'fa-solid' : 'fa-regular'} fa-heart"></i>
          </button>
          <img src="${product.image}" alt="${product.name}" class="product-thumb" loading="lazy">
          <div class="thumb-actions">
            <button class="btn-quick-view" onclick="event.stopPropagation(); openQuickView(${product.id})">Quick View</button>
            <button class="btn-quick-add" onclick="event.stopPropagation(); quickAddToCart(${product.id})">+ Add to Bag</button>
          </div>
        </div>

        <div class="product-info">
          <span class="product-cat">${product.category}</span>
          <h3 class="product-name" onclick="openQuickView(${product.id})">${product.name}</h3>
          
          <div class="product-rating">
            <span class="stars">★★★★★</span>
            <span>${product.rating} (${product.reviewsCount})</span>
          </div>

          <div class="sizes-preview">
            ${product.sizes.slice(0, 4).map(s => `<span class="size-pill">${s}</span>`).join('')}
          </div>

          <div class="product-pricing">
            <span class="price-current">₹${product.price.toLocaleString('en-IN')}</span>
            <span class="price-original">₹${product.originalPrice.toLocaleString('en-IN')}</span>
            <span class="discount-badge">${product.discount}</span>
          </div>
        </div>
      </div>
    `;
  }).join('');
}

// ================= 6. CART MANAGEMENT =================
function quickAddToCart(productId) {
  const product = PRODUCTS.find(p => p.id === productId);
  if (!product) return;
  const defaultSize = product.sizes[0];
  addToCart(product, defaultSize, 1);
}

function addToCart(product, size, qty = 1) {
  const existingIndex = cart.findIndex(item => item.id === product.id && item.size === size);
  if (existingIndex > -1) {
    cart[existingIndex].qty += qty;
  } else {
    cart.push({
      id: product.id,
      name: product.name,
      price: product.price,
      size: size,
      image: product.image,
      qty: qty
    });
  }

  saveCart();
  updateCartUI();
  openCartDrawer();
  showToast(`Added "${product.name}" (${size}) to your Bag.`);
}

function updateItemQuantity(index, delta) {
  if (!cart[index]) return;
  cart[index].qty += delta;
  if (cart[index].qty <= 0) {
    cart.splice(index, 1);
  }
  saveCart();
  updateCartUI();
}

function removeFromCart(index) {
  if (!cart[index]) return;
  const removedName = cart[index].name;
  cart.splice(index, 1);
  saveCart();
  updateCartUI();
  showToast(`Removed "${removedName}" from Bag.`);
}

function saveCart() {
  localStorage.setItem('mila_cart', JSON.stringify(cart));
}

function updateCartUI() {
  const cartCount = document.getElementById('cartCount');
  const drawerItemCount = document.getElementById('drawerItemCount');
  const cartItemsList = document.getElementById('cartItemsList');
  const cartSubtotalEl = document.getElementById('cartSubtotal');
  const cartShippingEl = document.getElementById('cartShipping');
  const cartTotalEl = document.getElementById('cartTotal');
  const discountRow = document.getElementById('discountRow');
  const cartDiscountEl = document.getElementById('cartDiscount');
  const shippingProgressBar = document.getElementById('shippingProgressBar');
  const shippingProgressText = document.getElementById('shippingProgressText');

  const totalItems = cart.reduce((sum, item) => sum + item.qty, 0);
  if (cartCount) cartCount.textContent = totalItems;
  if (drawerItemCount) drawerItemCount.textContent = `(${totalItems} ${totalItems === 1 ? 'item' : 'items'})`;

  // Empty state check
  if (cart.length === 0) {
    if (cartItemsList) {
      cartItemsList.innerHTML = `
        <div class="cart-empty-state">
          <i class="fa-solid fa-bag-shopping"></i>
          <h4>Your Bag is Empty</h4>
          <p>Discover our 10 curated pieces crafted for elegance.</p>
          <a href="#collections" class="btn btn-outline" onclick="closeCartDrawer()" style="color: var(--text-main); border-color: var(--text-main);">
            EXPLORE COLLECTIONS
          </a>
        </div>
      `;
    }
    if (cartSubtotalEl) cartSubtotalEl.textContent = '₹0';
    if (cartShippingEl) cartShippingEl.textContent = '₹0';
    if (cartTotalEl) cartTotalEl.textContent = '₹0';
    if (discountRow) discountRow.style.display = 'none';
    if (shippingProgressBar) shippingProgressBar.style.width = '0%';
    if (shippingProgressText) {
      shippingProgressText.innerHTML = `Add <strong>₹${FREE_SHIPPING_MIN.toLocaleString('en-IN')}</strong> to unlock <strong>FREE Express Shipping</strong>!`;
    }
    return;
  }

  // Calculate Subtotal
  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);

  // Calculate Discount
  let discountAmount = 0;
  if (appliedCoupon && appliedCoupon.percent) {
    discountAmount = Math.round(subtotal * (appliedCoupon.percent / 100));
    if (discountRow) {
      discountRow.style.display = 'flex';
      cartDiscountEl.textContent = `-₹${discountAmount.toLocaleString('en-IN')}`;
    }
  } else {
    if (discountRow) discountRow.style.display = 'none';
  }

  // Shipping logic
  let shippingFee = 0;
  if (subtotal >= FREE_SHIPPING_MIN) {
    shippingFee = 0;
    if (cartShippingEl) cartShippingEl.innerHTML = `<span style="color: var(--success); font-weight: 600;">FREE</span>`;
    if (shippingProgressBar) shippingProgressBar.style.width = '100%';
    if (shippingProgressText) {
      shippingProgressText.innerHTML = `🎉 <strong>Congratulations!</strong> You have unlocked Free Express Shipping!`;
    }
  } else {
    shippingFee = STANDARD_SHIPPING_FEE;
    if (cartShippingEl) cartShippingEl.textContent = `₹${shippingFee}`;
    const needed = FREE_SHIPPING_MIN - subtotal;
    const progressPercent = Math.min(100, Math.round((subtotal / FREE_SHIPPING_MIN) * 100));
    if (shippingProgressBar) shippingProgressBar.style.width = `${progressPercent}%`;
    if (shippingProgressText) {
      shippingProgressText.innerHTML = `Add <strong>₹${needed.toLocaleString('en-IN')}</strong> more for <strong>FREE Express Shipping</strong>!`;
    }
  }

  const finalTotal = subtotal - discountAmount + shippingFee;

  if (cartSubtotalEl) cartSubtotalEl.textContent = `₹${subtotal.toLocaleString('en-IN')}`;
  if (cartTotalEl) cartTotalEl.textContent = `₹${finalTotal.toLocaleString('en-IN')}`;

  // Render Items List
  if (cartItemsList) {
    cartItemsList.innerHTML = cart.map((item, idx) => `
      <div class="cart-item">
        <img src="${item.image}" alt="${item.name}" class="cart-item-thumb">
        <div class="cart-item-details">
          <h4 class="cart-item-name">${item.name}</h4>
          <span class="cart-item-meta">Size: <strong>${item.size}</strong></span>
          <span class="cart-item-price">₹${item.price.toLocaleString('en-IN')}</span>
          <div class="cart-item-actions">
            <div class="qty-control">
              <button class="qty-btn" onclick="updateItemQuantity(${idx}, -1)">-</button>
              <span class="qty-val">${item.qty}</span>
              <button class="qty-btn" onclick="updateItemQuantity(${idx}, 1)">+</button>
            </div>
            <button class="remove-item-btn" onclick="removeFromCart(${idx})">Remove</button>
          </div>
        </div>
      </div>
    `).join('');
  }
}

// Drawer animations
function openCartDrawer() {
  const drawer = document.getElementById('cartDrawer');
  const overlay = document.getElementById('cartOverlay');
  if (drawer && overlay) {
    drawer.classList.add('active');
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
}

function closeCartDrawer() {
  const drawer = document.getElementById('cartDrawer');
  const overlay = document.getElementById('cartOverlay');
  if (drawer && overlay) {
    drawer.classList.remove('active');
    overlay.classList.remove('active');
    document.body.style.overflow = '';
  }
}

// ================= 7. PROMO CODE ENGINE =================
function handleApplyCoupon() {
  const input = document.getElementById('couponCodeInput');
  const msg = document.getElementById('couponMessage');
  if (!input || !msg) return;

  const code = input.value.trim().toUpperCase();
  if (!code) {
    msg.className = 'coupon-message error';
    msg.textContent = 'Please enter a coupon code.';
    return;
  }

  if (code === 'MILA10') {
    appliedCoupon = { code: 'MILA10', percent: 10 };
    msg.className = 'coupon-message success';
    msg.textContent = '✨ Coupon "MILA10" applied! 10% discount deducted.';
    showToast('Promo code MILA10 applied successfully!');
    updateCartUI();
  } else {
    msg.className = 'coupon-message error';
    msg.textContent = 'Invalid code. Try using MILA10';
  }
}

// ================= 8. QUICK VIEW / PDP MODAL =================
function openQuickView(productId) {
  const product = PRODUCTS.find(p => p.id === productId);
  if (!product) return;

  activeQuickViewProduct = product;
  selectedQuickViewSize = product.sizes[0];

  const modal = document.getElementById('quickViewOverlay');
  const content = document.getElementById('quickViewContent');

  if (!modal || !content) return;

  content.innerHTML = `
    <div class="qv-gallery-col">
      <img src="${product.image}" alt="${product.name}" class="qv-gallery-main">
    </div>

    <div class="qv-info-col">
      <span class="qv-meta-cat">${product.category} • Mila Exclusive</span>
      <h2 class="qv-title">${product.name}</h2>
      
      <div class="product-rating" style="margin-bottom: 12px;">
        <span class="stars">★★★★★</span>
        <span>${product.rating} Out of 5.0 (${product.reviewsCount} verified reviews)</span>
      </div>

      <div class="qv-pricing">
        <span class="price-current current">₹${product.price.toLocaleString('en-IN')}</span>
        <span class="price-original original">₹${product.originalPrice.toLocaleString('en-IN')}</span>
        <span class="discount-badge">${product.discount}</span>
      </div>

      <p class="qv-desc">${product.description}</p>

      <div class="selector-heading">
        <span>Select Fit / Size:</span>
        <button class="size-guide-link" onclick="openSizeGuideModal()">View Size Guide</button>
      </div>

      <div class="size-selector-group" id="qvSizeGroup">
        ${product.sizes.map((s, idx) => `
          <button class="size-btn ${idx === 0 ? 'selected' : ''}" onclick="selectQuickViewSize('${s}', this)">
            ${s}
          </button>
        `).join('')}
      </div>

      <div class="qv-actions-row">
        <button class="btn btn-primary" onclick="addQuickViewToCart()">
          <i class="fa-solid fa-bag-shopping"></i> ADD TO SHOPPING BAG
        </button>
        <button class="icon-btn" onclick="toggleWishlist(${product.id})" title="Wishlist">
          <i class="${wishlist.includes(product.id) ? 'fa-solid text-danger' : 'fa-regular'} fa-heart"></i>
        </button>
      </div>

      <div style="background: var(--bg-primary); padding: 14px; border-radius: 6px; font-size: 0.8rem; color: var(--text-muted); border: 1px solid var(--border-light);">
        <p style="margin-bottom: 4px;"><i class="fa-solid fa-shirt" style="color: var(--gold-dark); margin-right: 6px;"></i> <strong>Fabric & Care:</strong> ${product.fabricCare}</p>
        <p><i class="fa-solid fa-truck" style="color: var(--gold-dark); margin-right: 6px;"></i> Dispatch within 24 hours. Express air courier across India.</p>
      </div>
    </div>
  `;

  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function selectQuickViewSize(size, btnElement) {
  selectedQuickViewSize = size;
  const parent = document.getElementById('qvSizeGroup');
  if (parent) {
    parent.querySelectorAll('.size-btn').forEach(btn => btn.classList.remove('selected'));
    btnElement.classList.add('selected');
  }
}

function addQuickViewToCart() {
  if (!activeQuickViewProduct) return;
  addToCart(activeQuickViewProduct, selectedQuickViewSize || activeQuickViewProduct.sizes[0], 1);
  closeQuickView();
}

function closeQuickView() {
  const modal = document.getElementById('quickViewOverlay');
  if (modal) {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }
}

// ================= 9. SIZE GUIDE MODAL =================
function openSizeGuideModal() {
  const modal = document.getElementById('sizeGuideOverlay');
  if (modal) {
    modal.classList.add('active');
  }
}

function closeSizeGuideModal() {
  const modal = document.getElementById('sizeGuideOverlay');
  if (modal) {
    modal.classList.remove('active');
  }
}

// ================= 10. WISHLIST MANAGEMENT =================
function toggleWishlist(productId) {
  const index = wishlist.indexOf(productId);
  if (index > -1) {
    wishlist.splice(index, 1);
    showToast("Removed piece from your wishlist.");
  } else {
    wishlist.push(productId);
    showToast("Added piece to your wishlist!");
  }
  localStorage.setItem('mila_wishlist', JSON.stringify(wishlist));
  updateWishlistUI();
  renderProducts();
}

function updateWishlistUI() {
  const wishlistCount = document.getElementById('wishlistCount');
  if (wishlistCount) {
    wishlistCount.textContent = wishlist.length;
  }
}

// ================= 11. CHECKOUT & PAYMENT FLOW =================
let customerOrderData = {};

function openCheckoutModal() {
  const overlay = document.getElementById('checkoutOverlay');
  if (!overlay) return;

  goToCheckoutStep1();
  overlay.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeCheckoutModal() {
  const overlay = document.getElementById('checkoutOverlay');
  if (overlay) {
    overlay.classList.remove('active');
    document.body.style.overflow = '';
  }
}

function goToCheckoutStep1() {
  document.getElementById('checkoutStep1').style.display = 'block';
  document.getElementById('checkoutStep2').style.display = 'none';
  document.getElementById('checkoutStep3').style.display = 'none';

  document.getElementById('step1Indicator').className = 'step-indicator active';
  document.getElementById('step2Indicator').className = 'step-indicator';
  document.getElementById('step3Indicator').className = 'step-indicator';

  // Calculate current total
  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
  let discount = appliedCoupon ? Math.round(subtotal * (appliedCoupon.percent / 100)) : 0;
  let shipping = subtotal >= FREE_SHIPPING_MIN ? 0 : STANDARD_SHIPPING_FEE;
  let finalPayable = subtotal - discount + shipping;

  const step1Total = document.getElementById('step1Total');
  if (step1Total) step1Total.textContent = `₹${finalPayable.toLocaleString('en-IN')}`;
}

function goToCheckoutStep2() {
  // Capture shipping form data
  customerOrderData.name = document.getElementById('custName').value.trim();
  customerOrderData.phone = document.getElementById('custPhone').value.trim();
  customerOrderData.email = document.getElementById('custEmail').value.trim();
  customerOrderData.address = document.getElementById('custAddress').value.trim();
  customerOrderData.city = document.getElementById('custCity').value.trim();
  customerOrderData.state = document.getElementById('custState').value;
  customerOrderData.pincode = document.getElementById('custPincode').value.trim();

  // Show Step 2
  document.getElementById('checkoutStep1').style.display = 'none';
  document.getElementById('checkoutStep2').style.display = 'block';
  document.getElementById('checkoutStep3').style.display = 'none';

  document.getElementById('step1Indicator').className = 'step-indicator';
  document.getElementById('step2Indicator').className = 'step-indicator active';
  document.getElementById('step3Indicator').className = 'step-indicator';

  // Update total amount on payment button
  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
  let discount = appliedCoupon ? Math.round(subtotal * (appliedCoupon.percent / 100)) : 0;
  let shipping = subtotal >= FREE_SHIPPING_MIN ? 0 : STANDARD_SHIPPING_FEE;
  customerOrderData.totalPayable = subtotal - discount + shipping;

  const paymentBtnAmount = document.getElementById('paymentTotalAmount');
  if (paymentBtnAmount) paymentBtnAmount.textContent = `₹${customerOrderData.totalPayable.toLocaleString('en-IN')}`;
}

function selectPaymentMethod(method) {
  selectedPaymentMethod = method;
  customerOrderData.paymentMethod = method;

  // Highlight selected label
  const options = document.querySelectorAll('.payment-option');
  options.forEach(opt => opt.classList.remove('selected'));
  const checkedRadio = document.querySelector(`input[name="paymentOption"][value="${method}"]`);
  if (checkedRadio) checkedRadio.closest('.payment-option').classList.add('selected');

  const box = document.getElementById('paymentDetailsBox');
  const payBtn = document.getElementById('completePaymentBtn');

  if (method === 'upi') {
    box.innerHTML = `
      <div class="upi-box">
        <div class="qr-mockup">
          <div class="qr-code-img">
            <i class="fa-solid fa-qrcode"></i>
          </div>
          <span class="qr-text">Scan with Google Pay, PhonePe, or Paytm</span>
        </div>
        <div class="upi-id-row">
          <span>Official Store UPI: <strong>milafashions@icici</strong></span>
        </div>
      </div>
    `;
    payBtn.innerHTML = `PAY VIA UPI <span id="paymentTotalAmount">₹${customerOrderData.totalPayable.toLocaleString('en-IN')}</span>`;
  } else if (method === 'card') {
    box.innerHTML = `
      <div style="max-width: 420px; margin: 0 auto; text-align: left;">
        <div class="form-group">
          <label>Card Number</label>
          <input type="text" placeholder="4111 •••• •••• 1234" maxlength="19">
        </div>
        <div class="form-row">
          <div class="form-group">
            <label>Expiry (MM/YY)</label>
            <input type="text" placeholder="12/28" maxlength="5">
          </div>
          <div class="form-group">
            <label>CVV</label>
            <input type="password" placeholder="•••" maxlength="3">
          </div>
        </div>
        <div class="form-group">
          <label>Name on Card</label>
          <input type="text" placeholder="${customerOrderData.name || 'Priyadharshini'}">
        </div>
      </div>
    `;
    payBtn.innerHTML = `PAY WITH CARD <span id="paymentTotalAmount">₹${customerOrderData.totalPayable.toLocaleString('en-IN')}</span>`;
  } else if (method === 'netbanking') {
    box.innerHTML = `
      <div style="max-width: 420px; margin: 0 auto; text-align: left;">
        <label style="font-size: 0.8rem; font-weight: 600; display: block; margin-bottom: 8px;">Select Bank:</label>
        <select style="width: 100%; padding: 10px; border-radius: 4px; border: 1px solid var(--border-light);">
          <option>HDFC Bank</option>
          <option>ICICI Bank</option>
          <option>State Bank of India (SBI)</option>
          <option>Axis Bank</option>
          <option>Kotak Mahindra Bank</option>
        </select>
      </div>
    `;
    payBtn.innerHTML = `PROCEED TO NETBANKING <span id="paymentTotalAmount">₹${customerOrderData.totalPayable.toLocaleString('en-IN')}</span>`;
  } else if (method === 'cod') {
    box.innerHTML = `
      <div style="padding: 10px; color: var(--text-muted); font-size: 0.85rem;">
        <i class="fa-solid fa-truck-ramp-box" style="font-size: 2rem; color: var(--gold-dark); margin-bottom: 8px;"></i>
        <p>You can pay via Cash or UPI QR at your doorstep upon parcel delivery.</p>
        <p style="margin-top: 4px; font-weight: 600; color: var(--text-main);">Zero Extra Charges on Cash on Delivery.</p>
      </div>
    `;
    payBtn.innerHTML = `CONFIRM CASH ON DELIVERY ORDER`;
  }
}

// Process Payment & Show Success Screen
function processOrderPayment() {
  const payBtn = document.getElementById('completePaymentBtn');
  payBtn.disabled = true;
  payBtn.innerHTML = `<i class="fa-solid fa-spinner fa-spin"></i> Processing with Payment Gateway...`;

  setTimeout(() => {
    payBtn.disabled = false;
    showOrderSuccessScreen();
  }, 1200);
}

function showOrderSuccessScreen() {
  const orderId = `MILA-${Math.floor(100000 + Math.random() * 900000)}`;
  customerOrderData.orderId = orderId;
  customerOrderData.items = [...cart];

  document.getElementById('checkoutStep1').style.display = 'none';
  document.getElementById('checkoutStep2').style.display = 'none';
  document.getElementById('checkoutStep3').style.display = 'block';

  document.getElementById('step1Indicator').className = 'step-indicator';
  document.getElementById('step2Indicator').className = 'step-indicator';
  document.getElementById('step3Indicator').className = 'step-indicator active';

  // Fill receipt data
  document.getElementById('successCustName').textContent = customerOrderData.name || 'Valued Patron';
  document.getElementById('receiptOrderId').textContent = `#${orderId}`;
  
  let paymentText = 'Prepaid UPI (Razorpay)';
  if (selectedPaymentMethod === 'card') paymentText = 'Credit / Debit Card (Razorpay)';
  if (selectedPaymentMethod === 'netbanking') paymentText = 'Net Banking (Razorpay)';
  if (selectedPaymentMethod === 'cod') paymentText = 'Cash on Delivery (COD)';
  document.getElementById('receiptPaymentMode').textContent = paymentText;

  document.getElementById('receiptAddress').textContent = `${customerOrderData.address}, ${customerOrderData.city}, ${customerOrderData.state} - ${customerOrderData.pincode}`;
  document.getElementById('receiptTotal').textContent = `₹${customerOrderData.totalPayable.toLocaleString('en-IN')}`;

  // Configure WhatsApp button
  const waBtn = document.getElementById('sendWhatsAppOrderBtn');
  if (waBtn) {
    const itemsText = customerOrderData.items.map(i => `• ${i.name} (${i.size}) x ${i.qty} = ₹${(i.price * i.qty).toLocaleString('en-IN')}`).join('%0A');
    const waMessage = `Hello Mila Fashions! 🌸%0A%0AI have placed an order on your website:%0A%0A*Order ID:* %23${orderId}%0A*Customer Name:* ${encodeURIComponent(customerOrderData.name)}%0A*Phone:* ${customerOrderData.phone}%0A*Delivery Address:* ${encodeURIComponent(customerOrderData.address + ', ' + customerOrderData.city + ' - ' + customerOrderData.pincode)}%0A%0A*Items:*%0A${itemsText}%0A%0A*Payment Mode:* ${paymentText}%0A*Total Amount:* ₹${customerOrderData.totalPayable.toLocaleString('en-IN')}%0A%0APlease confirm my order shipment! ✨`;
    
    waBtn.onclick = () => {
      window.open(`https://wa.me/919876543210?text=${waMessage}`, '_blank');
    };
  }

  // Clear cart now that order is placed
  cart = [];
  appliedCoupon = null;
  saveCart();
  updateCartUI();
  showToast(`🎉 Order #${orderId} successfully placed!`);
}

function printOrderInvoice() {
  window.print();
}

function closeCheckoutAndReset() {
  closeCheckoutModal();
  goToCheckoutStep1();
}

// ================= 12. TOAST NOTIFICATIONS =================
function showToast(message) {
  const container = document.getElementById('toastContainer');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `<i class="fa-solid fa-gem" style="color: var(--gold-primary);"></i> <span>${message}</span>`;
  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(10px)';
    setTimeout(() => toast.remove(), 300);
  }, 3200);
}
