export type Product = {
    id: number;
    title: string;
    category: string;
    price: number;
    rating: number;
    stock: number;
    discountPercentage: number;
    reviews?: {
      rating: number;
      comment: string;
    }[];
  };