
export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  discountPercentage: number;
  image: string; // Base64 or URL
  category: string;
  createdAt: number;
}

export interface CartItem extends Product {
  quantity: number;
}

export type ViewType = 'shop' | 'admin' | 'cart';
