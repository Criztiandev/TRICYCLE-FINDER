import { useRouter } from "expo-router";
import React, {
  createContext,
  FC,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react";

interface AuthContextType {
  user: any | null;
  setCredentials: (value: any) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

interface AuthProviderProps extends PropsWithChildren {}

const AuthProvider: FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<any | null>(null);
  const router = useRouter();

  const setCredentials = (value: string) => {
    setUser(value);
  };

  useEffect(() => {
    if (user) {
      router.replace("/user/home");
    }
  }, [user]);

  return (
    <AuthContext.Provider value={{ user, setCredentials }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
