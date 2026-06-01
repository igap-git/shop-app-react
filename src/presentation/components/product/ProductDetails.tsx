import { useProduct } from '@hooks/useProduct';

export function ProductDetails({ id }: { id: number }) {
  const { data, isLoading, error } = useProduct(Number(id));

  if (isLoading) {
    return <div className="text-center py-10">Loading product...</div>;
  }

  if (error || !data) {
    return (
      <div className="text-center py-10 text-red-500">
        Failed to load product
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <div className="bg-gray-100 rounded-2xl overflow-hidden">
          <img
            src={data.thumbnail}
            alt={data.title}
            className="w-full h-full object-cover"
          />
        </div>

        <div>
          <h1 className="text-3xl font-semibold text-gray-900">{data.title}</h1>

          <p className="mt-4 text-gray-600">{data.description}</p>

          <p className="mt-6 text-3xl font-bold">${data.price}</p>

          <div className="mt-6 space-y-2 text-sm text-gray-600">
            <p>
              <span className="font-semibold">Brand:</span> {data.brand}
            </p>

            <p>
              <span className="font-semibold">Category:</span> {data.category}
            </p>

            <p>
              <span className="font-semibold">Rating:</span> {data.rating}
            </p>

            <p>
              <span className="font-semibold">Stock:</span> {data.stock}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
