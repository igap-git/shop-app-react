import type { Product } from '@/domain/interfaces/product.interface';
import { useMemo } from 'react';
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

type StatisticsProps = {
  products: Product[];
  section: string;
};

export function Statistics({ products, section }: StatisticsProps) {
  const statistics = useMemo(() => {
    if (products.length === 0) {
      return null;
    }

    const categoryMap = new Map<
      string,
      {
        count: number;
        stock: number;
        totalPrice: number;
      }
    >();

    let totalPrice = 0;
    let totalRating = 0;
    let totalStock = 0;
    let totalReviews = 0;
    let totalDiscount = 0;

    for (const product of products) {
      totalPrice += product.price;
      totalRating += product.rating;
      totalStock += product.stock;
      totalReviews += product.reviews?.length ?? 0;
      totalDiscount += product.discountPercentage;

      const currentCategory = categoryMap.get(product.category) ?? {
        count: 0,
        stock: 0,
        totalPrice: 0,
      };

      categoryMap.set(product.category, {
        count: currentCategory.count + 1,
        stock: currentCategory.stock + product.stock,
        totalPrice: currentCategory.totalPrice + product.price,
      });
    }

    const totalProducts = products.length;

    const categories = [...categoryMap.keys()];

    const lowStockProducts = products.filter((product) => product.stock < 20);

    const topRatedProducts = [...products]
      .sort((a, b) => b.rating - a.rating)
      .slice(0, 5)
      .map((product) => ({
        name:
          product.title.length > 20
            ? `${product.title.slice(0, 20)}...`
            : product.title,
        rating: Number(product.rating.toFixed(1)),
      }));

    const lowInStockProducts = [...products]
      .sort((a, b) => a.stock - b.stock)
      .slice(0, 10)
      .map((product) => ({
        name:
          product.title.length > 22
            ? `${product.title.slice(0, 22)}...`
            : product.title,
        stock: product.stock,
      }));

    const productsByCategory = [...categoryMap.entries()].map(
      ([category, data]) => ({
        name: category,
        count: data.count,
      })
    );

    const stockByCategory = [...categoryMap.entries()].map(
      ([category, data]) => ({
        name: category,
        stock: data.stock,
      })
    );

    const averagePriceByCategory = [...categoryMap.entries()].map(
      ([category, data]) => ({
        name: category,
        price: Number((data.totalPrice / data.count).toFixed(2)),
      })
    );

    return {
      totalProducts,
      categories,
      averagePrice: totalPrice / totalProducts,
      averageRating: totalRating / totalProducts,
      totalStock,
      totalReviews,
      averageDiscount: totalDiscount / totalProducts,
      lowStockProducts,
      topRatedProducts,
      lowInStockProducts,
      productsByCategory,
      stockByCategory,
      averagePriceByCategory,
    };
  }, [products]);

  if (!statistics) {
    return <div className="text-center py-10">No statistics available</div>;
  }

  if (section === 'overview') {
    return (
      <StatisticsLayout title="Overview">
        <StatisticCard
          title="Total products"
          value={statistics.totalProducts}
        />

        <StatisticCard
          title="Categories"
          value={statistics.categories.length}
        />

        <StatisticCard title="Total stock" value={statistics.totalStock} />

        <StatisticCard
          title="Low stock products"
          value={statistics.lowStockProducts.length}
        />

        <StatisticCard
          title="Average price"
          value={`$${statistics.averagePrice.toFixed(2)}`}
        />

        <StatisticCard
          title="Average discount"
          value={`${statistics.averageDiscount.toFixed(2)}%`}
        />

        <StatisticCard title="Total reviews" value={statistics.totalReviews} />

        <StatisticCard
          title="Average rating"
          value={statistics.averageRating.toFixed(2)}
        />
      </StatisticsLayout>
    );
  }

  if (section === 'topProducts') {
    return (
      <StatisticsLayout title="Products statistics">
        <ChartBox title="Highest Rated Products">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={statistics.topRatedProducts}
              layout="vertical"
              margin={{
                left: 40,
                right: 20,
                top: 10,
                bottom: 10,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />

              <XAxis type="number" />

              <YAxis type="category" dataKey="name" width={140} />

              <Tooltip />

              <Bar dataKey="rating" />
            </BarChart>
          </ResponsiveContainer>
        </ChartBox>
      </StatisticsLayout>
    );
  }

  if (section === 'productsByCategory') {
    return (
      <StatisticsLayout title="Products statistics">
        <ChartBox title="Products by category">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={statistics.productsByCategory}>
              <CartesianGrid strokeDasharray="3 3" />

              <XAxis dataKey="name" />

              <YAxis />

              <Tooltip />

              <Bar dataKey="count" />
            </BarChart>
          </ResponsiveContainer>
        </ChartBox>
      </StatisticsLayout>
    );
  }

  if (section === 'lowInStock') {
    return (
      <StatisticsLayout title="Stock statistics">
        <ChartBox title="Products with lowest stock">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={statistics.lowInStockProducts}
              layout="vertical"
              margin={{
                left: 60,
                right: 20,
                top: 10,
                bottom: 10,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />

              <XAxis type="number" />

              <YAxis type="category" dataKey="name" width={160} />

              <Tooltip />

              <Bar dataKey="stock" />
            </BarChart>
          </ResponsiveContainer>
        </ChartBox>
      </StatisticsLayout>
    );
  }

  if (section === 'stockByCategory') {
    return (
      <StatisticsLayout title="Stock statistics">
        <ChartBox title="Stock by category">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={statistics.stockByCategory}>
              <CartesianGrid strokeDasharray="3 3" />

              <XAxis dataKey="name" />

              <YAxis />

              <Tooltip />

              <Bar dataKey="stock" />
            </BarChart>
          </ResponsiveContainer>
        </ChartBox>
      </StatisticsLayout>
    );
  }

  if (section === 'averagePriceByCategory') {
    return (
      <StatisticsLayout title="Income statistics">
        <ChartBox title="Average price by category">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={statistics.averagePriceByCategory}>
              <CartesianGrid strokeDasharray="3 3" />

              <XAxis dataKey="name" />

              <YAxis />

              <Tooltip />

              <Bar dataKey="price" />
            </BarChart>
          </ResponsiveContainer>
        </ChartBox>
      </StatisticsLayout>
    );
  }

  return <div className="text-center py-10">Unknown statistics section</div>;
}

function StatisticsLayout({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
      <h1 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8">{title}</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {children}
      </div>
    </div>
  );
}

function StatisticCard({
  title,
  value,
}: {
  title: string;
  value: string | number;
}) {
  return (
    <div className="bg-white rounded-xl shadow p-4 sm:p-5">
      <p className="text-gray-500 text-xs sm:text-sm">{title}</p>

      <p className="text-xl sm:text-2xl font-bold mt-2 break-words">{value}</p>
    </div>
  );
}

function ChartBox({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="bg-white rounded-xl shadow p-4 sm:p-5 col-span-1 sm:col-span-2 xl:col-span-4 w-full min-w-0 overflow-hidden">
      <h2 className="text-lg sm:text-xl font-semibold mb-4">{title}</h2>

      <div className="w-full h-[260px] sm:h-[330px] lg:h-[400px] overflow-x-auto">
        <div className="min-w-[520px] h-full">{children}</div>
      </div>
    </div>
  );
}
