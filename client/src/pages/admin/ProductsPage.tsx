import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import { getProducts, deleteProduct } from "../../services/admin.service";

export default function ProductsPage() {
  const queryClient = useQueryClient();

  const { data } = useQuery({
    queryKey: ["adminProducts"],
    queryFn: getProducts,
  });

  const mutation = useMutation({
    mutationFn: deleteProduct,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["adminProducts"],
      });
    },
  });

  return (
    <div className="p-8">
      <table className="w-full">
        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
            <th>Stock</th>
            <th />
          </tr>
        </thead>

        <tbody>
          {data?.map((product: any) => (
            <tr key={product._id}>
              <td>{product.title}</td>

              <td>₹{product.price}</td>

              <td>{product.stock}</td>

              <td>
                <button onClick={() => mutation.mutate(product._id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
