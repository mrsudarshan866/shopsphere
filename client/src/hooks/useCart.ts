import { useSelector } from "react-redux";
import { type RootState } from "../app/store";

export const useCart = () => {
  return useSelector((state: RootState) => state.cart);
};
