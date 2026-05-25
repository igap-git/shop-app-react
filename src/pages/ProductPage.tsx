import { Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { Route } from "../routes/product.$id";
import { ProductDetails } from "../components/product/ProductDetails";


export default function ProductPage() {
  const { id } = Route.useParams();

  const searchParams = Route.useSearch() as {
    page?: number;
    category?: string;
    search?: string;
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <Link
        to="/home"
        search={{
          page: searchParams.page ?? 1,
          category: searchParams.category,
          search: searchParams.search,
        }}
        className="mb-6 flex items-center gap-2 text-gray-700 hover:text-black transition"
      >
        <ArrowLeft size={20} />
        <span>Powrót</span>
      </Link>

      <ProductDetails id={Number(id)} />
    </div>
  );
}