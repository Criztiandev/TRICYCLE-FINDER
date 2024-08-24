import { IStoredDetails } from "@/feature/account/interface/account.interface";
import { Href, useRouter } from "expo-router";
import React, {
  createContext,
  FC,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react";

interface AuthContextType {
  user: IStoredDetails | null;
  setCredentials: (value: IStoredDetails | null) => void;
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
  const [user, setUser] = useState<IStoredDetails | null>(null);
  const router = useRouter();

  const routeMap: Record<"user" | "rider", string> = {
    user: "/user/home",
    rider: "/rider/home",
  };

  const setCredentials = (value: IStoredDetails | null) => {
    setUser(value);
  };

  useEffect(() => {
    if (user) {
      if (user.role in routeMap) {
        router.replace(routeMap[user.role] as Href<string>);
      } else {
      }
    }
  }, [user, router]);

  return (
    <AuthContext.Provider value={{ user, setCredentials }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
