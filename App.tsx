
import React, { useState, useCallback } from 'react';
import { Product, CartItem } from './types';
import { BAKERY_PRODUCTS } from './constants';
import Header from './components/Header';
import ProductCard from './components/ProductCard';
import AIAdvisor from './components/AIAdvisor';

const App: React.FC = () => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [checkoutStep, setCheckoutStep] = useState<'cart' | 'details' | 'success'>('cart');

  const addToCart = useCallback((product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => 
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  }, []);

  const removeFromCart = (id: string) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const updateQuantity = (id: string, delta: number) => {
    setCart(prev => prev.map(item => {
      if (item.id === id) {
        const newQty = Math.max(1, item.quantity + delta);
        return { ...item, quantity: newQty };
      }
      return item;
    }));
  };

  const categories = ['All', 'Cakes', 'Pastries', 'Cookies', 'Custom'];
  const filteredProducts = activeCategory === 'All' 
    ? BAKERY_PRODUCTS 
    : BAKERY_PRODUCTS.filter(p => p.category === activeCategory);

  const cartTotal = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  const handleCheckout = () => {
    if (checkoutStep === 'cart') setCheckoutStep('details');
    else if (checkoutStep === 'details') {
      setCheckoutStep('success');
      setCart([]);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header 
        cartCount={cartCount} 
        onCartClick={() => setIsCartOpen(true)} 
        onHomeClick={() => {}} 
      />

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative h-[80vh] flex items-center justify-center overflow-hidden bg-pink-soft">
          <div className="absolute inset-0 z-0">
            <img 
              src="https://images.unsplash.com/photo-1555507036-ab1f4038808a?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80" 
              alt="Bakery Interior" 
              className="w-full h-full object-cover opacity-30"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-pink-100/50 to-pink-soft"></div>
          </div>
          
          <div className="relative z-10 text-center px-4 max-w-4xl">
            <h1 className="text-5xl md:text-7xl font-serif text-rose-deep mb-6 leading-tight">
              Crafting Edible <br/><span className="italic">Works of Art</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-700 mb-10 max-w-2xl mx-auto leading-relaxed">
              Indulge in our exquisite collection of handmade treats, where every bite is a celebration of flavor and pink aesthetics.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
              <a href="#menu" className="w-full sm:w-auto px-8 py-4 bg-rose-500 text-white rounded-full font-semibold hover:bg-rose-600 transition-all shadow-lg hover:shadow-xl">
                Browse the Menu
              </a>
              <button onClick={() => setCheckoutStep('cart')} className="w-full sm:w-auto px-8 py-4 bg-white text-rose-500 border-2 border-rose-500 rounded-full font-semibold hover:bg-pink-50 transition-all">
                Custom Orders
              </button>
            </div>
          </div>
        </section>

        {/* Categories & Menu */}
        <section id="menu" className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-serif text-gray-800 mb-4">Our Sweet Collections</h2>
            <div className="w-24 h-1 bg-pink-300 mx-auto rounded-full mb-8"></div>
            
            <div className="flex flex-wrap justify-center gap-4 mb-12">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-6 py-2 rounded-full font-medium transition-all ${
                    activeCategory === cat 
                      ? 'bg-rose-500 text-white shadow-md' 
                      : 'bg-white text-gray-500 border border-pink-100 hover:border-pink-300'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map(product => (
              <ProductCard 
                key={product.id} 
                product={product} 
                onAddToCart={addToCart} 
              />
            ))}
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="bg-white py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-2 gap-16 items-center">
            <div className="relative">
              <div className="absolute -top-4 -left-4 w-full h-full border-2 border-pink-200 rounded-2xl"></div>
              <img 
                src="https://images.unsplash.com/photo-1517433670267-08bbd4be890f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
                alt="Baker working" 
                className="relative z-10 rounded-2xl shadow-xl w-full"
              />
            </div>
            <div>
              <h2 className="text-4xl font-serif text-gray-800 mb-6">Born from Passion</h2>
              <p className="text-gray-600 mb-6 leading-relaxed">
                At Rosé & Crumb, we believe that life is too short for ordinary desserts. Founded by pastry chef Isabella Rose in 2021, our boutique bakery focuses on high-quality ingredients and meticulous attention to detail.
              </p>
              <p className="text-gray-600 mb-8 leading-relaxed">
                Every frosting is whisked to perfection, and every petal is placed by hand. Our mission is to bring a touch of Parisian elegance and a whole lot of pink to your doorstep.
              </p>
              <div className="flex space-x-12">
                <div>
                  <div className="text-3xl font-bold text-rose-500 mb-1">100%</div>
                  <div className="text-sm text-gray-500 uppercase tracking-wider">Natural</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-rose-500 mb-1">Hand</div>
                  <div className="text-sm text-gray-500 uppercase tracking-wider">Decorated</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-rose-500 mb-1">Paris</div>
                  <div className="text-sm text-gray-500 uppercase tracking-wider">Inspired</div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-pink-soft border-t border-pink-100 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center mb-12">
            <div className="mb-8 md:mb-0 text-center md:text-left">
              <span className="text-3xl font-serif font-bold text-pink-600 italic">Rosé & Crumb</span>
              <p className="mt-2 text-gray-500">123 Boulvard de Macaron, Pink City, FL 33101</p>
            </div>
            <div className="flex space-x-6">
              <a href="#" className="text-gray-400 hover:text-rose-500 transition-colors">Instagram</a>
              <a href="#" className="text-gray-400 hover:text-rose-500 transition-colors">Pinterest</a>
              <a href="#" className="text-gray-400 hover:text-rose-500 transition-colors">TikTok</a>
            </div>
          </div>
          <div className="text-center text-gray-400 text-sm">
            © 2024 Rosé & Crumb Bakery. All sweetness reserved.
          </div>
        </div>
      </footer>

      {/* Cart Drawer */}
      {isCartOpen && (
        <div className="fixed inset-0 z-[60] flex justify-end">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setIsCartOpen(false)}></div>
          <div className="relative w-full max-w-md bg-white h-full shadow-2xl flex flex-col animate-slide-in">
            <div className="p-6 border-b border-pink-100 flex justify-between items-center">
              <h2 className="text-2xl font-serif font-bold text-gray-800">Your Sweet Box</h2>
              <button onClick={() => { setIsCartOpen(false); setCheckoutStep('cart'); }} className="text-gray-400 hover:text-gray-600">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6">
              {checkoutStep === 'success' ? (
                <div className="text-center py-12">
                  <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-serif text-gray-800 mb-2">Order Confirmed!</h3>
                  <p className="text-gray-500">We're preheating the oven. You'll receive a confirmation email shortly.</p>
                  <button 
                    onClick={() => { setIsCartOpen(false); setCheckoutStep('cart'); }}
                    className="mt-8 px-8 py-3 bg-rose-500 text-white rounded-full font-semibold"
                  >
                    Keep Browsing
                  </button>
                </div>
              ) : checkoutStep === 'details' ? (
                <div className="space-y-6">
                  <h3 className="text-lg font-serif font-bold text-gray-700">Pickup Details</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                      <input type="text" className="w-full bg-pink-50 border-none rounded-xl px-4 py-2" placeholder="Your name" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                      <input type="email" className="w-full bg-pink-50 border-none rounded-xl px-4 py-2" placeholder="hello@example.com" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Pickup Date</label>
                      <input type="date" className="w-full bg-pink-50 border-none rounded-xl px-4 py-2" />
                    </div>
                  </div>
                  <div className="pt-6 border-t border-pink-100">
                    <div className="flex justify-between font-bold text-gray-800 mb-4">
                      <span>Total</span>
                      <span>R{cartTotal.toFixed(2)}</span>
                    </div>
                    <button 
                      onClick={handleCheckout}
                      className="w-full py-4 bg-rose-500 text-white rounded-xl font-bold shadow-lg hover:bg-rose-600 transition-colors"
                    >
                      Place Order
                    </button>
                    <button 
                      onClick={() => setCheckoutStep('cart')}
                      className="w-full py-2 mt-2 text-gray-400 text-sm"
                    >
                      Back to Cart
                    </button>
                  </div>
                </div>
              ) : cart.length === 0 ? (
                <div className="text-center py-20">
                  <p className="text-gray-400 italic">Your box is currently empty...</p>
                  <button 
                    onClick={() => setIsCartOpen(false)}
                    className="mt-4 text-rose-500 font-medium hover:underline"
                  >
                    Start picking treats
                  </button>
                </div>
              ) : (
                <div className="space-y-6">
                  {cart.map(item => (
                    <div key={item.id} className="flex space-x-4">
                      <img src={item.image} className="w-20 h-20 object-cover rounded-xl shadow-sm" />
                      <div className="flex-1">
                        <div className="flex justify-between items-start">
                          <h4 className="font-serif font-bold text-gray-800">{item.name}</h4>
                          <button onClick={() => removeFromCart(item.id)} className="text-gray-300 hover:text-rose-500">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          </button>
                        </div>
                        <p className="text-gray-500 text-sm mb-2">R{item.price.toFixed(2)}</p>
                        <div className="flex items-center space-x-3">
                          <button 
                            onClick={() => updateQuantity(item.id, -1)}
                            className="w-6 h-6 flex items-center justify-center bg-pink-100 rounded-full text-pink-600"
                          >
                            -
                          </button>
                          <span className="font-medium text-gray-700">{item.quantity}</span>
                          <button 
                            onClick={() => updateQuantity(item.id, 1)}
                            className="w-6 h-6 flex items-center justify-center bg-pink-100 rounded-full text-pink-600"
                          >
                            +
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                  
                  <div className="pt-6 border-t border-pink-100">
                    <div className="flex justify-between text-gray-500 mb-2">
                      <span>Subtotal</span>
                      <span>R{cartTotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between font-bold text-gray-800 text-lg mb-6">
                      <span>Total</span>
                      <span>R{cartTotal.toFixed(2)}</span>
                    </div>
                    <button 
                      onClick={handleCheckout}
                      className="w-full py-4 bg-rose-500 text-white rounded-xl font-bold shadow-lg hover:bg-rose-600 transition-colors"
                    >
                      Proceed to Details
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      <AIAdvisor />
    </div>
  );
};

export default App;
