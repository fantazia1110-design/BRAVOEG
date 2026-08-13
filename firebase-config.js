// ==================== FIREBASE CONFIGURATION ====================
// File: firebase-config.js
// Description: Firebase Realtime Database & ImgBB Integration
// Version: 3.1 - Fixed testConnection (onValue instead of get)

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { 
    getDatabase, 
    ref, 
    set, 
    get, 
    push, 
    update, 
    remove, 
    onValue
} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-database.js";
import { 
    getStorage, 
    ref as storageRef, 
    uploadBytes, 
    getDownloadURL,
    deleteObject 
} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-storage.js";

// ==================== FIREBASE CONFIG ====================
const firebaseConfig = {
    apiKey: "AIzaSyARSfRX09EHrwwMvk7q0Y1VOQuvvtFuADc",
    authDomain: "date-c74fc.firebaseapp.com",
    databaseURL: "https://date-c74fc-default-rtdb.firebaseio.com",
    projectId: "date-c74fc",
    storageBucket: "date-c74fc.firebasestorage.app",
    messagingSenderId: "149705983794",
    appId: "1:149705983794:web:257085b8b55b3f31f1b92b",
    measurementId: "G-2GPNF97PEB"
};

// Initialize Firebase (avoid duplicate initialization when another script already initialized)
let app, database, storage;
if (window.database) {
    console.log('🔁 firebase-config: Detected existing database, reusing');
    database = window.database;
    if (window.storage) {
        storage = window.storage;
    } else {
        storage = getStorage();
        window.storage = storage;
    }
} else {
    try {
        app = initializeApp(firebaseConfig);
        database = getDatabase(app);
        storage = getStorage(app);
        window.database = database;
        window.storage = storage;
    } catch (e) {
        console.warn('⚠️ firebase-config: Init error, maybe already initialized by app.js');
        database = window.database || null;
        storage = window.storage || null;
    }
}

// ==================== ImgBB API KEY ====================
const IMGBB_API_KEY = "533ce68054fa8f013b543214a219f800"; // ✅ Your API Key

// ==================== ADMIN SECRET KEY ====================
const ADMIN_SECRET_KEY = 'BRAVO_ali_hossam';

