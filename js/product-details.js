// ==================== PRODUCT DETAILS PAGE JAVASCRIPT ====================

// Global Variables
let currentProduct = null;
window.currentProduct = currentProduct;

function _pdText(field) {
    if (!currentProduct) return '';
    var lang = window.currentLang || document.documentElement.lang || 'ar';
    if (typeof window.getProductText === 'function') return window.getProductText(currentProduct, field, lang);
    var v = currentProduct[field];
    if (typeof v === 'string') {
        if (lang === 'ar') return v;
        return /[\u0600-\u06FF]/.test(v) ? '' : v;
    }
    if (v && typeof v === 'object') return v[lang] || v.en || v.fr || '';
    return '';
}
let currentImages = [];
let currentImageIndex = 0;
allProducts = [];

// ==================== WAIT FOR FIREBASE (from app.js) ====================
function waitForFirebase() {
    return new Promise(resolve => {
        var attempts = 0;
        function check() {
            if (window.database) {
                var fbGet = window.firebaseGet, fbSet = window.firebaseSet, fbRef = window.firebaseRef, fbUpdate = window.firebaseUpdate;
                var db = window.database;
database = {
    ref: function(path) {
        var dbRef = fbRef(db, path);
        return {
            once: async function() { return await fbGet(dbRef); },
            set: async function(v) { await fbSet(dbRef, v); },
            update: async function(d) { await fbUpdate(dbRef, d); },
            remove: async function() { await fbSet(dbRef, null); }
        };
    }
};
                auth = window.auth;
                console.log('✅ Firebase connected via app.js');
                resolve();
            } else if (++attempts > 30) {
                console.error('❌ Firebase timeout - using localStorage fallback');
                resolve();
            } else {
                setTimeout(check, 100);
            }
        }
        check();
    });
}

// ==================== USER LOCATION DETECTION ====================
async function detectUserLocation() {
    // Use centralized detection from app.js if available
    if (typeof detectUserCountry === 'function') {
        await detectUserCountry();
        // The global userCountry from app.js is now updated
        if (typeof userCountry === 'string') return userCountry;
    }
    // Fallback: timezone detection
    try {
        const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
        const map = { 'Africa/Cairo':'EG','Asia/Riyadh':'SA','Asia/Dubai':'AE','Europe/London':'GB','America/New_York':'US' };
        userCountry = map[tz] || 'EG';
    } catch (e) {
        userCountry = 'EG';
    }
    return userCountry;
}

// ==================== LOAD ALL PRODUCTS ====================
async function loadAllProducts() {
    if (!database) {
        console.warn('⚠️ Database not available, loading from localStorage');
        const localData = JSON.parse(localStorage.getItem('bravo_local_db') || '{}');
        if (localData.products) {
            allProducts = Object.entries(localData.products).map(([id, data]) => ({ ...data, id })).filter(x => x && typeof x === 'object' && x.title && x.status !== 'trashed');
        }
        return allProducts;
    }
    try {
        const snapshot = await database.ref('products').once('value');
        if (snapshot.exists()) {
            const productsData = snapshot.val();
            allProducts = Object.entries(productsData).map(([id, data]) => ({
                ...data,
                id: id
            })).filter(x => x && typeof x === 'object' && x.title && x.status !== 'trashed');
            console.log('✅ All products loaded:', allProducts.length);
            return allProducts;
        } else {
            console.log('ℹ️ No products found');
            allProducts = [];
            return [];
        }
    } catch (error) {
        console.error('❌ Error loading products:', error);
        allProducts = [];
        return [];
    }
}

// ==================== LOAD PRODUCT ====================
async function loadProduct() {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id');

    if (!productId) {
        showNotification(
            currentLang === 'ar' ? 'لم يتم العثور على المنتج!' : currentLang === 'en' ? 'Product not found!' : 'Produit introuvable!', 
            'error'
        );
        setTimeout(() => window.location.href = 'index.html', 2000);
        return;
    }

    try {
        console.log('📥 Loading product:', productId);
        
        // جلب منتج واحد فقط من Firebase (سريع) — loadAllProducts مش لازم هنا
        const productSnapshot = database && database.ref ? await database.ref(`products/${productId}`).once('value') : null;
        
        if (productSnapshot && productSnapshot.exists()) {
            currentProduct = { 
                ...productSnapshot.val(), 
                id: productId 
            };
            window.currentProduct = currentProduct;
            // Fill missing fields from localStorage (which always has complete data from admin saves)
            try {
                var localDb = JSON.parse(localStorage.getItem('bravo_local_db') || '{}');
                if (localDb.products && localDb.products[productId]) {
                    var localP = localDb.products[productId];
                    for (var key in localP) {
                        if (currentProduct[key] === undefined || currentProduct[key] === null) {
                            currentProduct[key] = localP[key];
                        }
                    }
                }
            } catch(e) {}
        } else {
            // Fallback: try from allProducts (already loaded from localStorage if Firebase failed)
            var localProduct = allProducts.find(function(p) { return p.id === productId; });
            if (!localProduct) {
                // Try loading directly from localStorage
                try {
                    var localDb = JSON.parse(localStorage.getItem('bravo_local_db') || '{}');
                    if (localDb.products && localDb.products[productId]) {
                        localProduct = { ...localDb.products[productId], id: productId };
                    }
                } catch(e) {}
            }
            if (!localProduct) {
                throw new Error('Product not found in database');
            }
            currentProduct = localProduct;
            window.currentProduct = currentProduct;
        }
        
        console.log('✅ Product loaded:', _pdText('title'));
        
        // Display product (called from init after potential auto-translate)
        
        loadRelatedProducts();
        initializeImageGallery();
        
        // Update views in background
        incrementProductViews(productId, currentProduct.views);
        
    } catch (error) {
        console.error('❌ Error loading product:', error);
        
        showNotification(
                        currentLang === 'ar' 
                ? `خطأ: ${error.message || 'فشل تحميل المنتج'}` 
                : currentLang === 'en' ? `Error: ${error.message || 'Failed to load product'}` : `Erreur: ${error.message || 'Échec du chargement'}`,


            'error'
        );
        
        setTimeout(() => {
            window.location.href = 'index.html';
        }, 3000);
    }
}

