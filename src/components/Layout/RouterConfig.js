import { RouterProvider, createBrowserRouter } from "react-router-dom";
import AppObjectsTable from "../Table/AppObjectsTable/AppObjectsTable";
import AppObjectsCreateUpdateForm from "../Forms/AppObjectsForms/AppObjectsCreateUpdateForm.js";
import ErrorPage from "./ErrorPage";
import Home from "./Home";

const RouterConfig = () => {
  const config = () =>
    createBrowserRouter([
      {
        path: "/",
        element: <Home />,
        errorElement: <ErrorPage />
      },
      {
        path: "/appObjects",
        element: <AppObjectsTable />
      },
      {
        path: "/appObjects/create",
        element: <AppObjectsCreateUpdateForm />
      },
      {
        path: "/appObjects/:id",
        element: <AppObjectsCreateUpdateForm />
      }
    ]);

  return <RouterProvider router={config()} />;
};

export default RouterConfig;
