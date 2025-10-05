import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { observer } from "mobx-react-lite";
import React, { useEffect, useLayoutEffect, useState } from "react";
import {
  FlatList,
  RefreshControl,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useTheme } from "../../../app/providers/ThemeProvider";
import { shiftsStore } from "../../../entities/shift/model/shifts.store";
import { ShiftCard } from "../../../entities/shift/ui/ShiftCard";
import { getCurrentLocation } from "../../../processes/geo/model/geolocation";
import { RootStackParamList } from "../../../processes/navigation/types";
import { useThemedStyles } from "../../../shared/lib/theme";
import { ErrorView } from "../../../shared/ui/ErrorView";
import { Loader } from "../../../shared/ui/Loader";

type NavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "ShiftsList"
>;

export const ShiftsListScreen: React.FC = observer(() => {
  const navigation = useNavigation<NavigationProp>();
  const { theme } = useTheme();
  const styles = useThemedStyles(createStyles);
  const [refreshing, setRefreshing] = useState(false);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          onPress={() => navigation.navigate("Settings")}
          style={styles.settingsButton}
        >
          <Text style={styles.settingsIcon}>⚙️</Text>
        </TouchableOpacity>
      ),
    });
  }, [navigation, theme, styles]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const location = await getCurrentLocation();
      await shiftsStore.loadShifts(location.latitude, location.longitude);
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : String(error);
      console.error("Error loading data:", errorMessage);
    }
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    await loadData();
    setRefreshing(false);
  };

  const handleShiftPress = (shiftId: string) => {
    navigation.navigate("ShiftDetails", { shiftId });
  };

  if (shiftsStore.isLoading && shiftsStore.shifts.length === 0) {
    return <Loader />;
  }

  if (shiftsStore.error && shiftsStore.shifts.length === 0) {
    return <ErrorView message={shiftsStore.error} onRetry={loadData} />;
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={shiftsStore.shifts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <ShiftCard shift={item} onPress={() => handleShiftPress(item.id)} />
        )}
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <Text style={styles.emptyTitle}>Нет доступных смен</Text>
            <Text style={styles.emptyText}>
              В вашем регионе пока нет доступных смен.{"\n"}
              Потяните вниз, чтобы обновить список.
            </Text>
          </View>
        }
        contentContainerStyle={
          shiftsStore.shifts.length === 0
            ? styles.emptyListContent
            : styles.listContent
        }
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={handleRefresh}
            tintColor={theme.colors.primary}
            colors={[theme.colors.primary]}
          />
        }
      />
    </View>
  );
});

const createStyles = (colors: any) => ({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  listContent: {
    paddingVertical: 8,
  },
  emptyListContent: {
    flexGrow: 1,
  },
  emptyState: {
    flex: 1,
    justifyContent: "center" as const,
    alignItems: "center" as const,
    paddingHorizontal: 40,
    paddingVertical: 60,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: "600" as const,
    color: colors.textPrimary,
    marginBottom: 12,
    textAlign: "center" as const,
  },
  emptyText: {
    fontSize: 15,
    color: colors.textSecondary,
    textAlign: "center" as const,
    lineHeight: 22,
  },
  settingsButton: {
    padding: 4,
  },
  settingsIcon: {
    fontSize: 28,
    color: colors.textInverse,
  },
});
