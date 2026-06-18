import { BrowserRouter } from "react-router-dom";

import AppRoutes from "./routes/AppRoutes";
import { useAuth } from "./hooks/useAuth";

export default function App() {
  useAuth();

  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}
