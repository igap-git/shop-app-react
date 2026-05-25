import { ProductGrid } from "./ProductGrid";


export function AppProductGrid() {
  const params = new URLSearchParams(
    window.location.search
  );

  const search =
    params.get("search") || "";

  return (
    <section className="max-w-7xl mx-auto px-4 py-8">
      <ProductGrid search={search} />
    </section>
  );
}