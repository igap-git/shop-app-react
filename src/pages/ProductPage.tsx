import { Link } from "@tanstack/react-router";
import { ArrowLeft, Heart, ShoppingCart} from "lucide-react";
import { Route } from "../routes/product.$id";
import { ProductDetails } from "../components/product/ProductDetails";
import { useEffect, useState } from "react";
import { useProduct } from "../hooks/useProduct";
import type { Product } from "../interfaces/product.interface"
import type { CartItem } from "../interfaces/cartitem.interface"

export default function ProductPage() {
  const { id } = Route.useParams();

  const productId = Number(id);

  const { data: product } = useProduct(Number(id));

  const [favorites, setFavorites] = useState<Product[]>([]);

  const [isAddedToCart, setIsAddedToCart] =
    useState(false);

  useEffect(() => {
    const savedFavorites =
      localStorage.getItem("favorites");

    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites));
    }
  }, []);

  const isFavorite = favorites.some(
  (fav) => fav.id === productId
);

const toggleFavorite = () => {
    if (!product) return;
  
    const updatedFavorites = isFavorite
      ? favorites.filter(
          (fav) => fav.id !== productId
        )
      : [...favorites, product];
  
    setFavorites(updatedFavorites);
  
    localStorage.setItem(
      "favorites",
      JSON.stringify(updatedFavorites)
    );
  };

  const searchParams =
    Route.useSearch() as {
      page?: number;
      category?: string;
      search?: string;
    };

    const handleAddToCart = () => {
        if (!product || isAddedToCart) return;
      
        const savedCart =
          localStorage.getItem("cart");
      
        const cart: CartItem[] = savedCart
          ? JSON.parse(savedCart)
          : [];
      
        const productToAdd: CartItem = {
          id: product.id,
          title: product.title,
          price: product.price,
          thumbnail: product.thumbnail,
          quantity: 1,
        };
      
        const isInCart = cart.some(
          (item) => item.id === product.id
        );
      
        let updatedCart: CartItem[];
      
        if (isInCart) {
          updatedCart = cart.map((item) =>
            item.id === product.id
              ? {
                  ...item,
                  quantity: item.quantity + 1,
                }
              : item
          );
        } else {
          updatedCart = [
            ...cart,
            productToAdd,
          ];
        }
      
        localStorage.setItem(
          "cart",
          JSON.stringify(updatedCart)
        );
      
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
                isFavorite
                  ? "fill-red-500 text-red-500"
                  : "text-gray-500"
              }`}
            />
          </button>

          <button
  type="button"
  onClick={handleAddToCart}
  disabled={isAddedToCart}
  className={`flex items-center gap-2 px-5 py-3 rounded-xl font-medium transition disabled:cursor-not-allowed ${
    isAddedToCart
      ? "bg-green-600 text-white"
      : "bg-black text-white hover:opacity-90"
  }`}
>
  <ShoppingCart size={18} />

  {isAddedToCart
    ? "Added to cart"
    : "Add to cart"}
</button>
        </div>
      </div>

      <ProductDetails id={productId} />
    </div>
  );
}