// ==================== FIREBASE DATABASE MANAGER ====================
const firebaseDB = {
    
    // ========== PRODUCTS METHODS ==========
    
    async addProduct(productData) {
        try {
            const newProductRef = push(ref(database, 'products'));
            const productWithMetadata = {
                ...productData,
                id: newProductRef.key,
                createdAt: Date.now(),
                updatedAt: Date.now()
            };
            
            await set(newProductRef, productWithMetadata);
            console.log('✅ Product added:', newProductRef.key);
            return newProductRef.key;
        } catch (error) {
            console.error('❌ Error adding product:', error);
            throw error;
        }
    },

    async updateProduct(productId, productData) {
        try {
            const productRef = ref(database, `products/${productId}`);
            await update(productRef, {
                ...productData,
                updatedAt: Date.now()
            });
            console.log('✅ Product updated:', productId);
        } catch (error) {
            console.error('❌ Error updating product:', error);
            throw error;
        }
    },

    async deleteProduct(productId) {
        try {
            const productSnapshot = await get(ref(database, `products/${productId}`));
            if (productSnapshot.exists()) {
                const productData = productSnapshot.val();
                
                // Delete Firebase Storage image
                if (productData.image && productData.image.includes('firebasestorage')) {
                    try {
                        const imageUrl = decodeURIComponent(productData.image);
                        const pathMatch = imageUrl.match(/\/o\/(.+?)\?/);
                        if (pathMatch) {
                            const imagePath = pathMatch[1].replace(/%2F/g, '/');
                            const imageRef = storageRef(storage, imagePath);
                            await deleteObject(imageRef);
                            console.log('🗑️ Firebase image deleted');
                        }
                    } catch (error) {
                        console.log('⚠️ Image deletion warning:', error.message);
                    }
                }
            }
            
            await remove(ref(database, `products/${productId}`));
            console.log('✅ Product deleted:', productId);
        } catch (error) {
            console.error('❌ Error deleting product:', error);
            throw error;
        }
    },

    async getProducts() {
        try {
            const snapshot = await get(ref(database, 'products'));
            if (snapshot.exists()) {
                const products = Object.entries(snapshot.val()).map(([id, data]) => ({
                    ...data,
                    id: id
                }));
                console.log(`📦 Loaded ${products.length} products`);
                return products;
            }
            return [];
        } catch (error) {
            console.error('❌ Error getting products:', error);
            return [];
        }
    },

    async getProduct(productId) {
        try {
            const snapshot = await get(ref(database, `products/${productId}`));
            return snapshot.exists() ? { ...snapshot.val(), id: productId } : null;
        } catch (error) {
            console.error('❌ Error getting product:', error);
            return null;
        }
    },

    onProductsChange(callback) {
        const productsRef = ref(database, 'products');
        return onValue(productsRef, (snapshot) => {
            const products = snapshot.exists() 
                ? Object.entries(snapshot.val()).map(([id, data]) => ({ ...data, id }))
                : [];
            callback(products);
        }, (error) => {
            console.error('❌ Error listening to products:', error);
            callback([]);
        });
    },

    // ========== ORDERS METHODS ==========
    
    async addOrder(orderData) {
        try {
            const newOrderRef = push(ref(database, 'orders'));
            const orderWithMetadata = {
                ...orderData,
                orderId: newOrderRef.key,
                status: orderData.status || 'pending',
                createdAt: Date.now(),
                updatedAt: Date.now()
            };
            
            await set(newOrderRef, orderWithMetadata);
            console.log('✅ Order added:', newOrderRef.key);
            return newOrderRef.key;
        } catch (error) {
            console.error('❌ Error adding order:', error);
            throw error;
        }
    },

    async updateOrder(orderId, orderData) {
        try {
            const orderRef = ref(database, `orders/${orderId}`);
            await update(orderRef, {
                ...orderData,
                updatedAt: Date.now()
            });
            console.log('✅ Order updated:', orderId);
        } catch (error) {
            console.error('❌ Error updating order:', error);
            throw error;
        }
    },

    async deleteOrder(orderId) {
        try {
            const orderSnapshot = await get(ref(database, `orders/${orderId}`));
            if (orderSnapshot.exists()) {
                const orderData = orderSnapshot.val();
                
                if (orderData.transferProof && orderData.transferProof.includes('firebasestorage')) {
                    try {
                        const imageUrl = decodeURIComponent(orderData.transferProof);
                        const pathMatch = imageUrl.match(/\/o\/(.+?)\?/);
                        if (pathMatch) {
                            const imagePath = pathMatch[1].replace(/%2F/g, '/');
                            const imageRef = storageRef(storage, imagePath);
                            await deleteObject(imageRef);
                            console.log('🗑️ Transfer image deleted');
                        }
                    } catch (error) {
                        console.log('⚠️ Image deletion warning:', error.message);
                    }
                }
            }
            
            await remove(ref(database, `orders/${orderId}`));
            console.log('✅ Order deleted:', orderId);
        } catch (error) {
            console.error('❌ Error deleting order:', error);
            throw error;
        }
    },

    async getOrders() {
        try {
            const snapshot = await get(ref(database, 'orders'));
            if (snapshot.exists()) {
                const orders = Object.entries(snapshot.val()).map(([id, data]) => ({
                    ...data,
                    orderId: id
                }));
                console.log(`🛒 Loaded ${orders.length} orders`);
                return orders;
            }
            return [];
        } catch (error) {
            console.error('❌ Error getting orders:', error);
            return [];
        }
    },

    async getOrdersByStatus(status) {
        try {
            const allOrders = await this.getOrders();
            return allOrders.filter(order => order.status === status);
        } catch (error) {
            console.error('❌ Error getting orders by status:', error);
            return [];
        }
    },

    async getOrder(orderId) {
        try {
            const snapshot = await get(ref(database, `orders/${orderId}`));
            return snapshot.exists() ? { ...snapshot.val(), orderId } : null;
        } catch (error) {
            console.error('❌ Error getting order:', error);
            return null;
        }
    },

    onOrdersChange(callback) {
        const ordersRef = ref(database, 'orders');
        return onValue(ordersRef, (snapshot) => {
            const orders = snapshot.exists() 
                ? Object.entries(snapshot.val()).map(([id, data]) => ({ ...data, orderId: id }))
                : [];
            callback(orders);
        }, (error) => {
            console.error('❌ Error listening to orders:', error);
            callback([]);
        });
    },

    async confirmOrder(orderId) {
        try {
            await this.updateOrder(orderId, { 
                status: 'confirmed',
                confirmedAt: Date.now()
            });
            console.log('✅ Order confirmed:', orderId);
        } catch (error) {
            console.error('❌ Error confirming order:', error);
            throw error;
        }
    },

    async rejectOrder(orderId, reason = '') {
        try {
            await this.updateOrder(orderId, { 
                status: 'rejected',
                rejectionReason: reason,
                rejectedAt: Date.now()
            });
            console.log('❌ Order rejected:', orderId);
        } catch (error) {
            console.error('❌ Error rejecting order:', error);
            throw error;
        }
    },

    // ========== IMAGE UPLOAD METHODS ==========
    
    async uploadImageToFirebase(file, path = 'images') {
        try {
            const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif'];
            if (!validTypes.includes(file.type)) {
                throw new Error('❌ نوع ملف غير مدعوم. استخدم: JPG, PNG, WebP, GIF');
            }

            if (file.size > 10 * 1024 * 1024) {
                throw new Error('❌ حجم الملف كبير جداً. الحد الأقصى 10MB');
            }

            const timestamp = Date.now();
            const fileName = `${timestamp}_${file.name.replace(/[^a-zA-Z0-9.]/g, '_')}`;
            const imageRef = storageRef(storage, `${path}/${fileName}`);
            
            const snapshot = await uploadBytes(imageRef, file);
            const downloadURL = await getDownloadURL(snapshot.ref);
            
            console.log('✅ Firebase Upload Success:', downloadURL);
            return downloadURL;
        } catch (error) {
            console.error('❌ Firebase Upload Error:', error);
            throw error;
        }
    },

    async uploadImageToImgBB(file) {
        try {
            if (!IMGBB_API_KEY || IMGBB_API_KEY === 'YOUR_IMGBB_API_KEY') {
                throw new Error('❌ ImgBB API Key غير موجود');
            }

            return new Promise((resolve, reject) => {
                const reader = new FileReader();
                
                reader.onload = async function(e) {
                    try {
                        const base64Data = e.target.result.split(',')[1];
                        const formData = new FormData();
                        formData.append('key', IMGBB_API_KEY);
                        formData.append('image', base64Data);
                        
                        const response = await fetch('https://api.imgbb.com/1/upload', {
                            method: 'POST',
                            body: formData
                        });
                        
                        const data = await response.json();
                        
                        if (data.success) {
                            console.log('✅ ImgBB Upload Success:', data.data.url);
                            resolve(data.data.url);
                        } else {
                            throw new Error(data.error?.message || 'فشل الرفع');
                        }
                    } catch (error) {
                        console.error('❌ ImgBB Upload Error:', error);
                        reject(error);
                    }
                };
                
                reader.onerror = () => reject(new Error('فشل قراءة الملف'));
                reader.readAsDataURL(file);
            });
        } catch (error) {
            console.error('❌ ImgBB Error:', error);
            throw error;
        }
    },

    async uploadImage(file, path = 'images', method = 'imgbb') {
        try {
            console.log(`📤 Uploading via ${method}...`);
            
            if (method === 'imgbb') {
                return await this.uploadImageToImgBB(file);
            } else {
                return await this.uploadImageToFirebase(file, path);
            }
        } catch (error) {
            console.error(`❌ ${method} failed, trying fallback...`);
            
            // Fallback
            try {
                if (method === 'imgbb') {
                    return await this.uploadImageToFirebase(file, path);
                } else {
                    return await this.uploadImageToImgBB(file);
                }
            } catch (fallbackError) {
                console.error('❌ Both upload methods failed:', fallbackError);
                throw fallbackError;
            }
        }
    },

    async uploadBase64Image(base64Data, path = 'images') {
        try {
            const response = await fetch(base64Data);
            const blob = await response.blob();
            const timestamp = Date.now();
            const file = new File([blob], `image_${timestamp}.jpg`, { type: 'image/jpeg' });
            return await this.uploadImage(file, path);
        } catch (error) {
            console.error('❌ Base64 upload error:', error);
            throw error;
        }
    },

    async deleteImage(imageUrl) {
        try {
            if (imageUrl && imageUrl.includes('firebasestorage')) {
                const decodedUrl = decodeURIComponent(imageUrl);
                const pathMatch = decodedUrl.match(/\/o\/(.+?)\?/);
                if (pathMatch) {
                    const imagePath = pathMatch[1].replace(/%2F/g, '/');
                    const imageRef = storageRef(storage, imagePath);
                    await deleteObject(imageRef);
                    console.log('🗑️ Image deleted successfully');
                }
            }
        } catch (error) {
            console.error('❌ Delete image error:', error);
        }
    },

    // ========== STATISTICS ==========
    
    async getStatistics() {
        try {
            const [products, orders] = await Promise.all([
                this.getProducts(),
                this.getOrders()
            ]);

            const pending = orders.filter(o => o.status === 'pending').length;
            const confirmed = orders.filter(o => o.status === 'confirmed').length;
            const rejected = orders.filter(o => o.status === 'rejected').length;

            let totalRevenue = 0;
            orders.filter(o => o.status === 'confirmed').forEach(order => {
                const price = parseFloat(order.price || 0);
                totalRevenue += order.currency === 'EGP' ? price : price * 50;
            });

            return {
                totalProducts: products.length,
                totalOrders: orders.length,
                pendingOrders: pending,
                confirmedOrders: confirmed,
                rejectedOrders: rejected,
                totalRevenue: totalRevenue.toFixed(2)
            };
        } catch (error) {
            console.error('❌ Stats error:', error);
            return {
                totalProducts: 0,
                totalOrders: 0,
                pendingOrders: 0,
                confirmedOrders: 0,
                rejectedOrders: 0,
                totalRevenue: 0
            };
        }
    },

    // ========== UTILITIES ==========
    
    async clearAllData() {
        const userInput = window.prompt('⚠️ اكتب "DELETE" لحذف كل البيانات:');
        if (userInput === 'DELETE') {
            try {
                await Promise.all([
                    remove(ref(database, 'products')),
                    remove(ref(database, 'orders'))
                ]);
                console.log('🗑️ All data cleared');
                alert('✅ تم حذف جميع البيانات');
            } catch (error) {
                console.error('❌ Clear error:', error);
                alert('❌ فشل الحذف');
            }
        }
    },

    async exportData() {
        try {
            const [products, orders] = await Promise.all([
                this.getProducts(),
                this.getOrders()
            ]);
            
            const exportData = { 
                products, 
                orders,
                exportDate: new Date().toISOString()
            };
            
            const dataStr = JSON.stringify(exportData, null, 2);
            const dataBlob = new Blob([dataStr], { type: 'application/json' });
            const url = URL.createObjectURL(dataBlob);
            const link = document.createElement('a');
            link.href = url;
            link.download = `bravo_backup_${Date.now()}.json`;
            link.click();
            URL.revokeObjectURL(url);
            
            console.log('✅ Data exported');
            return exportData;
        } catch (error) {
            console.error('❌ Export error:', error);
            return { products: [], orders: [] };
        }
    },

    async testConnection() {
        return new Promise((resolve) => {
            try {
                const connectedRef = ref(database, '.info/connected');
                let settled = false;
                const done = (result) => {
                    if (settled) return;
                    settled = true;
                    if (typeof unsub === 'function') unsub();
                    console.log(result ? '✅ Firebase Connected' : '❌ Disconnected');
                    resolve(result);
                };
                let unsub = null;
                unsub = onValue(connectedRef, (snap) => {
                    if (snap.val() === true) done(true);
                }, (error) => {
                    console.error('❌ Connection test failed:', error);
                    done(false);
                });
                setTimeout(() => done(false), 8000);
            } catch (error) {
                console.error('❌ Connection test failed:', error);
                resolve(false);
            }
        });
    }
};

// ==================== AUTO INITIALIZATION ====================
(async () => {
    try {
        console.log('🔄 Initializing Firebase...');
        const connected = await firebaseDB.testConnection();
        if (connected) {
            console.log('✅ Firebase Realtime Database Connected!');
            console.log('📡 Database:', firebaseConfig.databaseURL);
            console.log('🗄️ Storage:', firebaseConfig.storageBucket);
            console.log('🖼️ ImgBB: Configured');
        } else {
            console.warn('⚠️ Firebase connection issue detected');
        }
    } catch (error) {
        console.error('❌ Firebase Init Error:', error);
    }
})();

// ==================== GLOBAL EXPORTS ====================
window.firebaseDB = firebaseDB;
window.ADMIN_SECRET_KEY = ADMIN_SECRET_KEY;
window.IMGBB_API_KEY = IMGBB_API_KEY;

export { database, storage, IMGBB_API_KEY, ADMIN_SECRET_KEY };
export default firebaseDB;