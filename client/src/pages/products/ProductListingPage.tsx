import { useState } from "react";
import ProductGrid from "../../components/product/ProductGrid";
import ProductFilters from "../../components/product/ProductFilters";
import Loader from "../../components/common/Loader";
import Pagination from "../../components/common/Pagination";

import { useGetProductsQuery } from "../../features/products/productApi";

const ProductsListingPage = () => {
  const [page, setPage] = useState(1);
  const [category, setCategory] = useState("");

  const { data, isLoading } = useGetProductsQuery({
    page,
    category,
  });

  if (isLoading) return <Loader />;

  return (
    <div className="container mx-auto px-4 py-10">
      <div className="grid lg:grid-cols-[250px_1fr] gap-8">
        <ProductFilters category={category} setCategory={setCategory} />

        <div>
          <ProductGrid products={data?.data || []} />

          <Pagination
            currentPage={page}
            totalPages={data?.pagination?.pages || 1}
            onPageChange={setPage}
          />
        </div>
      </div>
    </div>
  );
};

export default ProductsListingPage;
