
import React, { useState } from 'react';
import { Product } from '../types';
import { generateDescription } from '../services/geminiService';

interface AdminDashboardProps {
  products: Product[];
  onAddProduct: (p: Product) => void;
  onUpdateProduct: (p: Product) => void;
  onDeleteProduct: (id: string) => void;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ products, onAddProduct, onUpdateProduct, onDeleteProduct }) => {
  const [isAdding, setIsAdding] = useState(false);
  const [loadingAI, setLoadingAI] = useState(false);
  const [formData, setFormData] = useState({ name: '', description: '', price: 0, discountPercentage: 0, category: 'كيك ومناسبات', image: '' });

  const handleAISuggest = async () => {
    if (!formData.name) return alert('أدخلي الاسم أولاً');
    setLoadingAI(true);
    const desc = await generateDescription(formData.name);
    setFormData({ ...formData, description: desc });
    setLoadingAI(false);
  };

  const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setFormData({ ...formData, image: reader.result as string });
      reader.readAsDataURL(file);
    }
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    onAddProduct({ ...formData, id: Date.now().toString(), createdAt: Date.now() });
    setIsAdding(false);
    setFormData({ name: '', description: '', price: 0, discountPercentage: 0, category: 'كيك ومناسبات', image: '' });
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <div className="flex justify-between items-center mb-10">
        <h2 className="text-3xl font-black text-gray-800">لوحة التحكم 🛠️</h2>
        <button onClick={() => setIsAdding(!isAdding)} className="bg-pink-600 text-white px-6 py-3 rounded-2xl font-bold shadow-lg">
          {isAdding ? 'إغلاق' : 'إضافة منتج +'}
        </button>
      </div>

      {isAdding && (
        <form onSubmit={submit} className="bg-white p-8 rounded-[40px] shadow-xl mb-12 border border-pink-50">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <input type="text" placeholder="اسم المنتج" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full p-4 bg-gray-50 rounded-2xl border-none outline-none focus:ring-2 focus:ring-pink-500" required />
              <div className="relative">
                <textarea placeholder="وصف المنتج" value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} className="w-full p-4 bg-gray-50 rounded-2xl border-none outline-none min-h-[150px]" required />
                <button type="button" onClick={handleAISuggest} className="absolute bottom-4 left-4 text-pink-500 font-bold text-xs">{loadingAI ? 'جاري التوليد...' : '✨ ذكاء اصطناعي'}</button>
              </div>
            </div>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <input type="number" placeholder="السعر" onChange={e => setFormData({...formData, price: Number(e.target.value)})} className="w-full p-4 bg-gray-50 rounded-2xl" required />
                <input type="number" placeholder="خصم %" onChange={e => setFormData({...formData, discountPercentage: Number(e.target.value)})} className="w-full p-4 bg-gray-50 rounded-2xl" />
              </div>
              <select onChange={e => setFormData({...formData, category: e.target.value})} className="w-full p-4 bg-gray-50 rounded-2xl border-none">
                <option>كيك ومناسبات</option>
                <option>بسكويت وبراونيز</option>
                <option>موالح</option>
              </select>
              <div className="border-2 border-dashed border-pink-100 p-4 rounded-2xl text-center relative h-32 flex items-center justify-center">
                <input type="file" onChange={handleImage} className="absolute inset-0 opacity-0 cursor-pointer" />
                {formData.image ? <img src={formData.image} className="h-full object-contain" /> : <span className="text-pink-300">ارفعي صورة المنتج 📸</span>}
              </div>
              <button type="submit" className="w-full bg-pink-600 text-white py-4 rounded-2xl font-black text-xl shadow-xl">نشر في المتجر 🚀</button>
            </div>
          </div>
        </form>
      )}

      <div className="bg-white rounded-[32px] overflow-hidden border border-pink-50">
        <table className="w-full text-right">
          <thead className="bg-pink-50"><tr><th className="p-4">المنتج</th><th className="p-4">السعر</th><th className="p-4">التحكم</th></tr></thead>
          <tbody>
            {products.map(p => (
              <tr key={p.id} className="border-b border-pink-50">
                <td className="p-4 flex items-center gap-3"><img src={p.image} className="w-10 h-10 rounded-lg object-cover" /> {p.name}</td>
                <td className="p-4 font-bold">{p.price} ر.س</td>
                <td className="p-4"><button onClick={() => onDeleteProduct(p.id)} className="text-red-400">حذف</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminDashboard;
