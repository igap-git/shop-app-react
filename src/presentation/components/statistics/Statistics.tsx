import type { Product } from '@/domain/interfaces/product.interface';
import { useEffect, useMemo, useState } from 'react';
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
        name: product.title,
        rating: Number(product.rating.toFixed(1)),
      }));

    const lowInStockProducts = [...products]
      .sort((a, b) => a.stock - b.stock)
      .slice(0, 10)
      .map((product) => ({
        name: product.title,
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

  const chartMap = {
    topProducts: {
      title: 'Products statistics',
      chartTitle: 'Highest Rated Products',
      data: statistics.topRatedProducts,
      dataKey: 'rating',
    },
    productsByCategory: {
      title: 'Products statistics',
      chartTitle: 'Products by category',
      data: statistics.productsByCategory,
      dataKey: 'count',
    },
    lowInStock: {
      title: 'Stock statistics',
      chartTitle: 'Products with lowest stock',
      data: statistics.lowInStockProducts,
      dataKey: 'stock',
    },
    stockByCategory: {
      title: 'Stock statistics',
      chartTitle: 'Stock by category',
      data: statistics.stockByCategory,
      dataKey: 'stock',
    },
    averagePriceByCategory: {
      title: 'Income statistics',
      chartTitle: 'Average price by category',
      data: statistics.averagePriceByCategory,
      dataKey: 'price',
    },
  };

  const chart = chartMap[section as keyof typeof chartMap];

  if (!chart) {
    return <div className="text-center py-10">Unknown statistics section</div>;
  }

  return (
    <StatisticsLayout title={chart.title}>
      <ChartBox title={chart.chartTitle}>
        <VerticalBarChart data={chart.data} dataKey={chart.dataKey} />
      </ChartBox>
    </StatisticsLayout>
  );
}

function StatisticsLayout({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="w-full max-w-6xl mx-auto px-3 sm:px-5 lg:px-6 py-4 sm:py-6">
      <h1 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">{title}</h1>

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
    <div className="bg-white rounded-xl shadow p-4">
      <p className="text-gray-500 text-sm">{title}</p>

      <p className="text-2xl font-bold mt-2">{value}</p>
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
    <div className="bg-white rounded-xl shadow p-4 col-span-1 sm:col-span-2 xl:col-span-4 overflow-hidden">
      <h2 className="text-lg font-semibold mb-4">{title}</h2>

      <div className="w-full h-[420px] sm:h-[480px] lg:h-[520px]">
        {children}
      </div>
    </div>
  );
}

function VerticalBarChart({
  data,
  dataKey,
}: {
  data: {
    name: string;
    [key: string]: string | number;
  }[];
  dataKey: string;
}) {
  const [fontSize, setFontSize] = useState(11);

  useEffect(() => {
    const updateFontSize = () => {
      const width = window.innerWidth;

      const minWidth = 320;
      const maxWidth = 1440;

      const calculatedSize =
        5 + ((width - minWidth) / (maxWidth - minWidth)) * (11 - 5);

      setFontSize(Math.max(5, Math.min(11, calculatedSize)));
    };

    updateFontSize();

    window.addEventListener('resize', updateFontSize);

    return () => {
      window.removeEventListener('resize', updateFontSize);
    };
  }, []);

  return (
    <div className="w-full h-full outline-none overflow-hidden" tabIndex={-1}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          barCategoryGap="15%"
          margin={{
            top: 10,
            right: 20,
            left: -10,
            bottom: 150,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />

          <XAxis
            dataKey="name"
            angle={-45}
            textAnchor="end"
            interval={0}
            height={180}
            tick={{
              fontSize,
            }}
            tickMargin={10}
          />

          <YAxis
            width={35}
            tick={{
              fontSize,
            }}
          />

          <Tooltip />

          <Bar dataKey={dataKey} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
