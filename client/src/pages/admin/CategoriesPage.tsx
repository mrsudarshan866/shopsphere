import { useState } from "react";
import {
  useCreateCategoryMutation,
  useDeleteCategoryMutation,
  useGetCategoriesQuery,
} from "../../features/categories/categoryApi";
import Loader from "../../components/common/Loader";
import EmptyState from "../../components/common/EmptyState";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";

const CategoriesPage = () => {
  const { id } = useParams();
  const [name, setName] = useState("");

  const { data, isLoading } = useGetCategoriesQuery(id);

  const [createCategory, { isLoading: creating }] = useCreateCategoryMutation();

  const [deleteCategory] = useDeleteCategoryMutation();

  const handleCreate = async () => {
    if (!name.trim()) return;

    try {
      await createCategory({ name }).unwrap();

      toast.success("Category created");

      setName("");
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed");
    }
  };

  const handleDelete = async (id: string) => {
    const confirmDelete = window.confirm("Delete this category?");

    if (!confirmDelete) return;

    try {
      await deleteCategory(id).unwrap();

      toast.success("Deleted");
    } catch (error: any) {
      toast.error(error?.data?.message);
    }
  };

  if (isLoading) return <Loader />;

  const categories = data?.data || [];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Categories</h1>
      </div>

      <div className="bg-white p-6 rounded-xl border">
        <h2 className="font-semibold mb-4">Create Category</h2>

        <div className="flex gap-3">
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Category name"
            className="border rounded-lg px-4 py-2 flex-1"
          />

          <button
            onClick={handleCreate}
            disabled={creating}
            className="px-5 py-2 bg-black text-white rounded-lg"
          >
            {creating ? "Creating..." : "Create"}
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl border overflow-hidden">
        {categories.length === 0 ? (
          <EmptyState title="No categories found" />
        ) : (
          <table className="w-full">
            <thead>
              <tr className="bg-slate-50">
                <th className="text-left px-4 py-3">Name</th>

                <th className="text-left px-4 py-3">Created</th>

                <th className="text-left px-4 py-3">Action</th>
              </tr>
            </thead>

            <tbody>
              {categories.map((cat: any) => (
                <tr key={cat._id} className="border-t">
                  <td className="px-4 py-3">{cat.name}</td>

                  <td className="px-4 py-3">
                    {new Date(cat.createdAt).toLocaleDateString()}
                  </td>

                  <td className="px-4 py-3">
                    <button
                      onClick={() => handleDelete(cat._id)}
                      className="text-red-500"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default CategoriesPage;
