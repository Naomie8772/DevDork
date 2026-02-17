
export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  category: 'Cakes' | 'Pastries' | 'Cookies' | 'Custom';
  image: string;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface OrderDetails {
  items: CartItem[];
  total: number;
  customerName: string;
  customerEmail: string;
  pickupDate: string;
}
