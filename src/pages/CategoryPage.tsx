import { Route } from '../routes/category.$category';
import { ProductGrid } from '../components/productgrid/ProductGrid';

export default function CategoryPage() {
  const { category } = Route.useParams();

  return <ProductGrid category={category} />;
}
