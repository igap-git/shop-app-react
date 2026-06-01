import { Route } from "@routes/product.$id";
import { ProductDetails } from "./ProductDetails";

export function AppProduct() {
  const { id } = Route.useParams();

  return (
    <section className="max-w-7xl mx-auto px-4 py-8">
      <ProductDetails id={Number(id)} />
    </section>
  );
}