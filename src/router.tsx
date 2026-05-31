import { createBrowserRouter } from "react-router";
import Home from "./screens/home";
import Login from "./screens/login";
import SignUp from "./screens/signup";
import Dashboard from "./pages/dashboard";
import RequireAuth from "./components/requireauth";
import Events from "./pages/event";

const router = createBrowserRouter([
  { path: "/", element: <Home /> },
  { path: "/signup", element: <SignUp /> },
  { path: "/login", element: <Login /> },
  {
    element: <RequireAuth />,
    children: [
      {
        path: "/dashboard",
        element: <Dashboard />,
        children: [{ index: true, element: <Events /> }],
      },
    ],
  },
]);

export default router;
