
import React from 'react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart }) => {
  const discountedPrice = product.price * (1 - product.discountPercentage / 100);

  return (
    <div className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all border border-pink-50 flex flex-col group">
      <div className="aspect-square bg-pink-100 overflow-hidden">
        <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
      </div>
      <div className="p-6 flex flex-col flex-grow">
        <h3 className="text-xl font-bold text-gray-800 mb-2">{product.name}</h3>
        <p className="text-gray-500 text-sm mb-4 line-clamp-2">{product.description}</p>
        <div className="mt-auto flex justify-between items-center">
          <div>
            <span className="block text-2xl font-black text-pink-600">{discountedPrice} ر.س</span>
            {product.discountPercentage > 0 && <span className="text-xs text-gray-400 line-through">{product.price} ر.س</span>}
          </div>
          <button onClick={() => onAddToCart(product)} className="bg-pink-500 text-white p-3 rounded-2xl shadow-lg active:scale-90 transition-transform">
            +
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
