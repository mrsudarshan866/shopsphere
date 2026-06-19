import { useDispatch, useSelector } from "react-redux";
import { useMemo } from "react";

import type { RootState, AppDispatch } from "../app/store";
import { setUser, logout } from "../features/auth/authSlice";

export const useAuth = () => {
  const dispatch = useDispatch<AppDispatch>();

  const auth = useSelector((state: RootState) => state.auth);

  return useMemo(
    () => ({
      ...auth,
      setUser: (user: any) => dispatch(setUser(user)),
      logout: () => dispatch(logout()),
    }),
    [auth, dispatch],
  );
};
