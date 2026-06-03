import { useState } from 'react';
import { Link } from '@tanstack/react-router';
import { ArrowLeft, Heart, ShoppingCart } from 'lucide-react';
import { Route } from '@routes/product.$id';
import { ProductDetails } from '@components/product/ProductDetails';
import { useProduct } from '@hooks/useProduct';
import type { CartItem } from '@domain-interfaces/cartitem.interface';
import type { User } from '@domain-types/user';

import {
  getCurrentUser,
  updateUser,
} from '@infrastructure-storage/userStorage';

export default function ProductPage() {
  const { id } = Route.useParams();

  const productId = Number(id);

  const { data: product } = useProduct(productId);

  const [currentUser, setCurrentUser] = useState<User | null>(() => getCurrentUser());

  const [isAddedToCart, setIsAddedToCart] = useState(false);

  const searchParams = Route.useSearch() as {
    page?: number;
    category?: string;
    search?: string;
  };

  const isFavorite =
    currentUser?.favorites.some((favorite) => favorite.id === productId) ??
    false;

  const saveUserChanges = (updatedUser: User) => {
    updateUser(updatedUser);
    setCurrentUser(updatedUser);
  };

  const toggleFavorite = () => {
    if (!product || !currentUser) return;

    const updatedFavorites = isFavorite
      ? currentUser.favorites.filter((favorite) => favorite.id !== productId)
      : [...currentUser.favorites, product];

    const updatedUser: User = {
      ...currentUser,
      favorites: updatedFavorites,
    };

    saveUserChanges(updatedUser);
  };

  const handleAddToCart = () => {
    if (!product || !currentUser || isAddedToCart) return;

    const isInCart = currentUser.cart.some((item) => item.id === product.id);

    const productToAdd: CartItem = {
      id: product.id,
      title: product.title,
      price: product.price,
      thumbnail: product.thumbnail,
      quantity: 1,
    };

    const updatedCart = isInCart
      ? currentUser.cart.map((item) =>
          item.id === product.id
            ? {
                ...item,
                quantity: item.quantity + 1,
              }
            : item
        )
      : [...currentUser.cart, productToAdd];

    const updatedUser: User = {
      ...currentUser,
      cart: updatedCart,
    };

    saveUserChanges(updatedUser);

    setIsAddedToCart(true);

    setTimeout(() => {
      setIsAddedToCart(false);
    }, 2000);
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
