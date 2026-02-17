
import React from 'react';

interface HeaderProps {
  cartCount: number;
  onCartClick: () => void;
  onHomeClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ cartCount, onCartClick, onHomeClick }) => {
  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-pink-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex-shrink-0 flex items-center cursor-pointer" onClick={onHomeClick}>
            <span className="text-2xl font-serif font-bold text-pink-600 italic">Rosé & Crumb</span>
          </div>
          
          <nav className="hidden md:flex space-x-8">
            <a href="#menu" className="text-gray-600 hover:text-pink-500 font-medium transition-colors">Menu</a>
            <a href="#about" className="text-gray-600 hover:text-pink-500 font-medium transition-colors">Our Story</a>
            <a href="#location" className="text-gray-600 hover:text-pink-500 font-medium transition-colors">Boutique</a>
          </nav>

          <div className="flex items-center space-x-4">
            <button 
              onClick={onCartClick}
              className="relative p-2 text-pink-600 hover:bg-pink-50 rounded-full transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              {cartCount > 0 && (
                <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-rose-500 rounded-full">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
