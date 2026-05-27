import { Link } from '@tanstack/react-router';
import { Trash2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import type { CartItem } from '../../interfaces/cartitem.interface';

export const MyCart = () => {
  const [cart, setCart] = useState<CartItem[]>([]);

  useEffect(() => {
    const savedCart = localStorage.getItem('cart');

    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

  const removeFromCart = (id: number) => {
    const updatedCart = cart.filter((product) => product.id !== id);

    setCart(updatedCart);

    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  const decreaseQuantity = (id: number) => {
    const updatedCart = cart
      .map((product) =>
        product.id === id
          ? {
              ...product,
              quantity: product.quantity - 1,
            }
          : product
      )
      .filter((product) => product.quantity > 0);

    setCart(updatedCart);

    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  const increaseQuantity = (id: number) => {
    const updatedCart = cart.map((product) =>
      product.id === id
        ? {
            ...product,
            quantity: product.quantity + 1,
          }
        : product
    );

    setCart(updatedCart);

    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  const totalPrice = cart.reduce(
    (sum, product) => sum + product.price * (product.quantity ?? 1),
    0
  );

  if (cart.length === 0) {
    return (
      <div className="max-w-5xl mx-auto py-12 text-center">
        <h1 className="text-3xl font-semibold mb-4">Your cart is empty</h1>

        <p className="text-gray-500 mb-8">
          Add some products to see them here.
        </p>

        <Link
          to="/home"
          className="inline-block bg-black text-white px-6 py-3 rounded-xl hover:opacity-90 transition"
        >
          Back to shop
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto py-8">
      <h1 className="text-3xl font-semibold mb-8">My cart</h1>

      <div className="space-y-4">
        {cart.map((product) => (
          <div
            key={product.id}
            className="flex items-center gap-5 border rounded-2xl p-4 bg-white shadow-sm"
          >
            <img
              src={product.thumbnail}
              alt={product.title}
              className="w-24 h-24 object-cover rounded-xl bg-gray-100"
            />

            <div className="flex-1">
              <h2 className="font-medium text-gray-800">{product.title}</h2>

              <p className="font-semibold mt-2">${product.price}</p>
            </div>

            <button
              onClick={() => decreaseQuantity(product.id)}
              className="w-10 h-10 rounded-full border hover:bg-gray-100"
            >
              -
            </button>

            <p className="text-gray-500 mt-1">{product.quantity ?? 1}</p>

            <button
              onClick={() => increaseQuantity(product.id)}
              className="w-10 h-10 rounded-full border hover:bg-gray-100"
            >
              +
            </button>

            <button
              onClick={() => removeFromCart(product.id)}
              className="p-3 rounded-full border hover:bg-red-50 hover:text-red-600 transition"
            >
              <Trash2 size={20} />
            </button>
          </div>
        ))}
      </div>

      <div className="mt-8 border-t pt-6 flex justify-between items-center">
        <p className="text-xl font-semibold">Total: ${totalPrice.toFixed(2)}</p>

        <button className="bg-black text-white px-6 py-3 rounded-xl hover:opacity-90 transition">
          Checkout
        </button>
      </div>
    </div>
  );
};
