import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router";
import Main from "./layouts/Main";
import Index from "./pages/Index";
import AdminPanel from "./pages/AdminPanel";
import AdminLogin from "./pages/Login";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children: [
      {
        index: true,
        element: <Index />,
      },
      {
        path: "/admin",
        element: <AdminPanel />,
      },
      {
        path: "/login",
        element: <AdminLogin />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
