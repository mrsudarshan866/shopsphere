import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import {
  useGetProductQuery,
  useUpdateProductMutation,
} from "../../features/products/productApi";
import toast from "react-hot-toast";

const EditProductPage = () => {
  const { id } = useParams();

  const { data } = useGetProductQuery(id);

  const [updateProduct] = useUpdateProductMutation();

  const { register, handleSubmit } = useForm({
    values: data?.data,
  });

  const onSubmit = async (formData: any) => {
    try {
      await updateProduct({
        id,
        data: formData,
      }).unwrap();

      toast.success("Updated");
    } catch {
      toast.error("Failed");
    }
  };

  return (
    <div className="max-w-2xl">
      <h1 className="text-3xl font-bold mb-6">Edit Product</h1>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-4 bg-white p-6 rounded-xl shadow"
      >
        <input {...register("name")} className="w-full border p-3 rounded" />

        <input {...register("price")} className="w-full border p-3 rounded" />

        <input {...register("stock")} className="w-full border p-3 rounded" />

        <textarea
          {...register("description")}
          className="w-full border p-3 rounded"
        />

        <button className="bg-black text-white px-5 py-3 rounded-lg">
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default EditProductPage;
