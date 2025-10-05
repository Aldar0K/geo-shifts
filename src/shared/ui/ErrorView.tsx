import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { useThemedStyles } from "../lib/theme";

interface ErrorViewProps {
  message: string;
  onRetry?: () => void;
}

export const ErrorView: React.FC<ErrorViewProps> = ({ message, onRetry }) => {
  const styles = useThemedStyles(createStyles);

  return (
    <View style={styles.container}>
      <Text style={styles.errorText}>{message}</Text>
      {onRetry && (
        <TouchableOpacity style={styles.button} onPress={onRetry}>
          <Text style={styles.buttonText}>Повторить</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const createStyles = (colors: any) => ({
  container: {
    flex: 1,
    justifyContent: "center" as const,
    alignItems: "center" as const,
    padding: 20,
    backgroundColor: colors.background,
  },
  errorText: {
    fontSize: 16,
    textAlign: "center" as const,
    marginBottom: 20,
    color: colors.textPrimary,
  },
  button: {
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
    backgroundColor: colors.primary,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "600" as const,
    color: colors.textInverse,
  },
});
