import { useRoutes } from "react-router-dom";
import { Home, Collection, Details } from "@/components/pages";

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
