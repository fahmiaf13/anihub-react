import { useRoutes } from "react-router-dom";
import { lazy } from "react";

const Home = lazy(() => import("@/components/pages/Home"));
const Collection = lazy(() => import("@/components/pages/Collection"));
const Details = lazy(() => import("@/components/pages/Details"));

export default function Router() {
  return useRoutes([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/collection/:id",
      element: <Collection />,
    },
    {
      path: "/details/:id",
      element: <Details />,
    },
  ]);
}
