import { RouterProvider } from "react-router";
import router from "./router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "sonner";
import { useAuth } from "./context/authcontext";
import { useEffect } from "react";
import { setupInterceptors } from "./api/axios";

export const queryClient = new QueryClient();

const App = () => {
  const { updateToken, logOut } = useAuth();

  useEffect(() => {
    setupInterceptors(updateToken, logOut);
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <Toaster position="top-center" />
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
};

export default App;
