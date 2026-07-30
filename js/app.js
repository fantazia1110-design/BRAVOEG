// ==================== BRAVO STORE - COMPLETE APPLICATION ====================
// All-in-one JavaScript file with FULL Admin Login System
// ✅ Enhanced: Cart, Wishlist, Ratings, Discounts, Badges, Quick View

// ==================== FIREBASE CONFIG ====================
const FIREBASE_CONFIG = {
    apiKey: "AIzaSyARSfRX09EHrwwMvk7q0Y1VOQuvvtFuADc",
    authDomain: "date-c74fc.firebaseapp.com",
    databaseURL: "https://date-c74fc-default-rtdb.firebaseio.com",
    projectId: "date-c74fc",
    storageBucket: "date-c74fc.firebasestorage.app",
    messagingSenderId: "149705983794",
    appId: "1:149705983794:web:257085b8b55b3f31f1b92b",
    measurementId: "G-2GPNF97PEB"
};

// ==================== APP CONSTANTS ====================
let APP_CONFIG = {
    defaultLanguage: 'ar',
    defaultTheme: 'dark',
    defaultCountry: 'EG',
    adminPasscode: 'BRAVO_ali_hossam',
    whatsappNumber: '201012853829',
    supportEmail: 'bravoenergyeg@gmail.com',
    imgbbApiKey: '533ce68054fa8f013b543214a219f800',
    categories: {
        ar: { books: 'كتب', software: 'برامج', formulas: 'تركيبات', courses: 'كورسات' },
        en: { books: 'Books', software: 'Software', formulas: 'Formulas', courses: 'Courses' },
        fr: { books: 'Livres', software: 'Logiciels', formulas: 'Formules', courses: 'Cours' }
    }
};
window.APP_CONFIG = APP_CONFIG;

let ADMIN_CREDENTIALS = {
    username: 'admin',
    password: 'admin'
};

const MAX_LOGIN_ATTEMPTS = 5;

const STORAGE_KEYS = {
    theme: 'bravoTheme',
    lang: 'bravoLang',
    country: 'userCountry',
    user: 'bravoUser',
    cart: 'bravoCart',
    wishlist: 'bravoWishlist',
    ordersCount: 'bravoOrdersCount',
    adminSession: 'bravoAdminSession'
};

// ==================== PAYMENT ACCOUNTS ====================
let PAYMENT_ACCOUNTS = {
    exchange: {
        name: { ar: 'مكتب صرافة', en: 'Exchange Office', fr: 'Bureau de change' },
        logo: 'https://cdn-icons-png.flaticon.com/512/2830/2830284.png',
        instructions: {
            ar: ['اذهب لأقرب مكتب صرافة', 'اطلب تحويل باسم المستلم المذكور', 'ادفع المبلغ المطلوب نقداً', 'احتفظ بالإيصال وصوره وأرفقه أدناه'],
            en: ['Go to the nearest exchange office', 'Request transfer to mentioned receiver', 'Pay the required amount in cash', 'Keep receipt, photo and upload below'],
            fr: ['Allez au bureau de change le plus proche', 'Demandez un virement au bénéficiaire indiqué', 'Payez le montant requis en espèces', 'Conservez le reçu, photographiez-le et téléchargez-le ci-dessous']
        },
        receiverName: 'HOSSAM KHALAF KAMAL MUSTAFA',
        country: 'مصر / Egypt',
        phoneNumber: '01012853829'
    },
    vodafone: {
        name: { ar: 'فودافون كاش', en: 'Vodafone Cash', fr: 'Vodafone Cash' },
        logo: 'https://i.ibb.co/cG2DBGb/18161202786386202508050126592659.jpg',
        instructions: {
            ar: ['اطلب *9* من هاتفك فودافون', 'اختر "تحويل رصيد"', 'أدخل الرقم المذكور أدناه', 'أكمل التحويل وصور الشاشة وأرفقها'],
            en: ['Dial *9* from your Vodafone phone', 'Choose "Transfer Credit"', 'Enter number below', 'Complete transfer, screenshot and upload'],
            fr: ['Composez le *9* depuis votre téléphone Vodafone', 'Choisissez "Transfert de crédit"', 'Entrez le numéro ci-dessous', 'Effectuez le transfert, capture d\'écran et téléchargez']
        },
        phoneNumber: '01012853829',
        accountName: 'علي خلف كمال مصطفي'
    },
    paypal: {
        name: { ar: 'بايبال', en: 'PayPal', fr: 'PayPal' },
        logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/PayPal.svg/512px-PayPal.svg.png',
        instructions: {
            ar: ['افتح حساب PayPal الخاص بك', 'اختر "إرسال أموال"', 'أدخل البريد الإلكتروني المذكور', 'صور إثبات التحويل وأرفقه'],
            en: ['Open your PayPal account', 'Choose "Send Money"', 'Enter mentioned email', 'Screenshot proof and upload'],
            fr: ['Ouvrez votre compte PayPal', 'Choisissez "Envoyer de l\'argent"', 'Entrez l\'e-mail indiqué', 'Capture d\'écran et téléchargez']
        },
        email: 'aligedo29@yahoo.com'
    },
    binance: {
        name: { ar: 'بينانس', en: 'Binance', fr: 'Binance' },
        logo: 'https://cryptologos.cc/logos/binance-coin-bnb-logo.png',
        instructions: {
            ar: ['افتح تطبيق Binance', 'اختر "Pay" أو "Transfer"', 'استخدم Binance ID أو عنوان المحفظة', 'صور إثبات التحويل وأرفقه'],
            en: ['Open Binance app', 'Choose "Pay" or "Transfer"', 'Use Binance ID or wallet address', 'Screenshot proof and upload'],
            fr: ['Ouvrez l\'application Binance', 'Choisissez "Pay" ou "Transfer"', 'Utilisez l\'ID Binance ou l\'adresse du portefeuille', 'Capture d\'écran et téléchargez']
        },
        binanceID: '302866313',
        walletAddress: 'TEZhhtR2d27mTDQWqafP2DcaMd6Kwi9ggX',
        qrCode: 'https://i.ibb.co/MDYMcDZr/Whats-App-Image-2025-12-12-at-00-42-53-a5918b08.jpg'
    },
    bank: {
        name: { ar: 'تحويل بنكي', en: 'Bank Transfer', fr: 'Virement bancaire' },
        logo: 'https://i.ibb.co/3tvyBq9/png-clipart-bank-logo-euro-truck-simulator-2-bank-loan-finance-banks-pattern-building-investment-thu.png',
        instructions: {
            ar: ['قم بتحويل بنكي من أي بنك', 'استخدم رقم الحساب أو IBAN', 'أرسل إيصال التحويل', 'صور الإيصال وأرفقه أدناه'],
            en: ['Make bank transfer from any bank', 'Use account number or IBAN', 'Send transfer receipt', 'Photo receipt and upload below'],
            fr: ['Effectuez un virement bancaire depuis n\'importe quelle banque', 'Utilisez le numéro de compte ou IBAN', 'Envoyez le reçu de virement', 'Prenez le reçu en photo et téléchargez-le ci-dessous']
        },
        accountNumber: '4640111000018403',
        iban: 'EG630002046404640111000018403',
        accountName: 'علي خلف كمال مصطفي'
    },
    western: {
        name: { ar: 'ويسترن يونيون', en: 'Western Union', fr: 'Western Union' },
        logo: 'https://i.ibb.co/ZswZBGG/png-clipart-western-union-money-electronic-funds-transfer-bank-business-bank-text-service.png',
        instructions: {
            ar: ['اذهب لأقرب فرع Western Union', 'قدم بيانات المستلم المذكورة', 'ادفع المبلغ المطلوب', 'احتفظ برقم MTCN وصور الإيصال'],
            en: ['Go to nearest Western Union branch', 'Provide mentioned receiver details', 'Pay required amount', 'Keep MTCN number and photo receipt'],
            fr: ['Allez à l\'agence Western Union la plus proche', 'Fournissez les coordonnées du bénéficiaire', 'Payez le montant requis', 'Gardez le numéro MTCN et photographiez le reçu']
        },
        receiverName: 'HOSSAM KHALAF KAMAL MUSTAFA',
        country: 'مصر / Egypt',
        phoneNumber: '01012853829'
    },
    moneygram: {
        name: { ar: 'موني جرام', en: 'MoneyGram', fr: 'MoneyGram' },
        logo: 'https://i.ibb.co/7JWRmKY7/unnamed.png',
        instructions: {
            ar: ['اذهب لأقرب فرع MoneyGram', 'قدم بيانات المستلم المذكورة', 'ادفع المبلغ المطلوب', 'احتفظ برقم المرجع وصور الإيصال'],
            en: ['Go to nearest MoneyGram branch', 'Provide mentioned receiver details', 'Pay required amount', 'Keep reference number and photo receipt'],
            fr: ['Allez à l\'agence MoneyGram la plus proche', 'Fournissez les coordonnées du bénéficiaire', 'Payez le montant requis', 'Gardez le numéro de référence et photographiez le reçu']
        },
        receiverName: 'HOSSAM KHALAF KAMAL MUSTAFA',
        country: 'مصر / Egypt',
        phoneNumber: '01012853829'
    },
    instapay: {
        name: { ar: 'إنستاباي', en: 'InstaPay', fr: 'InstaPay' },
        logo: 'https://i.ibb.co/VpmBR3jc/19-2024-638683406312773338-277.jpg',
        instructions: {
            ar: ['افتح تطبيق البنك الخاص بك', 'اختر InstaPay', 'أدخل رقم الموبايل المذكور', 'صور إثبات التحويل وأرفقه'],
            en: ['Open your bank app', 'Choose InstaPay', 'Enter mentioned mobile number', 'Screenshot proof and upload'],
            fr: ['Ouvrez votre application bancaire', 'Choisissez InstaPay', 'Entrez le numéro de mobile indiqué', 'Capture d\'écran et téléchargez']
        },
        phoneNumber: '01012853829',
        accountName: 'علي خلف كمال مصطفي'
    },
    redotpay: {
        name: { ar: 'ريدوت باي', en: 'RedotPay', fr: 'RedotPay' },
        logo: 'https://i.ibb.co/5gcFk2Z7/images.png',
        instructions: {
            ar: ['افتح تطبيق RedotPay', 'اختر "Send"', 'أدخل ID المذكور', 'صور إثبات التحويل وأرفقه'],
            en: ['Open RedotPay app', 'Choose "Send"', 'Enter mentioned ID', 'Screenshot proof and upload'],
            fr: ['Ouvrez l\'application RedotPay', 'Choisissez "Envoyer"', 'Entrez l\'ID indiqué', 'Capture d\'écran et téléchargez']
        },
        redotID: '1100359843'
    }
};
window.PAYMENT_ACCOUNTS = PAYMENT_ACCOUNTS;
window.paymentMethods = {};

// ==================== PAYMENT METHODS MANAGEMENT ====================
window.loadPaymentMethods = async function() {
    try {
        const saved = await DB.get('settings/paymentMethods');
        if (saved && typeof saved === 'object') {
            window.paymentMethods = saved;
            Object.keys(PAYMENT_ACCOUNTS).forEach(k => {
                if (!window.paymentMethods[k]) {
                    window.paymentMethods[k] = { ...PAYMENT_ACCOUNTS[k], id: k };
                } else {
                    window.paymentMethods[k] = { ...PAYMENT_ACCOUNTS[k], ...window.paymentMethods[k], id: k };
                }
            });
        } else {
            window.paymentMethods = {};
            Object.keys(PAYMENT_ACCOUNTS).forEach(k => {
                window.paymentMethods[k] = { ...PAYMENT_ACCOUNTS[k], id: k };
            });
        }
    } catch (e) {
        console.error('Error loading payment methods:', e);
        window.paymentMethods = {};
        Object.keys(PAYMENT_ACCOUNTS).forEach(k => {
            window.paymentMethods[k] = { ...PAYMENT_ACCOUNTS[k], id: k };
        });
    }
    Object.entries(window.paymentMethods).sort((a, b) => (a[1].order || 0) - (b[1].order || 0)).forEach(([k, m], i) => {
        if (m.order === undefined) { m.order = i; }
        if (m.name && m.name.ar && (!m.name.en || m.name.en === m.name.ar) && currentLang !== 'ar') {
            _translateTextArTo(m.name.ar, 'en').then(en => { if (m.name) m.name.en = en; }).catch(() => {});
            _translateTextArTo(m.name.ar, 'fr').then(fr => { if (m.name) m.name.fr = fr; }).catch(() => {});
        }
    });
    renderPaymentMethodsAdmin();
    populatePaymentMethodFilters();
};

function populatePaymentMethodFilters() {
    const payEmojis = { vodafone: '📱', instapay: '⚡', bank: '🏦', binance: '₿', paypal: '💳', cash: '💵', exchange: '💱', western: '🏛️', moneygram: '🏛️', redotpay: '💳' };
    const methods = Object.entries(window.paymentMethods || {}).sort((a, b) => (a[1].order || 0) - (b[1].order || 0));
    const opts = methods.map(([id, m]) => {
        const emoji = payEmojis[id] || '💳';
        return `<option value="${id}">${emoji} ${m.name?.ar || id}</option>`;
    }).join('');
    ['ordersAdvPayment', 'productsAdvPayment'].forEach(id => {
        const sel = document.getElementById(id);
        if (sel) {
            const current = sel.value;
            sel.innerHTML = `<option value="all">${document.documentElement.lang === 'ar' ? '💳 طريقة الدفع (الكل)' : document.documentElement.lang === 'en' ? '💳 Payment Method (All)' : '💳 Mode de paiement (Tous)'}</option>${opts}`;
            if (current !== 'all' && methods.some(([mid]) => mid === current)) sel.value = current;
        }
    });
}
window.populatePaymentMethodFilters = populatePaymentMethodFilters;

window.renderPaymentMethodsAdmin = function() {
    const container = document.getElementById('paymentMethodsAdminContainer');
    if (!container) return;
    const methods = Object.entries(window.paymentMethods).sort((a, b) => (a[1].order || 0) - (b[1].order || 0));
    if (!methods.length) {
        container.innerHTML = `<p style="color:var(--text-secondary);text-align:center;padding:40px;">${document.documentElement.lang === 'ar' ? 'لا توجد بوابات دفع. أضف بوابة جديدة.' : document.documentElement.lang === 'en' ? 'No payment gateways. Add a new one.' : 'Aucune passerelle de paiement. Ajoutez-en une nouvelle.'}</p>`;
        return;
    }
    const _pmtLang = document.documentElement.lang || 'ar';
    const _pmtEdit = _pmtLang === 'ar' ? 'تعديل' : _pmtLang === 'en' ? 'Edit' : 'Modifier';
    const _pmtDel = _pmtLang === 'ar' ? 'حذف' : _pmtLang === 'en' ? 'Delete' : 'Supprimer';
    let html = '<div class="wp-grid" style="display:grid;grid-template-columns:repeat(auto-fill,minmax(360px,1fr));gap:16px;">';
    methods.forEach(([id, m]) => {
        const active = m.active !== false;
        html += '\n<div class="wp-card" data-payment-id="' + id + '" style="opacity:' + (active ? '1' : '0.5') + ';border:2px solid ' + (active ? 'rgba(147,51,234,0.5)' : 'rgba(100,100,100,0.2)') + ';border-radius:16px;padding:20px;background:linear-gradient(135deg,rgba(147,51,234,0.05),rgba(30,15,50,0.5));">' +
            '<div style="display:flex;align-items:flex-start;gap:16px;margin-bottom:16px;">' +
                '<img src="' + (m.logo || '') + '" style="width:100px;height:100px;border-radius:18px;object-fit:contain;background:rgba(255,255,255,0.08);padding:10px;border:2px solid ' + (active ? 'rgba(147,51,234,0.3)' : 'rgba(100,100,100,0.15)') + ';" onerror="this.src=\'https://cdn-icons-png.flaticon.com/512/2830/2830284.png\'">' +
                '<div style="flex:1;min-width:0;">' +
                    '<h3 style="margin:0 0 4px 0;font-size:1.3em;font-weight:900;color:#fff;">' + (m.name?.ar || id) + '</h3>' +
                    '<div style="font-size:0.85em;font-weight:700;color:#fff;">ID: ' + id + ' | ' + (m.name?.en || '') + '</div>' +
                '</div>' +
                '<div style="display:flex;flex-direction:column;gap:4px;flex-shrink:0;">' +
                    '<button onclick="movePaymentUp(\'' + id + '\')" style="padding:4px 8px;border-radius:6px;background:rgba(147,51,234,0.2);color:#a78bfa;border:1px solid rgba(147,51,234,0.3);cursor:pointer;font-size:14px;font-weight:900;line-height:1;transition:all 0.2s;" onmouseover="this.style.background=\'rgba(147,51,234,0.4)\'" onmouseout="this.style.background=\'rgba(147,51,234,0.2)\'">▲</button>' +
                    '<button onclick="movePaymentDown(\'' + id + '\')" style="padding:4px 8px;border-radius:6px;background:rgba(147,51,234,0.2);color:#a78bfa;border:1px solid rgba(147,51,234,0.3);cursor:pointer;font-size:14px;font-weight:900;line-height:1;transition:all 0.2s;" onmouseover="this.style.background=\'rgba(147,51,234,0.4)\'" onmouseout="this.style.background=\'rgba(147,51,234,0.2)\'">▼</button>' +
                '</div>' +
                '<div class="toggle-switch ' + (active ? 'active' : '') + '" style="flex-shrink:0;transform:scale(1.2);" onclick="togglePaymentStatus(\'' + id + '\')"></div>' +
            '</div>' +
            '<div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;">' +
                '<button onclick="openEditPaymentModal(\'' + id + '\')" style="padding:14px 10px;border-radius:12px;background:linear-gradient(135deg,rgba(147,51,234,0.25),rgba(147,51,234,0.15));color:#fff;border:2px solid rgba(147,51,234,0.4);cursor:pointer;font-weight:900;font-size:15px;transition:all 0.3s ease;" onmouseover="this.style.background=\'linear-gradient(135deg,rgba(147,51,234,0.4),rgba(147,51,234,0.25))\';this.style.transform=\'translateY(-1px)\';this.style.boxShadow=\'0 6px 20px rgba(147,51,234,0.3)\'" onmouseout="this.style.background=\'linear-gradient(135deg,rgba(147,51,234,0.25),rgba(147,51,234,0.15))\';this.style.transform=\'none\';this.style.boxShadow=\'none\'"><i class="fas fa-edit"></i> ' + _pmtEdit + '</button>' +
                '<button onclick="deletePaymentMethod(\'' + id + '\')" style="padding:14px 10px;border-radius:12px;background:linear-gradient(135deg,rgba(239,68,68,0.2),rgba(239,68,68,0.1));color:#fff;border:2px solid rgba(239,68,68,0.35);cursor:pointer;font-weight:900;font-size:15px;transition:all 0.3s ease;" onmouseover="this.style.background=\'linear-gradient(135deg,rgba(239,68,68,0.35),rgba(239,68,68,0.2))\';this.style.transform=\'translateY(-1px)\';this.style.boxShadow=\'0 6px 20px rgba(239,68,68,0.25)\'" onmouseout="this.style.background=\'linear-gradient(135deg,rgba(239,68,68,0.2),rgba(239,68,68,0.1))\';this.style.transform=\'none\';this.style.boxShadow=\'none\'"><i class="fas fa-trash"></i> ' + _pmtDel + '</button>' +
            '</div>' +
        '</div>';
    });
    html += '\n</div>';
    container.innerHTML = html;
    populatePaymentMethodFilters();
};

window.togglePaymentStatus = async function(id) {
    const m = window.paymentMethods[id];
    if (!m) return;
    m.active = m.active === false ? true : false;
    await DB.update(`settings/paymentMethods/${id}`, { active: m.active });
    renderPaymentMethodsAdmin();
};

window.movePaymentUp = async function(id) {
    const sorted = Object.entries(window.paymentMethods).sort((a, b) => (a[1].order || 0) - (b[1].order || 0));
    const idx = sorted.findIndex(([k]) => k === id);
    if (idx <= 0) return;
    [sorted[idx], sorted[idx-1]] = [sorted[idx-1], sorted[idx]];
    sorted.forEach(([k, m], i) => m.order = i);
    const updates = sorted.map(([k]) => DB.update(`settings/paymentMethods/${k}`, { order: window.paymentMethods[k].order }));
    await Promise.all(updates);
    renderPaymentMethodsAdmin();
};

window.movePaymentDown = async function(id) {
    const sorted = Object.entries(window.paymentMethods).sort((a, b) => (a[1].order || 0) - (b[1].order || 0));
    const idx = sorted.findIndex(([k]) => k === id);
    if (idx < 0 || idx >= sorted.length - 1) return;
    [sorted[idx], sorted[idx+1]] = [sorted[idx+1], sorted[idx]];
    sorted.forEach(([k, m], i) => m.order = i);
    const updates = sorted.map(([k]) => DB.update(`settings/paymentMethods/${k}`, { order: window.paymentMethods[k].order }));
    await Promise.all(updates);
    renderPaymentMethodsAdmin();
};

// ==================== PAYMENT FIELD TRANSLATIONS ====================
const PAYMENT_FIELD_LABELS = {
    username: { ar: 'اسم المستخدم', en: 'Username' },
    accountName: { ar: 'اسم الحساب', en: 'Account Name' },
    phoneNumber: { ar: 'رقم الهاتف', en: 'Phone Number' },
    accountNumber: { ar: 'رقم الحساب', en: 'Account Number' },
    iban: { ar: 'IBAN الحساب', en: 'IBAN' }
};

const STANDARD_FIELDS = ['username', 'accountName', 'phoneNumber', 'accountNumber', 'iban'];

// ==================== LOGO UPLOAD ====================
window.uploadPaymentLogo = function(fileInputId, hiddenInputId, previewId) {
    const input = document.getElementById(fileInputId);
    const preview = document.getElementById(previewId);
    const hidden = document.getElementById(hiddenInputId);
    if (!input || !input.files || !input.files[0]) return;
    const file = input.files[0];
    if (file.size > 2 * 1024 * 1024) { showToast('❌', (document.documentElement.lang === 'ar' ? 'الحد الأقصى 2 ميجابايت' : document.documentElement.lang === 'en' ? 'Max 2 MB' : 'Max 2 Mo'), 'error'); input.value = ''; return; }
    if (!file.type.startsWith('image/')) { showToast('❌', (document.documentElement.lang === 'ar' ? 'يُسمح بالصور فقط' : document.documentElement.lang === 'en' ? 'Images only' : 'Images uniquement'), 'error'); input.value = ''; return; }
    if (preview) { preview.src = URL.createObjectURL(file); preview.style.display = 'block'; }
    const reader = new FileReader();
    reader.onload = function() {
        const dataUrl = reader.result;
        if (hidden) hidden.value = dataUrl;
    };
    reader.readAsDataURL(file);
};

window.openAddPaymentModal = function() {
    document.getElementById('addPaymentId').value = '';
    document.getElementById('addPaymentNameAr').value = '';
    document.getElementById('addPaymentLogo').value = '';
    const preview = document.getElementById('addPaymentLogoPreview');
    if (preview) { preview.src = ''; preview.style.display = 'none'; }
    const input = document.getElementById('addPaymentLogoInput');
    if (input) input.value = '';
    document.getElementById('addPaymentInstructionsAr').value = '';
    document.getElementById('addPaymentQr').value = '';
    const qrPreview = document.getElementById('addPaymentQrPreview');
    if (qrPreview) { qrPreview.src = ''; qrPreview.style.display = 'none'; }
    const qrToggle = document.getElementById('addPaymentQrToggle');
    if (qrToggle) qrToggle.classList.add('active');
    const container = document.getElementById('addPaymentFieldsContainer');
    if (container) {
        container.innerHTML = '';
        STANDARD_FIELDS.forEach(key => {
            const label = PAYMENT_FIELD_LABELS[key];
            addAddFieldRow(key, label?.ar || key, '', false);
        });
    }
    const addModal = document.getElementById('addPaymentModal');
    addModal.classList.add('active');
    if (!addModal.hasAttribute('data-close-outside')) {
        addModal.addEventListener('click', function(e) { if (e.target === this) closeAddPaymentModal(); });
        addModal.setAttribute('data-close-outside', '1');
    }
};

window.addAddFieldRow = function(key, labelAr, value, active) {
    const container = document.getElementById('addPaymentFieldsContainer');
    if (!container) return;
    const uid = '_af_' + Date.now() + '_' + Math.random().toString(36).slice(2,6);
    const row = document.createElement('div');
    row.id = uid;
    const isActive = active !== false;
    row.style.cssText = 'display:flex;align-items:center;gap:14px;padding:14px 18px;background:' + (isActive ? 'rgba(255,255,255,0.04)' : 'rgba(255,255,255,0.015)') + ';border:1px solid ' + (isActive ? 'rgba(147,51,234,0.2)' : 'rgba(100,100,100,0.1)') + ';border-radius:14px;opacity:' + (isActive ? '1' : '0.55') + ';';
    row.innerHTML = '<div class="toggle-switch ' + (isActive ? 'active' : '') + '" onclick="this.classList.toggle(\'active\');var p=this.parentElement;if(this.classList.contains(\'active\')){p.style.opacity=\'1\';p.style.background=\'rgba(255,255,255,0.04)\';p.style.borderColor=\'rgba(147,51,234,0.2)\'}else{p.style.opacity=\'0.55\';p.style.background=\'rgba(255,255,255,0.015)\';p.style.borderColor=\'rgba(100,100,100,0.1)\'}" style="flex-shrink:0;transform:scale(0.9);" data-field-active></div>' +
        '<span style="flex:0 0 130px;font-weight:900;font-size:15px;color:#e2e8f0;">' + (labelAr || '') + '</span>' +
        '<input type="text" placeholder="' + (document.documentElement.lang === 'ar' ? 'القيمة' : document.documentElement.lang === 'en' ? 'Value' : 'Valeur') + '" value="' + (value || '') + '" style="flex:1;padding:10px 14px;border-radius:10px;border:1px solid rgba(147,51,234,0.25);background:rgba(0,0,0,0.25);color:#fff;font-weight:700;font-size:14px;min-width:0;" data-field-value>' +
        '<input type="hidden" data-field-key value="' + (key || '') + '">' +
        '<input type="hidden" data-field-labelar value="' + (labelAr || '') + '">';
    container.appendChild(row);
};

window.closeAddPaymentModal = function() {
    document.getElementById('addPaymentModal').classList.remove('active');
};

window.submitAddPaymentForm = async function() {
    const id = document.getElementById('addPaymentId').value.trim();
    if (!id) return showToast('❌', (document.documentElement.lang === 'ar' ? 'يرجى إدخال المعرف' : document.documentElement.lang === 'en' ? 'Please enter an ID' : 'Veuillez entrer un identifiant'), 'error');
    if (window.paymentMethods[id]) return showToast('❌', (document.documentElement.lang === 'ar' ? 'هذا المعرف موجود بالفعل' : document.documentElement.lang === 'en' ? 'This ID already exists' : 'Cet identifiant existe déjà'), 'error');
    const nameAr = document.getElementById('addPaymentNameAr').value.trim();
    if (!nameAr) return showToast('❌', (document.documentElement.lang === 'ar' ? 'يرجى إدخال اسم طريقة الدفع' : document.documentElement.lang === 'en' ? 'Please enter payment method name' : 'Veuillez entrer le nom du mode de paiement'), 'error');
    const logo = document.getElementById('addPaymentLogo').value.trim();
    if (!logo) return showToast('❌', (document.documentElement.lang === 'ar' ? 'يرجى رفع صورة طريقة الدفع' : document.documentElement.lang === 'en' ? 'Please upload a payment logo' : 'Veuillez télécharger un logo de paiement'), 'error');
    const instAr = document.getElementById('addPaymentInstructionsAr').value.trim().split('\n').filter(s => s.trim());
    const container = document.getElementById('addPaymentFieldsContainer');
    const details = [];
    if (container) {
        container.querySelectorAll('[id^="_af_"]').forEach(row => {
            const toggle = row.querySelector('[data-field-active]');
            const keyEl = row.querySelector('[data-field-key]');
            const labelArEl = row.querySelector('[data-field-labelar]');
            const valueEl = row.querySelector('[data-field-value]');
            const key = keyEl?.value || '';
            const labAr = labelArEl?.value || '';
            const val = (valueEl?.value || '').trim();
            const labelInfo = PAYMENT_FIELD_LABELS[key] || {};
            details.push({
                key: key || labAr.replace(/\s+/g, '_').toLowerCase(),
                labelAr: labAr || labelInfo.ar || key,
                labelEn: labelInfo.en || labAr || key,
                value: val,
                copyable: true,
                active: toggle ? toggle.classList.contains('active') : true
            });
        });
    }
    if (!details.some(d => d.value)) return showToast('❌', (document.documentElement.lang === 'ar' ? 'يرجى إدخال قيمة واحدة على الأقل' : document.documentElement.lang === 'en' ? 'Please enter at least one value' : 'Veuillez entrer au moins une valeur'), 'error');
    const qrCode = document.getElementById('addPaymentQr')?.value.trim() || '';
    const qrToggle = document.getElementById('addPaymentQrToggle');
    const qrActive = qrToggle ? qrToggle.classList.contains('active') : true;
    const paymentMethod = {
        name: { ar: nameAr, en: nameAr, fr: nameAr },
        logo: logo,
        qrCode: qrCode,
        qrActive: qrActive,
        instructions: { ar: instAr.length ? instAr : ['اتبع التعليمات'], en: instAr.length ? instAr : ['Follow Instructions'], fr: instAr.length ? instAr : ['Suivez les instructions'] },
        details: details,
        active: true,
        order: Object.keys(window.paymentMethods).length
    };
    window.paymentMethods[id] = paymentMethod;
    await DB.set(`settings/paymentMethods/${id}`, paymentMethod);
    closeAddPaymentModal();
    renderPaymentMethodsAdmin();
    showToast('✅', (document.documentElement.lang === 'ar' ? 'تم إضافة البوابة بنجاح' : document.documentElement.lang === 'en' ? 'Gateway added successfully' : 'Passerelle ajoutée avec succès'), 'success');
};

window.openEditPaymentModal = function(id) {
    const m = window.paymentMethods[id];
    if (!m) return;
    document.getElementById('editPaymentId').value = id;
    const display = document.getElementById('editPaymentIdDisplay');
    if (display) display.value = id;
    document.getElementById('editPaymentNameAr').value = m.name?.ar || '';
    document.getElementById('editPaymentLogo').value = m.logo || '';
    const preview = document.getElementById('editPaymentLogoPreview');
    if (preview) preview.src = m.logo || '';
    const input = document.getElementById('editPaymentLogoInput');
    if (input) input.value = '';
    document.getElementById('editPaymentInstructionsAr').value = (m.instructions?.ar || []).join('\n');
    document.getElementById('editPaymentQr').value = m.qrCode || '';
    const qrPreview = document.getElementById('editPaymentQrPreview');
    if (qrPreview) { qrPreview.src = m.qrCode || ''; qrPreview.style.display = m.qrCode ? 'block' : 'none'; }
    const qrToggle = document.getElementById('editPaymentQrToggle');
    if (qrToggle) { qrToggle.classList.toggle('active', m.qrActive !== false); }
    const container = document.getElementById('editPaymentFieldsContainer');
    if (container) {
        container.innerHTML = '';
        const existing = m.details || [];
        const existingMap = {};
        existing.forEach(d => { existingMap[d.key] = d; });
        const fieldsToRender = STANDARD_FIELDS.map(key => {
            const label = PAYMENT_FIELD_LABELS[key];
            const saved = existingMap[key];
            return {
                key: key,
                labelAr: label?.ar || key,
                value: saved?.value || '',
                active: saved && saved.value ? saved.active !== false : false
            };
        });
        fieldsToRender.sort((a, b) => (a.active === false ? 1 : 0) - (b.active === false ? 1 : 0));
        fieldsToRender.forEach(f => addEditFieldRow(f.key, f.labelAr, f.value, f.active));
    }
    const editModal = document.getElementById('editPaymentModal');
    editModal.classList.add('active');
    if (!editModal.hasAttribute('data-close-outside')) {
        editModal.addEventListener('click', function(e) { if (e.target === this) closeEditPaymentModal(); });
        editModal.setAttribute('data-close-outside', '1');
    }
};

window.addEditFieldRow = function(key, labelAr, value, active) {
    const container = document.getElementById('editPaymentFieldsContainer');
    if (!container) return;
    const uid = '_ef_' + Date.now() + '_' + Math.random().toString(36).slice(2,6);
    const row = document.createElement('div');
    row.id = uid;
    const isActive = active !== false;
    row.style.cssText = 'display:flex;align-items:center;gap:14px;padding:14px 18px;background:' + (isActive ? 'rgba(255,255,255,0.04)' : 'rgba(255,255,255,0.015)') + ';border:1px solid ' + (isActive ? 'rgba(147,51,234,0.2)' : 'rgba(100,100,100,0.1)') + ';border-radius:14px;opacity:' + (isActive ? '1' : '0.55') + ';';
    row.innerHTML = '<div class="toggle-switch ' + (isActive ? 'active' : '') + '" onclick="this.classList.toggle(\'active\');var p=this.parentElement;if(this.classList.contains(\'active\')){p.style.opacity=\'1\';p.style.background=\'rgba(255,255,255,0.04)\';p.style.borderColor=\'rgba(147,51,234,0.2)\'}else{p.style.opacity=\'0.55\';p.style.background=\'rgba(255,255,255,0.015)\';p.style.borderColor=\'rgba(100,100,100,0.1)\'}" style="flex-shrink:0;transform:scale(0.9);" data-field-active></div>' +
        '<span style="flex:0 0 130px;font-weight:900;font-size:15px;color:#e2e8f0;">' + (labelAr || '') + '</span>' +
        '<input type="text" placeholder="' + (document.documentElement.lang === 'ar' ? 'القيمة' : document.documentElement.lang === 'en' ? 'Value' : 'Valeur') + '" value="' + (value || '') + '" style="flex:1;padding:10px 14px;border-radius:10px;border:1px solid rgba(147,51,234,0.25);background:rgba(0,0,0,0.25);color:#fff;font-weight:700;font-size:14px;min-width:0;" data-field-value>' +
        '<input type="hidden" data-field-key value="' + (key || '') + '">' +
        '<input type="hidden" data-field-labelar value="' + (labelAr || '') + '">';
    container.appendChild(row);
};

window.closeEditPaymentModal = function() {
    document.getElementById('editPaymentModal').classList.remove('active');
};

window.submitEditPaymentForm = async function() {
    const id = document.getElementById('editPaymentId').value;
    if (!id || !window.paymentMethods[id]) return showToast('❌', (document.documentElement.lang === 'ar' ? 'خطأ' : document.documentElement.lang === 'en' ? 'Error' : 'Erreur'), 'error');
    const nameAr = document.getElementById('editPaymentNameAr').value.trim();
    if (!nameAr) return showToast('❌', (document.documentElement.lang === 'ar' ? 'يرجى إدخال اسم طريقة الدفع' : document.documentElement.lang === 'en' ? 'Please enter payment method name' : 'Veuillez entrer le nom du mode de paiement'), 'error');
    const logo = document.getElementById('editPaymentLogo').value.trim();
    const instAr = document.getElementById('editPaymentInstructionsAr').value.trim().split('\n').filter(s => s.trim());
    const container = document.getElementById('editPaymentFieldsContainer');
    const details = [];
    if (container) {
        container.querySelectorAll('[id^="_ef_"]').forEach(row => {
            const toggle = row.querySelector('[data-field-active]');
            const keyEl = row.querySelector('[data-field-key]');
            const labelArEl = row.querySelector('[data-field-labelar]');
            const valueEl = row.querySelector('[data-field-value]');
            const key = keyEl?.value || '';
            const labAr = labelArEl?.value || '';
            const val = (valueEl?.value || '').trim();
            const labelInfo = PAYMENT_FIELD_LABELS[key] || {};
            details.push({
                key: key || labAr.replace(/\s+/g, '_').toLowerCase(),
                labelAr: labAr || labelInfo.ar || key,
                labelEn: labelInfo.en || labAr || key,
                value: val,
                copyable: true,
                active: toggle ? toggle.classList.contains('active') : true
            });
        });
    }
    const qrCode = document.getElementById('editPaymentQr')?.value.trim() || '';
    const qrToggle = document.getElementById('editPaymentQrToggle');
    const qrActive = qrToggle ? qrToggle.classList.contains('active') : true;
    const update = {
        name: { ar: nameAr, en: nameAr, fr: nameAr },
        logo: logo,
        qrCode: qrCode,
        qrActive: qrActive,
        instructions: { ar: instAr.length ? instAr : ['اتبع التعليمات'], en: instAr.length ? instAr : ['Follow Instructions'], fr: instAr.length ? instAr : ['Suivez les instructions'] },
        details: details
    };
    window.paymentMethods[id] = { ...window.paymentMethods[id], ...update };
    await DB.update(`settings/paymentMethods/${id}`, update);
    closeEditPaymentModal();
    renderPaymentMethodsAdmin();
    showToast('✅', (document.documentElement.lang === 'ar' ? 'تم حفظ التغييرات' : document.documentElement.lang === 'en' ? 'Changes saved' : 'Modifications sauvegardées'), 'success');
    (async function() {
        try {
            const [enName, frName] = await Promise.all([_translateTextArTo(nameAr, 'en'), _translateTextArTo(nameAr, 'fr')]);
            update.name.en = enName;
            update.name.fr = frName;
            if (instAr.length) {
                const [enInst, frInst] = await Promise.all([_translateTextArTo(instAr.join('\n'), 'en'), _translateTextArTo(instAr.join('\n'), 'fr')]);
                update.instructions.en = enInst.split('\n').filter(s => s.trim());
                update.instructions.fr = frInst.split('\n').filter(s => s.trim());
            }
            window.paymentMethods[id] = { ...window.paymentMethods[id], ...update };
            await DB.update(`settings/paymentMethods/${id}`, update);
        } catch (e) { console.warn('Auto-translate payment failed:', e); }
    })();
};

window.deletePaymentMethod = async function(id) {
    if (!window.paymentMethods[id]) return;
    if (!confirm(`${document.documentElement.lang === 'ar' ? 'هل أنت متأكد من حذف' : document.documentElement.lang === 'en' ? 'Are you sure you want to delete' : 'Êtes-vous sûr de vouloir supprimer'} "${window.paymentMethods[id].name?.ar || id}"?`)) return;
    delete window.paymentMethods[id];
    try { await DB.remove(`settings/paymentMethods/${id}`); } catch(e) {}
    renderPaymentMethodsAdmin();
    showToast('🗑️', (document.documentElement.lang === 'ar' ? 'تم الحذف' : document.documentElement.lang === 'en' ? 'Deleted' : 'Supprimé'), 'info');
};

const SYSTEM_PAGES = [
    { id: 'index', title: 'الرئيسية', slug: 'index.html', type: 'أساسية' },
    { id: 'products', title: 'المنتجات', slug: 'products.html', type: 'أرشيف' },
    { id: 'product-details', title: 'تفاصيل المنتج', slug: 'product-details.html', type: 'ديناميكية' },
    { id: 'about', title: 'من نحن', slug: 'about.html', type: 'معلومات' },
    { id: 'contact', title: 'تواصل معنا', slug: 'contact.html', type: 'تفاعل' },
    { id: 'cart', title: 'سلة المشتريات', slug: 'cart.html', type: 'نظام' },
    { id: 'checkout', title: 'إتمام الشراء', slug: 'checkout.html', type: 'نظام' },
    { id: 'wishlist', title: 'المفضلة', slug: 'wishlist.html', type: 'نظام' },
    { id: 'profile', title: 'الملف الشخصي', slug: 'profile.html', type: 'حساب' },
    { id: 'orders', title: 'طلباتي', slug: 'orders.html', type: 'حساب' },
    { id: 'settings', title: 'الإعدادات', slug: 'settings.html', type: 'نظام' },
    { id: 'auth', title: 'المصادقة (تسجيل)', slug: 'auth.html', type: 'نظام' },
    { id: 'login', title: 'تسجيل الدخول', slug: 'login.html', type: 'نظام' },
    { id: 'pending', title: 'قيد المراجعة', slug: 'pending.html', type: 'نظام' },
    { id: 'confirmation', title: 'تأكيد الدفع', slug: 'confirmation.html', type: 'نظام' },
    { id: 'download', title: 'صفحة التحميل', slug: 'download.html', type: 'نظام' },
    { id: '404', title: 'الصفحة غير موجودة', slug: '404.html', type: 'نظام' },
    { id: 'admin', title: 'لوحة التحكم', slug: 'admin.html', type: 'نظام' }
];

// ==================== GLOBAL VARIABLES ====================
let app, database, auth;
let currentUser = null;
window.currentUser = currentUser;
let allProducts = [];
let currentCategory = 'all';
let currentSort = 'newest';
let currentTheme = localStorage.getItem(STORAGE_KEYS.theme) || APP_CONFIG.defaultTheme;
let currentLang = localStorage.getItem(STORAGE_KEYS.lang) || APP_CONFIG.defaultLanguage;
let userCountry = localStorage.getItem(STORAGE_KEYS.country) || APP_CONFIG.defaultCountry;

// ==================== CURRENCY & COUNTRY DETECTION ====================
function getUserCurrency() {
    return userCountry === 'EG' && window._countryFromIP
        ? { country: 'EG', currency: 'EGP', symbol: currentLang === 'ar' ? 'جنيه' : currentLang === 'en' ? 'EGP' : 'EGP' }
        : { country: 'US', currency: 'USD', symbol: 'USD' };
}

function getProductPrice(p) { return userCountry === 'EG' && window._countryFromIP ? (p.priceEGP ?? 0) : (p.priceUSD ?? 0); }
function getProductOldPrice(p) { return userCountry === 'EG' && window._countryFromIP ? (p.oldPriceEGP ?? 0) : (p.oldPriceUSD ?? 0); }
function hasProductDiscount(p) {
    const cp = getProductPrice(p), op = getProductOldPrice(p);
    return op > cp;
}
function formatProductPrice(p) {
    const val = getProductPrice(p), { symbol } = getUserCurrency();
    return `${val} ${symbol}`;
}

async function detectUserCountry() {
    window._countryFromIP = false;
    try {
        const ctrl = new AbortController();
        const tmr = setTimeout(() => ctrl.abort(), 4000);
        const res = await fetch('https://ipapi.co/json/', { signal: ctrl.signal });
        clearTimeout(tmr);
        if (res.ok) {
            const data = await res.json();
            const code = data.country_code || data.country;
            if (code) {
                const prev = userCountry;
                userCountry = code;
                window._countryFromIP = true;
                localStorage.setItem(STORAGE_KEYS.country, userCountry);
                localStorage.setItem(STORAGE_KEYS.country + '_ts', String(Date.now()));
                if (prev !== userCountry && typeof displayProducts === 'function') displayProducts();
                return;
            }
        }
    } catch (e) {
        console.warn('IP detection failed:', e.message);
    }
    const stored = localStorage.getItem(STORAGE_KEYS.country);
    if (stored) { userCountry = stored; return; }
    try {
        const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
        const map = { 'Africa/Cairo':'EG','Africa/Casablanca':'MA','Africa/Tunis':'TN','Africa/Algiers':'DZ','Africa/Khartoum':'SD','Africa/Tripoli':'LY','Africa/Johannesburg':'ZA','Africa/Nairobi':'KE','Africa/Lagos':'NG','Asia/Riyadh':'SA','Asia/Dubai':'AE','Asia/Baghdad':'IQ','Asia/Amman':'JO','Asia/Beirut':'LB','Asia/Damascus':'SY','Asia/Jerusalem':'IL','Asia/Kuwait':'KW','Asia/Manama':'BH','Asia/Muscat':'OM','Asia/Doha':'QA','Asia/Sanaa':'YE','Asia/Tehran':'IR','Asia/Kabul':'AF','Asia/Karachi':'PK','Asia/Colombo':'LK','Asia/Kolkata':'IN','Asia/Dhaka':'BD','Asia/Bangkok':'TH','Asia/Ho_Chi_Minh':'VN','Asia/Singapore':'SG','Asia/Kuala_Lumpur':'MY','Asia/Shanghai':'CN','Asia/Tokyo':'JP','Asia/Seoul':'KR','Europe/London':'GB','Europe/Paris':'FR','Europe/Berlin':'DE','Europe/Madrid':'ES','Europe/Rome':'IT','Europe/Amsterdam':'NL','Europe/Brussels':'BE','Europe/Moscow':'RU','Europe/Istanbul':'TR','Europe/Athens':'GR','Europe/Lisbon':'PT','Europe/Stockholm':'SE','Europe/Oslo':'NO','Europe/Copenhagen':'DK','Europe/Helsinki':'FI','Europe/Dublin':'IE','America/New_York':'US','America/Chicago':'US','America/Denver':'US','America/Los_Angeles':'US','America/Toronto':'CA','America/Vancouver':'CA','America/Mexico_City':'MX','America/Sao_Paulo':'BR','America/Argentina/Buenos_Aires':'AR','America/Santiago':'CL','America/Bogota':'CO','America/Lima':'PE','Australia/Sydney':'AU','Australia/Melbourne':'AU','Australia/Perth':'AU','Pacific/Auckland':'NZ' };
        if (map[tz] === 'EG') {
            userCountry = 'XX';
            localStorage.setItem(STORAGE_KEYS.country, userCountry);
        } else {
            userCountry = map[tz] || 'XX';
            localStorage.setItem(STORAGE_KEYS.country, userCountry);
        }
        localStorage.setItem(STORAGE_KEYS.country + '_ts', String(Date.now()));
    } catch (e2) {}
}
async function getVisitorInfo() {
    const cached = localStorage.getItem('visitorIP');
    const cachedTs = parseInt(localStorage.getItem('visitorIP_ts') || '0');
    if (cached && cachedTs && (Date.now() - cachedTs < 3600000)) {
        return { ip: cached, country: localStorage.getItem(STORAGE_KEYS.country) || 'EG' };
    }
    try {
        const ctrl = new AbortController();
        const tmr = setTimeout(() => ctrl.abort(), 4000);
        const res = await fetch('https://ipapi.co/json/', { signal: ctrl.signal });
        clearTimeout(tmr);
        if (res.ok) {
            const data = await res.json();
            const ip = data.ip || '';
            const country = data.country_code || data.country || 'EG';
            if (ip) { localStorage.setItem('visitorIP', ip); localStorage.setItem('visitorIP_ts', String(Date.now())); }
            return { ip, country };
        }
    } catch(e) {}
    return { ip: '', country: localStorage.getItem(STORAGE_KEYS.country) || 'EG' };
}
if (typeof window !== 'undefined') detectUserCountry();
let activeDropdown = null;
let userNotifications = [];
let userWishlist = [];
let userCart = [];
let selectedPaymentMethod = null;
let uploadedFile = null;
let uploadedImageUrl = '';
let checkoutOrderData = {};
let savedWhatsAppMessage = '';
let loginAttempts = parseInt(sessionStorage.getItem('loginAttempts') || '0');
let lockoutTime = parseInt(sessionStorage.getItem('lockoutTime') || '0');

// ==================== FIREBASE INITIALIZATION ====================
async function initializeFirebase() {
    if (window.firebaseAuthReady) { console.log('🔁 Firebase already fully initialized'); return true; }
    if (window.firebaseDB && typeof window.firebaseDB === 'object') { console.log('🔁 Firebase partial init (DB only), completing with Auth...'); }
    try {
        const _impt = function(url) {
            return Promise.race([
                import(url),
                new Promise(function(_, rej) { setTimeout(function() { rej(new Error('TIMEOUT')); }, 10000); })
            ]);
        };
        const { initializeApp } = await _impt("https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js");
        const { getDatabase, ref, get, set, update, remove, push, onValue, off } = await _impt("https://www.gstatic.com/firebasejs/10.8.0/firebase-database.js");
        const { getAuth, onAuthStateChanged, signOut } = await _impt("https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js");
        const { getStorage, ref: storageRef, uploadBytes, uploadBytesResumable, getDownloadURL } = await _impt("https://www.gstatic.com/firebasejs/10.8.0/firebase-storage.js");
        app = initializeApp(FIREBASE_CONFIG);
        database = getDatabase(app);
        auth = getAuth(app);
        const storage = getStorage(app);
        window.database = database;
        window.firebaseDB = database;
        window.auth = auth;
        window.storage = storage;
        window.firebaseRef = ref; window.firebaseGet = get; window.firebaseSet = set;
        window.firebaseUpdate = update; window.firebaseRemove = remove; window.firebasePush = push;
        window.firebaseOnValue = onValue; window.firebaseOff = off;
        window.firebaseSignOut = signOut; window.firebaseOnAuthStateChanged = onAuthStateChanged;
        window.firebaseStorageRef = storageRef; window.firebaseUploadBytes = uploadBytes;
        window.firebaseUploadBytesResumable = uploadBytesResumable;
        window.firebaseGetDownloadURL = getDownloadURL;
        window.firebaseAuthReady = true;
        console.log('✅ Firebase initialized successfully');
        return true;
    } catch (error) { console.error('❌ Firebase initialization error:', error); return false; }
}

// ==================== DATABASE OPERATIONS ====================
function _dbNotifyListeners(rootKey, localData) {
    if (window.localDBListeners && window.localDBListeners[rootKey]) {
        window.localDBListeners[rootKey].forEach(entry => {
            try {
                let r = localData;
                for (let p of entry.path.split('/')) {
                    if (r && r[p] !== undefined) r = r[p];
                    else { r = null; break; }
                }
                entry.cb(r);
            } catch(err) {
                console.error('Listener error:', err);
            }
        });
    }
}

// ==================== HIDDEN ITEMS SYSTEM (bravo_hidden) ====================
// لستة منفصلة في localStorage بتضمن ان العناصر المحذوفة أو المرسلة للسلة مختفية
// مش بتتأثر بـ Firebase sync لأنها بتتفحص قبل أي معالجة للبيانات
function _getHidden() {
    try { return JSON.parse(localStorage.getItem('bravo_hidden') || '{}'); } catch(e) { return {}; }
}
function _saveHidden(h) {
    localStorage.setItem('bravo_hidden', JSON.stringify(h));
}
function _addHidden(type, id) {
    const h = _getHidden();
    if (!h[type]) h[type] = {};
    h[type][id] = true;
    _saveHidden(h);
}
function _removeHidden(type, id) {
    const h = _getHidden();
    if (h[type]) { delete h[type][id]; _saveHidden(h); }
}
function _isHidden(type, id) {
    const h = _getHidden();
    return !!(h[type] && h[type][id]);
}
function _filterHidden(type, data) {
    if (!data || typeof data !== 'object') return data;
    const h = _getHidden()[type];
    if (!h) return data;
    const result = Array.isArray(data) ? [...data] : { ...data };
    for (const id of Object.keys(h)) {
        if (Array.isArray(result)) {
            const idx = result.findIndex(v => v && (v.id === id || v[0] === id));
            if (idx > -1) result.splice(idx, 1);
        } else {
            delete result[id];
        }
    }
    return result;
}

const DB = {
    ensureAdminAuth: async () => {
        if(!window.firebaseDB) return false;
        if (window._adminAuthFailed) return false;
        try {
            if (!window.adminAuth) {
                const { initializeApp } = await import("https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js");
                const { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } = await import("https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js");
                const { getDatabase, ref } = await import("https://www.gstatic.com/firebasejs/10.8.0/firebase-database.js");
                window.adminApp = initializeApp(FIREBASE_CONFIG, 'admin');
                window.adminAuth = getAuth(window.adminApp);
            }
            if (!window.adminDatabase) {
                const { getDatabase, ref } = await import("https://www.gstatic.com/firebasejs/10.8.0/firebase-database.js");
                window.adminDatabase = getDatabase(window.adminApp);
                window.adminFirebaseRef = ref;
            }
            if (!window.adminAuth.currentUser) {
                try {
                    await Promise.race([
                        signInWithEmailAndPassword(window.adminAuth, 'admin@bravostore.com', 'Bravo@2025'),
                        new Promise((_, rej) => setTimeout(() => rej(new Error('AUTH_TIMEOUT')), 5000))
                    ]);
                } catch(e) {
                    if (e.message === 'AUTH_TIMEOUT') { console.warn('Admin auth timed out'); }
                    else {
                        try {
                            await Promise.race([
                                createUserWithEmailAndPassword(window.adminAuth, 'admin@bravostore.com', 'Bravo@2025'),
                                new Promise((_, rej) => setTimeout(() => rej(new Error('AUTH_TIMEOUT')), 5000))
                            ]);
                        } catch(err) { if (err.message !== 'AUTH_TIMEOUT') console.warn('Admin create user error:', err); }
                    }
                }
                await new Promise(r => setTimeout(r, 800));
            }
            if (!window.adminAuth?.currentUser) {
                window.adminDatabase = null;
                window.adminFirebaseRef = null;
                window._adminAuthFailed = true;
                console.warn('Admin auth failed, falling back to unauthenticated database');
                return false;
            }
            return true;
        } catch(err) { 
            console.warn('Admin Auth check warning:', err);
            window.adminDatabase = null;
            window.adminFirebaseRef = null;
            window._adminAuthFailed = true;
            return false;
        }
    },
    get: async (path) => { 
        const localData = JSON.parse(localStorage.getItem('bravo_local_db') || '{}');
        const parts = path.split('/');
        let result = localData;
        for(let p of parts) { if(result && result[p] !== undefined) result = result[p]; else { result = null; break; } }
        
        if(window.firebaseDB) {
            await DB.ensureAdminAuth();
            const _db = window.adminDatabase || database;
            const _rf = window.adminFirebaseRef || window.firebaseRef;
            try { 
                const s = await Promise.race([
                    window.firebaseGet(_rf(_db, path)).catch(e => e),
                    new Promise((_, rej) => setTimeout(() => rej(new Error('FB_TIMEOUT')), 8000)).catch(e => e)
                ]);
                if (s instanceof Error) throw s;
                let val = s.exists() ? s.val() : null;
                
                // 👻 GHOST FILTERING
                if (val && typeof val === 'object') {
                    const ghosts = JSON.parse(localStorage.getItem('bravo_ghosts') || '[]');
                    if (ghosts.length > 0) {
                        if (Array.isArray(val)) { ghosts.forEach(g => { if(val[g] !== undefined) val[g] = null; }); } 
                        else { ghosts.forEach(g => { if(val[g] !== undefined) delete val[g]; }); }
                    }
                }
                
                // Sync to local
                let current = JSON.parse(localStorage.getItem('bravo_local_db') || '{}');
                let ptr = current;
                for(let i=0; i<parts.length-1; i++) { if(!ptr[parts[i]]) ptr[parts[i]] = {}; ptr = ptr[parts[i]]; }
                
                let existingLocal = ptr[parts[parts.length-1]] || {};
                if (val !== null) {
                    if (typeof existingLocal === 'object' && typeof val === 'object' && !Array.isArray(val)) {
                        Object.keys(existingLocal).forEach(k => {
                            if (existingLocal[k] && existingLocal[k]._isLocal) {
                                if (val[k] === undefined) {
                                    val[k] = existingLocal[k];
                                } else if (val[k] && typeof val[k] === 'object') {
                                    Object.keys(existingLocal[k]).forEach(f => {
                                        if (f !== '_isLocal' && existingLocal[k][f] !== undefined) {
                                            val[k][f] = existingLocal[k][f];
                                        }
                                    });
                                    val[k]._isLocal = true;
                                }
                            }
                        });
                    }
                    ptr[parts[parts.length-1]] = val;
                } else if (existingLocal && typeof existingLocal === 'object' && !Array.isArray(existingLocal) && Object.keys(existingLocal).length > 0) {
                    val = existingLocal;
                } else {
                    let keep = {};
                    if (typeof existingLocal === 'object' && !Array.isArray(existingLocal)) {
                        Object.keys(existingLocal).forEach(k => { if (existingLocal[k] && existingLocal[k]._isLocal) keep[k] = existingLocal[k]; });
                    }
                    if (Object.keys(keep).length > 0) {
                        ptr[parts[parts.length-1]] = keep;
                        val = keep;
                    } else {
                        ptr[parts[parts.length-1]] = {};
                        val = {};
                    }
                }
                // 🗑️ HIDDEN ITEMS FILTERING (AFTER merge, to prevent _isLocal re-add from undeleting hidden items)
                if (val && typeof val === 'object' && !Array.isArray(val)) {
                    val = _filterHidden(parts[0], val);
                    ptr[parts[parts.length-1]] = val;
                }
                localStorage.setItem('bravo_local_db', JSON.stringify(current));
                return val;
            } catch(e) {}
        }
        return result; 
    },
    set: async (path, data) => { 
        let fbError = null;
        if(window.firebaseDB) {
            await DB.ensureAdminAuth();
            const db = window.adminDatabase || database;
            const rf = window.adminFirebaseRef || window.firebaseRef;
            try {
                const res = await Promise.race([
                    window.firebaseSet(rf(db, path), data).catch(e => e),
                    new Promise((_, rej) => setTimeout(() => rej(new Error('TIMEOUT')), 8000)).catch(e => e)
                ]);
                if (res instanceof Error) throw res;
            } catch (e) {
                console.error('Firebase DB Set Error:', e);
                fbError = e;
            }
        }
        const localData = JSON.parse(localStorage.getItem('bravo_local_db') || '{}');
        const parts = path.split('/');
        let current = localData;
        for(let i=0; i<parts.length-1; i++) { if(!current[parts[i]]) current[parts[i]] = {}; current = current[parts[i]]; }
        current[parts[parts.length-1]] = data;
        if (parts[0] === 'orders' && data && !data.orderDate) { data.orderDate = data.orderDateReadable || new Date().toISOString(); }
        if (current[parts[parts.length-1]] && typeof current[parts[parts.length-1]] === 'object' && !current[parts[parts.length-1]]._isLocal) current[parts[parts.length-1]]._isLocal = true;
        localStorage.setItem('bravo_local_db', JSON.stringify(localData));
        _dbNotifyListeners(parts[0], localData);
        if (fbError) { console.warn('Firebase set failed, data saved locally:', fbError.message || fbError); }
        return true; 
    },
    update: async (path, data) => { 
        let fbError = null;
        if(window.firebaseDB) {
            await DB.ensureAdminAuth();
            const db = window.adminDatabase || database;
            const rf = window.adminFirebaseRef || window.firebaseRef;
            try {
                const res = await Promise.race([
                    window.firebaseUpdate(rf(db, path), data).catch(e => e),
                    new Promise((_, rej) => setTimeout(() => rej(new Error('TIMEOUT')), 8000)).catch(e => e)
                ]);
                if (res instanceof Error) throw res;
            } catch (e) {
                console.error('Firebase DB Update Error:', e);
                fbError = e;
            }
        }
        const localData = JSON.parse(localStorage.getItem('bravo_local_db') || '{}');
        const parts = path.split('/');
        let current = localData;
        for(let i=0; i<parts.length-1; i++) { if(!current[parts[i]]) current[parts[i]] = {}; current = current[parts[i]]; }
        const lastPart = parts[parts.length-1];
        current[lastPart] = { ...(current[lastPart] || {}), ...data };
        if (current[lastPart] && typeof current[lastPart] === 'object' && !current[lastPart]._isLocal) current[lastPart]._isLocal = true;
        localStorage.setItem('bravo_local_db', JSON.stringify(localData));
        _dbNotifyListeners(parts[0], localData);
        if (fbError) { console.warn('Firebase update failed, data saved locally:', fbError.message || fbError); }
        return true; 
    },
    remove: async (path) => { 
        const localData = JSON.parse(localStorage.getItem('bravo_local_db') || '{}');
        const parts = path.split('/');
        let current = localData;
        for(let i=0; i<parts.length-1; i++) { if(!current[parts[i]]) return true; current = current[parts[i]]; }
        delete current[parts[parts.length-1]];
        localStorage.setItem('bravo_local_db', JSON.stringify(localData));
        _dbNotifyListeners(parts[0], localData);
        
        if(window.firebaseDB) {
            await DB.ensureAdminAuth();
            const db = window.adminDatabase || database;
            const rf = window.adminFirebaseRef || window.firebaseRef;
            try {
                const res = await Promise.race([
                    window.firebaseRemove(rf(db, path)).catch(e => e),
                    new Promise((_, rej) => setTimeout(() => rej(new Error('TIMEOUT')), 8000)).catch(e => e)
                ]);
                if (res instanceof Error) throw res;
            } catch (e) {
                console.error('Firebase DB Remove Error:', e);
            }
        }
        return true; 
    },
    push: async (path, data) => { 
        let id = 'local_' + Date.now();
        let newRef = null;
        const parts = path.split('/');
        
        if(window.firebaseDB) {
            await DB.ensureAdminAuth();
            const db = window.adminDatabase || database;
            const rf = window.adminFirebaseRef || window.firebaseRef;
            try { 
                newRef = window.firebasePush(rf(db, path)); 
                if (newRef.key) {
                    id = newRef.key;
                    if (path === 'products') data.id = id;
                    if (path === 'orders') { data.orderId = id; data.orderDate = data.orderDateReadable || new Date().toISOString(); }
                }
            } catch (e) { console.error('Firebase DB Push Error (Get Ref):', e); }
        }
        
        const localData = JSON.parse(localStorage.getItem('bravo_local_db') || '{}');
        let current = localData;
        for(let i=0; i<parts.length; i++) { if(!current[parts[i]]) current[parts[i]] = {}; current = current[parts[i]]; }
        current[id] = { ...data, id, _isLocal: true };
        localStorage.setItem('bravo_local_db', JSON.stringify(localData));
        _dbNotifyListeners(parts[0], localData);
        
        if(window.firebaseDB && newRef) {
            DB.ensureAdminAuth().then(authOk => {
                if (!authOk) return;
                window.firebaseSet(newRef, data).catch(e => {
                    console.error('Firebase DB Push Background Set Error:', e);
                });
            }).catch(e => console.error(e));
        }
        return id; 
    },
    on: (path, callback) => { 
        if(!window.localDBListeners) window.localDBListeners = {};
        const parts = path.split('/');
        if (!window.localDBListeners[parts[0]]) window.localDBListeners[parts[0]] = [];
        window.localDBListeners[parts[0]].push({ path, cb: callback });
        
        const localData = JSON.parse(localStorage.getItem('bravo_local_db') || '{}');
        let result = localData;
        for(let p of parts) { if(result && result[p] !== undefined) result = result[p]; else { result = null; break; } }
        if (result && typeof result === 'object' && !Array.isArray(result)) result = _filterHidden(parts[0], result);
        try { callback(result); } catch(err) { console.error('Initial callback error:', err); }
        
        if(window.firebaseDB) {
            DB.ensureAdminAuth().then(authOk => {
                const _db = window.adminDatabase || database;
                const _rf = window.adminFirebaseRef || window.firebaseRef;
                try {
                    window.firebaseOnValue(_rf(_db, path), (s) => { 
                        let val = s.exists() ? s.val() : null;
                        if (val && typeof val === 'object') {
                            const ghosts = JSON.parse(localStorage.getItem('bravo_ghosts') || '[]');
                            if (ghosts.length > 0) {
                                if (Array.isArray(val)) { ghosts.forEach(g => { if(val[g] !== undefined) val[g] = null; }); } 
                                else { ghosts.forEach(g => { if(val[g] !== undefined) delete val[g]; }); }
                            }
                        }
                        let current = JSON.parse(localStorage.getItem('bravo_local_db') || '{}');
                        let ptr = current;
                        for(let i=0; i<parts.length-1; i++) { if(!ptr[parts[i]]) ptr[parts[i]] = {}; ptr = ptr[parts[i]]; }
                        let existingLocal = ptr[parts[parts.length-1]] || {};
                        if (val !== null) {
                        if (typeof existingLocal === 'object' && typeof val === 'object' && !Array.isArray(val)) {
                            Object.keys(existingLocal).forEach(k => {
                                if (existingLocal[k] && existingLocal[k]._isLocal) {
                                    if (val[k] === undefined) {
                                        val[k] = existingLocal[k];
                                    } else if (val[k] && typeof val[k] === 'object') {
                                        Object.keys(existingLocal[k]).forEach(f => {
                                            if (f !== '_isLocal' && existingLocal[k][f] !== undefined) {
                                                val[k][f] = existingLocal[k][f];
                                            }
                                        });
                                        val[k]._isLocal = true;
                                }
                                }
                            });
                        }
                        ptr[parts[parts.length-1]] = val;
                        } else if (existingLocal && typeof existingLocal === 'object' && !Array.isArray(existingLocal) && Object.keys(existingLocal).length > 0) {
                            val = existingLocal;
                        } else {
                            let keep = {};
                            if (typeof existingLocal === 'object' && !Array.isArray(existingLocal)) {
                                Object.keys(existingLocal).forEach(k => { if (existingLocal[k] && existingLocal[k]._isLocal) keep[k] = existingLocal[k]; });
                            }
                            if (Object.keys(keep).length > 0) {
                                ptr[parts[parts.length-1]] = keep;
                                val = keep;
                            } else {
                                if (!ptr[parts[parts.length-1]] || typeof ptr[parts[parts.length-1]] !== 'object') ptr[parts[parts.length-1]] = {};
                                val = null;
                            }
                        }
                        if (val && typeof val === 'object' && !Array.isArray(val)) {
                            val = _filterHidden(parts[0], val);
                            ptr[parts[parts.length-1]] = val;
                        }
                        localStorage.setItem('bravo_local_db', JSON.stringify(current));
                        try { callback(val); } catch(err) { console.error('Firebase callback error:', err); }
                }, (fbError) => {
                    console.error('Firebase onValue error for', path, ':', fbError?.code || fbError?.message || fbError);
                }); 
                } catch(e) {
                    console.error('Firebase onValue setup error:', e);
                }
            }).catch(e => console.error('Firebase auth error:', e));
        }
    },
    off: (path) => { 
        const parts = path.split('/');
        if(window.localDBListeners && window.localDBListeners[parts[0]]) {
            window.localDBListeners[parts[0]] = [];
        }
        if(window.firebaseDB) {
            const _db = window.adminDatabase || database;
            const _rf = window.adminFirebaseRef || window.firebaseRef;
            try { window.firebaseOff(_rf(_db, path)); } catch(e) {}
        }
    }
};

// ==================== SYSTEM SETTINGS (CMS) ====================
async function loadSystemSettings() {
    try {
        const settings = await DB.get('settings');
        if (settings) {
            if (settings.admin) ADMIN_CREDENTIALS = { ...ADMIN_CREDENTIALS, ...settings.admin };
            if (settings.payments) {
                Object.keys(settings.payments).forEach(k => {
                    if (PAYMENT_ACCOUNTS[k]) PAYMENT_ACCOUNTS[k] = { ...PAYMENT_ACCOUNTS[k], ...settings.payments[k] };
                });
            }
        }
    } catch (e) { console.error('Error loading settings:', e); }
}

function populateAdminSettingsUI() {
    const vfToggle = document.getElementById('vfToggle'), vfNumber = document.getElementById('vfNumber');
    if (vfToggle && PAYMENT_ACCOUNTS.vodafone) {
        vfNumber.value = PAYMENT_ACCOUNTS.vodafone.phoneNumber || '';
        PAYMENT_ACCOUNTS.vodafone.active !== false ? vfToggle.classList.add('active') : vfToggle.classList.remove('active');
    }
    const ppToggle = document.getElementById('paypalToggle'), ppEmail = document.getElementById('paypalEmail');
    if (ppToggle && PAYMENT_ACCOUNTS.paypal) {
        ppEmail.value = PAYMENT_ACCOUNTS.paypal.email || '';
        PAYMENT_ACCOUNTS.paypal.active !== false ? ppToggle.classList.add('active') : ppToggle.classList.remove('active');
    }
    const bnToggle = document.getElementById('binanceToggle'), bnId = document.getElementById('binanceId');
    if (bnToggle && PAYMENT_ACCOUNTS.binance) {
        bnId.value = PAYMENT_ACCOUNTS.binance.binanceID || '';
        PAYMENT_ACCOUNTS.binance.active !== false ? bnToggle.classList.add('active') : bnToggle.classList.remove('active');
    }
    const instToggle = document.getElementById('instaToggle'), instNumber = document.getElementById('instaNumber');
    if (instToggle && PAYMENT_ACCOUNTS.instapay) {
        instNumber.value = PAYMENT_ACCOUNTS.instapay.phoneNumber || '';
        PAYMENT_ACCOUNTS.instapay.active !== false ? instToggle.classList.add('active') : instToggle.classList.remove('active');
    }
    const bankToggle = document.getElementById('bankToggle'), bankAccount = document.getElementById('bankAccount'), bankIban = document.getElementById('bankIban');
    if (bankToggle && PAYMENT_ACCOUNTS.bank) {
        bankAccount.value = PAYMENT_ACCOUNTS.bank.accountNumber || '';
        bankIban.value = PAYMENT_ACCOUNTS.bank.iban || '';
        PAYMENT_ACCOUNTS.bank.active !== false ? bankToggle.classList.add('active') : bankToggle.classList.remove('active');
    }
    const adUser = document.getElementById('newAdminUsername');
    if (adUser) adUser.value = ADMIN_CREDENTIALS.username;
    loadStoreSettings();
}

window.loadStoreSettings = async function() {
    try {
        const data = await DB.get('settings/store');
        if (data) {
            if (data.name) document.getElementById('storeName').value = data.name;
            if (data.email) document.getElementById('storeEmail').value = data.email;
            if (data.phone) document.getElementById('storePhone').value = data.phone;
        }
    } catch (e) {}
};

window.saveStoreSettings = async function() {
    var _sssLang = document.documentElement.lang || 'ar';
    var _sssI18n = {
        enterStoreName: _sssLang === 'ar' ? 'يرجى إدخال اسم المتجر' : _sssLang === 'en' ? 'Please enter store name' : 'Veuillez entrer le nom du magasin',
        saved: _sssLang === 'ar' ? 'تم حفظ إعدادات المتجر' : _sssLang === 'en' ? 'Store settings saved' : 'Paramètres du magasin enregistrés',
        failed: _sssLang === 'ar' ? 'فشل الحفظ' : _sssLang === 'en' ? 'Save failed' : 'Échec de l\'enregistrement'
    };
    const name = document.getElementById('storeName').value.trim();
    const email = document.getElementById('storeEmail').value.trim();
    const phone = document.getElementById('storePhone').value.trim();
    if (!name) return showToast('❌', _sssI18n.enterStoreName, 'error');
    const data = { name, email, phone };
    try {
        await DB.set('settings/store', data);
        showToast('✅', _sssI18n.saved, 'success');
    } catch (e) {
        showToast('❌', _sssI18n.failed, 'error');
    }
};

window.savePayment = async function(provider) {
    let updates = {};
    if (provider === 'vodafone') updates = { active: document.getElementById('vfToggle').classList.contains('active'), phoneNumber: document.getElementById('vfNumber').value.trim() };
    else if (provider === 'paypal') updates = { active: document.getElementById('paypalToggle').classList.contains('active'), email: document.getElementById('paypalEmail').value.trim() };
    else if (provider === 'binance') updates = { active: document.getElementById('binanceToggle').classList.contains('active'), binanceID: document.getElementById('binanceId').value.trim() };
    else if (provider === 'instapay') updates = { active: document.getElementById('instaToggle').classList.contains('active'), phoneNumber: document.getElementById('instaNumber').value.trim() };
    else if (provider === 'bank') updates = { active: document.getElementById('bankToggle').classList.contains('active'), accountNumber: document.getElementById('bankAccount').value.trim(), iban: document.getElementById('bankIban').value.trim() };
    PAYMENT_ACCOUNTS[provider] = { ...PAYMENT_ACCOUNTS[provider], ...updates };
    if (await DB.update(`settings/payments/${provider}`, updates)) showToast('✅', currentLang === 'ar' ? 'تم الحفظ بنجاح' : currentLang === 'en' ? 'Saved Successfully' : 'Enregistré avec succès', 'success');
};

window.saveAdminCredentials = async function() {
    var _sacLang = document.documentElement.lang || 'ar';
    var _sacI18n = {
        enterCredentials: _sacLang === 'ar' ? 'يرجى إدخال اسم المستخدم وكلمة المرور' : _sacLang === 'en' ? 'Please enter username and password' : 'Veuillez entrer le nom d\'utilisateur et le mot de passe',
        minPassword: _sacLang === 'ar' ? 'كلمة المرور يجب أن تكون 6 أحرف على الأقل' : _sacLang === 'en' ? 'Password must be at least 6 characters' : 'Le mot de passe doit contenir au moins 6 caractères',
        updated: _sacLang === 'ar' ? 'تم تحديث بيانات الدخول بنجاح' : _sacLang === 'en' ? 'Login credentials updated' : 'Identifiants mis à jour'
    };
    const u = document.getElementById('newAdminUsername').value.trim(), p = document.getElementById('newAdminPassword').value.trim();
    if (!u || !p) return showToast('❌', _sacI18n.enterCredentials, 'error');
    if (p.length < 6) return showToast('❌', _sacI18n.minPassword, 'error');
    if (await DB.update('settings/admin', { username: u, password: p })) {
        ADMIN_CREDENTIALS.username = u; ADMIN_CREDENTIALS.password = p;
        document.getElementById('newAdminPassword').value = '';
        showToast('✅', _sacI18n.updated, 'success');
    }
};

window.exportDatabaseBackup = async function() {
    var _edbLang = document.documentElement.lang || 'ar';
    var _edbI18n = {
        creating: _edbLang === 'ar' ? 'جاري إنشاء النسخة الاحتياطية...' : _edbLang === 'en' ? 'Creating backup...' : 'Création de la sauvegarde...',
        downloaded: _edbLang === 'ar' ? 'تم التحميل بنجاح' : _edbLang === 'en' ? 'Downloaded successfully' : 'Téléchargé avec succès',
        failed: _edbLang === 'ar' ? 'فشل النسخ الاحتياطي' : _edbLang === 'en' ? 'Backup failed' : 'Échec de la sauvegarde'
    };
    showToast('⏳', _edbI18n.creating, 'info');
    try {
        const data = await DB.get('/');
        const a = document.createElement('a');
        a.href = URL.createObjectURL(new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' }));
        a.download = `bravo_backup_${Date.now()}.json`;
        a.click();
        showToast('✅', _edbI18n.downloaded, 'success');
    } catch (e) { showToast('❌', _edbI18n.failed, 'error'); }
};

window.clearSystemCache = function() {
    var _cscLang = document.documentElement.lang || 'ar';
    var _cscI18n = {
        title: _cscLang === 'ar' ? 'تنبيه خطير' : _cscLang === 'en' ? 'Warning' : 'Attention',
        msg: _cscLang === 'ar' ? 'هل تريد مسح الكاش المحلي وتسجيل الخروج؟' : _cscLang === 'en' ? 'Clear local cache and logout?' : 'Effacer le cache local et se déconnecter ?',
        confirm: _cscLang === 'ar' ? 'نعم، امسح' : _cscLang === 'en' ? 'Yes, clear' : 'Oui, effacer',
        cancel: _cscLang === 'ar' ? 'إلغاء' : _cscLang === 'en' ? 'Cancel' : 'Annuler'
    };
    showConfirmDialog(_cscI18n.title, _cscI18n.msg, _cscI18n.confirm, _cscI18n.cancel).then(r => {
        if (r) { localStorage.clear(); sessionStorage.clear(); window.location.reload(); }
    });
};

// ==================== AUTHENTICATION ====================
async function initializeAuth() {
    return new Promise((resolve) => {
        if (!window.firebaseOnAuthStateChanged || !auth) {
            console.warn('Firebase Auth not available, using local guest fallback');
            currentUser = null; loadGuestData(); updateUIForGuest();
            resolve(null);
            return;
        }
        window.firebaseOnAuthStateChanged(auth, async (user) => {
            if (user) {
                currentUser = user; window.currentUser = currentUser; await loadUserData(user.uid); updateUIWithUser(user);
                getVisitorInfo().then(info => {
                    if (info.ip) {
                        DB.get('users/' + user.uid).then(ud => {
                            if (ud && (!ud.ip || !ud.country)) {
                                var patch = {};
                                if (!ud.ip && info.ip) patch.ip = info.ip;
                                if (!ud.country && info.country) patch.country = info.country;
                                if (Object.keys(patch).length) DB.update('users/' + user.uid, patch);
                            }
                        });
                    }
                });
                if (window.location.pathname.includes('checkout')) {
                    const n = document.getElementById('customerName'), e = document.getElementById('customerEmail');
                    if (n && user.displayName) n.value = user.displayName;
                    if (e && user.email) e.value = user.email;
                    requireCheckoutLogin();
                }
            } else { currentUser = null; window.currentUser = null; loadGuestData(); updateUIForGuest(); if (window.location.pathname.includes('checkout')) requireCheckoutLogin(); }
            resolve(currentUser);
        });
    });
}

async function loadUserData(userId) {
    DB.on(`notifications/${userId}`, (data) => {
        userNotifications = [];
        if (data) { Object.entries(data).forEach(([id, n]) => { userNotifications.push({ id, ...n }); }); userNotifications.sort((a, b) => (b.timestamp || 0) - (a.timestamp || 0)); }
        updateNotificationsBadge();
    });
    DB.on(`wishlists/${userId}`, (data) => { 
        userWishlist = data ? Object.values(data) : []; 
        userWishlist = userWishlist.filter(item => item && item.id && item.id !== 'undefined' && item.title && item.title !== 'undefined');
        localStorage.setItem(STORAGE_KEYS.wishlist, JSON.stringify(userWishlist)); updateWishlistBadge(); 
        if(window.renderWishlistPage) window.renderWishlistPage(); 
    });
    DB.on(`carts/${userId}`, (data) => { 
        userCart = data ? Object.values(data) : []; 
        userCart = userCart.filter(item => item && item.id && item.id !== 'undefined' && item.title && item.title !== 'undefined' && (item.price !== undefined && item.price !== null));
        localStorage.setItem(STORAGE_KEYS.cart, JSON.stringify(userCart)); updateCartBadge(); 
        if(window.renderCartPage) window.renderCartPage(); 
    });
    DB.on('orders', (data) => {
        let count = 0;
        if (data) {
            count = Object.values(data).filter(o => o.userId === userId && o.status !== 'trashed').length;
        }
        if (count > 0 || !window.myOrders || window.myOrders.length === 0) {
            window._ordersCount = count;
            try { localStorage.setItem(STORAGE_KEYS.ordersCount, String(count)); } catch(e) {}
            updateOrdersBadge();
        }
    });
    try {
        const _lsDb = JSON.parse(localStorage.getItem('bravo_local_db') || '{}');
        const _lsOrders = _lsDb.orders || {};
        window.myOrders = Object.entries(_lsOrders).map(([id, o]) => ({...o, id})).filter(o => o.userId === userId && o.status !== 'trashed');
        window.myOrders.sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0));
        window._ordersCount = window.myOrders.length;
        try { localStorage.setItem(STORAGE_KEYS.ordersCount, String(window.myOrders.length)); } catch(e) {}
        updateOrdersBadge();
    } catch(e) {}
    try {
        var _existing = localStorage.getItem('userAvatar');
        if (!_existing || _existing.length < 50) {
            var snap = await window.firebaseGet(window.firebaseRef(window.database, 'users/' + userId));
            if (snap && snap.exists()) {
                var uData = snap.val();
                if (uData.avatar && uData.avatar.length > 5) {
                    try { localStorage.setItem('userAvatar', uData.avatar); } catch(e) {}
                }
            }
        }
    } catch(e) {}
}

function loadGuestData() {
    userNotifications = []; userWishlist = JSON.parse(localStorage.getItem(STORAGE_KEYS.wishlist) || '[]'); userCart = JSON.parse(localStorage.getItem(STORAGE_KEYS.cart) || '[]');
    userCart = userCart.filter(item => item && item.id && item.id !== 'undefined' && item.title && item.title !== 'undefined' && (item.price !== undefined && item.price !== null));
    localStorage.setItem(STORAGE_KEYS.cart, JSON.stringify(userCart));
    updateNotificationsBadge(); updateWishlistBadge(); updateCartBadge(); updateOrdersBadge();
    if(window.renderCartPage) window.renderCartPage();
    if(window.renderWishlistPage) window.renderWishlistPage();
}

function updateUIWithUser(user) {
    const lang = document.documentElement.lang || 'ar';
    const avatar = document.getElementById('userAvatar');
    if (avatar) {
        var _au = localStorage.getItem('userAvatar');
        if (!_au) {
            try { var _pd = JSON.parse(localStorage.getItem('profileData') || '{}'); if (_pd.avatarFirebase && _pd.avatarFirebase.startsWith('http')) _au = _pd.avatarFirebase; else if (_pd.avatar && _pd.avatar.indexOf('data:') === 0) _au = _pd.avatar; } catch(e) {}
        }
        if (_au && _au.length > 50) {
            avatar.innerHTML = '<img src="' + _au.replace(/"/g,'&quot;') + '" alt="Avatar" style="width:100%;height:100%;object-fit:cover;border-radius:50%"><div class="online-indicator"></div>';
        } else {
            const i = (user.displayName || user.email).charAt(0).toUpperCase();
            avatar.innerHTML = i + '<div class="online-indicator"></div>';
        }
    }
    const un = document.getElementById('userName'); if (un) un.textContent = user.displayName || user.email.split('@')[0];
    const ue = document.getElementById('userEmail'); if (ue) ue.textContent = user.email;
    try { localStorage.setItem(STORAGE_KEYS.user, JSON.stringify({ uid: user.uid, email: user.email, displayName: user.displayName || '' })); } catch(e) {}
    const gm = document.getElementById('guestMenuContent'), lm = document.getElementById('loggedInMenuContent'), ls = document.getElementById('logoutSection');
    if (gm) gm.style.display = 'none';
    if (lm) { lm.style.display = 'block'; lm.innerHTML = `
        <a href="profile.html" class="user-menu-item"><i class="fas fa-user-circle"></i><span>${lang === 'ar' ? 'الملف الشخصي' : lang === 'en' ? 'Profile' : 'Profil'}</span></a>
        <a href="javascript:void(0)" class="user-menu-item" onclick="handleSwitchAccount()"><i class="fas fa-exchange-alt"></i><span>${lang === 'ar' ? 'تبديل الحساب' : lang === 'en' ? 'Switch Account' : 'Changer de compte'}</span></a>
    `; }
    if (ls) ls.style.display = 'block';
    const sm = document.getElementById('switchAccountMobile'), lmob = document.getElementById('logoutMobile'), amob = document.getElementById('accountMobile');
    if (sm) sm.classList.add('is-visible'); if (lmob) lmob.classList.add('is-visible'); if (amob) amob.classList.add('is-visible');
    const loginM = document.getElementById('loginMobile'), regM = document.getElementById('registerMobile');
    if (loginM) loginM.classList.add('is-hidden'); if (regM) regM.classList.add('is-hidden');
}

function updateUIForGuest() {
    const lang = document.documentElement.lang || 'ar';
    const avatar = document.getElementById('userAvatar'); if (avatar) avatar.innerHTML = '<i class="fas fa-user"></i>';
    const un = document.getElementById('userName'); if (un) un.textContent = lang === 'ar' ? 'زائر' : lang === 'en' ? 'Guest' : 'Invité';
    const ue = document.getElementById('userEmail'); if (ue) ue.textContent = lang === 'ar' ? 'سجل الدخول للمتابعة' : lang === 'en' ? 'Login to continue' : 'Connectez-vous pour continuer';
    const gm = document.getElementById('guestMenuContent'), lm = document.getElementById('loggedInMenuContent'), ls = document.getElementById('logoutSection');
    if (gm) gm.style.display = 'block'; if (lm) lm.style.display = 'none'; if (ls) ls.style.display = 'none';
    const sm = document.getElementById('switchAccountMobile'), lmob = document.getElementById('logoutMobile'), amob = document.getElementById('accountMobile');
    if (sm) sm.classList.remove('is-visible'); if (lmob) lmob.classList.remove('is-visible'); if (amob) amob.classList.remove('is-visible');
    const loginM = document.getElementById('loginMobile'), regM = document.getElementById('registerMobile');
    if (loginM) loginM.classList.remove('is-hidden'); if (regM) regM.classList.remove('is-hidden');
}

async function handleLogout() { if (confirm(currentLang === 'ar' ? 'هل تريد تسجيل الخروج؟' : currentLang === 'en' ? 'Logout?' : 'Déconnexion ?')) { try { if (window.firebaseSignOut && auth) { await window.firebaseSignOut(auth); } localStorage.removeItem(STORAGE_KEYS.user); currentUser = null; window.currentUser = null; window.location.reload(); } catch (e) { console.error('Logout error:', e); } } }
async function handleSwitchAccount() { try { if (window.firebaseSignOut && auth) { await window.firebaseSignOut(auth); } localStorage.removeItem(STORAGE_KEYS.user); currentUser = null; window.currentUser = null; window.location.href = 'auth.html'; } catch (e) { console.error('Switch account error:', e); } }
async function markNotificationAsRead(id) { if (!currentUser) return; await DB.update(`notifications/${currentUser.uid}/${id}`, { read: true }); }
async function markAllAsRead() { if (!currentUser || !userNotifications.length) return; const u = {}; userNotifications.forEach(n => { u[`notifications/${currentUser.uid}/${n.id}/read`] = true; }); await DB.update('/', u); }

// ==================== PRODUCTS ====================
async function loadAllProducts() {
    try {
        const localData = JSON.parse(localStorage.getItem('bravo_local_db') || '{}');
        if (localData.products && typeof localData.products === 'object') {
            allProducts = Object.entries(localData.products).map(([id, d]) => ({ ...d, id })).filter(x => x && typeof x === 'object' && x.title && (x.priceEGP !== undefined || x.priceUSD !== undefined));
            if (currentLang && currentLang !== 'ar' && typeof _applyCachedTranslations === 'function') _applyCachedTranslations(allProducts, currentLang);
            updateStats();
        }
        return allProducts;
    } catch (e) { console.error('Error loading products:', e); return []; }
}

let _lastProductsHash = '';
function _productsHash(prods) {
    if (!prods || !prods.length) return '';
    return prods.length + '|' + (prods[0] && prods[0].id || '') + '|' + (prods[prods.length - 1] && prods[prods.length - 1].id || '');
}
function listenToProducts() { 
    let debounceTimer;
    DB.on('products', (data) => { 
        if (data && typeof data === 'object') { window._firebaseUnavailable = false;
            var newData = Object.entries(data).map(([id, p]) => ({ ...p, id })).filter(x => x && typeof x === 'object' && x.title && (x.priceEGP !== undefined || x.priceUSD !== undefined)); 
            var newHash = _productsHash(newData);
            var isSame = (newHash === _lastProductsHash && newData.length === allProducts.length);
            console.log('🔄 listenToProducts:', { totalIncoming: Object.keys(data).length, validAfterFilter: newData.length, allProductsLen: allProducts.length, isSame, hash: newHash, lastHash: _lastProductsHash, validIds: newData.map(p => p.id), sample: newData[0]?.title?.ar });
            allProducts = newData;
            _lastProductsHash = newHash;
            if (currentLang && currentLang !== 'ar' && typeof _applyCachedTranslations === 'function') _applyCachedTranslations(allProducts, currentLang);
            clearTimeout(debounceTimer);
            debounceTimer = setTimeout(function() { 
                if (isSame) return;
                if (window.displayProducts) displayProducts();
                if (currentLang !== 'ar' && typeof autoTranslateProducts === 'function') {
                    autoTranslateProducts(currentLang).catch(function() {});
                }
            }, 0);
            updateStats(); 
        } 
    }); 
}

function _filterProducts(cat = 'all', search = '') {
    let f = [...allProducts];
    if (cat !== 'all') {
        const normalizedCat = (cat || '').trim().toLowerCase();
        f = f.filter(p => (p.category || '').trim().toLowerCase() === normalizedCat || (p.categoryName || '').trim().toLowerCase() === normalizedCat);
    }
    if (search) { const s = search.trim().toLowerCase(); f = f.filter(p => { const t = getProductText(p, 'title', currentLang) || ''; const d = getProductText(p, 'description', currentLang) || ''; return t.toLowerCase().includes(s) || d.toLowerCase().includes(s) || (typeof p.title === 'string' && p.title.toLowerCase().includes(s)) || (typeof p.description === 'string' && p.description.toLowerCase().includes(s)); }); }
    return f;
}

function selectCategory(cat) { currentCategory = cat; document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active')); document.querySelector(`[data-category="${cat}"]`)?.classList.add('active'); if (window.displayProducts) displayProducts(); }

function setSort(sort) { currentSort = sort; document.querySelectorAll('.sort-btn').forEach(b => b.classList.remove('active')); const el = document.querySelector(`.sort-btn[data-sort="${sort}"]`); if (el) el.classList.add('active'); if (window.displayProducts) displayProducts(); }
window.setSort = setSort;

function toggleSortBar() { const bar = document.getElementById('sortBar'); const btn = document.querySelector('.sort-toggle-btn'); if (!bar) return; const isHidden = bar.style.display === 'none' || !bar.style.display; bar.style.display = isHidden ? 'block' : 'none'; if (btn) btn.classList.toggle('active', isHidden); try { if (window.displayProducts) displayProducts(); } catch(e) {} }
window.toggleSortBar = toggleSortBar;

function updatePriceRange() { const min = document.getElementById('priceMin'); const max = document.getElementById('priceMax'); const val = document.getElementById('priceRangeValues'); const inpMin = document.getElementById('priceInputMin'); const inpMax = document.getElementById('priceInputMax'); if (min && max) { let minV = parseInt(min.value) || 0; let maxV = parseInt(max.value) || 0; if (minV > maxV) { max.value = minV; maxV = minV; } if (val) val.textContent = min.value + ' – ' + max.value + ' ' + (currentLang === 'en' || currentLang === 'fr' ? 'EGP' : 'جنية'); if (inpMin) { inpMin.value = min.value; inpMin.max = min.max; } if (inpMax) { inpMax.value = max.value; inpMax.max = max.max; } } try { if (window.displayProducts) displayProducts(); } catch(e) {} }
window.updatePriceRange = updatePriceRange;
window.updatePriceFromInput = function(el, type) { let v = Math.round(parseInt(el.value) / 10) * 10 || 0; if (v < 0) v = 0; const slider = document.getElementById(type === 'min' ? 'priceMin' : 'priceMax'); const otherSlider = document.getElementById(type === 'min' ? 'priceMax' : 'priceMin'); if (slider) { if (v > parseInt(slider.max)) v = parseInt(slider.max); el.value = v; slider.value = v; if (otherSlider) { let otherV = Math.round(parseInt(otherSlider.value) / 10) * 10 || 0; if (type === 'min' && v > otherV) { otherSlider.value = v; const otherInput = document.getElementById('priceInputMax'); if (otherInput) otherInput.value = v; } else if (type === 'max' && v < otherV) { otherSlider.value = v; const otherInput = document.getElementById('priceInputMin'); if (otherInput) otherInput.value = v; } } updatePriceRange(); } };

function updateStats() { const s = document.getElementById('totalProductsStat'); if (s) { let c = 0; const t = allProducts.length; const timer = setInterval(() => { c += Math.ceil(t / 50); if (c >= t) { s.textContent = t; clearInterval(timer); } else s.textContent = Math.floor(c); }, 30); } }

// ╔══════════════════════════════════════════════════════════════════════════════════╗
// ║   🛒 نظام السلة والمفضلة المطور (Enhanced Cart & Wishlist System)              ║
// ╚══════════════════════════════════════════════════════════════════════════════════╝

// ==================== TOGGLE WISHLIST ====================
async function toggleWishlist(productId, event) {
    if (event) { event.stopPropagation(); event.preventDefault(); }

    const product = allProducts.find(p => p.id === productId);
    const index = userWishlist.findIndex(item => (item.id || item) === productId);
    const inWL = index > -1;

    if (inWL) {
        userWishlist.splice(index, 1);
        if (currentUser) await DB.remove(`wishlists/${currentUser.uid}/${productId}`);
        showToast(currentLang === 'ar' ? '💔 تم الإزالة' : currentLang === 'en' ? '💔 Removed' : '💔 Retiré', currentLang === 'ar' ? 'تم إزالة المنتج من المفضلة' : currentLang === 'en' ? 'Removed from wishlist' : 'Retiré des favoris', 'error');
    } else {
        if (!product) return;
        var wishTitleStr = typeof product.title === 'string' ? product.title : (product.title?.ar || '');
        const wishlistItem = { id: productId, title: wishTitleStr, image: product.image || '', icon: product.icon || 'fa-box', priceEGP: product.priceEGP, priceUSD: product.priceUSD, category: product.category, addedAt: Date.now() };
        userWishlist.push(wishlistItem);
        if (currentUser) await DB.set(`wishlists/${currentUser.uid}/${productId}`, wishlistItem);
        showToast(currentLang === 'ar' ? '❤️ تمت الإضافة' : currentLang === 'en' ? '❤️ Added' : '❤️ Ajouté', currentLang === 'ar' ? 'تمت الإضافة للمفضلة' : currentLang === 'en' ? 'Added to wishlist' : 'Ajouté aux favoris', 'success');
    }

    localStorage.setItem(STORAGE_KEYS.wishlist, JSON.stringify(userWishlist));
    updateWishlistBadge();
    updateWishlistButtons(productId);
    loadWishlistDropdown();
}

function isInWishlist(productId) { return userWishlist.some(item => (item.id || item) === productId); }

function updateWishlistButtons(productId) {
    const inW = isInWishlist(productId);
    document.querySelectorAll(`[data-wishlist-id="${productId}"]`).forEach(btn => {
        if (inW) { btn.classList.add('active'); btn.innerHTML = '<i class="fas fa-heart"></i>'; }
        else { btn.classList.remove('active'); btn.innerHTML = '<i class="far fa-heart"></i>'; }
    });
}

// ==================== ADD TO CART ====================
async function addToCart(productId, event) {
    if (event) { event.stopPropagation(); event.preventDefault(); }

    const product = allProducts.find(p => p.id === productId);
    if (!product) return;

    const existingIndex = userCart.findIndex(item => (item.id || item) === productId);
    if (existingIndex > -1) {
        // Remove from cart locally first, THEN sync to Firebase
        userCart.splice(existingIndex, 1);
        localStorage.setItem(STORAGE_KEYS.cart, JSON.stringify(userCart));
        updateCartBadge();
        loadCartDropdown();

        if (currentUser) {
            await DB.set(`carts/${currentUser.uid}/${productId}`, null);
        }

        const btn = event?.target?.closest('.btn-add-cart');
        if (btn) {
            btn.classList.remove('added');
            btn.innerHTML = `<i class="fas fa-shopping-cart"></i> ${currentLang === 'ar' ? 'أضف للسلة' : currentLang === 'en' ? 'Add to Cart' : 'Ajouter au panier'}`;
        }

        showToast(currentLang === 'ar' ? '🗑️ تمت الإزالة' : currentLang === 'en' ? '🗑️ Removed' : '🗑️ Supprimé', getProductText(product, 'title', currentLang), 'info');
        return;
    }

    const price = getProductPrice(product);
    const currency = getUserCurrency().symbol;
    var cartTitleStr = typeof product.title === 'string' ? product.title : (product.title?.ar || '');
    const cartItem = { id: productId, title: cartTitleStr, image: product.image || '', icon: product.icon || 'fa-box', price: price, priceEGP: product.priceEGP, priceUSD: product.priceUSD, oldPriceEGP: product.oldPriceEGP || 0, oldPriceUSD: product.oldPriceUSD || 0, description: product.description || '', currency: currency, category: product.category, addedAt: Date.now(), hot: product.hot, bestseller: product.bestseller, featured: product.featured, badge: product.badge };

    userCart.push(cartItem);
    if (currentUser) await DB.set(`carts/${currentUser.uid}/${productId}`, cartItem);
    localStorage.setItem(STORAGE_KEYS.cart, JSON.stringify(userCart));
    updateCartBadge();

    // أنيميشن الزر
    const btn = event?.target?.closest('.btn-add-cart');
    if (btn) {
        btn.classList.add('added', 'cart-animation');
        const originalText = btn.innerHTML;
        btn.innerHTML = `<i class="fas fa-check"></i> ${currentLang === 'ar' ? 'تمت الإضافة' : currentLang === 'en' ? 'Added!' : 'Ajouté !'}`;
        setTimeout(() => { btn.classList.remove('cart-animation'); btn.innerHTML = `<i class="fas fa-check-circle"></i> ${currentLang === 'ar' ? 'في السلة' : currentLang === 'en' ? 'In Cart' : 'Dans le panier'}`; }, 2000);
    }

    flyToCart(event);
    showToast(currentLang === 'ar' ? '🛒 تمت الإضافة!' : currentLang === 'en' ? '🛒 Added to Cart!' : '🛒 Ajouté au panier!', getProductText(product, 'title', currentLang), 'success');
    loadCartDropdown();
}

function isInCart(productId) { return userCart.some(item => (item.id || item) === productId); }

// ==================== REMOVE FROM CART ====================
async function removeFromCart(productId, event) {
    if (event) { event.stopPropagation(); event.preventDefault(); }
    let index = userCart.findIndex(item => (item.id || item) === productId);
    let isInvalidItem = false;
    // إذا ما لقيناش العنصر بالـ ID (مثلاً undefined), نبحث عن أول عنصر تالف
    if (index === -1 && (!productId || productId === 'undefined')) {
        index = userCart.findIndex(item => !item || !item.id);
        isInvalidItem = true;
    }
    if (index > -1) {
        const removed = userCart.splice(index, 1)[0];
        
        if (currentUser) {
            if (isInvalidItem) {
                // عنصر تالف بدون ID صالح → نجيب السلة من Firebase وننظفها
                const fbData = await DB.get(`carts/${currentUser.uid}`);
                if (fbData && typeof fbData === 'object') {
                    let clean;
                    if (Array.isArray(fbData)) {
                        clean = fbData.filter(item => item && item.id);
                    } else {
                        clean = {};
                        Object.keys(fbData).forEach(k => {
                            if (fbData[k] && fbData[k].id) clean[k] = fbData[k];
                        });
                    }
                    await DB.set(`carts/${currentUser.uid}`, clean);
                }
            } else {
                await DB.remove(`carts/${currentUser.uid}/${productId}`);
                // تحديث القائمة المحلية أيضاً
                const dbRaw = localStorage.getItem('bravo_local_db');
                if (dbRaw) {
                    const db = JSON.parse(dbRaw);
                    if (db.carts && db.carts[currentUser.uid]) {
                        if (Array.isArray(db.carts[currentUser.uid])) {
                            db.carts[currentUser.uid] = db.carts[currentUser.uid].filter(item => item && item.id !== productId);
                        } else if (db.carts[currentUser.uid][productId]) {
                            delete db.carts[currentUser.uid][productId];
                        }
                        localStorage.setItem('bravo_local_db', JSON.stringify(db));
                    }
                }
            }
        }
        
        localStorage.setItem(STORAGE_KEYS.cart, JSON.stringify(userCart));
        loadCartDropdown(); // بينضف userCart الأول
        updateCartBadge();  // العدد الصح بعد التنظيف
        if (window.renderCartPage) window.renderCartPage();
        showToast(currentLang === 'ar' ? '🗑️ تم الحذف' : currentLang === 'en' ? '🗑️ Removed' : '🗑️ Supprimé', currentLang === 'ar' ? 'تم إزالة المنتج من السلة' : currentLang === 'en' ? 'Removed from cart' : 'Retiré du panier', 'error');
    }
}

// ==================== FLYING CART ANIMATION ====================
function flyToCart(event) {
    if (!event) return;
    const cartIcon = document.querySelector('#cartDropdown .action-btn');
    if (!cartIcon) return;
    const startRect = (event.target || event.currentTarget).getBoundingClientRect();
    const endRect = cartIcon.getBoundingClientRect();
    const flyingEl = document.createElement('div');
    flyingEl.className = 'flying-item';
    flyingEl.innerHTML = '<i class="fas fa-shopping-cart"></i>';
    flyingEl.style.left = startRect.left + startRect.width / 2 - 25 + 'px';
    flyingEl.style.top = startRect.top + startRect.height / 2 - 25 + 'px';
    document.body.appendChild(flyingEl);
    requestAnimationFrame(() => {
        flyingEl.style.left = endRect.left + endRect.width / 2 - 25 + 'px';
        flyingEl.style.top = endRect.top + endRect.height / 2 - 25 + 'px';
        flyingEl.style.transform = 'scale(0.2)';
        flyingEl.style.opacity = '0';
    });
    setTimeout(() => {
        flyingEl.remove();
        const badge = document.getElementById('cartBadge');
        if (badge) { badge.style.transform = 'scale(1.5)'; setTimeout(() => { badge.style.transform = 'scale(1)'; }, 300); }
    }, 800);
}


// ==================== GENERATE PRODUCT BADGES ====================
function generateBadges(product, lang) {
    lang = lang || currentLang || 'ar';
    let discountHTML = '';
    let specialHTML = '';

    const oldPrice = getProductOldPrice(product);
    const currentPrice = getProductPrice(product);

    if (oldPrice && oldPrice > currentPrice) {
        const disc = Math.round(((oldPrice - currentPrice) / oldPrice) * 100);
        discountHTML = `<div class="discount-badge">
            <span class="discount-text">${lang === 'ar' ? 'خصم' : lang === 'en' ? 'OFF' : 'RÉDUCTION'}</span>
            <span class="discount-percent">${disc}%</span>
        </div>`;
    }

    if (product.hot || product.bestseller || product.badge === 'hot') {
        specialHTML = `<span class="special-badge hot-badge">
            <i class="fas fa-fire"></i> ${lang === 'ar' ? 'الأكثر مبيعاً' : lang === 'en' ? 'BESTSELLER' : 'MEILLEURE VENTE'}
        </span>`;
    } else if (product.featured || product.badge === 'featured') {
        specialHTML = `<span class="special-badge featured-badge">
            <i class="fas fa-crown"></i> ${lang === 'ar' ? 'مميز' : lang === 'en' ? 'FEATURED' : 'EN VEDETTE'}
        </span>`;
    }

    if (!discountHTML && !specialHTML) return '';

    return `<div class="badge-column">${discountHTML}${specialHTML}</div>`;
}

// ╔═══════════════════════════════════════════════════════╗
// ║   Quick View System - Final v4.2 (مع البادجات)       ║
// ╚═══════════════════════════════════════════════════════╝

async function openQuickView(productId, event) {
    if (event) { event.stopPropagation(); event.preventDefault(); }

    var product = allProducts.find(function(p) { return p.id === productId; });
    if (!product) return;

    var lang = document.documentElement.lang || 'ar';
    var isAr = lang === 'ar';

    if (lang !== 'ar' && product.title) {
        var fieldsToTranslate = [
            { field: 'title', val: product.title },
            { field: 'description', val: product.description }
        ];
        var promises = [];
        fieldsToTranslate.forEach(function(f) {
            if (typeof f.val === 'string' && _isArabic(f.val)) {
                var key = _cacheKey(f.val, 'ar', lang);
                if (!_translationCache[key]) {
                    promises.push(autoTranslate(f.val, 'ar', lang));
                }
            }
        });
        if (promises.length > 0) await Promise.all(promises);
    }
    var cu = getUserCurrency();
    var price = getProductPrice(product);
    var currency = cu.symbol;
    var cats = APP_CONFIG.categories;
    var rating = product.rating || 0;
    var ratingCount = product.ratingCount || 0;

    var oldP = getProductOldPrice(product);
    var oldPriceHTML = '';
    var saveHTML = '';

    const inCart = isInCart(productId);
    if (oldP && oldP > price) {
        var saved = oldP - price;

        oldPriceHTML = '<div class="price-old"><span class="price-old-value">' + oldP + '</span> ' + currency + '</div>';

        saveHTML = '<span class="price-save">' +
            (lang === 'ar' ? 'وفر' : lang === 'en' ? 'Save' : 'Économisez') + ' ' + saved + ' ' + currency +
            '</span>';
    }

    // === بدجات ===
    var badgeColumnHTML = generateBadges ? generateBadges(product, lang) : '';

    // === النجوم ===
    var starsHTML = '';
    if (rating > 0) {
        var full = Math.floor(rating);
        var hasHalf = rating % 1 >= 0.3;
        var empty = 5 - full - (hasHalf ? 1 : 0);
        for (var s = 0; s < full; s++) starsHTML += '<i class="fas fa-star"></i>';
        if (hasHalf) starsHTML += '<i class="fas fa-star-half-alt"></i>';
        for (var e = 0; e < empty; e++) starsHTML += '<i class="far fa-star empty"></i>';
    }

    // === حالة المخزن ===
    var stock = product.stock !== undefined ? product.stock : 50;
    var stockHTML = '';
    if (stock > 10) {
        stockHTML = '<div class="qv-stock in-stock">' +
            '<span class="qv-stock-dot"></span> ' +
            (lang === 'ar' ? 'متوفر في المخزن' : lang === 'en' ? 'In Stock' : 'En stock') +
            '</div>';
    } else if (stock > 0) {
        stockHTML = '<div class="qv-stock low-stock">' +
            '<span class="qv-stock-dot"></span> ' +
            (lang === 'ar' ? 'باقي ' + stock + ' فقط!' : lang === 'en' ? 'Only ' + stock + ' left!' : 'Plus que ' + stock + ' en stock !') +
            '</div>';
    } else {
        stockHTML = '<div class="qv-stock out-stock">' +
            '<span class="qv-stock-dot"></span> ' +
            (lang === 'ar' ? 'نفد من المخزن' : lang === 'en' ? 'Out of Stock' : 'Rupture de stock') +
            '</div>';
    }

    // === ترجمة المحتوى ===
    var qvTitle = getProductText(product, 'title', lang);
    var qvDesc = getProductText(product, 'description', lang);
    // === الوصف ===
    var desc = qvDesc || '';
    var descId = 'qvDesc_' + Date.now();
    var needReadMore = desc.length > 120;

    // === التصنيف ===
    var catName = '';
    if (cats && cats[lang] && cats[lang][product.category]) {
        catName = cats[lang][product.category];
    } else {
        catName = product.category || '';
    }

    // === المفضلة ===
    var isWished = false;
    if (typeof wishlist !== 'undefined' && Array.isArray(wishlist)) {
        isWished = wishlist.includes(productId);
    }

    // === إنشاء المودال ===
    var modal = document.getElementById('quickViewModal');
    if (!modal) {
        modal = document.createElement('div');
        modal.id = 'quickViewModal';
        modal.className = 'quick-view-modal-overlay';
        document.body.appendChild(modal);
    }

    // === بناء HTML ===
    var html = '';
    html += '<div class="quick-view-modal" id="qvContent">';

    // زرار الإغلاق
    html += '<button class="qv-close-btn" id="qvCloseBtn" title="' + (lang === 'ar' ? 'إغلاق' : lang === 'en' ? 'Close' : 'Fermer') + '">✕</button>';

    // === قسم الصورة ===
    html += '<div class="qv-image-section">';

    // حاوية الصورة + البادجات
    html += '<div class="qv-image-wrap">';
    
    // زر المفضلة (نقلته داخل الحاوية عشان يبقى في المقص)
    html += '<button class="qv-wishlist-btn' + (isWished ? ' active' : '') + '" ' +
        'onclick="qvToggleWishlist(this, \'' + productId + '\', event)" ' +
        'title="' + (lang === 'ar' ? 'المفضلة' : lang === 'en' ? 'Wishlist' : 'Favoris') + '">';
    html += '<i class="' + (isWished ? 'fas' : 'far') + ' fa-heart"></i>';
    html += '</button>';

    html += badgeColumnHTML;
    if (product.image) {
        html += '<img src="' + product.image + '" alt="' + qvTitle + '">';
    } else {
        html += '<div class="qv-icon-placeholder">';
        html += '<i class="fas ' + (product.icon || 'fa-box') + '"></i>';
        html += '</div>';
    }
    html += '</div>';
    html += '</div>';

    // === قسم التفاصيل ===
    html += '<div class="qv-details-section">';

    // التصنيف
    const catEmojis = { books: '📚', software: '💻', formulas: '🧪', courses: '🎓' };
    const catIcon = catEmojis[product.category] || '📦';
    html += '<span class="qv-category">' + catIcon + ' ' + catName + '</span>';

    // العنوان
    html += '<h2 class="qv-title">' + qvTitle + '</h2>';

    // // التقييم
    // if (rating > 0) {
    //     html += '<div class="qv-rating-wrapper">';
    //     html += '<div class="qv-stars">' + starsHTML + '</div>';
    //     html += '<span class="qv-rating-number">' + rating.toFixed(1) + '</span>';
    //     html += '<span class="qv-rating-count">(' + ratingCount + ' ' + (isAr ? 'تقييم' : 'reviews') + ')</span>';
    //     html += '</div>';
    // }

    html += '<div class="qv-divider"></div>';

    // الوصف
    if (desc) {
        html += '<p class="qv-description' + (needReadMore ? '' : ' expanded') + '" id="' + descId + '">' + desc + '</p>';
        if (needReadMore) {
            html += '<button class="qv-read-more-btn" onclick="qvToggleDesc(\'' + descId + '\', this)">';
            html += (lang === 'ar' ? 'اقرأ المزيد' : lang === 'en' ? 'Read more' : 'Lire la suite') + ' <i class="fas fa-chevron-down"></i>';
            html += '</button>';
        }
    }

    // السعر
    html += '<div class="product-price">';
    if (oldP && oldP > price) {
        html += '<div class="price-old-save-row">' + oldPriceHTML + ' ' + saveHTML + '</div>';
    }
    html += '<div class="price-final"><i class="fas fa-fire animated-fire"></i><span class="price-value">' + price + '</span><span class="price-currency">' + currency + '</span></div>';
    html += '</div>';

    // الأزرار
    html += '<div class="product-actions" style="margin-top:auto;padding-top:10px">';
    html += '<button class="product-btn btn-add-cart' + (inCart ? ' added' : '') + '" id="qvCartBtn" onclick="qvAddToCart(\'' + productId + '\', event)">';
    html += (inCart ? (lang === 'ar' ? 'في السلة' : lang === 'en' ? 'In Cart' : 'Dans le panier') : (lang === 'ar' ? 'أضف للسلة' : lang === 'en' ? 'Add to Cart' : 'Ajouter au panier')) + ' <i class="fas ' + (inCart ? 'fa-check-circle' : 'fa-shopping-cart') + '"></i>';
    html += '</button>';
    html += '<a href="checkout.html?product=' + productId +
        '&title=' + encodeURIComponent(qvTitle) +
        '&price=' + price +
        '&currency=' + currency +
        '" class="product-btn btn-buy-now" onclick="event.stopPropagation()">';
    html += (lang === 'ar' ? 'اشتر الآن' : lang === 'en' ? 'Buy Now' : 'Acheter') + ' <i class="fas fa-credit-card"></i>';
    html += '</a>';
    html += '<a href="product-details.html?id=' + productId +
        '" class="qv-btn-details" onclick="event.stopPropagation()">';
    html += '<i class="fas fa-info-circle"></i> ' + (lang === 'ar' ? 'تفاصيل كاملة' : lang === 'en' ? 'Full Details' : 'Détails complets');
    html += '</a>';
    html += '</div>';
    html += '</div>';
    html += '</div>';

    modal.innerHTML = html;

    // إظهار المودال
    modal.classList.remove('closing');
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';

    // === ضبط الشارات والقلب في زاوية الصورة بالظبط ===
    var retries = 0;
    var posBadges = function(img) {
        var wrap = img.closest('.qv-image-wrap');
        if (!wrap) return;
        var bc = wrap.querySelector('.badge-column');
        var wb = wrap.querySelector('.qv-wishlist-btn');
        if (!bc && !wb) return;
        var r = img.getBoundingClientRect();
        if (r.width === 0 && retries < 20) { retries++; setTimeout(posBadges.bind(null, img), 100); return; }
        if (r.width === 0) return;
        var wr = wrap.getBoundingClientRect();
        if (bc) { bc.style.cssText = 'position:absolute!important;top:'+(r.top-wr.top)+'px!important;right:'+(wr.right-r.right)+'px!important;left:auto!important;z-index:999!important'; }
        if (wb) { wb.style.cssText = 'position:absolute!important;top:'+(r.top-wr.top+10)+'px!important;left:'+(r.left-wr.left+10)+'px!important;right:auto!important;z-index:999!important'; }
    };
    setTimeout(posBadges.bind(null, modal.querySelector('.qv-image-wrap img')), 50);

    // === Events ===
    document.getElementById('qvCloseBtn').onclick = function(e) {
        closeQuickView(e);
    };

    modal.onclick = function(e) {
        if (e.target === modal) closeQuickView(e);
    };

    document.addEventListener('keydown', qvEscHandler);
}

// ==================== إغلاق ====================
function closeQuickView(event) {
    if (event) { event.stopPropagation(); event.preventDefault(); }

    var modal = document.getElementById('quickViewModal');
    if (!modal || !modal.classList.contains('active')) return;

    var content = document.getElementById('qvContent');
    if (content) content.classList.add('closing');
    modal.classList.add('closing');

    document.removeEventListener('keydown', qvEscHandler);

    setTimeout(function() {
        modal.classList.remove('active', 'closing');
        if (content) content.classList.remove('closing');
        document.body.style.overflow = '';
    }, 300);
}

// ==================== ESC ====================
function qvEscHandler(e) {
    if (e.key === 'Escape') closeQuickView(e);
}

// ==================== إضافة للسلة ====================
function qvAddToCart(productId, event) {
    if (event) event.stopPropagation();

    var btn = document.getElementById('qvCartBtn');
    var lang = document.documentElement.lang || 'ar';

    if (typeof addToCart === 'function') {
        addToCart(productId, event);
    }

    if (btn) {
        var originalHTML = btn.innerHTML;
        btn.classList.add('added');
        btn.innerHTML = '<i class="fas fa-check"></i> ' + (lang === 'ar' ? 'تمت الإضافة!' : lang === 'en' ? 'Added!' : 'Ajouté !');

        setTimeout(function() {
            btn.classList.remove('added');
            btn.innerHTML = originalHTML;
        }, 2000);
    }
}

// ==================== المفضلة ====================
function qvToggleWishlist(btn, productId, event) {
    if (event) event.stopPropagation();

    btn.classList.toggle('active');
    var icon = btn.querySelector('i');

    if (btn.classList.contains('active')) {
        icon.className = 'fas fa-heart';
    } else {
        icon.className = 'far fa-heart';
    }

    if (typeof toggleWishlist === 'function') {
        toggleWishlist(productId);
    }
}

// ==================== اقرأ المزيد ====================
function qvToggleDesc(descId, btn) {
    var desc = document.getElementById(descId);
    if (!desc) return;

    var lang = document.documentElement.lang || 'ar';
    var isExpanded = desc.classList.toggle('expanded');

    if (isExpanded) {
        btn.innerHTML = (lang === 'ar' ? 'عرض أقل' : lang === 'en' ? 'Show less' : 'Afficher moins') + ' <i class="fas fa-chevron-up"></i>';
    } else {
        btn.innerHTML = (lang === 'ar' ? 'اقرأ المزيد' : lang === 'en' ? 'Read more' : 'Lire la suite') + ' <i class="fas fa-chevron-down"></i>';
    }
}

// ==================== SHARED PRODUCT CARD HTML ====================
function generateProductCardHTML(product, index, opts) {
    opts = opts || {};
    const lang = opts.lang || document.documentElement.lang || 'ar';
    const userCountry = opts.userCountry || (typeof userCountry !== 'undefined' ? userCountry : localStorage.getItem(STORAGE_KEYS.country)) || APP_CONFIG.defaultCountry;
    const alwaysWishlisted = opts.alwaysWishlisted || false;
    const cats = APP_CONFIG.categories;

    const _isEG = userCountry === 'EG' && window._countryFromIP;
    const price = opts.price !== undefined ? opts.price : getProductPrice(product);
    const currency = _isEG ? (lang === 'ar' ? 'جنيه' : lang === 'en' ? 'EGP' : 'EGP') : 'USD';
    const currencyCode = _isEG ? 'EGP' : 'USD';

    let oldPriceHTML = '', savePriceHTML = '';
    const oldPriceVal = getProductOldPrice(product);
    const hasDiscount = oldPriceVal > price;
    if (hasDiscount) {
        const saveAmount = oldPriceVal - price;
        oldPriceHTML = `<div class="price-old"><span class="price-old-value">${oldPriceVal}</span> ${currency}</div>`;
        savePriceHTML = `<span class="price-save">${lang === 'ar' ? 'وفر' : lang === 'en' ? 'Save' : 'Économisez'} ${saveAmount} ${currency}</span>`;
    }

    const inWishlist = alwaysWishlisted || isInWishlist(product.id);
    const inCart = isInCart(product.id);
    const catEmojis = {books:'📚',software:'💻',formulas:'🧪',courses:'🎓'};
    const wishlistAria = lang === 'ar' ? (inWishlist ? 'إزالة من المفضلة' : 'إضافة للمفضلة') : lang === 'en' ? (inWishlist ? 'Remove from Wishlist' : 'Add to Wishlist') : (inWishlist ? 'Retirer des favoris' : 'Ajouter aux favoris');
    var pTitle = getProductText(product, 'title', lang);
    var pDesc = getProductText(product, 'description', lang);

    return `
            <div class="product-card reveal" data-reveal-index="${index}">
                ${generateBadges(product, lang)}
                <button class="wishlist-btn-card ${inWishlist ? 'active' : ''}" data-wishlist-id="${product.id}" onclick="toggleWishlist('${product.id}', event)" aria-label="${wishlistAria}">
                    <i class="${inWishlist ? 'fas' : 'far'} fa-heart"></i>
                </button>
                <div class="product-image-container">
                    ${product.image ? `<img src="${product.image}" alt="${pTitle}" class="product-image" loading="lazy">` : `<div class="product-icon-placeholder"><i class="fas ${product.icon || 'fa-box'}"></i></div>`}
                    <div class="quick-view-overlay">
                        <button class="quick-view-btn" onclick="openQuickView('${product.id}', event)"><i class="fas fa-eye"></i> ${lang === 'ar' ? 'عرض سريع' : lang === 'en' ? 'Quick View' : 'Aperçu rapide'}</button>
                    </div>
                </div>
                <div class="product-card-content">
                    <span class="product-category" data-category="${product.category || ''}">${catEmojis[product.category]||'📦'} ${cats[lang]?.[product.category] || product.categoryName || product.category || ''}</span>
                    <h3 class="product-title">${pTitle}</h3>
                    <p class="product-description">${pDesc}</p>
                    <div class="product-bottom-fixed">
                        <div class="product-price">
                            ${hasDiscount ? `<div class="price-old-save-row">${oldPriceHTML} ${savePriceHTML}</div>` : ''}
                            <div class="price-final"><i class="fas fa-fire animated-fire"></i><span class="price-value">${price}</span><span class="price-currency">${currency}</span></div>
                        </div>
                        <div class="product-actions">
                            <button class="product-btn btn-add-cart ${inCart ? 'added' : ''}" onclick="addToCart('${product.id}', event)">
                                    ${inCart ? (lang === 'ar' ? 'في السلة' : lang === 'en' ? 'In Cart' : 'Dans le panier') : (lang === 'ar' ? 'أضف للسلة' : lang === 'en' ? 'Add to Cart' : 'Ajouter au panier')} <i class="fas ${inCart ? 'fa-check-circle' : 'fa-shopping-cart'}"></i>
                                </button>
                                <a href="checkout.html?product=${product.id}&title=${encodeURIComponent(pTitle)}&price=${price}&currency=${currencyCode}" class="product-btn btn-buy-now" onclick="event.stopPropagation()">
                                    ${lang === 'ar' ? 'اشتر الآن' : lang === 'en' ? 'Buy Now' : 'Acheter'} <i class="fas fa-credit-card"></i>
                                </a>
                        </div>
                    </div>
                </div>
            </div>`;
}

// ==================== ENHANCED DISPLAY PRODUCTS ====================
function displayProducts() {
    const grid = document.getElementById('productsGrid');
    const empty = document.getElementById('emptyState');
    if (!grid) return;

    const search = document.getElementById('searchInput')?.value || '';
    let filtered = _filterProducts(currentCategory, search);

    // Price range filter — smart max from products
    const priceMinEl = document.getElementById('priceMin');
    const priceMaxEl = document.getElementById('priceMax');
    const priceVals = document.getElementById('priceRangeValues');

    // Find max price in filtered products, set slider max to exact max price
    let maxPrice = 0;
    filtered.forEach(p => { const pr = getProductPrice(p); if (pr > maxPrice) maxPrice = pr; });
    if (maxPrice === 0) maxPrice = 100;
    if (priceMinEl) { priceMinEl.max = maxPrice; priceMinEl.step = 1; }
    if (priceMaxEl) { priceMaxEl.max = maxPrice; priceMaxEl.step = 1; }

    // Reset slider to full range only when available products change (category/search switch)
    if (priceMaxEl) {
        const prevMax = priceMaxEl.getAttribute('data-pmax');
        if (String(maxPrice) !== prevMax) {
            priceMaxEl.value = maxPrice;
            priceMaxEl.setAttribute('data-pmax', maxPrice);
        }
    }
    if (priceMinEl) {
        const prevMin = priceMinEl.getAttribute('data-pmax');
        if (String(maxPrice) !== prevMin) {
            priceMinEl.value = 0;
            priceMinEl.setAttribute('data-pmax', maxPrice);
        }
    }
    const sliderCurrency = userCountry === 'EG' && window._countryFromIP ? (currentLang === 'ar' ? 'جنية' : 'EGP') : 'USD';
    if (priceVals) priceVals.textContent = (priceMinEl?.value || '0') + ' – ' + (priceMaxEl?.value || maxPrice) + ' ' + sliderCurrency;

    // Sync number inputs with sliders
    const inpMin = document.getElementById('priceInputMin');
    const inpMax = document.getElementById('priceInputMax');
    if (inpMin) { inpMin.value = priceMinEl?.value || '0'; inpMin.max = maxPrice; }
    if (inpMax) { inpMax.value = priceMaxEl?.value || maxPrice; inpMax.max = maxPrice; }

    const priceMin = priceMinEl ? (parseFloat(priceMinEl.value) || 0) : 0;
    const priceMax = priceMaxEl ? (parseFloat(priceMaxEl.value) || 0) : 0;
    if (priceMin > 0 || priceMax < maxPrice) {
        filtered = filtered.filter(p => {
            const price = getProductPrice(p);
            if (priceMin > 0 && price < priceMin) return false;
            if (priceMax > 0 && price > priceMax) return false;
            return true;
        });
    }

    // Smart sorting
    filtered.sort((a, b) => {
        const pa = getProductPrice(a);
        const pb = getProductPrice(b);
        const oa = getProductOldPrice(a);
        const ob = getProductOldPrice(b);
        const da = oa > pa ? ((oa - pa) / oa) : 0;
        const db = ob > pb ? ((ob - pb) / ob) : 0;
        switch (currentSort) {
            case 'newest': return (b.createdAt || 0) - (a.createdAt || 0);
            case 'oldest': return (a.createdAt || 0) - (b.createdAt || 0);
            case 'price-asc': return pa - pb;
            case 'price-desc': return pb - pa;
            case 'name-asc': return (getProductText(a, 'title', 'ar') || '').localeCompare(getProductText(b, 'title', 'ar') || '', 'ar');
            case 'name-desc': return (getProductText(b, 'title', 'ar') || '').localeCompare(getProductText(a, 'title', 'ar') || '', 'ar');
            case 'rating': return (b.rating || 0) - (a.rating || 0);
            case 'discount': return db - da;
            default: return 0;
        }
    });

    // Update results count
    const lang = document.documentElement.lang || 'ar';

    const rc = document.getElementById('resultsCount');
    if (rc) rc.textContent = filtered.length;

    if (filtered.length === 0) {
        if (empty) {
            empty.style.display = '';
        }
        grid.style.display = 'none';
        return;
    }

    if (empty) empty.style.display = 'none';
    grid.style.display = 'grid';

    let html = '';
    filtered.forEach((product, i) => {
        html += generateProductCardHTML(product, i, { lang, userCountry });
    });

    grid.innerHTML = html;

    grid.querySelectorAll('.product-card').forEach(function(card) {
        var idx = parseInt(card.getAttribute('data-reveal-index'), 10);
        var product = filtered[idx];
        if (product) {
            card.addEventListener('click', function(e) {
                if (!e.target.closest('.product-btn') && !e.target.closest('.wishlist-btn-card') && !e.target.closest('.quick-view-btn') && !e.target.closest('.quick-view-overlay')) {
                    window.location.href = 'product-details.html?id=' + product.id;
                }
            });
        }
    });

    setTimeout(function(){ if (typeof window.revealDynamicContent === 'function') window.revealDynamicContent(); }, 50);
}

// ==================== CHECKOUT ====================
async function getCheckoutOrderData() {
    try {
        // ربط أحداث نموذج الدفع
        var fileInputEl = document.getElementById('fileInput');
        var checkoutFormEl = document.getElementById('checkoutForm');
        if (fileInputEl && !fileInputEl._bound) {
            fileInputEl._bound = true;
            fileInputEl.addEventListener('change', handleCheckoutFileUpload);
        }
        if (checkoutFormEl && !checkoutFormEl._bound) {
            checkoutFormEl._bound = true;
            checkoutFormEl.addEventListener('submit', handleCheckoutSubmit);
        }

        const u = new URLSearchParams(window.location.search);

        // تحميل المنتجات قبل أي شيء لضمان توفر البيانات
        if (allProducts.length === 0 && typeof loadAllProducts === 'function') {
            try { await loadAllProducts(); } catch(e) {}
        }

        // 1. تحديد بيانات الطلب أولاً (من sessionStorage أو URL)
        if (u.get('product')) {
            sessionStorage.removeItem('cartCheckout');
            const rawCurr = u.get('currency');
            const pid = u.get('product');
            var prod = pid && allProducts.length > 0 ? allProducts.find(function(p) { return String(p.id) === String(pid); }) : null;
            checkoutOrderData = { 
                isMultipleItems: false, 
                productId: pid, 
                productTitle: decodeURIComponent(u.get('title') || (currentLang === 'ar' ? 'منتج' : currentLang === 'en' ? 'Product' : 'Produit')), 
                price: u.get('price'), 
                currency: (rawCurr === 'EGP' || rawCurr === 'جنيه') ? 'EGP' : (rawCurr || 'EGP'),
                productImage: decodeURIComponent(u.get('image') || ''),
                productCategory: decodeURIComponent(u.get('category') || '')
            };
            if ((!checkoutOrderData.productImage || !checkoutOrderData.productCategory) && allProducts.length > 0) {
                var p2 = allProducts.find(function(p) { return String(p.id) === String(pid); });
                if (p2) { if (!checkoutOrderData.productImage) checkoutOrderData.productImage = p2.image || ''; if (!checkoutOrderData.productCategory) checkoutOrderData.productCategory = p2.category || ''; }
            }
        } else {
            const saved = sessionStorage.getItem('cartCheckout');
            if (saved) { 
                const d = JSON.parse(saved); 
                var filteredItems = {};
                if (d.items) { Object.keys(d.items).forEach(function(k) { var v = d.items[k]; if (v && v.id && v.title) filteredItems[k] = v; }); }
                checkoutOrderData = { 
                    isMultipleItems: true, 
                    items: filteredItems, 
                    price: d.total, 
                    currency: d.currency === 'EGP' ? 'EGP' : (d.currency || 'EGP'), 
                    userCountry: d.userCountry, 
                    productTitle: `${Object.keys(filteredItems).length} ${currentLang === 'ar' ? 'منتجات من السلة' : currentLang === 'en' ? 'items from cart' : 'articles du panier'}`, 
                    productId: 'cart_checkout' 
                }; 
            } else { 
                checkoutOrderData = { 
                    isMultipleItems: false, 
                    productId: null, 
                    productTitle: currentLang === 'ar' ? 'منتج' : currentLang === 'en' ? 'Product' : 'Produit', 
                    price: null, 
                    currency: 'EGP' 
                }; 
            }
        }
        
        // 2. دالة انتظار تهيئة المستخدم
        const waitForUser = () => new Promise(async (resolve) => {
            if (currentUser) return resolve();
            try {
                const { getAuth } = await import("https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js");
                const authInstance = getAuth();
                const unsubscribe = authInstance.onAuthStateChanged(user => {
                    unsubscribe();
                    resolve();
                });
            } catch (e) {
                console.error("❌ [Checkout] خطأ في انتظار المستخدم:", e);
                resolve();
            }
        });

        // 3. تحميل السلة من Firebase إذا كان المستخدم مسجلاً
        await waitForUser();
        
        if (currentUser) {
            console.log("🔄 [Checkout] جاري جلب السلة المحدثة من Firebase...");
            const data = await DB.get(`carts/${currentUser.uid}`);
            if (data) {
                userCart = Object.values(data);
                localStorage.setItem(STORAGE_KEYS.cart, JSON.stringify(userCart));
                console.log("✅ [Checkout] تم جلب السلة وتحديث الواجهة.");
                
                // إعادة بناء checkoutOrderData من السلة المحدثة إذا كنا في وضع متعدد المنتجات
                if (userCart.length > 0 && !u.get('product')) {
                    const rebuiltItems = {};
                    const cur2 = getUserCurrency().symbol;
                    let rebuiltTotal = 0;
                    userCart.forEach(i => {
                        if (!i || !i.id || !i.title) return;
                        const p = parseFloat(getProductPrice(i)) || 0;
                        rebuiltTotal += (p * (i.quantity || 1));
                        rebuiltItems[i.id] = i;
                    });
                    checkoutOrderData = {
                        isMultipleItems: true,
                        items: rebuiltItems,
                        price: rebuiltTotal,
                        currency: cur2,
                        userCountry: userCountry,
                        productTitle: `${userCart.length} ${_ckI18n(currentLang).cartItems}`,
                        productId: 'cart_checkout'
                    };
                    console.log("✅ [Checkout] تم تحديث بيانات الطلب من السلة المحدثة.");
                }
            } else {
                console.log("⚠️ [Checkout] لا توجد سلة في Firebase للمستخدم.");
            }
        } else {
            console.log("🔄 [Checkout] المستخدم غير مسجل، الاعتماد على localStorage...");
        }
        
        // 4. عرض الملخص بعد تأخير كافي لظهور حالة التحميل
        var elapsed = Date.now() - (window._checkoutLoadingStart || Date.now());
        var minDelay = 2200;
        var remaining = Math.max(0, minDelay - elapsed);
        setTimeout(function() { displayCheckoutOrderSummary(); }, remaining);
        
        // عرض طرق الدفع فوراً
        displayPaymentMethods();
        
    } catch (e) { console.error('Error loading checkout data:', e); }
}

function _ckI18n(lang) {
    var t = {
        ar: {
            currency: 'جنيه', price: 'السعر', qty: 'الكمية', summary: 'ملخص الطلب', total: 'الإجمالي',
            items: 'عدد المنتجات', paymentDetails: 'تفاصيل الدفع', receiver: 'اسم المستلم:',
            country: 'الدولة:', phone: 'رقم الهاتف:', email: 'البريد:', account: 'رقم الحساب:',
            name: 'اسم الحساب:', qrCode: 'رمز QR', cartItems: 'منتجات من السلة',
            uploading: 'جاري الرفع...', uploadCancelled: 'تم إلغاء الرفع', copyFailed: 'فشل النسخ',
            copied: 'تم النسخ', selectPayment: 'اختر طريقة الدفع', uploadReceipt: 'إثبات الدفع (الإيصال)',
            clickToUpload: 'اضغط لرفع الإيصال', max5MB: 'حد أقصى 5 ميجا',
            confirmSend: 'تأكيد وإرسال الطلب', fullName: 'الاسم الكامل *',
            emailAddr: 'البريد الإلكتروني *', phoneWhatsApp: 'رقم الهاتف (واتساب) *',
            mustSelect: 'يجب اختيار طريقة الدفع وتعبئة جميع البيانات'
        },
        en: {
            currency: 'EGP', price: 'Price', qty: 'Qty', summary: 'Order Summary', total: 'Total',
            items: 'Items', paymentDetails: 'Payment Details', receiver: 'Receiver:',
            country: 'Country:', phone: 'Phone:', email: 'Email:', account: 'Account:',
            name: 'Name:', qrCode: 'QR Code', cartItems: 'items from cart',
            uploading: 'Uploading...', uploadCancelled: 'Upload cancelled', copyFailed: 'Copy failed!',
            copied: 'Copied', selectPayment: 'Choose Payment Method', uploadReceipt: 'Payment Proof (Receipt)',
            clickToUpload: 'Click to upload receipt', max5MB: 'Max 5MB',
            confirmSend: 'Confirm & Send Order', fullName: 'Full Name *',
            emailAddr: 'Email Address *', phoneWhatsApp: 'Phone (WhatsApp) *',
            mustSelect: 'You must select a payment method and complete all details'
        },
        fr: {
            currency: 'EGP', price: 'Prix', qty: 'Qté', summary: 'Récapitulatif', total: 'Total',
            items: 'Articles', paymentDetails: 'Détails du paiement', receiver: 'Destinataire :',
            country: 'Pays :', phone: 'Téléphone :', email: 'Email :', account: 'Compte :',
            name: 'Nom :', qrCode: 'Code QR', cartItems: 'articles du panier',
            uploading: 'Téléchargement...', uploadCancelled: 'Téléchargement annulé', copyFailed: 'Échec de la copie !',
            copied: 'Copié', selectPayment: 'Choisir le mode de paiement', uploadReceipt: 'Preuve de paiement (Reçu)',
            clickToUpload: 'Cliquez pour télécharger le reçu', max5MB: 'Max 5 Mo',
            confirmSend: 'Confirmer et envoyer la commande', fullName: 'Nom complet *',
            emailAddr: 'Adresse Email *', phoneWhatsApp: 'Téléphone (WhatsApp) *',
            mustSelect: 'Vous devez choisir un mode de paiement et remplir tous les détails'
        }
    };
    return t[lang] || t.ar;
}

function displayCheckoutOrderSummary() {
    var card = document.querySelector('.order-summary');
    if (!card) return;
    
    // Guard: skip render if data hasn't been initialized yet (keep skeleton visible)
    if (!checkoutOrderData || Object.keys(checkoutOrderData).length === 0) { return; }
    
    let currency = checkoutOrderData.currency || '';
    let ckT = _ckI18n(currentLang);
    let currencyDisplay = currency === 'EGP' ? ckT.currency : 'USD';
    let finalPrice = checkoutOrderData.price;

    if (checkoutOrderData.isMultipleItems && (!finalPrice || isNaN(finalPrice))) {
        const items = checkoutOrderData.items || {};
        const keys = Object.keys(items);
        if (keys.length > 0) {
            let calcTotal = 0;
            const country = checkoutOrderData.userCountry || 'EG';
            keys.forEach(function(k) {
                const item = items[k];
                const p = parseFloat(country === 'EG' ? (item.priceEGP || item.price) : (item.priceUSD || item.price)) || 0;
                calcTotal += (p * (item.quantity || 1));
            });
            finalPrice = calcTotal;
        }
    }

    var catEmojis = { books: '📚', software: '💻', formulas: '🧪', courses: '🎓' };
    var arLabel = ckT.price;
    var arQty = ckT.qty;
    var sumTitleAr = ckT.summary;
    var totalAr = ckT.total;
    var itemsAr = ckT.items;

    var productHtml = '';
    var totalQty = 0;

    if (checkoutOrderData.isMultipleItems) {
        const items = checkoutOrderData.items || {};
        const keys = Object.keys(items).filter(function(k) { var v = items[k]; return v && v.id && v.title; });
        totalQty = keys.reduce(function(sum, k) { return sum + (items[k].quantity || 1); }, 0);
        const country = checkoutOrderData.userCountry || 'EG';
        productHtml = keys.map(function(k) {
            const item = items[k];
            var itemTitle = item.title || '';
            if (item.id && allProducts.length > 0) {
                var found = allProducts.find(function(fp) { return String(fp.id) === String(item.id); });
                if (found) itemTitle = getProductText(found, 'title', currentLang) || itemTitle;
            }
            const p = parseFloat(country === 'EG' ? (item.priceEGP || item.price) : (item.priceUSD || item.price)) || 0;
            const qty = item.quantity || 1;
            const imgHtml = item.image ? '<img src="' + item.image + '" alt="' + itemTitle + '">' : '<i class="fas ' + (item.icon || 'fa-box') + '"></i>';
            var ck = item.category || '';
            var cn = APP_CONFIG.categories[currentLang]?.[ck] || ck;
            var ce = catEmojis[ck] || '📦';
            return '<div class="checkout-product-item">' +
                '<h4 class="checkout-item-title" style="display:block;width:100%;flex:0 0 100%;font-size:1em;font-weight:900;color:#ffffff;text-align:center;margin:0 0 6px;padding:0 0 6px;border-bottom:1px solid rgba(147,51,234,0.2);visibility:visible;opacity:1">' + itemTitle + '</h4>' +
                '<div class="checkout-item-image">' + imgHtml + '</div>' +
                '<div class="checkout-item-details">' +
                    '<div class="checkout-item-category">' + ce + ' ' + cn + '</div>' +
                    '<div class="checkout-item-price"><span class="price-label">' + arLabel + '</span><div class="price-num-row"><span class="price-number">' + p + '</span><span class="price-currency">' + currencyDisplay + '</span></div></div>' +
                '</div>' +
                '<div class="checkout-item-qty">' +
                    '<span class="qty-label">' + arQty + '</span>' +
                    '<span class="qty-value">' + qty + '</span>' +
                '</div>' +
            '</div>';
        }).join('');
    } else {
        var translatedTitle = checkoutOrderData.productTitle;
        if (checkoutOrderData.productId && allProducts.length > 0) {
            var found = allProducts.find(function(fp) { return String(fp.id) === String(checkoutOrderData.productId); });
            if (found) translatedTitle = getProductText(found, 'title', currentLang) || translatedTitle;
        }
        var img = checkoutOrderData.productImage;
        var ck = checkoutOrderData.productCategory;
        if ((!img || !ck) && allProducts.length > 0) {
            var p2 = allProducts.find(function(p) { return String(p.id) === String(checkoutOrderData.productId); });
            if (p2) { if (!img) img = p2.image || ''; if (!ck) ck = p2.category || ''; }
        }
        var cn = APP_CONFIG.categories[currentLang]?.[ck] || ck;
        var ce = catEmojis[ck] || '📦';
        var imgHtml = img ? '<img src="' + img + '" alt="' + (translatedTitle || '') + '">' : '<i class="fas fa-box"></i>';
        productHtml = '<div class="checkout-product-item">' +
            '<h4 class="checkout-item-title" style="display:block;width:100%;flex:0 0 100%;font-size:1em;font-weight:900;color:#ffffff;text-align:center;margin:0 0 6px;padding:0 0 6px;border-bottom:1px solid rgba(147,51,234,0.2);visibility:visible;opacity:1">' + (translatedTitle || '') + '</h4>' +
            '<div class="checkout-item-image">' + imgHtml + '</div>' +
            '<div class="checkout-item-details">' +
                '<div class="checkout-item-category">' + ce + ' ' + cn + '</div>' +
                '<div class="checkout-item-price"><span class="price-label">' + arLabel + '</span><div class="price-num-row"><span class="price-number">' + finalPrice + '</span><span class="price-currency">' + currencyDisplay + '</span></div></div>' +
            '</div>' +
            '<div class="checkout-item-qty">' +
                '<span class="qty-label">' + arQty + '</span>' +
                '<span class="qty-value">1</span>' +
            '</div>' +
        '</div>';
    }

    var priceDisplay = finalPrice ? Number(finalPrice).toLocaleString() : '---';
    var currencySym = currencyDisplay;

    var cartRowHtml = '';
    if (checkoutOrderData.isMultipleItems && totalQty > 0) {
        cartRowHtml = '<div class="cart-summary-row" id="cartSummaryRow" style="display:flex">' +
            '<span class="cart-count-label">' + itemsAr + '</span>' +
            '<span class="summary-value" id="cartSummaryCount">' + totalQty + '</span>' +
        '</div>';
    }

    card.innerHTML = '<h2 class="summary-title">' +
        '<span class="summary-title-text">' + sumTitleAr + '</span>' +
        '<span class="emoji">📋</span>' +
    '</h2>' +
    '<div class="product-info" id="checkoutProductList">' + productHtml + '</div>' +
    '<div class="checkout-price-final">' +
        '<span class="total-label">' + totalAr + '</span>' +
        '<div class="final-price-wrap">' +
            '<i class="fas fa-fire animated-fire"></i>' +
            '<span class="price-value" id="summaryPrice">' + priceDisplay + '</span>' +
            '<span class="price-currency" id="summaryCurrency">' + currencySym + '</span>' +
        '</div>' +
    '</div>' +
    cartRowHtml;
}

function displayPaymentMethods() {
    const grid = document.getElementById('paymentGrid'); if (!grid) return;
    var methods = Object.keys(window.paymentMethods).length > 0 ? window.paymentMethods : PAYMENT_ACCOUNTS;
    const activeMethods = Object.entries(methods).filter(([k, m]) => m.active !== false).sort((a, b) => (a[1].order || 0) - (b[1].order || 0));
    const langFallback = function(obj) { return obj[currentLang] || obj.en || obj.ar || ''; };
    grid.innerHTML = activeMethods.map(([k, m]) => `<div class="payment-method" data-payment="${k}"><img src="${m.logo || ''}" alt="${langFallback(m.name)}" class="payment-logo"><div class="payment-name">${langFallback(m.name)}</div></div>`).join('');
    document.querySelectorAll('.payment-method').forEach(el => { el.addEventListener('click', function () { selectPaymentMethod(this.getAttribute('data-payment')); }); });
    if (currentLang !== 'ar') {
        let needsTranslate = false;
        activeMethods.forEach(([k, m]) => {
            if (m.name && m.name.ar && m.name[currentLang] === m.name.ar) {
                needsTranslate = true;
                _translateTextArTo(m.name.ar, currentLang).then(t => {
                    m.name[currentLang] = t;
                    const nameEl = grid.querySelector(`[data-payment="${k}"] .payment-name`);
                    if (nameEl) nameEl.textContent = t;
                }).catch(() => {});
            }
            if (m.instructions && m.instructions.ar) {
                const curInst = m.instructions[currentLang];
                if (!curInst || (Array.isArray(curInst) && curInst[0] === m.instructions.ar[0])) {
                    _translateTextArTo(m.instructions.ar.join('\n'), currentLang).then(t => {
                        m.instructions[currentLang] = t.split('\n').filter(s => s.trim());
                    }).catch(() => {});
                }
            }
        });
    }
}

function selectPaymentMethod(key) {
    const wasSelected = selectedPaymentMethod === key;
    if (wasSelected) { selectedPaymentMethod = null; document.querySelectorAll('.payment-method').forEach(el => el.classList.remove('selected')); document.getElementById('paymentDetails')?.classList.remove('show'); document.getElementById('customerInfoSection').style.display = 'none'; document.getElementById('step2')?.classList.remove('active'); document.getElementById('step3')?.classList.remove('active'); checkCheckoutFormValidity(); return; }
    selectedPaymentMethod = key; const m = window.paymentMethods?.[key] || PAYMENT_ACCOUNTS[key];
    document.querySelectorAll('.payment-method').forEach(el => el.classList.remove('selected'));
    document.querySelector(`[data-payment="${key}"]`)?.classList.add('selected');
    const d = document.getElementById('paymentDetails'); if (!d) return;
    var ckT = _ckI18n(currentLang);
    let h = `<h2 class="section-title"><span class="section-title-text">${ckT.paymentDetails}</span><span class="emoji">📋</span></h2><ul class="instructions-list">`;
    let instList = m.instructions[currentLang] || m.instructions.en || m.instructions.ar || [];
    instList.forEach((inst, i) => { h += `<li><strong>${i + 1}.</strong> ${inst}</li>`; });
    h += '</ul><div style="margin-top:25px">';
    if (m.receiverName) h += `<div class="detail-item detail-item-full"><span class="detail-label">${ckT.receiver}</span><div class="detail-value"><span>${m.receiverName}</span></div><button class="copy-btn copy-btn-bottom" onclick="copyToClipboard('${m.receiverName}', this)"><i class="fas fa-copy"></i></button></div>`;
    if (m.country) h += `<div class="detail-item"><span class="detail-label">${ckT.country}</span><span class="detail-value">${m.country}</span></div>`;
    if (m.phoneNumber) h += `<div class="detail-item"><span class="detail-label">${ckT.phone}</span><div class="detail-value"><span dir="ltr">${m.phoneNumber}</span><button class="copy-btn" onclick="copyToClipboard('${m.phoneNumber}', this)"><i class="fas fa-copy"></i></button></div></div>`;
    if (m.email) h += `<div class="detail-item"><span class="detail-label">${ckT.email}</span><div class="detail-value"><span>${m.email}</span><button class="copy-btn" onclick="copyToClipboard('${m.email}', this)"><i class="fas fa-copy"></i></button></div></div>`;
    if (m.accountNumber) h += `<div class="detail-item"><span class="detail-label">${ckT.account}</span><div class="detail-value"><span dir="ltr">${m.accountNumber}</span><button class="copy-btn" onclick="copyToClipboard('${m.accountNumber}', this)"><i class="fas fa-copy"></i></button></div></div>`;
    if (m.iban) h += `<div class="detail-item"><span class="detail-label">IBAN:</span><div class="detail-value"><span dir="ltr">${m.iban}</span><button class="copy-btn" onclick="copyToClipboard('${m.iban}', this)"><i class="fas fa-copy"></i></button></div></div>`;
    if (m.accountName) h += `<div class="detail-item detail-item-full"><span class="detail-label">${ckT.name}</span><div class="detail-value"><span>${m.accountName}</span></div><button class="copy-btn copy-btn-bottom" onclick="copyToClipboard('${m.accountName}', this)"><i class="fas fa-copy"></i></button></div>`;
    if (m.binanceID) h += `<div class="detail-item"><span class="detail-label">Binance ID:</span><div class="detail-value"><span>${m.binanceID}</span><button class="copy-btn" onclick="copyToClipboard('${m.binanceID}', this)"><i class="fas fa-copy"></i></button></div></div>`;
    if (m.walletAddress) h += `<div class="detail-item"><span class="detail-label">Wallet:</span><div class="detail-value"><span style="font-size:0.8em;word-break:break-all">${m.walletAddress}</span><button class="copy-btn" onclick="copyToClipboard('${m.walletAddress}', this)"><i class="fas fa-copy"></i></button></div></div>`;
    if (m.redotID) h += `<div class="detail-item"><span class="detail-label">Redot ID:</span><div class="detail-value"><span>${m.redotID}</span><button class="copy-btn" onclick="copyToClipboard('${m.redotID}', this)"><i class="fas fa-copy"></i></button></div></div>`;
    if (m.qrCode && m.qrActive !== false) h += `<div style="text-align:center;margin-top:25px"><h4 style="margin-bottom:15px">${ckT.qrCode}</h4><img src="${m.qrCode}" alt="QR" class="qr-code"></div>`;
    h += '</div>'; d.innerHTML = h; d.classList.add('show');
    const cs = document.getElementById('customerInfoSection'); if (cs) cs.style.display = 'block';
    const s2 = document.getElementById('step2'); if (s2) s2.classList.add('active');
    setTimeout(() => { d.scrollIntoView({ behavior: 'smooth', block: 'nearest' }); }, 300);
}

function copyToClipboard(text, btn) { if (!btn) btn = event?.currentTarget; var ckT = _ckI18n(currentLang); const doCopy = function(t) { if (btn) { const o = btn.innerHTML; btn.innerHTML = '<i class="fas fa-check"></i>'; btn.style.background = 'linear-gradient(135deg,#10b981,#059669)'; setTimeout(() => { btn.innerHTML = o; btn.style.background = ''; }, 2000); } showToast(ckT.copied, text, 'success'); }; try { navigator.clipboard.writeText(text).then(doCopy).catch(function() { fallbackCopy(text, btn); }); } catch(e) { fallbackCopy(text, btn); } } function fallbackCopy(text, btn) { var ta = document.createElement('textarea'); ta.value = text; ta.style.position = 'fixed'; ta.style.opacity = '0'; document.body.appendChild(ta); ta.select(); var ckT2 = _ckI18n(currentLang); try { document.execCommand('copy'); if (btn) { const o = btn.innerHTML; btn.innerHTML = '<i class="fas fa-check"></i>'; btn.style.background = 'linear-gradient(135deg,#10b981,#059669)'; setTimeout(() => { btn.innerHTML = o; btn.style.background = ''; }, 2000); } showToast(ckT2.copied, text, 'success'); } catch(e) { alert(ckT2.copyFailed); } document.body.removeChild(ta); }

function handleCheckoutFileUpload(e) {
    const f = e.target.files[0]; if (!f) return;
    if (f.size > 5 * 1024 * 1024) { e.target.value = ''; showUploadError(currentLang === 'ar' ? 'الملف كبير جداً' : currentLang === 'en' ? 'File Too Large' : 'Fichier trop volumineux', currentLang === 'ar' ? 'حجم الصورة يتجاوز الحد الأقصى المسموح وهو 5 ميجابايت. قم بتقليل حجم الصورة أو استخدم صورة أصغر.' : currentLang === 'en' ? 'The image exceeds the maximum allowed size of 5MB. Reduce the image size or use a smaller one.' : "L'image dépasse la taille maximale autorisée de 5 Mo. Réduisez la taille de l'image ou utilisez une plus petite.", f.name, (f.size / 1024 / 1024).toFixed(2) + ' MB'); return; }
    if (!f.type.startsWith('image/') && f.type !== 'application/pdf') { e.target.value = ''; showUploadError(currentLang === 'ar' ? 'صيغة ملف غير مدعومة' : currentLang === 'en' ? 'Unsupported File Format' : 'Format de fichier non pris en charge', currentLang === 'ar' ? 'يجب رفع صورة (PNG, JPG) أو ملف PDF فقط. الصيغة الحالية غير مدعومة.' : currentLang === 'en' ? 'Only image files (PNG, JPG) or PDF are allowed. The current format is not supported.' : 'Seuls les fichiers image (PNG, JPG) ou PDF sont autorisés. Le format actuel ne est pas pris en charge.', f.name, f.type || (currentLang === 'ar' ? 'غير معروف' : 'Unknown')); return; }
    uploadedFile = f;
    uploadedImageUrl = '';
    const fu = document.getElementById('fileUpload');
    if (!fu) return;
    fu.classList.add('uploading');
    fu.innerHTML = '<div class="upload-progress-wrap">' +
        '<div class="upload-progress-ring"><svg viewBox="0 0 100 100"><circle class="upload-ring-bg" cx="50" cy="50" r="42"/><circle class="upload-ring-fill" cx="50" cy="50" r="42" id="receiptRing"/></svg><span class="upload-pct" id="receiptPct">0%</span></div>' +
        '<div class="upload-progress-info"><div class="upload-file-name">' + f.name + '</div><div class="upload-file-size" id="receiptSize">0 / ' + (f.size / 1024 / 1024).toFixed(1) + ' MB</div>' +
        '<div class="upload-progress-bar-wrap"><div class="upload-progress-bar" id="receiptBar" style="width:0%"></div></div>' +
        '<button type="button" class="upload-cancel-btn" id="receiptCancel"><i class="fas fa-times"></i></button></div></div>';

    var ring = document.getElementById('receiptRing');
    var circumference = 2 * Math.PI * 42;
    if (ring) { ring.style.strokeDasharray = circumference; ring.style.strokeDashoffset = circumference; }

    var cancelBtn = document.getElementById('receiptCancel');
    var cancelled = false;
    if (cancelBtn) cancelBtn.onclick = function() { cancelled = true; uploadedFile = null; uploadedImageUrl = ''; fu.classList.remove('uploading'); resetFileUpload(); };

    var xhr = new XMLHttpRequest();
    xhr.open('POST', 'https://api.imgbb.com/1/upload');
    var fd = new FormData();
    fd.append('key', APP_CONFIG.imgbbApiKey);
    fd.append('image', f);
    fd.append('name', 'receipt_' + Date.now());

    xhr.upload.onprogress = function(ev) {
        if (cancelled || !ev.lengthComputable) return;
        var pct = Math.round((ev.loaded / ev.total) * 100);
        var loadedMB = (ev.loaded / 1024 / 1024).toFixed(2);
        var totalMB = (ev.total / 1024 / 1024).toFixed(1);
        var pctEl = document.getElementById('receiptPct');
        var sizeEl = document.getElementById('receiptSize');
        var barEl = document.getElementById('receiptBar');
        if (pctEl) pctEl.textContent = pct + '%';
        if (sizeEl) sizeEl.textContent = loadedMB + ' / ' + totalMB + ' MB';
        if (barEl) barEl.style.width = pct + '%';
        if (ring) ring.style.strokeDashoffset = circumference - (pct / 100) * circumference;
    };

    xhr.onload = function() {
        if (cancelled) return;
        var errMsg = '';
        if (xhr.status === 200) {
            try {
                var resp = JSON.parse(xhr.responseText);
                uploadedImageUrl = resp.data?.display_url || resp.data?.url || '';
            } catch(err) { errMsg = 'JSON parse error'; }
        } else {
            try { var resp2 = JSON.parse(xhr.responseText); errMsg = resp2.error?.message || ('HTTP ' + xhr.status); } catch(e2) { errMsg = 'HTTP ' + xhr.status; }
        }
        if (uploadedImageUrl) {
            fu.classList.remove('uploading');
            fu.classList.add('has-file');
            fu.innerHTML = '<div class="upload-success-wrap"><i class="fas fa-check-circle" style="color:#10b981;font-size:2em"></i><div class="file-text" style="color:#10b981">✅ ' + (currentLang === 'ar' ? 'تم رفع الصورة بنجاح' : currentLang === 'en' ? 'Image uploaded' : 'Image téléchargée') + '</div><div class="file-size">' + f.name + '</div></div>';
            checkCheckoutFormValidity();
        } else {
            fu.classList.remove('uploading');
            uploadedImageUrl = '';
            resetFileUpload();
            showUploadError(currentLang === 'ar' ? 'فشل رفع الصورة' : currentLang === 'en' ? 'Image Upload Failed' : 'Échec du téléchargement', (currentLang === 'ar' ? 'لم نتمكن من رفع الصورة إلى الخادم.' : currentLang === 'en' ? 'Could not upload the image to the server.' : "Impossible de télécharger l'image.") + (errMsg ? '<br><small style="color:rgba(255,255,255,0.4);margin-top:6px;display:block">(' + errMsg + ')</small>' : ''), f.name, (f.size / 1024 / 1024).toFixed(2) + ' MB');
        }
    };

    xhr.onerror = function() {
        if (cancelled) return;
        fu.classList.remove('uploading');
        uploadedImageUrl = '';
        resetFileUpload();
        showUploadError(currentLang === 'ar' ? 'خطأ في الاتصال' : currentLang === 'en' ? 'Connection Error' : 'Erreur de connexion', currentLang === 'ar' ? 'تحقق من اتصالك بالإنترنت وحاول مرة أخرى. إذا استمرت المشكلة، جرب صورة أصغر حجماً.' : currentLang === 'en' ? 'Check your internet connection and try again. If the issue persists, try a smaller image.' : 'Vérifiez votre connexion Internet et réessayez. Si le problème persiste, essayez une image plus petite.');
    };

    xhr.send(fd);
}

function resetFileUpload() {
    var fu = document.getElementById('fileUpload');
    var fi = document.getElementById('fileInput');
    if (fi) fi.value = '';
    if (fu) {
        var ckT = _ckI18n(currentLang);
        fu.innerHTML = '<i class="fas fa-cloud-upload-alt file-icon"></i><div class="file-text">' + ckT.clickToUpload + '</div><div class="file-size">PNG, JPG, PDF (<span>' + ckT.max5MB + '</span>)</div>';
    }
}

function showUploadError(title, message, fileName, fileSize) {
    var existing = document.getElementById('uploadErrorModal');
    if (existing) existing.remove();
    var lang = currentLang;
    var retryText = lang === 'ar' ? 'إعادة المحاولة' : lang === 'en' ? 'Retry' : 'Réessayer';
    var closeText = lang === 'ar' ? 'إغلاق' : lang === 'en' ? 'Close' : 'Fermer';
    var fileLabel = lang === 'ar' ? 'الملف:' : lang === 'en' ? 'File:' : 'Fichier:';
    var sizeLabel = lang === 'ar' ? 'الحجم:' : lang === 'en' ? 'Size:' : 'Taille:';
    var tipsTitle = lang === 'ar' ? 'نصائح:' : lang === 'en' ? 'Tips:' : 'Conseils:';
    var tip1 = lang === 'ar' ? 'تأكد من أن الصورة أقل من 5 ميجابايت' : lang === 'en' ? 'Ensure the image is under 5MB' : "Assurez-vous que l'image fait moins de 5 Mo";
    var tip2 = lang === 'ar' ? 'تحقق من اتصالك بالإنترنت' : lang === 'en' ? 'Check your internet connection' : 'Vérifiez votre connexion Internet';
    var tip3 = lang === 'ar' ? 'جرب صورة بحجم أصغر أو بصيغة مختلفة' : lang === 'en' ? 'Try a smaller image or different format' : 'Essayez une image plus petite ou un format différent';

    var modalHtml = '<div class="upload-error-overlay" id="uploadErrorModal">' +
        '<div class="upload-error-box">' +
            '<div class="ueb-header">' +
                '<div class="ueb-icon"><i class="fas fa-exclamation-triangle"></i></div>' +
                '<h3 class="ueb-title">' + title + '</h3>' +
                '<button class="ueb-close" id="uebCloseBtn"><i class="fas fa-times"></i></button>' +
            '</div>' +
            '<div class="ueb-body">' +
                '<p class="ueb-message">' + message + '</p>' +
                (fileName ? '<div class="ueb-file-info">' +
                    '<div class="ueb-file-row"><span class="ueb-file-label">' + fileLabel + '</span><span class="ueb-file-val">' + fileName + '</span></div>' +
                    (fileSize ? '<div class="ueb-file-row"><span class="ueb-file-label">' + sizeLabel + '</span><span class="ueb-file-val">' + fileSize + '</span></div>' : '') +
                '</div>' : '') +
                '<div class="ueb-tips">' +
                    '<div class="ueb-tips-title"><i class="fas fa-lightbulb"></i> ' + tipsTitle + '</div>' +
                    '<ul><li>' + tip1 + '</li><li>' + tip2 + '</li><li>' + tip3 + '</li></ul>' +
                '</div>' +
            '</div>' +
            '<div class="ueb-footer">' +
                '<button class="ueb-btn ueb-btn-retry" id="uebRetryBtn"><i class="fas fa-redo"></i> ' + retryText + '</button>' +
                '<button class="ueb-btn ueb-btn-close" id="uebCloseBtn2">' + closeText + '</button>' +
            '</div>' +
        '</div>' +
    '</div>';

    document.body.insertAdjacentHTML('beforeend', modalHtml);
    var overlay = document.getElementById('uploadErrorModal');

    function closeModal() { overlay.style.opacity = '0'; overlay.querySelector('.upload-error-box').style.transform = 'scale(0.9) translateY(20px)'; setTimeout(function() { overlay.remove(); }, 300); }

    document.getElementById('uebCloseBtn').onclick = closeModal;
    document.getElementById('uebCloseBtn2').onclick = closeModal;
    overlay.onclick = function(ev) { if (ev.target === overlay) closeModal(); };
    document.getElementById('uebRetryBtn').onclick = function() { closeModal(); setTimeout(function() { document.getElementById('fileInput').click(); }, 350); };
}

function checkCheckoutFormValidity() {
    const n = document.getElementById('customerName')?.value.trim(), e = document.getElementById('customerEmail')?.value.trim(), p = document.getElementById('customerPhone')?.value.trim(), btn = document.getElementById('submitBtn');
    const hint = document.getElementById('checkoutHint');
    if (btn) {
        const valid = n && e && p && (uploadedFile || uploadedImageUrl) && selectedPaymentMethod;
        btn.disabled = !valid;
        const s3 = document.getElementById('step3');
        if (s3) s3.classList.toggle('active', valid);
        if (hint) hint.classList.toggle('hidden', valid);
    }
}

window._uploadProgressStart = 0;
window._uploadAbortController = null;
function _showUploadProgress(label, totalBytes) {
    var circ = 2 * Math.PI * 54;
    var existing = document.getElementById('uploadProgressOverlay');
    if (existing) existing.remove();
    var totalMB = totalBytes ? (totalBytes / (1024 * 1024)).toFixed(1) : '?';
    var ov = document.createElement('div');
    ov.className = 'upload-progress-overlay';
    ov.id = 'uploadProgressOverlay';
    ov.innerHTML = '<div class="upload-progress-close" id="uploadProgressClose" title="إلغاء">&#10005;</div><div class="upload-progress-ring"><svg width="120" height="120"><defs><linearGradient id="uploadGrad" x1="0%" y1="0%" x2="100%" y2="0%"><stop offset="0%" style="stop-color:#9333ea"/><stop offset="100%" style="stop-color:#c084fc"/></linearGradient></defs><circle class="ring-bg" cx="60" cy="60" r="54" stroke-dasharray="' + circ + '" stroke-dashoffset="0"></circle><circle class="ring-fg" cx="60" cy="60" r="54" stroke-dasharray="' + circ + '" stroke-dashoffset="' + circ + '"></circle></svg><div class="upload-progress-pct">0%</div></div><div class="upload-progress-label">' + (label || _ckI18n(currentLang).uploading) + '</div><div class="upload-progress-size">0 MB / ' + totalMB + ' MB</div>';
    document.body.appendChild(ov);
    document.getElementById('uploadProgressClose').addEventListener('click', function() {
        if (window._uploadAbortController) { window._uploadAbortController.abort(); window._uploadAbortController = null; }
        _hideUploadProgress();
        showToast('❌', _ckI18n(currentLang).uploadCancelled, 'error');
    });
    window._uploadProgressStart = Date.now();
    return ov;
}
function _updateUploadProgress(pct, loadedBytes, totalBytes) {
    var ov = document.getElementById('uploadProgressOverlay');
    if (!ov) return;
    var circ = 2 * Math.PI * 54;
    var fg = ov.querySelector('.ring-fg');
    var pctEl = ov.querySelector('.upload-progress-pct');
    var sizeEl = ov.querySelector('.upload-progress-size');
    if (fg) fg.style.strokeDashoffset = circ - (circ * pct / 100);
    if (pctEl) pctEl.textContent = Math.round(pct) + '%';
    if (sizeEl && loadedBytes != null) {
        var loadedMB = (loadedBytes / (1024 * 1024)).toFixed(1);
        var totalMB = totalBytes ? (totalBytes / (1024 * 1024)).toFixed(1) : '?';
        sizeEl.textContent = loadedMB + ' MB / ' + totalMB + ' MB';
    }
}
function _hideUploadProgress() {
    var ov = document.getElementById('uploadProgressOverlay');
    if (!ov) return;
    var elapsed = Date.now() - (window._uploadProgressStart || 0);
    var minTime = 1200;
    var remaining = Math.max(0, minTime - elapsed);
    setTimeout(function() {
        var el = document.getElementById('uploadProgressOverlay');
        if (el) el.remove();
    }, remaining);
}
function _showFormNotification(formId, type, msg) {
    var emoji = type === 'success' ? '✅' : type === 'error' ? '❌' : 'ℹ️';
    showToast(emoji, msg, type);
}

async function uploadToImgBB(file, opts) {
    opts = opts || {};
    var upLabel = opts.progressLabel || (currentLang === 'ar' ? 'جاري رفع الصورة...' : currentLang === 'en' ? 'Uploading image...' : 'Téléchargement...');
    return new Promise((resolve, reject) => {
        var r = new FileReader();
        r.onload = function(e) {
            try {
                var b = e.target.result.split(',')[1];
                var fd = new FormData();
                fd.append('key', APP_CONFIG.imgbbApiKey);
                fd.append('image', b);
                if (opts.showProgress !== false) _showUploadProgress(upLabel, file.size);
                var xhr = new XMLHttpRequest();
                xhr.open('POST', 'https://api.imgbb.com/1/upload');
                xhr.upload.onprogress = function(ev) {
                    if (ev.lengthComputable) {
                        var pct = (ev.loaded / ev.total) * 100;
                        _updateUploadProgress(pct, ev.loaded, ev.total);
                    }
                };
                xhr.onload = function() {
                    _hideUploadProgress();
                    try {
                        var d = JSON.parse(xhr.responseText);
                        if (d.success) resolve(d.data);
                        else throw new Error(d.error?.message || 'Upload failed');
                    } catch(err) {
                        console.warn('ImgBB upload failed, using local base64');
                        resolve({ display_url: e.target.result, url: e.target.result });
                    }
                };
                xhr.onerror = function() {
                    _hideUploadProgress();
                    console.warn('ImgBB upload failed, using local base64');
                    resolve({ display_url: e.target.result, url: e.target.result });
                };
                xhr.send(fd);
            } catch(err) {
                _hideUploadProgress();
                reject(err);
            }
        };
        r.onerror = function() { _hideUploadProgress(); reject(new Error('File reading failed')); };
        r.readAsDataURL(file);
    });
}

async function uploadVideoToFirebase(file, opts) {
    opts = opts || {};
    var lang = currentLang || 'ar';
    var label = opts.progressLabel || (lang === 'ar' ? 'جاري رفع الفيديو...' : lang === 'en' ? 'Uploading video...' : 'Téléchargement de la vidéo...');
    return new Promise(function(resolve, reject) {
        var r = new FileReader();
        r.onload = function(e) {
            try {
                var b = e.target.result.split(',')[1];
                var fd = new FormData();
                fd.append('key', APP_CONFIG.imgbbApiKey);
                fd.append('image', b);
                _showUploadProgress(label, file.size);
                var xhr = new XMLHttpRequest();
                xhr.open('POST', 'https://api.imgbb.com/1/upload');
                xhr.upload.onprogress = function(ev) {
                    if (ev.lengthComputable) {
                        var pct = (ev.loaded / ev.total) * 100;
                        _updateUploadProgress(pct, ev.loaded, ev.total);
                    }
                };
                xhr.onload = function() {
                    _hideUploadProgress();
                    try {
                        var d = JSON.parse(xhr.responseText);
                        if (d.success) resolve(d.data.display_url || d.data.url);
                        else throw new Error(d.error?.message || 'Upload failed');
                    } catch(err) {
                        console.warn('ImgBB video upload failed, using base64');
                        resolve(e.target.result);
                    }
                };
                xhr.onerror = function() {
                    _hideUploadProgress();
                    console.warn('ImgBB video upload failed, using base64');
                    resolve(e.target.result);
                };
                xhr.send(fd);
            } catch(err) {
                _hideUploadProgress();
                reject(err);
            }
        };
        r.onerror = function() { _hideUploadProgress(); reject(new Error('File reading failed')); };
        r.readAsDataURL(file);
    });
}

async function _translateTextArTo(text, targetLang) {
    if (!text || !text.trim()) return text;
    var cacheKey = 'ar|' + targetLang + '|' + text;
    try { var cached = JSON.parse(localStorage.getItem('translationCache') || '{}')[cacheKey]; if (cached) return cached; } catch(e) {}
    if (_translationCache[cacheKey]) return _translationCache[cacheKey];
    try {
        var url = 'https://translate.googleapis.com/translate_a/single?client=gtx&sl=ar&tl=' + targetLang + '&dt=t&q=' + encodeURIComponent(text);
        var res = await fetch(url);
        var data = await res.json();
        if (data && data[0]) {
            var tr = data[0].map(function(s) { return s[0]; }).join('');
            if (tr && tr !== text && tr.toUpperCase() !== text.toUpperCase()) {
                _translationCache[cacheKey] = tr;
                try { var cache = JSON.parse(localStorage.getItem('translationCache') || '{}'); cache[cacheKey] = tr; localStorage.setItem('translationCache', JSON.stringify(cache)); } catch(e) {}
                return tr;
            }
        }
    } catch(e) {
        try {
            var url2 = 'https://api.mymemory.translated.net/get?q=' + encodeURIComponent(text) + '&langpair=ar|' + targetLang;
            var res2 = await fetch(url2);
            var data2 = await res2.json();
            if (data2.responseStatus === 200 && data2.responseData && data2.responseData.translatedText) {
                var tr2 = data2.responseData.translatedText;
                if (tr2 && tr2 !== text && tr2.toUpperCase() !== text.toUpperCase()) {
                    _translationCache[cacheKey] = tr2;
                    try { var cache2 = JSON.parse(localStorage.getItem('translationCache') || '{}'); cache2[cacheKey] = tr2; localStorage.setItem('translationCache', JSON.stringify(cache2)); } catch(e2) {}
                    return tr2;
                }
            }
        } catch(e2) {}
    }
    return text;
}
async function _translateLinesArTo(lines, targetLang) {
    if (!lines || !lines.length) return lines;
    var results = [];
    for (var i = 0; i < lines.length; i++) {
        results.push(await _translateTextArTo(lines[i], targetLang));
    }
    return results;
}

async function handleCheckoutSubmit(e) {
    e.preventDefault(); e.stopPropagation();
    const btn = document.getElementById('submitBtn'), orig = btn.innerHTML; btn.disabled = true;
    btn.innerHTML = `<i class="fas fa-spinner fa-spin"></i> ${currentLang === 'ar' ? 'جاري الحفظ...' : currentLang === 'en' ? 'Saving...' : 'Sauvegarde...'}`;
    const now = new Date(), ts = Date.now();
    try {
        if (!uploadedFile) throw new Error(currentLang === 'ar' ? 'ارفع صورة الإيصال أولاً' : 'Upload receipt first!');
        let imgUrl = uploadedImageUrl || '';
        if (!imgUrl) {
            btn.innerHTML = `<i class="fas fa-spinner fa-spin"></i> ${currentLang === 'ar' ? 'جاري رفع الصورة...' : currentLang === 'en' ? 'Uploading image...' : 'Téléchargement...'}`;
            try { const r = await uploadToImgBB(uploadedFile); imgUrl = r.display_url || r.url; if (!imgUrl) throw new Error('No URL'); } catch (ue) { throw new Error(currentLang === 'ar' ? 'فشل رفع الصورة' : 'Upload failed: ' + ue.message); }
        }
        btn.innerHTML = `<i class="fas fa-spinner fa-spin"></i> ${currentLang === 'ar' ? 'جاري الحفظ...' : currentLang === 'en' ? 'Saving...' : 'Sauvegarde...'}`;
        let productExtra = {};
        if (checkoutOrderData.productId && checkoutOrderData.productId !== 'cart_checkout') {
            try { const p = await DB.get(`products/${checkoutOrderData.productId}`); if (p) { productExtra = { productImage: p.image || '', productCategory: p.category || '', productOldPriceEGP: p.oldPriceEGP || 0, productOldPriceUSD: p.oldPriceUSD || 0, downloadLink: p.downloadLink || '', productHot: p.hot || p.bestseller || p.badge === 'hot', productFeatured: p.featured || p.badge === 'featured', productBadge: p.badge || '' }; } } catch (e) {}
        }
        const pmName = window.paymentMethods?.[selectedPaymentMethod]?.name?.ar || PAYMENT_ACCOUNTS[selectedPaymentMethod]?.name?.ar || selectedPaymentMethod;
        const _visitorIP = localStorage.getItem('visitorIP') || '';
        const order = { isMultipleItems: checkoutOrderData.isMultipleItems || false, items: checkoutOrderData.isMultipleItems ? checkoutOrderData.items : null, productId: checkoutOrderData.productId || 'N/A', productTitle: checkoutOrderData.productTitle || 'Product', price: parseFloat(checkoutOrderData.price) || 0, currency: checkoutOrderData.currency || (document.documentElement.lang === 'ar' ? 'جنيه' : 'EGP'), paymentMethod: selectedPaymentMethod, paymentMethodName: pmName, customerName: document.getElementById('customerName').value.trim(), customerEmail: document.getElementById('customerEmail').value.trim(), customerPhone: document.getElementById('customerPhone').value.trim(), fileName: uploadedFile.name, fileSize: `${(uploadedFile.size / 1024 / 1024).toFixed(2)} MB`, receiptImageUrl: imgUrl, userId: currentUser?.uid || 'guest', userEmail: currentUser?.email || document.getElementById('customerEmail').value.trim(), userCountry: checkoutOrderData.userCountry || userCountry || 'EG', ip: _visitorIP, status: 'pending', orderDate: now.toISOString(), createdAt: ts, orderDateReadable: now.toLocaleDateString(currentLang === 'ar' ? 'ar-EG' : currentLang === 'en' ? 'en-US' : 'fr-FR'), orderTimeReadable: now.toLocaleTimeString(currentLang === 'ar' ? 'ar-EG' : currentLang === 'en' ? 'en-US' : 'fr-FR'), ...productExtra };
        let id = String(100000 + Math.floor(Math.random() * 900000));
        try { const cnt = await DB.get('meta/orderCounter'); if (cnt?.value) id = String(cnt.value + 1); await DB.set('meta/orderCounter', { value: parseInt(id) }); } catch(e) {}
        await DB.set(`orders/${id}`, { ...order, orderId: id });
        try { const _c = parseInt(localStorage.getItem(STORAGE_KEYS.ordersCount) || '0'); localStorage.setItem(STORAGE_KEYS.ordersCount, String(_c + 1)); } catch(e) {}
        if (currentUser) { try { if (checkoutOrderData.isMultipleItems) { await DB.remove(`carts/${currentUser.uid}`); } else if (checkoutOrderData.productId) { await DB.set(`carts/${currentUser.uid}/${checkoutOrderData.productId}`, null); } sessionStorage.removeItem('cartCheckout'); } catch (ce) { } }
        savedWhatsAppMessage = `${currentLang === 'ar' ? '🎉 طلب جديد' : currentLang === 'en' ? '🎉 New Order' : '🎉 Nouvelle commande'}\n📦 ${order.productTitle}\n💰 ${order.price} ${order.currency}\n👤 ${order.customerName}\n📧 ${order.customerEmail}\n📱 ${order.customerPhone}\n🔢 #${id}\n🖼️ ${imgUrl}`;
        sessionStorage.setItem('lastOrderId', id); sessionStorage.setItem('whatsappMessage', savedWhatsAppMessage);
        localStorage.setItem('currentOrder', JSON.stringify({ ...order, orderId: id }));
        btn.innerHTML = `<i class="fas fa-check-circle"></i>`; btn.style.background = 'linear-gradient(135deg,#10b981,#059669)';
        setTimeout(() => { const m = document.getElementById('successModal'), d = document.getElementById('displayOrderId'); if (m) m.classList.add('show'); if (d) d.textContent = `#${id}`; window.currentOrderId = id; }, 1000);
    } catch (err) { console.error(err); alert(`❌ ${err.message}`); btn.disabled = false; btn.innerHTML = orig; btn.style.background = ''; }
}

function goToPending() {
    const id = window.currentOrderId || sessionStorage.getItem('lastOrderId');
    if (id) { window.location.href = 'pending-order.html?order=' + id; }
    else { window.location.href = 'orders.html'; }
}
function openWhatsAppOptional() { const m = sessionStorage.getItem('whatsappMessage'); if (m) window.open(`https://wa.me/${APP_CONFIG.whatsappNumber}?text=${encodeURIComponent(m)}`, '_blank'); setTimeout(goToPending, 1000); }

function showCheckoutLoading() { if (!window._checkoutLoadingStart) window._checkoutLoadingStart = Date.now(); var card = document.querySelector('.order-summary'); if (!card) return; var lt = currentLang === 'ar' ? 'جاري تحميل الطلب...' : currentLang === 'en' ? 'Loading order...' : 'Chargement...'; var wt = currentLang === 'ar' ? 'يرجى الانتظار' : currentLang === 'en' ? 'Please wait' : 'Veuillez patienter'; if (!document.getElementById('ckAnims')) { var s = document.createElement('style'); s.id = 'ckAnims'; s.textContent = '@keyframes ckShimmer2{0%{background-position:200% 0}100%{background-position:-200% 0}}@keyframes ckSpin2{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}@keyframes ckPulse2{0%,100%{opacity:1}50%{opacity:.35}}.ck-skel,.ck-skel *,.ck-skel *::before,.ck-skel *::after{animation-duration:1.4s!important;animation-iteration-count:infinite!important;animation-timing-function:ease-in-out!important;animation-play-state:running!important}.ck-skel{background:linear-gradient(90deg,rgba(147,51,234,.08) 25%,rgba(147,51,234,.22) 50%,rgba(147,51,234,.08) 75%);background-size:200% 100%;animation-name:ckShimmer2!important;border-radius:8px}.ck-spinner,.ck-spinner *{animation-duration:.7s!important;animation-iteration-count:infinite!important;animation-timing-function:linear!important;animation-play-state:running!important}.ck-spinner{animation-name:ckSpin2!important}.ck-spinner.ck-pulse{animation-name:ckSpin2,ckPulse2!important;animation-duration:.7s,1.8s!important;animation-iteration-count:infinite,infinite!important;animation-timing-function:linear,ease-in-out!important}.ck-pulse{animation-name:ckPulse2!important;animation-duration:1.8s!important;animation-iteration-count:infinite!important;animation-timing-function:ease-in-out!important;animation-play-state:running!important}'; document.head.appendChild(s); } card.innerHTML = '<div style="text-align:center;padding:28px 15px 20px"><div class="ck-spinner ck-pulse" style="width:48px;height:48px;margin:0 auto 14px;border:3px solid rgba(147,51,234,0.15);border-top-color:rgba(147,51,234,0.9);border-right-color:rgba(236,72,153,0.7);border-radius:50%"></div><div style="color:#fff;font-weight:800;font-size:1.1em;text-shadow:0 1px 4px rgba(0,0,0,0.5)">' + lt + '</div><div style="color:rgba(255,255,255,0.85);font-size:0.85em;margin-top:6px;font-weight:600">' + wt + '</div></div><div style="padding:0 15px 20px"><div class="ck-skel" style="height:14px;width:65%;margin:0 auto 16px"></div><div style="background:rgba(147,51,234,0.05);border:1px solid rgba(147,51,234,0.08);border-radius:14px;padding:14px;margin-bottom:10px"><div class="ck-skel" style="height:13px;width:70%;margin-bottom:12px"></div><div style="display:flex;gap:12px;align-items:center"><div class="ck-skel" style="width:54px;height:54px;border-radius:12px;flex-shrink:0"></div><div style="flex:1"><div class="ck-skel" style="height:11px;width:85%;margin-bottom:7px"></div><div class="ck-skel" style="height:11px;width:50%;margin-bottom:7px"></div><div class="ck-skel" style="height:11px;width:35%"></div></div></div></div><div style="background:rgba(147,51,234,0.05);border:1px solid rgba(147,51,234,0.08);border-radius:14px;padding:14px;margin-bottom:14px"><div style="display:flex;gap:12px;align-items:center"><div class="ck-skel" style="width:54px;height:54px;border-radius:12px;flex-shrink:0"></div><div style="flex:1"><div class="ck-skel" style="height:11px;width:75%;margin-bottom:7px"></div><div class="ck-skel" style="height:11px;width:45%"></div></div></div></div><div style="height:1px;background:rgba(147,51,234,0.1);margin-bottom:14px"></div><div style="display:flex;justify-content:space-between;align-items:center"><div class="ck-skel" style="height:15px;width:35%"></div><div class="ck-skel" style="height:20px;width:28%;border-radius:8px"></div></div></div>'; } function initializeCheckoutPage() { const f = document.getElementById('checkoutForm'); if (!f) return; showCheckoutLoading(); getCheckoutOrderData(); if (window.loadPaymentMethods && (!window.paymentMethods || !Object.keys(window.paymentMethods).length)) { window.loadPaymentMethods().then(function(){ displayPaymentMethods(); }); } else { displayPaymentMethods(); } const fi = document.getElementById('fileInput'); if (fi) fi.addEventListener('change', handleCheckoutFileUpload); ['customerName', 'customerEmail', 'customerPhone'].forEach(id => { const el = document.getElementById(id); if (el) el.addEventListener('input', checkCheckoutFormValidity); }); f.addEventListener('submit', handleCheckoutSubmit); requireCheckoutLogin(); } function requireCheckoutLogin() { const g = document.querySelector('.checkout-grid'); const p = document.querySelector('.page-hero-wrapper .steps-indicator'); const a = document.getElementById('checkoutAuthPrompt'); if (!g) return; if (currentUser) { if (a) a.style.display = 'none'; g.style.display = ''; if (p) p.style.display = ''; return; }     if (!a) { const d = document.createElement('div'); d.id = 'checkoutAuthPrompt'; d.style.cssText = 'text-align:center;padding:60px 20px 80px'; d.innerHTML = `<div style="font-size:5em;margin-bottom:25px">🔒</div><h2 style="font-size:2em;margin-bottom:15px;color:var(--text-primary)">${currentLang === 'ar' ? 'يجب تسجيل الدخول أولاً' : currentLang === 'en' ? 'Login Required' : 'Connexion requise'}</h2><p style="color:var(--text-secondary);font-size:1.2em;margin-bottom:30px">${currentLang === 'ar' ? 'يرجى تسجيل الدخول إلى حسابك لإتمام عملية الشراء' : currentLang === 'en' ? 'Please log in to your account to complete the purchase' : 'Veuillez vous connecter pour finaliser l\u2019achat'}</p><a href="auth.html?redirect=${encodeURIComponent(window.location.href)}" style="display:inline-flex;align-items:center;gap:12px;padding:18px 40px;background:var(--gradient-primary);color:white;border-radius:16px;font-size:1.2em;font-weight:900;text-decoration:none;transition:transform 0.3s,box-shadow 0.3s"><i class="fas fa-sign-in-alt"></i> ${currentLang === 'ar' ? 'تسجيل الدخول' : currentLang === 'en' ? 'Login' : 'Connexion'}</a></div>`; g.parentNode.insertBefore(d, g); } var authEl = document.getElementById('checkoutAuthPrompt'); if (authEl) authEl.style.display = ''; g.style.display = 'none'; if (p) p.style.display = 'none'; }

// ==================== UI BADGES ====================
function updateNotificationsBadge() {
    const count = userNotifications.filter(n => !n.read).length;
    ['notificationsBadge', 'notificationsBadgeMobile'].forEach(id => {
        const b = document.getElementById(id);
        if (!b) return;
        b.textContent = count > 99 ? '99+' : count;
        b.style.display = count > 0 ? 'flex' : 'none';
        if (count > 0) {
            b.classList.remove('bump');
            void b.offsetWidth;
            b.classList.add('bump');
        }
    });
}
function updateWishlistBadge() {
    const count = userWishlist.length;
    ['wishlistBadge', 'wishlistBadgeMobile'].forEach(id => {
        const b = document.getElementById(id);
        if (!b) return;
        b.textContent = count > 99 ? '99+' : count;
        b.style.display = count > 0 ? 'flex' : 'none';
        if (count > 0) {
            b.classList.remove('bump');
            void b.offsetWidth;
            b.classList.add('bump');
        }
    });
}
function updateCartBadge() {
    const count = userCart.reduce((a,b) => a + ((b && b.quantity) || 1), 0);
    ['cartBadge', 'cartBadgeMobile'].forEach(id => {
        const b = document.getElementById(id);
        if (!b) return;
        b.textContent = count > 99 ? '99+' : count;
        b.style.display = count > 0 ? 'flex' : 'none';
        if (count > 0) {
            b.classList.remove('bump');
            void b.offsetWidth;
            b.classList.add('bump');
        }
    });
}

function updateOrdersBadge() {
    let count = window.myOrders ? window.myOrders.length : parseInt(localStorage.getItem(STORAGE_KEYS.ordersCount) || '0');
    try { localStorage.setItem(STORAGE_KEYS.ordersCount, String(count)); } catch(e) {}
    const prevCount = parseInt(localStorage.getItem(STORAGE_KEYS.ordersCount + '_prev') || '-1');
    ['ordersBadge', 'ordersBadgeMobile'].forEach(id => {
        const b = document.getElementById(id);
        if (!b) return;
        b.textContent = count > 99 ? '99+' : count;
        b.style.display = count > 0 ? 'flex' : 'none';
        if (count > 0 && count !== prevCount) {
            b.classList.remove('bump');
            void b.offsetWidth;
            b.classList.add('bump');
        }
    });
    try { localStorage.setItem(STORAGE_KEYS.ordersCount + '_prev', String(count)); } catch(e) {}
}

function loadNotifications() { const c = document.getElementById('notificationsContent'); if (!c) return; const l = document.documentElement.lang || 'ar'; if (userNotifications.length === 0) { c.innerHTML = `<div class="empty-dropdown"><i class="fas fa-bell-slash"></i><p>${l === 'ar' ? 'لا توجد إشعارات' : l === 'en' ? 'No notifications' : 'Aucune notification'}</p></div>`; return; } c.innerHTML = userNotifications.slice(0, 5).map(n => `<div class="dropdown-item ${n.read ? 'read' : ''}" onclick="markNotificationAsRead('${n.id}')"><div class="dropdown-item-icon"><i class="fas ${n.icon || 'fa-bell'}"></i></div><div class="dropdown-item-content"><h5>${n.title}</h5><p>${n.message}</p></div>${!n.read ? '<div class="notification-unread"></div>' : ''}</div>`).join(''); }

// ==================== ENHANCED WISHLIST DROPDOWN ====================
function loadWishlistDropdown() {
    const c = document.getElementById('wishlistContent');
    if (!c) return;
    const lang = document.documentElement.lang || 'ar';
    if (lang === 'ar') { _renderWishlistDropdown(c, 'ar', {}); return; }
    var _translatedTitles = {};
    var _promises = userWishlist.slice(0, 5).map(function(item) {
        var prod = window.allProducts && window.allProducts.find(function(p){ return p.id === item.id; });
        var val = prod && prod.title;
        var arabic = '';
        if (typeof val === 'string' && _isArabic(val)) arabic = val;
        else if (val && typeof val === 'object' && val.ar && _isArabic(val.ar)) arabic = val.ar;
        else if (typeof item.title === 'string' && _isArabic(item.title)) arabic = item.title;
        if (arabic) {
            return _translateText(arabic, lang).then(function(t) {
                if (t && t !== arabic) { _translatedTitles[item.id] = t; _translatedTitles[arabic] = t; }
            }).catch(function(){});
        }
        return Promise.resolve();
    });
    Promise.all(_promises).then(function(){ _renderWishlistDropdown(c, lang, _translatedTitles); });
}
function _renderWishlistDropdown(c, lang, translatedTitles) {
    const catEmojis = { books: '📚', software: '💻', formulas: '🧪', courses: '🎓' };

    if (userWishlist.length === 0) {
        c.innerHTML = `
            <div class="empty-dropdown">
                <div style="width:80px;height:80px;margin:0 auto 15px;border-radius:50%;background:linear-gradient(135deg,rgba(239,68,68,0.1),rgba(236,72,153,0.05));display:flex;align-items:center;justify-content:center">
                    <i class="fas fa-heart" style="font-size:2.2em;color:#ef4444"></i>
                </div>
                <p style="font-weight:700;font-size:1.05em;margin-bottom:5px;color:var(--text-primary)">${lang === 'ar' ? 'المفضلة فارغة' : lang === 'en' ? 'Wishlist is empty' : 'Liste de souhaits vide'}</p>
                <p style="font-size:0.85em">${lang === 'ar' ? 'أضف منتجات تعجبك' : lang === 'en' ? 'Add products you like' : 'Ajoutez des produits'}</p>
            </div>`;
        return;
    }

    function _wt(item) {
        if (translatedTitles[item.id]) return translatedTitles[item.id];
        var prod = window.allProducts && window.allProducts.find(function(p){ return p.id === item.id; });
        var val = prod && prod.title;
        if (val && typeof val === 'object' && val[lang] && !_isArabic(val[lang])) return val[lang];
        if (val && typeof val === 'object' && val.ar && translatedTitles[val.ar]) return translatedTitles[val.ar];
        if (typeof val === 'string' && !_isArabic(val)) return val;
        if (typeof item.title === 'string' && !_isArabic(item.title)) return item.title;
        if (translatedTitles[item.title]) return translatedTitles[item.title];
        var tKey = (typeof val === 'string' ? val : (val && val.ar) || item.title) + '|' + lang;
        try { if (_transCache && _transCache[tKey] && !_isArabic(_transCache[tKey])) return _transCache[tKey]; } catch(e) {}
        try { var lc = JSON.parse(localStorage.getItem('translationCache') || '{}'); var lcKey = 'ar|' + lang + '|' + ((typeof val === 'string' ? val : (val && val.ar) || item.title)); if (lc[lcKey] && lc[lcKey] !== (typeof val === 'string' ? val : (val && val.ar))) return lc[lcKey]; } catch(e) {}
        return item.title || '';
    }

    c.innerHTML = userWishlist.slice(0, 5).map(item => {
        const price = getProductPrice(item);
        const cur = getUserCurrency().symbol;
        const catKey = item.category || '';
        const catName = APP_CONFIG.categories[lang]?.[catKey] || item.categoryName || catKey;
        const catEmoji = catEmojis[catKey] || '📦';
        var wishTitle = _wt(item);

        return `
            <div class="dropdown-item" onclick="window.location.href='product-details.html?id=${item.id}'" style="align-items:center;padding:12px 14px;border-radius:16px;background:var(--card-bg);border:1.5px solid var(--border-color);margin-bottom:8px;transition:all 0.3s;cursor:pointer;box-shadow:0 2px 8px rgba(0,0,0,0.06)">
                <div style="width:52px;height:52px;min-width:52px;border-radius:12px;overflow:hidden;background:rgba(147,51,234,0.08);display:flex;align-items:center;justify-content:center;flex-shrink:0">
                    ${item.image
                        ? `<img src="${item.image}" alt="${wishTitle}" style="width:100%;height:100%;object-fit:cover;border-radius:12px">`
                        : `<i class="fas ${item.icon || 'fa-box'}" style="font-size:1.4em;color:#9333ea"></i>`
                    }
                </div>
                <div style="flex:1;min-width:0;overflow:hidden;padding:0 10px">
                    <h5 style="margin:0 0 4px;font-size:0.92em;font-weight:700;color:var(--text-primary);white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${wishTitle}</h5>
                    <div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap">
                        <span style="font-size:0.75em;font-weight:700;color:#f59e0b;background:rgba(245,158,11,0.1);padding:2px 10px;border-radius:10px;display:inline-flex;align-items:center;gap:4px;border:1px solid rgba(245,158,11,0.15)">${catEmoji} ${catName}</span>
                        <span style="font-size:1em;font-weight:900;color:#f59e0b">${price}</span>
                        <span style="font-size:0.75em;color:var(--text-secondary);font-weight:600">${cur}</span>
                    </div>
                </div>
                <div style="display:flex;gap:6px;flex-shrink:0">
                    <button onclick="event.stopPropagation();addToCart('${item.id}', event)" style="width:36px;height:36px;min-width:36px;background:rgba(16,185,129,0.08);border:1.5px solid rgba(16,185,129,0.15);border-radius:10px;color:#10b981;cursor:pointer;display:flex;align-items:center;justify-content:center;font-size:0.95em;transition:all 0.3s" onmouseover="this.style.background='#10b981';this.style.color='white';this.style.borderColor='#10b981'" onmouseout="this.style.background='rgba(16,185,129,0.08)';this.style.color='#10b981';this.style.borderColor='rgba(16,185,129,0.15)'">
                        <i class="fas fa-cart-plus"></i>
                    </button>
                    <button onclick="event.stopPropagation();toggleWishlist('${item.id}', event)" style="width:36px;height:36px;min-width:36px;background:rgba(239,68,68,0.08);border:1.5px solid rgba(239,68,68,0.15);border-radius:10px;color:#ef4444;cursor:pointer;display:flex;align-items:center;justify-content:center;font-size:0.95em;transition:all 0.3s" onmouseover="this.style.background='#ef4444';this.style.color='white';this.style.borderColor='#ef4444'" onmouseout="this.style.background='rgba(239,68,68,0.08)';this.style.color='#ef4444';this.style.borderColor='rgba(239,68,68,0.15)'">
                        <i class="fas fa-trash-alt"></i>
                    </button>
                </div>
            </div>`;
    }).join('') + `
        ${userWishlist.length > 0 ? `
        <div style="text-align:center;margin-top:8px;padding-top:10px;border-top:1.5px solid var(--border-color)">
            <span style="font-size:0.85em;color:var(--text-secondary);font-weight:600;display:inline-flex;align-items:center;gap:6px">
                ${userWishlist.length} ${lang === 'ar' ? 'منتجات في المفضلة' : lang === 'en' ? 'items in wishlist' : 'articles dans la liste'}
                <i class="fas fa-heart" style="color:#ef4444"></i>
            </span>
        </div>` : ''}`;
}

// ==================== ENHANCED CART DROPDOWN ====================
function loadCartDropdown() {
    const c = document.getElementById('cartContent');
    if (!c) return;
    const lang = document.documentElement.lang || 'ar';
    if (lang === 'ar') { _renderCartDropdown(c, 'ar', {}); return; }
    var _translatedTitles = {};
    var _promises = userCart.slice(0, 5).map(function(item) {
        var prod = window.allProducts && window.allProducts.find(function(p){ return p.id === item.id; });
        var val = prod && prod.title;
        var arabic = '';
        if (typeof val === 'string' && _isArabic(val)) arabic = val;
        else if (val && typeof val === 'object' && val.ar && _isArabic(val.ar)) arabic = val.ar;
        else if (typeof item.title === 'string' && _isArabic(item.title)) arabic = item.title;
        if (arabic) {
            return _translateText(arabic, lang).then(function(t) {
                if (t && t !== arabic) { _translatedTitles[item.id] = t; _translatedTitles[arabic] = t; }
            }).catch(function(){});
        }
        return Promise.resolve();
    });
    Promise.all(_promises).then(function(){ _renderCartDropdown(c, lang, _translatedTitles); });
}
function _renderCartDropdown(c, lang, translatedTitles) {
    const origLen = userCart.length;
    userCart = userCart.filter(item => item && item.id && item.id !== 'undefined' && item.title && item.title !== 'undefined' && (item.price !== undefined && item.price !== null));
    if (userCart.length !== origLen) {
        localStorage.setItem(STORAGE_KEYS.cart, JSON.stringify(userCart));
    }

    if (userCart.length === 0) {
        c.innerHTML = `
            <div class="empty-dropdown">
                <div style="width:80px;height:80px;margin:0 auto 15px;border-radius:50%;background:linear-gradient(135deg,rgba(16,185,129,0.1),rgba(16,185,129,0.05));display:flex;align-items:center;justify-content:center">
                    <i class="fas fa-shopping-cart" style="font-size:2.2em;color:#10b981"></i>
                </div>
                <p style="font-weight:700;font-size:1.05em;margin-bottom:5px;color:var(--text-primary)">${lang === 'ar' ? 'السلة فارغة' : lang === 'en' ? 'Cart is empty' : 'Panier vide'}</p>
                <p style="font-size:0.85em">${lang === 'ar' ? 'أضف منتجات للسلة' : lang === 'en' ? 'Add products to cart' : 'Ajoutez des produits'}</p>
            </div>`;
        return;
    }

    const catEmojis = { books: '📚', software: '💻', formulas: '🧪', courses: '🎓' };
    let totalPrice = 0;
    const itemsHTML = userCart.slice(0, 5).map(item => {
        const price = getProductPrice(item) || parseFloat(item.price || 0);
        const qty = item.quantity || 1;
        const cur = getUserCurrency().symbol;
        totalPrice += (parseFloat(price) || 0) * qty;
        const catKey = item.category || '';
        const catName = APP_CONFIG.categories[lang]?.[catKey] || item.categoryName || catKey;
        const catEmoji = catEmojis[catKey] || '📦';
        var cartTitle = (function() {
            if (translatedTitles[item.id]) return translatedTitles[item.id];
            var prod = window.allProducts && window.allProducts.find(function(p){ return p.id === item.id; });
            var val = prod && prod.title;
            if (val && typeof val === 'object' && val[lang] && !_isArabic(val[lang])) return val[lang];
            if (val && typeof val === 'object' && val.ar && translatedTitles[val.ar]) return translatedTitles[val.ar];
            if (typeof val === 'string' && !_isArabic(val)) return val;
            if (typeof item.title === 'string' && !_isArabic(item.title)) return item.title;
            if (translatedTitles[item.title]) return translatedTitles[item.title];
            var tKey = (typeof val === 'string' ? val : (val && val.ar) || item.title) + '|' + lang;
            try { if (_transCache && _transCache[tKey] && !_isArabic(_transCache[tKey])) return _transCache[tKey]; } catch(e) {}
            return item.title || '';
        })();

        return `
            <div class="dropdown-item" style="align-items:center;padding:12px;border-radius:16px;background:rgba(245,158,11,0.04);border:1px solid rgba(245,158,11,0.12);margin-bottom:10px;transition:all 0.3s">
                <div style="width:45px;height:45px;min-width:45px;border-radius:12px;overflow:hidden;background:rgba(245,158,11,0.08);display:flex;align-items:center;justify-content:center;flex-shrink:0">
                    ${item.image
                        ? `<img src="${item.image}" alt="${cartTitle}" style="width:100%;height:100%;object-fit:cover;border-radius:12px">`
                        : `<i class="fas ${item.icon || 'fa-box'}" style="font-size:1.3em;color:#f59e0b"></i>`
                    }
                </div>
                <div style="flex:1;min-width:0;padding:0 8px">
                    <h5 style="margin:0 0 4px;font-size:0.95em;font-weight:800;color:var(--text-primary);white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${cartTitle}</h5>
                    <div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap">
                        <span style="font-size:0.75em;font-weight:700;color:#f59e0b;background:rgba(245,158,11,0.1);padding:2px 10px;border-radius:10px;display:inline-flex;align-items:center;gap:4px;border:1px solid rgba(245,158,11,0.15)">${catEmoji} ${catName}</span>
                        <span style="font-size:1.05em;font-weight:900;color:#f59e0b">${price}</span>
                        <span style="font-size:0.8em;color:var(--text-secondary);font-weight:600">${cur}</span>
                    </div>
                    <div style="display:flex;align-items:center;gap:6px;margin-top:6px">
                        <button onclick="event.stopPropagation();updateCartQuantity('${item.id}', -1, event)" style="width:28px;height:28px;border-radius:8px;border:1px solid rgba(245,158,11,0.2);background:rgba(245,158,11,0.08);color:#f59e0b;cursor:pointer;display:flex;align-items:center;justify-content:center;font-size:0.85em;font-weight:700;transition:all 0.2s">−</button>
                        <span style="font-size:0.9em;font-weight:700;color:var(--text-primary);min-width:20px;text-align:center">${qty}</span>
                        <button onclick="event.stopPropagation();updateCartQuantity('${item.id}', 1, event)" style="width:28px;height:28px;border-radius:8px;border:1px solid rgba(245,158,11,0.2);background:rgba(245,158,11,0.08);color:#f59e0b;cursor:pointer;display:flex;align-items:center;justify-content:center;font-size:0.85em;font-weight:700;transition:all 0.2s">+</button>
                    </div>
                </div>
                <button onclick="event.stopPropagation();removeFromCart('${item.id}', event)" style="width:38px;height:38px;min-width:38px;background:rgba(239,68,68,0.08);border:1.5px solid rgba(239,68,68,0.15);border-radius:12px;color:#ef4444;cursor:pointer;display:flex;align-items:center;justify-content:center;font-size:1em;transition:all 0.3s" onmouseover="this.style.background='#ef4444';this.style.color='white';this.style.borderColor='#ef4444';this.style.transform='scale(1.1)'" onmouseout="this.style.background='rgba(239,68,68,0.08)';this.style.color='#ef4444';this.style.borderColor='rgba(239,68,68,0.15)';this.style.transform='scale(1)'">
                    <i class="fas fa-trash-alt"></i>
                </button>
            </div>`;
    }).join('');

    const cur = getUserCurrency().symbol;

    c.innerHTML = itemsHTML + `
        <div style="margin-top:15px;padding:16px;background:linear-gradient(135deg,rgba(245,158,11,0.08),rgba(245,158,11,0.04));border-radius:16px;border:1.5px solid rgba(245,158,11,0.15)">
            <div style="display:flex;justify-content:center;align-items:center;gap:10px">
                <span style="font-size:0.95em;font-weight:700;color:var(--text-secondary);display:flex;align-items:center;gap:6px">
                    <i class="fas fa-receipt" style="color:#f59e0b"></i>
                    ${lang === 'ar' ? 'الإجمالي' : lang === 'en' ? 'Total' : 'Total'}
                </span>
                <span style="font-size:1.3em;font-weight:900;color:#f59e0b">${Math.round(totalPrice)} ${cur}</span>
            </div>
        </div>`;

}

// ==================== DROPDOWNS - FIXED v7 ====================
function fixDropdownPosition(dropdown) {
    if (window.innerWidth <= 768) return;
    const menu = dropdown.querySelector('.dropdown-menu'); if (!menu) return;
    menu.style.removeProperty('left'); menu.style.removeProperty('right'); menu.style.removeProperty('transform'); menu.style.removeProperty('position'); menu.style.removeProperty('top');
    requestAnimationFrame(() => {
        const r = menu.getBoundingClientRect(), vw = window.innerWidth, rtl = document.documentElement.dir === 'rtl' || document.body.getAttribute('dir') === 'rtl';
        const oR = r.right - vw, oL = -r.left;
        if (oL > 0) { if (rtl) { const cr = parseFloat(getComputedStyle(menu).right) || 0; menu.style.right = (cr - oL - 15) + 'px'; menu.style.left = 'auto'; } else { menu.style.left = '10px'; menu.style.right = 'auto'; } menu.style.transform = 'translateY(0) scale(1)'; }
        if (oR > 0) { if (rtl) { menu.style.right = '0px'; menu.style.left = 'auto'; } else { const cl = parseFloat(getComputedStyle(menu).left) || 0; menu.style.left = (cl - oR - 15) + 'px'; menu.style.right = 'auto'; } menu.style.transform = 'translateY(0) scale(1)'; }
        const fr = menu.getBoundingClientRect();
        if (fr.left < 5 || fr.right > vw - 5) { const br = dropdown.querySelector('.action-btn').getBoundingClientRect(); menu.style.position = 'fixed'; menu.style.top = (br.bottom + 10) + 'px'; menu.style.transform = 'scale(1)'; if (rtl) { if (br.right - 360 < 10) { menu.style.left = '10px'; menu.style.right = 'auto'; } else { menu.style.right = (vw - br.right) + 'px'; menu.style.left = 'auto'; } } else { if (br.left + 360 > vw - 10) { menu.style.right = '10px'; menu.style.left = 'auto'; } else { menu.style.left = br.left + 'px'; menu.style.right = 'auto'; } } }
    });
}

function resetDropdownStyles(d) {
    const m = d.querySelector('.dropdown-menu');
    if (!m) return;
    m.style.removeProperty('left');
    m.style.removeProperty('right');
    m.style.removeProperty('transform');
    m.style.removeProperty('position');
    m.style.removeProperty('top');
}

function toggleDropdown(id) {
    const d = document.getElementById(id);
    const o = document.getElementById('dropdownOverlay');
    if (!d) return;

    const isActive = d.classList.contains('active');

    // أغلق الكل الأول
    closeAllDropdowns();

    if (!isActive) {
        d.classList.add('active');
        if (o) o.classList.add('active');
        activeDropdown = d;

        // ✅ حفظ موضع السكرول + منع الحركة على الموبايل
        if (window.innerWidth <= 768) {
            document.body.dataset.scrollY = String(window.scrollY);
            document.body.classList.add('dropdown-open');
            document.body.style.top = '-' + window.scrollY + 'px';
        }

        setTimeout(function() { fixDropdownPosition(d); }, 50);

        setTimeout(function() {
            if (id === 'notificationsDropdown') loadNotifications();
            if (id === 'wishlistDropdown') loadWishlistDropdown();
            if (id === 'cartDropdown') loadCartDropdown();
        }, 100);
    }
}

function closeAllDropdowns() {
    document.querySelectorAll('.dropdown').forEach(function(d) {
        d.classList.remove('active');
        resetDropdownStyles(d);
    });

    var o = document.getElementById('dropdownOverlay');
    if (o) o.classList.remove('active');

    // ✅ إرجاع السكرول لمكانه الأصلي
    if (document.body.classList.contains('dropdown-open')) {
        var scrollY = parseInt(document.body.dataset.scrollY || '0', 10);
        document.body.classList.remove('dropdown-open');
        document.body.style.removeProperty('top');
        document.body.style.removeProperty('position');
        document.body.style.removeProperty('width');
        document.body.style.removeProperty('overflow');
        window.scrollTo(0, scrollY);
    }

    activeDropdown = null;
}

function initializeDropdowns() {
    // منع إغلاق القائمة لما تضغط جواها
    document.querySelectorAll('.dropdown-menu').forEach(function(m) {
        m.addEventListener('click', function(e) { e.stopPropagation(); });
    });

    // إغلاق لما تضغط برة القائمة
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.dropdown') && activeDropdown) {
            closeAllDropdowns();
        }
    });

    // إغلاق بالضغط على الـ overlay
    var o = document.getElementById('dropdownOverlay');
    if (o) {
        o.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            closeAllDropdowns();
        });

        // ✅ منع السكرول من خلال الـ overlay
        o.addEventListener('touchmove', function(e) {
            e.preventDefault();
        }, { passive: false });
    }

    // Escape
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && activeDropdown) closeAllDropdowns();
    });

    // تغيير حجم الشاشة
    window.addEventListener('resize', function() {
        if (activeDropdown) closeAllDropdowns();
    });

    // ✅ سحب لأسفل لإغلاق القائمة (Swipe Down)
    var touchStartY = 0;
    var touchCurrentY = 0;
    var isSwiping = false;

    document.addEventListener('touchstart', function(e) {
        if (!activeDropdown) return;
        var menu = activeDropdown.querySelector('.dropdown-menu');
        if (!menu || !menu.contains(e.target)) return;

        // فقط لو السكرول في أعلى المحتوى
        var content = menu.querySelector('.dropdown-content, .user-menu-content');
        if (content && content.scrollTop > 5) return;

        touchStartY = e.touches[0].clientY;
        isSwiping = true;
    }, { passive: true });

    document.addEventListener('touchmove', function(e) {
        if (!isSwiping || !activeDropdown) return;
        touchCurrentY = e.touches[0].clientY;

        var diff = touchCurrentY - touchStartY;
        if (diff > 0) {
            // سحب لأسفل - حرك القائمة
            var menu = activeDropdown.querySelector('.dropdown-menu');
            if (menu) {
                menu.style.transition = 'none';
                menu.style.transform = 'translateY(' + Math.min(diff, 300) + 'px)';
            }
        }
    }, { passive: true });

    document.addEventListener('touchend', function(e) {
        if (!isSwiping || !activeDropdown) return;

        var diff = touchCurrentY - touchStartY;
        var menu = activeDropdown.querySelector('.dropdown-menu');

        if (menu) {
            menu.style.transition = '';
            menu.style.transform = '';
        }

        // لو سحب أكتر من 80px لأسفل → أغلق
        if (diff > 80) {
            closeAllDropdowns();
        }

        touchStartY = 0;
        touchCurrentY = 0;
        isSwiping = false;
    }, { passive: true });
}

// ==================== MOBILE MENU ====================
function toggleMobileMenu() { const n = document.getElementById('navMenu'), i = document.getElementById('mobileMenuIcon'); if (!n || !i) return; n.classList.toggle('active'); i.classList.toggle('fa-bars'); i.classList.toggle('fa-times'); }
document.addEventListener('click', e => { const n = document.getElementById('navMenu'), i = document.getElementById('mobileMenuIcon'); if (e.target.closest('.nav-menu a') || (!e.target.closest('.nav-menu') && !e.target.closest('.mobile-menu-toggle'))) { if (n) n.classList.remove('active'); if (i) { i.classList.add('fa-bars'); i.classList.remove('fa-times'); } } });

// ==================== THEME & LANGUAGE ====================
function getLangFlagHtml(langCode) {
    try {
        var d = localStorage.getItem('admin_languages');
        if (d) {
            var langs = JSON.parse(d);
            for (var i = 0; i < langs.length; i++) {
                if (langs[i].code === langCode) {
                    var l = langs[i];
                    if (l.flagUrl) return '<img src="'+l.flagUrl+'" alt="" style="display:inline-block;width:40px;height:28px;border-radius:4px;object-fit:cover;box-shadow:0 2px 8px rgba(0,0,0,0.3);vertical-align:middle;">';
                    if (l.flagEmoji) return '<span class="flag-icon">'+l.flagEmoji+'</span>';
                    break;
                }
            }
        }
    } catch(e){}
    var _flagSvgs = { ar:'https://cdn.jsdelivr.net/gh/lipis/flag-icons@main/flags/1x1/eg.svg', en:'https://cdn.jsdelivr.net/gh/lipis/flag-icons@main/flags/1x1/gb.svg', fr:'https://cdn.jsdelivr.net/gh/lipis/flag-icons@main/flags/1x1/fr.svg' };
    var url = _flagSvgs[langCode] || _flagSvgs['ar'];
    return '<img src="'+url+'" alt="'+langCode+'" style="display:inline-block;width:40px;height:28px;border-radius:4px;object-fit:cover;box-shadow:0 2px 8px rgba(0,0,0,0.3);vertical-align:middle;">';
}

var LANG_DISPLAY_NAMES = { ar:'العربية', en:'English', fr:'French' };

function initLangDropdown() {
    try {
        var d = localStorage.getItem('admin_languages');
        if (!d) return;
        var langs = JSON.parse(d);
        if (!Array.isArray(langs) || langs.length === 0) return;
        var cur = currentLang || 'ar';
        var content = document.getElementById('languageContent');
        if (content) {
            content.innerHTML = '';
            langs.forEach(function(l){
                if (l.enabled === false) return;
                var flagHtml = l.flagUrl ? '<img src="'+l.flagUrl+'" style="display:inline-block;width:30px;height:22px;border-radius:3px;object-fit:cover;vertical-align:middle;box-shadow:0 2px 8px rgba(0,0,0,0.3);">' : '<span class="flag-icon" style="font-size:1.4em;">'+(l.flagEmoji||'🏳️')+'</span>';
                var label = LANG_DISPLAY_NAMES[l.code] || l.code.toUpperCase();
                var code = l.code.toUpperCase();
                var btn = document.createElement('button');
                btn.className = 'lang-option' + (l.code === cur ? ' active' : '');
                btn.setAttribute('onclick', "switchLanguage('"+l.code+"')");
                btn.innerHTML = flagHtml + ' <strong style="font-size:0.82em;opacity:0.7;letter-spacing:0.5px;font-family:Poppins,sans-serif;">' + code + '</strong> ' + escHtml(label);
                content.appendChild(btn);
            });
        }
        var lt = document.getElementById('langText');
        if (lt) lt.innerHTML = getLangFlagHtml(cur);
    } catch(e){}
}

function escHtml(s) {
    if (typeof s !== 'string') return '';
    return s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}

function initCatsFromStorage() {
    try {
        var d = localStorage.getItem('admin_categories');
        if (!d) return;
        var cats = JSON.parse(d);
        if (!Array.isArray(cats) || cats.length === 0) return;
        var rebuilt = { ar:{}, en:{}, fr:{} };
        ['ar','en','fr'].forEach(function(l){
            cats.forEach(function(c){
                if (c.enabled === false) return;
                rebuilt[l][c.key] = c.label[l] || c.label.ar;
            });
        });
        APP_CONFIG.categories = rebuilt;
    } catch(e){}
}

function switchLanguage(lang) {
    if (lang === currentLang) { closeAllDropdowns(); return; }
    currentLang = lang;
    localStorage.setItem(STORAGE_KEYS.lang, currentLang);
    document.documentElement.lang = currentLang;
    document.documentElement.dir = currentLang === 'ar' ? 'rtl' : 'ltr';
    document.body.setAttribute('dir', currentLang === 'ar' ? 'rtl' : 'ltr');
    const lt = document.getElementById('langText');
    if (lt) lt.innerHTML = getLangFlagHtml(currentLang);
    const mobileLt = document.getElementById('mobileLangText');
    if (mobileLt) mobileLt.innerHTML = '<span class="flag-icon">' + getLangFlagHtml(currentLang) + '</span> ' + (currentLang === 'ar' ? 'العربية' : currentLang === 'en' ? 'English' : 'Français');
    translatePage(currentLang);
    var _postTranslate = function() {
        if (typeof loadCartDropdown === 'function') loadCartDropdown();
        if (typeof loadWishlistDropdown === 'function') loadWishlistDropdown();
        if (window.location.pathname.includes('cart') && typeof window.renderCartPage === 'function') window.renderCartPage();
    };
    if (window.location.pathname.toLowerCase().includes('wishlist')) {
        autoTranslateProducts(currentLang).then(function() {
            _postTranslate();
            if (window.renderWishlistPage) renderWishlistPage();
        }).catch(function() {
            _postTranslate();
            if (window.renderWishlistPage) renderWishlistPage();
        });
    } else if (window.displayProducts) {
        autoTranslateProducts(currentLang).then(function() {
            _postTranslate();
            displayProducts();
        }).catch(function() {
            _postTranslate();
            displayProducts();
        });
    } else {
        autoTranslateProducts(currentLang).then(function() { _postTranslate(); }).catch(function() { _postTranslate(); });
    }
    if (window.location.pathname.includes('checkout')) { displayPaymentMethods(); if (window._checkoutLoadingStart) { var _elapsed = Date.now() - window._checkoutLoadingStart; var _remaining = Math.max(0, 2200 - _elapsed); setTimeout(function() { displayCheckoutOrderSummary(); }, _remaining); } else { displayCheckoutOrderSummary(); } }
    if (window.location.pathname.includes('product-details') && typeof window.displayProduct === 'function') {
        (async function() {
            await autoTranslateProducts(currentLang);
            if (window.currentProduct && typeof window._translateProductField === 'function') {
                await window._translateProductField(window.currentProduct, 'title', currentLang);
                await window._translateProductField(window.currentProduct, 'description', currentLang);
                if (typeof window._translateProductArrayField === 'function') {
                    await window._translateProductArrayField(window.currentProduct, 'features', currentLang);
                    await window._translateProductArrayField(window.currentProduct, 'requirements', currentLang);
                    await window._translateProductArrayField(window.currentProduct, 'faq', currentLang);
                }
            }
            window.displayProduct();
        })();
    }
    if (window.location.pathname.includes('orders.html') || (window.location.pathname.endsWith('/') === false && window.location.pathname.endsWith('orders'))) {
        if (typeof _execOrdersSearch === 'function') _execOrdersSearch();
        else if (window.myOrders && window.renderOrdersList) window.renderOrdersList(window.myOrders);
        if (window.myOrders) {
            var _tE = document.getElementById('totalOrders'), _cE = document.getElementById('completedOrders'), _pE = document.getElementById('pendingOrders'), _sE = document.getElementById('totalSpent');
            if (_tE) _tE.textContent = window.myOrders.length;
            if (_cE) _cE.textContent = window.myOrders.filter(function(o) { return o.status === 'confirmed'; }).length;
            if (_pE) _pE.textContent = window.myOrders.filter(function(o) { return o.status === 'pending' || o.status === 'suspended'; }).length;
            if (_sE) _sE.textContent = window.myOrders.filter(function(o) { return o.status === 'confirmed'; }).reduce(function(s, o) { return s + parseFloat(o.price || 0); }, 0).toFixed(0);
        }
    }
    if (window.location.pathname.includes('admin.html') || window.location.pathname.includes('admin')) {
        if (typeof applyAdminOrdersFilter === 'function') applyAdminOrdersFilter();
        if (typeof applyAdminProductsFilter === 'function') applyAdminProductsFilter();
        if (typeof window.applyCustomersFilter === 'function') window.applyCustomersFilter();
    }
    if (window.location.pathname.includes('pending-order.html')) {
        if (typeof window._rerenderPendingOrder === 'function') window._rerenderPendingOrder();
    }
    if (window.location.pathname.includes('Profile.html') || window.location.pathname.includes('profile.html')) {
        if (typeof window._rerenderProfile === 'function') window._rerenderProfile();
    }
    closeAllDropdowns();
}

function toggleLanguage() {
    var langs = ['ar','en','fr'];
    var next = langs[(langs.indexOf(currentLang) + 1) % langs.length];
    switchLanguage(next);
}

// ╔═══════════════════════════════════════════════════════╗
// ║   Auto-Translation System (MyMemory API + Cache)      ║
// ╚═══════════════════════════════════════════════════════╝

var _translationCache = {};
(function() {
    try {
        var cacheVer = localStorage.getItem('translationCacheVer');
        if (cacheVer !== 'v3') {
            localStorage.removeItem('translationCache');
            localStorage.setItem('translationCacheVer', 'v3');
        } else {
            var stored = localStorage.getItem('translationCache');
            if (stored) _translationCache = JSON.parse(stored);
        }
    } catch(e) {}
})();

function _saveTranslationCache() {
    try { localStorage.setItem('translationCache', JSON.stringify(_translationCache)); } catch(e) {}
}

function _applyCachedTranslations(products, lang) {
    if (!lang || lang === 'ar' || !products || !products.length) return;
    try { var lc = JSON.parse(localStorage.getItem('translationCache') || '{}'); for (var k in lc) { if (!_translationCache[k]) _translationCache[k] = lc[k]; } } catch(e) {}
    var fields = ['title', 'description'];
    products.forEach(function(p) {
        if (!p) return;
        fields.forEach(function(f) {
            var val = p[f];
            if (typeof val === 'string' && _isArabic(val)) {
                var key = _cacheKey(val, 'ar', lang);
                if (_translationCache[key]) {
                    var obj = { ar: val };
                    obj[lang] = _translationCache[key];
                    p[f] = obj;
                }
            } else if (typeof val === 'object' && val !== null && !Array.isArray(val) && val.ar && _isArabic(val.ar)) {
                if (!val[lang] || val[lang] === val.ar || _isArabic(val[lang] || '')) {
                    var key2 = _cacheKey(val.ar, 'ar', lang);
                    if (_translationCache[key2]) val[lang] = _translationCache[key2];
                }
            }
        });
    });
}
window._applyCachedTranslations = _applyCachedTranslations;

function _cacheKey(text, fromLang, toLang) {
    return fromLang + '|' + toLang + '|' + text;
}

var _pendingTranslations = {};
var _translationQueue = [];
var _translationTimer = null;

async function autoTranslate(text, fromLang, toLang) {
    if (!text || !text.trim()) return text;
    if (fromLang === toLang) return text;
    var key = _cacheKey(text, fromLang, toLang);
    if (_translationCache[key]) return _translationCache[key];
    return new Promise(function(resolve) {
        _translationQueue.push({ text: text, from: fromLang, to: toLang, resolve: resolve });
        clearTimeout(_translationTimer);
        _translationTimer = setTimeout(_processTranslationQueue, 150);
    });
}

async function _processTranslationQueue() {
    var batch = _translationQueue.splice(0);
    if (batch.length === 0) return;
    var fromLang = batch[0].from;
    var toLang = batch[0].to;
    var apiLang = fromLang + '|' + toLang;
    var uniqueTexts = [];
    var textMap = {};
    batch.forEach(function(item) {
        var key = _cacheKey(item.text, item.from, item.to);
        if (_translationCache[key]) {
            item.resolve(_translationCache[key]);
        } else if (!textMap[item.text]) {
            textMap[item.text] = [item.resolve];
            uniqueTexts.push(item.text);
        } else {
            textMap[item.text].push(item.resolve);
        }
    });
    if (uniqueTexts.length === 0) return;
    for (var i = 0; i < uniqueTexts.length; i++) {
        var text = uniqueTexts[i];
        try {
            var tText = null;
            try {
                var url = 'https://translate.googleapis.com/translate_a/single?client=gtx&sl=' + fromLang + '&tl=' + toLang + '&dt=t&q=' + encodeURIComponent(text);
                var resp = await fetch(url);
                var data = await resp.json();
                if (data && data[0]) tText = data[0].map(function(s) { return s[0]; }).join('');
            } catch(e1) {}
            if (!tText) {
                var url2 = 'https://api.mymemory.translated.net/get?q=' + encodeURIComponent(text.slice(0, 500)) + '&langpair=' + encodeURIComponent(apiLang);
                var resp2 = await fetch(url2);
                var data2 = await resp2.json();
                if (data2.responseStatus === 200 && data2.responseData && data2.responseData.translatedText) {
                    tText = data2.responseData.translatedText;
                }
            }
            if (tText && tText.toUpperCase() !== text.toUpperCase()) {
                _translationCache[_cacheKey(text, fromLang, toLang)] = tText;
                (textMap[text] || []).forEach(function(r) { r(tText); });
            } else {
                (textMap[text] || []).forEach(function(r) { r(text); });
            }
        } catch(e) {
            (textMap[text] || []).forEach(function(r) { r(text); });
        }
        if (i < uniqueTexts.length - 1) await new Promise(function(r) { setTimeout(r, 100); });
    }
    _saveTranslationCache();
}

function _isArabic(text) {
    return /[\u0600-\u06FF]/.test(text);
}

function _getTranslation(text, toLang) {
    if (!text || !_isArabic(text)) return text;
    if (toLang === 'ar') return text;
    var fromLang = 'ar';
    var key = _cacheKey(text, fromLang, toLang);
    if (_translationCache[key]) return _translationCache[key];
    try {
        var localCache = JSON.parse(localStorage.getItem('translationCache') || '{}');
        if (localCache[key]) { _translationCache[key] = localCache[key]; return localCache[key]; }
    } catch(e) {}
    try { var altKey = text + '|' + toLang; if (typeof _transCache !== 'undefined' && _transCache[altKey] && !_isArabic(_transCache[altKey])) { _translationCache[key] = _transCache[altKey]; return _transCache[altKey]; } } catch(e) {}
    autoTranslate(text, fromLang, toLang);
    return text;
}

function _translateBatch(texts, toLang) {
    if (toLang === 'ar') return;
    var toTranslate = [];
    texts.forEach(function(item) {
        if (item.text && _isArabic(item.text)) {
            var key = _cacheKey(item.text, 'ar', toLang);
            if (!_translationCache[key]) {
                toTranslate.push(item.text);
            }
        }
    });
    if (toTranslate.length === 0) return;
    var unique = [];
    var seen = {};
    toTranslate.forEach(function(t) { if (!seen[t]) { seen[t] = true; unique.push(t); } });
    autoTranslate(unique[0], 'ar', toLang);
    for (var i = 1; i < unique.length; i++) {
        (function(t) { autoTranslate(t, 'ar', toLang); })(unique[i]);
    }
}
window.autoTranslate = autoTranslate;
window._translateBatch = _translateBatch;

function getProductText(obj, field, lang) {
    if (!obj || !obj[field]) return '';
    var val = obj[field];
    if (typeof val === 'string') {
        if (lang === 'ar') return val;
        if (_isArabic(val)) {
            var tr = _getTranslation(val, lang);
            if (tr && tr !== val) return tr;
            var _sk = _cacheKey(val, 'ar', lang);
            try { var _lc = JSON.parse(localStorage.getItem('translationCache') || '{}'); if (_lc[_sk] && _lc[_sk] !== val) return _lc[_sk]; } catch(e) {}
            autoTranslate(val, 'ar', lang);
            return val;
        }
        return val;
    }
    if (typeof val === 'object' && val !== null && !Array.isArray(val)) {
        var langVal = val[lang] || '';
        if (val.ar && _isArabic(val.ar)) {
            if (lang === 'ar') return val.ar;
            var cached = _getTranslation(val.ar, lang);
            if (cached && cached !== val.ar) return cached;
            if (langVal && !_isArabic(langVal)) return langVal;
            var _ok = _cacheKey(val.ar, 'ar', lang);
            try { var _oc = JSON.parse(localStorage.getItem('translationCache') || '{}'); if (_oc[_ok] && _oc[_ok] !== val.ar) return _oc[_ok]; } catch(e) {}
            autoTranslate(val.ar, 'ar', lang);
            return val.ar;
        }
        if (langVal && !_isArabic(langVal)) return langVal;
        return '';
    }
    return String(val);
}
window.getProductText = getProductText;

function getProductArray(obj, field, lang) {
    if (!obj || !obj[field]) return [];
    var val = obj[field];
    if (Array.isArray(val)) {
        if (lang === 'ar') return val.map(function(item) {
            if (typeof item === 'object' && item !== null) return (item.ar || item.en || '');
            return item;
        });
        return val.map(function(item) {
            if (typeof item === 'string' && _isArabic(item)) return _getTranslation(item, lang);
            if (typeof item === 'object' && item !== null) {
                if (item.ar && _isArabic(item.ar)) {
                    var cached = _getTranslation(item.ar, lang);
                    if (cached && cached !== item.ar) return cached;
                }
                var langItem = item[lang] || '';
                if (langItem && !_isArabic(langItem)) return langItem;
                return '';
            }
            return item;
        });
    }
    if (typeof val === 'object' && val !== null && !Array.isArray(val)) {
        var langVal = val[lang];
        if (Array.isArray(langVal)) {
            if (lang === 'ar') return langVal;
            return langVal.map(function(item) {
                if (typeof item === 'string' && _isArabic(item)) return _getTranslation(item, lang);
                return item;
            });
        }
        if (lang === 'ar' && Array.isArray(val.en)) return val.en;
        if (lang === 'en' && Array.isArray(val.fr)) return val.fr;
        if (lang === 'fr' && Array.isArray(val.en)) return val.en;
        return [];
    }
    return [];
}
window.getProductArray = getProductArray;

var _transCache = {};
var _transPending = {};

async function _translateText(text, targetLang) {
    if (!text || targetLang === 'ar') return text;
    var key = text + '|' + targetLang;
    if (_transCache[key]) return _transCache[key];
    if (_transPending[key]) return _transPending[key];
    _transPending[key] = (async function() {
        try {
            var q = encodeURIComponent(text.slice(0, 500));
            var res = await fetch('https://translate.googleapis.com/translate_a/single?client=gtx&sl=ar&tl=' + targetLang + '&dt=t&q=' + q);
            var data = await res.json();
            var t = (data && data[0] && data[0][0] && data[0][0][0]) || text;
            _transCache[key] = t;
            return t;
        } catch(e) {
            try {
                var instances = ['https://libretranslate.com/translate','https://translate.argosopentech.com/translate','https://translate.api.skitzen.com/translate'];
                for (var url of instances) {
                    try {
                        var res = await fetch(url, { method: 'POST', body: JSON.stringify({ q: text.slice(0, 500), source: 'ar', target: targetLang, format: 'text' }), headers: { 'Content-Type': 'application/json' } });
                        if (res.ok) {
                            var data = await res.json();
                            if (data && data.translatedText) { _transCache[key] = data.translatedText; return data.translatedText; }
                        }
                    } catch(e2) {}
                }
            } catch(e2) {}
            return text;
        }
    })();
    return _transPending[key];
}

function _getCachedOrQueued(text, targetLang) {
    if (targetLang === 'ar') return text;
    var key = text + '|' + targetLang;
    if (_transCache[key]) return _transCache[key];
    _translateText(text, targetLang);
    return text;
}

async function _translateProductField(product, field, targetLang) {
    var val = product[field];
    if (!val || targetLang === 'ar') return;
    if (typeof val === 'string') {
        if (!/[\u0600-\u06FF]/.test(val)) return;
        var t = await _translateText(val, targetLang);
        if (t && t !== val) {
            product[field] = { ar: val, [targetLang]: t };
        }
    } else if (typeof val === 'object' && !val[targetLang]) {
        var src = val.ar || val.en || '';
        if (!src || !/[\u0600-\u06FF]/.test(src)) return;
        if (src) {
            var t = await _translateText(src, targetLang);
            if (t && t !== src) {
                val[targetLang] = t;
                product[field] = val;
            }
        }
    }
}
window._translateProductField = _translateProductField;

async function _translateProductArrayField(product, field, targetLang) {
    var val = product[field];
    if (!val || targetLang === 'ar') return;
    if (Array.isArray(val)) {
        var translated = [];
        var needsUpdate = false;
        for (var i = 0; i < val.length; i++) {
            var item = val[i];
            if (typeof item === 'string' && /[\u0600-\u06FF]/.test(item)) {
                var t = await _translateText(item, targetLang);
                if (t && t !== item) {
                    translated.push(t);
                    needsUpdate = true;
                } else {
                    translated.push(item);
                }
            } else {
                translated.push(item);
            }
        }
        if (needsUpdate) {
            product[field] = { ar: val, [targetLang]: translated };
        }
    } else if (typeof val === 'object' && !val[targetLang]) {
        var src = val.ar || val.en || [];
        if (Array.isArray(src)) {
            var translated = [];
            var needsUpdate = false;
            for (var i = 0; i < src.length; i++) {
                var item = src[i];
                if (typeof item === 'string' && /[\u0600-\u06FF]/.test(item)) {
                    var t = await _translateText(item, targetLang);
                    if (t && t !== item) {
                        translated.push(t);
                        needsUpdate = true;
                    } else {
                        translated.push(item);
                    }
                } else {
                    translated.push(item);
                }
            }
            if (needsUpdate) {
                val[targetLang] = translated;
                product[field] = val;
            }
        }
    }
}
window._translateProductArrayField = _translateProductArrayField;

async function autoTranslateProducts(targetLang) {
    if (targetLang === 'ar' || !allProducts || !allProducts.length) return;
    var fields = ['title', 'description'];
    var arrayFields = ['features', 'requirements', 'faq'];
    var textsToTranslate = [];
    var objectUpdates = [];
    allProducts.forEach(function(p) {
        if (!p) return;
        fields.forEach(function(f) {
            var val = p[f];
            if (typeof val === 'string' && _isArabic(val)) {
                var key = _cacheKey(val, 'ar', targetLang);
                if (!_translationCache[key]) {
                    textsToTranslate.push(val);
                }
            } else if (typeof val === 'object' && val !== null && !Array.isArray(val)) {
                var arabicVal = val.ar || '';
                if (arabicVal && typeof arabicVal === 'string' && _isArabic(arabicVal)) {
                    var currentVal = val[targetLang] || '';
                    var key = _cacheKey(arabicVal, 'ar', targetLang);
                    var needsRetranslation = !currentVal || currentVal === arabicVal || _isArabic(currentVal) || !_translationCache[key];
                    if (needsRetranslation) {
                        if (!_translationCache[key]) {
                            textsToTranslate.push(arabicVal);
                        }
                        objectUpdates.push({ product: p, field: f, arabicVal: arabicVal });
                    }
                }
            }
        });
        arrayFields.forEach(function(f) {
            var val = p[f];
            if (Array.isArray(val)) {
                val.forEach(function(item) {
                    if (typeof item === 'string' && _isArabic(item)) {
                        var key = _cacheKey(item, 'ar', targetLang);
                        if (!_translationCache[key]) {
                            textsToTranslate.push(item);
                        }
                    } else if (typeof item === 'object' && item !== null) {
                        var arabicItem = item.ar || '';
                        if (arabicItem && typeof arabicItem === 'string' && _isArabic(arabicItem)) {
                            var currentItem = item[targetLang] || '';
                            var aKey = _cacheKey(arabicItem, 'ar', targetLang);
                            var itemNeedsRetranslation = !currentItem || currentItem === arabicItem || _isArabic(currentItem) || !_translationCache[aKey];
                            if (itemNeedsRetranslation) {
                                if (!_translationCache[aKey]) {
                                    textsToTranslate.push(arabicItem);
                                }
                            }
                        }
                    }
                });
            }
        });
    });
    if (textsToTranslate.length > 0) {
    var unique = [];
    var seen = {};
    textsToTranslate.forEach(function(t) { if (!seen[t]) { seen[t] = true; unique.push(t); } });
    for (var i = 0; i < unique.length; i++) {
        var text = unique[i];
        var key = _cacheKey(text, 'ar', targetLang);
        if (_translationCache[key]) continue;
        try {
            var tText = null;
            try {
                var url = 'https://translate.googleapis.com/translate_a/single?client=gtx&sl=ar&tl=' + targetLang + '&dt=t&q=' + encodeURIComponent(text);
                var resp = await fetch(url);
                var data = await resp.json();
                if (data && data[0]) {
                    tText = data[0].map(function(s) { return s[0]; }).join('');
                }
            } catch(e1) {}
            if (!tText) {
                var apiLang = 'ar|' + targetLang;
                var url2 = 'https://api.mymemory.translated.net/get?q=' + encodeURIComponent(text.slice(0, 500)) + '&langpair=' + encodeURIComponent(apiLang);
                var resp2 = await fetch(url2);
                var data2 = await resp2.json();
                if (data2.responseStatus === 200 && data2.responseData && data2.responseData.translatedText) {
                    tText = data2.responseData.translatedText;
                }
            }
            if (tText && tText.toUpperCase() !== text.toUpperCase()) {
                _translationCache[key] = tText;
            }
        } catch(e) { console.warn('Translation failed for:', text.slice(0, 50), e); }
        if (i % 10 === 9) await new Promise(function(r) { setTimeout(r, 150); });
    }
    }
    objectUpdates.forEach(function(update) {
        var key = _cacheKey(update.arabicVal, 'ar', targetLang);
        var translated = _translationCache[key];
        if (translated) {
            update.product[update.field][targetLang] = translated;
        }
    });
    allProducts.forEach(function(p) {
        if (!p) return;
        fields.forEach(function(f) {
            var val = p[f];
            if (typeof val === 'string' && _isArabic(val)) {
                var key = _cacheKey(val, 'ar', targetLang);
                var translated = _translationCache[key];
                if (translated) {
                    var obj = { ar: val };
                    obj[targetLang] = translated;
                    p[f] = obj;
                }
            }
        });
    });
    allProducts.forEach(function(p) {
        if (!p) return;
        arrayFields.forEach(function(f) {
            var val = p[f];
            if (Array.isArray(val)) {
                val.forEach(function(item) {
                    if (typeof item === 'object' && item !== null) {
                        var arabicItem = item.ar || '';
                        if (arabicItem && typeof arabicItem === 'string' && _isArabic(arabicItem)) {
                            var key = _cacheKey(arabicItem, 'ar', targetLang);
                            var translated = _translationCache[key];
                            if (translated) {
                                item[targetLang] = translated;
                            }
                        }
                    }
                });
            }
        });
    });
    _saveTranslationCache();
}
window.autoTranslateProducts = autoTranslateProducts;

function translatePage(lang) {
    document.querySelectorAll('[data-ar][data-en][data-fr]:not(#userName):not(#userEmail)').forEach(el => {
        const t = el.getAttribute('data-' + lang);
        if (t) { if (t.indexOf('<') !== -1 && t.indexOf('>') !== -1) el.innerHTML = t; else el.textContent = t; }
    });
    document.querySelectorAll('[data-ar-placeholder][data-en-placeholder][data-fr-placeholder]').forEach(el => {
        el.placeholder = el.getAttribute('data-' + lang + '-placeholder');
    });
    document.querySelectorAll('[data-ar-title][data-en-title][data-fr-title]').forEach(el => {
        var t = el.getAttribute('data-' + lang + '-title');
        if (t) el.title = t;
    });
    document.querySelectorAll('[data-ar-title][data-en-title]:not([data-fr-title])').forEach(el => {
        var t = el.getAttribute('data-' + lang + '-title');
        if (lang === 'fr' && !t) t = el.getAttribute('data-en-title');
        if (t) el.title = t;
    });
    document.querySelectorAll('[data-ar][data-en]:not([data-fr]):not(#userName):not(#userEmail)').forEach(el => {
        let t = el.getAttribute('data-' + lang);
        if (lang === 'fr' && !t) t = el.getAttribute('data-en');
        if (t) { if (t.indexOf('<') !== -1 && t.indexOf('>') !== -1) el.innerHTML = t; else el.textContent = t; }
    });
    document.querySelectorAll('[data-ar-placeholder][data-en-placeholder]:not([data-fr-placeholder])').forEach(el => {
        let t = el.getAttribute('data-' + lang + '-placeholder');
        if (lang === 'fr' && !t) t = el.getAttribute('data-en-placeholder');
        if (t) el.placeholder = t;
    });
    var titleEl = document.querySelector('title[data-ar]');
    if (titleEl) {
        var t = titleEl.getAttribute('data-' + lang);
        if (t) document.title = t;
    }
    var metaDesc = document.querySelector('meta[name="description"][data-ar]');
    if (metaDesc) {
        var t = metaDesc.getAttribute('data-' + lang);
        if (t) metaDesc.setAttribute('content', t);
    }
    var metaTitle = document.querySelector('meta[name="title"][data-ar]');
    if (metaTitle) {
        var t = metaTitle.getAttribute('data-' + lang);
        if (t) metaTitle.setAttribute('content', t);
    }
}

function initializeThemeAndLanguage() {
    document.documentElement.lang = currentLang;
    document.documentElement.dir = currentLang === 'ar' ? 'rtl' : 'ltr';
    document.body.setAttribute('dir', currentLang === 'ar' ? 'rtl' : 'ltr');
    var lt = document.getElementById('langText');
    if (lt) lt.innerHTML = getLangFlagHtml(currentLang);
    var mobileLt = document.getElementById('mobileLangText');
    if (mobileLt) mobileLt.innerHTML = getLangFlagHtml(currentLang) + ' <span data-ar="العربية" data-en="English" data-fr="Français">' + (currentLang === 'ar' ? 'العربية' : currentLang === 'en' ? 'English' : 'Français') + '</span>';
    if (currentLang !== 'ar') {
        setTimeout(function() { translatePage(currentLang); }, 100);
    }
}

// ==================== TOAST ====================
function showToast(title, message, type = 'success') { const c = document.getElementById('toastContainer'); if (!c) return; const t = document.createElement('div'); t.className = `toast ${type}`; const icons = { success: 'fa-check-circle', error: 'fa-exclamation-circle', info: 'fa-info-circle', warning: 'fa-exclamation-triangle' }; const icon = icons[type] || 'fa-bell'; t.innerHTML = `<div class="toast-body"><div class="toast-icon"><i class="fas ${icon}"></i></div><div class="toast-content"><h4>${title}</h4><p>${message}</p></div><button class="toast-close" onclick="this.closest('.toast').remove()">✕</button></div><div class="toast-progress"></div>`; c.appendChild(t); t.querySelector('.toast-progress').style.animation = 'toastProgress 3s linear forwards'; setTimeout(() => { if (!t.isConnected) return; t.classList.add('hiding'); setTimeout(() => t.remove(), 350); }, 3200); }

// ==================== UTILITIES ====================
function scrollToTop() { window.scrollTo({ top: 0, behavior: 'smooth' }); }
window.addEventListener('scroll', () => { const b = document.getElementById('scrollTop'); if (b) b.classList.toggle('show', window.pageYOffset > 300); });
document.addEventListener('click', e => { if (e.target.matches('a[href^="#"]')) { const h = e.target.getAttribute('href'); if (h === '#') return; e.preventDefault(); const t = document.querySelector(h); if (t) t.scrollIntoView({ behavior: 'smooth' }); } });

function setActiveMenuItem() { var rawPath = (window.location.pathname.split('/').pop() || 'index.html').toLowerCase(); var p = rawPath.replace(/\.html$/, ''); if (!p) p = 'index.html'; document.querySelectorAll('.nav-menu a:not(.tab-link)').forEach(function(l) { var h = l.getAttribute('href'); if (!h && l.hasAttribute('aria-current')) return; l.classList.remove('active'); if (!h) return; var hClean = h.replace(/\.html$/, '').toLowerCase(); if (hClean === p || h.toLowerCase() === rawPath || (hClean === 'index' && (p === 'index.html' || p === '' || p === '/'))) l.classList.add('active'); }); }

function checkAdmin() { const p = new URLSearchParams(window.location.search); if (p.get('admin') === APP_CONFIG.adminPasscode) { sessionStorage.setItem(STORAGE_KEYS.adminSession, 'active'); window.history.replaceState({}, '', window.location.pathname); } if (sessionStorage.getItem(STORAGE_KEYS.adminSession) === 'active') { const b = document.getElementById('adminBtn'); if (b) b.style.display = 'flex'; } }

// ==================== PARTICLES ====================
function initializeParticles() {
    const canvas = document.getElementById('particles'); if (!canvas) return;
    const ctx = canvas.getContext('2d'); canvas.width = window.innerWidth; canvas.height = window.innerHeight;
    const particles = [], count = window.innerWidth < 768 ? 40 : 80;
    class Particle { constructor() { this.x = Math.random() * canvas.width; this.y = Math.random() * canvas.height; this.size = Math.random() * 3 + 0.5; this.speedX = Math.random() * 1.5 - 0.75; this.speedY = Math.random() * 1.5 - 0.75; this.color = `rgba(${Math.random() > 0.5 ? '147,51,234' : '236,72,153'}, ${Math.random() * 0.6 + 0.2})`; } update() { this.x += this.speedX; this.y += this.speedY; if (this.x > canvas.width || this.x < 0) this.speedX *= -1; if (this.y > canvas.height || this.y < 0) this.speedY *= -1; } draw() { ctx.fillStyle = this.color; ctx.beginPath(); ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2); ctx.fill(); } }
    for (let i = 0; i < count; i++) particles.push(new Particle());
    function animate() { ctx.clearRect(0, 0, canvas.width, canvas.height); particles.forEach(p => { p.update(); p.draw(); }); for (let i = 0; i < particles.length; i++) { for (let j = i + 1; j < particles.length; j++) { const dx = particles[i].x - particles[j].x, dy = particles[i].y - particles[j].y, dist = Math.sqrt(dx * dx + dy * dy); if (dist < 150) { ctx.strokeStyle = `rgba(147,51,234,${0.15 * (1 - dist / 150)})`; ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(particles[i].x, particles[i].y); ctx.lineTo(particles[j].x, particles[j].y); ctx.stroke(); } } } requestAnimationFrame(animate); }
    animate(); window.addEventListener('resize', () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; });
}

function hideLoadingScreen() { const l = document.getElementById('loadingScreen'); if (!l) return; l.style.opacity = '0'; setTimeout(() => { l.classList.add('hidden'); l.style.display = 'none'; }, 800); }
function animateCounters() { document.querySelectorAll('.stat-number[data-count]').forEach(c => { if (c.dataset.animated) return; c.dataset.animated = 'true'; const t = parseInt(c.getAttribute('data-count')), s = t / 125; let cur = 0; const update = () => { cur += s; if (cur < t) { c.textContent = Math.floor(cur); requestAnimationFrame(update); } else c.textContent = t; }; update(); }); }
function animateCounters() { document.querySelectorAll('.stat-number[data-count]').forEach(c => { if (c.dataset.animated) return; c.dataset.animated = 'true'; const t = parseInt(c.getAttribute('data-count')), s = t / 125; let cur = 0; const update = () => { cur += s; if (cur < t) { c.textContent = Math.floor(cur); requestAnimationFrame(update); } else c.textContent = t; }; update(); }); }

// ==================== ADMIN LOGIN SYSTEM ====================
function isLockedOut() { if (lockoutTime > Date.now()) return true; if (lockoutTime > 0 && lockoutTime <= Date.now()) { loginAttempts = 0; lockoutTime = 0; sessionStorage.setItem('loginAttempts', '0'); sessionStorage.setItem('lockoutTime', '0'); } return false; }

function checkLockout() { if (isLockedOut()) { const b = document.querySelector('.login-btn'); if (b) { b.disabled = true; b.style.opacity = '0.5'; const iv = setInterval(() => { if (!isLockedOut()) { b.disabled = false; b.style.opacity = '1'; clearInterval(iv); } }, 1000); } } }

function shakeElement(el) { el.classList.add('shake-animation'); setTimeout(() => el.classList.remove('shake-animation'), 600); }

function showCustomModal(type, title, message, buttons) {
    const overlay = document.getElementById('customModalOverlay'), iconEl = document.getElementById('modalIcon'), titleEl = document.getElementById('modalTitle'), msgEl = document.getElementById('modalMessage'), btnsEl = document.getElementById('modalButtons');
    if (!overlay) return;
    const icons = { success: '<i class="fas fa-check-circle" style="color:#10b981;font-size:3em"></i>', error: '<i class="fas fa-times-circle" style="color:#ef4444;font-size:3em"></i>', warning: '<i class="fas fa-exclamation-triangle" style="color:#f59e0b;font-size:3em"></i>', info: '<i class="fas fa-info-circle" style="color:#3b82f6;font-size:3em"></i>' };
    if (iconEl) iconEl.innerHTML = icons[type] || icons.info;
    if (titleEl) titleEl.textContent = title;
    if (msgEl) { msgEl.textContent = message; msgEl.style.whiteSpace = 'pre-line'; }
    if (btnsEl) btnsEl.innerHTML = buttons.map(b => `<button class="custom-modal-btn ${b.class || ''}" onclick="closeCustomModal()">${b.text}</button>`).join('');
    overlay.classList.add('active');
}

function closeCustomModal() { const o = document.getElementById('customModalOverlay'); if (o) o.classList.remove('active'); }
window.closeCustomModal = closeCustomModal;

function checkAdminLoginStatus() {
    const login = document.getElementById('loginSection'), panel = document.getElementById('adminPanel');
    if (!login || !panel) return;
    if (sessionStorage.getItem('bravoAdminLoggedIn') === 'true') { 
        document.body.classList.remove('login-state');
        loadAdminData();
    } else { 
        document.body.classList.add('login-state');
    }
}

function initLoginAnimations() {
    const pulseEl = document.querySelector('.login-pulse-bg');
    const logoEl = document.querySelector('.login-logo-float');
    const titleEl = document.querySelector('.login-title-shift');
    if (pulseEl) {
        pulseEl.animate([
            { transform: 'translate(-50%,-50%) scale(0.5)', opacity: 0.3, easing: 'ease-in-out' },
            { transform: 'translate(-50%,-50%) scale(1.6)', opacity: 1, easing: 'ease-in-out' },
            { transform: 'translate(-50%,-50%) scale(0.5)', opacity: 0.3 }
        ], { duration: 3000, iterations: Infinity });
    }
    if (logoEl) {
        logoEl.animate([
            { transform: 'translateY(0px) rotate(0deg)', easing: 'ease-in-out' },
            { transform: 'translateY(-25px) rotate(-5deg)', easing: 'ease-in-out' },
            { transform: 'translateY(-8px) rotate(0deg)', easing: 'ease-in-out' },
            { transform: 'translateY(-25px) rotate(5deg)', easing: 'ease-in-out' },
            { transform: 'translateY(0px) rotate(0deg)' }
        ], { duration: 4000, iterations: Infinity });
    }
    if (titleEl) {
        titleEl.animate([
            { backgroundPosition: '0% 50%', easing: 'ease-in-out' },
            { backgroundPosition: '100% 50%', easing: 'ease-in-out' },
            { backgroundPosition: '0% 50%' }
        ], { duration: 4000, iterations: Infinity });
    }
}

function initAdminLogin() {
    const form = document.getElementById('loginForm');
    if (!form) return;
    checkLockout();
    initLoginAnimations();

    if (localStorage.getItem('bravoAdminRemember') === 'true') {
        const u = localStorage.getItem('bravoAdminUser');
        const ui = document.getElementById('username');
        const rm = document.getElementById('rememberMe');
        if (u && ui) ui.value = u;
        if (rm) rm.checked = true;
    }

    const toggleBtn = document.getElementById('togglePasswordBtn');
    const pi = document.getElementById('password');
    const ti = document.getElementById('toggleIcon');
    if (toggleBtn) {
        toggleBtn.addEventListener('click', () => {
            if (pi.type === 'password') {
                pi.type = 'text';
                ti.classList.remove('fa-eye');
                ti.classList.add('fa-eye-slash');
            } else {
                pi.type = 'password';
                ti.classList.remove('fa-eye-slash');
                ti.classList.add('fa-eye');
            }
        });
    }

    form.addEventListener('submit', async function (e) {
        e.preventDefault();
        if (window._adminLoginSubmitting) return;
        window._adminLoginSubmitting = true;

        if (isLockedOut()) {
            window._adminLoginSubmitting = false;
            const rem = Math.ceil((lockoutTime - Date.now()) / 1000 / 60);
            showCustomModal('error', '🔒 ' + (currentLang === 'ar' ? 'الحساب مقفل' : currentLang === 'en' ? 'Locked' : 'Verrouillé'),
                currentLang === 'ar' ? `انتظر ${rem} دقيقة` : currentLang === 'en' ? `Wait ${rem} min` : `Attendez ${rem} min`,
                [{ text: 'OK', class: 'primary' }]);
            return;
        }

        const ui = document.getElementById('username');
        const pi = document.getElementById('password');
        const username = ui.value.trim();
        const password = pi.value.trim();

        if (!username || !password) {
            showToast(currentLang === 'ar' ? 'خطأ' : currentLang === 'en' ? 'Error' : 'Erreur',
                currentLang === 'ar' ? 'يرجى ملء جميع الحقول!' : currentLang === 'en' ? 'Fill all fields!' : 'Remplissez tous les champs !', 'error');
            shakeElement(form);
            window._adminLoginSubmitting = false;
            return;
        }

        // ✅ تحقق من البيانات المحلية أولاً
        if (username !== ADMIN_CREDENTIALS.username || password !== ADMIN_CREDENTIALS.password) {
            loginAttempts++;
            sessionStorage.setItem('loginAttempts', loginAttempts.toString());
            const rem = MAX_LOGIN_ATTEMPTS - loginAttempts;
            shakeElement(form);
            ui.style.borderColor = '#ef4444';
            pi.style.borderColor = '#ef4444';
            setTimeout(() => { ui.style.borderColor = ''; pi.style.borderColor = ''; }, 3000);

            if (loginAttempts >= MAX_LOGIN_ATTEMPTS) {
                lockoutTime = Date.now() + (15 * 60 * 1000);
                sessionStorage.setItem('lockoutTime', lockoutTime.toString());
                showCustomModal('error', '🔒 ' + (currentLang === 'ar' ? 'تم قفل الحساب!' : currentLang === 'en' ? 'Locked!' : 'Verrouillé !'),
                    currentLang === 'ar' ? 'تم القفل 15 دقيقة' : currentLang === 'en' ? 'Locked 15 min' : 'Verrouillé 15 min',
                    [{ text: 'OK', class: 'primary' }]);
                checkLockout();
            } else if (rem <= 2) {
                showCustomModal('error', '⚠️ ' + (currentLang === 'ar' ? 'تحذير!' : currentLang === 'en' ? 'Warning!' : 'Avertissement !'),
                    currentLang === 'ar' ? `بيانات خاطئة!\nمتبقي ${rem} محاولة` : currentLang === 'en' ? `Wrong!\n${rem} left` : `Erreur !\n${rem} restante`,
                    [{ text: 'OK', class: 'primary' }]);
            } else {
                showToast(currentLang === 'ar' ? 'خطأ' : currentLang === 'en' ? 'Error' : 'Erreur',
                    currentLang === 'ar' ? `بيانات خاطئة! (${rem} محاولات)` : currentLang === 'en' ? `Wrong! (${rem} left)` : `Erreur ! (${rem} restantes)`, 'error');
            }
            pi.value = '';
            pi.focus();
            window._adminLoginSubmitting = false;
            return;
        }

        // ✅ البيانات صح - دخول ناجح
        const btn = form.querySelector('.login-btn');
        adminLoginSuccess(btn, username);
        window._adminLoginSubmitting = false;
    });
}

function adminLoginSuccess(btn, username) {
    if (sessionStorage.getItem('bravoAdminLoggedIn') === 'true') return;
    loginAttempts = 0;
    sessionStorage.setItem('loginAttempts', '0');
    sessionStorage.setItem('lockoutTime', '0');
    sessionStorage.setItem('bravoAdminLoggedIn', 'true');

    const rm = document.getElementById('rememberMe');
    if (rm && rm.checked) {
        localStorage.setItem('bravoAdminRemember', 'true');
        localStorage.setItem('bravoAdminUser', username);
    }

    if (btn) {
        btn.innerHTML = `<span>✅</span> <span>${currentLang === 'ar' ? 'تم الدخول!' : currentLang === 'en' ? 'Success!' : 'Succès !'}</span>`;
        btn.style.background = 'linear-gradient(135deg,#10b981,#059669)';
    }

    showToast(currentLang === 'ar' ? 'مرحباً!' : currentLang === 'en' ? 'Welcome!' : 'Bienvenue !',
        currentLang === 'ar' ? 'جاري التحميل...' : currentLang === 'en' ? 'Loading...' : 'Chargement...', 'success');

    setTimeout(() => {
        document.body.classList.remove('login-state');
        loadAdminData();
        
        /* التأثيرات الحركية للداشبورد */
        const panel = document.getElementById('adminPanel');
        setTimeout(() => {
            if (panel) {
                panel.style.opacity = '0';
                panel.style.transform = 'translateY(20px)';
                panel.style.transition = 'all 0.5s ease';
                setTimeout(() => {
                    panel.style.opacity = '1';
                    panel.style.transform = 'translateY(0)';
                }, 50);
            }
        }, 500);
    }, 1200);
}

// ==================== ADMIN LOGOUT ====================
async function signOutAdminFirebase() {
    if (window.adminAuth && window.adminAuth.currentUser) {
        try {
            const { signOut } = await import("https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js");
            await signOut(window.adminAuth);
        } catch(e) { console.warn('Admin sign-out warning:', e); }
    }
}
function logout() {
    showCustomModal('warning', currentLang === 'ar' ? 'تسجيل الخروج' : currentLang === 'en' ? 'Logout' : 'Déconnexion', currentLang === 'ar' ? 'هل أنت متأكد؟' : currentLang === 'en' ? 'Are you sure?' : 'Êtes-vous sûr ?', [{ text: currentLang === 'ar' ? 'نعم' : currentLang === 'en' ? 'Yes' : 'Oui', class: 'primary' }, { text: currentLang === 'ar' ? 'إلغاء' : currentLang === 'en' ? 'Cancel' : 'Annuler', class: 'secondary' }]);
    setTimeout(() => {
        const btns = document.querySelectorAll('.custom-modal-btn');
        if (btns[0]) { 
            btns[0].onclick = async function () { 
                sessionStorage.removeItem('bravoAdminLoggedIn'); 
                sessionStorage.removeItem('loginAttempts'); 
                sessionStorage.removeItem('lockoutTime'); 
                closeCustomModal(); 
                await signOutAdminFirebase();
                sessionStorage.setItem('bravoAdminJustLoggedOut', 'true');
                window.location.href = 'admin.html';
            }; 
        }
        if (btns[1]) btns[1].onclick = closeCustomModal;
    }, 100);
}
window.logout = logout;

// ==================== ADMIN DATA ====================
function loadAdminData() { if(window.loadPaymentMethods) window.loadPaymentMethods(); loadAdminProducts(); loadAdminOrders(); if(window.loadAdminCustomers) window.loadAdminCustomers(); populateAdminSettingsUI(); renderSystemPages(); if(window.renderTrash) window.renderTrash(); autoCleanTrash(); }

// ==================== AUTO CLEAN TRASH (30 DAYS) ====================
async function autoCleanTrash() {
    const now = Date.now();
    const thirtyDays = 30 * 24 * 60 * 60 * 1000;
    try {
        const pagesSettings = await DB.get('settings/pages') || {};
        for (const id in pagesSettings) { if (pagesSettings[id].status === 'trashed' && (now - (pagesSettings[id].deletedAt || now)) > thirtyDays) { _addHidden('pages', id); try { await DB.remove(`settings/pages/${id}`); } catch(e) {} } }
        const productsData = await DB.get('products') || {};
        for (const id in productsData) { if (productsData[id].status === 'trashed' && (now - (productsData[id].deletedAt || now)) > thirtyDays) { _addHidden('products', id); try { await DB.remove(`products/${id}`); } catch(e) {} } }
        const ordersData = await DB.get('orders') || {};
        for (const id in ordersData) { if (ordersData[id].status === 'trashed' && (now - (ordersData[id].deletedAt || now)) > thirtyDays) { _addHidden('orders', id); try { await DB.remove(`orders/${id}`); } catch(e) {} } }
    } catch(e) { console.error('Auto clean error:', e); }
}

// ==================== CLEAN CORRUPTED PRODUCTS ====================
async function cleanCorruptedProducts() {
    try {
        const data = await DB.get('products');
        if (!data || typeof data !== 'object') return 0;
        var removed = 0;
        for (var id in data) {
            var p = data[id];
            if (!p || typeof p !== 'object' || !p.title || (p.priceEGP === undefined && p.priceUSD === undefined)) {
                if (p && p._isLocal) continue;
                _addHidden('products', id);
                removed++;
            }
        }
        if (removed > 0) {
            console.log('🧹 تم إخفاء ' + removed + ' منتج تالف');
            if (typeof loadAllProducts === 'function') { await loadAllProducts(); }
        }
        return removed;
    } catch (e) { console.error('Error cleaning corrupted products:', e); return 0; }
}
window.cleanCorruptedProducts = cleanCorruptedProducts;

// ==================== LOAD ADMIN PRODUCTS (ENHANCED) ====================
function loadAdminProducts() {
    DB.on('products', (data) => {
        const container = document.getElementById('productsContainer');
        const countEl = document.getElementById('productsCount');
        const totalEl = document.getElementById('totalProducts');
        const staticEmpty = document.getElementById('productsEmptyState');
        if (!container) return;
        
        if (!window._adminProductsVer) window._adminProductsVer = 0;
        window._adminProductsVer++;
        const _v = window._adminProductsVer;
        
        const parentContainer = container.closest('.admin-table-container');
        const tableContainer = parentContainer ? parentContainer.querySelector('.admin-table') : container.closest('table');

        let products = [];
        if (data) {
            products = Object.entries(data).filter(([id, p]) => p && typeof p === 'object' && p.title && (p.priceEGP !== undefined || p.priceUSD !== undefined) && p.status !== 'trashed' && !_isHidden('products', id));
            products.sort((a, b) => (b[1].createdAt || 0) - (a[1].createdAt || 0));
        }
        window.adminProductsList = products;

        if (products.length === 0) {
            if(tableContainer) tableContainer.style.display = 'none';
            if(staticEmpty) {
                staticEmpty.style.display = 'block';
                staticEmpty.innerHTML = `<i class="fas fa-box-open" style="font-size: 4em; color: var(--primary); margin-bottom: 15px; display:inline-block;"></i><h3 style="font-size: 1.5em; font-weight: 900; color: var(--text-primary); margin-bottom: 10px;">${document.documentElement.lang === 'ar' ? 'لا توجد منتجات الآن' : document.documentElement.lang === 'en' ? 'No products available' : 'Aucun produit disponible'}</h3>`;
            }
            container.innerHTML = '';
            if (countEl) countEl.textContent = '0';
            if (totalEl) totalEl.textContent = '0';
            const sbp = document.getElementById('sidebarProductsCount');
            if (sbp) sbp.textContent = '0';
            updateProductFilterCounts(products);
            return;
        }
        if(staticEmpty) staticEmpty.style.display = 'none';

        if (_v !== window._adminProductsVer) return; // prevent flicker from double triggers

        if (countEl) countEl.textContent = products.length;
        if (totalEl) totalEl.textContent = products.length;
        const sbp = document.getElementById('sidebarProductsCount');
        if (sbp) sbp.textContent = products.length;

        window._adminAllProducts = products;
        updateProductFilterCounts(products);
        applyAdminProductsFilter();

        const catEmojis = { books: '📚', software: '💻', formulas: '🧪', courses: '🎓' };
        const catNames = APP_CONFIG.categories?.[currentLang] || {};

        const renderProds = (list) => {
            const emptyState = document.getElementById('productsEmptyState');
            if (!list || list.length === 0) {
                container.innerHTML = '';
                const cat = window._adminProdFilter || 'all';
                const catNamesMap = { all: currentLang === 'ar' ? 'الكل' : currentLang === 'en' ? 'All' : 'Tout', books: currentLang === 'ar' ? 'الكتب' : currentLang === 'en' ? 'Books' : 'Livres', software: currentLang === 'ar' ? 'البرامج' : currentLang === 'en' ? 'Software' : 'Logiciels', formulas: currentLang === 'ar' ? 'التركيبات' : currentLang === 'en' ? 'Formulas' : 'Formules', courses: currentLang === 'ar' ? 'الكورسات' : currentLang === 'en' ? 'Courses' : 'Cours' };
                const catLabel = catNamesMap[cat] || cat;
                document.querySelector('#productsEmptyState h3').textContent = currentLang === 'ar' ? `لا توجد منتجات في ${catLabel} حتى الآن` : currentLang === 'en' ? `No products in ${catLabel} yet` : `Aucun produit dans ${catLabel}`;
                if (emptyState) emptyState.style.display = 'block';
                return;
            }
            if (emptyState) emptyState.style.display = 'none';
            container.innerHTML = list.map(([id, p]) => {
            const eId = String(id).replace(/"/g, '&quot;');
            const cat = p.category || 'books';
            const catEmoji = catEmojis[cat] || '📦';
            const catName = catNames[cat] || cat;

            // Discount badge (زي الموقع تماماً)
            let discBadge = '';
            if (p.oldPriceEGP && p.oldPriceEGP > (p.priceEGP || 0)) {
                const disc = Math.round(((p.oldPriceEGP - p.priceEGP) / p.oldPriceEGP) * 100);
                discBadge = `<div class="discount-badge"><span class="discount-text">${currentLang === 'ar' ? 'خصم' : currentLang === 'en' ? 'OFF' : 'RÉDUCTION'}</span><span class="discount-percent">${disc}%</span></div>`;
            }

            // Special badges (زي الموقع)
            let specBadge = '';
            if (p.hot || p.bestseller) specBadge = '<span class="special-badge hot-badge"><i class="fas fa-fire"></i> ' + (currentLang === 'ar' ? 'الأكثر مبيعاً' : currentLang === 'en' ? 'BESTSELLER' : 'MEILLEURE VENTE') + '</span>';
            else if (p.featured) specBadge = '<span class="special-badge featured-badge"><i class="fas fa-crown"></i> ' + (currentLang === 'ar' ? 'مميز' : currentLang === 'en' ? 'FEATURED' : 'EN VEDETTE') + '</span>';

            const badgesHTML = (discBadge || specBadge) ? `<div class="badge-column">${discBadge}${specBadge}</div>` : '';

            var pTitle2 = getProductText(p, 'title', currentLang);
            var pDesc2 = getProductText(p, 'description', currentLang);
            return `<div class="admin-prod-card">
                <div class="product-image-container">
                    ${p.image
                        ? `<img src="${p.image}" alt="${pTitle2}" class="product-image">`
                        : `<div class="product-icon-placeholder"><i class="fas ${p.icon || 'fa-box'}"></i></div>`}
                    ${badgesHTML}
                </div>
                <div class="admin-prod-body">
                    <span class="product-category">${catEmoji} ${catName}</span>
                    <div class="admin-prod-title">${pTitle2}</div>
                    <p class="admin-prod-desc">${pDesc2}</p>
                    <div class="admin-prod-bottom">
                        <div class="admin-prod-pricing">
                            <div class="admin-prod-price">
                                <span class="admin-prod-price-val">${p.priceEGP || 0}</span>
                                <span class="admin-prod-price-currency">EGP</span>
                            </div>
                            <div class="admin-prod-price usd">
                                <span class="admin-prod-price-val">${p.priceUSD || 0}</span>
                                <span class="admin-prod-price-currency">USD</span>
                            </div>
                        </div>
                        <div class="admin-prod-actions">
                            <button class="admin-prod-btn view" data-id="${eId}" onclick="window.open('product-details.html?id=' + this.dataset.id,'_blank')"><i class="fas fa-external-link-alt"></i> <span class="admin-prod-btn-label">${currentLang === 'ar' ? 'عرض' : currentLang === 'en' ? 'View' : 'Voir'}</span></button>
                            <button class="admin-prod-btn edit" data-id="${eId}" onclick="openEditProductModal(this.dataset.id)"><i class="fas fa-edit"></i> <span class="admin-prod-btn-label">${currentLang === 'ar' ? 'تعديل' : currentLang === 'en' ? 'Edit' : 'Modifier'}</span></button>
                            <button class="admin-prod-btn delete" data-id="${eId}" onclick="deleteProduct(this.dataset.id, event)"><i class="fas fa-trash"></i> <span class="admin-prod-btn-label">${currentLang === 'ar' ? 'حذف' : currentLang === 'en' ? 'Delete' : 'Supprimer'}</span></button>
                        </div>
                    </div>
                </div>
            </div>`;
        }).join('');
        };
        renderProds(products);
        window._adminRenderProducts = renderProds;
    });
}

function loadAdminOrders() {
    renderOrders([]);
    window._adminCurrentFilter = 'all';
    window._adminSearchTerm = '';
    // Request notification permission for admin
    if ('Notification' in window && Notification.permission === 'default') { try { Notification.requestPermission(); } catch(e) {} }

    DB.on('orders', async (data) => { // ← now async for enrichment
        const container = document.getElementById('ordersContainer'), totalEl = document.getElementById('totalOrders'), pendingEl = document.getElementById('pendingOrders'), confirmedEl = document.getElementById('confirmedOrders'), revenueEl = document.getElementById('totalRevenue'), badge = document.getElementById('ordersCount');
        if (!container) return;
        
        if (!window._adminOrdersVer) window._adminOrdersVer = 0;
        window._adminOrdersVer++;
        const _v = window._adminOrdersVer;
        
        let orders = [];
        if(data) {
            orders = Object.entries(data).filter(([id, o]) => o && typeof o === 'object' && o.status !== 'trashed' && !_isHidden('orders', id));
            orders.sort((a, b) => (b[1].createdAt || 0) - (a[1].createdAt || 0));
        }
        // Also merge orders from bravo_local_db (localStorage) - shows ALL orders even if not in Firebase
        try {
            var _lsO = JSON.parse(localStorage.getItem('bravo_local_db') || '{}').orders || {};
            Object.entries(_lsO).forEach(([id, o]) => {
                if (o && o.orderId && o.status !== 'trashed' && !_isHidden('orders', id) && !orders.find(([i]) => i === id)) {
                    orders.push([id, { ...o, _isLocal: true }]);
                }
            });
        } catch(e) {}

        // ── Enrich orders with product data (مثل initOrdersPage) ──
        for (const [id, o] of orders) {
            if (o.items && typeof o.items === 'object') {
                const keys = Object.keys(o.items);
                if (keys.length > 0) {
                    const first = o.items[keys[0]];
                    if (!o.productImage && first.image) o.productImage = first.image;
                    if (!o.productCategory && first.category) o.productCategory = first.category;
                    if (!o.productTitle && first.title) o.productTitle = first.title;
                    if (isNaN(parseFloat(o.price)) && first.price) o.price = first.price;
                }
            }
            let pid = o.productId;
            if ((!pid || pid === 'cart_checkout' || pid === 'N/A') && o.items && typeof o.items === 'object') {
                const itemKeys = Object.keys(o.items);
                if (itemKeys.length > 0) pid = itemKeys[0];
            }
            if (pid && pid !== 'cart_checkout' && pid !== 'N/A') {
                try {
                    const p = await DB.get(`products/${pid}`);
                    if (p) {
                        if (!o.productImage && p.image) o.productImage = p.image;
                        if (!o.productCategory && p.category) o.productCategory = p.category;
                        if (!o.productTitle && p.title) o.productTitle = p.title;
                        if (isNaN(parseFloat(o.price)) && p.priceEGP) o.price = p.priceEGP;
                        if (!o.productOldPriceEGP && p.oldPriceEGP) o.productOldPriceEGP = p.oldPriceEGP;
                        if (!o.productOldPriceUSD && p.oldPriceUSD) o.productOldPriceUSD = p.oldPriceUSD;
                        if (p.downloadLink && p.downloadLink !== '#') { o._dlFallback = p.downloadLink; if (!o.downloadLink) o.downloadLink = p.downloadLink; }
                        if (!o.productBadge) o.productBadge = p.badge || '';
                        if (!o.productHot && (p.hot || p.bestseller || p.badge === 'hot')) o.productHot = true;
                        if (!o.productFeatured && (p.featured || p.badge === 'featured')) o.productFeatured = true;
                    }
                } catch(e) {}
            }
            if (o.items && typeof o.items === 'object') {
                const keys = Object.keys(o.items);
                if (keys.length > 0) {
                    const first = o.items[keys[0]];
                    if (!o.productBadge) o.productBadge = first.badge || '';
                    if (!o.productHot && (first.hot || first.bestseller || first.badge === 'hot')) o.productHot = true;
                    if (!o.productFeatured && (first.featured || first.badge === 'featured')) o.productFeatured = true;
                    if (!o.productHot && !o.productFeatured) {
                        for (const itemKey of keys) {
                            const item = o.items[itemKey];
                            const pid = item.id || item.productId || itemKey;
                            if (pid && pid !== 'cart_checkout') {
                                try {
                                    const p = await DB.get(`products/${pid}`);
                                    if (p) {
                                        if (!o.productBadge) o.productBadge = p.badge || '';
                                        if (!o.productHot && (p.hot || p.bestseller || p.badge === 'hot')) o.productHot = true;
                                        if (!o.productFeatured && (p.featured || p.badge === 'featured')) o.productFeatured = true;
                                        if (o.productHot || o.productFeatured) break;
                                    }
                                } catch(e) {}
                            }
                        }
                    }
                }
            }
        }

        // Skip if newer data arrived while enriching (prevents flicker from double DB triggers)
        if (_v !== window._adminOrdersVer) return; 

        const pending = orders.filter(([_, o]) => o.status === 'pending').length;
        const suspended = orders.filter(([_, o]) => o.status === 'suspended').length;
        const confirmed = orders.filter(([_, o]) => o.status === 'confirmed').length;
        const rejected = orders.filter(([_, o]) => o.status === 'rejected').length;
        const revenue = orders.filter(([_, o]) => o.status === 'confirmed').reduce((s, [_, o]) => s + (parseFloat(o.price) || 0), 0);
        if (totalEl) totalEl.textContent = orders.length; if (pendingEl) pendingEl.textContent = pending; if (confirmedEl) confirmedEl.textContent = confirmed; if (revenueEl) revenueEl.textContent = revenue.toLocaleString(); if (badge) badge.textContent = pending;
        const ac = document.getElementById('allCount'), pc = document.getElementById('pendingCount'), sc = document.getElementById('suspendedCount'), cc = document.getElementById('confirmedCount'), rc = document.getElementById('rejectedCount');
        if (ac) ac.textContent = orders.length; if (pc) pc.textContent = pending; if (sc) sc.textContent = suspended; if (cc) cc.textContent = confirmed; if (rc) rc.textContent = rejected;
        window.allOrders = orders;
        
        const adminNotifBadge = document.getElementById('adminNotifBadge');
        if (adminNotifBadge) {
            adminNotifBadge.textContent = pending > 99 ? '99+' : pending;
            adminNotifBadge.style.display = pending > 0 ? 'flex' : 'none';
        }

        applyAdminOrdersFilter();
        if(typeof initDashboardCharts === 'function') initDashboardCharts(orders);

        // Push notification for new pending orders
        if (pending > 0 && !window._lastPendingCount) window._lastPendingCount = pending;
        if (pending > (window._lastPendingCount || 0) && window._lastPendingCount !== undefined) {
            var newestPending = orders.filter(function(x){ return x[1].status === 'pending'; }).sort(function(a,b){ return (b[1].createdAt||0)-(a[1].createdAt||0); })[0];
            if (newestPending) {
                var no = newestPending[1];
                var nTitle = document.documentElement.lang === 'ar' ? 'طلب جديد!' : document.documentElement.lang === 'en' ? 'New Order!' : 'Nouvelle commande!';
                var nBody = (no.customerName || (document.documentElement.lang === 'ar' ? 'عميل' : document.documentElement.lang === 'en' ? 'Customer' : 'Client')) + ' - ' + (no.productTitle || '') + ' - ' + (no.price || 0) + ' ' + (no.currency || (document.documentElement.lang === 'ar' ? 'جنيه' : document.documentElement.lang === 'en' ? 'EGP' : 'EGP'));
                if ('Notification' in window && Notification.permission === 'granted') {
                    try { new Notification(nTitle, { body: nBody, icon: 'https://i.ibb.co/7tKdRmfC/68-1.png', tag: 'new-order-' + newestPending[0], requireInteraction: true }); } catch(e) {}
                }
                try {
                    var _actx = new (window.AudioContext || window.webkitAudioContext)();
                    [800,600,800,1000].forEach(function(f,i){
                        var _o = _actx.createOscillator(); var _g = _actx.createGain();
                        _o.connect(_g); _g.connect(_actx.destination);
                        _o.frequency.value = f; _o.type = 'sine';
                        _g.gain.setValueAtTime(0.3, _actx.currentTime + i*0.2);
                        _g.gain.exponentialRampToValueAtTime(0.001, _actx.currentTime + i*0.2 + 0.25);
                        _o.start(_actx.currentTime + i*0.2); _o.stop(_actx.currentTime + i*0.2 + 0.25);
                    });
                } catch(e) {}
            }
        }
        window._lastPendingCount = pending;
    });
}

function buildOrderItemsHtml(o, opts) {
    opts = opts || {};
    var lang = document.documentElement.lang || 'ar';
    var catEmojis = { books: '\u{1F4DA}', software: '\u{1F4BB}', formulas: '\u{1F9EA}', courses: '\u{1F393}' };
    var cats = APP_CONFIG ? APP_CONFIG.categories : null;
    var cur = o.currency || (document.documentElement.lang === 'ar' ? 'جنيه' : 'EGP');
    var html = '';
    if (o.items && typeof o.items === 'object') {
        var keys = Object.keys(o.items).filter(function(k) { var v = o.items[k]; return v && v.title; });
        if (keys.length > 0) {
            var imgs = [];
            keys.forEach(function(k) {
                var item = o.items[k];
                var img = item.image || '';
                if (img) imgs.push(img);
            });
            if (imgs.length > 0) {
                html += '<div class="order-items-list">';
                imgs.forEach(function(src) { html += '<img src="' + src + '" class="order-item-thumb" loading="lazy">'; });
                html += '</div>';
                return html;
            }
        }
    }
    var imgUrl = o.productImage || o.image || '';
    if (imgUrl) html += '<div class="order-items-list"><img src="' + imgUrl + '" class="order-item-thumb" loading="lazy"></div>';
    return html;
}

// Inject order items CSS once
if (!document.getElementById('orderItemsCss')) { var _oiCss = document.createElement('style'); _oiCss.id = 'orderItemsCss'; _oiCss.textContent = '.order-items-list{display:flex;flex-wrap:wrap;gap:10px;width:100%;justify-content:center;padding:4px 0}.order-item-thumb{width:42px;height:42px;object-fit:cover;border-radius:10px;border:2px solid rgba(147,51,234,0.2);cursor:pointer}.order-item-cat-badge{display:inline-flex;align-items:center;gap:6px;padding:5px 14px;border-radius:20px;font-size:0.8em;font-weight:700;background:rgba(245,158,11,0.12);border:2px solid rgba(245,158,11,0.3);color:#f59e0b;transition:all 0.3s ease}.order-receipt-box{margin-top:12px;padding:10px;background:rgba(147,51,234,0.08);border:1px solid rgba(147,51,234,0.2);border-radius:12px}.order-receipt-box .receipt-header{display:flex;align-items:center;justify-content:center;gap:6px;margin-bottom:8px}.order-receipt-box .receipt-header i{color:#9333ea;font-size:1em}.order-receipt-box .receipt-header div{font-size:0.85em;color:#9333ea;font-weight:800}.order-receipt-box img{cursor:pointer;border-radius:10px;width:100%;max-height:200px;object-fit:contain}'; document.head.appendChild(_oiCss); }

function renderOrders(orders) {
    const c = document.getElementById('ordersContainer'); if (!c) return;
    const staticEmpty = document.getElementById('ordersEmptyState');
    
    if (orders.length === 0) { 
        if(staticEmpty) {
            const hasActiveFilters = (window._adminSearchTerm && window._adminSearchTerm.trim()) || (window._adminCurrentFilter && window._adminCurrentFilter !== 'all') || (document.getElementById('ordersAdvPayment')?.value !== 'all') || (document.getElementById('ordersAdvCategory')?.value !== 'all') || (document.getElementById('ordersAdvDate')?.value !== 'all');
            staticEmpty.style.display = 'block';
            var _emptyLang = document.documentElement.lang || 'ar';
            staticEmpty.innerHTML = hasActiveFilters
                ? `<i class="fas fa-filter" style="font-size:4em; color:var(--text-secondary); margin-bottom:15px; display:inline-block;"></i><h3 style="font-size:1.5em; font-weight:900; color:var(--text-secondary); margin-bottom:10px;">${_emptyLang === 'ar' ? 'لا توجد نتائج تطابق الفلاتر الحالية' : _emptyLang === 'en' ? 'No results match current filters' : 'Aucun résultat ne correspond aux filtres'}</h3>`
                : `<i class="fas fa-shopping-cart" style="font-size:4em; color:var(--primary); margin-bottom:15px; display:inline-block;"></i><h3 style="font-size:1.5em; font-weight:900; color:var(--text-primary); margin-bottom:10px;">${_emptyLang === 'ar' ? 'لا يوجد طلبات حتى الآن' : _emptyLang === 'en' ? 'No orders yet' : 'Aucune commande pour le moment'}</h3>`;
        }
        c.innerHTML = '';
        return; 
    }
    if(staticEmpty) staticEmpty.style.display = 'none';

    var _al = document.documentElement.lang || 'ar';
    const statusLabels = { pending: _al === 'ar' ? '⏳ قيد الانتظار' : _al === 'en' ? '⏳ Pending' : '⏳ En attente', suspended: _al === 'ar' ? '🟣 معلق' : _al === 'en' ? '🟣 Suspended' : '🟣 Suspendue', confirmed: _al === 'ar' ? '✅ مؤكد' : _al === 'en' ? '✅ Confirmed' : '✅ Confirmée', rejected: _al === 'ar' ? '❌ مرفوض' : _al === 'en' ? '❌ Rejected' : '❌ Rejetée' };
    const statusClass = { pending: 'pending', suspended: 'suspended', confirmed: 'confirmed', rejected: 'rejected' };
    const catEmojis = { books: '📚', software: '💻', formulas: '🧪', courses: '🎓' };
    const catColors = { books:'#3b82f6', software:'#8b5cf6', formulas:'#f59e0b', courses:'#10b981' };
    const cats = APP_CONFIG ? APP_CONFIG.categories : null;
    const dayNamesAr = ['الأحد','الإثنين','الثلاثاء','الأربعاء','الخميس','الجمعة','السبت'];
    const dayNamesEn = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
    const dayNamesFr = ['Dimanche','Lundi','Mardi','Mercredi','Jeudi','Vendredi','Samedi'];
    const _adminDayNames = _al === 'ar' ? dayNamesAr : _al === 'en' ? dayNamesEn : dayNamesFr;
    const _adminDtLocale = _al === 'ar' ? 'ar-EG' : _al === 'en' ? 'en-US' : 'fr-FR';
    const lang = document.documentElement.lang || 'ar';
    const _ai18n = {
        products: lang === 'ar' ? 'المنتجات' : lang === 'en' ? 'Products' : 'Produits',
        orderNum: lang === 'ar' ? 'رقم الطلب' : lang === 'en' ? 'Order #' : 'Commande #',
        payment: lang === 'ar' ? 'طريقة الدفع' : lang === 'en' ? 'Payment' : 'Paiement',
        date: lang === 'ar' ? 'التاريخ' : lang === 'en' ? 'Date' : 'Date',
        email: lang === 'ar' ? 'البريد' : lang === 'en' ? 'Email' : 'Email',
        phone: lang === 'ar' ? 'الهاتف' : lang === 'en' ? 'Phone' : 'Téléphone',
        saved: lang === 'ar' ? 'وفر' : lang === 'en' ? 'Save' : 'Économisez',
        adminNote: lang === 'ar' ? 'ملاحظة المشرف' : lang === 'en' ? 'Admin Note' : 'Note admin',
        receipt: lang === 'ar' ? 'صورة الإيصال' : lang === 'en' ? 'Receipt' : 'Reçu',
        invoice: lang === 'ar' ? 'فاتورة' : lang === 'en' ? 'Invoice' : 'Facture',
        download: lang === 'ar' ? 'تحميل المنتج' : lang === 'en' ? 'Download' : 'Télécharger',
        confirm: lang === 'ar' ? 'تأكيد' : lang === 'en' ? 'Confirm' : 'Confirmer',
        reject: lang === 'ar' ? 'رفض' : lang === 'en' ? 'Reject' : 'Rejeter',
        restore: lang === 'ar' ? 'استعادة' : lang === 'en' ? 'Restore' : 'Restaurer',
        edit: lang === 'ar' ? 'تعديل' : lang === 'en' ? 'Edit' : 'Modifier',
        delete: lang === 'ar' ? 'حذف' : lang === 'en' ? 'Delete' : 'Supprimer',
        copyId: lang === 'ar' ? 'نسخ الرقم' : lang === 'en' ? 'Copy ID' : 'Copier ID',
        noResults: lang === 'ar' ? 'لا توجد نتائج تطابق الفلاتر الحالية' : lang === 'en' ? 'No results match current filters' : 'Aucun résultat ne correspond aux filtres',
        noOrders: lang === 'ar' ? 'لا يوجد طلبات حتى الآن' : lang === 'en' ? 'No orders yet' : 'Aucune commande pour le moment',
        unclassified: lang === 'ar' ? 'غير مصنف' : lang === 'en' ? 'Uncategorized' : 'Non classé',
        step1Title: lang === 'ar' ? 'تم إرسال الطلب' : lang === 'en' ? 'Order Placed' : 'Commande passée',
        step1Sub: lang === 'ar' ? 'تم استلام طلبك' : lang === 'en' ? 'Order received' : 'Commande reçue',
        step2Review: lang === 'ar' ? 'تمت المراجعة' : lang === 'en' ? 'Reviewed' : 'Examinée',
        step2Reviewing: lang === 'ar' ? 'جاري المراجعة' : lang === 'en' ? 'Under Review' : 'En cours',
        step2Pending: lang === 'ar' ? '⏳ في الانتظار' : lang === 'en' ? '⏳ Pending' : '⏳ En attente',
        step2SubDone: lang === 'ar' ? 'تم التحقق من الدفع' : lang === 'en' ? 'Payment verified' : 'Paiement vérifié',
        step2SubDoing: lang === 'ar' ? 'نراجع بيانات الدفع...' : lang === 'en' ? 'Reviewing payment...' : 'Vérification...',
        step3Confirmed: lang === 'ar' ? '✅ تم التأكيد' : lang === 'en' ? '✅ Confirmed' : '✅ Confirmée',
        step3Rejected: lang === 'ar' ? '❌ تم الرفض' : lang === 'en' ? '❌ Rejected' : '❌ Rejetée',
        step3Suspended: lang === 'ar' ? '🟣 معلق' : lang === 'en' ? '🟣 Suspended' : '🟣 Suspendue',
        step3Pending: lang === 'ar' ? '⏳ في الانتظار' : lang === 'en' ? '⏳ Pending' : '⏳ En attente',
        step3SubDone: lang === 'ar' ? 'تم تأكيد طلبك بنجاح' : lang === 'en' ? 'Order confirmed successfully' : 'Commande confirmée',
        step3SubRej: lang === 'ar' ? 'يرجى التواصل مع الدعم' : lang === 'en' ? 'Please contact support' : 'Veuillez contacter le support',
        step3SubSus: lang === 'ar' ? 'الطلب معلق للمراجعة' : lang === 'en' ? 'Order suspended for review' : 'Commande suspendue'
    };

    orders = orders.filter(([id, o]) => o && id);

    c.innerHTML = orders.map(([id, o]) => {
        const eId = String(id).replace(/"/g, '&quot;');
        const imgUrl = o.productImage || o.image || '';
        const dt = o.createdAt ? new Date(o.createdAt) : null;
        const fullDate = dt ? `${_adminDayNames[dt.getDay()]} - ${dt.toLocaleDateString(_adminDtLocale)} - ${lang === 'ar' ? 'الساعة' : lang === 'en' ? 'at' : 'à'} ${dt.toLocaleTimeString(_adminDtLocale, {hour:'2-digit',minute:'2-digit'})}` : '';
        const pmKey = o.paymentMethod || '';
        const pmName = (window.PAYMENT_ACCOUNTS && PAYMENT_ACCOUNTS[pmKey] ? PAYMENT_ACCOUNTS[pmKey].name?.[lang] || PAYMENT_ACCOUNTS[pmKey].name?.ar : '') || o.paymentMethodName || pmKey || '';
        const pmLogo = (window.PAYMENT_ACCOUNTS && PAYMENT_ACCOUNTS[pmKey]) ? PAYMENT_ACCOUNTS[pmKey].logo || '' : '';
        const cat = o.productCategory || o.category || '';
        const catName = cats ? (cats[lang]?.[cat] || cats.ar?.[cat] || cat || _ai18n.unclassified) : (cat || _ai18n.unclassified);
        const catEmoji = catEmojis[cat] || '📦';
        const catColor = catColors[cat] || '#8b5cf6';
        const orderIdShort = String(id).length > 8 ? String(id).slice(-8).toUpperCase() : String(id).toUpperCase();
        const isPending = o.status === 'pending';
        const isSuspended = o.status === 'suspended';
        const isConfirmed = o.status === 'confirmed';
        const isRejected = o.status === 'rejected';
        const hasReceipt = !!o.receiptImageUrl;

        // Discount calculation (مثل renderOrdersList)
        const currentPrice = parseFloat(o.price || 0);
        let orderOldPrice = o.productOldPriceEGP || o.oldPriceEGP;
        if (!orderOldPrice && o.items && typeof o.items === 'object') {
            orderOldPrice = Object.values(o.items).reduce((sum, item) => {
                const old = parseFloat(item.oldPriceEGP || 0);
                return sum + (old > parseFloat(item.price || 0) ? old : 0);
            }, 0);
        }
        const oldPriceVal = parseFloat(orderOldPrice || 0);
        const hasDiscount = oldPriceVal > 0 && oldPriceVal > currentPrice;
        const savings = hasDiscount ? oldPriceVal - currentPrice : 0;
        const savingsPercent = hasDiscount ? Math.round((savings / oldPriceVal) * 100) : 0;

        // Badges
        let discBadge = '', specBadge = '';
        if (hasDiscount) {
            discBadge = `<div class="discount-badge"><span class="discount-text">${lang === 'ar' ? 'خصم' : lang === 'en' ? 'OFF' : 'RÉDUCTION'}</span><span class="discount-percent">${savingsPercent}%</span></div>`;
        }
        if (o.productHot) {
            specBadge = `<span class="special-badge hot-badge"><i class="fas fa-fire"></i> ${lang === 'ar' ? 'الأكثر مبيعاً' : lang === 'en' ? 'BESTSELLER' : 'MEILLEURE VENTE'}</span>`;
        } else if (o.productFeatured) {
            specBadge = `<span class="special-badge featured-badge"><i class="fas fa-crown"></i> ${lang === 'ar' ? 'مميز' : lang === 'en' ? 'FEATURED' : 'EN VEDETTE'}</span>`;
        }
        const badgesHTML = (discBadge || specBadge) ? `<div class="badge-column">${discBadge}${specBadge}</div>` : '';

        // Build display title & items HTML for ALL products
        let displayTitle = o.productTitle || 'N/A';
        const displayTitleTranslated = (typeof displayTitle === 'string' && _isArabic(displayTitle)) ? _getTranslation(displayTitle, lang) : displayTitle;
        let displayImg = imgUrl;
        if (o.items && typeof o.items === 'object') {
            const keys = Object.keys(o.items).filter(k => o.items[k] && o.items[k].title);
            if (keys.length > 0) {
                const first = o.items[keys[0]];
                if (!displayImg && first.image) displayImg = first.image;
                if (keys.length > 1) {
                    displayTitle = keys.length + ' ' + (lang === 'ar' ? 'منتجات' : lang === 'en' ? 'products' : 'produits');
                } else {
                    displayTitle = first.title || o.productTitle;
                }
            }
        }
        const finalImgUrl = displayImg;
        const itemsHtml = buildOrderItemsHtml(o, { compact: true });

        const s2Done = o.status === 'confirmed' || o.status === 'rejected' || o.status === 'suspended';
        const s2Active = o.status === 'pending' || o.status === 'suspended';
        const s3Done = o.status === 'confirmed';
        const s3Rejected = o.status === 'rejected';
        const s3Suspended = o.status === 'suspended';

        const _statusColors = {
            confirmed: { border:'#047857', bg:'rgba(4,120,87,0.18)', header:'rgba(4,120,87,0.25)', id:'#047857', shadow:'rgba(4,120,87,0.4)' },
            rejected: { border:'#dc2626', bg:'rgba(220,38,38,0.18)', header:'rgba(220,38,38,0.25)', id:'#dc2626', shadow:'rgba(220,38,38,0.4)' },
            pending: { border:'#f59e0b', bg:'rgba(245,158,11,0.12)', header:'rgba(245,158,11,0.18)', id:'#f59e0b', shadow:'rgba(245,158,11,0.3)' },
            suspended: { border:'#8b5cf6', bg:'rgba(139,92,246,0.18)', header:'rgba(139,92,246,0.25)', id:'#8b5cf6', shadow:'rgba(139,92,246,0.4)' }
        };
        const _sc = _statusColors[o.status] || { border:'var(--border-color)', bg:'', header:'', id:'#fff', shadow:'transparent' };

        return `
        <div class="order-card ${window._openOrderId === eId ? 'open' : ''}" data-status="${o.status || 'pending'}" data-order-id="${eId}" onclick="toggleOrderCard(this)">
            <div class="order-card-inner" style="border-color:${_sc.border} !important;background:${_sc.bg || 'var(--card-bg)'} !important;box-shadow:0 0 25px ${_sc.shadow} !important;">
                <!-- Header — مطابق تماماً لـ renderOrdersList -->
                <div class="order-card-header" style="background:${_sc.header ? 'linear-gradient(135deg,'+_sc.header+','+_sc.header.replace('0.15','0.05').replace('0.1','0.03').replace('0.05','0.02')+') !important' : ''}">
                    <div class="order-card-header-left">
                        <span class="order-card-id" style="color:#fff !important;text-shadow:0 0 20px ${_sc.shadow} !important;">#${orderIdShort}</span>
                        <span class="order-card-title">${displayTitleTranslated}</span>
                    </div>
                    <div class="order-card-header-right">
                        <span class="order-card-header-price">
                            <i class="fas fa-fire"></i>
                            <span class="hdr-price-value">${currentPrice}</span>
                            <span class="hdr-price-currency">${(o.currency === 'جنيه' || o.currency === 'EGP') ? (lang === 'ar' ? 'جنيه' : 'EGP') : (o.currency || 'EGP')}</span>
                        </span>
                        <span class="admin-order-status-badge ${statusClass[o.status] || ''}" style="color:#fff !important;">${statusLabels[o.status] || o.status}</span>
                        <i class="fas fa-chevron-down order-card-chevron"></i>
                    </div>
                </div>

                <div class="order-card-collapse">
                    <div class="order-card-body">
                        <div class="order-card-split">
                            <div class="order-card-img-col">
                                ${itemsHtml}
                                ${hasReceipt ? `<div class="order-receipt-box"><div class="receipt-header"><i class="fas fa-receipt"></i><div>${_ai18n.receipt}</div></div><img src="${o.receiptImageUrl}" alt="${_ai18n.receipt}" loading="lazy" onclick="event.stopPropagation();openImageModal('${o.receiptImageUrl}')"></div>` : ''}
                            </div>

                            <!-- Info + Admin extras -->
                            <div class="order-card-info-col">
                                <div class="order-info-grid">
                                    <div class="info-row">
                                        <span class="info-label">${_ai18n.products}</span>
                                        <span class="info-value" style="white-space:normal;line-height:1.6">${(function(){if(o.items&&typeof o.items==='object'){var ks=Object.keys(o.items).filter(function(k){return o.items[k]&&o.items[k].title});if(ks.length>0){var catEmojis={books:'📚',software:'💻',formulas:'🧪',courses:'🎓'};var cats2=APP_CONFIG?APP_CONFIG.categories:null;var lang2=document.documentElement.lang||'ar';var lines=ks.map(function(k){var it=o.items[k];var qty=it.quantity||1;var cat=it.category||'';var ce=catEmojis[cat]||'';var cn=(cats2&&cats2[lang2]&&cats2[lang2][cat])||cat||'';var t=(typeof it.title==='string'&&_isArabic(it.title))?_getTranslation(it.title,lang2):(it.title||'');return t+' <span style="color:#9333ea">\u00D7'+qty+'</span>'+(cn?' <span class="order-item-cat-badge">'+ce+' '+cn+'</span>':'')});return lines.join('<br>')}}var pt=o.productTitle||'N/A';return(typeof pt==='string'&&_isArabic(pt))?_getTranslation(pt,lang):pt;})()}</span>
                                    </div>
                                    <div class="info-row">
                                        <span class="info-label">${_ai18n.orderNum}</span>
                                        <span class="info-value ord-id">#${orderIdShort} <button class="copy-id-btn" onclick="event.stopPropagation();copyToClipboard('${id}',this)" title="${_ai18n.copyId}"><i class="fas fa-copy"></i></button></span>
                                    </div>
                                    <div class="info-row">
                                        <span class="info-label">${_ai18n.payment}</span>
                                        <span class="info-value pay-method">${pmName} ${pmLogo ? `<img src="${pmLogo}" class="pay-icon" alt="">` : ''}</span>
                                    </div>
                                    <div class="info-row">
                                        <span class="info-label">${_ai18n.date}</span>
                                        <span class="info-value">${fullDate}</span>
                                    </div>
                                </div>

                                <!-- Pricing block -->
                                <div class="order-pricing-block">
                                    ${hasDiscount ? `<div class="price-old-save-row"><div class="price-old"><span class="price-old-value">${oldPriceVal}</span> ${(o.currency === 'جنيه' || o.currency === 'EGP') ? (lang === 'ar' ? 'جنيه' : 'EGP') : (o.currency || 'EGP')}</div><span class="price-save"><i class="fas fa-tag"></i> ${_ai18n.saved} ${savings}</span></div>` : ''}
                                    <div class="price-final">
                                        <i class="fas fa-fire animated-fire"></i>
                                        <span class="price-value">${currentPrice}</span>
                                        <span class="price-currency">${(o.currency === 'جنيه' || o.currency === 'EGP') ? (lang === 'ar' ? 'جنيه' : 'EGP') : (o.currency || 'EGP')}</span>
                                    </div>
                                </div>

                                <!-- Admin extra fields -->
                                <div class="order-info-grid" style="margin-top:10px;padding-top:10px;border-top:1px solid rgba(255,255,255,0.08);">
                                    <div class="info-row">
                                        <span class="info-label">${_ai18n.email}</span>
                                        <span class="info-value" style="font-size:0.85em;color:var(--text-secondary)">${o.customerEmail || 'N/A'}</span>
                                    </div>
                                    <div class="info-row">
                                        <span class="info-label">${_ai18n.phone}</span>
                                        <span class="info-value" dir="ltr">${o.customerPhone || '-'}</span>
                                    </div>
                                </div>

                                ${o.adminNote ? `<div class="order-note"><i class="fas fa-sticky-note"></i> ${_ai18n.adminNote}: ${o.adminNote}</div>` : ''}

                                <!-- Admin action buttons -->
                                <div class="order-action-row" style="flex-wrap:wrap;">
                                    <button class="admin-order-action-btn print-order" onclick="printOrderInvoice('${eId}')" title="${_ai18n.invoice}"><i class="fas fa-file-invoice"></i> ${_ai18n.invoice}</button>
                                    ${isConfirmed ? `<a href="${(o.downloadLink && o.downloadLink !== '#') ? o.downloadLink : (o._dlFallback || '#')}" class="admin-order-action-btn download-product" target="_blank" onclick="event.stopPropagation()"><i class="fas fa-download"></i> ${_ai18n.download}</a>` : ''}
                                    ${isPending ? `<button class="admin-order-action-btn confirm" onclick="confirmOrder('${eId}')"><i class="fas fa-check"></i> ${_ai18n.confirm}</button><button class="admin-order-action-btn reject" onclick="rejectOrder('${eId}')"><i class="fas fa-times"></i> ${_ai18n.reject}</button>` : ''}
                                    ${isSuspended ? `<button class="admin-order-action-btn restore" onclick="restoreOrder('${eId}')"><i class="fas fa-undo"></i> ${_ai18n.restore}</button><button class="admin-order-action-btn reject" onclick="rejectOrder('${eId}')"><i class="fas fa-times"></i> ${_ai18n.reject}</button>` : ''}
                                    ${isConfirmed ? `<button class="admin-order-action-btn restore" onclick="restoreOrder('${eId}')"><i class="fas fa-undo"></i> ${_ai18n.restore}</button><button class="admin-order-action-btn reject" onclick="rejectOrder('${eId}')"><i class="fas fa-times"></i> ${_ai18n.reject}</button>` : ''}
                                    ${isRejected ? `<button class="admin-order-action-btn restore" onclick="restoreOrder('${eId}')"><i class="fas fa-undo"></i> ${_ai18n.restore}</button>` : ''}
                                    <button class="admin-order-action-btn edit-order" onclick="openEditOrderModal('${eId}')"><i class="fas fa-edit"></i> ${_ai18n.edit}</button>
                                    <button class="admin-order-action-btn delete-order" onclick="deleteOrder('${eId}')"><i class="fas fa-trash"></i> ${_ai18n.delete}</button>
                                </div>
                            </div>
                        </div>

                        <!-- Status steps -->
                        <div class="order-steps">
                            <div class="order-progress-line ${o.status}"></div>
                            <div class="order-step completed">
                                <div class="order-step-dot completed"></div>
                                <div class="order-step-text"><span>${_ai18n.step1Title}</span><small>${_ai18n.step1Sub}</small></div>
                            </div>
                            <div class="order-step ${s2Done ? 'completed' : (s2Active ? 'active' : '')}">
                                <div class="order-step-dot ${s2Done ? 'completed' : (s2Active ? 'active' : '')}"></div>
                                <div class="order-step-text"><span>${s2Done ? _ai18n.step2Review : (s2Active ? _ai18n.step2Reviewing : _ai18n.step2Pending)}</span><small>${s2Done ? _ai18n.step2SubDone : (s2Active ? _ai18n.step2SubDoing : '')}</small></div>
                            </div>
                            <div class="order-step ${s3Done ? 'completed' : (s3Rejected ? 'rejected' : (s3Suspended ? 'suspended' : ''))}">
                                <div class="order-step-dot ${s3Done ? 'completed' : (s3Rejected ? 'rejected' : (s3Suspended ? 'suspended' : ''))}"></div>
                                <div class="order-step-text"><span>${s3Done ? _ai18n.step3Confirmed : (s3Rejected ? _ai18n.step3Rejected : (s3Suspended ? _ai18n.step3Suspended : _ai18n.step2Pending))}</span><small>${s3Done ? _ai18n.step3SubDone : (s3Rejected ? _ai18n.step3SubRej : (s3Suspended ? _ai18n.step3SubSus : ''))}</small></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>`;
    }).join('');
    if (window._lastConfirmed) {
        const shortId = window._lastConfirmed.slice(-8).toUpperCase();
        document.querySelectorAll('.order-card').forEach(c => {
            const idEl = c.querySelector('.order-card-id');
            if (idEl && idEl.textContent.replace('#','').trim() === shortId) c.classList.add('open');
        });
        setTimeout(() => { window._lastConfirmed = ''; }, 2000);
    }
}

window.filterOrders = function(status, e) {
    var ev = e || window.event;
    document.querySelectorAll('.filter-buttons .filter-btn, .admin-products-filters .filter-btn').forEach(function(b) { b.classList.remove('active'); });
    if (ev && ev.target && ev.target.closest) {
        var btn = ev.target.closest('.filter-btn');
        if (btn) btn.classList.add('active');
    }
    window._adminCurrentFilter = status;
    applyAdminOrdersFilter();
};

function applyAdminOrdersFilter() {
    if (!window.allOrders) return;
    let filtered = window.allOrders;
    const status = window._adminCurrentFilter || 'all';
    if (status !== 'all') filtered = filtered.filter(([_, o]) => o.status === status);

    const advanced = document.getElementById('ordersAdvPayment');
    const advPayment = advanced ? advanced.value : 'all';
    if (advPayment !== 'all') {
        filtered = filtered.filter(([_, o]) => (o.paymentMethod || '') === advPayment);
    }

    const badgeEl = document.getElementById('ordersAdvBadge');
    const advBadge = badgeEl ? badgeEl.value : 'all';
    if (advBadge !== 'all') {
        filtered = filtered.filter(([_, o]) => {
            if (advBadge === 'none') return !o.productBadge || o.productBadge === 'none';
            return o.productBadge === advBadge;
        });
    }

    const sortEl = document.getElementById('ordersAdvSort');
    const advSort = sortEl ? sortEl.value : 'default';
    if (advSort === 'price_asc') {
        filtered.sort(([_, a], [__, b]) => (parseFloat(a.price) || 0) - (parseFloat(b.price) || 0));
    } else if (advSort === 'price_desc') {
        filtered.sort(([_, a], [__, b]) => (parseFloat(b.price) || 0) - (parseFloat(a.price) || 0));
    }

    const catEl = document.getElementById('ordersAdvCategory');
    const advCat = catEl ? catEl.value : 'all';
    if (advCat !== 'all') {
        filtered = filtered.filter(([_, o]) => (o.productCategory || o.category || '') === advCat);
    }

    const dateEl = document.getElementById('ordersAdvDate');
    const advDate = dateEl ? dateEl.value : 'all';
    if (advDate !== 'all') {
        const now = new Date();
        const customDateVal = document.getElementById('ordersAdvCustomDate')?.value;
        const customDateEndVal = document.getElementById('ordersAdvCustomDateEnd')?.value;
        filtered = filtered.filter(([_, o]) => {
            if (!o.createdAt) return false;
            const d = new Date(o.createdAt);
            if (advDate === 'today') return d.toDateString() === now.toDateString();
            if (advDate === 'week') return (now - d) <= 7 * 86400000;
            if (advDate === 'month') return (now - d) <= 30 * 86400000;
            if (advDate === 'custom' && customDateVal) {
                const sel = new Date(customDateVal);
                if (customDateEndVal) {
                    const selEnd = new Date(customDateEndVal);
                    selEnd.setHours(23,59,59,999);
                    return d >= sel && d <= selEnd;
                }
                return d.toDateString() === sel.toDateString();
            }
            return true;
        });
    }

    const search = (window._adminSearchTerm || '').toLowerCase().trim();
    if (search) {
        filtered = filtered.filter(([id, o]) => {
            function collectText(obj) {
                if (!obj || typeof obj !== 'object') return '';
                return Object.values(obj).map(v => {
                    if (typeof v === 'string') return v;
                    if (typeof v === 'number') return String(v);
                    if (v && typeof v === 'object' && !Array.isArray(v)) return collectText(v);
                    return '';
                }).join(' ');
            }
            const itemsText = o.items ? collectText(o.items) : '';
            const text = (
                id + ' ' +
                (o.productTitle||'') + ' ' +
                (o.customerName||'') + ' ' +
                (o.customerEmail||'') + ' ' +
                (o.customerPhone||'') + ' ' +
                (o.id||'') + ' ' +
                (o.price||'') + ' ' +
                (o.currency||'') + ' ' +
                (o.paymentMethodName||'') + ' ' +
                (o.paymentMethod||'') + ' ' +
                (o.adminNote||'') + ' ' +
                (o.productCategory||o.category||'') + ' ' +
                (o.status||'') + ' ' +
                (o.productBadge||'') + ' ' +
                (o.customerAddress||'') + ' ' +
                (o.customerNotes||'') + ' ' +
                (o.discountCode||'') + ' ' +
                (o.receiptImageUrl ? (document.documentElement.lang === 'ar' ? 'ايصال' : document.documentElement.lang === 'en' ? 'receipt' : 'reçu') : '') + ' ' +
                itemsText
            ).toLowerCase();
            return text.includes(search);
        });
    }
    renderOrders(filtered);
}

window.adminOrdersSearch = function() {
    const input = document.getElementById('adminOrdersSearch');
    window._adminSearchTerm = input ? input.value : '';
    const dateEl = document.getElementById('ordersAdvDate');
    if (dateEl && dateEl.value === 'custom') {
        openDatePicker(function(startDate, endDate) {
            if (startDate === null) {
                dateEl.value = 'all';
                const el = document.getElementById('ordersAdvCustomDate');
                if (el) el.value = '';
                const elEnd = document.getElementById('ordersAdvCustomDateEnd');
                if (elEnd) elEnd.value = '';
                applyAdminOrdersFilter();
                return;
            }
            const el = document.getElementById('ordersAdvCustomDate');
            if (el) el.value = startDate;
            const elEnd = document.getElementById('ordersAdvCustomDateEnd');
            if (elEnd) elEnd.value = endDate || startDate;
            applyAdminOrdersFilter();
        });
        return;
    }
    applyAdminOrdersFilter();
};

window.resetOrdersFilters = function() {
    window._adminCurrentFilter = 'all';
    window._adminSearchTerm = '';
    const searchInput = document.getElementById('adminOrdersSearch');
    if (searchInput) searchInput.value = '';
    const pay = document.getElementById('ordersAdvPayment');
    if (pay) pay.value = 'all';
    const badge = document.getElementById('ordersAdvBadge');
    if (badge) badge.value = 'all';
    const sort = document.getElementById('ordersAdvSort');
    if (sort) sort.value = 'default';
    const cat = document.getElementById('ordersAdvCategory');
    if (cat) cat.value = 'all';
    const date = document.getElementById('ordersAdvDate');
    if (date) date.value = 'all';
    const cd = document.getElementById('ordersAdvCustomDate');
    if (cd) cd.value = '';
    const cdEnd = document.getElementById('ordersAdvCustomDateEnd');
    if (cdEnd) cdEnd.value = '';
    document.querySelectorAll('.filter-buttons .filter-btn').forEach(b => b.classList.remove('active'));
    const first = document.querySelector('.filter-buttons .filter-btn');
    if (first) first.classList.add('active');
    applyAdminOrdersFilter();
    showToast('🔄', document.documentElement.lang === 'ar' ? 'تم إعادة ضبط الفلاتر' : document.documentElement.lang === 'en' ? 'Filters reset' : 'Filtres réinitialisés', 'info');
};

// ===== Product search & filter =====
window._adminProdFilter = 'all';
window._adminProdSearch = '';

function updateProductFilterCounts(products) {
    const total = products.length;
    const books = products.filter(([_, p]) => (p.category || 'books') === 'books').length;
    const software = products.filter(([_, p]) => (p.category || '') === 'software').length;
    const formulas = products.filter(([_, p]) => (p.category || '') === 'formulas').length;
    const courses = products.filter(([_, p]) => (p.category || '') === 'courses').length;
    const ids = { prodCountAll: total, prodCountBooks: books, prodCountSoftware: software, prodCountFormulas: formulas, prodCountCourses: courses };
    Object.entries(ids).forEach(([id, v]) => { const el = document.getElementById(id); if (el) el.textContent = v; });
}

function applyAdminProductsFilter() {
    const all = window._adminAllProducts || [];
    const term = (window._adminProdSearch || '').trim().toLowerCase();
    const catFilter = window._adminProdFilter || 'all';
    const badgeEl = document.getElementById('productsAdvBadge');
    const badgeFilter = badgeEl ? badgeEl.value : 'all';
    const sortEl = document.getElementById('productsAdvSort');
    const sortBy = sortEl ? sortEl.value : 'default';
    const dateEl = document.getElementById('productsAdvDate');
    const dateFilter = dateEl ? dateEl.value : 'all';
    const customDateEl = document.getElementById('productsAdvCustomDate');
    const customDate = customDateEl ? customDateEl.value : '';
    const payEl = document.getElementById('productsAdvPayment');
    const payFilter = payEl ? payEl.value : 'all';
    let filtered = all;
    
    // Category filter (from buttons)
    if (catFilter !== 'all') filtered = filtered.filter(([_, p]) => (p.category || 'books') === catFilter);
    // Badge filter
    if (badgeFilter !== 'all') {
        filtered = filtered.filter(([_, p]) => {
            if (badgeFilter === 'none') return !p.badge || p.badge === 'none';
            return p.badge === badgeFilter;
        });
    }
    // Date filter
    if (dateFilter !== 'all') {
        const now = Date.now();
        let cutoff = 0;
        if (dateFilter === 'today') cutoff = now - 86400000;
        else if (dateFilter === 'week') cutoff = now - 7 * 86400000;
        else if (dateFilter === 'month') cutoff = now - 30 * 86400000;
        else if (dateFilter === 'custom' && customDate) {
            const d = new Date(customDate);
            if (!isNaN(d.getTime())) cutoff = d.getTime();
            const endDateEl = document.getElementById('productsAdvCustomDateEnd');
            const endDateVal = endDateEl ? endDateEl.value : '';
            if (endDateVal) {
                const dEnd = new Date(endDateVal);
                if (!isNaN(dEnd.getTime())) {
                    const endOfDay = dEnd.getTime() + 86400000 - 1;
                    filtered = filtered.filter(([_, p]) => {
                        const created = p.createdAt || p.created || 0;
                        return created >= cutoff && created <= endOfDay;
                    });
                    cutoff = -1;
                }
            }
        }
        if (cutoff > 0) {
            filtered = filtered.filter(([_, p]) => {
                const created = p.createdAt || p.created || 0;
                return created >= cutoff;
            });
        }
    }
    // Payment filter
    if (payFilter !== 'all') {
        filtered = filtered.filter(([_, p]) => {
            const prodPay = p.payment || p.paymentMethod || '';
            return prodPay === payFilter;
        });
    }
    // Search term
    if (term) {
        filtered = filtered.filter(([id, p]) => {
            var searchTitle = typeof p.title === 'string' ? p.title : (p.title?.ar || p.title?.en || p.title?.fr || '');
            const t = searchTitle + ' ' + (p.category || '') + ' ' + (p.priceEGP || '') + ' ' + (p.priceUSD || '');
            return t.toLowerCase().includes(term) || String(id).toLowerCase().includes(term);
        });
    }
    // Sort
    if (sortBy === 'price_asc') {
        filtered.sort(([_, a], [__, b]) => (parseFloat(a.priceEGP) || 0) - (parseFloat(b.priceEGP) || 0));
    } else if (sortBy === 'price_desc') {
        filtered.sort(([_, a], [__, b]) => (parseFloat(b.priceEGP) || 0) - (parseFloat(a.priceEGP) || 0));
    }
    
    if (typeof window._adminRenderProducts === 'function') window._adminRenderProducts(filtered);
}

window.filterProducts = function(cat, event) {
    if (event) { event.preventDefault(); }
    window._adminProdFilter = cat;
    document.querySelectorAll('.admin-products-filters .filter-btn').forEach(b => b.classList.remove('active'));
    const btn = cat === 'all' ? document.getElementById('prodFilterAll') : document.getElementById('prodFilter' + cat.charAt(0).toUpperCase() + cat.slice(1));
    if (btn) btn.classList.add('active');
    applyAdminProductsFilter();
};

window.adminProductsSearch = function() {
    const input = document.getElementById('adminProductsSearch');
    window._adminProdSearch = input ? input.value : '';
    const dateEl = document.getElementById('productsAdvDate');
    if (dateEl && dateEl.value === 'custom') {
        openDatePicker(function(startDate, endDate) {
            if (startDate === null) {
                dateEl.value = 'all';
                const el = document.getElementById('productsAdvCustomDate');
                if (el) el.value = '';
                const elEnd = document.getElementById('productsAdvCustomDateEnd');
                if (elEnd) elEnd.value = '';
                applyAdminProductsFilter();
                return;
            }
            const el = document.getElementById('productsAdvCustomDate');
            if (el) el.value = startDate;
            const elEnd = document.getElementById('productsAdvCustomDateEnd');
            if (elEnd) elEnd.value = endDate || startDate;
            applyAdminProductsFilter();
        });
        return;
    }
    applyAdminProductsFilter();
};

window.resetProductsFilters = function() {
    const selects = document.querySelectorAll('#productsAdvancedFilters select');
    selects.forEach(s => {
        if (s.id === 'productsAdvSort') s.value = 'default';
        else s.value = 'all';
    });
    const customDate = document.getElementById('productsAdvCustomDate');
    if (customDate) customDate.value = '';
    const customDateEnd = document.getElementById('productsAdvCustomDateEnd');
    if (customDateEnd) customDateEnd.value = '';
    window._adminProdFilter = 'all';
    const btns = document.querySelectorAll('.admin-products-filters .filter-btn');
    btns.forEach(b => b.classList.remove('active'));
    const allBtn = document.getElementById('prodFilterAll');
    if (allBtn) allBtn.classList.add('active');
    window._adminProdSearch = '';
    const searchInput = document.getElementById('adminProductsSearch');
    if (searchInput) searchInput.value = '';
    applyAdminProductsFilter();
    showToast('🔄', document.documentElement.lang === 'ar' ? 'تم إعادة ضبط الفلاتر' : document.documentElement.lang === 'en' ? 'Filters reset' : 'Filtres réinitialisés', 'info');
};

// ==================== DATE PICKER ====================
let _datePickerSelected = null;
let _datePickerRangeStart = null;
let _datePickerRangeEnd = null;
let _datePickerMonth = new Date().getMonth();
let _datePickerYear = new Date().getFullYear();
let _datePickerCallback = null;

window.openDatePicker = function(callback) {
    _datePickerCallback = callback || null;
    // Initialize from previously stored values
    _datePickerRangeStart = null;
    _datePickerRangeEnd = null;
    if (!_datePickerSelected) {
        _datePickerMonth = new Date().getMonth();
        _datePickerYear = new Date().getFullYear();
    }
    const hint = document.getElementById('datePickerRangeHint');
    if (hint) hint.textContent = document.documentElement.lang === 'ar' ? 'اختر تاريخ البداية' : document.documentElement.lang === 'en' ? 'Select start date' : 'Sélectionnez la date de début';
    const info = document.getElementById('datePickerSelectedInfo');
    if (info) info.textContent = '';
    renderDatePickerCalendar();
    document.getElementById('datePickerPopup').style.display = 'flex';
};

window.closeDatePicker = function() {
    document.getElementById('datePickerPopup').style.display = 'none';
};

window.datePickerMonth = function(delta) {
    _datePickerMonth += delta;
    if (_datePickerMonth > 11) { _datePickerMonth = 0; _datePickerYear++; }
    if (_datePickerMonth < 0) { _datePickerMonth = 11; _datePickerYear--; }
    renderDatePickerCalendar();
};

function renderDatePickerCalendar() {
    const monthNames = document.documentElement.lang === 'ar' ? ['يناير','فبراير','مارس','إبريل','مايو','يونيو','يوليو','أغسطس','سبتمبر','أكتوبر','نوفمبر','ديسمبر'] : document.documentElement.lang === 'en' ? ['January','February','March','April','May','June','July','August','September','October','November','December'] : ['janvier','février','mars','avril','mai','juin','juillet','août','septembre','octobre','novembre','décembre'];
    document.getElementById('datePickerMonthLabel').textContent = `${monthNames[_datePickerMonth]} ${_datePickerYear}`;
    const grid = document.getElementById('datePickerGrid');
    const firstDay = new Date(_datePickerYear, _datePickerMonth, 1).getDay();
    const daysInMonth = new Date(_datePickerYear, _datePickerMonth + 1, 0).getDate();
    const today = new Date();
    const todayStr = `${today.getFullYear()}-${String(today.getMonth()+1).padStart(2,'0')}-${String(today.getDate()).padStart(2,'0')}`;
    // Check if ranges span across this month
    const rangeStart = _datePickerRangeStart ? new Date(_datePickerRangeStart) : null;
    const rangeEnd = _datePickerRangeEnd ? new Date(_datePickerRangeEnd) : null;
    let html = '';
    const adjustedFirst = (firstDay + 1) % 7;
    for (let i = 0; i < adjustedFirst; i++) html += '<div></div>';
    for (let d = 1; d <= daysInMonth; d++) {
        const dateStr = `${_datePickerYear}-${String(_datePickerMonth+1).padStart(2,'0')}-${String(d).padStart(2,'0')}`;
        const dateObj = new Date(_datePickerYear, _datePickerMonth, d);
        const isToday = dateStr === todayStr;
        const isSelected = _datePickerSelected === dateStr;
        const isStart = dateStr === _datePickerRangeStart;
        const isEnd = dateStr === _datePickerRangeEnd;
        const inRange = rangeStart && rangeEnd && dateObj >= rangeStart && dateObj <= rangeEnd;
        let bg = 'transparent';
        let txt = '#ddd';
        let bd = '3px solid transparent';
        if (isStart && isEnd) {
            bg = 'linear-gradient(135deg,#8b5cf6,#7c3aed)';
            txt = '#fff';
            bd = '3px solid #8b5cf6';
        } else if (isStart) {
            bg = 'linear-gradient(135deg,#8b5cf6,#6d28d9)';
            txt = '#fff';
            bd = '3px solid #8b5cf6';
        } else if (isEnd) {
            bg = 'linear-gradient(135deg,#ec4899,#db2777)';
            txt = '#fff';
            bd = '3px solid #ec4899';
        } else if (inRange) {
            bg = 'rgba(139,92,246,0.2)';
            txt = '#c4b5fd';
            bd = '3px solid rgba(139,92,246,0.2)';
        } else if (isSelected) {
            bg = 'linear-gradient(135deg,#8b5cf6,#7c3aed)';
            txt = '#fff';
            bd = '3px solid #8b5cf6';
        } else if (isToday) {
            bg = 'rgba(147,51,234,0.2)';
            txt = '#a78bfa';
            bd = '3px solid rgba(147,51,234,0.4)';
        }
        html += `<div onclick="datePickerSelectDay('${dateStr}')" class="dp-btn dp-day" style="padding:7px 3px;border-radius:12px;font-weight:900;font-size:15px;background:${bg};color:${txt};border:${bd};">${d}</div>`;
    }
    grid.innerHTML = html;
}

window.datePickerSelectDay = function(dateStr) {
    const hint = document.getElementById('datePickerRangeHint');
    const info = document.getElementById('datePickerSelectedInfo');
    if (!_datePickerRangeStart) {
        // First click - set start
        _datePickerRangeStart = dateStr;
        _datePickerRangeEnd = null;
        _datePickerSelected = dateStr;
        if (hint) hint.textContent = document.documentElement.lang === 'ar' ? 'اختر تاريخ النهاية' : document.documentElement.lang === 'en' ? 'Select end date' : 'Sélectionnez la date de fin';
        if (info) info.textContent = document.documentElement.lang === 'ar' ? `من: ${formatDate(dateStr)} — اختر تاريخ النهاية` : document.documentElement.lang === 'en' ? `From: ${formatDate(dateStr)} — Select end date` : `De: ${formatDate(dateStr)} — Sélectionnez la date de fin`;
    } else if (!_datePickerRangeEnd) {
        // Second click - set end
        if (dateStr < _datePickerRangeStart) {
            // Swap if end is before start
            _datePickerRangeEnd = _datePickerRangeStart;
            _datePickerRangeStart = dateStr;
        } else {
            _datePickerRangeEnd = dateStr;
        }
        _datePickerSelected = null;
        if (hint) hint.textContent = document.documentElement.lang === 'ar' ? '✓ تم تحديد المدى' : document.documentElement.lang === 'en' ? '✓ Range selected' : '✓ Plage sélectionnée';
        if (info) info.textContent = document.documentElement.lang === 'ar' ? `من ${formatDate(_datePickerRangeStart)} إلى ${formatDate(_datePickerRangeEnd)}` : document.documentElement.lang === 'en' ? `From ${formatDate(_datePickerRangeStart)} to ${formatDate(_datePickerRangeEnd)}` : `Du ${formatDate(_datePickerRangeStart)} au ${formatDate(_datePickerRangeEnd)}`;
    } else {
        // Third click - restart range
        _datePickerRangeStart = dateStr;
        _datePickerRangeEnd = null;
        _datePickerSelected = dateStr;
        if (hint) hint.textContent = document.documentElement.lang === 'ar' ? 'اختر تاريخ النهاية' : document.documentElement.lang === 'en' ? 'Select end date' : 'Sélectionnez la date de fin';
        if (info) info.textContent = document.documentElement.lang === 'ar' ? `من: ${formatDate(dateStr)} — اختر تاريخ النهاية` : document.documentElement.lang === 'en' ? `From: ${formatDate(dateStr)} — Select end date` : `De: ${formatDate(dateStr)} — Sélectionnez la date de fin`;
    }
    renderDatePickerCalendar();
};

function formatDate(dateStr) {
    const d = new Date(dateStr);
    const monthNames = document.documentElement.lang === 'ar' ? ['يناير','فبراير','مارس','إبريل','مايو','يونيو','يوليو','أغسطس','سبتمبر','أكتوبر','نوفمبر','ديسمبر'] : document.documentElement.lang === 'en' ? ['January','February','March','April','May','June','July','August','September','October','November','December'] : ['janvier','février','mars','avril','mai','juin','juillet','août','septembre','octobre','novembre','décembre'];
    return `${d.getDate()} ${monthNames[d.getMonth()]} ${d.getFullYear()}`;
}

window.applyDatePicker = function() {
    if (_datePickerRangeStart && _datePickerRangeEnd && _datePickerCallback) {
        _datePickerCallback(_datePickerRangeStart, _datePickerRangeEnd);
    } else if (_datePickerSelected && _datePickerRangeStart && !_datePickerRangeEnd && _datePickerCallback) {
        // Single day (same start/end)
        _datePickerCallback(_datePickerRangeStart, _datePickerRangeStart);
    } else if (_datePickerSelected && _datePickerCallback) {
        _datePickerCallback(_datePickerSelected, _datePickerSelected);
    } else {
        // Cancel - no selection
        if (_datePickerCallback) _datePickerCallback(null, null);
        closeDatePicker();
        return;
    }
    closeDatePicker();
};

window._lastConfirmed = '';
async function confirmOrder(id) {
    window._lastConfirmed = id;
    const orderData = window.allOrders?.find(([oid]) => oid === id)?.[1];
    const updates = { status: 'confirmed', downloadGranted: true, confirmedAt: Date.now(), updatedAt: Date.now() };
    if (orderData && (!orderData.downloadLink || orderData.downloadLink === '#')) {
        let pid = orderData.productId;
        if ((!pid || pid === 'cart_checkout' || pid === 'N/A') && orderData.items && typeof orderData.items === 'object') {
            const itemKeys = Object.keys(orderData.items);
            if (itemKeys.length > 0) pid = itemKeys[0];
        }
        if (pid && pid !== 'cart_checkout' && pid !== 'N/A') {
            try { const p = await DB.get(`products/${pid}`); if (p && p.downloadLink) updates.downloadLink = p.downloadLink; } catch(e) {}
        }
    }
    if (orderData && !updates.downloadLink && orderData.downloadLink && orderData.downloadLink !== '#') updates.downloadLink = orderData.downloadLink;
    const s = await DB.update(`orders/${id}`, updates);
    if (s) showToast('✅', currentLang === 'ar' ? 'تم التأكيد ومنح صلاحية التحميل' : currentLang === 'en' ? 'Confirmed & download granted' : 'Confirmé et téléchargement accordé', 'success');
    else showToast('❌', currentLang === 'ar' ? 'فشل التحديث' : currentLang === 'en' ? 'Update failed' : 'Échec de la mise à jour', 'error');
}
async function rejectOrder(id) {
    window._lastConfirmed = id;
    const s = await DB.update(`orders/${id}`, { status: 'rejected', rejectedAt: Date.now(), updatedAt: Date.now() });
    if (s) showToast('✅', currentLang === 'ar' ? 'تم الرفض' : currentLang === 'en' ? 'Rejected' : 'Rejeté', 'info');
    else showToast('❌', currentLang === 'ar' ? 'فشل التحديث' : currentLang === 'en' ? 'Update failed' : 'Échec de la mise à jour', 'error');
}
async function suspendOrder(id) {
    const s = await DB.update(`orders/${id}`, { status: 'suspended', suspendedAt: Date.now(), updatedAt: Date.now() });
    if (s) showToast('🟣', currentLang === 'ar' ? 'تم تعليق الطلب' : currentLang === 'en' ? 'Order suspended' : 'Commande suspendue', 'warning');
    else showToast('❌', currentLang === 'ar' ? 'فشل التحديث' : currentLang === 'en' ? 'Update failed' : 'Échec de la mise à jour', 'error');
}
async function restoreOrder(id) {
    window._lastConfirmed = id;
    const s = await DB.update(`orders/${id}`, { status: 'pending', restoredAt: Date.now(), updatedAt: Date.now() });
    if (s) showToast('✅', currentLang === 'ar' ? 'تمت استعادة الطلب' : currentLang === 'en' ? 'Order restored' : 'Commande restaurée', 'success');
    else showToast('❌', currentLang === 'ar' ? 'فشل التحديث' : currentLang === 'en' ? 'Update failed' : 'Échec de la mise à jour', 'error');
}
async function deleteOrder(id) {
    if (!confirm(currentLang === 'ar' ? 'هل أنت متأكد من حذف هذا الطلب؟' : currentLang === 'en' ? 'Delete this order?' : 'Supprimer cette commande ?')) return;
    const s = await DB.update(`orders/${id}`, { status: 'trashed', trashedAt: Date.now(), updatedAt: Date.now() });
    if (s) showToast('🗑️', currentLang === 'ar' ? 'تم نقل الطلب إلى سلة المهملات' : currentLang === 'en' ? 'Order moved to trash' : 'Commande déplacée vers la corbeille', 'info');
    else showToast('❌', currentLang === 'ar' ? 'فشل الحذف' : currentLang === 'en' ? 'Delete failed' : 'Échec de la suppression', 'error');
}
window.confirmOrder = confirmOrder;
window.rejectOrder = rejectOrder;
window.suspendOrder = suspendOrder;
window.restoreOrder = restoreOrder;
window.deleteOrder = deleteOrder;

// ==================== INVOICE GENERATOR ====================
window.generateInvoiceHTML = function(order, id) {
    var _invLang = document.documentElement.lang || 'ar';
    var _invI18n = {
        dir: _invLang === 'en' ? 'ltr' : 'rtl',
        htmlLang: _invLang,
        orderInvoice: _invLang === 'ar' ? 'فاتورة طلب' : _invLang === 'en' ? 'Order Invoice' : 'Facture de commande',
        invoice: _invLang === 'ar' ? 'فاتورة' : _invLang === 'en' ? 'Invoice' : 'Facture',
        customerData: _invLang === 'ar' ? 'بيانات العميل' : _invLang === 'en' ? 'Customer Data' : 'Données client',
        name: _invLang === 'ar' ? 'الاسم:' : _invLang === 'en' ? 'Name:' : 'Nom:',
        email: _invLang === 'ar' ? 'البريد:' : _invLang === 'en' ? 'Email:' : 'E-mail:',
        phone: _invLang === 'ar' ? 'الهاتف:' : _invLang === 'en' ? 'Phone:' : 'Téléphone:',
        orderData: _invLang === 'ar' ? 'بيانات الطلب' : _invLang === 'en' ? 'Order Data' : 'Données commande',
        paymentMethod: _invLang === 'ar' ? 'طريقة الدفع:' : _invLang === 'en' ? 'Payment Method:' : 'Mode de paiement:',
        orderStatus: _invLang === 'ar' ? 'حالة الطلب:' : _invLang === 'en' ? 'Order Status:' : 'Statut:',
        confirmed: _invLang === 'ar' ? 'مؤكد ✅' : _invLang === 'en' ? 'Confirmed ✅' : 'Confirmé ✅',
        rejected: _invLang === 'ar' ? 'مرفوض ❌' : _invLang === 'en' ? 'Rejected ❌' : 'Rejeté ❌',
        underReview: _invLang === 'ar' ? 'قيد المراجعة ⏳' : _invLang === 'en' ? 'Under Review ⏳' : 'En cours ⏳',
        orderTime: _invLang === 'ar' ? 'وقت الطلب:' : _invLang === 'en' ? 'Order Time:' : 'Heure:',
        description: _invLang === 'ar' ? 'وصف المنتج' : _invLang === 'en' ? 'Description' : 'Description',
        qty: _invLang === 'ar' ? 'الكمية' : _invLang === 'en' ? 'Qty' : 'Qté',
        price: _invLang === 'ar' ? 'السعر' : _invLang === 'en' ? 'Price' : 'Prix',
        total: _invLang === 'ar' ? 'الإجمالي' : _invLang === 'en' ? 'Total' : 'Total',
        digitalProduct: _invLang === 'ar' ? 'منتج رقمي' : _invLang === 'en' ? 'Digital Product' : 'Produit numérique',
        subtotal: _invLang === 'ar' ? 'المجموع الفرعي:' : _invLang === 'en' ? 'Subtotal:' : 'Sous-total:',
        discount: _invLang === 'ar' ? 'الخصم:' : _invLang === 'en' ? 'Discount:' : 'Remise:',
        thankYou: _invLang === 'ar' ? 'شكراً لتسوقك من متجر BRAVO! نحن نقدر ثقتك بنا.' : _invLang === 'en' ? 'Thank you for shopping at BRAVO! We appreciate your trust.' : 'Merci d\'avoir acheté chez BRAVO! Nous apprécions votre confiance.',
        locale: _invLang === 'ar' ? 'ar-EG' : _invLang === 'en' ? 'en-US' : 'fr-FR'
    };

    const d = new Date(order.createdAt || Date.now());
    const dateStr = d.toLocaleDateString(_invI18n.locale);
    const timeStr = d.toLocaleTimeString(_invI18n.locale);

    return `
    <html dir="${_invI18n.dir}" lang="${_invI18n.htmlLang}">
    <head>
        <title>${_invI18n.orderInvoice} #${id}</title>
        <link href="https://fonts.googleapis.com/css2?family=Cairo:wght@400;700;900&display=swap" rel="stylesheet">
        <style>
            body { font-family: 'Cairo', sans-serif; padding: 40px; color: #1a0b2e; background: #f8fafc; }
            .invoice-box { max-width: 800px; margin: auto; padding: 40px; border: 1px solid #e2e8f0; background: #fff; box-shadow: 0 10px 30px rgba(0,0,0,0.05); border-radius: 15px; }
            .header { display: flex; justify-content: space-between; align-items: center; border-bottom: 2px solid #f1f5f9; padding-bottom: 20px; margin-bottom: 30px; }
            .brand { display: flex; align-items: center; gap: 15px; }
            .brand img { width: 60px; height: 60px; }
            .brand h1 { margin: 0; color: #9333ea; font-weight: 900; font-size: 2em; }
            .invoice-details { text-align: left; }
            .invoice-details h2 { margin: 0 0 5px 0; color: #475569; font-size: 1.5em; }
            .info-section { display: flex; justify-content: space-between; margin-bottom: 40px; gap: 20px;}
            .info-box { background: #f8fafc; padding: 20px; border-radius: 10px; flex: 1; border: 1px solid #e2e8f0; }
            .info-box h3 { margin: 0 0 15px 0; color: #9333ea; border-bottom: 1px solid #e2e8f0; padding-bottom: 10px; font-weight: 900;}
            .info-row { display: flex; justify-content: space-between; margin-bottom: 8px; font-weight: 600; font-size: 0.95em;}
            .info-row span:last-child { color: #64748b; font-weight: 700; max-width: 60%; text-align: left;}
            table { width: 100%; border-collapse: collapse; margin-bottom: 30px; }
            th { background: #9333ea; color: white; padding: 15px; text-align: right; border-radius: 8px 8px 0 0; }
            td { padding: 15px; border-bottom: 1px solid #e2e8f0; font-weight: 700; color: #475569; }
            .total-section { display: flex; justify-content: flex-end; }
            .total-box { background: #f8fafc; padding: 20px; border-radius: 10px; width: 320px; border: 1px solid #e2e8f0; }
            .total-row { display: flex; justify-content: space-between; margin-bottom: 10px; font-weight: 700; font-size: 1.1em; }
            .total-row.final { font-size: 1.5em; color: #9333ea; font-weight: 900; border-top: 2px solid #e2e8f0; padding-top: 15px; margin-top: 5px; }
            .footer { text-align: center; margin-top: 50px; padding-top: 20px; border-top: 2px solid #f1f5f9; color: #64748b; font-weight: 600; line-height: 1.6;}
            @media print { body { padding: 0; background: #fff; -webkit-print-color-adjust: exact; print-color-adjust: exact; } .invoice-box { box-shadow: none; border: none; padding: 0; } }
        </style>
    </head>
    <body>
        <div class="invoice-box">
            <div class="header">
                <div class="brand">
                    <img src="https://i.ibb.co/7tKdRmfC/68-1.png" alt="BRAVO">
                    <h1>BRAVO Store</h1>
                </div>
                <div class="invoice-details" dir="ltr">
                    <h2>${_invI18n.invoice}</h2>
                    <div style="color: #64748b; font-weight: 600;">#${id}</div>
                    <div style="color: #64748b; font-weight: 600;">${dateStr}</div>
                </div>
            </div>
            <div class="info-section">
                <div class="info-box">
                    <h3>${_invI18n.customerData}</h3>
                    <div class="info-row"><span>${_invI18n.name}</span> <span>${order.customerName || '-'}</span></div>
                    <div class="info-row"><span>${_invI18n.email}</span> <span>${order.customerEmail || '-'}</span></div>
                    <div class="info-row"><span>${_invI18n.phone}</span> <span dir="ltr">${order.customerPhone || '-'}</span></div>
                </div>
                <div class="info-box">
                    <h3>${_invI18n.orderData}</h3>
                    <div class="info-row"><span>${_invI18n.paymentMethod}</span> <span>${order.paymentMethodName || order.paymentMethod}</span></div>
                    <div class="info-row"><span>${_invI18n.orderStatus}</span> <span style="color: ${order.status === 'confirmed' ? '#10b981' : order.status === 'rejected' ? '#ef4444' : '#f59e0b'}">${order.status === 'confirmed' ? _invI18n.confirmed : order.status === 'rejected' ? _invI18n.rejected : _invI18n.underReview}</span></div>
                    <div class="info-row"><span>${_invI18n.orderTime}</span> <span>${timeStr}</span></div>
                </div>
            </div>
            <table>
                <thead><tr><th>${_invI18n.description}</th><th style="width:100px; text-align:center;">${_invI18n.qty}</th><th style="width:150px; text-align:center;">${_invI18n.price}</th><th style="width:150px; text-align:center;">${_invI18n.total}</th></tr></thead>
                <tbody>${(function(){
                    if (order.items && typeof order.items === 'object') {
                        var keys = Object.keys(order.items).filter(function(k){ return order.items[k] && order.items[k].title; });
                        if (keys.length > 0) {
                            return keys.map(function(k) {
                                var item = order.items[k];
                                var qty = item.quantity || 1;
                                var price = parseFloat(item.price || 0);
                                return '<tr><td>' + (item.title || '') + (item.image ? '<br><img src="' + item.image + '" style="width:50px;height:50px;object-fit:cover;border-radius:8px;margin-top:5px" loading="lazy">' : '') + '</td><td style="text-align:center;">' + qty + '</td><td style="text-align:center;" dir="ltr">' + price + ' ' + order.currency + '</td><td style="text-align:center;" dir="ltr">' + (price * qty) + ' ' + order.currency + '</td></tr>';
                            }).join('');
                        }
                    }
                    return '<tr><td>' + (order.productTitle || _invI18n.digitalProduct) + (order.productImage ? '<br><img src="' + order.productImage + '" style="width:50px;height:50px;object-fit:cover;border-radius:8px;margin-top:5px" loading="lazy">' : '') + '</td><td style="text-align:center;">1</td><td style="text-align:center;" dir="ltr">' + order.price + ' ' + order.currency + '</td><td style="text-align:center;" dir="ltr">' + order.price + ' ' + order.currency + '</td></tr>';
                })()}</tbody>
            </table>
            <div class="total-section">
                <div class="total-box">
                    <div class="total-row"><span>${_invI18n.subtotal}</span> <span dir="ltr">${order.price} ${order.currency}</span></div>
                    <div class="total-row"><span>${_invI18n.discount}</span> <span dir="ltr">0.00 ${order.currency}</span></div>
                    <div class="total-row final"><span>${_invI18n.total}:</span> <span dir="ltr">${order.price} ${order.currency}</span></div>
                </div>
            </div>
            <div class="footer">${_invI18n.thankYou}<br>For support: bravoenergyeg@gmail.com | +20 101 285 3829</div>
        </div>
        <script> window.onload = function() { setTimeout(() => { window.print(); }, 500); } </script>
    </body>
    </html>
    `;
}

window.printOrderInvoice = function(id) {
    var _poiLang = document.documentElement.lang || 'ar';
    var _poiI18n = { orderNotFound: _poiLang === 'ar' ? 'الطلب غير موجود' : _poiLang === 'en' ? 'Order not found' : 'Commande introuvable' };
    const order = window.allOrders.find(([oid, o]) => oid === id)?.[1];
    if (!order) return showToast('❌', _poiI18n.orderNotFound, 'error');

    const printWindow = window.open('', '_blank', 'width=850,height=900');
    printWindow.document.open();
    printWindow.document.write(window.generateInvoiceHTML(order, id));
    printWindow.document.close();
};

window.printCustomerInvoice = function() {
    var _pciLang = document.documentElement.lang || 'ar';
    var _pciI18n = { noInvoiceData: _pciLang === 'ar' ? 'لا يمكن العثور على بيانات الفاتورة حالياً.' : _pciLang === 'en' ? 'Invoice data not available.' : 'Données de facture non disponibles.' };
    let order = null;
    try {
        order = JSON.parse(localStorage.getItem('currentOrder') || sessionStorage.getItem('currentOrder'));
    } catch(e) {}
    
    if (!order) {
        alert(_pciI18n.noInvoiceData);
        return;
    }
    
    const id = order.orderId || order.id || String(Date.now());
    const printWindow = window.open('', '_blank', 'width=850,height=900');
    printWindow.document.open();
    printWindow.document.write(window.generateInvoiceHTML(order, id));
    printWindow.document.close();
};

// ==================== CONFIRM DIALOG ====================
function showConfirmDialog(title, message, confirmText, cancelText) {
    return new Promise((resolve) => {
        const overlay = document.getElementById('customModalOverlay');
        const iconEl = document.getElementById('modalIcon');
        const titleEl = document.getElementById('modalTitle');
        const msgEl = document.getElementById('modalMessage');
        const btnsEl = document.getElementById('modalButtons');

        if (!overlay) { resolve(confirm(message)); return; }

        if (iconEl) iconEl.innerHTML = '<i class="fas fa-exclamation-triangle" style="color:#f59e0b;font-size:3em"></i>';
        if (titleEl) titleEl.textContent = title;
        if (msgEl) { msgEl.textContent = message; msgEl.style.whiteSpace = 'pre-line'; }

        if (btnsEl) {
            btnsEl.innerHTML = '';
            const confirmBtn = document.createElement('button');
            confirmBtn.className = 'custom-modal-btn primary';
            confirmBtn.style.cssText = 'background:linear-gradient(135deg,#ef4444,#dc2626);color:white;border:none;padding:12px 30px;border-radius:12px;cursor:pointer;font-size:1em;font-weight:700;min-width:120px;';
            confirmBtn.textContent = confirmText;
            confirmBtn.addEventListener('click', function () { overlay.classList.remove('active'); resolve(true); });

            const cancelBtn = document.createElement('button');
            cancelBtn.className = 'custom-modal-btn secondary';
            cancelBtn.style.cssText = 'background:var(--card-bg,#1e1e2e);color:var(--text-primary,#fff);border:2px solid var(--border-color,#333);padding:12px 30px;border-radius:12px;cursor:pointer;font-size:1em;font-weight:700;min-width:120px;';
            cancelBtn.textContent = cancelText;
            cancelBtn.addEventListener('click', function () { overlay.classList.remove('active'); resolve(false); });

            btnsEl.appendChild(confirmBtn);
            btnsEl.appendChild(cancelBtn);
        }

        overlay.classList.add('active');
        const outsideClick = function (e) { if (e.target === overlay) { overlay.classList.remove('active'); overlay.removeEventListener('click', outsideClick); resolve(false); } };
        overlay.addEventListener('click', outsideClick);
        const escHandler = function (e) { if (e.key === 'Escape') { overlay.classList.remove('active'); document.removeEventListener('keydown', escHandler); resolve(false); } };
        document.addEventListener('keydown', escHandler);
    });
}

// ==================== DELETE ORDER (FIXED v2) ====================
async function deleteOrder(id, event) {
    const ok = await showConfirmDialog(
        currentLang === 'ar' ? '⚠️ نقل للسلة' : currentLang === 'en' ? '⚠️ Move to Trash' : '⚠️ Déplacer vers la corbeille',
        currentLang === 'ar' ? 'سيتم نقل الطلب إلى سلة المحذوفات لمدة 30 يوم.' : currentLang === 'en' ? 'Order will be moved to trash for 30 days.' : 'La commande sera déplacée vers la corbeille pendant 30 jours.',
        currentLang === 'ar' ? 'نقل للسلة' : currentLang === 'en' ? 'Move to Trash' : 'Déplacer vers la corbeille',
        currentLang === 'ar' ? 'إلغاء' : currentLang === 'en' ? 'Cancel' : 'Annuler'
    );
    if (ok) {
        if (event && event.target) {
            const tr = event.target.closest('tr');
            if (tr) tr.remove();
        } else {
            try {
                const tr = document.querySelector(`button[data-id="${String(id).replace(/"/g, '\\"')}"]`)?.closest('tr');
                if (tr) tr.remove();
            } catch(e) {}
        }
        
        if (window.allOrders) {
            const orderData = window.allOrders.find(([oid, _]) => oid === id);
            if (orderData) {
                if(!window.localTrashData) window.localTrashData = { products: {}, orders: {}, pages: {} };
                window.localTrashData.orders[id] = { ...orderData[1], status: 'trashed', deletedAt: Date.now() };
                updateLocalTrashStorage(); // Persist changes
            }
            
            window.allOrders = window.allOrders.filter(([oid, _]) => oid !== id);
            const pending = window.allOrders.filter(([_, o]) => o.status === 'pending').length;
            const confirmed = window.allOrders.filter(([_, o]) => o.status === 'confirmed').length;
            const totalEl = document.getElementById('totalOrders'); if (totalEl) totalEl.textContent = window.allOrders.length;
            const pendingEl = document.getElementById('pendingOrders'); if (pendingEl) pendingEl.textContent = pending;
            const confirmedEl = document.getElementById('confirmedOrders'); if (confirmedEl) confirmedEl.textContent = confirmed;
            const badge = document.getElementById('ordersCount'); if (badge) badge.textContent = pending;
            
            const tbody = document.getElementById('ordersContainer');
            if (tbody && tbody.children.length === 0) renderOrders([]);
        }
        
        _addHidden('orders', id);
        try { 
            await DB.update(`orders/${id}`, { status: 'trashed', deletedAt: Date.now() }); 
            showToast(currentLang === 'ar' ? '✅ تم النقل للسلة' : '✅ Moved to trash', currentLang === 'ar' ? 'تم نقل الطلب' : currentLang === 'en' ? 'Order moved' : 'Commande déplacée', 'success');
        } catch(e) { 
            console.warn('Firebase update failed, keeping local trashed status:', e); 
            showToast('✅', currentLang === 'ar' ? 'تم الحذف محلياً' : currentLang === 'en' ? 'Deleted locally' : 'Supprimé localement', 'success');
        }
        updateLocalTrashStorage();
        if(window.renderTrash) window.renderTrash();
    }
}
window.deleteOrder = deleteOrder;

// ==================== DELETE PRODUCT (FIXED v3) ====================
async function deleteProduct(id, event) {
    const ok = await showConfirmDialog(
        currentLang === 'ar' ? '⚠️ نقل للسلة' : currentLang === 'en' ? '⚠️ Move to Trash' : '⚠️ Déplacer vers la corbeille',
        currentLang === 'ar' ? 'سيتم نقل المنتج إلى سلة المحذوفات لمدة 30 يوم.' : currentLang === 'en' ? 'Product will be moved to trash for 30 days.' : 'Le produit sera déplacé vers la corbeille pendant 30 jours.',
        currentLang === 'ar' ? 'نقل للسلة' : currentLang === 'en' ? 'Move to Trash' : 'Déplacer vers la corbeille',
        currentLang === 'ar' ? 'إلغاء' : currentLang === 'en' ? 'Cancel' : 'Annuler'
    );
    if (ok) {
        if (event && event.target) {
            const tr = event.target.closest('tr');
            if (tr) tr.remove();
        } else {
            try {
                const tr = document.querySelector(`button[data-id="${String(id).replace(/"/g, '\\"')}"]`)?.closest('tr');
                if (tr) tr.remove();
            } catch(e) {}
        }

        const tbody = document.getElementById('productsContainer'); 
        // Check if tbody exists and has children before trying to remove
        if (tbody && tbody.children.length === 0) { 
            const table = tbody.closest('.admin-table');
            const staticEmpty = document.getElementById('productsEmptyState');
            if(table) table.style.display = 'none';
            if(staticEmpty) {
                staticEmpty.style.display = 'block';
                staticEmpty.innerHTML = `<i class="fas fa-box-open" style="font-size: 4em; color: var(--primary); margin-bottom: 15px; display:inline-block;"></i><h3 style="font-size: 1.5em; font-weight: 900; color: var(--text-primary); margin-bottom: 10px;">${document.documentElement.lang === 'ar' ? 'لا توجد منتجات الآن' : document.documentElement.lang === 'en' ? 'No products available' : 'Aucun produit disponible'}</h3>`;
            }
        }

        // Explicitly fetch the product data to ensure it's complete before trashing
        let prodDataToTrash = await DB.get(`products/${id}`);
        if (!prodDataToTrash) {
            // Fallback if DB.get fails (e.g., product already removed from main view)
            prodDataToTrash = window.allProducts?.find(p => String(p.id) === String(id)) || 
                              window.adminProductsList?.find(p => String(p.id) === String(id) || String(p[0]) === String(id))?.[1] || 
                              { id: id, title: 'منتج محذوف', category: 'all', description: '', priceEGP: 0, priceUSD: 0 };
        }
        
        if(!window.localTrashData) window.localTrashData = { products: {}, orders: {}, pages: {} };
        window.localTrashData.products[id] = { ...prodDataToTrash, status: 'trashed', deletedAt: Date.now() };

        // Update local array for offline testing
        if(window.allProducts) {
             const index = window.allProducts.findIndex(p => String(p.id) === String(id));
             if(index > -1) {
                  window.allProducts[index].status = 'trashed';
                  window.allProducts[index].deletedAt = Date.now();
             }
        }
        
        if (window.adminProductsList) {
             window.adminProductsList = window.adminProductsList.filter(p => String(p.id) !== String(id) && String(p[0]) !== String(id));
        }
        
        const tp = document.getElementById('totalProducts');
        if (tp) {
             tp.textContent = (window.adminProductsList || window.allProducts || []).filter(p => p.status !== 'trashed').length;
        }

        updateLocalTrashStorage(); // Persist changes
        _addHidden('products', id);
        try { 
            await DB.update(`products/${id}`, { status: 'trashed', deletedAt: Date.now() }); 
            showToast('✅', currentLang === 'ar' ? 'تم النقل للسلة' : currentLang === 'en' ? 'Moved to trash' : 'Déplacé vers la corbeille', 'success');
        } catch(e) {
            console.warn('Firebase update failed, keeping local trashed status:', e);
            showToast('✅', currentLang === 'ar' ? 'تم الحذف محلياً' : currentLang === 'en' ? 'Deleted locally' : 'Supprimé localement', 'success');
        }
        updateLocalTrashStorage();
        if(window.renderTrash) window.renderTrash();
    }
}
window.deleteProduct = deleteProduct;

async function deleteAllProducts() {
    const ok = await showConfirmDialog(
        currentLang === 'ar' ? '⚠️ حذف جميع المنتجات' : currentLang === 'en' ? '⚠️ Delete All Products' : '⚠️ Supprimer tous les produits',
        currentLang === 'ar' ? 'سيتم نقل جميع المنتجات إلى سلة المهملات لمدة 30 يوم.' : currentLang === 'en' ? 'All products will be moved to trash for 30 days.' : 'Tous les produits seront déplacés vers la corbeille pendant 30 jours.',
        currentLang === 'ar' ? 'حذف الكل' : currentLang === 'en' ? 'Delete All' : 'Tout supprimer',
        currentLang === 'ar' ? 'إلغاء' : currentLang === 'en' ? 'Cancel' : 'Annuler'
    );
    if (!ok) return;
    const prods = window.adminProductsList || [];
    if (prods.length === 0) { showToast('ℹ️', currentLang === 'ar' ? 'لا توجد منتجات للحذف' : currentLang === 'en' ? 'No products to delete' : 'Aucun produit à supprimer', 'info'); return; }
    for (const [id, p] of prods) {
        if (!window.localTrashData) window.localTrashData = { products: {}, orders: {}, pages: {} };
        window.localTrashData.products[id] = { ...p, status: 'trashed', deletedAt: Date.now() };
        _addHidden('products', id);
        try { await DB.update(`products/${id}`, { status: 'trashed', deletedAt: Date.now() }); } catch(e) {}
    }
    updateLocalTrashStorage();
    loadAdminProducts();
    if (window.renderTrash) window.renderTrash();
    showToast('✅', currentLang === 'ar' ? 'تم حذف جميع المنتجات' : currentLang === 'en' ? 'All products deleted' : 'Tous les produits supprimés', 'success');
}
window.deleteAllProducts = deleteAllProducts;

async function deleteAllOrders() {
    const ok = await showConfirmDialog(
        currentLang === 'ar' ? '⚠️ حذف جميع الطلبات' : currentLang === 'en' ? '⚠️ Delete All Orders' : '⚠️ Supprimer toutes les commandes',
        currentLang === 'ar' ? 'سيتم نقل جميع الطلبات إلى سلة المهملات لمدة 30 يوم.' : currentLang === 'en' ? 'All orders will be moved to trash for 30 days.' : 'Toutes les commandes seront déplacées vers la corbeille pendant 30 jours.',
        currentLang === 'ar' ? 'حذف الكل' : currentLang === 'en' ? 'Delete All' : 'Tout supprimer',
        currentLang === 'ar' ? 'إلغاء' : currentLang === 'en' ? 'Cancel' : 'Annuler'
    );
    if (!ok) return;
    const ords = window.allOrders || [];
    if (ords.length === 0) { showToast('ℹ️', currentLang === 'ar' ? 'لا توجد طلبات للحذف' : currentLang === 'en' ? 'No orders to delete' : 'Aucune commande à supprimer', 'info'); return; }
    for (const [id, o] of ords) {
        if (!window.localTrashData) window.localTrashData = { products: {}, orders: {}, pages: {} };
        window.localTrashData.orders[id] = { ...o, status: 'trashed', deletedAt: Date.now() };
        _addHidden('orders', id);
        try { await DB.update(`orders/${id}`, { status: 'trashed', deletedAt: Date.now() }); } catch(e) {}
    }
    window.allOrders = [];
    updateLocalTrashStorage();
    loadAdminOrders();
    if (window.renderTrash) window.renderTrash();
    showToast('✅', currentLang === 'ar' ? 'تم حذف جميع الطلبات' : currentLang === 'en' ? 'All orders deleted' : 'Toutes les commandes supprimées', 'success');
}
window.deleteAllOrders = deleteAllOrders;

function switchTab(tab) { 
    document.querySelectorAll('.tab').forEach(t => t.classList.remove('active')); 
    document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active')); 
    document.querySelectorAll('.tab-link').forEach(function(l) {
        l.classList.remove('active');
    });
    var sidebarBtn = document.querySelector('.sidebar-menu button[data-tab="' + tab + '"]');
    if (sidebarBtn) sidebarBtn.classList.add('active');
    var navLink = document.querySelector('.nav-menu .tab-link[data-tab="' + tab + '"]');
    if (navLink) navLink.classList.add('active');
    var tc = document.getElementById(tab + 'Tab'); 
    if (tc) tc.classList.add('active'); 
    try { localStorage.setItem('adminActiveTab', tab); } catch(e) {}
}
window.switchTab = switchTab;

// ==================== CUSTOMERS MANAGEMENT ====================
window._allCustomers = [];
window._customersFilter = 'all';
window._customersSearch = '';

window.loadAdminCustomers = async function() {
    try {
        const usersData = await DB.get('users');
        const customers = [];
        const seenUids = new Set();
        if (usersData && typeof usersData === 'object') {
            for (const [uid, u] of Object.entries(usersData)) {
                if (u && typeof u === 'object') {
                    seenUids.add(uid);
                    customers.push({
                        uid: uid,
                        name: u.name || u.displayName || '',
                        email: u.email || '',
                        phone: u.phone || u.phoneNumber || '',
                        avatar: u.avatar || u.photoURL || '',
                        country: u.country || '',
                        ip: u.ip || u.lastIP || '',
                        createdAt: u.createdAt || 0,
                        orderCount: 0
                    });
                }
            }
        }
        // Also extract guest customers from orders (who may not be in users/)
        try {
            const ordersData = await DB.get('orders');
            if (ordersData && typeof ordersData === 'object') {
                for (const [, o] of Object.entries(ordersData)) {
                    if (!o || o.status === 'trashed') continue;
                    var oName = o.customerName || '';
                    var oEmail = o.customerEmail || '';
                    var oPhone = o.customerPhone || '';
                    var oUid = o.userId || o.customerUid || '';
                    if (!oName && !oEmail && !oPhone && !oUid) continue;
                    // Try to match existing user by uid, email, phone, or name
                    var matched = null;
                    if (oUid) {
                        matched = customers.find(c => c.uid === oUid);
                    }
                    if (!matched && oEmail) {
                        matched = customers.find(c => c.email && c.email.toLowerCase() === oEmail.toLowerCase());
                    }
                    if (!matched && oPhone) {
                        matched = customers.find(c => c.phone && c.phone === oPhone);
                    }
                    if (!matched && oName) {
                        matched = customers.find(c => c.name && c.name === oName);
                    }
                    if (matched) {
                        // Merge: update missing fields from order data
                        if (!matched.name && oName) matched.name = oName;
                        if (!matched.email && oEmail) matched.email = oEmail;
                        if (!matched.phone && oPhone) matched.phone = oPhone;
                        if (!matched.avatar && (o.customerAvatar || '')) matched.avatar = o.customerAvatar;
                        if (!matched.ip && (o.ip || o.customerIP || '')) matched.ip = o.ip || o.customerIP;
                        if (!matched.country && (o.country || o.userCountry || '')) matched.country = o.country || o.userCountry;
                        if (oUid && oUid !== matched.uid && !seenUids.has(oUid)) { seenUids.add(oUid); }
                        var oDate = o.orderDate || o.createdAt || 0;
                        if (oDate > (matched.createdAt || 0)) matched.createdAt = oDate;
                    } else {
                        // New guest customer
                        var guestUid = oUid || ('guest_' + (oEmail || oPhone || oName).replace(/[^a-zA-Z0-9]/g, '_'));
                        seenUids.add(guestUid);
                        customers.push({
                            uid: guestUid,
                            name: oName,
                            email: oEmail,
                            phone: oPhone,
                            createdAt: o.orderDate || o.createdAt || 0,
                            country: o.country || o.userCountry || '',
                            ip: o.ip || o.customerIP || '',
                            avatar: o.customerAvatar || '',
                            orderCount: 0
                        });
                    }
                }
            }
        } catch(e) { console.warn('Error extracting guests from orders:', e); }
        window._allCustomers = customers;
        const countEl = document.getElementById('sidebarCustomersCount');
        if (countEl) countEl.textContent = customers.length;
        window.applyCustomersFilter();
    } catch(e) {
        console.error('loadAdminCustomers error:', e);
        window._allCustomers = [];
        window.applyCustomersFilter();
    }
};

window.applyCustomersFilter = async function() {
    let filtered = [...window._allCustomers];
    const search = window._customersSearch.toLowerCase().trim();

    // Fetch order counts per customer
    try {
        const ordersData = await DB.get('orders');
        const orderCounts = {};
        const orderEmails = {};
        const orderPhones = {};
        if (ordersData && typeof ordersData === 'object') {
            for (const [, o] of Object.entries(ordersData)) {
                if (o && o.userId) {
                    orderCounts[o.userId] = (orderCounts[o.userId] || 0) + 1;
                }
                if (o && o.customerEmail) {
                    orderEmails[o.customerEmail.toLowerCase()] = (orderEmails[o.customerEmail.toLowerCase()] || 0) + 1;
                }
                if (o && o.customerPhone) {
                    orderPhones[o.customerPhone] = (orderPhones[o.customerPhone] || 0) + 1;
                }
            }
        }
        filtered.forEach(c => {
            c.orderCount = orderCounts[c.uid] || 0;
            if (!c.orderCount && c.email) c.orderCount = orderEmails[c.email.toLowerCase()] || 0;
            if (!c.orderCount && c.phone) c.orderCount = orderPhones[c.phone] || 0;
        });
    } catch(e) {}

    // Filter by status
    if (window._customersFilter === 'withOrders') {
        filtered = filtered.filter(c => c.orderCount > 0);
    } else if (window._customersFilter === 'noOrders') {
        filtered = filtered.filter(c => c.orderCount === 0);
    }

    // Search
    if (search) {
        filtered = filtered.filter(c => {
            const all = [c.name, c.email, c.phone, c.country].join(' ').toLowerCase();
            return search.split(/\s+/).every(t => all.includes(t));
        });
    }

    // Sort
    const sort = (document.getElementById('customersAdvSort') || {}).value || 'default';
    switch(sort) {
        case 'name_asc': filtered.sort((a,b) => (a.name||'').localeCompare(b.name||'', 'ar')); break;
        case 'name_desc': filtered.sort((a,b) => (b.name||'').localeCompare(a.name||'', 'ar')); break;
        case 'date_asc': filtered.sort((a,b) => (a.createdAt||0) - (b.createdAt||0)); break;
        case 'date_desc': filtered.sort((a,b) => (b.createdAt||0) - (a.createdAt||0)); break;
        default: filtered.sort((a,b) => (b.createdAt||0) - (a.createdAt||0)); break;
    }

    // Update filter counts
    const total = window._allCustomers.length;
    const withOrders = window._allCustomers.filter(c => c.orderCount > 0).length;
    const noOrders = total - withOrders;
    const elAll = document.getElementById('customersCountAll');
    const elAll2 = document.getElementById('custCountAll');
    const elWO = document.getElementById('custCountWithOrders');
    const elNO = document.getElementById('custCountNoOrders');
    if (elAll) elAll.textContent = filtered.length;
    if (elAll2) elAll2.textContent = total;
    if (elWO) elWO.textContent = withOrders;
    if (elNO) elNO.textContent = noOrders;

    window._renderCustomersTable(filtered);
};

window._renderCustomersTable = function(customers) {
    const container = document.getElementById('customersContainer');
    const emptyState = document.getElementById('customersEmptyState');
    const tableWrap = container?.closest('.admin-table-container');
    if (!container) return;

    if (customers.length === 0) {
        container.innerHTML = '';
        if (tableWrap) tableWrap.style.display = 'none';
        if (emptyState) emptyState.style.display = '';
        return;
    }
    if (tableWrap) tableWrap.style.display = '';
    if (emptyState) emptyState.style.display = 'none';

    const lang = currentLang || 'ar';
    var _rctI18n = {
        locale: lang === 'ar' ? 'ar-EG' : lang === 'en' ? 'en-US' : 'fr-FR',
        order: lang === 'ar' ? 'طلب' : lang === 'en' ? 'order' : 'commande',
        notSpecified: lang === 'ar' ? 'غير محدد' : lang === 'en' ? 'N/A' : 'N/A',
        viewDetails: lang === 'ar' ? 'عرض التفاصيل' : lang === 'en' ? 'View Details' : 'Voir détails',
        deleteCustomer: lang === 'ar' ? 'حذف العميل' : lang === 'en' ? 'Delete Customer' : 'Supprimer'
    };
    const rows = customers.map((c, i) => {
        const dt = c.createdAt ? new Date(c.createdAt) : null;
        const dateStr = dt && !isNaN(dt.getTime()) ? dt.toLocaleDateString(_rctI18n.locale, { year:'numeric', month:'short', day:'numeric' }) : '—';
        const emailMasked = c.email ? c.email.replace(/(.{2})(.*)(@.*)/, '$1***$3') : '—';
        const phoneDisplay = c.phone || '—';
        const countryDisplay = c.country || '';
    const countryFlag = countryDisplay ? '<img src="https://cdn.jsdelivr.net/gh/lipis/flag-icons@7.0.0/flags/4x3/' + countryDisplay.toLowerCase() + '.svg" style="width:20px;height:15px;border-radius:3px;object-fit:cover;vertical-align:middle;margin-inline-end:4px;" onerror="this.style.display=\'none\'">' : '';
    const countryFinal = countryDisplay ? countryFlag + countryDisplay.toUpperCase() : '—';
        const ipDisplay = c.ip || '—';
        const nameInitial = (c.name || '?').charAt(0).toUpperCase();
        const avatarHtml = c.avatar
            ? '<img src="' + c.avatar + '" style="width:40px;height:40px;border-radius:50%;object-fit:cover;border:2px solid rgba(147,51,234,0.3);flex-shrink:0;" onerror="this.style.display=\'none\';this.nextElementSibling.style.display=\'flex\';"><div style="width:40px;height:40px;border-radius:50%;background:linear-gradient(135deg,#9333ea,#ec4899);display:none;align-items:center;justify-content:center;color:#fff;font-weight:900;font-size:1.1em;flex-shrink:0;">' + nameInitial + '</div>'
            : '<div style="width:40px;height:40px;border-radius:50%;background:linear-gradient(135deg,#9333ea,#ec4899);display:flex;align-items:center;justify-content:center;color:#fff;font-weight:900;font-size:1.1em;flex-shrink:0;">' + nameInitial + '</div>';
        const orderBadge = c.orderCount > 0
            ? `<span style="background:linear-gradient(135deg,#10b981,#059669);color:#fff;padding:4px 12px;border-radius:20px;font-weight:900;font-size:0.85em;">${c.orderCount} ${_rctI18n.order}</span>`
            : `<span style="background:rgba(100,100,100,0.2);color:#fff;padding:4px 12px;border-radius:20px;font-weight:900;font-size:0.85em;">0</span>`;

        return `
        <tr style="border-bottom:1px solid var(--border-color);transition:background 0.2s;" onmouseover="this.style.background='rgba(147,51,234,0.05)'" onmouseout="this.style.background=''">
            <td style="text-align:center;font-weight:900;color:#fff;width:50px;">${i + 1}</td>
            <td style="text-align:center;">
                <div style="display:flex;align-items:center;justify-content:center;">${avatarHtml}</div>
            </td>
            <td style="text-align:center;">
                <div style="display:flex;align-items:center;gap:8px;justify-content:center;">
                    <i class="fas fa-user" style="color:var(--primary);font-size:0.85em;"></i>
                    <span style="font-weight:900;color:#fff;">${c.name || _rctI18n.notSpecified}</span>
                </div>
            </td>
            <td style="text-align:center;">
                <div style="display:flex;align-items:center;gap:8px;justify-content:center;">
                    <i class="fas fa-envelope" style="color:var(--primary);font-size:0.85em;"></i>
                    <span style="font-weight:800;color:#fff;font-size:0.9em;" title="${c.email || ''}">${emailMasked}</span>
                </div>
            </td>
            <td style="text-align:center;">
                <div style="display:flex;align-items:center;gap:8px;justify-content:center;">
                    <i class="fas fa-phone" style="color:#10b981;font-size:0.85em;"></i>
                    <span style="font-weight:800;color:#fff;font-size:0.9em;direction:ltr;">${phoneDisplay}</span>
                </div>
            </td>
            <td style="text-align:center;">
                <div style="display:flex;align-items:center;gap:8px;justify-content:center;">
                    <i class="fas fa-globe" style="color:#f59e0b;font-size:0.85em;"></i>
                    <span style="font-weight:800;color:#fff;font-size:0.9em;">${countryFinal}</span>
                </div>
            </td>
            <td style="text-align:center;">
                <div style="display:flex;align-items:center;gap:8px;justify-content:center;">
                    <i class="fas fa-network-wired" style="color:#6366f1;font-size:0.85em;"></i>
                    <span style="font-weight:800;color:#fff;font-size:0.9em;direction:ltr;font-family:monospace;">${ipDisplay}</span>
                </div>
            </td>
            <td style="text-align:center;">${orderBadge}</td>
            <td style="text-align:center;">
                <span style="color:#fff;font-size:0.85em;font-weight:900;">${dateStr}</span>
            </td>
            <td style="text-align:center;">
                <div style="display:flex;gap:8px;justify-content:center;">
                    <button class="action-btn-sm view" onclick="viewCustomerDetails('${c.uid}')" title="${_rctI18n.viewDetails}">
                        <i class="fas fa-eye"></i>
                    </button>
                    <button class="action-btn-sm delete" onclick="deleteCustomer('${c.uid}', '${(c.name || '').replace(/'/g, "\\'")}')" title="${_rctI18n.deleteCustomer}">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </td>
        </tr>`;
    });
    container.innerHTML = rows.join('');
};

window.adminCustomersSearch = function() {
    const inp = document.getElementById('adminCustomersSearch');
    window._customersSearch = inp ? inp.value : '';
    window.applyCustomersFilter();
};

window.filterCustomers = function(filter, event) {
    window._customersFilter = filter;
    document.querySelectorAll('#customersTab .filter-btn').forEach(b => b.classList.remove('active'));
    if (event && event.target) event.target.closest('.filter-btn').classList.add('active');
    window.applyCustomersFilter();
};

window.resetCustomersFilters = function() {
    window._customersSearch = '';
    window._customersFilter = 'all';
    const inp = document.getElementById('adminCustomersSearch');
    if (inp) inp.value = '';
    const sel = document.getElementById('customersAdvSort');
    if (sel) sel.value = 'default';
    document.querySelectorAll('#customersTab .filter-btn').forEach(b => b.classList.remove('active'));
    const allBtn = document.getElementById('custFilterAll');
    if (allBtn) allBtn.classList.add('active');
    window.applyCustomersFilter();
};

window.viewCustomerDetails = async function(uid) {
    var _vcdLang = document.documentElement.lang || 'ar';
    var _vcdI18n = {
        customerNotFound: _vcdLang === 'ar' ? 'لم يتم العثور على بيانات العميل' : _vcdLang === 'en' ? 'Customer not found' : 'Client introuvable',
        guestUser: _vcdLang === 'ar' ? 'عميل ضيف' : _vcdLang === 'en' ? 'Guest Customer' : 'Client invité',
        notSpecified: _vcdLang === 'ar' ? 'غير محدد' : _vcdLang === 'en' ? 'N/A' : 'N/A',
        name: _vcdLang === 'ar' ? 'الاسم:' : _vcdLang === 'en' ? 'Name:' : 'Nom:',
        email: _vcdLang === 'ar' ? 'البريد:' : _vcdLang === 'en' ? 'Email:' : 'E-mail:',
        phone: _vcdLang === 'ar' ? 'الهاتف:' : _vcdLang === 'en' ? 'Phone:' : 'Téléphone:',
        country: _vcdLang === 'ar' ? 'الدولة:' : _vcdLang === 'en' ? 'Country:' : 'Pays:',
        ip: _vcdLang === 'ar' ? 'عنوان IP:' : _vcdLang === 'en' ? 'IP Address:' : 'Adresse IP:',
        registered: _vcdLang === 'ar' ? 'التسجيل:' : _vcdLang === 'en' ? 'Registered:' : 'Inscrit le:',
        orders: _vcdLang === 'ar' ? 'الطلبات' : _vcdLang === 'en' ? 'Orders' : 'Commandes',
        order: _vcdLang === 'ar' ? 'طلب' : _vcdLang === 'en' ? 'order' : 'commande',
        confirmedTotal: _vcdLang === 'ar' ? 'إجمالي المؤكد:' : _vcdLang === 'en' ? 'Confirmed total:' : 'Total confirmé:',
        note: _vcdLang === 'ar' ? 'ملاحظة:' : _vcdLang === 'en' ? 'Note:' : 'Note:',
        passwordNote: _vcdLang === 'ar' ? 'كلمات المرور مخزنة بشكل مشفر في Firebase Auth ولا يمكن عرضها.' : _vcdLang === 'en' ? 'Passwords are encrypted in Firebase Auth and cannot be displayed.' : 'Les mots de passe sont chiffrés dans Firebase Auth et ne peuvent pas être affichés.',
        close: _vcdLang === 'ar' ? 'إغلاق' : _vcdLang === 'en' ? 'Close' : 'Fermer',
        errorLoading: _vcdLang === 'ar' ? 'حدث خطأ أثناء تحميل البيانات' : _vcdLang === 'en' ? 'Error loading data' : 'Erreur lors du chargement',
        pending: _vcdLang === 'ar' ? 'قيد الانتظار' : _vcdLang === 'en' ? 'Pending' : 'En attente',
        confirmed: _vcdLang === 'ar' ? 'مؤكد' : _vcdLang === 'en' ? 'Confirmed' : 'Confirmé',
        rejected: _vcdLang === 'ar' ? 'مرفوض' : _vcdLang === 'en' ? 'Rejected' : 'Rejeté',
        suspended: _vcdLang === 'ar' ? 'معلق' : _vcdLang === 'en' ? 'Suspended' : 'Suspendu',
        guestLabel: _vcdLang === 'ar' ? 'ضيف (غير مسجل)' : _vcdLang === 'en' ? 'Guest (unregistered)' : 'Invité (non inscrit)',
        locale: _vcdLang === 'ar' ? 'ar-EG' : _vcdLang === 'en' ? 'en-US' : 'fr-FR'
    };
    try {
        let uData = await DB.get('users/' + uid);
        let userOrders = [];
        const ordersData = await DB.get('orders');
        const matchedCustomer = (window._allCustomers || []).find(c => c.uid === uid);
        const emailForMatch = (matchedCustomer?.email || uData?.email || '').toLowerCase();
        const phoneForMatch = matchedCustomer?.phone || uData?.phone || '';
        if (ordersData && typeof ordersData === 'object') {
            for (const [oid, o] of Object.entries(ordersData)) {
                if (!o) continue;
                if (o.userId === uid) {
                    userOrders.push({ id: oid, ...o });
                } else if (emailForMatch && o.customerEmail && o.customerEmail.toLowerCase() === emailForMatch) {
                    userOrders.push({ id: oid, ...o });
                } else if (phoneForMatch && o.customerPhone && o.customerPhone === phoneForMatch) {
                    userOrders.push({ id: oid, ...o });
                }
            }
        }
        if (!uData) {
            if (matchedCustomer) {
                uData = { name: matchedCustomer.name, email: matchedCustomer.email, phone: matchedCustomer.phone, country: matchedCustomer.country, ip: matchedCustomer.ip, avatar: matchedCustomer.avatar, createdAt: matchedCustomer.createdAt };
            }
        }
        if (!uData) { showToast('❌', _vcdI18n.customerNotFound, 'error'); return; }
        if (!uData.name && matchedCustomer?.name) uData.name = matchedCustomer.name;
        if (!uData.name && userOrders.length > 0) {
            for (const o of userOrders) { if (o.customerName) { uData.name = o.customerName; break; } }
        }
        if (!uData.name && uData.email) uData.name = uData.email.split('@')[0];
        if (userOrders.length > 0 && (!uData.country || !uData.ip)) {
            for (const o of userOrders) {
                if (!uData.country && (o.userCountry || o.country)) uData.country = o.userCountry || o.country;
                if (!uData.ip && (o.ip || o.customerIP)) uData.ip = o.ip || o.customerIP;
            }
        }
        const dt = uData.createdAt ? new Date(uData.createdAt) : null;
        const dateStr = dt && !isNaN(dt.getTime()) ? dt.toLocaleDateString(_vcdI18n.locale, { year:'numeric', month:'long', day:'numeric', hour:'2-digit', minute:'2-digit' }) : '—';
        const confirmedTotal = userOrders.filter(o => o.status === 'confirmed').reduce((s, o) => s + parseFloat(o.price || 0), 0);

        let ordersHtml = '';
        if (userOrders.length > 0) {
            ordersHtml = '<div style="margin-top:20px;padding:16px;background:rgba(147,51,234,0.05);border-radius:14px;border:1px solid rgba(147,51,234,0.2);">' +
                '<h4 style="margin:0 0 12px 0;font-weight:900;color:var(--primary);display:flex;align-items:center;gap:8px;"><i class="fas fa-shopping-cart"></i> ' + _vcdI18n.orders + ' (' + userOrders.length + ')</h4>' +
                '<div style="display:flex;flex-direction:column;gap:8px;">';
            userOrders.forEach(o => {
                const statusColors = { pending: '#f59e0b', confirmed: '#10b981', rejected: '#ef4444', suspended: '#8b5cf6' };
                const statusLabels = { pending: _vcdI18n.pending, confirmed: _vcdI18n.confirmed, rejected: _vcdI18n.rejected, suspended: _vcdI18n.suspended };
                const sc = statusColors[o.status] || '#666';
                const sl = statusLabels[o.status] || o.status;
                const items = o.items && typeof o.items === 'object' ? Object.values(o.items).map(it => it.title).join(', ') : (o.productTitle || '—');
                ordersHtml += '<div style="padding:10px 14px;background:var(--card-bg);border-radius:10px;border:1px solid var(--border-color);display:flex;align-items:center;gap:12px;justify-content:space-between;flex-wrap:wrap;">' +
                    '<span style="font-weight:800;font-size:0.85em;color:var(--text-secondary);">#' + String(o.id).slice(-8).toUpperCase() + '</span>' +
                    '<span style="flex:1;font-weight:600;color:var(--text-primary);font-size:0.9em;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;max-width:200px;">' + items + '</span>' +
                    '<span style="font-weight:800;color:var(--text-primary);">' + (o.price || 0) + ' ' + (o.currency || 'EGP') + '</span>' +
                    '<span style="padding:3px 10px;border-radius:12px;font-weight:800;font-size:0.75em;background:' + sc + '22;color:' + sc + ';border:1px solid ' + sc + '44;">' + sl + '</span>' +
                    '</div>';
            });
            ordersHtml += '</div></div>';
        }

        const nameInitial = (uData.name || '?').charAt(0).toUpperCase();
        const avatarSrc = uData.avatar || uData.photoURL || '';
        const iconHtml = avatarSrc
            ? '<img src="' + avatarSrc + '" style="width:70px;height:70px;border-radius:50%;object-fit:cover;border:3px solid rgba(147,51,234,0.3);" onerror="this.outerHTML=\'<div style=&quot;width:70px;height:70px;border-radius:50%;background:linear-gradient(135deg,#9333ea,#ec4899);display:flex;align-items:center;justify-content:center;color:#fff;font-weight:900;font-size:2em;margin:0 auto;&quot;>' + nameInitial + '</div>\'">'
            : '<div style="width:70px;height:70px;border-radius:50%;background:linear-gradient(135deg,#9333ea,#ec4899);display:flex;align-items:center;justify-content:center;color:#fff;font-weight:900;font-size:2em;margin:0 auto;">' + nameInitial + '</div>';

        const modal = document.getElementById('customModalOverlay');
        const icon = document.getElementById('modalIcon');
        const title = document.getElementById('modalTitle');
        const msg = document.getElementById('modalMessage');
        const btns = document.getElementById('modalButtons');

        icon.innerHTML = '';
        icon.style.display = 'none';
        title.innerHTML = '<div style="display:flex;align-items:center;gap:12px;">' + iconHtml + '<span style="color:var(--text-primary);font-size:1.15em;">' + (uData.name || _vcdI18n.guestUser) + '</span></div>';
        const _cc = (uData.country || '').toUpperCase();
        const _flagHtml = _cc ? '<img src="https://cdn.jsdelivr.net/gh/lipis/flag-icons@7.0.0/flags/4x3/' + _cc.toLowerCase() + '.svg" style="width:22px;height:16px;border-radius:3px;object-fit:cover;" onerror="this.style.display=\'none\'">' : '';
        const _nameVal = uData.name || '—';
        const _emailVal = uData.email || '—';
        const _phoneVal = uData.phone || '—';
        const _countryVal = _cc ? _flagHtml + '  ' + _cc : '—';
        const _ipVal = uData.ip || '—';
        const _dateVal = dateStr;

        function _detailRow(icon, iconColor, label, value) {
            return '<div style="display:flex;align-items:center;gap:10px;padding:8px 12px;background:var(--card-bg);border-radius:8px;border:1px solid var(--border-color);">' +
                '<div style="width:28px;height:28px;border-radius:8px;background:' + iconColor + '15;display:flex;align-items:center;justify-content:center;flex-shrink:0;"><i class="fas ' + icon + '" style="color:' + iconColor + ';font-size:0.75em;"></i></div>' +
                '<div style="flex:1;min-width:0;">' +
                    '<div style="font-size:0.68em;font-weight:700;color:var(--text-secondary);text-transform:uppercase;letter-spacing:0.5px;margin-bottom:1px;">' + label + '</div>' +
                    '<div style="font-weight:900;font-size:0.88em;color:#fff;word-break:break-word;direction:ltr;text-align:start;">' + value + '</div>' +
                '</div></div>';
        }

        msg.innerHTML = `
        <div style="text-align:start;font-size:0.9em;color:var(--text-secondary);direction:rtl;max-height:60vh;overflow-y:auto;padding:2px;">
            <div style="display:flex;flex-direction:column;gap:6px;">
                ${_detailRow('fa-user', '#9333ea', _vcdI18n.name, _nameVal)}
                ${_detailRow('fa-envelope', '#9333ea', _vcdI18n.email, '<span style="word-break:break-all;">' + _emailVal + '</span>')}
                ${_detailRow('fa-phone', '#9333ea', _vcdI18n.phone, _phoneVal)}
                ${_detailRow('fa-globe', '#f59e0b', _vcdI18n.country, '<span style="display:inline-flex;align-items:center;gap:6px;">' + _countryVal + '</span>')}
                ${_detailRow('fa-network-wired', '#6366f1', _vcdI18n.ip, '<span style="font-family:monospace;">' + _ipVal + '</span>')}
                ${_detailRow('fa-calendar', '#10b981', _vcdI18n.registered, '<span style="font-weight:900;color:#fff;">' + _dateVal + '</span>')}
                ${_detailRow('fa-shopping-cart', '#9333ea', _vcdI18n.orders, '<span style="font-weight:900;color:#fff;">' + userOrders.length + ' ' + _vcdI18n.order + '</span> <span style="color:#fff;font-size:0.82em;opacity:0.8;">(' + _vcdI18n.confirmedTotal + ' ' + confirmedTotal.toFixed(0) + ' EGP)</span>')}
            </div>
            ${ordersHtml}
        </div>`;
        btns.innerHTML = '<button onclick="document.getElementById(\'customModalOverlay\').classList.remove(\'active\')" style="padding:10px 28px;border-radius:10px;background:var(--gradient-primary);color:white;border:none;font-weight:800;cursor:pointer;font-size:0.95em;font-family:inherit;">' + _vcdI18n.close + '</button>';
        modal.classList.add('active');
        modal.onclick = function(e) { if (e.target === modal) modal.classList.remove('active'); };
    } catch(e) {
        console.error('viewCustomerDetails error:', e);
        showToast('❌', _vcdI18n.errorLoading, 'error');
    }
};

window.deleteCustomer = async function(uid, name) {
    var _dcLang = document.documentElement.lang || 'ar';
    var _dcI18n = {
        title: _dcLang === 'ar' ? '⚠️ حذف العميل' : _dcLang === 'en' ? '⚠️ Delete Customer' : '⚠️ Supprimer le client',
        msg: _dcLang === 'ar' ? 'هل أنت متأكد من حذف "' + name + '"؟\nسيتم حذف جميع بيانات العميل نهائياً.' : _dcLang === 'en' ? 'Are you sure you want to delete "' + name + '"?\nAll customer data will be permanently deleted.' : 'Êtes-vous sûr de vouloir supprimer "' + name + '" ?\nToutes les données du client seront définitivement supprimées.',
        confirm: _dcLang === 'ar' ? 'حذف' : _dcLang === 'en' ? 'Delete' : 'Supprimer',
        cancel: _dcLang === 'ar' ? 'إلغاء' : _dcLang === 'en' ? 'Cancel' : 'Annuler',
        success: _dcLang === 'ar' ? 'تم حذف العميل بنجاح' : _dcLang === 'en' ? 'Customer deleted successfully' : 'Client supprimé avec succès',
        failed: _dcLang === 'ar' ? 'فشل حذف العميل' : _dcLang === 'en' ? 'Failed to delete customer' : 'Échec de la suppression du client'
    };
    const ok = await showConfirmDialog(
        _dcI18n.title,
        _dcI18n.msg,
        _dcI18n.confirm,
        _dcI18n.cancel
    );
    if (!ok) return;
    try {
        await DB.remove('users/' + uid);
        window._allCustomers = window._allCustomers.filter(c => c.uid !== uid);
        window.applyCustomersFilter();
        showToast('✅', _dcI18n.success, 'success');
    } catch(e) {
        console.error('deleteCustomer error:', e);
        showToast('❌', _dcI18n.failed, 'error');
    }
};

window.deleteAllCustomers = async function() {
    var _dacLang = document.documentElement.lang || 'ar';
    var _dacI18n = {
        title: _dacLang === 'ar' ? '⚠️ حذف جميع العملاء' : _dacLang === 'en' ? '⚠️ Delete All Customers' : '⚠️ Supprimer tous les clients',
        msg: _dacLang === 'ar' ? 'هل أنت متأكد من حذف جميع بيانات العملاء؟\nلن تتمكن من استعادتها.' : _dacLang === 'en' ? 'Are you sure you want to delete all customer data?\nYou will not be able to recover it.' : 'Êtes-vous sûr de vouloir supprimer toutes les données clients ?\nVous ne pourrez pas les récupérer.',
        confirm: _dacLang === 'ar' ? 'حذف الكل' : _dacLang === 'en' ? 'Delete All' : 'Tout supprimer',
        cancel: _dacLang === 'ar' ? 'إلغاء' : _dacLang === 'en' ? 'Cancel' : 'Annuler',
        success: _dacLang === 'ar' ? 'تم حذف جميع العملاء' : _dacLang === 'en' ? 'All customers deleted' : 'Tous les clients supprimés',
        error: _dacLang === 'ar' ? 'حدث خطأ أثناء الحذف' : _dacLang === 'en' ? 'Error during deletion' : 'Erreur lors de la suppression'
    };
    const ok = await showConfirmDialog(
        _dacI18n.title,
        _dacI18n.msg,
        _dacI18n.confirm,
        _dacI18n.cancel
    );
    if (!ok) return;
    try {
        for (const c of window._allCustomers) {
            await DB.remove('users/' + c.uid);
        }
        window._allCustomers = [];
        window.applyCustomersFilter();
        showToast('✅', _dacI18n.success, 'success');
    } catch(e) {
        console.error('deleteAllCustomers error:', e);
        showToast('❌', _dacI18n.error, 'error');
    }
};

// ==================== ADD PRODUCT (ENHANCED) ====================
function initAddProductForm() {
    const form = document.getElementById('addProductForm');
    if (!form) return;

    const imgInput = document.getElementById('productImageInput');
    const previewsGrid = document.getElementById('productImagePreviews');
    const imagesDataInput = document.getElementById('productImagesData');
    let productImages = [];
    let mainImageIndex = 0;

    function renderImagePreviews() {
        if (!previewsGrid) return;
        if (!productImages || productImages.length === 0) {
            previewsGrid.innerHTML = '<div class="multi-image-placeholder"><i class="fas fa-image"></i><span>' + (currentLang === 'ar' ? 'لم تُرفع صور بعد' : currentLang === 'en' ? 'No images yet' : "Pas encore d'images") + '</span></div>';
            if (imagesDataInput) imagesDataInput.value = '[]';
            return;
        }
        let html = '';
        productImages.forEach(function(url, i) {
            const isMain = i === mainImageIndex;
            html += '<div class="multi-image-card' + (isMain ? ' main-image' : '') + '" data-index="' + i + '">';
            html += '<img src="' + url + '" alt="صورة ' + (i + 1) + '">';
            html += '<div class="multi-image-actions">';
            if (!isMain) {
                html += '<button type="button" class="multi-img-btn set-main-btn" onclick="setProductMainImage(' + i + ')" title="' + (currentLang === 'ar' ? 'تعيين كصورة رئيسية' : currentLang === 'en' ? 'Set as main' : 'Définir comme principal') + '"><i class="fas fa-star"></i></button>';
            } else {
                html += '<span class="main-image-badge"><i class="fas fa-star"></i> ' + (currentLang === 'ar' ? 'رئيسية' : currentLang === 'en' ? 'Main' : 'Principal') + '</span>';
            }
            html += '<button type="button" class="multi-img-btn remove-img-btn" onclick="removeProductImage(' + i + ')" title="' + (currentLang === 'ar' ? 'حذف' : currentLang === 'en' ? 'Remove' : 'Supprimer') + '"><i class="fas fa-trash"></i></button>';
            html += '</div></div>';
        });
        previewsGrid.innerHTML = html;
        if (imagesDataInput) imagesDataInput.value = JSON.stringify({ images: productImages, mainImageIndex: mainImageIndex });
    }

    window.setProductMainImage = function(idx) {
        mainImageIndex = idx;
        renderImagePreviews();
    };
    window.removeProductImage = function(idx) {
        productImages.splice(idx, 1);
        if (mainImageIndex >= productImages.length) mainImageIndex = Math.max(0, productImages.length - 1);
        renderImagePreviews();
    };

    if (imgInput) {
        imgInput.addEventListener('change', async function () {
            const f = this.files[0];
            if (!f) return;
            try {
                const r = await uploadToImgBB(f);
                const url = r.display_url || r.url;
                productImages.push(url);
                renderImagePreviews();
                _showFormNotification('addProductForm', 'success', currentLang === 'ar' ? '✅ تم رفع الصورة بنجاح' : currentLang === 'en' ? '✅ Image uploaded successfully' : '✅ Image téléchargée avec succès');
            } catch (e) {
                _showFormNotification('addProductForm', 'error', currentLang === 'ar' ? '❌ فشل رفع الصورة' : currentLang === 'en' ? '❌ Upload failed' : '❌ Échec du téléchargement');
            }
            this.value = '';
        });
    }

    var videoFileInput = document.getElementById('productVideoFileInput');
    var videoUrlInput = document.getElementById('productVideoUrl');
    if (videoFileInput) {
        videoFileInput.addEventListener('change', async function () {
            var f = this.files[0];
            if (!f) return;
            if (f.size > 100 * 1024 * 1024) {
                _showFormNotification('addProductForm', 'error', currentLang === 'ar' ? '❌ الحد الأقصى 100 ميجابايت' : currentLang === 'en' ? '❌ Max 100MB' : '❌ Max 100 Mo');
                this.value = '';
                return;
            }
            try {
                var url = await uploadVideoToFirebase(f);
                if (videoUrlInput) videoUrlInput.value = url;
                _showFormNotification('addProductForm', 'success', currentLang === 'ar' ? '✅ تم رفع الفيديو بنجاح' : currentLang === 'en' ? '✅ Video uploaded successfully' : '✅ Vidéo téléchargée avec succès');
            } catch (e) {
                console.error('Video upload failed:', e);
                _showFormNotification('addProductForm', 'error', currentLang === 'ar' ? '❌ فشل رفع الفيديو' : currentLang === 'en' ? '❌ Video upload failed' : '❌ Échec du téléchargement');
            }
            this.value = '';
        });
    }

    form.addEventListener('submit', async function (e) {
        e.preventDefault();
        const btn = document.getElementById('submitProductBtn');
        const orig = btn.innerHTML;
        const addNotif = document.getElementById('addProductNotification');

        var titleAr = (document.getElementById('productTitleAr')?.value || '').trim();
        if (!titleAr) {
            showToast('❌', currentLang === 'ar' ? 'اسم المنتج مطلوب (AR)' : currentLang === 'en' ? 'Product title required (AR)' : 'Titre requis (AR)', 'error');
            document.getElementById('productTitleAr')?.focus();
            return;
        }
        var priceEGPval = parseFloat(document.getElementById('productPriceEGP')?.value) || 0;
        var priceUSDval = parseFloat(document.getElementById('productPriceUSD')?.value) || 0;
        if (!priceEGPval && !priceUSDval) {
            showToast('❌', currentLang === 'ar' ? 'سعر المنتج مطلوب (EGP أو USD)' : currentLang === 'en' ? 'Product price is required (EGP or USD)' : 'Le prix du produit est requis (EGP ou USD)', 'error');
            return;
        }

        btn.disabled = true;
        btn.innerHTML = `<i class="fas fa-spinner fa-spin"></i> ${currentLang === 'ar' ? 'جاري الترجمة والإضافة...' : currentLang === 'en' ? 'Translating & adding...' : 'Traduction et ajout...'}`;
        if (addNotif) { addNotif.className = 'form-inline-notification show info'; addNotif.innerHTML = '<i class="fas fa-language"></i> ' + (currentLang === 'ar' ? 'جاري ترجمة النصوص إلى الإنجليزي والفرنسي...' : currentLang === 'en' ? 'Translating to English and French...' : 'Traduction en anglais et français...'); }

        const oldPriceEGP = parseFloat(document.getElementById('productOldPriceEGP')?.value) || 0;
        const oldPriceUSD = parseFloat(document.getElementById('productOldPriceUSD')?.value) || 0;
        const badgeValue = document.getElementById('productBadge')?.value || 'none';

        function parseLangLines(id) {
            var v = (document.getElementById(id)?.value || '').trim();
            return v ? v.split('\n').map(function(s){ return s.trim(); }).filter(Boolean) : [];
        }
        var featsAr = parseLangLines('productFeaturesAr');
        var reqsAr = parseLangLines('productRequirementsAr');
        function parseFAQ(id) {
            return (document.getElementById(id)?.value || '').split('\n').map(function(s){ return s.trim(); }).filter(Boolean).map(function(line){
                var idx = line.indexOf('|');
                if (idx > -1) return { q: line.slice(0, idx).trim(), a: line.slice(idx+1).trim() };
                return { q: line, a: '' };
            }).filter(function(item){ return item.q; });
        }
        var faqAr = parseFAQ('productFAQAr');

        var images = productImages.length > 0 ? productImages : [];
        var mainIdx = productImages.length > 0 ? mainImageIndex : 0;
        var videoUrl = (document.getElementById('productVideoUrl')?.value || '').trim();
        var descAr = (document.getElementById('productDescriptionAr')?.value || '').trim() || 'وصف المنتج';

        // Auto-translate Arabic to EN/FR
        var titleEn = '', titleFr = '';
        var descEn = '', descFr = '';
        var featsEn = [], featsFr = [];
        var reqsEn = [], reqsFr = [];
        var faqEn = [], faqFr = [];
        try {
            [titleEn, titleFr] = await Promise.all([_translateTextArTo(titleAr, 'en'), _translateTextArTo(titleAr, 'fr')]);
            [descEn, descFr] = await Promise.all([_translateTextArTo(descAr, 'en'), _translateTextArTo(descAr, 'fr')]);
            [featsEn, featsFr] = await Promise.all([_translateLinesArTo(featsAr, 'en'), _translateLinesArTo(featsAr, 'fr')]);
            [reqsEn, reqsFr] = await Promise.all([_translateLinesArTo(reqsAr, 'en'), _translateLinesArTo(reqsAr, 'fr')]);
            var faqTransEn = [], faqTransFr = [];
            for (var fi = 0; fi < faqAr.length; fi++) {
                var qEn = await _translateTextArTo(faqAr[fi].q, 'en');
                var aEn = faqAr[fi].a ? await _translateTextArTo(faqAr[fi].a, 'en') : '';
                var qFr = await _translateTextArTo(faqAr[fi].q, 'fr');
                var aFr = faqAr[fi].a ? await _translateTextArTo(faqAr[fi].a, 'fr') : '';
                faqTransEn.push({ q: qEn, a: aEn });
                faqTransFr.push({ q: qFr, a: aFr });
            }
            faqEn = faqTransEn;
            faqFr = faqTransFr;
        } catch(te) { console.warn('Translation failed, using Arabic fallback', te); titleEn = titleAr; titleFr = titleAr; descEn = descAr; descFr = descAr; featsEn = featsAr; featsFr = featsAr; reqsEn = reqsAr; reqsFr = reqsAr; faqEn = faqAr; faqFr = faqAr; }

        const product = {
            title: { ar: titleAr, en: titleEn || titleAr, fr: titleFr || titleAr },
            category: document.getElementById('productCategory')?.value || 'books',
            priceEGP: parseFloat(document.getElementById('productPriceEGP')?.value) || 0,
            priceUSD: parseFloat(document.getElementById('productPriceUSD')?.value) || 0,
            oldPriceEGP: oldPriceEGP > 0 ? oldPriceEGP : null,
            oldPriceUSD: oldPriceUSD > 0 ? oldPriceUSD : null,
            hot: badgeValue === 'hot',
            bestseller: badgeValue === 'hot',
            featured: badgeValue === 'featured',
            badge: badgeValue !== 'none' ? badgeValue : null,
            description: { ar: descAr, en: descEn || descAr, fr: descFr || descAr },
            downloadLink: (document.getElementById('productDownloadLink')?.value || '').trim() || '#',
            image: images.length > 0 ? images[mainIdx] : '',
            images: images,
            mainImageIndex: mainIdx,
            video: videoUrl || '',
            showFullDesc: document.getElementById('productShowFullDesc')?.checked ?? true,
            showFeatures: document.getElementById('productShowFeatures')?.checked ?? true,
            showRequirements: document.getElementById('productShowRequirements')?.checked ?? true,
            showFAQ: document.getElementById('productShowFAQ')?.checked ?? true,
            features: { ar: featsAr, en: featsEn.length ? featsEn : featsAr, fr: featsFr.length ? featsFr : featsAr },
            requirements: { ar: reqsAr, en: reqsEn.length ? reqsEn : reqsAr, fr: reqsFr.length ? reqsFr : reqsAr },
            faq: { ar: faqAr, en: faqEn.length ? faqEn : faqAr, fr: faqFr.length ? faqFr : faqAr },
            createdAt: Date.now()
        };

        try {
            let id = await DB.push('products', product);
            
            if (!id) {
                id = 'local_' + Date.now();
                await DB.set(`products/${id}`, {...product, id});
            }

            if (id) {
                product.id = id;
                if (!window.allProducts) window.allProducts = [];
                if (!window.allProducts.find(p => p.id === id)) window.allProducts.push(product);
                if (typeof displayProducts === 'function') displayProducts();
                if (typeof updateStats === 'function') updateStats();

                showToast('✅', currentLang === 'ar' ? 'تم إضافة المنتج بنجاح!' : currentLang === 'en' ? 'Product added!' : 'Produit ajouté !', 'success');
                if (addNotif) { addNotif.className = 'form-inline-notification show success'; addNotif.innerHTML = '<i class="fas fa-check-circle"></i> ' + (currentLang === 'ar' ? 'تمت الترجمة والإضافة بنجاح!' : currentLang === 'en' ? 'Translated and added successfully!' : 'Traduit et ajouté avec succès !'); setTimeout(function(){ addNotif.className = 'form-inline-notification'; }, 4000); }
                form.reset();
                productImages = [];
                mainImageIndex = 0;
                renderImagePreviews();
                if (previewsGrid) previewsGrid.innerHTML = '<div class="multi-image-placeholder"><i class="fas fa-image"></i><span>' + (currentLang === 'ar' ? 'لم تُرفع صور بعد' : currentLang === 'en' ? 'No images yet' : "Pas encore d'images") + '</span></div>';
                if (imagesDataInput) imagesDataInput.value = '[]';
                const ri = document.getElementById('productRating'); if (ri) ri.value = '4.5';
                const sm = document.getElementById('successMessage'); if (sm) { sm.style.display = 'block'; setTimeout(() => sm.style.display = 'none', 3000); }
                
                if (typeof switchTab === 'function') {
                    if (document.getElementById('productsTab')) switchTab('products');
                    else if (document.getElementById('productsListTab')) switchTab('productsList');
                }
            }
        } catch (err) {
            console.error('Error adding product:', err);
            showToast('❌', currentLang === 'ar' ? 'فشل إضافة المنتج' : currentLang === 'en' ? 'Failed to add product' : "Échec de l'ajout du produit", 'error');
            if (addNotif) { addNotif.className = 'form-inline-notification show error'; addNotif.innerHTML = '<i class="fas fa-exclamation-circle"></i> ' + (currentLang === 'ar' ? 'فشلت الإضافة' : currentLang === 'en' ? 'Add failed' : "Échec de l'ajout"); }
        } finally {
            btn.disabled = false; btn.innerHTML = orig;
            if (addNotif) setTimeout(function(){ addNotif.className = 'form-inline-notification'; }, 6000);
        }
    });
}

// ==================== IMAGE VIEWER WITH ZOOM ====================
let _imgZoomLevel = 1;
function openImageModal(src) {
    const m = document.getElementById('imageModal'), i = document.getElementById('modalImage');
    if (m && i) {
        _imgZoomLevel = 1;
        i.src = src;
        i.style.transform = 'scale(1)';
        i.style.cursor = 'zoom-in';
        m.classList.add('active');
        document.getElementById('zoomLevel') && (document.getElementById('zoomLevel').textContent = '100%');
    }
}
window.openImageModal = openImageModal;
function closeImageModal() {
    const m = document.getElementById('imageModal');
    if (m) m.classList.remove('active');
    _imgZoomLevel = 1;
}
window.closeImageModal = closeImageModal;
function zoomIn() {
    _imgZoomLevel = Math.min(_imgZoomLevel + 0.25, 5);
    applyZoom();
}
function zoomOut() {
    _imgZoomLevel = Math.max(_imgZoomLevel - 0.25, 0.25);
    applyZoom();
}
function zoomReset() {
    _imgZoomLevel = 1;
    applyZoom();
}
function applyZoom() {
    const i = document.getElementById('modalImage');
    if (!i) return;
    i.style.transform = 'scale(' + _imgZoomLevel + ')';
    i.style.cursor = _imgZoomLevel > 1 ? 'grab' : 'zoom-in';
    const zl = document.getElementById('zoomLevel');
    if (zl) zl.textContent = Math.round(_imgZoomLevel * 100) + '%';
}
window.zoomIn = zoomIn;
window.zoomOut = zoomOut;
window.zoomReset = zoomReset;

// Mouse wheel zoom + keyboard support (runs directly, script is at bottom of body)
(function() {
    var modal = document.getElementById('imageModal');
    if (modal) {
        modal.addEventListener('wheel', function(e) {
            if (!modal.classList.contains('active')) return;
            e.preventDefault();
            if (e.deltaY < 0) zoomIn(); else zoomOut();
        }, { passive: false });
    }
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') closeImageModal();
    });
})();

// ==================== OPEN EDIT PRODUCT MODAL (ENHANCED) ====================
function openEditProductModal(id) {
    const populateModal = (p) => {
        if (!p) return;
        document.getElementById('editProductId').value = id;

        function getLangVal(field) {
            var v = p[field];
            if (typeof v === 'string') return { ar: v, en: v, fr: v };
            if (v && typeof v === 'object') return { ar: v.ar || '', en: v.en || '', fr: v.fr || '' };
            return { ar: '', en: '', fr: '' };
        }
        var t = getLangVal('title');
        var editTitleArEl = document.getElementById('editProductTitleAr');
        if (editTitleArEl) editTitleArEl.value = t.ar;

        var d = getLangVal('description');
        var editDescArEl = document.getElementById('editProductDescriptionAr');
        if (editDescArEl) editDescArEl.value = d.ar;

        document.getElementById('editProductCategory').value = p.category || 'books';
        document.getElementById('editProductPriceEGP').value = p.priceEGP || 0;
        document.getElementById('editProductPriceUSD').value = p.priceUSD || 0;
        document.getElementById('editProductOldPriceEGP').value = p.oldPriceEGP || 0;
        document.getElementById('editProductOldPriceUSD').value = p.oldPriceUSD || 0;
        document.getElementById('editProductBadge').value = p.badge || (p.hot ? 'hot' : (p.featured ? 'featured' : 'none'));
        document.getElementById('editProductDownloadLink').value = p.downloadLink || '';

        function fillArrayField(elId, field) {
            var el = document.getElementById(elId);
            if (!el) return;
            var v = p[field];
            if (Array.isArray(v)) { el.value = v.join('\n'); return; }
            if (v && typeof v === 'object') {
                var a = v.ar || [];
                var e = v.en || [];
                var f = v.fr || [];
                el.value = (Array.isArray(a) ? a : []).join('\n');
            }
        }
        function fillFAQField(elId, field) {
            var el = document.getElementById(elId);
            if (!el) return;
            var v = p[field];
            if (Array.isArray(v)) {
                el.value = v.map(function(item){ return (item.q||'')+' | '+(item.a||''); }).join('\n');
                return;
            }
            if (v && typeof v === 'object') {
                var arr = v.ar || [];
                el.value = (Array.isArray(arr) ? arr : []).map(function(item){ return (item.q||'')+' | '+(item.a||''); }).join('\n');
            }
        }
        fillArrayField('editProductFeaturesAr', 'features');
        fillArrayField('editProductRequirementsAr', 'requirements');
        fillFAQField('editProductFAQAr', 'faq');
        // Sync visibility toggles
        const toggleMap = { editProductShowFullDesc: 'showFullDesc', editProductShowFeatures: 'showFeatures', editProductShowRequirements: 'showRequirements', editProductShowFAQ: 'showFAQ' };
        Object.entries(toggleMap).forEach(([elId, prop]) => {
            const cb = document.getElementById(elId);
            if (cb) cb.checked = p[prop] !== false;
        });
        // Sync visual category/badge selectors
        ['editProductCategory', 'editProductBadge'].forEach(id => {
            const v = document.getElementById(id)?.value;
            if (!v) return;
            const container = id === 'editProductCategory' ? 'editProductCategorySelector' : 'editBadgeSelector';
            document.querySelectorAll(`#${container} .admin-cat-option, #${container} .admin-badge-opt`).forEach(opt => {
                const match = opt.dataset.value === v;
                opt.classList.toggle('selected', match);
                if (match) { const r = opt.querySelector('input[type=radio]'); if (r) r.checked = true; }
            });
        });
        // Populate multi-image grid and video
        const imagesArr = p.images || (p.image ? [p.image] : []);
        const mainIdx = p.mainImageIndex || 0;
        const videoUrl = p.video || '';
        window.__editImages = imagesArr.slice();
        window.__editMainIdx = mainIdx;
        const epPrevGrid = document.getElementById('editProductImagePreviews');
        const epDataInput = document.getElementById('editProductImagesData');
        if (epPrevGrid) {
            if (!imagesArr || imagesArr.length === 0) {
                epPrevGrid.innerHTML = '<div class="multi-image-placeholder"><i class="fas fa-image"></i><span>' + (currentLang === 'ar' ? 'لم تُرفع صور بعد' : currentLang === 'en' ? 'No images yet' : "Pas encore d'images") + '</span></div>';
                if (epDataInput) epDataInput.value = '[]';
            } else {
                let html = '';
                imagesArr.forEach(function(url, i) {
                    const isMain = i === mainIdx;
                    html += '<div class="multi-image-card' + (isMain ? ' main-image' : '') + '" data-index="' + i + '">';
                    html += '<img src="' + url + '" alt="صورة ' + (i + 1) + '">';
                    html += '<div class="multi-image-actions">';
                    if (!isMain) {
                        html += '<button type="button" class="multi-img-btn set-main-btn" onclick="setEditMainImage(' + i + ')" title="' + (currentLang === 'ar' ? 'تعيين كصورة رئيسية' : currentLang === 'en' ? 'Set as main' : 'Définir comme principal') + '"><i class="fas fa-star"></i></button>';
                    } else {
                        html += '<span class="main-image-badge"><i class="fas fa-star"></i> ' + (currentLang === 'ar' ? 'رئيسية' : currentLang === 'en' ? 'Main' : 'Principal') + '</span>';
                    }
                    html += '<button type="button" class="multi-img-btn remove-img-btn" onclick="removeEditImage(' + i + ')" title="' + (currentLang === 'ar' ? 'حذف' : currentLang === 'en' ? 'Remove' : 'Supprimer') + '"><i class="fas fa-trash"></i></button>';
                    html += '</div></div>';
                });
                epPrevGrid.innerHTML = html;
                if (epDataInput) epDataInput.value = JSON.stringify({ images: imagesArr, mainImageIndex: mainIdx });
            }
        }
        const editVideoEl = document.getElementById('editProductVideoUrl');
        if (editVideoEl) editVideoEl.value = videoUrl;
        setTimeout(() => renderAllSuggestionChips(), 0);
        const prodModal = document.getElementById('editProductModal');
        prodModal.classList.add('active');
        if (!prodModal.hasAttribute('data-close-outside')) {
            prodModal.addEventListener('click', function(e) { if (e.target === this) closeEditProductModal(); });
            prodModal.setAttribute('data-close-outside', '1');
        }
    };

    // First try to find it locally for offline/instant testing
    const localProduct = window.adminProductsList?.find(p => String(p.id) === String(id) || String(p[0]) === String(id)) || window.allProducts?.find(p => String(p.id) === String(id));
    
    // Normalize if we got an array entry [id, p] from adminProductsList
    let productData = Array.isArray(localProduct) ? localProduct[1] : localProduct;

    // Fallback: read directly from localStorage to avoid DB.get corruption risk
    if (!productData) {
        try {
            const db = JSON.parse(localStorage.getItem('bravo_local_db') || '{}');
            productData = db.products?.[id];
        } catch(e) {}
    }

    if (productData) {
        populateModal(productData);
    } else {
        showToast('❌', currentLang === 'ar' ? 'لم يتم العثور على المنتج محلياً.' : currentLang === 'en' ? 'Product not found locally.' : 'Produit introuvable localement.', 'error');
    }
}
window.openEditProductModal = openEditProductModal;
function closeEditProductModal() { document.getElementById('editProductModal').classList.remove('active'); }
window.closeEditProductModal = closeEditProductModal;

window.selectAdminCat = function(el, selectId) {
    el.closest('.admin-cat-selector').querySelectorAll('.admin-cat-option').forEach(o => o.classList.remove('selected'));
    el.classList.add('selected');
    const radio = el.querySelector('input[type=radio]');
    if (radio) radio.checked = true;
    const hidden = document.getElementById(selectId);
    if (hidden) hidden.value = el.dataset.value;
};

window.selectAdminBadge = function(el, selectId) {
    el.closest('.admin-badge-selector').querySelectorAll('.admin-badge-opt').forEach(o => o.classList.remove('selected'));
    el.classList.add('selected');
    const radio = el.querySelector('input[type=radio]');
    if (radio) radio.checked = true;
    const hidden = document.getElementById(selectId);
    if (hidden) hidden.value = el.dataset.value;
};

// ==================== OPEN EDIT ORDER MODAL (FIXED) ====================
async function openEditOrderModal(id) {
    const o = await DB.get(`orders/${id}`);
    if (!o) return;
    document.getElementById('editOrderId').value = id;
    // Clear any previous transfer image upload
    const transferInput = document.getElementById('editTransferImageInput');
    if (transferInput) delete transferInput.dataset.newImageUrl;

    // Resolve product ID for single-product orders vs cart_checkout
    let pid = o.productId;
    if ((!pid || pid === 'cart_checkout' || pid === 'N/A') && o.items && typeof o.items === 'object') {
        const itemKeys = Object.keys(o.items);
        if (itemKeys.length > 0) pid = itemKeys[0];
    }

    // Fetch product data for title, old prices, currency, image
    let productData = null;
    if (pid && pid !== 'cart_checkout' && pid !== 'N/A') {
        try { productData = await DB.get(`products/${pid}`); } catch(e) {}
    }

    // Title: prefer product title, for cart_checkout use first item's title
    let productTitle = o.productTitle || '';
    if (productData && (!productTitle || productTitle.includes('منتجات من السلة'))) {
        productTitle = productData.title || productTitle;
    } else if ((!productTitle || productTitle.includes('منتجات من السلة')) && o.items && typeof o.items === 'object') {
        const keys = Object.keys(o.items);
        if (keys.length > 0) {
            const first = o.items[keys[0]];
            if (first && first.title) productTitle = first.title;
        }
    }
    const titleEl = document.getElementById('editOrderProductTitle');
    if (titleEl) titleEl.value = productTitle;

    // Customer country from order data
    const customerCountry = o.userCountry || o.customerCountry || 'EG';

    // Currency based on customer country: EG → EGP, else → USD
    let currency = (customerCountry === 'EG') ? 'EGP' : 'USD';

    // Image from product data fallback
    const imgUrl = o.productImage || o.image || (productData && (productData.image || productData.productImage)) || '';

    const fields = {
        editPrice: o.price || 0,
        editCurrency: currency,
        editCustomerName: o.customerName || '',
        editCustomerEmail: o.customerEmail || '',
        editCustomerPhone: o.customerPhone || '',
        editPaymentMethod: o.paymentMethod || 'exchange',
        editOrderCategory: o.productCategory || o.category || (productData && productData.category) || 'books'
    };
    Object.entries(fields).forEach(([k, v]) => { const el = document.getElementById(k); if (el) el.value = v; });
    const countryEl = document.getElementById('editCustomerCountry');
    if (countryEl) countryEl.value = customerCountry;

    // Status
    const sr = document.getElementById(`status${(o.status || 'pending').charAt(0).toUpperCase() + (o.status || 'pending').slice(1)}`);
    if (sr) sr.checked = true;

    // Product image preview
    const pImg = document.getElementById('editOrderProductPreviewImg');
    if (pImg) {
        if (imgUrl) { pImg.src = imgUrl; pImg.style.display = 'block'; }
        else { pImg.style.display = 'none'; }
    }

    // Transfer image preview
    const prev = document.getElementById('editTransferImagePreview');
    if (prev) {
        if (o.receiptImageUrl) { prev.src = o.receiptImageUrl; prev.style.display = 'block'; }
        else { prev.style.display = 'none'; }
    }

    // Download link
    const dlEl = document.getElementById('editOrderDownloadLink');
    let dl = o.downloadLink || '';
    if ((!dl || dl === '#') && productData && productData.downloadLink && productData.downloadLink !== '#') {
        dl = productData.downloadLink;
    }
    if (dlEl) dlEl.value = dl;

    const orderModal = document.getElementById('editOrderModal');
    orderModal.classList.add('active');
    if (!orderModal.hasAttribute('data-close-outside')) {
        orderModal.addEventListener('click', function(e) { if (e.target === this) closeEditOrderModal(); });
        orderModal.setAttribute('data-close-outside', '1');
    }
}
window.openEditOrderModal = openEditOrderModal;
function closeEditOrderModal() { document.getElementById('editOrderModal').classList.remove('active'); }
window.closeEditOrderModal = closeEditOrderModal;
function updateCurrencyFromCountry() {
    const c = document.getElementById('editCustomerCountry')?.value;
    const curr = document.getElementById('editCurrency');
    if (curr && c) curr.value = (c === 'EG') ? 'EGP' : 'USD';
}
window.updateCurrencyFromCountry = updateCurrencyFromCountry;

// ==================== INIT EDIT FORMS (ENHANCED) ====================
function initEditForms() {
    // فورم تعديل الطلب
    const eof = document.getElementById('editOrderForm');
    if (eof) {
        // رفع صورة التحويل في تعديل الطلب
        const editTransferInput = document.getElementById('editTransferImageInput');
        if (editTransferInput) {
            editTransferInput.addEventListener('change', async function () {
                const f = this.files[0]; if (!f) return;
                try {
                    showToast('⏳', currentLang === 'ar' ? 'جاري رفع الصورة...' : currentLang === 'en' ? 'Uploading...' : 'Téléchargement...', 'info');
                    const r = await uploadToImgBB(f);
                    const newUrl = r.display_url || r.url;
                    const prev = document.getElementById('editTransferImagePreview');
                    if (prev) { prev.src = newUrl; prev.style.display = 'block'; }
                    editTransferInput.dataset.newImageUrl = newUrl;
                    showToast('✅', currentLang === 'ar' ? 'تم رفع الصورة' : currentLang === 'en' ? 'Uploaded' : 'Téléchargé', 'success');
                } catch (e) { showToast('❌', currentLang === 'ar' ? 'فشل الرفع' : currentLang === 'en' ? 'Failed' : 'Échec', 'error'); }
            });
        }

        eof.addEventListener('submit', async (e) => {
            e.preventDefault();
            const id = document.getElementById('editOrderId').value;
            const st = document.querySelector('input[name="orderStatus"]:checked');
            const u = {
                productTitle: document.getElementById('editOrderProductTitle')?.value || '',
                price: parseFloat(document.getElementById('editPrice').value),
                currency: document.getElementById('editCurrency').value,
                customerName: document.getElementById('editCustomerName').value,
                customerEmail: document.getElementById('editCustomerEmail').value,
                customerPhone: document.getElementById('editCustomerPhone').value,
                paymentMethod: document.getElementById('editPaymentMethod').value,
                productCategory: document.getElementById('editOrderCategory')?.value || 'books',
                customerCountry: document.getElementById('editCustomerCountry')?.value || 'EG',
                status: st ? st.value : 'pending',
                downloadLink: document.getElementById('editOrderDownloadLink')?.value || '',
                ...(document.getElementById('editTransferImageInput')?.dataset?.newImageUrl ? { receiptImageUrl: document.getElementById('editTransferImageInput').dataset.newImageUrl } : {}),
                updatedAt: Date.now()
            };
            const s = await DB.update(`orders/${id}`, u);
            if (s) { closeEditOrderModal(); showToast('✅', currentLang === 'ar' ? 'تم تحديث الطلب' : currentLang === 'en' ? 'Order updated' : 'Commande mise à jour', 'success'); }
        });
    }

    // فورم تعديل المنتج المطور
    const epf = document.getElementById('editProductForm');
    if (epf) {
        const editImgInput = document.getElementById('editProductImageInput');
        const editPreviewsGrid = document.getElementById('editProductImagePreviews');
        const editImagesDataInput = document.getElementById('editProductImagesData');
        window.__editImages = window.__editImages || [];
        window.__editMainIdx = window.__editMainIdx || 0;

        function renderEditImagePreviews() {
            var imgs = window.__editImages || [];
            var mainIdx = window.__editMainIdx || 0;
            if (!editPreviewsGrid) return;
            if (!imgs || imgs.length === 0) {
                editPreviewsGrid.innerHTML = '<div class="multi-image-placeholder"><i class="fas fa-image"></i><span>' + (currentLang === 'ar' ? 'لم تُرفع صور بعد' : currentLang === 'en' ? 'No images yet' : "Pas encore d'images") + '</span></div>';
                if (editImagesDataInput) editImagesDataInput.value = '[]';
                return;
            }
            let html = '';
            imgs.forEach(function(url, i) {
                const isMain = i === mainIdx;
                html += '<div class="multi-image-card' + (isMain ? ' main-image' : '') + '" data-index="' + i + '">';
                html += '<img src="' + url + '" alt="صورة ' + (i + 1) + '">';
                html += '<div class="multi-image-actions">';
                if (!isMain) {
                    html += '<button type="button" class="multi-img-btn set-main-btn" onclick="setEditMainImage(' + i + ')" title="' + (currentLang === 'ar' ? 'تعيين كصورة رئيسية' : currentLang === 'en' ? 'Set as main' : 'Définir comme principal') + '"><i class="fas fa-star"></i></button>';
                } else {
                    html += '<span class="main-image-badge"><i class="fas fa-star"></i> ' + (currentLang === 'ar' ? 'رئيسية' : currentLang === 'en' ? 'Main' : 'Principal') + '</span>';
                }
                html += '<button type="button" class="multi-img-btn remove-img-btn" onclick="removeEditImage(' + i + ')" title="' + (currentLang === 'ar' ? 'حذف' : currentLang === 'en' ? 'Remove' : 'Supprimer') + '"><i class="fas fa-trash"></i></button>';
                html += '</div></div>';
            });
            editPreviewsGrid.innerHTML = html;
            if (editImagesDataInput) editImagesDataInput.value = JSON.stringify({ images: imgs, mainImageIndex: mainIdx });
        }

        window.setEditMainImage = function(idx) {
            window.__editMainIdx = idx;
            renderEditImagePreviews();
        };
        window.removeEditImage = function(idx) {
            var imgs = window.__editImages || [];
            imgs.splice(idx, 1);
            window.__editImages = imgs;
            if (window.__editMainIdx >= imgs.length) window.__editMainIdx = Math.max(0, imgs.length - 1);
            renderEditImagePreviews();
        };

        if (editImgInput) {
            editImgInput.addEventListener('change', async function () {
                const f = this.files[0];
                if (!f) return;
                try {
                    const r = await uploadToImgBB(f);
                    const newUrl = r.display_url || r.url;
                    window.__editImages = window.__editImages || [];
                    window.__editImages.push(newUrl);
                    renderEditImagePreviews();
                    _showFormNotification('editProductForm', 'success', currentLang === 'ar' ? '✅ تم رفع الصورة بنجاح' : currentLang === 'en' ? '✅ Image uploaded successfully' : '✅ Image téléchargée avec succès');
                } catch (e) { _showFormNotification('editProductForm', 'error', currentLang === 'ar' ? '❌ فشل رفع الصورة' : currentLang === 'en' ? '❌ Upload failed' : '❌ Échec du téléchargement'); }
                this.value = '';
            });
        }

        var editVideoFileInput = document.getElementById('editProductVideoFileInput');
        var editVideoUrlInput = document.getElementById('editProductVideoUrl');
        if (editVideoFileInput) {
            editVideoFileInput.addEventListener('change', async function () {
                var f = this.files[0];
                if (!f) return;
                if (f.size > 100 * 1024 * 1024) {
                    _showFormNotification('editProductForm', 'error', currentLang === 'ar' ? '❌ الحد الأقصى 100 ميجابايت' : currentLang === 'en' ? '❌ Max 100MB' : '❌ Max 100 Mo');
                    this.value = '';
                    return;
                }
                try {
                    var url = await uploadVideoToFirebase(f);
                    if (editVideoUrlInput) editVideoUrlInput.value = url;
                    _showFormNotification('editProductForm', 'success', currentLang === 'ar' ? '✅ تم رفع الفيديو بنجاح' : currentLang === 'en' ? '✅ Video uploaded successfully' : '✅ Vidéo téléchargée avec succès');
                } catch (e) {
                    console.error('Video upload failed:', e);
                    _showFormNotification('editProductForm', 'error', currentLang === 'ar' ? '❌ فشل رفع الفيديو' : currentLang === 'en' ? '❌ Video upload failed' : '❌ Échec du téléchargement');
                }
                this.value = '';
            });
        }

        epf.addEventListener('submit', async (e) => {
            e.preventDefault();
            const id = document.getElementById('editProductId').value;
            const editNotif = document.getElementById('editProductNotification');
            var editTitleAr = document.getElementById('editProductTitleAr')?.value.trim() || '';
            var editPriceEGP = parseFloat(document.getElementById('editProductPriceEGP')?.value) || 0;
            var editPriceUSD = parseFloat(document.getElementById('editProductPriceUSD')?.value) || 0;
            if (!editTitleAr) {
                showToast('❌', currentLang === 'ar' ? 'اسم المنتج مطلوب (AR)' : currentLang === 'en' ? 'Product title required (AR)' : 'Titre requis (AR)', 'error');
                document.getElementById('editProductTitleAr')?.focus();
                return;
            }
            if (!editPriceEGP && !editPriceUSD) {
                showToast('❌', currentLang === 'ar' ? 'سعر المنتج مطلوب (EGP أو USD)' : currentLang === 'en' ? 'Product price is required (EGP or USD)' : 'Le prix du produit est requis (EGP ou USD)', 'error');
                return;
            }
            const badgeValue = document.getElementById('editProductBadge')?.value || 'none';
            function editParseLangLines(id) {
                var v = (document.getElementById(id)?.value || '').trim();
                return v ? v.split('\n').map(function(s){ return s.trim(); }).filter(Boolean) : [];
            }
            var editFeatsAr = editParseLangLines('editProductFeaturesAr');
            var editReqsAr = editParseLangLines('editProductRequirementsAr');
            function editParseFAQ(id) {
                return (document.getElementById(id)?.value || '').split('\n').map(function(s){ return s.trim(); }).filter(Boolean).map(function(line){
                    var idx = line.indexOf('|');
                    if (idx > -1) return { q: line.slice(0, idx).trim(), a: line.slice(idx+1).trim() };
                    return { q: line, a: '' };
                }).filter(function(item){ return item.q; });
            }
            var editFaqAr = editParseFAQ('editProductFAQAr');
            var imgs = window.__editImages || [];
            var mainIdx = window.__editMainIdx || 0;
            const editImagesArr = imgs.length > 0 ? imgs : [];
            const editMainIdx = imgs.length > 0 ? mainIdx : 0;
            const editVideoUrl = (document.getElementById('editProductVideoUrl')?.value || '').trim();
            var editDescAr = (document.getElementById('editProductDescriptionAr')?.value || '').trim() || 'وصف المنتج';

            // Auto-translate Arabic to EN/FR
            var editTitleEn = '', editTitleFr = '';
            var editDescEn = '', editDescFr = '';
            var editFeatsEn = [], editFeatsFr = [];
            var editReqsEn = [], editReqsFr = [];
            var editFaqEn = [], editFaqFr = [];
            try {
                if (editNotif) { editNotif.className = 'form-inline-notification show info'; editNotif.innerHTML = '<i class="fas fa-language"></i> ' + (currentLang === 'ar' ? 'جاري ترجمة النصوص...' : currentLang === 'en' ? 'Translating texts...' : 'Traduction des textes...'); }
                [editTitleEn, editTitleFr] = await Promise.all([_translateTextArTo(editTitleAr, 'en'), _translateTextArTo(editTitleAr, 'fr')]);
                [editDescEn, editDescFr] = await Promise.all([_translateTextArTo(editDescAr, 'en'), _translateTextArTo(editDescAr, 'fr')]);
                [editFeatsEn, editFeatsFr] = await Promise.all([_translateLinesArTo(editFeatsAr, 'en'), _translateLinesArTo(editFeatsAr, 'fr')]);
                [editReqsEn, editReqsFr] = await Promise.all([_translateLinesArTo(editReqsAr, 'en'), _translateLinesArTo(editReqsAr, 'fr')]);
                var eFaqEn = [], eFaqFr = [];
                for (var fi = 0; fi < editFaqAr.length; fi++) {
                    var qEn = await _translateTextArTo(editFaqAr[fi].q, 'en');
                    var aEn = editFaqAr[fi].a ? await _translateTextArTo(editFaqAr[fi].a, 'en') : '';
                    var qFr = await _translateTextArTo(editFaqAr[fi].q, 'fr');
                    var aFr = editFaqAr[fi].a ? await _translateTextArTo(editFaqAr[fi].a, 'fr') : '';
                    eFaqEn.push({ q: qEn, a: aEn });
                    eFaqFr.push({ q: qFr, a: aFr });
                }
                editFaqEn = eFaqEn;
                editFaqFr = eFaqFr;
            } catch(te) { console.warn('Edit translation failed', te); editTitleEn = editTitleAr; editTitleFr = editTitleAr; editDescEn = editDescAr; editDescFr = editDescAr; editFeatsEn = editFeatsAr; editFeatsFr = editFeatsAr; editReqsEn = editReqsAr; editReqsFr = editReqsAr; editFaqEn = editFaqAr; editFaqFr = editFaqAr; }

            const u = {
                title: { ar: editTitleAr, en: editTitleEn || editTitleAr, fr: editTitleFr || editTitleAr },
                category: document.getElementById('editProductCategory')?.value || 'books',
                priceEGP: parseFloat(document.getElementById('editProductPriceEGP')?.value) || 0,
                priceUSD: parseFloat(document.getElementById('editProductPriceUSD')?.value) || 0,
                oldPriceEGP: parseFloat(document.getElementById('editProductOldPriceEGP')?.value) || null,
                oldPriceUSD: parseFloat(document.getElementById('editProductOldPriceUSD')?.value) || null,
                hot: badgeValue === 'hot',
                bestseller: badgeValue === 'hot',
                featured: badgeValue === 'featured',
                badge: badgeValue !== 'none' ? badgeValue : null,
                description: { ar: editDescAr, en: editDescEn || editDescAr, fr: editDescFr || editDescAr },
                downloadLink: document.getElementById('editProductDownloadLink')?.value.trim() || '#',
                image: editImagesArr.length > 0 ? editImagesArr[editMainIdx] : '',
                images: editImagesArr,
                mainImageIndex: editMainIdx,
                video: editVideoUrl || '',
                showFullDesc: document.getElementById('editProductShowFullDesc')?.checked ?? true,
                showFeatures: document.getElementById('editProductShowFeatures')?.checked ?? true,
                showRequirements: document.getElementById('editProductShowRequirements')?.checked ?? true,
                showFAQ: document.getElementById('editProductShowFAQ')?.checked ?? true,
                features: { ar: editFeatsAr, en: editFeatsEn.length ? editFeatsEn : editFeatsAr, fr: editFeatsFr.length ? editFeatsFr : editFeatsAr },
                requirements: { ar: editReqsAr, en: editReqsEn.length ? editReqsEn : editReqsAr, fr: editReqsFr.length ? editReqsFr : editReqsAr },
                faq: { ar: editFaqAr, en: editFaqEn.length ? editFaqEn : editFaqAr, fr: editFaqFr.length ? editFaqFr : editFaqAr },
                updatedAt: Date.now()
            };
            
            // Try to update DB
            try {
                await DB.update(`products/${id}`, u);
                // Apply locally to ensure UI updates without database
                if(window.allProducts) {
                    const idx = window.allProducts.findIndex(p => p.id === id);
                    if(idx > -1) {
                        window.allProducts[idx] = { ...window.allProducts[idx], ...u };
                        if (typeof displayProducts === 'function') displayProducts();
                    }
                }
                closeEditProductModal(); 
                showToast('✅', currentLang === 'ar' ? 'تم تحديث المنتج!' : currentLang === 'en' ? 'Product updated!' : 'Produit mis à jour !', 'success');
                if (editNotif) { editNotif.className = 'form-inline-notification show success'; editNotif.innerHTML = '<i class="fas fa-check-circle"></i> ' + (currentLang === 'ar' ? 'تمت الترجمة والتحديث بنجاح!' : currentLang === 'en' ? 'Translated and updated!' : 'Traduit et mis à jour !'); setTimeout(function(){ editNotif.className = 'form-inline-notification'; }, 4000); }
            } catch(e) {
                console.error('Save failed:', e);
                showToast('❌', currentLang === 'ar' ? 'فشل الحفظ: مشكلة في قاعدة البيانات' : currentLang === 'en' ? 'Save failed: database error' : 'Échec de la sauvegarde : erreur de base de données', 'error');
                if (editNotif) { editNotif.className = 'form-inline-notification show error'; editNotif.innerHTML = '<i class="fas fa-exclamation-circle"></i> ' + (currentLang === 'ar' ? 'فشلت الترجمة أو الحفظ' : currentLang === 'en' ? 'Translation or save failed' : 'Échec de la traduction ou de la sauvegarde'); }
            }
        });
    }
}

// ✅ تحميل سلة المحذوفات فوراً عند تشغيل الموقع لضمان عدم ضياع البيانات
window.localTrashData = JSON.parse(localStorage.getItem('bravo_local_trash') || '{ "products": {}, "orders": {}, "pages": {} }');

// Helper to persist local trash data
function updateLocalTrashStorage() {
    localStorage.setItem('bravo_local_trash', JSON.stringify(window.localTrashData));
}

// ==================== PAGE BUILDER (CMS) ====================
let _cachedPageOrder = [];

async function renderSystemPages() {
    const container = document.getElementById('pagesContainer');
    const countEl = document.getElementById('pagesCount');
    const sidebarCountEl = document.getElementById('sidebarPagesCount');
    if (!container) return;
    
    try {
        const pagesSettings = await DB.get('settings/pages') || {};
        const customOrder = await DB.get('settings/pagesOrder') || [];
        
        // Build ordered list: SYSTEM_PAGES + custom pages from Firebase
        let allPagesMap = {};
        SYSTEM_PAGES.forEach(p => { allPagesMap[p.id] = p; });
        // Add custom pages from Firebase settings
        Object.keys(pagesSettings).forEach(id => {
            if (id.startsWith('_custom_') && !allPagesMap[id]) {
                const s = pagesSettings[id];
                allPagesMap[id] = { id, title: s.title || id, slug: s.slug || id, type: s.type || 'مخصصة' };
            }
        });
        let ordered = Object.values(allPagesMap).filter(p => {
            const s = pagesSettings[p.id] || {};
            return s.status !== 'trashed';
        });
        // Apply custom ordering
        if (customOrder.length > 0) {
            const orderMap = {};
            customOrder.forEach((id, idx) => { orderMap[id] = idx; });
            ordered.sort((a, b) => {
                const oa = orderMap[a.id] !== undefined ? orderMap[a.id] : 999;
                const ob = orderMap[b.id] !== undefined ? orderMap[b.id] : 999;
                return oa - ob;
            });
        }
        _cachedPageOrder = ordered.map(p => p.id);
        
        if (countEl) countEl.textContent = ordered.length;
        if (sidebarCountEl) sidebarCountEl.textContent = ordered.length;
        
        container.innerHTML = ordered.map((page, idx) => {
            const settings = pagesSettings[page.id] || {};
            const status = settings.status || 'published';
            return `
                <tr data-page-id="${page.id}">
                    <td style="text-align:center;font-weight:900;font-size:18px;color:var(--text-secondary);vertical-align:middle;">${idx + 1}</td>
                    <td style="text-align:center;vertical-align:middle;"><div style="font-weight:900;font-size:16px;">${settings.title || page.title}</div></td>
                    <td style="color:var(--text-secondary);font-weight:700;font-size:14px;text-align:center;vertical-align:middle;" dir="ltr">${page.slug}</td>
                    <td style="text-align:center;vertical-align:middle;">
                        <label onclick="togglePageStatus('${page.id}', event)" style="cursor:pointer;display:inline-flex;align-items:center;gap:10px;user-select:none;">
                            <div class="toggle-switch ${status === 'published' ? 'active' : ''}" style="margin:0;width:60px;height:30px;"></div>
                            <span style="font-size:16px;font-weight:900;color:${status === 'published' ? '#10b981' : '#f59e0b'};">${status === 'published' ? 'منشور' : 'مسودة'}</span>
                        </label>
                    </td>
                    <td style="font-weight:700;font-size:15px;text-align:center;vertical-align:middle;">${page.type}</td>
                    <td style="text-align:center;vertical-align:middle;">
                        <div style="display:flex;gap:10px;align-items:center;justify-content:center;flex-wrap:nowrap;">
                            <button data-id="${page.id}" data-title="${page.title}" data-slug="${page.slug}" onclick="openVisualBuilder(this.dataset.id, this.dataset.title, this.dataset.slug)" title="تعديل المحتوى" style="padding:10px 20px;border-radius:12px;background:rgba(16,185,129,0.15);color:#10b981;border:2px solid rgba(16,185,129,0.3);cursor:pointer;font-size:16px;font-weight:900;transition:all .2s;"><i class="fas fa-edit"></i> تعديل</button>
                            <button data-id="${page.id}" onclick="deletePage(this.dataset.id, event)" title="حذف" style="padding:10px 20px;border-radius:12px;background:rgba(239,68,68,0.15);color:#ef4444;border:2px solid rgba(239,68,68,0.3);cursor:pointer;font-size:16px;font-weight:900;transition:all .2s;"><i class="fas fa-trash"></i> حذف</button>
                        </div>
                    </td>
                </tr>
            `;
        }).join('');
    } catch (e) { console.error('Render pages error:', e); }
}

// --- Page CRUD & Controls ---

window.openAddPageModal = function() {
    const modal = document.getElementById('addPageModal');
    if (!modal) return;
    document.getElementById('addPageForm').reset();
    modal.classList.add('active');
};

window.closeAddPageModal = function() {
    const modal = document.getElementById('addPageModal');
    if (modal) modal.classList.remove('active');
};

document.getElementById('addPageForm')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const title = document.getElementById('addPageTitle').value.trim();
    let slug = document.getElementById('addPageSlug').value.trim().toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9\-]/g, '');
    if (!slug) slug = title.replace(/\s+/g, '-').toLowerCase().replace(/[^a-z0-9\-]/g, '');
    const type = document.getElementById('addPageType').value;
    const id = '_custom_' + slug + '_' + Date.now();
    
    // Check slug uniqueness
    const existing = SYSTEM_PAGES.find(p => p.slug === slug + '.html');
    if (existing) {
        showToast('⚠️', 'الرابط مستخدم بالفعل', 'error');
        return;
    }
    
    try {
        await DB.update(`settings/pages/${id}`, { title, slug: slug + '.html', type, status: 'draft', createdAt: Date.now() });
        // Add to pagesOrder
        const order = await DB.get('settings/pagesOrder') || [];
        order.push(id);
        await DB.update('settings/pagesOrder', order);
        
        // Also add to SYSTEM_PAGES-like local store for rendering
        // We'll use a dynamic pages list
        showToast('✅', 'تم إضافة الصفحة بنجاح', 'success');
        closeAddPageModal();
        renderSystemPages();
    } catch(e) {
        console.error('Add page error:', e);
        showToast('❌', 'فشل إضافة الصفحة', 'error');
    }
});

window.openVisualBuilder = async function(id, title, slug) {
    const modal = document.getElementById('editPageModal');
    if (!modal) return;
    document.getElementById('editPageId').value = id;
    document.getElementById('pageSeoTitle').value = title || '';
    document.getElementById('pageSeoDesc').value = '';
    document.getElementById('pageStatus').value = 'published';
    modal.classList.add('active');
    if (!modal.hasAttribute('data-close-outside')) {
        modal.addEventListener('click', function(e) { if (e.target === this) closePageSettingsModal(); });
        modal.setAttribute('data-close-outside', '1');
    }
    try {
        const settings = await DB.get(`settings/pages/${id}`);
        if (settings) {
            if (settings.title) document.getElementById('pageSeoTitle').value = settings.title;
            if (settings.description) document.getElementById('pageSeoDesc').value = settings.description;
            if (settings.status) document.getElementById('pageStatus').value = settings.status;
        }
    } catch(e) { console.warn('Could not load page settings:', e); }
};

window.togglePageStatus = async function(id, event) {
    if (event) event.stopPropagation();
    try {
        const settings = await DB.get(`settings/pages/${id}`) || {};
        const current = settings.status || 'published';
        const newStatus = current === 'published' ? 'draft' : 'published';
        await DB.update(`settings/pages/${id}`, { status: newStatus });
        renderSystemPages();
        showToast('✅', newStatus === 'published' ? 'تم نشر الصفحة' : 'تم إخفاء الصفحة', 'success');
    } catch(e) {
        console.error('Toggle status error:', e);
        showToast('❌', 'فشل تغيير الحالة', 'error');
    }
};

window.movePageUp = async function(id) {
    const order = await DB.get('settings/pagesOrder') || [];
    const idx = order.indexOf(id);
    if (idx <= 0) {
        // Use cached order if no custom order
        const cachedIdx = _cachedPageOrder.indexOf(id);
        if (cachedIdx <= 0) { showToast('ℹ️', 'هذه أول صفحة', 'info'); return; }
        // Create custom order from cached
        const newOrder = [..._cachedPageOrder];
        const ci = newOrder.indexOf(id);
        [newOrder[ci - 1], newOrder[ci]] = [newOrder[ci], newOrder[ci - 1]];
        await DB.update('settings/pagesOrder', newOrder);
        renderSystemPages();
        return;
    }
    [order[idx - 1], order[idx]] = [order[idx], order[idx - 1]];
    await DB.update('settings/pagesOrder', order);
    renderSystemPages();
};

window.movePageDown = async function(id) {
    const order = await DB.get('settings/pagesOrder') || [];
    const idx = order.indexOf(id);
    if (idx === -1 || idx >= order.length - 1) {
        const cachedIdx = _cachedPageOrder.indexOf(id);
        if (cachedIdx === -1 || cachedIdx >= _cachedPageOrder.length - 1) { showToast('ℹ️', 'هذه آخر صفحة', 'info'); return; }
        const newOrder = [..._cachedPageOrder];
        const ci = newOrder.indexOf(id);
        [newOrder[ci], newOrder[ci + 1]] = [newOrder[ci + 1], newOrder[ci]];
        await DB.update('settings/pagesOrder', newOrder);
        renderSystemPages();
        return;
    }
    [order[idx], order[idx + 1]] = [order[idx + 1], order[idx]];
    await DB.update('settings/pagesOrder', order);
    renderSystemPages();
};

window.deletePage = async function(id, event) {
    const ok = await showConfirmDialog('⚠️ نقل إلى السلة', 'سيتم نقل الصفحة إلى سلة المهملات لمدة 30 يوماً، ويمكنك استعادتها خلال هذه الفترة.', 'نقل للسلة', 'إلغاء');
    if (ok) {
        if(!window.localTrashData) window.localTrashData = { products: {}, orders: {}, pages: {} };
        const localPage = SYSTEM_PAGES.find(p => p.id === id) || { title: 'صفحة مخصصة' };
        window.localTrashData.pages[id] = { status: 'trashed', deletedAt: Date.now(), title: localPage?.title || 'صفحة' };
        updateLocalTrashStorage(); // Persist changes
        
        if (event && event.target) {
            const tr = event.target.closest('tr');
            if (tr) tr.remove();
        } else {
            try {
                const tr = document.querySelector(`button[data-id="${id}"]`)?.closest('tr');
                if (tr) tr.remove();
            } catch(e) {}
        }
        
        try { 
            await DB.update(`settings/pages/${id}`, { status: 'trashed', deletedAt: Date.now() }); 
            showToast('✅', 'تم نقل الصفحة للسلة', 'success');
        } catch(e) {
            console.warn('Firebase update failed, keeping local trashed status:', e);
            showToast('✅', 'تم الحذف محلياً', 'success');
        }
        updateLocalTrashStorage(); // Persist changes
        if(window.renderTrash) window.renderTrash();
    }
};

window.openPageSettings = async function(id) {
    const modal = document.getElementById('editPageModal');
    if (!modal) return;
    const page = SYSTEM_PAGES.find(p => p.id === id) || { title: 'صفحة مخصصة' };
    const settings = await DB.get(`settings/pages/${id}`) || {};
    document.getElementById('editPageId').value = id;
    document.getElementById('pageSeoTitle').value = settings.title || '';
    document.getElementById('pageSeoDesc').value = settings.description || '';
    document.getElementById('pageStatus').value = settings.status || 'published';
    modal.classList.add('active');
};

window.closePageSettingsModal = function() { const m = document.getElementById('editPageModal'); if(m) m.classList.remove('active'); };

document.getElementById('editPageForm')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const id = document.getElementById('editPageId').value;
    const u = { title: document.getElementById('pageSeoTitle').value.trim(), description: document.getElementById('pageSeoDesc').value.trim(), status: document.getElementById('pageStatus').value };
    if (await DB.update(`settings/pages/${id}`, u)) { closePageSettingsModal(); showToast('✅', 'تم حفظ إعدادات الصفحة', 'success'); renderSystemPages(); }
});

// ==================== TRASH SYSTEM (RECYCLE BIN - ENHANCED) ====================
window.localTrashData = window.localTrashData || { products: {}, orders: {}, pages: {} };
let trashCurrentFilter = 'all';
let trashSearchTerm = '';
let trashDaysFilter = 'all';
let trashCategoryFilter = 'all';
let trashPaymentFilter = 'all';
window.trashDateFilter = 'all';
window.trashCustomDate = '';
window.trashCustomDateEnd = '';

window.filterTrash = function(type, btn) {
    trashCurrentFilter = type;
    document.querySelectorAll('#trashControls .filter-btn').forEach(b => b.classList.remove('active'));
    if(btn) btn.classList.add('active');
    renderTrash();
};

window.searchTrash = function(term) {
    trashSearchTerm = term.toLowerCase();
    renderTrash();
};

window.filterTrashAdvanced = function() {
    trashDaysFilter = document.getElementById('trashDaysFilter')?.value || 'all';
    trashCategoryFilter = document.getElementById('trashCategoryFilter')?.value || 'all';
    trashPaymentFilter = document.getElementById('trashPaymentFilter')?.value || 'all';
    
    window.trashDateFilter = document.getElementById('trashDateFilter')?.value || 'all';
    if (window.trashDateFilter === 'custom') {
        openDatePicker(function(startDate, endDate) {
            if (startDate === null) {
                window.trashDateFilter = 'all';
                window.trashCustomDate = '';
                window.trashCustomDateEnd = '';
                document.getElementById('trashDateFilter').value = 'all';
                const el = document.getElementById('trashCustomDate');
                if (el) el.value = '';
                const elEnd = document.getElementById('trashCustomDateEnd');
                if (elEnd) elEnd.value = '';
                renderTrash();
                return;
            }
            window.trashCustomDate = startDate;
            window.trashCustomDateEnd = endDate || startDate;
            const el = document.getElementById('trashCustomDate');
            if (el) el.value = startDate;
            const elEnd = document.getElementById('trashCustomDateEnd');
            if (!elEnd) {
                const inp = document.createElement('input');
                inp.type = 'hidden';
                inp.id = 'trashCustomDateEnd';
                document.body.appendChild(inp);
            }
            document.getElementById('trashCustomDateEnd').value = endDate || startDate;
            renderTrash();
        });
        return;
    }
    renderTrash();
};

window.renderTrash = async function() {
    const container = document.getElementById('trashContainer');
    if (!container) return;
    
    const tableNode = container.closest('.admin-table');

    let controlsDiv = document.getElementById('trashControls');
    if (!controlsDiv && tableNode) {
        controlsDiv = document.createElement('div');
        controlsDiv.id = 'trashControls';
        controlsDiv.innerHTML = `
            <style>
                /* تحسينات شكل الجدول: حدود واضحة، رؤوس بيضاء، وتوسيط شامل */
                .trash-table-fix td { border: 1px solid var(--border-color) !important; vertical-align: middle !important; text-align: center !important; padding: 12px 10px !important; }
                .trash-table-fix th { border: 1px solid var(--border-color) !important; background: rgba(147, 51, 234, 0.2) !important; text-align: center !important; padding: 15px !important; font-weight: 900 !important; color: #fff !important; font-size: 1.1em !important; }
                
                /* توحيد شكل جميع القوائم المنسدلة (Selects) لتطابق الهيدر */
                .trash-select, .admin-main select, .admin-sidebar select, .admin-topbar select, select { 
                    padding: 12px 15px 12px 40px !important; 
                    border-radius: 20px !important; 
                    background: #1a0b2e !important; 
                    color: white !important; 
                    border: 2px solid rgba(147, 51, 234, 0.3) !important; 
                    font-family: inherit !important; 
                    font-weight: 900 !important; 
                    font-size: 0.95em !important; 
                    outline: none !important; 
                    cursor: pointer !important; 
                    transition: all 0.3s ease !important; 
                    appearance: none !important;
                    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='white'%3E%3Cpath d='M7 10l5 5 5-5z'/%3E%3C/svg%3E") !important;
                    background-repeat: no-repeat !important;
                    background-position: left 12px center !important;
                    background-size: 20px !important;
                }
                .trash-select:hover, select:hover { border-color: var(--primary) !important; box-shadow: 0 0 15px rgba(147, 51, 234, 0.3) !important; }
                .trash-select option, select option { background: #1a0b2e; color: white; font-weight: 900; }

                /* توحيد شكل النوافذ المنبثقة (Popups/Modals) لتطابق الهيدر */
                .edit-order-content, .edit-product-content, .custom-modal, .edit-page-modal .edit-product-content {
                    background: #1a0b2e !important;
                    border: 2px solid rgba(147, 51, 234, 0.5) !important;
                    border-radius: 24px !important;
                    color: white !important;
                    box-shadow: 0 25px 70px rgba(0, 0, 0, 0.7), 0 0 50px rgba(147, 51, 234, 0.2) !important;
                }
                .edit-order-header, .custom-modal-title, .edit-form-group label, .edit-order-header h2 {
                    color: #fff !important;
                    border-bottom-color: rgba(147, 51, 234, 0.3) !important;
                }
                .edit-form-group input, .edit-form-group textarea {
                    background: rgba(255, 255, 255, 0.05) !important;
                    color: white !important;
                    border: 1px solid rgba(147, 51, 234, 0.2) !important;
                }
                .custom-modal-message { color: rgba(255,255,255,0.8) !important; }
                
                .price-box-trash { background: rgba(16, 185, 129, 0.1); border: 2px solid rgba(16, 185, 129, 0.3); border-radius: 12px; padding: 10px; text-align: center; width: 100%; display: flex; flex-direction: column; justify-content: center; min-height: 65px; }
                .days-badge { background: rgba(255,255,255,0.05); border: 1px solid var(--border-color); padding: 5px 10px; border-radius: 20px; font-weight: 900; display: inline-block; min-width: 75px; }
                .trash-type-badge { color: #fff !important; font-weight: 900 !important; padding: 6px 12px !important; border-radius: 8px !important; display: inline-block !important; min-width: 80px !important; box-shadow: 0 4px 8px rgba(0,0,0,0.15) !important; }
            </style>
            <div class="filters" style="margin-bottom: 15px; padding: 15px; border-radius: 15px; background: rgba(147, 51, 234, 0.05); display: flex; gap: 10px; flex-wrap: wrap; align-items: center;">
                <div class="filter-search" style="flex: 1; min-width: 200px;">
                    <input type="text" id="trashSearchInput" placeholder="بحث بالاسم، السعر، رقم الطلب..." onkeyup="searchTrash(this.value)" style="width: 100%; padding: 12px 20px; border-radius: 10px; border: 2px solid var(--border-color); background: var(--card-bg); color: var(--text-primary); font-family: inherit; font-weight:bold;">
                </div>
                <button class="filter-btn active" onclick="filterTrash('all', this)">الكل</button>
                <button class="filter-btn" onclick="filterTrash('product', this)">المنتجات</button>
                <button class="filter-btn" onclick="filterTrash('order', this)">الطلبات</button>
                <button class="filter-btn" onclick="filterTrash('page', this)">الصفحات</button>
                <button type="button" class="filter-btn filter-toggle-icon" onclick="this.classList.toggle('active'); document.getElementById('trashAdvancedFilters').classList.toggle('active')" title="فلاتر ذكية">
                    <i class="fas fa-sliders-h"></i>
                </button>
            </div>
            
            <div class="advanced-filters" id="trashAdvancedFilters" style="margin-bottom: 25px; padding: 20px; border-radius: 20px; background: #1a0b2e; border: 2px solid rgba(147, 51, 234, 0.5); gap: 12px; flex-wrap: wrap; align-items: center; box-shadow: 0 10px 30px rgba(0,0,0,0.3);">
                <select id="trashDateFilter" onchange="filterTrashAdvanced()" class="trash-select">
                    <option value="all">📅 تاريخ الحذف (الكل)</option>
                    <option value="today">📅 اليوم</option>
                    <option value="week">📅 هذا الأسبوع</option>
                    <option value="month">📅 هذا الشهر</option>
                    <option value="custom">📅 يوم محدد...</option>
                </select>
                <input type="hidden" id="trashCustomDate" value="">

                <select id="trashDaysFilter" onchange="filterTrashAdvanced()" class="trash-select">
                    <option value="all">⏳ الأيام المتبقية (الكل)</option>
                    <option value="critical">🔴 أقل من 5 أيام (حرج)</option>
                    <option value="week">🟠 أقل من أسبوع</option>
                    <option value="month">🟢 أكثر من أسبوعين</option>
                </select>
                
                <select id="trashCategoryFilter" onchange="filterTrashAdvanced()" class="trash-select">
                    <option value="all">📦 فئات المنتجات (الكل)</option>
                    <option value="books">📚 كتب</option>
                    <option value="software">💻 برامج</option>
                    <option value="formulas">🧪 تركيبات</option>
                    <option value="courses">🎓 كورسات</option>
                </select>
                
                <select id="trashPaymentFilter" onchange="filterTrashAdvanced()" class="trash-select">
                    <option value="all">💳 طرق الدفع للطلبات (الكل)</option>
                    <option value="vodafone">📱 فودافون كاش</option>
                    <option value="instapay">⚡ إنستاباي</option>
                    <option value="bank">🏦 تحويل بنكي</option>
                    <option value="binance">₿ بينانس</option>
                    <option value="paypal">💳 بايبال</option>
                </select>
                
                <button onclick="resetTrashFilters()" class="trash-select" style="background: linear-gradient(135deg, #ef4444, #dc2626) !important; border: none !important; max-width: 150px; flex: 0.5; padding: 12px 15px !important;">
                    <i class="fas fa-sync-alt"></i> إعادة ضبط
                </button>
            </div>
        `;
        tableNode.parentNode.insertBefore(controlsDiv, tableNode);
        tableNode.classList.add('trash-table-fix');
    }

    try {
        let allTrashed = [];
        const now = Date.now();
        const thirtyDays = 30 * 24 * 60 * 60 * 1000;

        // Pages
        let dbPages = {}; try { dbPages = await DB.get('settings/pages') || {}; } catch(e){}
        const mergedPagesSettings = { ...dbPages, ...(window.localTrashData?.pages || {}) };
        
        for (const page of SYSTEM_PAGES) {
            const settings = mergedPagesSettings[page.id] || {};
            if (settings.status === 'trashed') {
                const deletedAt = settings.deletedAt || now;
                const age = now - deletedAt;
                if (age > thirtyDays) { try{await DB.remove(`settings/pages/${page.id}`);}catch(e){} continue; }
                allTrashed.push({
                    ...page,
                    ...settings,
                    type: 'page', id: page.id, title: settings.title || page.title,
                    deletedAt, typeLabel: 'صفحة', badgeClass: 'background:#3b82f6;',
                    searchString: `${settings.title || page.title}`.toLowerCase() 
                });
            }
        }

        // Products
        let dbProducts = {}; try { dbProducts = await DB.get('products') || {}; } catch(e){}
        const mergedProductsData = { ...dbProducts, ...(window.localTrashData?.products || {}) };
        
        for (const [id, p] of Object.entries(mergedProductsData)) {
            if (p.status === 'trashed') {
                const deletedAt = p.deletedAt || now;
                const age = now - deletedAt;
                if (age > thirtyDays) { try{await DB.remove(`products/${id}`);}catch(e){} continue; }
                allTrashed.push({
                    ...p,
                    type: 'product', id: id, title: p.title, category: p.category, 
                    deletedAt, typeLabel: 'منتج', badgeClass: 'background:#9333ea;',
                    searchString: `${p.title} ${p.priceEGP||''} ${p.priceUSD||''}`.toLowerCase()
                });
            }
        }

        // Orders
        let dbOrders = {}; try { dbOrders = await DB.get('orders') || {}; } catch(e){}
        const mergedOrdersData = { ...dbOrders, ...(window.localTrashData?.orders || {}) };
        
        for (const [id, o] of Object.entries(mergedOrdersData)) {
            if (o.status === 'trashed') {
                const deletedAt = o.deletedAt || now;
                const age = now - deletedAt;
                if (age > thirtyDays) { try{await DB.remove(`orders/${id}`);}catch(e){} continue; }
                allTrashed.push({
                    ...o,
                    type: 'order', id: id, title: `طلب #${id} - ${o.customerName || ''}`, 
                    paymentMethod: o.paymentMethod, deletedAt, typeLabel: 'طلب', badgeClass: 'background:#10b981;',
                    searchString: `طلب #${id} ${o.customerName||''} ${o.customerPhone||''} ${o.price||''}`.toLowerCase()
                });
            }
        }

        // فلترة
        if (trashCurrentFilter !== 'all') {
            allTrashed = allTrashed.filter(item => item.type === trashCurrentFilter);
        }
        
        // بحث
        if (trashSearchTerm) {
            allTrashed = allTrashed.filter(item => item.searchString.includes(trashSearchTerm));
        }
        
        // فلترة الأيام المتبقية
        if (trashDaysFilter !== 'all') {
            allTrashed = allTrashed.filter(item => {
                const age = now - item.deletedAt;
                const daysLeft = Math.ceil((thirtyDays - age) / (1000 * 60 * 60 * 24));
                if (trashDaysFilter === 'critical') return daysLeft <= 5;
                if (trashDaysFilter === 'week') return daysLeft <= 7;
                if (trashDaysFilter === 'month') return daysLeft > 14;
                return true;
            });
        }

        // فلترة تاريخ الحذف
        if (window.trashDateFilter && window.trashDateFilter !== 'all') {
            allTrashed = allTrashed.filter(item => {
                const deletedDate = new Date(item.deletedAt);
                const today = new Date();
                if (window.trashDateFilter === 'today') return deletedDate.toDateString() === today.toDateString();
                if (window.trashDateFilter === 'week') { const diff = Math.abs(today - deletedDate); return Math.ceil(diff / (1000 * 60 * 60 * 24)) <= 7; }
                if (window.trashDateFilter === 'month') { const diff = Math.abs(today - deletedDate); return Math.ceil(diff / (1000 * 60 * 60 * 24)) <= 30; }
                if (window.trashDateFilter === 'custom' && window.trashCustomDate) {
                    const selStart = new Date(window.trashCustomDate);
                    if (window.trashCustomDateEnd) {
                        const selEnd = new Date(window.trashCustomDateEnd);
                        selEnd.setHours(23,59,59,999);
                        return deletedDate >= selStart && deletedDate <= selEnd;
                    }
                    return deletedDate.toDateString() === selStart.toDateString();
                }
                return true;
            });
        }
        
        // فلترة فئات المنتجات (تطبق على المنتجات فقط)
        if (trashCategoryFilter !== 'all') {
            allTrashed = allTrashed.filter(item => {
                if (item.type !== 'product') return true;
                return item.category === trashCategoryFilter;
            });
        }
        
        // فلترة طرق الدفع (تطبق على الطلبات فقط)
        if (trashPaymentFilter !== 'all') {
            allTrashed = allTrashed.filter(item => {
                if (item.type !== 'order') return true;
                return item.paymentMethod === trashPaymentFilter;
            });
        }

        let trashHTML = '';
        allTrashed.forEach(item => {
            const age = now - item.deletedAt;
            const daysLeft = Math.ceil((thirtyDays - age) / (1000 * 60 * 60 * 24));
            const deleteDateStr = new Date(item.deletedAt).toLocaleString('ar-EG', { year:'numeric', month:'2-digit', day:'2-digit', hour:'2-digit', minute:'2-digit' });
            
            const imgHTML = item.image ? `<img src="${item.image}" style="width:45px;height:45px;border-radius:10px;object-fit:cover;border:2px solid var(--border-color);flex-shrink:0;">` :
                          (item.type === 'product' ? `<div style="width:45px;height:45px;border-radius:10px;background:rgba(147,51,234,0.1);color:var(--primary);display:flex;align-items:center;justify-content:center;font-size:1.5em;border:2px solid var(--border-color);flex-shrink:0;"><i class="fas ${item.icon || 'fa-box'}"></i></div>` :
                          (item.type === 'order' ? `<div style="width:45px;height:45px;border-radius:10px;background:rgba(16,185,129,0.1);color:#10b981;display:flex;align-items:center;justify-content:center;font-size:1.5em;border:2px solid var(--border-color);flex-shrink:0;"><i class="fas fa-shopping-cart"></i></div>` : ''));

            let priceHTML = '<span style="color:gray; font-size:0.8em;">—</span>'; 
            if (item.type === 'product') { // Only show prices for products
                priceHTML = `
                    <div style="font-weight:900;font-size:1.1em;color:#fff;margin-bottom:8px;padding-bottom:5px;border-bottom:1px solid rgba(255,255,255,0.1);">${item.priceEGP || 0} <span style="font-size:0.8em;">EGP</span></div>
                    <div style="font-weight:900;font-size:1.1em;color:#10b981;">${item.priceUSD || 0} <span style="font-size:0.8em;">USD</span></div>
                `;
            } else if (item.type === 'order') { // Only show price for orders
                priceHTML = `
                    <div style="font-weight:900;font-size:1.1em;color:#10b981;">${item.price || 0} <span style="font-size:0.8em;">${item.currency || ''}</span></div>
                `;
            }

            trashHTML += `
                <tr>
                    <td style="min-width: 250px;padding:16px 10px;">
                        <div style="display:flex; align-items:center; justify-content: center; gap: 12px; padding: 5px;">
                            ${imgHTML}
                            <div style="overflow:hidden; text-align: center;">
                                <div style="font-weight:900; white-space:nowrap; overflow:hidden; text-overflow:ellipsis; color:var(--text-primary); font-size:1.15em;">${item.title}</div>
                            </div>
                        </div>
                    </td>
                    <td style="padding:16px 10px;text-align:center;"><span class="trash-type-badge" style="${item.badgeClass};font-size:14px;padding:8px 14px;">${item.typeLabel}</span></td>
                    <td style="width: 150px;padding:16px 10px;">
                        <div class="price-box-trash">
                            ${priceHTML}
                        </div>
                    </td>
                    <td dir="ltr" style="font-size:1.1em; color:#fff; font-weight:900; text-align:center;padding:16px 10px;">${deleteDateStr}</td>
                    <td style="text-align:center;padding:16px 10px;"><div class="days-badge" style="color:${daysLeft <= 5 ? 'var(--danger)' : 'var(--text-primary)'};font-size:14px;padding:8px 14px;">${daysLeft} يوم</div></td>
                    <td style="text-align:center;">
                        <div style="display:flex;gap:10px;justify-content:center;">
                            <button data-id="${String(item.id).replace(/"/g, '&quot;')}" onclick="restoreItem('${item.type}', this.dataset.id, event)" title="استعادة" style="padding:8px 16px;border-radius:10px;background:rgba(16,185,129,0.15);color:#10b981;border:2px solid rgba(16,185,129,0.3);cursor:pointer;font-size:15px;font-weight:700;transition:all .2s;"><i class="fas fa-undo"></i> استعادة</button>
                            <button data-id="${String(item.id).replace(/"/g, '&quot;')}" onclick="forceDeleteItem('${item.type}', this.dataset.id, event)" title="حذف نهائي" style="padding:8px 16px;border-radius:10px;background:rgba(239,68,68,0.15);color:#ef4444;border:2px solid rgba(239,68,68,0.3);cursor:pointer;font-size:15px;font-weight:700;transition:all .2s;"><i class="fas fa-times"></i> حذف</button>
                        </div>
                    </td>
                </tr>
            `;
        });

        if (!trashHTML) {
            container.innerHTML = `<tr><td colspan="6"><div class="empty-state" style="padding:40px 20px;"><i class="fas fa-dumpster" style="font-size:3em;color:var(--text-secondary);margin-bottom:10px;"></i><h3 style="margin:0;color:var(--text-secondary);">${(trashSearchTerm || trashDaysFilter !== 'all' || trashCategoryFilter !== 'all' || trashPaymentFilter !== 'all' || (window.trashDateFilter && window.trashDateFilter !== 'all')) ? 'لا توجد نتائج تطابق الفلاتر الحالية' : 'السلة فارغة تماماً'}</h3></div></td></tr>`;
        } else {
            container.innerHTML = trashHTML;
        }
    } catch(e) { console.error('Trash error:', e); }
};

// ==================== RESET TRASH FILTERS ====================
window.resetTrashFilters = function() {
    trashDaysFilter = 'all';
    trashCategoryFilter = 'all';
    trashPaymentFilter = 'all';
    window.trashDateFilter = 'all';
    window.trashCustomDate = '';
    window.trashCustomDateEnd = '';
    trashSearchTerm = '';
    trashCurrentFilter = 'all';
    
    // Update UI elements
    if(document.getElementById('trashDaysFilter')) document.getElementById('trashDaysFilter').value = 'all';
    if(document.getElementById('trashCategoryFilter')) document.getElementById('trashCategoryFilter').value = 'all';
    if(document.getElementById('trashPaymentFilter')) document.getElementById('trashPaymentFilter').value = 'all';
    if(document.getElementById('trashDateFilter')) document.getElementById('trashDateFilter').value = 'all';
    if(document.getElementById('trashCustomDate')) document.getElementById('trashCustomDate').value = '';
    if(document.getElementById('trashCustomDateEnd')) document.getElementById('trashCustomDateEnd').value = '';
    if(document.getElementById('trashSearchInput')) document.getElementById('trashSearchInput').value = '';
    
    document.querySelectorAll('#trashControls .filter-btn').forEach((b, i) => { b.classList.toggle('active', i === 0); });

    renderTrash();
    showToast('🔄', 'تم إعادة ضبط الفلاتر', 'info');
};

window.restoreItem = async function(type, id, event) {
    // تحديث الشاشة فوراً
    if (event && event.target) {
        const tr = event.target.closest('tr');
        if (tr) tr.remove();
    } else {
        try {
            const tr = document.querySelector(`button[data-id="${String(id).replace(/"/g, '\\"')}"]`)?.closest('tr');
            if (tr) tr.remove();
        } catch(e) {}
    }
    
    let itemToRestore = null;
    let path = '';
    let newStatus = '';

    if (type === 'page') {
        path = `settings/pages/${id}`;
        newStatus = 'published';
        itemToRestore = { status: newStatus, deletedAt: null }; // تحديث الحالة فقط للصفحات
    } else if (type === 'product') {
        path = `products/${id}`;
        newStatus = 'published';
        itemToRestore = { ...(window.localTrashData?.products?.[id] || {}), status: newStatus, deletedAt: null };
    } else if (type === 'order') {
        path = `orders/${id}`;
        newStatus = 'pending'; // استعادة الطلبات للحالة "قيد الانتظار"
        itemToRestore = { ...(window.localTrashData?.orders?.[id] || {}), status: newStatus, deletedAt: null };
    } else {
        showToast('❌', 'نوع غير معروف للاستعادة', 'error');
        updateLocalTrashStorage(); // Ensure trash state is persisted even on error
        return;
    }

    try {
        // استخدام DB.set للمنتجات والطلبات لاستعادة البيانات الكاملة
        // استخدام DB.update للصفحات لتعديل الإعدادات فقط
        if (type === 'page') {
            await DB.update(path, itemToRestore);
        } else {
            await DB.set(path, itemToRestore);
        }
        
        _removeHidden(type === 'page' ? 'pages' : type + 's', id);
        
        // حذف العنصر من سلة المحذوفات المحلية بعد التأكد من الاستعادة
        if (window.localTrashData && window.localTrashData[type + 's'] && window.localTrashData[type + 's'][id]) {
            delete window.localTrashData[type + 's'][id];
            updateLocalTrashStorage();
        }

        showToast('✅', 'تم الاستعادة بنجاح', 'success');
        
        // إعادة رسم القوائم المعنية
        if (type === 'page') renderSystemPages();
        else if (type === 'product') loadAdminProducts();
        else if (type === 'order') loadAdminOrders();
        
        // تحديث واجهة سلة المحذوفات
        renderTrash();
    } catch(e){ 
        updateLocalTrashStorage(); // Persist changes even on error
        console.error('Restore item error:', e); 
        showToast('❌', 'فشل الاستعادة', 'error'); 
    }
};

window.forceDeleteItem = async function(type, id, event) {
    const ok = await showConfirmDialog('⚠️ حذف نهائي', 'لا يمكن التراجع عن هذا الإجراء! هل أنت متأكد؟', 'حذف نهائي', 'إلغاء');
    if(ok) {
        // تحديث الشاشة فوراً
        if (event && event.target) {
            const tr = event.target.closest('tr');
            if (tr) tr.remove();
        } else {
            try {
                const tr = document.querySelector(`button[data-id="${String(id).replace(/"/g, '\\"')}"]`)?.closest('tr');
                if (tr) tr.remove();
            } catch(e) {}
        }
        
        if(window.localTrashData && window.localTrashData[type+'s'] && window.localTrashData[type+'s'][id]) {
            delete window.localTrashData[type+'s'][id];
            updateLocalTrashStorage(); // Persist changes
        }
        
        const path = type === 'page' ? `settings/pages/${id}` : type === 'product' ? `products/${id}` : `orders/${id}`;
        _addHidden(type === 'page' ? 'pages' : type + 's', id);
        await DB.remove(path);
        
        showToast('✅', 'تم الحذف نهائياً', 'success');
        
        // التأكد من عرض حالة "فارغ" إذا كان هذا آخر عنصر
        const tbody = document.getElementById('trashContainer');
        if (tbody && tbody.children.length === 0) renderTrash();
        updateLocalTrashStorage(); // Persist changes
    }
};

window.emptyTrash = async function() {
    const ok = await showConfirmDialog('⚠️ إفراغ السلة', 'سيتم حذف جميع العناصر في السلة بشكل نهائي ولا يمكن استعادتها!', 'إفراغ نهائي', 'إلغاء');
    if(ok) {
        showToast('⏳', 'جاري إفراغ السلة...', 'info');
        
        try {
            const pagesSettings = await DB.get('settings/pages') || {};
            for (const id in pagesSettings) { if (pagesSettings[id].status === 'trashed') { _addHidden('pages', id); await DB.remove(`settings/pages/${id}`); } }
            const productsData = await DB.get('products') || {};
            for (const id in productsData) { if (productsData[id].status === 'trashed') { _addHidden('products', id); await DB.remove(`products/${id}`); } }
            const ordersData = await DB.get('orders') || {};
            for (const id in ordersData) { if (ordersData[id].status === 'trashed') { _addHidden('orders', id); await DB.remove(`orders/${id}`); } }
        } catch(e) { console.error('Empty trash error:', e); }
        
        window.localTrashData = { products: {}, orders: {}, pages: {} };
        updateLocalTrashStorage();
        
        const container = document.getElementById('trashContainer');
        if (container) {
            container.innerHTML = `<tr><td colspan="6"><div class="empty-state" style="padding:40px 20px;"><i class="fas fa-dumpster" style="font-size:3em;color:var(--text-secondary);margin-bottom:10px;"></i><h3 style="margin:0;color:var(--text-secondary);">السلة فارغة تماماً</h3></div></td></tr>`;
        }
        
        showToast('✅', 'تم إفراغ السلة بالكامل', 'success');
    }
}

// ==================== CHARTS INITIALIZATION ====================
let salesChartInstance = null;
let ordersPieChartInstance = null;

function initDashboardCharts(orders) {
    if(!window.Chart) return;

    // Register datalabels plugin if available
    if(window.ChartDataLabels && !Chart.registry.plugins.get('datalabels')) {
        Chart.register(ChartDataLabels);
    }
    
    const ctxSales = document.getElementById('salesChart');
    const ctxPie = document.getElementById('ordersPieChart');
    if(!ctxSales || !ctxPie) return;

    // Data calculations
    const monthlySales = {};
    let pending = 0, confirmed = 0, rejected = 0;

    orders.forEach(([id, o]) => {
        if(o.status === 'confirmed') confirmed++;
        else if(o.status === 'rejected') rejected++;
        else pending++;

        if(o.status === 'confirmed') {
            const date = new Date(o.createdAt || Date.now());
            const month = date.toLocaleString(currentLang === 'ar' ? 'ar-EG' : currentLang === 'en' ? 'en-US' : 'fr-FR', { month: 'short' });
            if(!monthlySales[month]) monthlySales[month] = 0;
            monthlySales[month] += parseFloat(o.price) || 0;
        }
    });

    // Sales Line Chart
    if(salesChartInstance) salesChartInstance.destroy();
    salesChartInstance = new Chart(ctxSales, {
        type: 'line',
        data: {
            labels: Object.keys(monthlySales).length ? Object.keys(monthlySales) : ['بدون بيانات'],
            datasets: [{
                label: currentLang === 'ar' ? 'المبيعات' : currentLang === 'en' ? 'Sales' : 'Ventes',
                data: Object.keys(monthlySales).length ? Object.values(monthlySales) : [0],
                borderColor: '#9333ea', backgroundColor: 'rgba(147, 51, 234, 0.2)', fill: true, tension: 0.4
            }]
        },
        options: {
            responsive: true, maintainAspectRatio: false,
            plugins: {
                legend: { display: false },
                datalabels: {
                    color: '#9333ea', font: { weight: 'bold', size: 11 },
                    anchor: 'end', align: 'top',
                    formatter: (value) => value > 0 ? value.toLocaleString() : ''
                }
            }
        }
    });

    // Orders Pie Chart
    if(ordersPieChartInstance) ordersPieChartInstance.destroy();
    ordersPieChartInstance = new Chart(ctxPie, {
        type: 'doughnut',
        data: {
            labels: [currentLang === 'ar' ? 'مؤكد' : currentLang === 'en' ? 'Confirmed' : 'Confirmé', currentLang === 'ar' ? 'انتظار' : currentLang === 'en' ? 'Pending' : 'En attente', currentLang === 'ar' ? 'مرفوض' : currentLang === 'en' ? 'Rejected' : 'Rejeté'],
            datasets: [{ data: [confirmed, pending, rejected], backgroundColor: ['#10b981', '#f59e0b', '#ef4444'], borderWidth: 0 }]
        },
        options: {
            responsive: true, maintainAspectRatio: false, cutout: '75%',
            plugins: {
                legend: { position: 'bottom', labels: { color: '#fff' } },
                datalabels: {
                    color: '#fff', font: { weight: 'bold', size: 14 },
                    formatter: (value) => value > 0 ? value : '',
                    anchor: 'center', align: 'center'
                }
            }
        }
    });
}

// VERSION: v126 - Jul 07 2026
// ==================== INITIALIZE APPLICATION ====================
async function initializeApp() {
    console.log('🚀 Initializing BRAVO Store...', { firebaseDB: !!window.firebaseDB, country: userCountry, _countryFromIP: window._countryFromIP });
    history.scrollRestoration = 'manual';
    window.scrollTo(0, 0);
    initializeThemeAndLanguage();
    initLangDropdown();
    initCatsFromStorage();

    // ADMIN PAGE: skip front-end overhead, run only admin essentials
    if (document.body.classList.contains('admin-page')) {
        // Show logout toast if returning from logout
        if (sessionStorage.getItem('bravoAdminJustLoggedOut') === 'true') {
            sessionStorage.removeItem('bravoAdminJustLoggedOut');
            showToast(currentLang === 'ar' ? 'تم الخروج' : currentLang === 'en' ? 'Logged Out' : 'Déconnecté', '✅', 'info');
        }
        // Login form handlers first (elements exist in login-state)
        initAdminLogin();
        if (typeof initializeParticles === 'function') initializeParticles();
        hideLoadingScreen();
        // Firebase + settings (needed for custom credentials + DB listeners)
        await initializeFirebase();
        await loadSystemSettings();
        // Now check login status — Firebase ready, credentials loaded
        checkAdminLoginStatus();
        // Dashboard form init (elements only exist after login-state removed)
        initAddProductForm();
        initEditForms();
        renderAllSuggestionChips();
        console.log('✅ BRAVO Admin initialized');
        return;
    }

    // FAST PATH: load products from localStorage and display IMMEDIATELY
    await loadAllProducts();
    // Also load wishlist & cart from localStorage for instant rendering
    loadGuestData();
    if (typeof displayProducts === 'function' && document.getElementById('productsGrid')) {
        try { var _cat = new URLSearchParams(window.location.search).get('category') || new URLSearchParams(window.location.search).get('cat'); if (_cat && typeof selectCategory === 'function') selectCategory(_cat); } catch(e) {}
        displayProducts();
        _lastProductsHash = _productsHash(allProducts);
    }
    if (window.location.pathname.toLowerCase().includes('wishlist') && window.renderWishlistPage) {
        window.renderWishlistPage();
    }
    if (document.getElementById('cartPageContent') && window.renderCartPage) {
        window.renderCartPage();
    }
    if (typeof initializeParticles === 'function') initializeParticles();

    // FAST SIDEBAR: check auth state from localStorage immediately
    (function() {
        var storedUser = localStorage.getItem(STORAGE_KEYS.user);
        if (storedUser) {
            try {
                var u = JSON.parse(storedUser);
                if (u && (u.uid || u.userId)) {
                    var sm = document.getElementById('switchAccountMobile'), lmob = document.getElementById('logoutMobile'), amob = document.getElementById('accountMobile');
                    if (sm) sm.classList.add('is-visible'); if (lmob) lmob.classList.add('is-visible'); if (amob) amob.classList.add('is-visible');
                    var loginM = document.getElementById('loginMobile'), regM = document.getElementById('registerMobile');
                    if (loginM) loginM.classList.add('is-hidden'); if (regM) regM.classList.add('is-hidden');
                }
            } catch(e) {}
        }
    })();

    hideLoadingScreen();

    // SLOW PATH: Firebase, settings (products listener FIRST so it's not blocked by auth)
    await initializeFirebase();
    await loadSystemSettings(); 
    
    // Start listening to products NOW (before auth, which might hang)
    console.log('📡 Setting up products listener before auth...');
    await loadAllProducts();
    cleanCorruptedProducts().catch(function(){});
    listenToProducts();
    if (typeof displayProducts === 'function' && document.getElementById('productsGrid')) {
        displayProducts();
    }

    // Auth (with timeout to prevent hanging)
    try {
        await Promise.race([
            initializeAuth(),
            new Promise(function(r) { setTimeout(function() { console.warn('⚠️ Auth timeout, continuing without auth'); r(null); }, 8000); })
        ]);
    } catch(e) { console.warn('Auth error:', e); }

    // إعادة عرض طرق الدفع بعد تحميل البيانات من Firebase
    if (window.location.pathname.includes('checkout')) {
        if (typeof loadPaymentMethods === 'function') await loadPaymentMethods();
        if (typeof displayPaymentMethods === 'function') displayPaymentMethods();
    }
    
    // Fallback: استعادة الجلسة من localStorage لو Firebase Auth مش متاح
    if (!currentUser) {
        const storedUser = localStorage.getItem(STORAGE_KEYS.user);
        if (storedUser) {
            try {
                const u = JSON.parse(storedUser);
                const userId = u.uid || u.userId || localStorage.getItem('bravoUserId');
                if (userId) {
                    currentUser = { uid: userId, email: u.email || '', displayName: u.displayName || '', photoURL: u.photoURL || '', emailVerified: !!u.emailVerified, isLocal: true, provider: u.provider || 'local' };
                    window.currentUser = currentUser;
                    loadUserData(userId);
                }
            } catch(e) { console.warn('Failed to restore user from localStorage', e); }
        }
    }
    
    // تنظيف قاعدة البيانات المحلية من البيانات التالفة عند بدء التشغيل
    try {
        // تنظيف سلة الضيف (bravoCart) من العناصر التالفة
        const guestCartRaw = localStorage.getItem(STORAGE_KEYS.cart);
        if (guestCartRaw) {
            const guestCart = JSON.parse(guestCartRaw);
            if (Array.isArray(guestCart)) {
                const clean = guestCart.filter(item => item && item.id && item.id !== 'undefined' && item.title && item.title !== 'undefined' && item.price !== undefined && item.price !== null);
                if (clean.length !== guestCart.length) {
                    localStorage.setItem(STORAGE_KEYS.cart, JSON.stringify(clean));
                    console.log('🧹 [Startup] تم تنظيف سلة الضيف من العناصر التالفة');
                }
            }
        }
        const dbRaw = localStorage.getItem('bravo_local_db');
        if (dbRaw) {
            const db = JSON.parse(dbRaw);
            if (db.carts && typeof db.carts === 'object') {
                Object.keys(db.carts).forEach(uid => {
                    if (Array.isArray(db.carts[uid])) {
                        db.carts[uid] = db.carts[uid].filter(item => item && item.id && item.id !== 'undefined' && item.title && item.title !== 'undefined' && item.price !== undefined && item.price !== null);
                    } else if (db.carts[uid] && typeof db.carts[uid] === 'object') {
                        Object.keys(db.carts[uid]).forEach(itemId => {
                            const item = db.carts[uid][itemId];
                            if (!item || !item.id || item.id === 'undefined' || !item.title || item.title === 'undefined' || item.price === undefined || item.price === null) {
                                delete db.carts[uid][itemId];
                            }
                        });
                    }
                });
            }
            if (db.wishlist && typeof db.wishlist === 'object') {
                Object.keys(db.wishlist).forEach(uid => {
                    if (Array.isArray(db.wishlist[uid])) {
                        db.wishlist[uid] = db.wishlist[uid].filter(item => item && item.id && item.id !== 'undefined' && item.title && item.title !== 'undefined');
                    }
                });
            }
            if (db.products && typeof db.products === 'object') {
                Object.keys(db.products).forEach(pid => {
                    const p = db.products[pid];
                    if (!p || typeof p !== 'object' || !p.title || (p.priceEGP === undefined && p.priceUSD === undefined)) {
                        delete db.products[pid];
                    }
                });
            }
            localStorage.setItem('bravo_local_db', JSON.stringify(db));
            console.log('🧹 [Startup] تم تنظيف قاعدة البيانات المحلية');
        }
    } catch (e) { console.warn('Startup cleanup warning:', e); }
    
    // إزالة أي منتجات سليمة من bravo_hidden (حماية من الإخفاء الخطأ)
    try {
        var _h = JSON.parse(localStorage.getItem('bravo_hidden') || '{}');
        var _db = JSON.parse(localStorage.getItem('bravo_local_db') || '{}');
        if (_h.products && _db.products) {
            var _changed = false;
            Object.keys(_h.products).forEach(function(_hid) {
                var _prod = _db.products[_hid];
                if (_prod && _prod.title && (_prod.priceEGP !== undefined || _prod.priceUSD !== undefined)) {
                    delete _h.products[_hid];
                    _changed = true;
                }
            });
            if (_changed) {
                localStorage.setItem('bravo_hidden', JSON.stringify(_h));
                if (typeof loadAllProducts === 'function') { await loadAllProducts(); }
                if (typeof displayProducts === 'function' && document.getElementById('productsGrid')) displayProducts();
                console.log('🧹 [Startup] تم إزالة منتجات سليمة من bravo_hidden');
            }
        }
    } catch(e) {}
    
    // تنظيف صورة Google من localStorage (نستخدم الصورة المرفوعة يدوياً بس)
    try {
        var _av = localStorage.getItem('userAvatar');
        if (_av && _av.indexOf('http') === 0 && _av.indexOf('firebasestorage') === -1) {
            localStorage.removeItem('userAvatar');
        }
    } catch(e) {}
    
    // تشخيص: فحص bravo_local_db
    try {
        var _dDbRaw = localStorage.getItem('bravo_local_db');
        var _dDb = _dDbRaw ? JSON.parse(_dDbRaw) : {};
        console.log('🔍 bravo_local_db keys:', Object.keys(_dDb));
        if (_dDb.products) {
            console.log('🔍 products count:', Object.keys(_dDb.products).length);
            if (Object.keys(_dDb.products).length > 0) {
                var _sample = Object.entries(_dDb.products)[0];
                console.log('🔍 sample product:', _sample[0], _sample[1]?.title);
            }
        } else {
            console.log('🔍 no products key in bravo_local_db');
            // If bravo_local_db doesn't exist at all, initialize it
            if (!_dDbRaw) {
                _dDb = { products: {} };
                localStorage.setItem('bravo_local_db', JSON.stringify(_dDb));
                console.log('🔧 Created empty bravo_local_db');
            }
            // Try Firebase recovery (non-blocking — fire and forget)
            if (window.firebaseDB && !window._adminAuthFailed) {
                DB.ensureAdminAuth().then(function(_aOk) {
                    var _fDb = window.adminDatabase || database;
                    var _fRef = window.adminFirebaseRef || window.firebaseRef;
                    if (_fDb && _fRef) {
                        Promise.race([
                            window.firebaseGet(_fRef(_fDb, 'products')).catch(function(e){ return e; }),
                            new Promise(function(_, rej){ setTimeout(function(){ rej(new Error('T')); }, 6000); }).catch(function(e){ return e; })
                        ]).then(function(_s) {
                            if (!(_s instanceof Error) && _s.exists && _s.exists()) {
                                var _v = _s.val();
                                if (_v && typeof _v === 'object') {
                                    var _c = JSON.parse(localStorage.getItem('bravo_local_db') || '{}');
                                    _c.products = _v;
                                    localStorage.setItem('bravo_local_db', JSON.stringify(_c));
                                    console.log('✅ Firebase recovered', Object.keys(_v).length, 'products');
                                    allProducts = Object.entries(_v).map(function(e){ return { ...e[1], id: e[0] }; }).filter(function(x){ return x && typeof x === 'object' && x.title && (x.priceEGP !== undefined || x.priceUSD !== undefined); });
                                    if (window.currentLang !== 'ar' && typeof autoTranslateProducts === 'function') {
                                        autoTranslateProducts(window.currentLang).catch(function() {});
                                    }
                                    if (typeof displayProducts === 'function') displayProducts();
                                }
                            }
                        }).catch(function(){ if (typeof displayProducts === 'function' && document.getElementById('productsGrid')) displayProducts(); });
                    }
                }).catch(function(){ if (typeof displayProducts === 'function' && document.getElementById('productsGrid')) displayProducts(); });
            }
        }
    } catch(e) { console.warn('Diagnostic error:', e); }
    
    if (document.getElementById('cartPageContent') && window.renderCartPage) {
        window.renderCartPage();
    }
    if (window.location.pathname.toLowerCase().includes('wishlist') && window.renderWishlistPage) {
        window.renderWishlistPage();
    }
    if (currentLang !== 'ar' && allProducts.length > 0) {
        autoTranslateProducts(currentLang).catch(function(){});
    }
    setActiveMenuItem(); initializeDropdowns(); checkAdmin();
    if (typeof initializeParticles === 'function') initializeParticles();
    if (window.location.pathname.includes('checkout') && typeof getCheckoutOrderData === 'function') { if (typeof displayPaymentMethods === 'function') displayPaymentMethods(); getCheckoutOrderData(); }

    if (document.body.classList.contains('auth-page')) { initializeAuthPage(); }
    if (document.getElementById('ordersList') && window.initOrdersPage) { window.initOrdersPage(); }

    const statsBar = document.querySelector('.hero-stats-bar');
    if (statsBar) { const obs = new IntersectionObserver((entries) => { entries.forEach(entry => { if (entry.isIntersecting) { animateCounters(); obs.unobserve(entry.target); } }); }, { threshold: 0.3 }); obs.observe(statsBar); }
    hideLoadingScreen();
    setupRouter();
    console.log('✅ BRAVO Store initialized');
}

// ==================== PAGE CONTROLLERS (UNIFIED SYSTEM) ====================

// --- 🛒 صفحة السلة (Cart) ---
let _lastCartHash = '';
window.renderCartPage = function() {
    const c = document.getElementById('cartPageContent');
    if (!c) return;
    var cartHash = userCart.map(function(i){ return i.id + ':' + (i.quantity||1); }).join(',');
    if (cartHash === _lastCartHash) return;
    _lastCartHash = cartHash;
    const lang = currentLang || 'ar';
    
    // تنظيف السلة من العناصر التالفة (حماية الواجهة)
    const cleanCart = userCart.filter(item => item && item.id && item.id !== 'undefined' && item.title && item.title !== 'undefined' && (item.price !== undefined && item.price !== null));
    if (cleanCart.length !== userCart.length) {
        userCart = cleanCart;
        localStorage.setItem(STORAGE_KEYS.cart, JSON.stringify(userCart));
    }
    
    if (userCart.length === 0) {
        c.innerHTML = `<div class="empty-cart reveal"><div class="empty-icon">🛒</div><h3 class="empty-title">${lang==='ar'?'السلة فارغة!':lang==='en'?'Cart is empty!':'Panier vide!'}</h3><p class="empty-text">${lang==='ar'?'لم تقم بإضافة أي منتجات بعد':lang==='en'?'No products added yet':'Aucun produit ajouté'}</p><a href="products.html" class="shop-now-btn">${lang==='ar'?'تسوق الآن':lang==='en'?'Shop Now':'Acheter'} 🛍️</a></div>`;
        setTimeout(function(){ if (typeof window.revealDynamicContent === 'function') window.revealDynamicContent(); }, 50);
        return;
    }
    let html = '<div class="cart-grid"><div class="cart-items">';
    let subtotal = 0;
    const totalQty = userCart.reduce((a,b) => a + (b.quantity || 1), 0);
    const cur = getUserCurrency().symbol;
    const catEmojis = { books: '📚', software: '💻', formulas: '🧪', courses: '🎓' };
    userCart.forEach((item, idx) => {
        const full = allProducts.find(p => String(p.id) === String(item.id)) || item;
        const price = parseFloat(getProductPrice(item));
        const oldPriceVal = getProductOldPrice(full) || getProductOldPrice(item) || 0;
        const oldPrice = parseFloat(oldPriceVal);
        const qty = item.quantity || 1;
        const itemTotal = price * qty;
        subtotal += itemTotal;
        const catKey = full.category || item.category || '';
        const catName = APP_CONFIG.categories[lang]?.[catKey] || full.categoryName || item.categoryName || catKey;
        const catEmoji = catEmojis[catKey] || '📦';
        const desc = (getProductText(full, 'description', lang) || getProductText(item, 'description', lang) || '').substring(0, 120);
        const hasOldPrice = oldPrice > price;
        const saveAmount = hasOldPrice ? (oldPrice - price) * qty : 0;
        const badges = generateBadges ? generateBadges(full, lang) : '';
        html += `
            <div class="cart-item reveal">
                <div class="item-image-wrap"><div class="item-image" style="cursor:pointer;" onclick="window.location.href='product-details.html?id=${item.id}'">${item.image ? `<img src="${item.image}" alt="${item.title}">` : `<i class="fas ${full.icon||item.icon||'fa-box'}"></i>`}</div>${badges}</div>
                <div class="item-details">
                    <div class="item-header">
                        <div class="item-header-left">
                            <h3 class="item-title">${getProductText(full, 'title', lang) || item.title}</h3>
                            <span class="item-category">${catEmoji} ${catName}</span>
                        </div>
                    </div>
                    ${desc ? `<p class="item-desc">${desc}${desc.length >= 120 ? '...' : ''}</p>` : ''}
                    <div class="item-footer">
                        <div class="item-price-row">
                            ${hasOldPrice ? `<div class="price-old-save-row"><div class="price-old"><span class="price-old-value">${(oldPrice * qty).toFixed(0)}</span> ${cur}</div><span class="price-save">${lang==='ar'?'وفر':lang==='en'?'Save':'Économisez'} ${saveAmount.toFixed(0)} ${cur}</span></div>` : ''}
                            <div class="price-final"><i class="fas fa-fire animated-fire"></i><span class="price-value">${itemTotal.toFixed(0)}</span><span class="price-currency">${cur}</span></div>
                        </div>
                        <div class="item-actions">
                            <div class="quantity-control">
                                <button class="qty-btn minus" onclick="updateCartQuantity('${item.id}', -1, event)">−</button>
                                <input type="number" class="qty-value" value="${qty}" min="1" max="10" onchange="setCartQuantity('${item.id}', this.value, event)">
                                <button class="qty-btn plus" onclick="updateCartQuantity('${item.id}', 1, event)">+</button>
                            </div>
                            <button class="remove-btn" onclick="removeFromCart('${item.id}', event)" title="${lang==='ar'?'إزالة':lang==='en'?'Remove':'Supprimer'}">🗑️</button>
                        </div>
                    </div>
                </div>
            </div>`;
    });
    const total = subtotal;
    html += `</div><div class="cart-summary reveal">
        <h2 class="summary-title"><span class="summary-title-text">${lang==='ar'?'ملخص الطلب':lang==='en'?'Order Summary':'Récapitulatif'}</span> <span class="emoji">📋</span></h2>
        <div class="summary-row" id="cartSummaryRow"><span>${lang==='ar'?'عدد المنتجات':lang==='en'?'Items':'Articles'}</span><span class="summary-value" id="cartSummaryCount">${totalQty}</span></div>
        <div class="summary-divider"></div>
        <div class="digital-notice"><i class="fas fa-download"></i> ${lang==='ar'?'منتجات رقمية - لا يتطلب شحن':lang==='en'?'Digital Products - No Shipping':'Numérique - Pas de livraison'}</div>
        <div class="cart-price-final">
            <span class="total-label">${lang==='ar'?'الإجمالي':lang==='en'?'Total':'Total'}</span>
            <div class="final-price-wrap">
                <i class="fas fa-fire animated-fire"></i>
                <span class="price-value">${total.toFixed(0)}</span>
                <span class="price-currency">${cur}</span>
            </div>
        </div>
        <button class="checkout-btn" onclick="proceedToCheckoutLocal()">${lang==='ar'?'إتمام الطلب':lang==='en'?'Checkout':'Paiement'} 🔒</button>
    </div></div>
    <div class="cart-footer reveal">
        <a href="index.html" class="back-home-btn"><i class="fas fa-arrow-right"></i> ${lang==='ar'?'العودة للرئيسية':lang==='en'?'Back to Home':'Retour à l\'accueil'}</a>
        <a href="products.html" class="continue-shop-btn"><i class="fas fa-store"></i> ${lang==='ar'?'متابعة التسوق':lang==='en'?'Continue Shopping':'Continuer'}</a>
    </div>`;
    c.innerHTML = html;
    setTimeout(function(){ if (typeof window.revealDynamicContent === 'function') window.revealDynamicContent(); }, 50);
};

window.updateCartQuantity = async function(id, change, event) {
    if (event) event.stopPropagation();
    const item = userCart.find(i => i.id === id);
    if (!item) return;
    const nq = (item.quantity || 1) + change;
    if (nq < 1) return window.removeFromCart(id);
    if (nq > 10) return showToast('⚠️', (document.documentElement.lang === 'ar' ? 'الحد الأقصى 10 قطع' : document.documentElement.lang === 'en' ? 'Max 10 items' : 'Max 10 articles'), 'warning');
    item.quantity = nq;
    if (currentUser) await DB.update(`carts/${currentUser.uid}/${id}`, { quantity: nq });
    localStorage.setItem(STORAGE_KEYS.cart, JSON.stringify(userCart));
    if(window.renderCartPage) window.renderCartPage(); 
    updateCartBadge(); loadCartDropdown();
};

window.setCartQuantity = function(id, val, event) {
    if (event) event.stopPropagation();
    const item = userCart.find(i => i.id === id);
    if (!item) return;
    let nq = parseInt(val);
    if (isNaN(nq) || nq < 1) nq = 1;
    if (nq > 10) nq = 10;
    item.quantity = nq;
    if (currentUser) DB.update(`carts/${currentUser.uid}/${id}`, { quantity: nq });
    localStorage.setItem(STORAGE_KEYS.cart, JSON.stringify(userCart));
    if (window.renderCartPage) window.renderCartPage();
    updateCartBadge(); loadCartDropdown();
};

window.mergeGuestCartToUser = async function(userId) {
    if (!userId) { console.error("❌ [Merge] لا يوجد userId!"); return; }
    try {
        console.log("🔄 [Merge] === بدء دمج السلة ===");
        const guestCartRaw = localStorage.getItem(STORAGE_KEYS.cart);
        if (!guestCartRaw) { console.log("✅ [Merge] لا توجد سلة ضيف."); return; }
        const guestCart = JSON.parse(guestCartRaw);
        if (!Array.isArray(guestCart) || guestCart.length === 0) { console.log("✅ [Merge] سلة الضيف فارغة."); return; }
        console.log("🛒 [Merge] سلة الضيف:", guestCart);

        const fbCartRaw = await DB.get(`carts/${userId}`);
        console.log("☁️ [Merge] سلة المستخدم الحالية:", fbCartRaw);

        let fbCart = {};
        if (Array.isArray(fbCartRaw)) fbCartRaw.forEach(i => { if(i?.id) fbCart[i.id] = i; });
        else if (fbCartRaw && typeof fbCartRaw === 'object') fbCart = fbCartRaw;

        const merged = { ...fbCart };
        guestCart.forEach(item => { if (item?.id) merged[item.id] = item; });
        
        // تنظيف السلة: إزالة العناصر التالفة (null, undefined, أو ناقصة id/title/price)
        const mergedArray = Object.values(merged).filter(item => 
            item && item.id && item.id !== 'undefined' && item.title && item.title !== 'undefined' && (item.price !== undefined && item.price !== null)
        );
        console.log("🔀 [Merge] السلة المدمجة (بعد التنظيف):", mergedArray);

        // تحويل المصفوفة إلى كائن keyed by productId للتوافق مع addToCart/removeFromCart
        const mergedObject = {};
        mergedArray.forEach(item => { if (item && item.id) mergedObject[item.id] = item; });
        await DB.set(`carts/${userId}`, mergedObject);
        console.log("💾 [Merge] تم الحفظ في قاعدة البيانات (ككائن).");

        localStorage.removeItem(STORAGE_KEYS.cart);
        userCart = mergedArray;
        if (window.updateCartBadge) window.updateCartBadge();
        if (window.renderCartPage) window.renderCartPage();
        console.log("🎉 [Merge] === تم الدمج بنجاح ===");
    } catch (e) { console.error('❌ [Merge] خطأ:', e); alert((document.documentElement.lang === 'ar' ? 'خطأ في دمج السلة: ' : document.documentElement.lang === 'en' ? 'Error merging cart: ' : 'Erreur de fusion du panier: ') + e.message); }
};

window.mergeGuestWishlistToUser = async function(userId) {
    if (!userId) return;
    try {
        console.log("🔄 [Merge] === بدء دمج المفضلة ===");
        const guestWishlistRaw = localStorage.getItem(STORAGE_KEYS.wishlist);
        if (!guestWishlistRaw) { console.log("✅ [Merge] لا توجد مفضلة ضيف."); return; }
        const guestWishlist = JSON.parse(guestWishlistRaw);
        if (!Array.isArray(guestWishlist) || guestWishlist.length === 0) { console.log("✅ [Merge] مفضلة الضيف فارغة."); return; }
        console.log("❤️ [Merge] مفضلة الضيف:", guestWishlist);

        const fbWishlistRaw = await DB.get(`wishlist/${userId}`);
        console.log("☁️ [Merge] مفضلة المستخدم الحالية:", fbWishlistRaw);

        let fbWishlist = [];
        if (Array.isArray(fbWishlistRaw)) fbWishlist = fbWishlistRaw;
        else if (fbWishlistRaw && typeof fbWishlistRaw === 'object') fbWishlist = Object.values(fbWishlistRaw);

        const merged = [...fbWishlist];
        guestWishlist.forEach(item => { if (item?.id && !merged.find(i => i.id === item.id)) merged.push(item); });
        
        // تنظيف المفضلة
        const cleanMerged = merged.filter(item => item && item.id && item.id !== 'undefined' && item.title && item.title !== 'undefined');
        console.log("🔀 [Merge] المفضلة المدمجة (بعد التنظيف):", cleanMerged);

        await DB.set(`wishlist/${userId}`, cleanMerged);
        console.log("💾 [Merge] تم حفظ المفضلة.");

        localStorage.removeItem(STORAGE_KEYS.wishlist);
        userWishlist = cleanMerged;
        if (window.renderWishlistPage) window.renderWishlistPage();
        console.log("🎉 [Merge] === تم دمج المفضلة بنجاح ===");
    } catch (e) { console.error('❌ [Merge Wishlist] خطأ:', e); }
};

window.proceedToCheckoutLocal = function() {
    if (userCart.length === 0) return;
    let total = 0; const items = {};
    userCart.forEach(i => {
        const p = parseFloat(getProductPrice(i)) || 0;
        total += (p * (i.quantity || 1));
        items[i.id] = i;
    });
    // حفظ بيانات السلة في sessionStorage قبل أي تحويل (حتى لو زائر)
    sessionStorage.setItem('cartCheckout', JSON.stringify({ 
        items, total, currency: getUserCurrency().currency, userCountry, 
        userId: currentUser?.uid || 'guest', 
        userEmail: currentUser?.email || '' 
    }));
    if (!currentUser) { 
        showToast('⚠️', 'سجل الدخول أولاً لإتمام الطلب', 'warning'); 
        return window.location.href = 'auth.html?redirect=checkout.html'; 
    }
    window.location.href = 'checkout.html';
};

// --- ❤️ صفحة المفضلة (Wishlist) ---
let _lastWishlistHash = '';
window.renderWishlistPage = function() {
    const grid = document.getElementById('productsGrid');
    const empty = document.getElementById('emptyState');
    const actions = document.getElementById('wishlistActions');
    if (!grid || !actions) return;
    var wlHash = userWishlist.map(function(i){ return i.id; }).join(',');
    if (wlHash === _lastWishlistHash) return;
    _lastWishlistHash = wlHash;
    if (userWishlist.length === 0) { 
        grid.style.display = 'none'; if (actions) actions.style.display = 'none'; if (empty) empty.style.display = 'block'; 
        return; 
    }
    if (empty) empty.style.display = 'none';
    if (actions) actions.style.display = 'flex';
    grid.style.display = 'grid';
    
    const lang = currentLang || 'ar';

    let html = '';
    userWishlist.forEach((p, i) => {
        const full = allProducts.find(x => String(x.id) === String(p.id)) || p;
        const price = userCountry === 'EG' && window._countryFromIP ? (full.priceEGP || p.priceEGP || full.price || p.price) : (full.priceUSD || p.priceUSD || full.price || p.price);
        html += generateProductCardHTML(full, i, { lang, userCountry, price, alwaysWishlisted: true });
    });

    grid.innerHTML = html;

    grid.querySelectorAll('.product-card').forEach(function(card) {
        var idx = parseInt(card.getAttribute('data-reveal-index'), 10);
        var p = userWishlist[idx];
        if (p) {
            card.addEventListener('click', function(e) {
                if (!e.target.closest('.product-btn') && !e.target.closest('.wishlist-btn-card') && !e.target.closest('.quick-view-btn') && !e.target.closest('.quick-view-overlay')) {
                    window.location.href = 'product-details.html?id=' + p.id;
                }
            });
        }
    });

    const c = document.getElementById('wishlistCount'); if (c) c.textContent = userWishlist.length;
    setTimeout(function(){ if (typeof window.revealDynamicContent === 'function') window.revealDynamicContent(); }, 50);
};

window.addAllToCart = function() {
    if (userWishlist.length === 0) return;
    var _wlLang = currentLang || 'ar';
    let count = 0;
    userWishlist.forEach(item => { if (!isInCart(item.id)) { addToCart(item.id); count++; } });
    if(count > 0) showToast('✅', _wlLang==='ar'?'تم إضافة '+count+' منتج للسلة':_wlLang==='en'?count+' products added to cart':count+' produits ajoutés au panier', 'success');
    else showToast('ℹ️', _wlLang==='ar'?'جميع المنتجات موجودة في السلة بالفعل':_wlLang==='en'?'All products already in cart':'Tous les produits déjà dans le panier', 'info');
};

window.clearWishlistLocal = async function() {
    var _wlLang = currentLang || 'ar';
    if (!confirm(_wlLang==='ar'?'⚠️ هل أنت متأكد من مسح جميع المنتجات من المفضلة؟':_wlLang==='en'?'⚠️ Are you sure you want to clear all wishlist items?':'⚠️ Voulez-vous vraiment vider la liste ?')) return;
    userWishlist = [];
    if (currentUser) await DB.remove(`wishlists/${currentUser.uid}`);
    localStorage.setItem(STORAGE_KEYS.wishlist, '[]');
    renderWishlistPage(); updateWishlistBadge(); loadWishlistDropdown();
    showToast('✅', _wlLang==='ar'?'تم مسح المفضلة':_wlLang==='en'?'Wishlist cleared':'Liste vidée', 'success');
};

// --- 📦 صفحة الطلبات (Orders) ---
let _ordersInitCalled = false;
let _lastOrdersVersion = 0;
window.initOrdersPage = async function() {
    if (_ordersInitCalled) return;
    _ordersInitCalled = true;
    // Hide loading instantly — show empty state while auth loads
    const ls = document.getElementById('loadingState'); if(ls) ls.style.display = 'none';
    window.renderOrdersList([]);
    if (!currentUser) {
        await new Promise(r => { let i = setInterval(() => { if (currentUser) { clearInterval(i); r(); } }, 50); setTimeout(() => { clearInterval(i); r(); }, 3000); });
        if (!currentUser) return window.location.href = 'auth.html?redirect=orders.html';
    }
    window._lastOrdersDataHash = '';
    DB.on(`orders`, async (data) => {
        const ls2 = document.getElementById('loadingState'); if(ls2) ls2.style.display = 'none';
        if (!data) { 
            window.renderOrdersList([]); 
            updateOrdersBadge();
            return; 
        }
        
        window._lastOrdersVersion = (window._lastOrdersVersion || 0) + 1;
        const _v = window._lastOrdersVersion;
        
        const entries = Object.entries(data);
        let myOrders = entries.map(([id, o]) => ({...o, id})).filter(o => o.userId === currentUser.uid);
        myOrders.sort((a,b) => b.createdAt - a.createdAt);
        
        // Render immediately with basic data (no enrichment delay)
        window.myOrders = myOrders.filter(o => o.status !== 'trashed');
        try { localStorage.setItem(STORAGE_KEYS.ordersCount, String(window.myOrders.length)); } catch(e) {}
        const dc = window.myOrders.length;
        ['ordersBadgeMobile','ordersBadge'].forEach(id => {
            const e = document.getElementById(id);
            if(e) { e.textContent = dc > 99 ? '99+' : dc; e.style.display = dc > 0 ? 'flex' : 'none'; }
        });
        updateOrdersBadge();
        document.getElementById('totalOrders').textContent = window.myOrders.length;
        document.getElementById('completedOrders').textContent = window.myOrders.filter(o => o.status === 'confirmed').length;
        document.getElementById('pendingOrders').textContent = window.myOrders.filter(o => o.status === 'pending' || o.status === 'suspended').length;
        document.getElementById('totalSpent').textContent = window.myOrders.filter(o => o.status === 'confirmed').reduce((s, o) => s + parseFloat(o.price || 0), 0).toFixed(0);
        
        const _newHash = myOrders.map(o => o.id + ':' + o.status + ':' + o.price + ':' + (o.productImage || '') + ':' + (o.downloadLink || '')).join('|');
        const _hashChanged = _newHash !== window._lastOrdersDataHash;
        window._lastOrdersDataHash = _newHash;
        if (_hashChanged) _execOrdersSearch();
        
        // Enrich in background (parallel, non-blocking)
        let _enriched = false;
        const enrichPromises = myOrders.map(async (o) => {
            if (o.items && typeof o.items === 'object') {
                const keys = Object.keys(o.items);
                if (keys.length > 0) {
                    const first = o.items[keys[0]];
                    if (!o.productImage && first.image) o.productImage = first.image;
                    if (!o.productCategory && first.category) o.productCategory = first.category;
                    if (!o.productTitle && first.title) o.productTitle = first.title;
                    if (isNaN(parseFloat(o.price)) && first.price) o.price = first.price;
                }
            }
            let pid = o.productId;
            if ((!pid || pid === 'cart_checkout' || pid === 'N/A') && o.items && typeof o.items === 'object') {
                const itemKeys = Object.keys(o.items);
                if (itemKeys.length > 0) pid = itemKeys[0];
            }
            if (pid && pid !== 'cart_checkout' && pid !== 'N/A') {
                try {
                    const p = await DB.get(`products/${pid}`);
                    if (p) {
                        if (!o.productImage && p.image) o.productImage = p.image;
                        if (!o.productCategory && p.category) o.productCategory = p.category;
                        if (!o.productTitle && p.title) o.productTitle = p.title;
                        if (isNaN(parseFloat(o.price)) && p.priceEGP) o.price = p.priceEGP;
                        if (!o.productOldPriceEGP && p.oldPriceEGP) o.productOldPriceEGP = p.oldPriceEGP;
                        if (!o.productOldPriceUSD && p.oldPriceUSD) o.productOldPriceUSD = p.oldPriceUSD;
                        if (p.downloadLink && p.downloadLink !== '#') { o._dlFallback = p.downloadLink; if (!o.downloadLink) o.downloadLink = p.downloadLink; }
                        if (!o.productBadge) o.productBadge = p.badge || '';
                        if (!o.productHot && (p.hot || p.bestseller || p.badge === 'hot')) o.productHot = true;
                        if (!o.productFeatured && (p.featured || p.badge === 'featured')) o.productFeatured = true;
                    }
                } catch(e) {}
            }
            if (o.items && typeof o.items === 'object') {
                const keys = Object.keys(o.items);
                const itemPromises = Object.entries(o.items).map(async ([ik, iv]) => {
                    if (iv && (!iv.image || iv.image === '') && iv.id && iv.id !== 'cart_checkout') {
                        try {
                            const ip = await DB.get(`products/${iv.id}`);
                            if (ip && ip.image) { iv.image = ip.image; }
                        } catch(e) {}
                    }
                });
                await Promise.all(itemPromises);
                if (keys.length > 0) {
                    const first = o.items[keys[0]];
                    if (!o.productBadge) o.productBadge = first.badge || '';
                    if (!o.productHot && (first.hot || first.bestseller || first.badge === 'hot')) o.productHot = true;
                    if (!o.productFeatured && (first.featured || first.badge === 'featured')) o.productFeatured = true;
                    if (!o.productHot && !o.productFeatured) {
                        const badgePromises = keys.map(async (itemKey) => {
                            const item = o.items[itemKey];
                            const bpid = item.id || item.productId || itemKey;
                            if (bpid && bpid !== 'cart_checkout') {
                                try {
                                    const p = await DB.get(`products/${bpid}`);
                                    if (p) {
                                        if (!o.productBadge) o.productBadge = p.badge || '';
                                        if (!o.productHot && (p.hot || p.bestseller || p.badge === 'hot')) o.productHot = true;
                                        if (!o.productFeatured && (p.featured || p.badge === 'featured')) o.productFeatured = true;
                                    }
                                } catch(e) {}
                            }
                        });
                        await Promise.all(badgePromises);
                    }
                }
            }
        });
        
        await Promise.all(enrichPromises);
        
        if (_v !== window._lastOrdersVersion) return;
        
        window.myOrders = myOrders.filter(o => o.status !== 'trashed');
        try { localStorage.setItem(STORAGE_KEYS.ordersCount, String(window.myOrders.length)); } catch(e) {}
        
        const _enrichedHash = myOrders.map(o => o.id + ':' + o.status + ':' + o.price + ':' + (o.productImage || '') + ':' + (o.downloadLink || '')).join('|');
        document.getElementById('totalOrders').textContent = window.myOrders.length;
        document.getElementById('completedOrders').textContent = window.myOrders.filter(o => o.status === 'confirmed').length;
        document.getElementById('pendingOrders').textContent = window.myOrders.filter(o => o.status === 'pending' || o.status === 'suspended').length;
        document.getElementById('totalSpent').textContent = window.myOrders.filter(o => o.status === 'confirmed').reduce((s, o) => s + parseFloat(o.price || 0), 0).toFixed(0);
        
        if (_enrichedHash !== window._lastOrdersDataHash) {
            window._lastOrdersDataHash = _enrichedHash;
            window.initOrdersPriceSlider();
            _execOrdersSearch();
        }
    });
};

window.renderOrdersList = function(orders) {
    const list = document.getElementById('ordersList'); const empty = document.getElementById('emptyState');
    if(!list || !empty) { console.warn('renderOrdersList: list or empty missing'); return; }
    if (orders.length === 0) { list.style.display = 'none'; empty.style.display = 'block'; return; }
    empty.style.display = 'none'; list.style.display = 'grid';
    const catEmojis = { books: '📚', software: '💻', formulas: '🧪', courses: '🎓' };
    const catColors = { books:'#3b82f6', software:'#8b5cf6', formulas:'#f59e0b', courses:'#10b981' };
    const cats = APP_CONFIG.categories;
    const dayNamesAr = ['الأحد','الإثنين','الثلاثاء','الأربعاء','الخميس','الجمعة','السبت'];
    const dayNamesEn = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
    const dayNamesFr = ['Dimanche','Lundi','Mardi','Mercredi','Jeudi','Vendredi','Samedi'];
    const userCountry = localStorage.getItem('userCountry') || 'EG';
    const lang = document.documentElement.lang || 'ar';
    const _i18n = {
        products: lang === 'ar' ? 'المنتجات' : lang === 'en' ? 'Products' : 'Produits',
        orderNum: lang === 'ar' ? 'رقم الطلب' : lang === 'en' ? 'Order #' : 'Commande #',
        payment: lang === 'ar' ? 'طريقة الدفع' : lang === 'en' ? 'Payment' : 'Paiement',
        category: lang === 'ar' ? 'الفئة' : lang === 'en' ? 'Category' : 'Catégorie',
        date: lang === 'ar' ? 'التاريخ' : lang === 'en' ? 'Date' : 'Date',
        price: lang === 'ar' ? 'السعر' : lang === 'en' ? 'Price' : 'Prix',
        saved: lang === 'ar' ? 'وفر' : lang === 'en' ? 'Save' : 'Économisez',
        adminNote: lang === 'ar' ? 'ملاحظة المشرف' : lang === 'en' ? 'Admin Note' : 'Note admin',
        download: lang === 'ar' ? 'تحميل المنتج' : lang === 'en' ? 'Download Product' : 'Télécharger',
        track: lang === 'ar' ? 'متابعة الطلب' : lang === 'en' ? 'Track Order' : 'Suivre la commande',
        support: lang === 'ar' ? 'الدعم' : lang === 'en' ? 'Support' : 'Support',
        copyId: lang === 'ar' ? 'نسخ الرقم' : lang === 'en' ? 'Copy ID' : 'Copier ID',
        unclassified: lang === 'ar' ? 'غير مصنف' : lang === 'en' ? 'Uncategorized' : 'Non classé',
        step1Title: lang === 'ar' ? 'تم إرسال الطلب' : lang === 'en' ? 'Order Placed' : 'Commande passée',
        step1Sub: lang === 'ar' ? 'تم استلام طلبك' : lang === 'en' ? 'Order received' : 'Commande reçue',
        step2Review: lang === 'ar' ? 'تمت المراجعة' : lang === 'en' ? 'Reviewed' : 'Examinée',
        step2Reviewing: lang === 'ar' ? 'جاري المراجعة' : lang === 'en' ? 'Under Review' : 'En cours',
        step2Pending: lang === 'ar' ? '⏳ في الانتظار' : lang === 'en' ? '⏳ Pending' : '⏳ En attente',
        step2SubDone: lang === 'ar' ? 'تم التحقق من الدفع' : lang === 'en' ? 'Payment verified' : 'Paiement vérifié',
        step2SubDoing: lang === 'ar' ? 'نراجع بيانات الدفع...' : lang === 'en' ? 'Reviewing payment...' : 'Vérification...',
        step3Confirmed: lang === 'ar' ? '✅ تم التأكيد' : lang === 'en' ? '✅ Confirmed' : '✅ Confirmée',
        step3Rejected: lang === 'ar' ? '❌ تم الرفض' : lang === 'en' ? '❌ Rejected' : '❌ Rejetée',
        step3Suspended: lang === 'ar' ? '🟣 معلق' : lang === 'en' ? '🟣 Suspended' : '🟣 Suspendue',
        step3Pending: lang === 'ar' ? '⏳ في الانتظار' : lang === 'en' ? '⏳ Pending' : '⏳ En attente',
        step3SubDone: lang === 'ar' ? 'تم تأكيد طلبك بنجاح' : lang === 'en' ? 'Order confirmed successfully' : 'Commande confirmée',
        step3SubRej: lang === 'ar' ? 'يرجى التواصل مع الدعم' : lang === 'en' ? 'Please contact support' : 'Veuillez contacter le support',
        step3SubSus: lang === 'ar' ? 'الطلب معلق للمراجعة' : lang === 'en' ? 'Order suspended for review' : 'Commande suspendue',
        receipt: lang === 'ar' ? 'صورة الإيصال' : lang === 'en' ? 'Receipt Image' : 'Image du reçu'
    };
    orders = orders.filter(o => o && o.id);

    const cards = [];
    for (const o of orders) {
        try {
        const dayNames = lang === 'ar' ? dayNamesAr : lang === 'en' ? dayNamesEn : dayNamesFr;
        const dtLocale = lang === 'ar' ? 'ar-EG' : lang === 'en' ? 'en-US' : 'fr-FR';
        const dt = o.createdAt ? new Date(o.createdAt) : null;
        const fullDate = dt && !isNaN(dt.getTime()) ? `${dayNames[dt.getDay()] || ''} - ${dt.toLocaleDateString(dtLocale)} - ${lang === 'ar' ? 'الساعة' : lang === 'en' ? 'at' : 'à'} ${dt.toLocaleTimeString(dtLocale, {hour:'2-digit',minute:'2-digit'})}` : '—';
        const pmKey = o.paymentMethod || '';
        const pmName = PAYMENT_ACCOUNTS[pmKey]?.name?.[lang] || PAYMENT_ACCOUNTS[pmKey]?.name?.ar || o.paymentMethodName || pmKey || '';
        const pmLogo = PAYMENT_ACCOUNTS[pmKey]?.logo || '';
        let orderOldPrice = userCountry === 'EG' && window._countryFromIP ? (o.productOldPriceEGP || o.oldPriceEGP) : (o.productOldPriceUSD || o.oldPriceUSD);
        if (!orderOldPrice && o.items && typeof o.items === 'object') {
            orderOldPrice = Object.values(o.items).reduce((sum, item) => {
                const old = parseFloat(getProductOldPrice(item));
                return sum + (old > parseFloat(item.price || 0) ? old : 0);
            }, 0);
        }
        const oldPrice = parseFloat(orderOldPrice || 0);
        const currentPrice = parseFloat(o.price || 0);
        const hasDiscount = oldPrice > 0 && oldPrice > currentPrice;
        const savings = hasDiscount ? oldPrice - currentPrice : 0;
        const savingsPercent = hasDiscount ? Math.round((savings / oldPrice) * 100) : 0;
        // Badges on image
        let discBadge = '', specBadge = '';
        if (hasDiscount) {
            discBadge = `<div class="discount-badge"><span class="discount-text">${lang === 'ar' ? 'خصم' : lang === 'en' ? 'OFF' : 'RÉDUCTION'}</span><span class="discount-percent">${savingsPercent}%</span></div>`;
        }
        if (o.productHot) {
            specBadge = `<span class="special-badge hot-badge"><i class="fas fa-fire"></i> ${lang === 'ar' ? 'الأكثر مبيعاً' : lang === 'en' ? 'BESTSELLER' : 'MEILLEURE VENTE'}</span>`;
        } else if (o.productFeatured) {
            specBadge = `<span class="special-badge featured-badge"><i class="fas fa-crown"></i> ${lang === 'ar' ? 'مميز' : lang === 'en' ? 'FEATURED' : 'EN VEDETTE'}</span>`;
        }
        const badgesHTML = (discBadge || specBadge) ? `<div class="badge-column">${discBadge}${specBadge}</div>` : '';
        // ----
        const cat = o.productCategory || o.category || '';
        const displayCurrency = (o.currency === 'جنيه' || o.currency === 'EGP') ? (lang === 'ar' ? 'جنيه' : 'EGP') : (o.currency || 'EGP');
        const catName = cats?.[lang]?.[cat] || cat || _i18n.unclassified;
        const catEmoji = catEmojis[cat] || '📦';
        const catColor = catColors[cat] || '#8b5cf6';
        const idStr = String(o.id || '');
        const orderIdShort = idStr.length > 8 ? idStr.slice(-8).toUpperCase() : idStr.toUpperCase();
        const imgUrl = o.productImage || o.image || '';
        // Fix cart-based data — show ALL items
        let displayTitle = (typeof o.productTitle === 'string' && _isArabic(o.productTitle)) ? _getTranslation(o.productTitle, lang) : (o.productTitle || o.id);
        let displayImg = imgUrl;
        if (o.items && typeof o.items === 'object') {
            const keys = Object.keys(o.items).filter(k => o.items[k] && o.items[k].title);
            if (keys.length > 0) {
                const first = o.items[keys[0]];
                if (!displayImg && first.image) displayImg = first.image;
                if (keys.length > 1) {
                    displayTitle = keys.length + ' ' + (lang === 'ar' ? 'منتجات' : lang === 'en' ? 'products' : 'produits');
                } else {
                    var firstTitle = first.title || o.productTitle;
                    displayTitle = (typeof firstTitle === 'string' && _isArabic(firstTitle)) ? _getTranslation(firstTitle, lang) : firstTitle;
                }
            }
        }
        const finalImgUrl = displayImg;
        const userItemsHtml = buildOrderItemsHtml(o, { compact: true });
        const hasReceipt = !!o.receiptImageUrl;

        const s1Done = true;
        const s2Done = o.status === 'confirmed' || o.status === 'rejected' || o.status === 'suspended';
        const s2Active = o.status === 'pending' || o.status === 'suspended';
        const s3Done = o.status === 'confirmed';
        const s3Rejected = o.status === 'rejected';
        const s3Suspended = o.status === 'suspended';

        const _statusColors = {
            confirmed: { border:'#047857', bg:'rgba(4,120,87,0.18)', header:'rgba(4,120,87,0.25)', id:'#047857', shadow:'rgba(4,120,87,0.4)' },
            rejected: { border:'#dc2626', bg:'rgba(220,38,38,0.18)', header:'rgba(220,38,38,0.25)', id:'#dc2626', shadow:'rgba(220,38,38,0.4)' },
            pending: { border:'#f59e0b', bg:'rgba(245,158,11,0.12)', header:'rgba(245,158,11,0.18)', id:'#f59e0b', shadow:'rgba(245,158,11,0.3)' },
            suspended: { border:'#8b5cf6', bg:'rgba(139,92,246,0.18)', header:'rgba(139,92,246,0.25)', id:'#8b5cf6', shadow:'rgba(139,92,246,0.4)' }
        };
        const _sc = _statusColors[o.status] || { border:'var(--border-color)', bg:'', header:'', id:'#fff', shadow:'transparent' };

        const html = `
        <div class="order-card ${window._openOrderId === o.id ? 'open' : ''}" data-status="${o.status || 'pending'}" data-order-id="${o.id}" onclick="toggleOrderCard(this)">
            <div class="order-card-inner" style="border-color:${_sc.border} !important;background:${_sc.bg || 'var(--card-bg)'} !important;box-shadow:0 0 25px ${_sc.shadow} !important;">
                <div class="order-card-header" style="background:${_sc.header ? 'linear-gradient(135deg,'+_sc.header+','+_sc.header.replace('0.15','0.05').replace('0.1','0.03')+') !important' : ''}">
                    <div class="order-card-header-left">
                        <span class="order-card-id" style="color:#fff !important;text-shadow:0 0 20px ${_sc.shadow} !important;">#${orderIdShort}</span>
                        <span class="order-card-title">${displayTitle}</span>
                    </div>
                    <div class="order-card-header-right">
                        <span class="order-card-header-price">
                            <i class="fas fa-fire"></i>
                            <span class="hdr-price-value">${currentPrice}</span>
                            <span class="hdr-price-currency">${displayCurrency}</span>
                        </span>
                        <i class="fas fa-chevron-down order-card-chevron"></i>
                    </div>
                </div>
                <div class="order-card-collapse">
                    <div class="order-card-body">
                        <div class="order-card-split">
                            <!-- Right side: All Items -->
                            <div class="order-card-img-col">
                                ${badgesHTML}
                                ${userItemsHtml}
                                ${hasReceipt ? `<div class="order-receipt-box"><div class="receipt-header"><i class="fas fa-receipt"></i><div>${_i18n.receipt}</div></div><img src="${o.receiptImageUrl}" alt="${_i18n.receipt}" loading="lazy" onclick="event.stopPropagation();openImageModal('${o.receiptImageUrl}')"></div>` : ''}
                            </div>

                            <!-- Left side: Info + Actions -->
                            <div class="order-card-info-col">
                                <div class="order-info-grid">
                                    <div class="info-row">
                                        <span class="info-label">${_i18n.products}</span>
                                        <span class="info-value" style="white-space:normal;line-height:1.6">${(function(){if(o.items&&typeof o.items==='object'){var ks=Object.keys(o.items).filter(function(k){return o.items[k]&&o.items[k].title});if(ks.length>0){var catEmojis={books:'📚',software:'💻',formulas:'🧪',courses:'🎓'};var cats2=APP_CONFIG?APP_CONFIG.categories:null;var lang2=document.documentElement.lang||'ar';var lines=ks.map(function(k){var it=o.items[k];var qty=it.quantity||1;var cat=it.category||'';var ce=catEmojis[cat]||'';var cn=(cats2&&cats2[lang2]&&cats2[lang2][cat])||cat||'';var t=(typeof it.title==='string'&&_isArabic(it.title))?_getTranslation(it.title,lang2):(it.title||'');return t+' <span style="color:#9333ea">\u00D7'+qty+'</span>'+(cn?' <span class="order-item-cat-badge">'+ce+' '+cn+'</span>':'')});return lines.join('<br>')}}var pt=o.productTitle||'N/A';return(typeof pt==='string'&&_isArabic(pt))?_getTranslation(pt,lang):pt;})()}</span>
                                    </div>
                                    <div class="info-row">
                                        <span class="info-label">${_i18n.orderNum}</span>
                                        <span class="info-value ord-id">#${orderIdShort} <button class="copy-id-btn" onclick="event.stopPropagation();copyToClipboard('${o.id}',this)" title="${_i18n.copyId}"><i class="fas fa-copy"></i></button></span>
                                    </div>
                                    <div class="info-row">
                                        <span class="info-label">${_i18n.payment}</span>
                                        <span class="info-value pay-method">${pmName} ${pmLogo ? `<img src="${pmLogo}" class="pay-icon" alt="">` : ''}</span>
                                    </div>
                                    <div class="info-row">
                                        <span class="info-label">${_i18n.category}</span>
                                        <span class="info-value"><span class="product-category">${catEmoji} ${catName}</span></span>
                                    </div>
                                    <div class="info-row">
                                        <span class="info-label">${_i18n.date}</span>
                                        <span class="info-value">${fullDate}</span>
                                    </div>
                                    <div class="info-row">
                                        <span class="info-label">${_i18n.price}</span>
                                        <span class="info-value"></span>
                                    </div>
                                </div>

                                <!-- Pricing block — like product page / cart -->
                                <div class="order-pricing-block">
                                    ${hasDiscount ? `<div class="price-old-save-row"><div class="price-old"><span class="price-old-value">${oldPrice}</span> ${displayCurrency}</div><span class="price-save"><i class="fas fa-tag"></i> ${_i18n.saved} ${savings}</span></div>` : ''}
                                    <div class="price-final">
                                        <i class="fas fa-fire animated-fire"></i>
                                        <span class="price-value">${currentPrice}</span>
                                        <span class="price-currency">${displayCurrency}</span>
                                    </div>
                                </div>

                                ${o.adminNote ? `<div class="order-note"><i class="fas fa-sticky-note"></i> ${_i18n.adminNote}: ${o.adminNote}</div>` : ''}

                                <div class="order-action-row">
                                    ${o.status === 'confirmed' ? `
                                    <a href="${(o.downloadLink && o.downloadLink !== '#') ? o.downloadLink : (o._dlFallback || '#')}" class="order-action-btn btn-download" target="_blank" onclick="event.stopPropagation()">
                                        <i class="fas fa-download"></i> ${_i18n.download}
                                    </a>` : ''}
                                    <a href="pending-order.html?order=${o.id}" class="order-action-btn btn-track" onclick="event.stopPropagation()">
                                        <i class="fas fa-search"></i> ${_i18n.track}
                                    </a>
                                    <a href="https://wa.me/${APP_CONFIG.whatsappNumber}?text=${encodeURIComponent(lang === 'ar' ? `استفسار عن الطلب #${o.id} - ${displayTitle}` : lang === 'en' ? `Inquiry about order #${o.id} - ${displayTitle}` : `Demande de renseignement #${o.id} - ${displayTitle}`)}" class="order-action-btn btn-support" target="_blank" onclick="event.stopPropagation()">
                                        <i class="fab fa-whatsapp"></i> ${_i18n.support}
                                    </a>
                                </div>
                            </div>
                        </div>

                        <!-- Steps — full width below split -->
                        <div class="order-steps">
                            <div class="order-progress-line ${o.status}"></div>
                            <div class="order-step completed">
                                <div class="order-step-dot completed"></div>
                                <div class="order-step-text"><span>${_i18n.step1Title}</span><small>${_i18n.step1Sub}</small></div>
                            </div>
                            <div class="order-step ${s2Done ? 'completed' : (s2Active ? 'active' : '')}">
                                <div class="order-step-dot ${s2Done ? 'completed' : (s2Active ? 'active' : '')}"></div>
                                <div class="order-step-text"><span>${s2Done ? _i18n.step2Review : (s2Active ? _i18n.step2Reviewing : _i18n.step2Pending)}</span><small>${s2Done ? _i18n.step2SubDone : (s2Active ? _i18n.step2SubDoing : '')}</small></div>
                            </div>
                            <div class="order-step ${s3Done ? 'completed' : (s3Rejected ? 'rejected' : (s3Suspended ? 'suspended' : ''))}">
                                <div class="order-step-dot ${s3Done ? 'completed' : (s3Rejected ? 'rejected' : (s3Suspended ? 'suspended' : ''))}"></div>
                                <div class="order-step-text"><span>${s3Done ? _i18n.step3Confirmed : (s3Rejected ? _i18n.step3Rejected : (s3Suspended ? _i18n.step3Suspended : _i18n.step3Pending))}</span><small>${s3Done ? _i18n.step3SubDone : (s3Rejected ? _i18n.step3SubRej : (s3Suspended ? _i18n.step3SubSus : ''))}</small></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>`;
            cards.push(html);
        } catch(e) { console.warn('Order render error:', o?.id, e); cards.push(`<div class="order-card" data-status="${o?.status||'pending'}" style="opacity:0.6"><div class="order-card-inner" style="border:2px dashed #ef4444;padding:16px;text-align:center"><span style="color:#fff">#${o?.id||'?'}</span><span style="color:#999;margin-right:8px">${o?.status||'?'}</span><span style="color:#ef4444;margin-right:8px;font-size:11px">⚠️ ${e?.message||((lang === 'ar' ? 'خطأ' : lang === 'en' ? 'Error' : 'Erreur'))}</span></div></div>`); }
    }
    list.innerHTML = cards.join('');
    list.setAttribute('data-rendered', 'true');
    setTimeout(function(){ if (typeof window.revealDynamicContent === 'function') window.revealDynamicContent(); }, 50);
};

window.toggleOrderCard = function(el) {
    const orderId = el.getAttribute('data-order-id');
    if (el.classList.contains('open')) {
        el.classList.remove('open');
        if (window._openOrderId === orderId) window._openOrderId = null;
    } else {
        el.classList.add('open');
        window._openOrderId = orderId;
    }
};

window.clearOrdersSearch = function() {
    const input = document.getElementById('searchInput');
    if (input) { input.value = ''; }
    if (window.filterUserOrdersWithSearch) window.filterUserOrdersWithSearch(true);
};

window.filterUserOrders = function(status) {
    window.currentOrdersStatus = status;
    document.querySelectorAll('.filters .filter-btn').forEach(b => b.classList.remove('active'));
    const btn = document.querySelector(`.filters .filter-btn[data-status="${status}"]`);
    if (btn) btn.classList.add('active');
    if (status === 'all') { window.clearOrdersSearch(); return; }
    if (window.filterUserOrdersWithSearch) window.filterUserOrdersWithSearch(false, true);
};

// Smart Search & Filter State for Orders
window.currentOrdersSort = 'newest';
window.currentOrdersSearch = '';
window.currentOrdersStatus = 'all';

// Smart Search + Filter + Sort + Price Range for Orders
let _searchDebounceTimer;
window.filterUserOrdersWithSearch = function(immediate, fromFilterBtn) {
    if (!fromFilterBtn) {
        const inp = document.getElementById('searchInput');
        const val = inp ? inp.value.trim() : '';
        if (!val && window.currentOrdersStatus !== 'all') {
            window.currentOrdersStatus = 'all';
            document.querySelectorAll('.filters .filter-btn').forEach(b => b.classList.remove('active'));
            const btn = document.querySelector('.filters .filter-btn[data-status="all"]');
            if (btn) btn.classList.add('active');
        }
    }
    if (immediate) { clearTimeout(_searchDebounceTimer); _execOrdersSearch(); return; }
    clearTimeout(_searchDebounceTimer);
    _searchDebounceTimer = setTimeout(_execOrdersSearch, 100);
};
function _execOrdersSearch() {
    const searchInput = document.getElementById('searchInput');
    const search = searchInput ? searchInput.value.toLowerCase().trim() : '';
    window.currentOrdersSearch = search;
    
    if (!window.myOrders) return;
    
    // When search is empty, apply status filter only
    if (!search) {
        let filtered = window.myOrders;
        if (window.currentOrdersStatus !== 'all') {
            filtered = filtered.filter(o => {
                const s = o.status || '';
                if (window.currentOrdersStatus === 'completed') return s === 'confirmed' || s === 'done';
                return s === window.currentOrdersStatus;
            });
        }
        window.renderOrdersList(filtered);
        return;
    }
    
    let filtered = window.myOrders;
    
    // Status filter
    if (window.currentOrdersStatus !== 'all') {
        filtered = filtered.filter(o => {
            const s = o.status || '';
            if (window.currentOrdersStatus === 'completed') return s === 'confirmed' || s === 'done';
            return s === window.currentOrdersStatus;
        });
    }
    
    // Smart search
    if (search) {
        const clean = search.replace(/[#\s]+/g, '');
        const tokens = search.replace(/[#\s]+/g, ' ').trim().split(/\s+/).filter(Boolean);
        filtered = filtered.filter(o => {
            const rawId = String(o.id || '').toLowerCase().replace(/^#/, '');
            if (rawId.includes(clean)) return true;
            const title = (o.productTitle || '').toLowerCase();
            if (title.includes(clean)) return true;
            const orderId = String(o.id || '').toLowerCase().replace(/^#/, '');
            const orderIdField = String(o.orderId || '').toLowerCase();
            const email = (o.customerEmail || '').toLowerCase();
            const phone = (o.customerPhone || '').toLowerCase();
            const name = (o.customerName || '').toLowerCase();
            const payment = (o.paymentMethodName || '').toLowerCase();
            const pmKey = (o.paymentMethod || '').toLowerCase();
            const note = (o.adminNote || o.note || '').toLowerCase();
            const statusAr = {pending:'قيد المراجعة',confirmed:'مؤكد',rejected:'مرفوض',suspended:'معلق',trashed:'محذوف'}[o.status] || '';
            let itemTitles = '';
            if (o.items && typeof o.items === 'object') {
                Object.values(o.items).forEach(item => { if (item.title) itemTitles += ' ' + item.title.toLowerCase(); });
            }
            const allText = [title, orderId, rawId, orderIdField, email, phone, name, payment, pmKey, note, statusAr, itemTitles, String(o.price || '')].join(' ');
            return tokens.every(t => allText.includes(t));
        });
    }
    
    // Price range filter
    const priceMinEl = document.getElementById('priceMin');
    const priceMaxEl = document.getElementById('priceMax');
    const priceMin = priceMinEl ? (parseFloat(priceMinEl.value) || 0) : 0;
    const priceMax = priceMaxEl ? (parseFloat(priceMaxEl.value) || 0) : 0;
    
    if (priceMin > 0 || priceMax > 0) {
        filtered = filtered.filter(o => {
            const price = parseFloat(o.price) || 0;
            if (priceMin > 0 && price < priceMin) return false;
            if (priceMax > 0 && price > priceMax) return false;
            return true;
        });
    }
    
    // Smart sorting
    filtered.sort((a, b) => {
        const pa = parseFloat(a.price || 0);
        const pb = parseFloat(b.price || 0);
        const oa = parseFloat(a.productOldPriceEGP || a.oldPriceEGP || 0);
        const ob = parseFloat(b.productOldPriceEGP || b.oldPriceEGP || 0);
        const da = oa > pa ? ((oa - pa) / oa) : 0;
        const db = ob > pb ? ((ob - pb) / ob) : 0;
        
        switch (window.currentOrdersSort) {
            case 'newest': return (b.createdAt || 0) - (a.createdAt || 0);
            case 'oldest': return (a.createdAt || 0) - (b.createdAt || 0);
            case 'price-asc': return pa - pb;
            case 'price-desc': return pb - pa;
            case 'name-asc': return (a.productTitle || '').localeCompare(b.productTitle || '', 'ar');
            case 'name-desc': return (b.productTitle || '').localeCompare(a.productTitle || '', 'ar');
            case 'discount': return db - da;
            default: return 0;
        }
    });
    
    // Update results count
    const rc = document.getElementById('resultsCount');
    if (rc) rc.textContent = filtered.length;
    
    window.renderOrdersList(filtered);
}

window.setOrdersSort = function(sort) {
    window.currentOrdersSort = sort;
    document.querySelectorAll('.sort-btn').forEach(b => b.classList.remove('active'));
    const el = document.querySelector(`.sort-btn[data-sort="${sort}"]`);
    if (el) el.classList.add('active');
    if (window.filterUserOrdersWithSearch) window.filterUserOrdersWithSearch();
};

window.updatePriceRange = function() {
    try {
        const priceMinEl = document.getElementById('priceMin');
        const priceMaxEl = document.getElementById('priceMax');
        const priceVals = document.getElementById('priceRangeValues');
        const inpMin = document.getElementById('priceInputMin');
        const inpMax = document.getElementById('priceInputMax');
        
        if (priceMinEl && priceMaxEl && priceVals) {
            const minVal = priceMinEl.value;
            const maxVal = priceMaxEl.value;
            const sliderCur = userCountry === 'EG' && window._countryFromIP ? 'جنية' : 'USD';
            priceVals.textContent = minVal + ' – ' + maxVal + ' ' + sliderCur;
        }
        if (inpMin) inpMin.value = priceMinEl?.value || '0';
        if (inpMax) inpMax.value = priceMaxEl?.value || '5000';
        
        if (window.filterUserOrdersWithSearch) window.filterUserOrdersWithSearch();
    } catch(e) {}
};

window.updatePriceFromInput = function(input, type) {
    const priceMinEl = document.getElementById('priceMin');
    const priceMaxEl = document.getElementById('priceMax');
    const inpMin = document.getElementById('priceInputMin');
    const inpMax = document.getElementById('priceInputMax');
    
    if (type === 'min' && priceMinEl && inpMin) {
        priceMinEl.value = inpMin.value;
    }
    if (type === 'max' && priceMaxEl && inpMax) {
        priceMaxEl.value = inpMax.value;
    }
    window.updatePriceRange();
};

// Initialize price slider max based on orders
window.initOrdersPriceSlider = function() {
    if (!window.myOrders) return;
    let maxPrice = 0;
    window.myOrders.forEach(o => {
        const pr = parseFloat(o.price || 0);
        if (pr > maxPrice) maxPrice = pr;
    });
    if (maxPrice === 0) maxPrice = 5000;
    // Use exact max price (no rounding up)
    
    const priceMinEl = document.getElementById('priceMin');
    const priceMaxEl = document.getElementById('priceMax');
    const inpMin = document.getElementById('priceInputMin');
    const inpMax = document.getElementById('priceInputMax');
    const priceVals = document.getElementById('priceRangeValues');
    
    if (priceMinEl) { priceMinEl.max = maxPrice; priceMinEl.value = 0; }
    if (priceMaxEl) { priceMaxEl.max = maxPrice; priceMaxEl.value = maxPrice; }
    if (inpMin) { inpMin.max = maxPrice; inpMin.value = 0; }
    if (inpMax) { inpMax.max = maxPrice; inpMax.value = maxPrice; }
    const sliderCur = userCountry === 'EG' && window._countryFromIP ? 'جنية' : 'USD';
    if (priceVals) priceVals.textContent = '0 – ' + maxPrice + ' ' + sliderCur;
};

// --- 👤 صفحة الملف الشخصي والإعدادات (Profile & Settings) ---
window.initProfilePage = async function() {
    if (!currentUser) { document.getElementById('loadingOverlay')?.classList.add('hidden'); return; }
    document.getElementById('loadingOverlay')?.classList.remove('hidden');
    try {
        const uData = await DB.get(`users/${currentUser.uid}`);
        document.getElementById('welcomeBanner')?.classList.add('show');
        if(document.getElementById('welcomeUserName')) document.getElementById('welcomeUserName').textContent = uData?.name || currentUser.displayName || 'المستخدم';
        if(document.getElementById('successBadge')) document.getElementById('successBadge').style.display = 'inline-flex';
        if(document.getElementById('sidebarUserName')) document.getElementById('sidebarUserName').textContent = uData?.name || currentUser.displayName || 'المستخدم';
        if(document.getElementById('sidebarUserEmail')) document.getElementById('sidebarUserEmail').textContent = currentUser.email;
        if(document.getElementById('displayNameValue')) document.getElementById('displayNameValue').textContent = uData?.name || currentUser.displayName || 'غير محدد';
        if(document.getElementById('emailValue')) document.getElementById('emailValue').textContent = currentUser.email;
        if(document.getElementById('phoneValue')) document.getElementById('phoneValue').textContent = uData?.phone || localStorage.getItem('phone_saved') || 'غير محدد';
        if(document.getElementById('countryValue')) document.getElementById('countryValue').textContent = uData?.country || userCountry || 'مصر';
        if (currentUser.emailVerified && document.getElementById('verifiedStatus')) {
            document.getElementById('verifiedStatus').innerHTML = '<span class="status-badge verified"><i class="fas fa-check-circle"></i> تم التحقق ✅</span>';
            if(document.getElementById('verifyBtn')) document.getElementById('verifyBtn').style.display = 'none';
            if(document.getElementById('emailVerificationStatus')) document.getElementById('emailVerificationStatus').innerHTML = '<span style="color:var(--success)">✅ تم التحقق من بريدك الإلكتروني</span>';
        }
        if (uData?.createdAt) {
            const days = Math.floor((Date.now() - uData.createdAt) / (1000 * 60 * 60 * 24));
            if(document.getElementById('memberDays')) document.getElementById('memberDays').textContent = days >= 0 ? days : 0;
        }
        if(document.getElementById('wishlistCount')) document.getElementById('wishlistCount').textContent = userWishlist.length;
        // Fetch orders directly from Firebase for profile stats
        (async function(){
            try {
                if (window.firebaseDB) {
                    const snap = await window.firebaseGet(window.firebaseRef(database, 'orders'));
                    if (snap.exists()) {
                        var od = snap.val();
                        var mo = Object.entries(od).map(function(e){ var o=e[1]; o.id=e[0]; return o; }).filter(function(o){ return o.userId === currentUser.uid && o.status !== 'trashed'; });
                        if (document.getElementById('totalOrders')) document.getElementById('totalOrders').textContent = mo.length;
                        var sp = mo.filter(function(o){ return o.status === 'confirmed'; }).reduce(function(s,o){ return s + parseFloat(o.price||0); }, 0);
                        if (document.getElementById('totalSpent')) document.getElementById('totalSpent').textContent = sp.toFixed(0);
                    }
                }
            } catch(e) { console.error('orders fetch error:', e); }
        })();
    } catch(e) {}
    document.getElementById('loadingOverlay')?.classList.add('hidden');
};

window.editProfileField = async function(field) {
    const names = { displayName: 'الاسم الكامل', phoneNumber: 'رقم الهاتف', country: 'الدولة' };
    const val = prompt(`أدخل ${names[field] || field} الجديد:`);
    if (val && val.trim() !== '') {
        document.getElementById('loadingOverlay')?.classList.remove('hidden');
        try {
            if (field === 'displayName') {
                const { updateProfile } = await import("https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js");
                await updateProfile(currentUser, { displayName: val });
                await DB.update(`users/${currentUser.uid}`, { name: val });
            } else {
                await DB.update(`users/${currentUser.uid}`, { [field]: val });
            }
            showToast('✅', 'تم التحديث بنجاح', 'success');
            setTimeout(() => location.reload(), 1000);
        } catch(e) { showToast('❌', 'فشل التحديث', 'error'); }
        document.getElementById('loadingOverlay')?.classList.add('hidden');
    }
};

window.verifyUserEmail = async function() {
    try {
        const { sendEmailVerification } = await import("https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js");
        await sendEmailVerification(currentUser);
        showToast('✅', 'تم إرسال رابط التحقق', 'success');
    } catch (e) { showToast('❌', 'فشل إرسال الرابط', 'error'); }
};

window.downloadUserData = async function() {
    try {
        const data = await DB.get(`users/${currentUser.uid}`);
        const dataBlob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
        const a = document.createElement('a'); a.href = URL.createObjectURL(dataBlob); a.download = `bravo_data_${Date.now()}.json`;
        a.click(); showToast('✅', 'تم تحميل بياناتك', 'success');
    } catch(e) { showToast('❌', 'فشل تحميل البيانات', 'error'); }
};

window.deleteUserAccount = async function() {
    if (!confirm('⚠️ هل أنت متأكد من حذف الحساب نهائياً؟')) return;
    const confirmText = prompt('اكتب "حذف" للتأكيد:');
    if (confirmText === 'حذف') {
        try {
            const { deleteUser } = await import("https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js");
            await deleteUser(currentUser); localStorage.clear(); showToast('✅', 'تم حذف الحساب', 'success');
            setTimeout(() => window.location.href = 'index.html', 1500);
        } catch (e) {
            if (e.code === 'auth/requires-recent-login') showToast('⚠️', 'يرجى تسجيل الدخول مجدداً للحذف', 'warning');
            else showToast('❌', 'فشل حذف الحساب', 'error');
        }
    }
};

// --- 🔐 صفحة المصادقة (Auth Page) ---
window.switchAuthTab = function(tab) {
    document.querySelectorAll('.auth-page .tab-btn').forEach(t => t.classList.remove('active'));
    event.target.closest('.tab-btn').classList.add('active');
    document.querySelectorAll('.auth-page .form-section').forEach(f => f.classList.remove('active'));
    document.getElementById(tab + 'Form').classList.add('active');
    if(document.getElementById('errorMessage')) document.getElementById('errorMessage').classList.remove('show');
};

window.toggleAuthPassword = function(id) {
    const input = document.getElementById(id);
    const icon = event.target.closest('button').querySelector('i');
    if (input.type === 'password') { input.type = 'text'; icon.className = 'fas fa-eye-slash'; }
    else { input.type = 'password'; icon.className = 'fas fa-eye'; }
};

window.handleUserLogin = async function(e) {
    e.preventDefault();
    const email = document.getElementById('loginEmail').value;
    const pass = document.getElementById('loginPassword').value;
    const remember = document.getElementById('rememberMe').checked;
    const btn = document.getElementById('loginBtn');
    const err = document.getElementById('errorMessage');
    const errText = document.getElementById('errorText');
    btn.disabled = true; btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> جاري الدخول...';
    err.classList.remove('show');
    
    if (remember) {
        localStorage.setItem('rememberedEmail', email);
    } else {
        localStorage.removeItem('rememberedEmail');
    }
    
    try {
        const { signInWithEmailAndPassword } = await import("https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js");
        const loginCred = await signInWithEmailAndPassword(auth, email, pass);
        const visitorInfo = await getVisitorInfo();
        try { if (loginCred.user?.uid) await DB.set('users/' + loginCred.user.uid + '/ip', visitorInfo.ip); } catch(e) {}
        try { if (loginCred.user?.uid) await DB.set('users/' + loginCred.user.uid + '/country', visitorInfo.country); } catch(e) {}
        showToast('✅', 'تم تسجيل الدخول بنجاح', 'success');
        try { localStorage.setItem(STORAGE_KEYS.user, JSON.stringify({ uid: loginCred.user.uid, email: loginCred.user.email, displayName: loginCred.user.displayName || '' })); } catch(e) {}
        setTimeout(() => window.location.href = sessionStorage.getItem('redirectAfterLogin') || 'index.html', 1000);
    } catch (error) {
        const msgs = {
            'auth/user-not-found': 'لا يوجد حساب بهذا البريد الإلكتروني',
            'auth/wrong-password': 'كلمة المرور غير صحيحة',
            'auth/invalid-email': 'صيغة البريد الإلكتروني غير صحيحة',
            'auth/user-disabled': 'تم تعطيل هذا الحساب',
            'auth/too-many-requests': 'محاولات كثيرة جداً، حاول لاحقاً',
            'auth/invalid-credential': 'البريد الإلكتروني أو كلمة المرور غير صحيحة'
        };
        errText.textContent = msgs[error.code] || 'بيانات الدخول غير صحيحة';
        err.classList.add('show');
        btn.disabled = false; btn.innerHTML = '<i class="fas fa-sign-in-alt"></i> <span data-ar="تسجيل الدخول" data-en="Login">تسجيل الدخول</span>';
    }
};

window.handleUserRegister = async function(e) {
    e.preventDefault();
    const name = document.getElementById('registerName').value;
    const email = document.getElementById('registerEmail').value;
    const phone = document.getElementById('registerPhone').value;
    const pass = document.getElementById('registerPassword').value;
    const conf = document.getElementById('registerConfirmPassword').value;
    const err = document.getElementById('errorMessage');
    const errText = document.getElementById('errorText');
    
    if (pass !== conf) { errText.textContent = 'كلمة المرور غير متطابقة'; err.classList.add('show'); return; }
    
    const btn = document.getElementById('registerBtn');
    btn.disabled = true; btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> جاري الإنشاء...';
    err.classList.remove('show');

    try {
        const { createUserWithEmailAndPassword, updateProfile } = await import("https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js");
        const cred = await createUserWithEmailAndPassword(auth, email, pass);
        await updateProfile(cred.user, { displayName: name });
        const visitorInfo = await getVisitorInfo();
        await DB.set(`users/${cred.user.uid}`, { uid: cred.user.uid, name, email, phone, createdAt: Date.now(), ip: visitorInfo.ip, country: visitorInfo.country, avatar: '' });
        showToast('✅', 'تم إنشاء الحساب بنجاح', 'success');
        try { localStorage.setItem(STORAGE_KEYS.user, JSON.stringify({ uid: cred.user.uid, email: cred.user.email, displayName: name })); } catch(e) {}
        setTimeout(() => window.location.href = 'index.html', 1000);
    } catch (error) {
        const msgs = {
            'auth/email-already-in-use': 'البريد الإلكتروني مستخدم بالفعل',
            'auth/weak-password': 'كلمة المرور ضعيفة - يجب أن تكون 6 أحرف على الأقل',
            'auth/invalid-email': 'صيغة البريد الإلكتروني غير صحيحة'
        };
        errText.textContent = msgs[error.code] || 'حدث خطأ أثناء الإنشاء';
        err.classList.add('show');
        btn.disabled = false; btn.innerHTML = '<i class="fas fa-user-plus"></i> <span data-ar="إنشاء حساب" data-en="Create Account">إنشاء حساب</span>';
    }
};

window.openForgotPassword = function() {
    document.getElementById('forgotModal').classList.add('show');
    document.getElementById('forgotError').classList.remove('show');
    document.getElementById('forgotStepSend').style.display = 'block';
    document.getElementById('forgotStepSuccess').style.display = 'none';
    document.getElementById('resetEmail').value = localStorage.getItem('rememberedEmail') || '';
};

window.closeForgotPassword = function() {
    document.getElementById('forgotModal').classList.remove('show');
};

window.handleForgotPassword = async function() {
    const email = document.getElementById('resetEmail').value;
    const btn = document.getElementById('resetBtn');
    const err = document.getElementById('forgotError');
    const errText = document.getElementById('forgotErrorText');
    
    if (!email) { errText.textContent = 'يرجى إدخال البريد الإلكتروني'; err.classList.add('show'); return; }
    
    btn.disabled = true; btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> جاري الإرسال...';
    err.classList.remove('show');
    
    try {
        const { sendPasswordResetEmail } = await import("https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js");
        await sendPasswordResetEmail(auth, email);
        document.getElementById('forgotStepSend').style.display = 'none';
        document.getElementById('forgotStepSuccess').style.display = 'block';
    } catch (e) {
        const msgs = {
            'auth/user-not-found': 'لا يوجد حساب بهذا البريد',
            'auth/invalid-email': 'البريد الإلكتروني غير صالح'
        };
        errText.textContent = msgs[e.code] || 'فشل إرسال الرابط، حاول لاحقاً';
        err.classList.add('show');
    }
    
    btn.disabled = false; btn.innerHTML = '<i class="fas fa-paper-plane"></i> إرسال الرابط';
};

window.handleLogout = async function() {
    try {
        const { getAuth, signOut } = await import("https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js");
        await signOut(getAuth());
        localStorage.removeItem(STORAGE_KEYS.user);
        currentUser = null; window.currentUser = null;
        showToast('✅', currentLang === 'ar' ? 'تم تسجيل الخروج' : currentLang === 'en' ? 'Logged out' : 'Déconnecté', 'success');
        setTimeout(() => window.location.href = 'index.html', 1000);
    } catch(e) {
        localStorage.removeItem(STORAGE_KEYS.user);
        currentUser = null; window.currentUser = null;
        window.location.href = 'index.html';
    }
};

// ==================== EXPOSE GLOBALLY ====================
window.toggleLanguage = toggleLanguage; window.switchLanguage = switchLanguage; window.toggleDropdown = toggleDropdown;
window.toggleMobileMenu = toggleMobileMenu; window.handleLogout = handleLogout; window.markNotificationAsRead = markNotificationAsRead;
window.markAllAsRead = markAllAsRead; window.selectCategory = selectCategory; window.displayProducts = displayProducts;
window.scrollToTop = scrollToTop; window.showToast = showToast; window.loadNotifications = loadNotifications;
window.loadWishlistDropdown = loadWishlistDropdown; window.loadCartDropdown = loadCartDropdown; window._filterProducts = _filterProducts;
window.copyToClipboard = copyToClipboard; window.goToPending = goToPending; window.openWhatsAppOptional = openWhatsAppOptional;
window.fixDropdownPosition = fixDropdownPosition; window.DB = DB;
window.toggleWishlist = toggleWishlist; window.addToCart = addToCart; window.removeFromCart = removeFromCart;
window.openQuickView = openQuickView; window.closeQuickView = closeQuickView;
window.isInWishlist = isInWishlist; window.isInCart = isInCart;
window.flyToCart = flyToCart;
window.loginWithGoogle = loginWithGoogle; window.loginWithFacebook = loginWithFacebook; window.initializeAuthPage = initializeAuthPage;
window.openForgotPassword = openForgotPassword; window.closeForgotPassword = closeForgotPassword; window.handleForgotPassword = handleForgotPassword;

// ==================== ROUTING ====================
function setupRouter() {
    const path = window.location.pathname.toLowerCase();
    if (path.includes('orders')) { window.initOrdersPage(); }
    if (path.includes('profile') || path.includes('settings')) { setTimeout(window.initProfilePage, 300); }

}

// ==================== START ====================
if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', initializeApp);
else initializeApp();


// ╔══════════════════════════════════════════════════════════════════════╗
// ║         AUTH SYSTEM - GOOGLE & FACEBOOK ONLY                        ║
// ╚══════════════════════════════════════════════════════════════════════╝

function showAuthAlert(message, type = 'success') {
    const alertEl = document.getElementById('alertMessage');
    const alertText = document.getElementById('alertText');
    const icon = alertEl?.querySelector('i');
    if (!alertEl || !alertText) return;
    alertText.textContent = message;
    alertEl.className = `alert alert-${type} show`;
    const icons = { success: 'fas fa-check-circle', error: 'fas fa-exclamation-circle', info: 'fas fa-info-circle', warning: 'fas fa-exclamation-triangle' };
    if (icon) icon.className = icons[type] || icons.info;
    alertEl.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    setTimeout(() => hideAuthAlert(), 6000);
}

function hideAuthAlert() { const alertEl = document.getElementById('alertMessage'); if (alertEl) alertEl.classList.remove('show'); }

async function saveAuthUserToDatabase(user) {
    try {
        const userRef = `users/${user.uid}`;
        const existingData = await DB.get(userRef);
        const userData = { uid: user.uid, email: user.email, displayName: existingData?.name || user.displayName || user.email?.split('@')[0] || 'User', photoURL: existingData?.photoURL || user.photoURL || '', emailVerified: user.emailVerified, provider: user.providerData?.[0]?.providerId || 'unknown', createdAt: existingData?.createdAt || Date.now(), lastLogin: Date.now(), name: existingData?.name || user.displayName || '', phone: existingData?.phone || '', ip: existingData?.ip || '', country: existingData?.country || '', avatar: existingData?.avatar || existingData?.photoURL || user.photoURL || '', wishlist: existingData?.wishlist || {}, cart: existingData?.cart || {}, orders: existingData?.orders || {}, metadata: existingData?.metadata || { userAgent: navigator.userAgent, language: navigator.language, platform: navigator.platform } };
        await DB.update(userRef, userData);
        return userData;
    } catch (error) { console.error('DB save error:', error); return { uid: user.uid, email: user.email, displayName: user.displayName || 'User', photoURL: user.photoURL || '', emailVerified: true }; }
}

async function loginWithGoogle() {
    const btn = document.querySelector('.social-login-btn.google');
    if (btn) btn.classList.add('loading');
    try {
        const { getAuth, signInWithPopup, signInWithRedirect, getRedirectResult, GoogleAuthProvider } = await import("https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js");
        const authInstance = getAuth();
        const provider = new GoogleAuthProvider();
        provider.addScope('profile');
        provider.addScope('email');

        console.log('🔄 Starting Google Sign-In...');
        console.log('🔍 Current domain:', window.location.hostname);

        let result;
        try {
            result = await signInWithPopup(authInstance, provider);
        } catch (popupError) {
            if (popupError.code === 'auth/popup-closed-by-user' || popupError.code === 'auth/cancelled-popup-request') { if (btn) btn.classList.remove('loading'); return; }
            if (popupError.code === 'auth/popup-blocked') { showAuthAlert(currentLang === 'ar' ? '⚠️ تم حظر النافذة - جاري التحويل...' : currentLang === 'en' ? '⚠️ Popup blocked - redirecting...' : '⚠️ Popup bloquée - redirection...', 'warning'); }
            console.warn('⚠️ Popup failed, trying redirect:', popupError.code);
            await signInWithRedirect(authInstance, provider);
            return;
        }

        console.log('✅ Google Sign-In OK:', result.user.uid, result.user.email);

        const userData = await saveAuthUserToDatabase(result.user);
        localStorage.setItem(STORAGE_KEYS.user, JSON.stringify(userData));
        
        console.log("🔄 [Login] بدء دمج البيانات...");
        await Promise.all([
            window.mergeGuestCartToUser(result.user.uid),
            window.mergeGuestWishlistToUser(result.user.uid)
        ]);
        console.log("✅ [Login] الدمج اكتمل، جاري التحويل...");

        showAuthAlert(currentLang === 'ar'
            ? '✅ مرحباً ' + (result.user.displayName || '') + '!'
            : '✅ Welcome ' + (result.user.displayName || '') + '!', 'success');

        const urlParams = new URLSearchParams(window.location.search);
        window.location.href = urlParams.get('redirect') || 'index.html';

    } catch (error) {
        if (btn) btn.classList.remove('loading');
        console.error('❌ Google Error:', error.code, error.message);

        if (error.code === 'auth/unauthorized-domain') {
            showAuthAlert(currentLang === 'ar'
                ? '⚠️ الدومين غير مصرح - استخدم localhost أو أضف ' + window.location.hostname + ' في Firebase Console'
                : '⚠️ Unauthorized domain - use localhost or add ' + window.location.hostname + ' in Firebase Console', 'error');
            return;
        }
        if (error.code === 'auth/operation-not-allowed') {
            showAuthAlert(currentLang === 'ar'
                ? '⚠️ فعّل Google من Firebase Console → Authentication → Sign-in method'
                : '⚠️ Enable Google in Firebase → Auth → Sign-in method', 'error');
            return;
        }

        showAuthAlert(currentLang === 'ar'
            ? '❌ فشل تسجيل الدخول: ' + (error.code || error.message)
            : '❌ Login failed: ' + (error.code || error.message), 'error');
    }
}

async function loginWithFacebook() {
    const btn = document.querySelector('.social-login-btn.facebook');
    if (btn) btn.classList.add('loading');
    try {
        const { getAuth, signInWithPopup, signInWithRedirect, getRedirectResult, FacebookAuthProvider } = await import("https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js");
        const authInstance = getAuth();
        const provider = new FacebookAuthProvider();
        provider.addScope('email');
        provider.addScope('public_profile');

        console.log('🔄 Starting Facebook Sign-In...');

        let result;
        try {
            result = await signInWithPopup(authInstance, provider);
        } catch (popupError) {
            if (popupError.code === 'auth/popup-closed-by-user' || popupError.code === 'auth/cancelled-popup-request') { if (btn) btn.classList.remove('loading'); return; }
            if (popupError.code === 'auth/popup-blocked') { showAuthAlert(currentLang === 'ar' ? '⚠️ تم حظر النافذة - جاري التحويل...' : currentLang === 'en' ? '⚠️ Popup blocked - redirecting...' : '⚠️ Popup bloquée - redirection...', 'warning'); }
            console.warn('⚠️ Popup failed, trying redirect:', popupError.code);
            await signInWithRedirect(authInstance, provider);
            return;
        }

        console.log('✅ Facebook Sign-In OK:', result.user.uid);

        const userData = await saveAuthUserToDatabase(result.user);
        localStorage.setItem(STORAGE_KEYS.user, JSON.stringify(userData));
        
        console.log("🔄 [Login] بدء دمج البيانات...");
        await Promise.all([
            window.mergeGuestCartToUser(result.user.uid),
            window.mergeGuestWishlistToUser(result.user.uid)
        ]);
        console.log("✅ [Login] الدمج اكتمل، جاري التحويل...");

        showAuthAlert(currentLang === 'ar'
            ? '✅ مرحباً ' + (result.user.displayName || '') + '!'
            : '✅ Welcome ' + (result.user.displayName || '') + '!', 'success');

        const urlParams = new URLSearchParams(window.location.search);
        window.location.href = urlParams.get('redirect') || 'index.html';

    } catch (error) {
        if (btn) btn.classList.remove('loading');
        console.error('❌ Facebook Error:', error.code, error.message);

        if (error.code === 'auth/account-exists-with-different-credential') {
            showAuthAlert(currentLang === 'ar' ? '⚠️ هذا البريد مسجل بـ Google' : currentLang === 'en' ? '⚠️ Email registered with Google' : '⚠️ Email enregistré avec Google', 'warning');
            return;
        }

        showAuthAlert(currentLang === 'ar'
            ? '❌ فشل تسجيل الدخول: ' + (error.code || error.message)
            : '❌ Login failed: ' + (error.code || error.message), 'error');
    }
}

function initializeAuthPage() {
    console.log('✅ Auth page initialized');
    
    const remembered = localStorage.getItem('rememberedEmail');
    if (remembered) {
        const el = document.getElementById('loginEmail');
        const cb = document.getElementById('rememberMe');
        if (el) el.value = remembered;
        if (cb) cb.checked = true;
    }
    
    (async function() {
        try {
            const { getAuth, getRedirectResult, GoogleAuthProvider, FacebookAuthProvider } = await import("https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js");
            const authInstance = getAuth();
            const result = await getRedirectResult(authInstance);
            if (result) {
                console.log('✅ Redirect login OK:', result.user.uid, result.user.email);
                const userData = await saveAuthUserToDatabase(result.user);
                localStorage.setItem(STORAGE_KEYS.user, JSON.stringify(userData));
                await Promise.all([
                    window.mergeGuestCartToUser(result.user.uid),
                    window.mergeGuestWishlistToUser(result.user.uid)
                ]);
                showAuthAlert(currentLang === 'ar' ? '✅ مرحباً!' : currentLang === 'en' ? '✅ Welcome!' : '✅ Bienvenue!', 'success');
                const urlParams = new URLSearchParams(window.location.search);
                window.location.href = urlParams.get('redirect') || 'index.html';
            }
        } catch(e) { console.error('Redirect result error:', e); }
    })();
}

// ==================== ADMIN GLOBAL UI INJECTION ====================
function injectAdminGlobalStyles() {
    if (document.getElementById('adminGlobalStyles')) return;
    const style = document.createElement('style');
    style.id = 'adminGlobalStyles';
    style.innerHTML = `
        /* تحسينات شكل النوافذ المنبثقة (Modals) لتطابق الهيدر */
        .edit-order-content, .edit-product-content, .custom-modal, .edit-page-modal .edit-product-content, .edit-order-modal, .edit-product-modal {
            background: #1a0b2e !important;
            color: white !important;
        }
        .edit-order-content, .edit-product-content, .custom-modal {
            border: 2px solid rgba(147, 51, 234, 0.5) !important;
            border-radius: 24px !important;
            box-shadow: 0 25px 70px rgba(0, 0, 0, 0.7), 0 0 50px rgba(147, 51, 234, 0.2) !important;
        }
        .edit-order-header, .custom-modal-title, .edit-form-group label, .edit-order-header h2, .edit-form-group select, .edit-form-group input {
            color: #fff !important;
        }
        .edit-order-header { border-bottom-color: rgba(147, 51, 234, 0.3) !important; }
        .edit-form-group input, .edit-form-group textarea {
            background: rgba(255, 255, 255, 0.05) !important;
            border: 1px solid rgba(147, 51, 234, 0.2) !important;
        }
        .custom-modal-message { color: rgba(255,255,255,0.9) !important; font-weight: 900 !important; }

        /* توحيد شكل جميع القوائم المنسدلة (Selects) لتطابق الهيدر */
        select, .trash-select { 
            padding: 12px 15px 12px 40px !important; 
            border-radius: 20px !important; 
            background: #1a0b2e !important; 
            color: white !important; 
            border: 2px solid rgba(147, 51, 234, 0.3) !important; 
            font-family: inherit !important; 
            font-weight: 900 !important; 
            font-size: 0.95em !important; 
            outline: none !important; 
            cursor: pointer !important; 
            transition: all 0.3s ease !important; 
            appearance: none !important;
            background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='white'%3E%3Cpath d='M7 10l5 5 5-5z'/%3E%3C/svg%3E") !important;
            background-repeat: no-repeat !important;
            background-position: left 12px center !important;
            background-size: 20px !important;
        }
        select:hover, .trash-select:hover { border-color: var(--primary) !important; box-shadow: 0 0 15px rgba(147, 51, 234, 0.3) !important; }
        option { background: #1a0b2e !important; color: white !important; font-weight: 900 !important; }

        /* ستايل الجدول في السلة */
        .trash-table-fix td { border: 1px solid var(--border-color) !important; vertical-align: middle !important; text-align: center !important; padding: 12px 10px !important; }
        .trash-table-fix th { border: 1px solid var(--border-color) !important; background: rgba(147, 51, 234, 0.2) !important; text-align: center !important; padding: 15px !important; font-weight: 900 !important; color: #fff !important; font-size: 1.1em !important; }
    `;
    document.head.appendChild(style);
}

/* Reveal System v5.0 */
function initReveal() {
  const els = document.querySelectorAll('[data-reveal]');
  if (!els.length) return;

  function reveal(el) {
    if (el.classList.contains('revealed')) return;
    el.classList.add('revealed');
  }

  function isInViewport(el, thresh) {
    const rect = el.getBoundingClientRect();
    const vh = window.innerHeight;
    const top = Math.max(rect.top, 0);
    const bottom = Math.min(rect.bottom, vh);
    const visible = Math.max(0, (bottom - top) / rect.height);
    return visible >= thresh;
  }

  function checkVisibility() {
    els.forEach((el) => {
      if (!el.classList.contains('revealed') && isInViewport(el, 0.15)) {
        reveal(el);
      }
    });
  }

  checkVisibility();

  if ('IntersectionObserver' in window) {
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          reveal(entry.target);
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -60px 0px' });
    els.forEach((el) => { if (!el.classList.contains('revealed')) obs.observe(el); });
  }

  let ticking = false;
  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(() => { checkVisibility(); ticking = false; });
      ticking = true;
    }
  }, { passive: true });

  setTimeout(checkVisibility, 800);
  setTimeout(checkVisibility, 2000);
}

window.hideAuthAlert = hideAuthAlert;

// Unified page hero entrance + gradient animation
function initPageHero() {
  var wrapper = document.querySelector('.page-hero-wrapper');
  if (wrapper) {
    wrapper.style.opacity = '0';
    wrapper.style.transform = 'scale(0.92)';
    if (wrapper.animate) {
      wrapper.animate([
        { opacity: 0, transform: 'scale(0.92)' },
        { opacity: 1, transform: 'scale(1)' }
      ], { duration: 1200, fill: 'forwards', easing: 'cubic-bezier(0.34, 1.56, 0.64, 1)' });
    } else {
      wrapper.style.opacity = '1';
      wrapper.style.transform = 'scale(1)';
    }
  }
}

document.addEventListener('DOMContentLoaded', () => { initReveal(); });

// Price step buttons
function stepPrice(id, delta) {
  var el = document.getElementById('priceInput' + id.charAt(0).toUpperCase() + id.slice(1));
  if (!el) return;
  var val = parseFloat(el.value) || 0;
  var step = parseFloat(el.getAttribute('step')) || 10;
  var min = parseFloat(el.getAttribute('min')) || 0;
  var max = parseFloat(el.getAttribute('max')) || 5000;
  val = Math.min(max, Math.max(min, val + delta));
  el.value = val;
  el.dispatchEvent(new Event('change'));
}

// ==================== SUGGESTION CHIPS FOR ADMIN FORMS ====================
const SUGGESTIONS = {
    features: [
        { label: 'تصميم احترافي', text: 'تصميم احترافي وعصري - مصمم بأحدث المعايير العالمية' },
        { label: 'سهل الاستخدام', text: 'سهل الاستخدام - واجهة بسيطة ومناسبة للمبتدئين' },
        { label: 'محتوى عالي الجودة', text: 'محتوى عالي الجودة - مصادر موثوقة ومحدثة' },
        { label: 'دعم فني متواصل', text: 'دعم فني متواصل - فريق جاهز للمساعدة 24/7' },
        { label: 'توافق كامل', text: 'توافق كامل - يعمل على جميع الأجهزة والأنظمة' },
        { label: 'قابل للتخصيص', text: 'قابل للتخصيص - يمكنك تعديله حسب احتياجاتك' }
    ],
    requirements: [
        { label: 'الجهاز', text: 'كمبيوتر أو هاتف ذكي أو تابلت' },
        { label: 'الإنترنت', text: 'الإنترنت: اتصال مستقر بالإنترنت (للتحميل فقط)' },
        { label: 'قارئ PDF', text: 'قارئ PDF: Adobe Reader أو أي قارئ PDF حديث' },
        { label: 'التوافق', text: 'التوافق: Windows, Mac, Android, iOS' }
    ],
    faq: [
        { label: 'كيفية التحميل', text: 'كيف يمكنني تحميل المنتج بعد الشراء؟ | عند تأكيد الدفع يتم إظهار رابط التحميل مباشرة أو ممكن تتابع طلبك من صفحة طلباتي' },
        { label: 'الاسترجاع', text: 'هل يمكنني استرجاع المنتج إذا لم يعجبني؟ | نعم، نوفر ضمان استرجاع المال خلال 7 أيام من تاريخ الشراء إذا لم تكن راضياً عن المنتج بشكل كامل.' },
        { label: 'التحديثات', text: 'هل التحديثات مجانية مدى الحياة؟ | نعم بالتأكيد! جميع التحديثات والإضافات الجديدة للمنتج مجانية تماماً لجميع العملاء الذين قاموا بالشراء.' },
        { label: 'طرق الدفع', text: 'ما هي طرق الدفع المتاحة؟ | نقبل جميع طرق الدفع الرئيسية: بطاقات الائتمان، فودافون كاش، محافظ إلكترونية، والتحويل البنكي المباشر.' }
    ]
};

function renderSuggestionChips(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;
    const targetId = container.dataset.for;
    const type = container.dataset.type;
    const suggestions = SUGGESTIONS[type];
    if (!suggestions || !targetId) return;

    container.innerHTML = '';

    const title = document.createElement('div');
    title.style.cssText = 'width:100%;font-size:13px;color:var(--text-secondary);margin-bottom:6px;';
    title.textContent = currentLang === 'ar' ? '💡 اقتراحات سريعة: اضغط للإضافة' : currentLang === 'en' ? '💡 Quick suggestions: click to add' : '💡 Suggestions rapides: cliquer pour ajouter';
    container.appendChild(title);

    suggestions.forEach(s => {
        const chip = document.createElement('span');
        chip.className = 'suggestion-chip';
        chip.textContent = s.label;
        chip.dataset.text = s.text;

        // Check if already in textarea
        const ta = document.getElementById(targetId);
        if (ta && ta.value.split('\n').includes(s.text)) {
            chip.classList.add('active');
        }

        chip.addEventListener('click', () => {
            const textarea = document.getElementById(targetId);
            if (!textarea) return;
            const lines = textarea.value.split('\n');
            const idx = lines.indexOf(s.text);
            if (idx > -1) {
                lines.splice(idx, 1);
                textarea.value = lines.join('\n');
                chip.classList.remove('active');
            } else {
                if (textarea.value && !textarea.value.endsWith('\n')) textarea.value += '\n';
                textarea.value += s.text;
                chip.classList.add('active');
            }
            textarea.dispatchEvent(new Event('input'));
        });

        container.appendChild(chip);
    });
}

function renderAllSuggestionChips() {
    document.querySelectorAll('.suggestion-container').forEach(el => {
        renderSuggestionChips(el.id);
    });
}

