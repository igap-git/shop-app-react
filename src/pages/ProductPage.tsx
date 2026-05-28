import { Link } from '@tanstack/react-router';
import { ArrowLeft, Heart, ShoppingCart } from 'lucide-react';
import { Route } from '../routes/product.$id';
import { ProductDetails } from '../components/product/ProductDetails';
import { useEffect, useState } from 'react';
import { useProduct } from '../hooks/useProduct';
import type { Product } from '../interfaces/product.interface';
import type { CartItem } from '../interfaces/cartitem.interface';
import type { User } from '../types/user';

export default function ProductPage() {
  const { id } = Route.useParams();

  const productId = Number(id);

  const { data: product } = useProduct(productId);

  const [favorites, setFavorites] = useState<Product[]>([]);

  const [isAddedToCart, setIsAddedToCart] = useState(false);

  const getCurrentUser = (): User | null => {
    return JSON.parse(localStorage.getItem('currentUser') || 'null');
  };

  useEffect(() => {
    const user = getCurrentUser();

    setFavorites(user?.favorites ?? []);
  }, []);

  const isFavorite = favorites.some((fav) => fav.id === productId);

  const toggleFavorite = () => {
    if (!product) return;

    const user = getCurrentUser();

    if (!user) return;

    const updatedFavorites = isFavorite
      ? user.favorites.filter((fav) => fav.id !== productId)
      : [...user.favorites, product];

    const updatedUser: User = {
      ...user,
      favorites: updatedFavorites,
    };

    localStorage.setItem('currentUser', JSON.stringify(updatedUser));

    const users: User[] = JSON.parse(localStorage.getItem('users') || '[]');

    const updatedUsers = users.map((u) => (u.id === user.id ? updatedUser : u));

    localStorage.setItem('users', JSON.stringify(updatedUsers));

    setFavorites(updatedFavorites);
  };

  const handleAddToCart = () => {
    if (!product || isAddedToCart) return;

    const user = getCurrentUser();

    if (!user) return;

    const productToAdd: CartItem = {
      id: product.id,
      title: product.title,
      price: product.price,
      thumbnail: product.thumbnail,
      quantity: 1,
    };

    const isInCart = user.cart.some((item) => item.id === product.id);

    const updatedCart = isInCart
      ? user.cart.map((item) =>
          item.id === product.id
            ? {
                ...item,
                quantity: item.quantity + 1,
              }
            : item
        )
      : [...user.cart, productToAdd];

    const updatedUser: User = {
      ...user,
      cart: updatedCart,
    };

    localStorage.setItem('currentUser', JSON.stringify(updatedUser));

    const users: User[] = JSON.parse(localStorage.getItem('users') || '[]');

    const updatedUsers = users.map((u) => (u.id === user.id ? updatedUser : u));

    localStorage.setItem('users', JSON.stringify(updatedUsers));

    setIsAddedToCart(true);

    setTimeout(() => {
      setIsAddedToCart(false);
    }, 2000);
  };

  const searchParams = Route.useSearch() as {
    page?: number;
    category?: string;
    search?: string;
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <div className="mb-6 flex items-center justify-between">
        <Link
          to="/home"
          search={{
            page: searchParams.page ?? 1,
            category: searchParams.category,
            search: searchParams.search,
          }}
          className="flex items-center gap-2 text-gray-700 hover:text-black transition"
        >
          <ArrowLeft size={20} />
          <span>Back</span>
        </Link>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={toggleFavorite}
            className="flex items-center justify-center w-11 h-11 rounded-full border bg-white shadow-sm hover:scale-105 transition"
          >
            <Heart
              className={`w-6 h-6 transition ${
                isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-500'
              }`}
            />
          </button>

          <button
            type="button"
            onClick={handleAddToCart}
            disabled={isAddedToCart}
            className={`flex items-center gap-2 px-5 py-3 rounded-xl font-medium transition disabled:cursor-not-allowed ${
              isAddedToCart
                ? 'bg-green-600 text-white'
                : 'bg-black text-white hover:opacity-90'
            }`}
          >
            <ShoppingCart size={18} />

            {isAddedToCart ? 'Added to cart' : 'Add to cart'}
          </button>
        </div>
      </div>

      <ProductDetails id={productId} />
    </div>
  );
}
