export interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  thumbnail: string;
  brand: string;
  category: string;
  rating: number;
  stock: number;
  discountPercentage: number;
  reviews?: {
    rating: number;
    comment: string;
  }[];
}