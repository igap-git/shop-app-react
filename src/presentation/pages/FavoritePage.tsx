import { AppProductGrid } from '@components/productgrid/AppProductGrid';

export default function FavoritePage() {
  return (
    <div>
      <AppProductGrid favoritesOnly />
    </div>
  );
}
