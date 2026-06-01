import { Trash2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import type { CartItem } from '@domain-interfaces/cartitem.interface';
import { getCurrentCartUseCase } from '@application-cart/getCuurentUserCart.usecase';
import { updateCartUseCase } from '@application-cart/updateCart.usecase';


export const MyCart = () => {
  const [cart, setCart] = useState<CartItem[]>([]);

  useEffect(() => {
    setCart(getCurrentCartUseCase());
  }, []);

  const removeFromCart = (id: number) => {
    const updatedCart = cart.filter(
      (product) => product.id !== id
    );
  
    setCart(updatedCart);
    updateCartUseCase(updatedCart);
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
    updateCartUseCase(updatedCart);
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
    updateCartUseCase(updatedCart);
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

      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto py-8 px-4">
      <h1 className="text-4xl font-semibold mb-8">
        My cart
      </h1>
  
      <div className="space-y-5">
        {cart.map((product) => (
          <div
            key={product.id}
            className="
              flex items-center
              gap-8
              border
              rounded-3xl
              p-6
              bg-white
              shadow-sm
            "
          >
            <img
              src={product.thumbnail}
              alt={product.title}
              className="
                w-36 h-36
                object-cover
                rounded-2xl
                bg-gray-100
              "
            />
  
            <div className="flex-1">
              <h2 className="text-lg font-medium text-gray-800">
                {product.title}
              </h2>
  
              <p className="text-2xl font-semibold mt-3">
                ${product.price}
              </p>
            </div>
  
            <div className="flex items-center gap-4">
              <button
                type="button"
                onClick={() =>
                  decreaseQuantity(product.id)
                }
                className="
                  w-12 h-12
                  rounded-full
                  border
                  hover:bg-gray-100
                  text-lg
                "
              >
                -
              </button>
  
              <p className="text-lg font-medium min-w-[30px] text-center">
                {product.quantity ?? 1}
              </p>
  
              <button
                type="button"
                onClick={() =>
                  increaseQuantity(product.id)
                }
                className="
                  w-12 h-12
                  rounded-full
                  border
                  hover:bg-gray-100
                  text-lg
                "
              >
                +
              </button>
            </div>
  
            <button
              type="button"
              onClick={() =>
                removeFromCart(product.id)
              }
              className="
                p-4
                rounded-full
                border
                hover:bg-red-50
                hover:text-red-600
                transition
              "
            >
              <Trash2 size={22} />
            </button>
          </div>
        ))}
      </div>
  
      <div className="mt-10 border-t pt-8 flex justify-between items-center">
        <p className="text-3xl font-semibold">
          Total: $
          {totalPrice.toFixed(2)}
        </p>
  
        <button
          className="
            bg-black
            text-white
            px-8 py-4
            rounded-2xl
            text-lg
            hover:opacity-90
            transition
          "
        >
          Checkout
        </button>
      </div>
    </div>
  );
};