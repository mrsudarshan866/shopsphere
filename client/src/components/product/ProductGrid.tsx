import ProductCard from "./ProductCard";

interface Props {
  products: any[];
}

const ProductGrid = ({ products }: Props) => {
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {products.map((product) => (
        <ProductCard key={product._id} product={product} />
      ))}
    </div>
  );
};

export default ProductGrid;
