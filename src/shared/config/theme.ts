export interface Theme {
  colors: {
    primary: string;
    background: string;
    surface: string;
    text: {
      primary: string;
      secondary: string;
      inverse: string;
    };
    border: string;
    error: string;
    success: string;
    shadow: string;
  };
}

export const lightTheme: Theme = {
  colors: {
    primary: "#007AFF",
    background: "#F5F5F5",
    surface: "#FFFFFF",
    text: {
      primary: "#333333",
      secondary: "#666666",
      inverse: "#FFFFFF",
    },
    border: "#E5E5E5",
    error: "#FF3B30",
    success: "#34C759",
    shadow: "#000000",
  },
};

export const darkTheme: Theme = {
  colors: {
    primary: "#0A84FF",
    background: "#000000",
    surface: "#1C1C1E",
    text: {
      primary: "#FFFFFF",
      secondary: "#8E8E93",
      inverse: "#000000",
    },
    border: "#38383A",
    error: "#FF453A",
    success: "#32D74B",
    shadow: "#000000",
  },
};
