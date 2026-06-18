import api from "./api";

export const getDashboardStats = async () => {
  const response = await api.get("/admin/dashboard");

  return response.data;
};

export const getProducts = async () => {
  const response = await api.get("/admin/products");

  return response.data;
};

export const deleteProduct = async (id: string) => {
  const response = await api.delete(`/admin/products/${id}`);

  return response.data;
};
