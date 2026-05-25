import { createFileRoute } from "@tanstack/react-router";
import { ProductGrid } from "../components/productgrid/ProductGrid";

export const Route = createFileRoute(
  "/category/$category"
)({
  component: CategoryPage,
});

function CategoryPage() {
  const { category } = Route.useParams();

  return (
    <ProductGrid category={category} />
  );
}
