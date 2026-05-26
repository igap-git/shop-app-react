import { useProducts } from "../../hooks/useProducts";
import { Link } from "@tanstack/react-router";
import { Heart } from "lucide-react";
import { useEffect, useState } from "react";

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
  const { data, isLoading, error } = useProducts(
    favoritesOnly ? undefined : category,
    favoritesOnly ? undefined : search
  );

  const [favoriteProducts, setFavoriteProducts] = useState<any[]>([]);

  useEffect(() => {
    const savedFavorites = localStorage.getItem("favorites");

    setFavoriteProducts(
      savedFavorites ? JSON.parse(savedFavorites) : []
    );
  }, []);

  const isFavorite = (productId: number) => {
    return favoriteProducts.some(
      (product: any) => product.id === productId
    );
  };

  const toggleFavorite = (
    e: React.MouseEvent,
    product: any
  ) => {
    e.preventDefault();
    e.stopPropagation();

    const updatedFavorites = isFavorite(product.id)
      ? favoriteProducts.filter(
          (item: any) => item.id !== product.id
        )
      : [...favoriteProducts, product];

    setFavoriteProducts(updatedFavorites);

    localStorage.setItem(
      "favorites",
      JSON.stringify(updatedFavorites)
    );
  };

  const allProducts = data?.products ?? [];

  const products = favoritesOnly
    ? favoriteProducts
    : allProducts;

  const productsPerPage = 8;
  const totalPages = Math.ceil(
    products.length / productsPerPage
  );

  const startIndex = (page - 1) * productsPerPage;

  const currentProducts = products.slice(
    startIndex,
    startIndex + productsPerPage
  );

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
      {favoritesOnly && products.length === 0 && (
        <div className="text-center py-10 text-gray-500">
          Brak ulubionych produktów.
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {currentProducts.map((product: any) => (
          <Link
            key={product.id}
            to="/product/$id"
            params={{
              id: String(product.id),
            }}
            search={{
              page,
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
                  isFavorite(product.id)
                    ? "fill-red-500 text-red-500"
                    : "text-gray-500"
                }`}
              />
            </button>

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

      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-2 mt-12">
          <Link
            search={(prev) => ({
              ...prev,
              page: page - 1,
              category,
              search,
            })}
            className={`px-4 py-2 border rounded-lg ${
              page === 1
                ? "pointer-events-none opacity-50"
                : ""
            }`}
          >
            Previous
          </Link>

          {Array.from(
            { length: totalPages },
            (_, index) => (
              <Link
                key={index}
                search={(prev) => ({
                  ...prev,
                  page: index + 1,
                  category,
                  search,
                })}
                className={`px-4 py-2 rounded-lg border ${
                  page === index + 1
                    ? "bg-black text-white"
                    : ""
                }`}
              >
                {index + 1}
              </Link>
            )
          )}

          <Link
            search={(prev) => ({
              ...prev,
              page: page + 1,
              category,
              search,
            })}
            className={`px-4 py-2 border rounded-lg ${
              page === totalPages
                ? "pointer-events-none opacity-50"
                : ""
            }`}
          >
            Next
          </Link>
        </div>
      )}
    </div>
  );
}