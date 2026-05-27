import { useProducts } from "../../hooks/useProducts";
import { Link, useNavigate } from "@tanstack/react-router";
import { Heart, Plus } from "lucide-react";
import { useEffect, useState } from "react";
import type { CartItem } from "../../interfaces/cartitem.interface";

export function ProductGrid({
    category,
    search,
    page = 1,
    favoritesOnly = false,
  }: {
    category?: string;
    search?: string;
    page?: number;
    favoritesOnly?: boolean;
  }) {
  const navigate = useNavigate();

  const [addedProducts, setAddedProducts] = useState<number[]>([]);

  const { data, isLoading, error } =
  useProducts(
    favoritesOnly ? undefined : category,
    favoritesOnly ? undefined : search
  );

    const [favorites, setFavorites] = useState<number[]>([]);
  
    useEffect(() => {
        const loadFavorites = () => {
          const savedFavorites =
            localStorage.getItem("favorites");
      
            setFavorites(
                savedFavorites
                  ? JSON.parse(savedFavorites).map(
                      (item: any) => item.id
                    )
                  : []
              );
        };
      
        loadFavorites();
      
        window.addEventListener(
          "focus",
          loadFavorites
        );
      
        return () => {
          window.removeEventListener(
            "focus",
            loadFavorites
          );
        };
      }, []);

      const toggleFavorite = (
        e: React.MouseEvent,
        product: any
      ) => {
        e.preventDefault();
        e.stopPropagation();
      
        const savedFavorites =
          localStorage.getItem("favorites");
      
        const favoritesProducts = savedFavorites
          ? JSON.parse(savedFavorites)
          : [];
      
        const exists = favoritesProducts.some(
          (item: any) => item.id === product.id
        );
      
        const updatedFavorites = exists
          ? favoritesProducts.filter(
              (item: any) => item.id !== product.id
            )
          : [...favoritesProducts, product];
      
        localStorage.setItem(
          "favorites",
          JSON.stringify(updatedFavorites)
        );
      
        setFavorites(
          updatedFavorites.map((item: any) => item.id)
        );
        
      };

  const currentPage = page;

  const productsPerPage = 8;
  const allProducts =
  data?.products ?? [];

const savedFavorites =
  localStorage.getItem("favorites");

const favoriteProducts = savedFavorites
  ? JSON.parse(savedFavorites)
  : [];

const products = favoritesOnly
  ? favoriteProducts
  : allProducts;

  const totalPages = Math.ceil(
    products.length / productsPerPage
  );

  const startIndex =
    (currentPage - 1) * productsPerPage;

  const currentProducts = products.slice(
    startIndex,
    startIndex + productsPerPage
  );

  const changePage = (newPage: number) => {
    navigate({
      to: "/home",
      search: {
        page: newPage,
        category,
        search,
      },
    });
  };

  const handleAddToCart = (
    e: React.MouseEvent,
    product: any
  ) => {
    e.preventDefault();
    e.stopPropagation();
  
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
  
    setAddedProducts((prev) => [
      ...prev,
      product.id,
    ]);
  
    setTimeout(() => {
      setAddedProducts((prev) =>
        prev.filter(
          (id) => id !== product.id
        )
      );
    }, 1500);
  };

  if (isLoading) {
    return (
      <div className="text-center py-10">
        Loading products...
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-10 text-red-500">
        Failed to load products
      </div>
    );
  }

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {currentProducts.map((product: any) => (
          <Link
            key={product.id}
            to="/product/$id"
            params={{
              id: String(product.id),
            }}
            search={{
              page: currentPage,
              category,
              search,
            }}
            className="group bg-white border rounded-2xl overflow-hidden hover:shadow-lg transition block cursor-pointer relative"
          >
            <button
              type="button"
              onClick={(e) =>
                toggleFavorite(e, product)
              }
              className="absolute top-3 right-3 z-10 bg-white/90 rounded-full p-2 shadow hover:scale-110 transition"
            >
              <Heart
                className={`w-5 h-5 transition ${
                  favorites.includes(product.id)
                    ? "fill-red-500 text-red-500"
                    : "text-gray-500"
                }`}
              />
            </button>

            <div className="absolute top-14 right-3 z-10">
  <button
    type="button"
    onClick={(e) =>
      handleAddToCart(e, product)
    }
    disabled={addedProducts.includes(
      product.id
    )}
    className={`rounded-full p-2 shadow transition relative ${
      addedProducts.includes(product.id)
        ? "bg-green-500 text-white"
        : "bg-white/90 text-gray-500 hover:scale-110"
    }`}
  >
    <Plus className="w-5 h-5" />
  </button>

  {addedProducts.includes(product.id) && (
    <div className="absolute right-12 top-1/2 -translate-y-1/2 bg-black text-white text-xs px-2 py-1 rounded whitespace-nowrap">
      Added to cart
    </div>
  )}
</div>

            <div className="aspect-square bg-gray-100 overflow-hidden">
              <img
                src={product.thumbnail}
                alt={product.title}
                className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
              />
            </div>

            <div className="p-4">
              <h3 className="text-sm font-medium text-gray-800 line-clamp-2 min-h-[40px]">
                {product.title}
              </h3>

              <p className="mt-3 text-lg font-semibold">
                ${product.price}
              </p>
            </div>
          </Link>
        ))}
      </div>

      {data && totalPages > 1 && (
  <div className="flex justify-center items-center gap-2 mt-12">
    <button
      type="button"
      onClick={() =>
        changePage(currentPage - 1)
      }
      disabled={currentPage === 1}
      className="px-4 py-2 border rounded-lg disabled:opacity-50"
    >
      Previous
    </button>

    {Array.from(
      { length: totalPages },
      (_, index) => (
        <button
          type="button"
          key={index}
          onClick={() =>
            changePage(index + 1)
          }
          className={`px-4 py-2 rounded-lg border ${
            currentPage === index + 1
              ? "bg-black text-white"
              : ""
          }`}
        >
          {index + 1}
        </button>
      )
    )}

    <button
      type="button"
      onClick={() =>
        changePage(currentPage + 1)
      }
      disabled={
        currentPage === totalPages
      }
      className="px-4 py-2 border rounded-lg disabled:opacity-50"
    >
      Next
    </button>
  </div>
)}
</div>
  )
}

