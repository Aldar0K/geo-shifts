import { observer } from "mobx-react-lite";
import React, { createContext, ReactNode, useContext } from "react";
import { useColorScheme } from "react-native";
import {
  settingsStore,
  ThemeMode,
} from "../../entities/settings/model/settings.store";
import { darkTheme, lightTheme, Theme } from "../../shared/config/theme";

interface ThemeContextType {
  theme: Theme;
  mode: ThemeMode;
  setMode: (mode: ThemeMode) => void;
}

const ThemeContext = createContext<ThemeContextType>({
  theme: lightTheme,
  mode: "auto",
  setMode: () => {},
});

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within ThemeProvider");
  }
  return context;
};

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = observer(
  ({ children }) => {
    const systemColorScheme = useColorScheme();

    const getTheme = (): Theme => {
      if (settingsStore.themeMode === "auto") {
        return systemColorScheme === "dark" ? darkTheme : lightTheme;
      }
      return settingsStore.themeMode === "dark" ? darkTheme : lightTheme;
    };

    const theme = getTheme();

    return (
      <ThemeContext.Provider
        value={{
          theme,
          mode: settingsStore.themeMode,
          setMode: (mode) => settingsStore.setThemeMode(mode),
        }}
      >
        {children}
      </ThemeContext.Provider>
    );
  }
);
