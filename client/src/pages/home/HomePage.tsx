import { useGetProductsQuery } from "../../features/products/productApi";
import ProductGrid from "../../components/product/ProductGrid";
import Loader from "../../components/common/Loader";

const HomePage = () => {
  const { data, isLoading } = useGetProductsQuery({
    page: 1,
    limit: 8,
  });

  if (isLoading) return <Loader />;

  return (
    <div>
      <section className="bg-black text-white py-24">
        <div className="container mx-auto px-4">
          <h1 className="text-5xl font-bold">Discover Amazing Products</h1>

          <p className="mt-4 text-lg">Premium shopping experience</p>
        </div>
      </section>

      <section className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold mb-8">Featured Products</h2>

        <ProductGrid products={data?.data || []} />
      </section>
    </div>
  );
};

export default HomePage;
