import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router";
import Main from "./layouts/Main";
import Index from "./pages/Index";
import AdminPanel from "./pages/AdminPanel";
import AdminLogin from "./pages/Login";
import { Provider } from "react-redux";
import { store } from "./store";
import { Toaster } from "./components/ui/sonner";
import ProjectDetails from "./components/ProjectDetails";
import Protect from "./pages/protector/Protect";

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
        path: "/project/:id",
        element: <ProjectDetails />,
      },
      {
        path: "/admin",
        element: (
          <Protect>
            <AdminPanel />
          </Protect>
        ),
      },
    ],
  },
  {
    path: "/login",
    element: <AdminLogin />,
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
      <Toaster richColors position="top-center" />
    </Provider>
  </StrictMode>,
);