// ==================== INCREMENT VIEWS ====================
function incrementProductViews(productId, currentViews = 0) {
    const updateViews = async () => {
        try {
            const newViews = (parseInt(currentViews) || 0) + 1;
            await database.ref(`products/${productId}/views`).set(newViews);
            console.log('👁️ Views updated:', newViews);
        } catch (error) {
            console.log('⚠️ Views update failed (non-critical)');
        }
    };
    
    updateViews();
}

// ==================== DISPLAY PRODUCT ====================
function displayProduct() {
    // Hide loading, show content
    var loadingEl = document.getElementById('productLoading');
    var contentEl = document.getElementById('productContent');
    if (loadingEl) loadingEl.style.display = 'none';
    if (contentEl) contentEl.style.display = '';

    var lang = window.currentLang || document.documentElement.lang || 'ar';

    const categoryNames = {
        ar: { books: 'كتب إلكترونية', excel: 'ملفات Excel', bundles: 'باقات شاملة' },
        en: { books: 'E-Books', excel: 'Excel Files', bundles: 'Bundles' }
    };

    const categoryIcons = {
        books: 'fa-book',
        excel: 'fa-file-excel',
        bundles: 'fa-box-open'
    };

    var getCatName = function(cat) {
        var cats = window.APP_CONFIG?.categories;
        return (cats?.[currentLang]?.[cat] || cat);
    };

    // Update page title
    document.getElementById('productTitle').textContent = _pdText('title');
    document.title = `${_pdText('title')} - BRAVO Store`;
    
    // Update breadcrumb
    const breadcrumbProduct = document.getElementById('breadcrumbProduct');
    if (breadcrumbProduct) {
        breadcrumbProduct.textContent = _pdText('title');
    }
    const breadcrumbCategoryText = document.getElementById('breadcrumbCategoryText');
    const breadcrumbCategoryLink = document.getElementById('breadcrumbCategoryLink');
    const breadcrumbCategoryChevron = document.getElementById('breadcrumbCategoryChevron');
    if (breadcrumbCategoryText && breadcrumbCategoryLink && breadcrumbCategoryChevron) {
        const catName = getCatName(currentProduct.category);
        if (catName) {
            breadcrumbCategoryText.textContent = catName;
            breadcrumbCategoryLink.style.display = '';
            breadcrumbCategoryChevron.style.display = '';
            breadcrumbCategoryLink.href = 'products.html?category=' + encodeURIComponent(currentProduct.category);
        } else {
            breadcrumbCategoryLink.style.display = 'none';
            breadcrumbCategoryChevron.style.display = 'none';
        }
    }

    // Update category (match homepage/cart style)
    const categoryLine = document.getElementById('productCategoryLine');
    const categoryText = document.getElementById('categoryText');
    if (categoryLine && categoryText) {
        var catEmojis = { books: '📚', software: '💻', formulas: '🧪', courses: '🎓' };
        var emoji = catEmojis[currentProduct.category] || '📦';
        var cats = window.APP_CONFIG?.categories;
        var catLabel = cats?.[currentLang]?.[currentProduct.category] || currentProduct.category;
        categoryText.textContent = catLabel ? (emoji + ' ' + catLabel) : '';
    }

    // Update descriptions
    const descElement = document.getElementById('productDescription');
    if (descElement) {
        descElement.textContent = _pdText('description');
    }
    
    const fullDescElement = document.getElementById('fullDescription');
    if (fullDescElement) {
        fullDescElement.textContent = _pdText('description') || '';
    }

    // Update price
    updatePrice();

    // Update main image and gallery
    const mainImageContainer = document.getElementById('mainImageContainer');
    if (mainImageContainer) {
        // Build images array from product data
        var allImgs = [];
        if (currentProduct.images && Array.isArray(currentProduct.images) && currentProduct.images.length > 0) {
            allImgs = currentProduct.images.slice();
        } else if (currentProduct.image) {
            allImgs = [currentProduct.image];
        }
        currentImages = allImgs.length > 0 ? allImgs : [];
        currentImageIndex = currentProduct.mainImageIndex || 0;
        if (currentImageIndex >= currentImages.length) currentImageIndex = 0;

        if (currentImages.length > 0) {
            var mainSrc = currentImages[currentImageIndex];
            var badgesHtml = (typeof window.generateBadges === 'function') ? window.generateBadges(currentProduct, lang) : '';
            mainImageContainer.innerHTML = `
                ${badgesHtml}
                <img src="${mainSrc}" alt="${_pdText('title')}" class="main-image" id="mainImage">
                <button class="image-nav-btn prev" onclick="window.prevImage()">
                    <i class="fas fa-chevron-right"></i>
                </button>
                <button class="image-nav-btn next" onclick="window.nextImage()">
                    <i class="fas fa-chevron-left"></i>
                </button>
                <div class="image-overlay-buttons">
                    <button class="overlay-btn overlay-wishlist-btn" onclick="window.addToWishlist(event)" aria-label="Add to wishlist">
                        <i class="fas fa-heart"></i>
                    </button>
                    <button class="overlay-btn overlay-share-btn" onclick="window.shareProduct()" aria-label="Share">
                        <i class="fas fa-share-alt"></i>
                    </button>
                </div>
            `;
            var pdImg = document.getElementById('mainImage');
            if (pdImg) {
                pdImg.onload = function() { positionPdBadges(pdImg); };
                if (pdImg.complete) positionPdBadges(pdImg);
            }
        } else {
            const icon = currentProduct.icon || categoryIcons[currentProduct.category] || 'fa-box';
            var badgesHtml = (typeof window.generateBadges === 'function') ? window.generateBadges(currentProduct, lang) : '';
            mainImageContainer.innerHTML = `
                ${badgesHtml}
                <i class="fas ${icon} image-placeholder"></i>
                <div class="image-overlay-buttons">
                    <button class="overlay-btn overlay-wishlist-btn" onclick="window.addToWishlist(event)" aria-label="Add to wishlist">
                        <i class="fas fa-heart"></i>
                    </button>
                    <button class="overlay-btn overlay-share-btn" onclick="window.shareProduct()" aria-label="Share">
                        <i class="fas fa-share-alt"></i>
                    </button>
                </div>
            `;
        }
    }

    // Show video if present
    var videoSection = document.getElementById('productVideoSection');
    if (currentProduct.video && currentProduct.video.trim()) {
        var videoUrl = currentProduct.video.trim();
        var videoId = '';
        var vMatch = videoUrl.match(/(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([a-zA-Z0-9_-]+)/);
        if (vMatch) videoId = vMatch[1];

        if (videoSection) {
            videoSection.style.display = 'block';
            var wrapper = videoSection.querySelector('.video-wrapper');
            if (wrapper) {
                if (videoId) {
                    wrapper.innerHTML = '<iframe style="position:absolute;top:0;left:0;width:100%;height:100%;" src="https://www.youtube.com/embed/' + videoId + '" frameborder="0" allow="accelerometer;autoplay;clipboard-write;encrypted-media;gyroscope;picture-in-picture" allowfullscreen></iframe>';
                } else {
                    wrapper.innerHTML = '<video style="position:absolute;top:0;left:0;width:100%;height:100%;object-fit:contain;background:#000;" controls src="' + videoUrl + '"></video>';
                }
            }
        }
    } else if (videoSection) {
        videoSection.style.display = 'none';
    }

    // Update thumbnails
    updateThumbnails();

    // Check wishlist & cart status (also re-check after Firebase syncs)
    updateWishlistStatus();
    updateCartStatus();
    syncHeaderBadges();
    setTimeout(function(){ updateWishlistStatus(); updateCartStatus(); syncHeaderBadges(); }, 1500);

    loadRelatedProducts();

    populateProductTabs();

    // Apply language
    applyLanguage();
}

// ==================== POPULATE PRODUCT TABS ====================
function populateProductTabs() {
    const p = currentProduct;
    if (!p) return;

    var lang = window.currentLang || document.documentElement.lang || 'ar';

    // Full Description
    const fullDescEl = document.getElementById('fullDescription');
    if (fullDescEl) {
        fullDescEl.textContent = _pdText('description');
    }

    // Helper: get multilingual array
    function getArr(field) {
        var val = p[field];
        if (Array.isArray(val)) {
            if (lang === 'ar') return val;
            var hasArabic = val.some(function(i) { return typeof i === 'string' && /[\u0600-\u06FF]/.test(i); });
            return hasArabic ? [] : val;
        }
        if (val && typeof val === 'object') {
            if (val[lang]) return val[lang];
            if (lang === 'ar' && val.en) return val.en;
            if (lang === 'en' && val.fr) return val.fr;
            if (lang === 'fr' && val.en) return val.en;
            return [];
        }
        return [];
    }

    console.log('[populateProductTabs] currentProduct:', p, 'features:', p.features, 'requirements:', p.requirements, 'faq:', p.faq);

    // Features
    const featuresUl = document.querySelector('#featuresTab ul');
    if (featuresUl) {
        const feats = getArr('features');
        console.log('[populateProductTabs] feats array:', feats);
        featuresUl.innerHTML = feats.length > 0
            ? feats.map(f => `<li><i class="fas fa-check-circle"></i> ${f}</li>`).join('')
            : '';
    }

    // Requirements
    const reqsUl = document.querySelector('#requirementsTab ul');
    if (reqsUl) {
        const reqs = getArr('requirements');
        console.log('[populateProductTabs] reqs array:', reqs);
        reqsUl.innerHTML = reqs.length > 0
            ? reqs.map(r => `<li><i class="fas fa-check-circle"></i> ${r}</li>`).join('')
            : '';
    }

    // FAQ
    const faqList = document.querySelector('#faqTab .faq-list');
    if (faqList) {
        var faq = getArr('faq');
        console.log('[populateProductTabs] faq array:', faq);
        faqList.innerHTML = faq.length > 0
            ? faq.map((item, idx) =>
                `<div class="faq-item">
                    <div class="faq-question" onclick="toggleFAQ(this)">
                        <span>${typeof item === 'object' ? (item.q || item.question || '') : item}</span>
                        <div class="faq-icon"><i class="fas fa-chevron-down"></i></div>
                    </div>
                    <div class="faq-answer">
                        <p>${typeof item === 'object' ? (item.a || item.answer || '') : ''}</p>
                    </div>
                </div>`
              ).join('')
            : '';
    }

    // Toggle tab visibility
    const sections = [
        { id: 'descriptionTab', btnClass: 'tab-btn[onclick*="description"]', show: p.showFullDesc !== false },
        { id: 'featuresTab', btnClass: 'tab-btn[onclick*="features"]', show: p.showFeatures !== false },
        { id: 'requirementsTab', btnClass: 'tab-btn[onclick*="requirements"]', show: p.showRequirements !== false },
        { id: 'faqTab', btnClass: 'tab-btn[onclick*="faq"]', show: p.showFAQ !== false }
    ];

    const hiddenSections = [];
    sections.forEach(s => {
        const tab = document.getElementById(s.id);
        if (!tab) return;
        if (s.show) {
            tab.style.display = '';
            // Show the corresponding tab button
            const btns = document.querySelectorAll('.tab-btn');
            btns.forEach(btn => {
                if (btn.getAttribute('onclick')?.includes(s.id.replace('Tab', ''))) {
                    btn.style.display = '';
                }
            });
        } else {
            tab.style.display = 'none';
            hiddenSections.push(s);
            const btns = document.querySelectorAll('.tab-btn');
            btns.forEach(btn => {
                if (btn.getAttribute('onclick')?.includes(s.id.replace('Tab', ''))) {
                    btn.style.display = 'none';
                }
            });
        }
    });

    // If the currently active tab is hidden, switch to the first visible one
    const activeTab = document.querySelector('.tab-content.active');
    if (activeTab && activeTab.style.display === 'none') {
        const firstVisible = document.querySelector('.tab-content:not([style*="display: none"])');
        if (firstVisible && typeof switchTab === 'function') {
            switchTab(firstVisible.id.replace('Tab', ''));
        }
    }
}

// ==================== POSITION BADGES AT IMAGE CORNER ====================
function positionPdBadges(img) {
    var container = document.getElementById('mainImageContainer');
    if (!container) return;
    var bc = container.querySelector('.badge-column');
    if (!bc) return;
    var cr = container.getBoundingClientRect();
    if (img.naturalWidth === 0 || cr.width === 0) { setTimeout(positionPdBadges.bind(null, img), 100); return; }
    // Calculate actual rendered image bounds inside object-fit:contain
    var natW = img.naturalWidth, natH = img.naturalHeight;
    var scale = Math.min(cr.width / natW, cr.height / natH);
    var renderW = natW * scale, renderH = natH * scale;
    var offsetX = (cr.width - renderW) / 2, offsetY = (cr.height - renderH) / 2;
    var imgTop = cr.top + offsetY, imgRight = cr.right - offsetX;
    var isRtl = document.documentElement.dir === 'rtl' || document.documentElement.lang === 'ar';
    if (isRtl) {
        bc.style.cssText = 'position:absolute!important;top:'+(imgTop-cr.top)+'px!important;right:'+(cr.right-imgRight)+'px!important;left:auto!important;z-index:10!important';
    } else {
        bc.style.cssText = 'position:absolute!important;top:'+(imgTop-cr.top)+'px!important;left:'+(cr.right-imgRight)+'px!important;right:auto!important;z-index:10!important';
    }
}

// ==================== CHECK WISHLIST / CART STATUS ====================
function updateWishlistStatus() {
    if (!currentProduct) return;
    const inWishlist = typeof userWishlist !== 'undefined' && userWishlist && userWishlist.some(item => (item.id || item.productId || item) === currentProduct.id);
    document.querySelectorAll('.overlay-wishlist-btn, .action-wishlist-btn').forEach(btn => {
        if (inWishlist) {
            btn.classList.add('liked');
        } else {
            btn.classList.remove('liked');
        }
    });
}

function updateCartStatus() {
    if (!currentProduct) return;
    const cartBtn = document.querySelector('.btn-add-cart');
    if (!cartBtn) return;
    
    const inCart = typeof userCart !== 'undefined' && userCart && userCart.some(item => (item.id || item.productId || item) === currentProduct.id);
    if (inCart) {
        cartBtn.classList.add('added');
    } else {
        cartBtn.classList.remove('added');
    }
}

// Direct badge sync (no dependency on app.js functions)
function syncHeaderBadges() {
    if (typeof userWishlist !== 'undefined' && userWishlist) {
        const wc = userWishlist.length;
        ['wishlistBadge', 'wishlistBadgeMobile'].forEach(id => {
            const b = document.getElementById(id);
            if (!b) return;
            b.textContent = wc > 99 ? '99+' : wc;
            b.style.display = wc > 0 ? 'flex' : 'none';
        });
    }
    if (typeof userCart !== 'undefined' && userCart) {
        const cc = userCart.reduce((a, b) => a + ((b && b.quantity) || 1), 0);
        ['cartBadge', 'cartBadgeMobile'].forEach(id => {
            const b = document.getElementById(id);
            if (!b) return;
            b.textContent = cc > 99 ? '99+' : cc;
            b.style.display = cc > 0 ? 'flex' : 'none';
        });
    }
}

// ==================== UPDATE PRICE ====================
function updatePrice() {
    const cu = typeof getUserCurrency === 'function' ? getUserCurrency() : { symbol: currentLang === 'ar' ? 'جنيه' : currentLang === 'en' ? 'EGP' : 'EGP' };
    const priceValue = typeof getProductPrice === 'function' ? getProductPrice(currentProduct) : (currentProduct.priceEGP || 0);
    const priceCurrency = cu.symbol;

    const priceElement = document.getElementById('productPrice');
    const currencyElement = document.getElementById('productCurrency');
    
    if (priceElement) priceElement.textContent = priceValue;
    if (currencyElement) currencyElement.textContent = priceCurrency;

    const oldPriceValue = typeof getProductOldPrice === 'function' ? getProductOldPrice(currentProduct) : 0;
    const hasDiscount = oldPriceValue > priceValue;
    
    if (hasDiscount) {
        const priceOld = document.getElementById('priceOld');
        if (priceOld) {
            priceOld.classList.remove('hidden');
            document.getElementById('oldPriceValue').textContent = oldPriceValue;
            document.getElementById('oldPriceCurrency').textContent = priceCurrency;
        }

        const saved = oldPriceValue - priceValue;
        const priceSave = document.getElementById('priceSave');
        if (priceSave) {
            priceSave.classList.remove('hidden');
            document.getElementById('saveAmount').textContent = saved;
            document.getElementById('saveCurrency').textContent = priceCurrency;
        }
    }
}

// ==================== UPDATE PRODUCT BADGES ====================
// ==================== UPDATE THUMBNAILS ====================
function updateThumbnails() {
    const thumbnailGallery = document.getElementById('thumbnailGallery');
    if (!thumbnailGallery) return;
    
    if (currentImages.length > 0) {
        thumbnailGallery.innerHTML = currentImages.map((img, index) => `
            <div class="thumbnail ${index === 0 ? 'active' : ''}" onclick="window.selectImage(${index})">
                <img src="${img}" alt="Image ${index + 1}">
            </div>
        `).join('');
    } else {
        thumbnailGallery.innerHTML = '';
    }
    initThumbnailCarousel();
}

// ==================== THUMBNAIL CAROUSEL ====================
function initThumbnailCarousel() {
    const prevBtn = document.getElementById('thumbPrev');
    const nextBtn = document.getElementById('thumbNext');
    const gallery = document.getElementById('thumbnailGallery');
    if (!prevBtn || !nextBtn || !gallery) return;
    
    // Remove old listeners by cloning
    var newPrev = prevBtn.cloneNode(true);
    var newNext = nextBtn.cloneNode(true);
    prevBtn.parentNode.replaceChild(newPrev, prevBtn);
    nextBtn.parentNode.replaceChild(newNext, nextBtn);
    
    newPrev.addEventListener('click', function() {
        var first = gallery.querySelector('.thumbnail');
        if (!first) return;
        var thumbWidth = first.offsetWidth;
        var gap = 6;
        gallery.scrollBy({ left: -(thumbWidth + gap) * 2, behavior: 'smooth' });
    });
    
    newNext.addEventListener('click', function() {
        var first = gallery.querySelector('.thumbnail');
        if (!first) return;
        var thumbWidth = first.offsetWidth;
        var gap = 6;
        gallery.scrollBy({ left: (thumbWidth + gap) * 2, behavior: 'smooth' });
    });
}

// ==================== IMAGE GALLERY FUNCTIONS ====================
function initializeImageGallery() {
    currentImageIndex = 0;
}

window.selectImage = function(index) {
    currentImageIndex = index;
    const mainImage = document.getElementById('mainImage');
    if (mainImage && currentImages[index]) {
        mainImage.src = currentImages[index];
        
        // Update active thumbnail
        document.querySelectorAll('.thumbnail').forEach((thumb, i) => {
            thumb.classList.toggle('active', i === index);
        });
    }
};

window.nextImage = function() {
    if (currentImages.length === 0) return;
    currentImageIndex = (currentImageIndex + 1) % currentImages.length;
    window.selectImage(currentImageIndex);
};

window.prevImage = function() {
    if (currentImages.length === 0) return;
    currentImageIndex = (currentImageIndex - 1 + currentImages.length) % currentImages.length;
    window.selectImage(currentImageIndex);
};

// ==================== LOAD RELATED PRODUCTS ====================
async function loadRelatedProducts() {
    try {
        if (allProducts.length === 0) {
            await loadAllProducts();
        }

        const relatedProducts = allProducts
            .filter(product => product.id !== currentProduct.id)
            .filter(product => product.category === currentProduct.category)
            .slice(0, 4);

        if (relatedProducts.length > 0) {
            const relatedSection = document.getElementById('relatedSection');
            const relatedGrid = document.getElementById('relatedGrid');
            
            if (relatedSection && relatedGrid) {
                relatedSection.style.display = 'block';
                var lang = window.currentLang || document.documentElement.lang || 'ar';
                var uc = localStorage.getItem('userCountry') || 'EG';
                relatedGrid.className = 'products-grid';

                if (typeof window.generateProductCardHTML === 'function') {
                    relatedGrid.innerHTML = relatedProducts.map(function(product, i) {
                        return window.generateProductCardHTML(product, i, { lang: lang, userCountry: uc });
                    }).join('');
                } else {
                    relatedGrid.innerHTML = relatedProducts.map(function(product) {
                        var rlTitle = typeof window.getProductText === 'function' ? window.getProductText(product, 'title', lang) : '';
                        return '<div class="related-card" onclick="window.location.href=\'product-details.html?id=' + product.id + '\'">' +
                            '<div class="related-image">' + (product.image ? '<img src="' + product.image + '" alt="' + rlTitle + '">' : '<i class="fas ' + (product.icon || 'fa-box') + '" style="font-size:4em;color:var(--primary)"></i>') + '</div>' +
                            '<h3 class="related-title">' + rlTitle + '</h3></div>';
                    }).join('');
                }
                setTimeout(function(){ if (typeof window.revealDynamicContent === 'function') window.revealDynamicContent(); }, 50);
            }
        }
    } catch (error) {
        console.error('Error loading related products:', error);
    }
}

// ==================== BUY NOW ====================
window.buyNow = function() {
    console.log('🛒 Buy Now clicked');
    
    const user = auth.currentUser;
    
    if (!user) {
        alert(currentLang === 'ar' ? 'يجب تسجيل الدخول أولاً' : currentLang === 'en' ? 'Please login first' : 'Veuillez vous connecter d\'abord');
        sessionStorage.setItem('redirectAfterLogin', window.location.href);
        window.location.href = 'auth.html';
        return;
    }

    if (!currentProduct) {
        alert(currentLang === 'ar' ? 'لم يتم تحميل بيانات المنتج' : currentLang === 'en' ? 'Product data not loaded' : 'Données du produit non chargées');
        return;
    }

    const priceValue = typeof getProductPrice === 'function' ? getProductPrice(currentProduct) : (currentProduct.priceEGP || 0);
    const priceCurrency = typeof getUserCurrency === 'function' ? getUserCurrency().currency : 'EGP';
    
    const productImg = (currentProduct.image || (currentProduct.images && currentProduct.images[0]) || '');
    const checkoutUrl = `checkout.html?product=${currentProduct.id}&title=${encodeURIComponent(_pdText('title'))}&price=${priceValue}&currency=${priceCurrency}&image=${encodeURIComponent(productImg)}&category=${encodeURIComponent(currentProduct.category || '')}`;
    
    console.log('➡️ Redirecting to:', checkoutUrl);
    window.location.href = checkoutUrl;
};

// ==================== ADD / REMOVE CART ====================
window.addToCart = async function() {
    console.log('🛍️ Add to Cart clicked');
    
    const user = auth.currentUser;
    
    if (!user) {
        alert(currentLang === 'ar' ? 'يجب تسجيل الدخول أولاً' : currentLang === 'en' ? 'Please login first' : 'Veuillez vous connecter d\'abord');
        sessionStorage.setItem('redirectAfterLogin', window.location.href);
        window.location.href = 'auth.html';
        return;
    }

    if (!currentProduct) {
        alert(currentLang === 'ar' ? 'لم يتم تحميل بيانات المنتج' : currentLang === 'en' ? 'Product data not loaded' : 'Données du produit non chargées');
        return;
    }

    try {
        const isInCart = typeof userCart !== 'undefined' && userCart && userCart.some(item => (item.id || item.productId || item) === currentProduct.id);
        const cartRef = database.ref(`users/${user.uid}/cart/${currentProduct.id}`);
        const cartBtn = document.querySelector('.btn-add-cart');

        if (isInCart) {
            // Remove from cart
            await cartRef.remove();
            if (cartBtn) cartBtn.classList.remove('added');
            
            if (typeof userCart !== 'undefined' && userCart) {
                userCart = userCart.filter(item => (item.id || item.productId || item) !== currentProduct.id);
                if (typeof STORAGE_KEYS !== 'undefined') localStorage.setItem(STORAGE_KEYS.cart, JSON.stringify(userCart));
            }
            
            window.showToast(
                currentLang === 'ar' ? '🗑️ تم الحذف' : currentLang === 'en' ? '🗑️ Removed' : '🗑️ Supprimé',
                currentLang === 'ar' ? 'تم إزالة المنتج من السلة' : currentLang === 'en' ? 'Removed from cart' : 'Retiré du panier',
                'error'
            );
        } else {
            // Add to cart
            const cu = typeof getUserCurrency === 'function' ? getUserCurrency() : { currency: 'EGP', symbol: currentLang === 'ar' ? 'جنيه' : currentLang === 'en' ? 'EGP' : 'EGP' };
            const priceValue = typeof getProductPrice === 'function' ? getProductPrice(currentProduct) : (currentProduct.priceEGP || 0);
            var cartStoredTitle = typeof currentProduct.title === 'string' ? currentProduct.title : (currentProduct.title?.ar || '');
            const cartItem = {
                id: currentProduct.id,
                title: cartStoredTitle,
                category: currentProduct.category,
                priceEGP: currentProduct.priceEGP,
                priceUSD: currentProduct.priceUSD,
                price: priceValue,
                currency: cu.currency,
                image: currentProduct.image || '',
                icon: currentProduct.icon || 'fa-box',
                quantity: 1,
                addedAt: Date.now()
            };

            await cartRef.set(cartItem);
            if (cartBtn) cartBtn.classList.add('added');
            
            if (typeof userCart !== 'undefined' && userCart) {
                userCart = userCart.filter(item => (item.id || item.productId || item) !== currentProduct.id);
                userCart.push(cartItem);
                if (typeof STORAGE_KEYS !== 'undefined') localStorage.setItem(STORAGE_KEYS.cart, JSON.stringify(userCart));
            }
            
            window.showToast(
                currentLang === 'ar' ? '🛒 تمت الإضافة!' : currentLang === 'en' ? '🛒 Added to Cart!' : '🛒 Ajouté au panier!',
                _pdText('title'),
                'success'
            );
        }
        
        if (typeof updateCartBadge === 'function') updateCartBadge();
        syncHeaderBadges();
        
    } catch (error) {
        console.error('❌ Error with cart:', error);
        showNotification(
            currentLang === 'ar' ? '❌ حدث خطأ' : currentLang === 'en' ? '❌ Error' : '❌ Erreur',
            'error'
        );
    }
};

// ==================== ADD TO WISHLIST ====================
window.addToWishlist = async function(event) {
    console.log('❤️ Add to Wishlist clicked');
    
    try {
        if (event && typeof event.preventDefault === 'function') {
            event.preventDefault();
            event.stopPropagation();
        }
    } catch (e) {
        console.log('⚠️ Event handling skipped');
    }
    
    const user = auth.currentUser;
    
    if (!user) {
        alert(currentLang === 'ar' ? 'يجب تسجيل الدخول أولاً' : currentLang === 'en' ? 'Please login first' : 'Veuillez vous connecter d\'abord');
        sessionStorage.setItem('redirectAfterLogin', window.location.href);
        window.location.href = 'auth.html';
        return;
    }

    if (!currentProduct) {
        alert(currentLang === 'ar' ? 'لم يتم تحميل بيانات المنتج' : currentLang === 'en' ? 'Product data not loaded' : 'Données du produit non chargées');
        return;
    }

    try {
        const isInWishlist = typeof userWishlist !== 'undefined' && userWishlist && userWishlist.some(item => (item.id || item.productId || item) === currentProduct.id);
        const wishlistRef = database.ref(`users/${user.uid}/wishlist/${currentProduct.id}`);

        if (isInWishlist) {
            // Remove from wishlist
            await wishlistRef.remove();

            // Sync with app.js wishlist state
            if (typeof userWishlist !== 'undefined' && userWishlist) {
                userWishlist = userWishlist.filter(item => (item.id || item.productId || item) !== currentProduct.id);
                if (typeof STORAGE_KEYS !== 'undefined') localStorage.setItem(STORAGE_KEYS.wishlist, JSON.stringify(userWishlist));
            }
            updateWishlistStatus();
            syncHeaderBadges();
            if (typeof updateWishlistBadge === 'function') updateWishlistBadge();
            
            window.showToast(
                currentLang === 'ar' ? '💔 تم الإزالة' : currentLang === 'en' ? '💔 Removed' : '💔 Retiré',
                currentLang === 'ar' ? 'تم إزالة المنتج من المفضلة' : currentLang === 'en' ? 'Removed from wishlist' : 'Retiré des favoris',
                'error'
            );
            
        } else {
            // Add to wishlist
            const priceValue = typeof getProductPrice === 'function' ? getProductPrice(currentProduct) : (currentProduct.priceEGP || 0);
            var wishStoredTitle = typeof currentProduct.title === 'string' ? currentProduct.title : (currentProduct.title?.ar || '');
            const wishlistItem = {
                id: currentProduct.id,
                title: wishStoredTitle,
                category: currentProduct.category,
                priceEGP: currentProduct.priceEGP || 0,
                priceUSD: currentProduct.priceUSD || 0,
                image: currentProduct.image || '',
                icon: currentProduct.icon || 'fa-box',
                addedAt: Date.now()
            };

            await wishlistRef.set(wishlistItem);
            
            // Add the price field that app.js expects
            wishlistItem.price = priceValue;
            
            // Sync with app.js wishlist state
            if (typeof userWishlist !== 'undefined' && userWishlist) {
                userWishlist.push(wishlistItem);
                if (typeof STORAGE_KEYS !== 'undefined') localStorage.setItem(STORAGE_KEYS.wishlist, JSON.stringify(userWishlist));
            }
            updateWishlistStatus();
            syncHeaderBadges();
            if (typeof updateWishlistBadge === 'function') updateWishlistBadge();
            
            window.showToast(
                currentLang === 'ar' ? '❤️ تمت الإضافة' : currentLang === 'en' ? '❤️ Added' : '❤️ Ajouté',
                currentLang === 'ar' ? 'تمت الإضافة للمفضلة' : currentLang === 'en' ? 'Added to wishlist' : 'Ajouté aux favoris',
                'success'
            );
        }
        
    } catch (error) {
        console.error('❌ Error with wishlist:', error);
        showNotification(
            currentLang === 'ar' ? '❌ حدث خطأ' : currentLang === 'en' ? '❌ Error occurred' : '❌ Erreur survenue',
            'error'
        );
    }
};

// ==================== SHARE FUNCTIONS ====================
window.shareProduct = function() {
    const url = window.location.href;
    const text = `${_pdText('title')} - BRAVO Store`;
    
    if (navigator.share) {
        navigator.share({
            title: _pdText('title'),
            text: text,
            url: url
        }).catch(() => {});
    } else {
        copyProductLink();
    }
};

window.shareOnTwitter = function() {
    const url = encodeURIComponent(window.location.href);
    const text = encodeURIComponent(_pdText('title'));
    window.open(`https://twitter.com/intent/tweet?url=${url}&text=${text}`, '_blank', 'width=600,height=400');
};

window.shareOnTelegram = function() {
    const url = encodeURIComponent(window.location.href);
    const text = encodeURIComponent(_pdText('title'));
    window.open(`https://t.me/share/url?url=${url}&text=${text}`, '_blank');
};

window.copyProductLink = function() {
    const url = window.location.href;
    
    if (navigator.clipboard) {
        navigator.clipboard.writeText(url).then(() => {
            showNotification(currentLang === 'ar' ? 'تم نسخ الرابط!' : currentLang === 'en' ? 'Link Copied!' : 'Lien copié!', 'success');
        });
    } else {
        const textarea = document.createElement('textarea');
        textarea.value = url;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
        showNotification(currentLang === 'ar' ? 'تم نسخ الرابط!' : currentLang === 'en' ? 'Link Copied!' : 'Lien copié!', 'success');
    }
};

// ==================== NOTIFICATION SYSTEM ====================
function showNotification(message, type = 'info') {
    if (typeof window.showToast === 'function') {
        const icons = { success: '✅', error: '❌', info: 'ℹ️', warning: '⚠️' };
        const names = { success: 'Success', error: 'Error', info: 'Info', warning: 'Warning' };
        const namesAr = { success: 'تم', error: 'خطأ', info: 'تنبيه', warning: 'تحذير' };
        const namesFr = { success: 'Succès', error: 'Erreur', info: 'Info', warning: 'Avertissement' };
        const t = typeof currentLang !== 'undefined' && currentLang === 'ar' ? namesAr[type] || 'تنبيه' : currentLang === 'en' ? names[type] || 'Info' : namesFr[type] || 'Info';
        window.showToast(`${icons[type] || 'ℹ️'} ${t}`, message, type);
        return;
    }
    // Fallback inline notification
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 30px;
        padding: 20px 30px;
        background: ${type === 'success' ? 'linear-gradient(135deg, #10b981, #059669)' : 
                     type === 'error' ? 'linear-gradient(135deg, #ef4444, #dc2626)' : 
                     'linear-gradient(135deg, #9333ea, #c026d3)'};
        color: white;
        border-radius: 15px;
        font-weight: 700;
        font-size: 1.1em;
        z-index: 10001;
        box-shadow: 0 10px 30px rgba(0,0,0,0.3);
        animation: slideInRight 0.5s ease;
        font-family: 'Cairo', sans-serif;
    `;
    
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.5s ease';
        setTimeout(() => notification.remove(), 500);
    }, 3000);
}

// ==================== LANGUAGE FUNCTIONS ====================
window.toggleLanguage = function() {
    var langs = ['ar','en','fr'];
    currentLang = langs[(langs.indexOf(currentLang) + 1) % langs.length];
    document.documentElement.lang = currentLang;
    document.documentElement.dir = currentLang === 'ar' ? 'rtl' : 'ltr';
    
    localStorage.setItem('bravoLang', currentLang);
    applyLanguage();
    
    if (currentProduct) {
        displayProduct();
    }
};

function applyLanguage() {
    document.querySelectorAll('[data-ar]').forEach(element => {
        if (element.id === 'productTitle' || element.id === 'fullDescription' || element.id === 'breadcrumbProduct' || element.id === 'breadcrumbCategoryText' || element.id === 'productDescription') return;
        element.textContent = element.getAttribute(`data-${currentLang}`);
    });
    
    document.querySelectorAll('[data-ar-placeholder]').forEach(element => {
        element.placeholder = element.getAttribute(`data-${currentLang}-placeholder`);
    });
}

// Load saved language
const savedLang = localStorage.getItem('bravoLang');
if (savedLang) {
    currentLang = savedLang;
    document.documentElement.lang = currentLang;
    document.documentElement.dir = currentLang === 'ar' ? 'rtl' : 'ltr';
}

// ==================== TAB SYSTEM ====================
window.switchTab = function(tabName) {
    document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
    document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));
    
    const activeBtn = document.querySelector(`.tab-btn[onclick*="${tabName}"]`);
    if (activeBtn) activeBtn.classList.add('active');
    const targetTab = document.getElementById(tabName + 'Tab');
    if (targetTab) targetTab.classList.add('active');

    const detailsSection = document.querySelector('.details-section');
    if (detailsSection) {
        detailsSection.scrollIntoView({ 
            behavior: 'smooth', 
            block: 'nearest' 
        });
    }
};

// ==================== FAQ ACCORDION ====================
window.toggleFAQ = function(element) {
    const faqItem = element.closest('.faq-item');
    if (!faqItem) return;
    
    const wasActive = faqItem.classList.contains('active');
    
    document.querySelectorAll('.faq-item').forEach(item => {
        item.classList.remove('active');
    });
    
    if (!wasActive) {
        faqItem.classList.add('active');
    }
};

// ==================== INSTANT LOCAL CACHE LOAD ====================
function loadFromLocalCacheSync(productId) {
    try {
        var localDb = JSON.parse(localStorage.getItem('bravo_local_db') || '{}');
        if (localDb.products && localDb.products[productId]) {
            return { ...localDb.products[productId], id: productId };
        }
    } catch(e) {}
    return null;
}

// ==================== INITIALIZE ====================
window.displayProduct = displayProduct;
window.addEventListener('DOMContentLoaded', async () => {
    var urlParams = new URLSearchParams(window.location.search);
    var productId = urlParams.get('id');

    // 1. فوري: عرض من localStorage قبل Firebase
    if (productId) {
        var cachedProduct = loadFromLocalCacheSync(productId);
        if (cachedProduct) {
            currentProduct = cachedProduct;
            window.currentProduct = currentProduct;
            displayProduct();
            applyLanguage();
        }
    }

    // 2. تحميل من Firebase في الخلفية وتحديث إذا اختلف
    waitForFirebase().then(async () => {
        await detectUserLocation();
        await loadProduct();

        if (currentProduct) {
            displayProduct();
            applyLanguage();
            if (auth && auth.currentUser) {
                if (typeof updateUIWithUser === 'function') updateUIWithUser(auth.currentUser);
            } else {
                if (typeof updateUIForGuest === 'function') updateUIForGuest();
            }
            if (window.currentLang !== 'ar') {
                doBackgroundTranslation();
            }
            var _bp = document.getElementById('breadcrumbProduct');
            if (_bp) _bp.textContent = _pdText('title');
            var _bct = document.getElementById('breadcrumbCategoryText');
            if (_bct && currentProduct.category) {
                var _cats = window.APP_CONFIG?.categories;
                _bct.textContent = (_cats?.[currentLang]?.[currentProduct.category] || currentProduct.category);
            }
        }
    });
});

async function doBackgroundTranslation() {
    if (!currentProduct || typeof window._translateTextArTo !== 'function') return;
    var titleAr = typeof currentProduct.title === 'object' ? (currentProduct.title?.ar || '') : (typeof currentProduct.title === 'string' ? currentProduct.title : '');
    var descAr = typeof currentProduct.description === 'object' ? (currentProduct.description?.ar || '') : (typeof currentProduct.description === 'string' ? currentProduct.description : '');
    if (titleAr && _isArabic(titleAr)) {
        var newTitleEn = await _translateTextArTo(titleAr, 'en');
        var newTitleFr = await _translateTextArTo(titleAr, 'fr');
        if (typeof currentProduct.title === 'object') {
            if (newTitleEn) currentProduct.title.en = newTitleEn;
            if (newTitleFr) currentProduct.title.fr = newTitleFr;
        } else {
            currentProduct.title = { ar: titleAr, en: newTitleEn || titleAr, fr: newTitleFr || titleAr };
        }
    }
    if (descAr && _isArabic(descAr)) {
        var newDescEn = await _translateTextArTo(descAr, 'en');
        var newDescFr = await _translateTextArTo(descAr, 'fr');
        if (typeof currentProduct.description === 'object') {
            if (newDescEn) currentProduct.description.en = newDescEn;
            if (newDescFr) currentProduct.description.fr = newDescFr;
        } else {
            currentProduct.description = { ar: descAr, en: newDescEn || descAr, fr: newDescFr || descAr };
        }
    }
    displayProduct();
    loadRelatedProducts();
}

// Reposition badges on resize
window.addEventListener('resize', function() {
    var img = document.getElementById('mainImage');
    if (img) positionPdBadges(img);
});

console.log('✅ Product Details JavaScript Loaded');

// ==================== ACTIVE NAV LINK ====================
setTimeout(function() {
    document.querySelectorAll('header a[role="menuitem"]').forEach(function(a){ a.classList.remove('active'); a.removeAttribute('aria-current'); });
    var pl = document.querySelector('header .nav-item-product-details a');
    if (pl) { pl.classList.add('active'); pl.setAttribute('aria-current', 'page'); }
}, 100);