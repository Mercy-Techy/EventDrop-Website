import { createContext, useContext, useState, type ReactNode } from "react";

interface AuthContextType {
  token: string | null;
  user: any;
  isAuth: boolean;
  logIn: (userDetails: any, token: string) => void;
  logOut: () => void;
  updateToken: (newToken: string) => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthContextProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState(() =>
    JSON.parse(localStorage.getItem("user") || "null"),
  );
  const [token, setToken] = useState(() => localStorage.getItem("token"));

  const logIn = (userDetails: any, tk: string) => {
    setToken(tk);
    setUser(userDetails);
    localStorage.setItem("token", tk);
    localStorage.setItem("user", JSON.stringify(userDetails));
  };

  const logOut = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  };
  const updateToken = (newToken: string) => {
    setToken(newToken);
    localStorage.setItem("token", newToken);
  };

  return (
    <AuthContext.Provider
      value={{ token, user, isAuth: !!token, logIn, logOut, updateToken }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("Use Auth does not exist");
  return ctx;
};
