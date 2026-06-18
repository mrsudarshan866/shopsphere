import { useForm } from "react-hook-form";

export default function CreateProductPage() {
  const { register, handleSubmit } = useForm();

  const submitHandler = (data: any) => {
    console.log(data);
  };

  return (
    <form
      onSubmit={handleSubmit(submitHandler)}
      className="
      max-w-xl
      mx-auto
      space-y-4
      "
    >
      <input placeholder="Title" {...register("title")} />

      <input placeholder="Price" {...register("price")} />

      <input placeholder="Stock" {...register("stock")} />

      <textarea placeholder="Description" {...register("description")} />

      <button
        className="
        bg-black
        text-white
        px-5
        py-3
        rounded
        "
      >
        Create Product
      </button>
    </form>
  );
}
