import type { Product } from '@/domain/interfaces/product.interface';
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
  if (products.length === 0) {
    return <div className="text-center py-10">No statistics available</div>;
  }

  const totalProducts = products.length;

  const categories = [...new Set(products.map((product) => product.category))];

  const averagePrice =
    products.reduce((sum, product) => sum + product.price, 0) / totalProducts;

  const averageRating =
    products.reduce((sum, product) => sum + product.rating, 0) / totalProducts;

  const totalStock = products.reduce((sum, product) => sum + product.stock, 0);

  const totalReviews = products.reduce(
    (sum, product) => sum + (product.reviews?.length ?? 0),
    0
  );

  const averageDiscount =
    products.reduce((sum, product) => sum + product.discountPercentage, 0) /
    totalProducts;

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

  const productsByCategory = categories.map((category) => ({
    name: category,
    count: products.filter((product) => product.category === category).length,
  }));

  const stockByCategory = categories.map((category) => ({
    name: category,
    stock: products
      .filter((product) => product.category === category)
      .reduce((sum, product) => sum + product.stock, 0),
  }));

  const averagePriceByCategory = categories.map((category) => {
    const categoryProducts = products.filter(
      (product) => product.category === category
    );

    const average =
      categoryProducts.reduce((sum, product) => sum + product.price, 0) /
      categoryProducts.length;

    return {
      name: category,
      price: Number(average.toFixed(2)),
    };
  });

  if (section === 'overview') {
    return (
      <StatisticsLayout title="Overview">
        <StatisticCard title="Total products" value={totalProducts} />
        <StatisticCard title="Categories" value={categories.length} />
        <StatisticCard title="Total stock" value={totalStock} />

        <StatisticCard
          title="Low stock products"
          value={lowStockProducts.length}
        />

        <StatisticCard
          title="Average price"
          value={`$${averagePrice.toFixed(2)}`}
        />

        <StatisticCard
          title="Average discount"
          value={`${averageDiscount.toFixed(2)}%`}
        />

        <StatisticCard title="Total reviews" value={totalReviews} />

        <StatisticCard
          title="Average rating"
          value={averageRating.toFixed(2)}
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
              data={topRatedProducts}
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
            <BarChart data={productsByCategory}>
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
              data={lowInStockProducts}
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
            <BarChart data={stockByCategory}>
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
            <BarChart data={averagePriceByCategory}>
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
