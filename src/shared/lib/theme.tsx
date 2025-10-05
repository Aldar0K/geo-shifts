import { ImageStyle, StyleSheet, TextStyle, ViewStyle } from "react-native";
import { useTheme } from "../../app/providers/ThemeProvider";

type NamedStyles<T> = { [P in keyof T]: ViewStyle | TextStyle | ImageStyle };

type ThemedStylesFunction<T extends NamedStyles<T>> = (colors: {
  primary: string;
  background: string;
  surface: string;
  textPrimary: string;
  textSecondary: string;
  textInverse: string;
  border: string;
  error: string;
  success: string;
  shadow: string;
}) => T;

export const useThemedStyles = <T extends NamedStyles<T>>(
  stylesFn: ThemedStylesFunction<T>
): T => {
  const { theme } = useTheme();

  const themedTokens = {
    primary: theme.colors.primary,
    background: theme.colors.background,
    surface: theme.colors.surface,
    textPrimary: theme.colors.text.primary,
    textSecondary: theme.colors.text.secondary,
    textInverse: theme.colors.text.inverse,
    border: theme.colors.border,
    error: theme.colors.error,
    success: theme.colors.success,
    shadow: theme.colors.shadow,
  };

  return StyleSheet.create(stylesFn(themedTokens));
};
