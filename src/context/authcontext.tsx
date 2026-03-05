import { createContext, useContext, useState, type ReactNode } from "react";

interface AuthContextType {
  token: string | null;
  user: any;
  isAuth: boolean;
  logIn: (userDetails: any, token: string) => void;
}

const AuthContext = createContext<AuthContextType>({
  token: null,
  user: null,
  isAuth: false,
  logIn: () => {},
});

export const AuthContextProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<any>(null);
  const [isAuth, setIsAuth] = useState<boolean>(false);

  const logIn = (userDetails: any, tk: string) => {
    setIsAuth(true);
    setUser(userDetails);
    setToken(tk);
  };

  return (
    <AuthContext.Provider value={{ token, user, isAuth, logIn }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
