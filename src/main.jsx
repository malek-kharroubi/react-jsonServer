import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Dashboard from "./pages/dashboard/dashboard.jsx";
import Connection from "./pages/connection/connection.jsx";
import Inscription from "./pages/inscription/inscription.jsx";
import { Toaster } from "react-hot-toast";
//Create browserRouter object
const router = createBrowserRouter([
  {
    path: "/",
    element: <Dashboard />,
  },
  {
    path: "/connection",
    element: <Connection />,
  },
  {
    path: "/inscription",
    element: <Inscription />,
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Toaster />
    <RouterProvider router={router}></RouterProvider>
  </StrictMode>
);
