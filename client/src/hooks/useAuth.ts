// import { useEffect } from "react";

// import { getProfile } from "../services/auth.service";

// import { setUser } from "../features/auth/authSlice";

// import { useAppDispatch } from "./redux";

// export const useAuth = () => {
//   const dispatch = useAppDispatch();

//   useEffect(() => {
//     async function init() {
//       try {
//         const response = await getProfile();

//         dispatch(setUser(response.data));
//       } catch {}
//     }

//     init();
//   }, [dispatch]);
// };

import { useSelector } from "react-redux";
import { type RootState } from "../app/store";

export const useAuth = () => {
  const auth = useSelector(
    (state: RootState) => state.auth
  );

  return auth;
};