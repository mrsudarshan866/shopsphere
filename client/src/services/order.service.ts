import api from "./api";

export const createOrder = async (payload: any) => {
  const response = await api.post("/orders/create", payload);

  return response.data;
};

export const verifyPayment = async (payload: any) => {
  const response = await api.post("/orders/verify", payload);

  return response.data;
};

export const getOrders = async () => {
  const response = await api.get("/orders");

  return response.data;
};
