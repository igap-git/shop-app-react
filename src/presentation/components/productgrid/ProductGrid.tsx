import { useProducts } from '../../hooks/useProducts';
import { Link, useNavigate } from '@tanstack/react-router';
import { Heart, Plus } from 'lucide-react';
import { useEffect, useState } from 'react';
import type { Product } from '../../../domain/interfaces/product.interface';
import { loadCurrentUserFavorites } from '../../../infrastructure/storage/userStorage';
import { addToCartUseCase } from '../../../application/cart/addToCart.usecase';
import { toggleFavoriteUseCase } from '../../../application/favorites/toggleFavorites.usecase';

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
  const [favorites, setFavorites] = useState<Product[]>([]);
  const { data, isLoading, error } = useProducts(
    favoritesOnly ? undefined : category,
    favoritesOnly ? undefined : search
  );

  useEffect(() => {
    setFavorites(loadCurrentUserFavorites());
  }, []);

  const toggleFavorite = (
    e: React.MouseEvent,
    product: Product
  ) => {
    e.preventDefault();
    e.stopPropagation();
  
    const updatedFavorites =
      toggleFavoriteUseCase(product);
  
    setFavorites(updatedFavorites);
  };

  const handleAddToCart = (e: React.MouseEvent, product: Product) => {
    e.preventDefault();
    e.stopPropagation();

    const updatedUser = addToCartUseCase(product);

    if (!updatedUser) return;

    setAddedProducts((prev) => [...prev, product.id]);

    setTimeout(() => {
      setAddedProducts((prev) => prev.filter((id) => id !== product.id));
    }, 1500);
  };

  const currentPage = page;
  const productsPerPage = 8;

  const allProducts: Product[] = data?.products ?? [];

  const products = favoritesOnly
  ? favorites
  : allProducts;

  const totalPages = Math.ceil(products.length / productsPerPage);

  const startIndex = (currentPage - 1) * productsPerPage;

  const currentProducts = products.slice(
    startIndex,
    startIndex + productsPerPage
  );

  const changePage = (newPage: number) => {
    navigate({
      to: favoritesOnly ? '/favorites' : '/home',
      search: {
        page: newPage,
        category,
        search,
      },
    });
  };

  if (isLoading) {
    return <div className="text-center py-10">Loading products...</div>;
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
      {favoritesOnly && currentProducts.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <Heart className="w-14 h-14 text-gray-300 mb-4" />

          <h2 className="text-2xl font-semibold text-gray-800">
            No favorite products yet
          </h2>

          <p className="text-gray-500 mt-2">
            Add products to favorites to see them here.
          </p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {currentProducts.map((product: Product) => (
              <Link
                key={product.id}
                to="/product/$id"
                params={{ id: String(product.id) }}
                search={{
                  page: currentPage,
                  category,
                  search,
                }}
                className="group bg-white border rounded-2xl overflow-hidden hover:shadow-lg transition block cursor-pointer relative"
              >
                <button
                  type="button"
                  onClick={(e) => toggleFavorite(e, product)}
                  className="absolute top-3 right-3 z-10 bg-white/90 rounded-full p-2 shadow hover:scale-110 transition"
                >
                  <Heart
                    className={`w-5 h-5 transition ${
                      favorites.some((f) => f.id === product.id)
                        ? 'fill-red-500 text-red-500'
                        : 'text-gray-500'
                    }`}
                  />
                </button>

                <div className="absolute top-14 right-3 z-10">
                  <button
                    type="button"
                    onClick={(e) => handleAddToCart(e, product)}
                    disabled={addedProducts.includes(product.id)}
                    className={`rounded-full p-2 shadow transition relative ${
                      addedProducts.includes(product.id)
                        ? 'bg-green-500 text-white'
                        : 'bg-white/90 text-gray-500 hover:scale-110'
                    }`}
                  >
                    <Plus className="w-5 h-5" />
                  </button>
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

                  <p className="mt-3 text-lg font-semibold">${product.price}</p>
                </div>
              </Link>
            ))}
          </div>

          {data && totalPages > 1 && (
            <div className="flex justify-center items-center gap-2 mt-12">
              <button
                type="button"
                onClick={() => changePage(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-4 py-2 border rounded-lg disabled:opacity-50"
              >
                Previous
              </button>

              {Array.from({ length: totalPages }, (_, index) => (
                <button
                  type="button"
                  key={index}
                  onClick={() => changePage(index + 1)}
                  className={`px-4 py-2 rounded-lg border ${
                    currentPage === index + 1 ? 'bg-black text-white' : ''
                  }`}
                >
                  {index + 1}
                </button>
              ))}

              <button
                type="button"
                onClick={() => changePage(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="px-4 py-2 border rounded-lg disabled:opacity-50"
              >
                Next
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
