import React from "react";
import { ActivityIndicator, View } from "react-native";
import { useTheme } from "../../app/providers/ThemeProvider";
import { useThemedStyles } from "../lib/theme";

export const Loader: React.FC = () => {
  const { theme } = useTheme();
  const styles = useThemedStyles(createStyles);

  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color={theme.colors.primary} />
    </View>
  );
};

const createStyles = (colors: any) => ({
  container: {
    flex: 1,
    justifyContent: "center" as const,
    alignItems: "center" as const,
    backgroundColor: colors.background,
  },
});
