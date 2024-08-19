import { Theme } from "@/common/interface/theme";
import React, { createContext, useContext, useState, ReactNode } from "react";

interface ThemeProviderProps {
  children: ReactNode;
  initialTheme: Theme;
}

const ThemeContext = createContext<
  | {
      theme: Theme;
      setTheme: (theme: Theme) => void;
    }
  | undefined
>(undefined);

export const ThemeProvider = ({
  children,
  initialTheme,
}: ThemeProviderProps) => {
  const [theme, setTheme] = useState<Theme>(initialTheme);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
