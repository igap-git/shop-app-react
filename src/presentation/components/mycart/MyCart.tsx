import type { CartItem } from '@domain-interfaces/cartitem.interface';
import { getCurrentCartUseCase } from '@application-cart/getCuurentUserCart.usecase';
import { updateCartUseCase } from '@application-cart/updateCart.usecase';
import { useCallback, useMemo, useState } from 'react';
import { Trash2 } from 'lucide-react';

export const MyCart = () => {
  const [cart, setCart] = useState<CartItem[]>(() => getCurrentCartUseCase());

  const removeFromCart = useCallback((id: number) => {
    setCart((prevCart) => {
      const updatedCart = prevCart.filter((product) => product.id !== id);

      updateCartUseCase(updatedCart);

      return updatedCart;
    });
  }, []);

  const decreaseQuantity = useCallback((id: number) => {
    setCart((prevCart) => {
      const updatedCart = prevCart
        .map((product) =>
          product.id === id
            ? {
                ...product,
                quantity: product.quantity - 1,
              }
            : product
        )
        .filter((product) => product.quantity > 0);

      updateCartUseCase(updatedCart);

      return updatedCart;
    });
  }, []);

  const increaseQuantity = useCallback((id: number) => {
    setCart((prevCart) => {
      const updatedCart = prevCart.map((product) =>
        product.id === id
          ? {
              ...product,
              quantity: product.quantity + 1,
            }
          : product
      );

      updateCartUseCase(updatedCart);

      return updatedCart;
    });
  }, []);

  const totalPrice = useMemo(() => {
    return cart.reduce(
      (sum, product) => sum + product.price * (product.quantity ?? 1),
      0
    );
  }, [cart]);

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
    <div className="max-w-7xl mx-auto py-6 sm:py-8 px-4">
      <h1 className="text-3xl sm:text-4xl font-semibold mb-6 sm:mb-8">
        My cart
      </h1>

      <div className="space-y-4 sm:space-y-5">
        {cart.map((product) => (
          <div
            key={product.id}
            className="
              flex
              flex-col
              sm:flex-row
              sm:items-center
              gap-4
              sm:gap-6
              lg:gap-8
              border
              rounded-2xl
              sm:rounded-3xl
              p-4
              sm:p-6
              bg-white
              shadow-sm
            "
          >
            <img
              src={product.thumbnail}
              alt={product.title}
              className="
                w-full
                h-48
                sm:w-28 sm:h-28
                md:w-32 md:h-32
                lg:w-36 lg:h-36
                object-cover
                rounded-2xl
                bg-gray-100
              "
            />

            <div className="flex-1 min-w-0">
              <h2 className="text-base sm:text-lg font-medium text-gray-800 break-words">
                {product.title}
              </h2>

              <p className="text-xl sm:text-2xl font-semibold mt-2 sm:mt-3">
                ${product.price}
              </p>
            </div>

            <div className="flex items-center justify-between sm:justify-start gap-3 sm:gap-4">
              <button
                type="button"
                onClick={() => decreaseQuantity(product.id)}
                className="
                  w-10 h-10
                  sm:w-12 sm:h-12
                  rounded-full
                  border
                  hover:bg-gray-100
                  text-lg
                "
              >
                -
              </button>

              <p className="text-base sm:text-lg font-medium min-w-[30px] text-center">
                {product.quantity ?? 1}
              </p>

              <button
                type="button"
                onClick={() => increaseQuantity(product.id)}
                className="
                  w-10 h-10
                  sm:w-12 sm:h-12
                  rounded-full
                  border
                  hover:bg-gray-100
                  text-lg
                "
              >
                +
              </button>

              <button
                type="button"
                onClick={() => removeFromCart(product.id)}
                className="
                  ml-auto
                  sm:ml-2
                  p-3
                  sm:p-4
                  rounded-full
                  border
                  hover:bg-red-50
                  hover:text-red-600
                  transition
                "
              >
                <Trash2 size={20} />
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 sm:mt-10 border-t pt-6 sm:pt-8 flex flex-col sm:flex-row gap-4 sm:gap-6 sm:justify-between sm:items-center">
        <p className="text-2xl sm:text-3xl font-semibold">
          Total: ${totalPrice.toFixed(2)}
        </p>

        <button
          className="
            w-full
            sm:w-auto
            bg-black
            text-white
            px-8 py-4
            rounded-2xl
            text-base sm:text-lg
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
