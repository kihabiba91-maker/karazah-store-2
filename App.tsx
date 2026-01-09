
import React, { useState, useEffect } from 'react';
import { Product, CartItem, ViewType } from '../types';
import Header from './Header';
import ProductCard from './ProductCard';
import AdminDashboard from './AdminDashboard';
import Cart from './Cart';
import { AdminLoginModal } from './AdminLoginModal';

const App: React.FC = () => {
  const [view, setView] = useState<ViewType>('shop');
  const [products, setProducts] = useState<Product[]>([]);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('الكل');
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [logoClickCount, setLogoClickCount] = useState(0);
  const [adminPassword, setAdminPassword] = useState('123456');

  useEffect(() => {
    const savedProducts = localStorage.getItem('karazah_products');
    if (savedProducts) {
      setProducts(JSON.parse(savedProducts));
    } else {
      const defaults: Product[] = [
        {
          id: '1',
          name: 'بسكويت الكرز الفاخر',
          description: 'بسكويت مقرمش محشو بمربى الكرز الطبيعي ومغطى بطبقة رقيقة من السكر.',
          price: 45,
          discountPercentage: 10,
          category: 'بسكويت وبراونيز',
          image: 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?auto=format&fit=crop&q=80&w=400',
          createdAt: Date.now()
        }
      ];
      setProducts(defaults);
    }
    const savedCart = localStorage.getItem('karazah_cart');
    if (savedCart) setCart(JSON.parse(savedCart));
    
    if (sessionStorage.getItem('karazah_admin_auth') === 'true') setIsAdminAuthenticated(true);
  }, []);

  useEffect(() => {
    localStorage.setItem('karazah_products', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem('karazah_cart', JSON.stringify(cart));
  }, [cart]);

  const handleLogoClick = () => {
    setLogoClickCount(prev => {
      if (prev + 1 === 5) {
        setShowLoginModal(true);
        return 0;
      }
      return prev + 1;
    });
    setTimeout(() => setLogoClickCount(0), 2000);
  };

  const categories = ['الكل', ...Array.from(new Set(products.map(p => p.category)))];
  const filteredProducts = selectedCategory === 'الكل' 
    ? products 
    : products.filter(p => p.category === selectedCategory);

  return (
    <div className="min-h-screen pb-20 bg-[#fff5f6]">
      <Header 
        currentView={view} 
        setView={setView} 
        cartCount={cart.reduce((s, i) => s + i.quantity, 0)}
        isAdmin={isAdminAuthenticated}
        onLogout={() => { setIsAdminAuthenticated(false); setView('shop'); sessionStorage.removeItem('karazah_admin_auth'); }}
        onLogoClick={handleLogoClick}
        onShare={() => alert('رابط المتجر منسوخ!')}
      />

      <main>
        {view === 'shop' && (
          <div className="max-w-7xl mx-auto px-4 py-8">
            <div className="bg-pink-600 rounded-[40px] p-12 mb-12 text-white shadow-2xl relative overflow-hidden">
              <h2 className="text-5xl font-black mb-4">متجر كرزة 🍒</h2>
              <p className="text-pink-100 text-xl">أهلاً بك في عالم الحلويات المنزلية الفاخرة</p>
            </div>

            <div className="flex space-x-reverse space-x-3 mb-8 overflow-x-auto pb-4 no-scrollbar">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-6 py-3 rounded-2xl font-bold transition-all ${selectedCategory === cat ? 'bg-pink-600 text-white shadow-lg' : 'bg-white text-gray-500 hover:bg-pink-50'}`}
                >
                  {cat}
                </button>
              ))}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {filteredProducts.map(product => (
                <ProductCard key={product.id} product={product} onAddToCart={(p) => {
                  setCart(prev => {
                    const existing = prev.find(item => item.id === p.id);
                    if (existing) return prev.map(item => item.id === p.id ? { ...item, quantity: item.quantity + 1 } : item);
                    return [...prev, { ...p, quantity: 1 }];
                  });
                }} />
              ))}
            </div>
          </div>
        )}

        {view === 'admin' && isAdminAuthenticated && (
          <AdminDashboard 
            products={products}
            onAddProduct={(p) => setProducts([...products, p])}
            onUpdateProduct={(up) => setProducts(products.map(p => p.id === up.id ? up : p))}
            onDeleteProduct={(id) => setProducts(products.filter(p => p.id !== id))}
          />
        )}

        {view === 'cart' && (
          <Cart 
            items={cart}
            onUpdateQuantity={(id, d) => setCart(prev => prev.map(i => i.id === id ? {...i, quantity: Math.max(1, i.quantity + d)} : i))}
            onRemoveItem={(id) => setCart(prev => prev.filter(i => i.id !== id))}
            onClear={() => setCart([])}
          />
        )}
      </main>

      {showLoginModal && (
        <AdminLoginModal 
          onClose={() => setShowLoginModal(false)} 
          onSuccess={() => { setIsAdminAuthenticated(true); setShowLoginModal(false); sessionStorage.setItem('karazah_admin_auth', 'true'); setView('admin'); }}
          correctPassword={adminPassword}
        />
      )}
    </div>
  );
};

export default App;
