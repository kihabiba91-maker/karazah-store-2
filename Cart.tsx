
import React from 'react';
import { CartItem } from '../types';

interface CartProps {
  items: CartItem[];
  onUpdateQuantity: (id: string, d: number) => void;
  onRemoveItem: (id: string) => void;
  onClear: () => void;
}

const Cart: React.FC<CartProps> = ({ items, onUpdateQuantity, onRemoveItem, onClear }) => {
  const total = items.reduce((s, i) => s + (i.price * (1 - i.discountPercentage/100) * i.quantity), 0);

  if (items.length === 0) return <div className="text-center py-20 text-gray-400">السلة فارغة 🛒</div>;

  return (
    <div className="max-w-3xl mx-auto p-6">
      <div className="flex justify-between items-center mb-8"><h2 className="text-3xl font-black">سلتكِ 🛒</h2><button onClick={onClear} className="text-red-400">تفريغ</button></div>
      <div className="bg-white rounded-[30px] shadow-sm border border-pink-50 p-6 space-y-6">
        {items.map(item => (
          <div key={item.id} className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <img src={item.image} className="w-16 h-16 rounded-xl object-cover" />
              <div><h4 className="font-bold">{item.name}</h4><p className="text-pink-600 font-black">{item.price * (1 - item.discountPercentage/100)} ر.س</p></div>
            </div>
            <div className="flex items-center gap-4">
              <div className="bg-pink-50 rounded-lg flex items-center"><button onClick={() => onUpdateQuantity(item.id, -1)} className="p-2">-</button><span className="px-4 font-bold">{item.quantity}</span><button onClick={() => onUpdateQuantity(item.id, 1)} className="p-2">+</button></div>
              <button onClick={() => onRemoveItem(item.id)} className="text-gray-300">X</button>
            </div>
          </div>
        ))}
        <div className="border-t border-pink-50 pt-6 flex justify-between items-center"><span className="text-xl font-bold">الإجمالي:</span><span className="text-2xl font-black text-pink-600">{total} ر.س</span></div>
        <button className="w-full bg-pink-600 text-white py-4 rounded-2xl font-black text-xl shadow-xl">إتمام الطلب ✅</button>
      </div>
    </div>
  );
};

export default Cart;
