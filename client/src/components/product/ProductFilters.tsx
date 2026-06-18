interface Props {
  category: string;
  setCategory: (value: string) => void;
}

const ProductFilters = ({ category, setCategory }: Props) => {
  return (
    <div className="bg-white p-5 rounded-xl shadow">
      <h3 className="font-semibold mb-3">Categories</h3>

      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="w-full border rounded-lg p-3"
      >
        <option value="">All Categories</option>

        <option value="electronics">Electronics</option>

        <option value="fashion">Fashion</option>

        <option value="sports">Sports</option>
      </select>
    </div>
  );
};

export default ProductFilters;
