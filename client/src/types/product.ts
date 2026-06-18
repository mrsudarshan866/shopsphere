export interface Product {
  _id: string;
  title: string;
  description: string;
  price: number;
  discountPrice?: number;
  stock: number;
  images: string[];
  category: string;
  brand: string;
  rating: number;
}
