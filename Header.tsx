
import React from 'react';
import { CherryIcon, CartIcon, AdminIcon } from './Icons';
import { ViewType } from '../types';

interface HeaderProps {
  currentView: ViewType;
  setView: (view: ViewType) => void;
  cartCount: number;
  isAdmin: boolean;
  onLogout: () => void;
  onLogoClick: () => void;
  onShare: () => void;
}

const Header: React.FC<HeaderProps> = ({ currentView, setView, cartCount, isAdmin, onLogout, onLogoClick }) => {
  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-pink-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 h-20 flex justify-between items-center">
        <div onClick={onLogoClick} className="flex items-center cursor-pointer group">
          <div className="bg-pink-500 p-2 rounded-xl text-white group-hover:rotate-12 transition-transform">
            <CherryIcon />
          </div>
          <span className="mr-3 text-2xl font-black text-pink-600">كرزة</span>
        </div>

        <nav className="flex items-center space-x-reverse space-x-2">
          <button onClick={() => setView('shop')} className={`px-4 py-2 rounded-xl font-bold ${currentView === 'shop' ? 'bg-pink-500 text-white' : 'text-gray-500'}`}>المتجر</button>
          {isAdmin && <button onClick={() => setView('admin')} className={`px-4 py-2 rounded-xl font-bold ${currentView === 'admin' ? 'bg-pink-500 text-white' : 'bg-pink-50 text-pink-600'}`}>لوحة التحكم</button>}
          <button onClick={() => setView('cart')} className="relative p-2 bg-pink-50 text-pink-500 rounded-xl">
            <CartIcon />
            {cartCount > 0 && <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] px-1.5 py-0.5 rounded-full">{cartCount}</span>}
          </button>
          {isAdmin && <button onClick={onLogout} className="text-gray-400 text-xs mr-2 font-bold">خروج</button>}
        </nav>
      </div>
    </header>
  );
};

export default Header;
