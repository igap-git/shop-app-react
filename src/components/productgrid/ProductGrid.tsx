import { useProducts } from "../../hooks/useProducts";
import { Link, useNavigate } from "@tanstack/react-router";

export function ProductGrid({
    category,
    search,
    page = 1,
  }: {
    category?: string;
    search?: string;
    page?: number;
  }){
  const navigate = useNavigate();

  const { data, isLoading, error } = useProducts(
    category,
    search
  );

  const currentPage = page;

  const productsPerPage = 8;
  const products = data?.products ?? [];

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
            className="group bg-white border rounded-2xl overflow-hidden hover:shadow-lg transition block cursor-pointer"
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
          </Link>
        ))}
      </div>

      <div className="flex justify-center items-center gap-2 mt-12">
        <button
          onClick={() => changePage(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-4 py-2 border rounded-lg disabled:opacity-50"
        >
          Previous
        </button>

        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            onClick={() => changePage(index + 1)}
            className={`px-4 py-2 rounded-lg border ${
              currentPage === index + 1
                ? "bg-black text-white"
                : ""
            }`}
          >
            {index + 1}
          </button>
        ))}

        <button
          onClick={() => changePage(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-4 py-2 border rounded-lg disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
}