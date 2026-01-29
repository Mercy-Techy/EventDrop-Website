import { createBrowserRouter } from "react-router";
import Home from "./screens/home";
import Login from "./screens/login";
import SignUp from "./screens/signup";
import Dashboard from "./pages/dashboard";

const router = createBrowserRouter([
  { path: "/", element: <Home /> },
  { path: "/signup", element: <SignUp /> },
  { path: "/login", element: <Login /> },
  { path: "/dashboard", element: <Dashboard /> },
]);

export default router;
