
import React, { useState } from 'react';

interface AdminLoginModalProps {
  onClose: () => void;
  onSuccess: () => void;
  correctPassword: string;
}

export const AdminLoginModal: React.FC<AdminLoginModalProps> = ({ onClose, onSuccess, correctPassword }) => {
  const [pass, setPass] = useState('');
  const [err, setErr] = useState('');

  return (
    <div className="fixed inset-0 z-[100] bg-pink-900/40 backdrop-blur-xl flex items-center justify-center p-4">
      <div className="bg-white p-12 rounded-[50px] w-full max-w-sm text-center shadow-2xl">
        <h2 className="text-3xl font-black mb-8">إدارة كرزة 🍒</h2>
        <input type="password" value={pass} onChange={e => {setPass(e.target.value); setErr('');}} className="w-full p-4 bg-gray-50 rounded-2xl text-center text-2xl font-black mb-4" placeholder="الرمز السري" />
        {err && <p className="text-red-500 mb-4 font-bold">{err}</p>}
        <button onClick={() => pass === correctPassword ? onSuccess() : setErr('خطأ! 🔒')} className="w-full bg-pink-600 text-white py-4 rounded-2xl font-black mb-4">دخول</button>
        <button onClick={onClose} className="text-gray-400 font-bold">إلغاء</button>
      </div>
    </div>
  );
};
