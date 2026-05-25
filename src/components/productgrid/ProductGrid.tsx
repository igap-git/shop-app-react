import { useProducts } from "../../hooks/useProducts";

export function ProductGrid({
    category,
    search,
  }: {
    category?: string;
    search?: string;
  }) {
    const {
      data,
      isLoading,
      error,
    } = useProducts(
      category,
      search
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
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {data?.products.map((product: any) => (
        <div
          key={product.id}
          className="group bg-white border rounded-2xl overflow-hidden hover:shadow-lg transition"
        >
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
        </div>
      ))}
    </div>
  );
}