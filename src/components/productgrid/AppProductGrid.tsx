import { useSearch } from "@tanstack/react-router";
import { ProductGrid } from "./ProductGrid";

export function AppProductGrid({
  favoritesOnly = false,
}: {
  favoritesOnly?: boolean;
}) {
  const searchParams = useSearch({
    strict: false,
  }) as {
    search?: string;
    category?: string;
    page?: number;
  };

  return (
    <section className="max-w-7xl mx-auto px-4 py-8">
      <ProductGrid
        search={searchParams.search}
        category={searchParams.category}
        page={Number(
          searchParams.page ?? 1
        )}
        favoritesOnly={favoritesOnly}
      />
    </section>
  );
}