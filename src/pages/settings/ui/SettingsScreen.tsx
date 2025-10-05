import React from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { useTheme } from "../../../app/providers/ThemeProvider";
import { ThemeMode } from "../../../entities/settings/model/settings.store";
import { useThemedStyles } from "../../../shared/lib/theme";

export const SettingsScreen: React.FC = () => {
  const { mode, setMode } = useTheme();
  const styles = useThemedStyles(createStyles);

  const options: { value: ThemeMode; label: string; description: string }[] = [
    { value: "auto", label: "Авто", description: "Следовать за системой" },
    { value: "light", label: "Светлая", description: "Всегда светлая тема" },
    { value: "dark", label: "Тёмная", description: "Всегда тёмная тема" },
  ];

  return (
    <ScrollView style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Тема приложения</Text>

        {options.map((option) => (
          <TouchableOpacity
            key={option.value}
            style={[
              styles.option,
              mode === option.value && styles.optionSelected,
            ]}
            onPress={() => setMode(option.value)}
          >
            <View style={styles.optionContent}>
              <Text
                style={[
                  styles.optionLabel,
                  mode === option.value && styles.optionLabelSelected,
                ]}
              >
                {option.label}
              </Text>
              <Text style={styles.optionDescription}>{option.description}</Text>
            </View>
            {mode === option.value && (
              <View style={styles.checkmark}>
                <Text style={styles.checkmarkText}>✓</Text>
              </View>
            )}
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
};

const createStyles = (colors: any) => ({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  section: {
    marginTop: 20,
    backgroundColor: colors.surface,
  },
  sectionTitle: {
    fontSize: 13,
    fontWeight: "600" as const,
    textTransform: "uppercase" as const,
    color: colors.textSecondary,
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 8,
  },
  option: {
    flexDirection: "row" as const,
    alignItems: "center" as const,
    justifyContent: "space-between" as const,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  optionSelected: {
    backgroundColor: colors.primary + "10",
  },
  optionContent: {
    flex: 1,
  },
  optionLabel: {
    fontSize: 17,
    fontWeight: "400" as const,
    color: colors.textPrimary,
    marginBottom: 2,
  },
  optionLabelSelected: {
    fontWeight: "600" as const,
    color: colors.primary,
  },
  optionDescription: {
    fontSize: 13,
    color: colors.textSecondary,
  },
  checkmark: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: colors.primary,
    alignItems: "center" as const,
    justifyContent: "center" as const,
  },
  checkmarkText: {
    color: colors.textInverse,
    fontSize: 16,
    fontWeight: "700" as const,
  },
});
