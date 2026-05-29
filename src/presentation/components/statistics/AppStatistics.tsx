import { useProducts } from "../../hooks/useProducts";
import { Statistics } from "./Statistics";

type AppStatisticsProps = {
  section: string;
};

export function AppStatistics({
  section,
}: AppStatisticsProps) {
  const { data, isLoading, error } =
    useProducts();

  if (isLoading) {
    return (
      <div className="text-center py-10">
        Loading statistics...
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-10 text-red-500">
        Failed to load statistics
      </div>
    );
  }

  return (
    <Statistics
      products={data?.products ?? []}
      section={section}
    />
  );
}