import { createBrowserRouter } from "react-router-dom";
import Layout from "../layout/Layout.tsx";
import ProductListPage from "../../modules/product/pages/ProductListPage.tsx";
import ProductDetailPage from "../../modules/product/pages/ProductDetailPage.tsx";
import ProductAddPage from "../../modules/product/pages/ProductAddPage.tsx";
import ProductEditPage from "../../modules/product/pages/ProductEditPage.tsx";
import UserListPage from "../../modules/user/pages/UserListPage.tsx";
import UserDetailPage from "../../modules/user/pages/UserDetailPage.tsx";
import UserEditPage from "../../modules/user/pages/UserEditPage.tsx";
import UserAddPage from "../../modules/user/pages/UserAddPage.tsx";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <ProductListPage />,
      },
      {
        path: "products",
        children: [
          {
            index: true,
            element: <ProductListPage />,
          },
          {
            path: "add",
            element: <ProductAddPage />,
          },
          {
            path: ":id",
            element: <ProductDetailPage />,
          },
          {
            path: ":id/edit",
            element: <ProductEditPage />,
          },
        ],
      },
      {
        path: "users",
        children: [
          {
            index: true,
            element: <UserListPage />,
          },
          {
            path: "add",
            element: <UserAddPage />,
          },
          {
            path: ":id",
            element: <UserDetailPage />,
          },
          {
            path: ":id/edit",
            element: <UserEditPage />,
          },
        ],
      },
    ],
  },
]);
