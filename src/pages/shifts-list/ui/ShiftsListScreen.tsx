import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { observer } from "mobx-react-lite";
import React, { useEffect } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { shiftsStore } from "../../../entities/shift/model/shifts.store";
import { ShiftCard } from "../../../entities/shift/ui/ShiftCard";
import { getCurrentLocation } from "../../../processes/geo/model/geolocation";
import { RootStackParamList } from "../../../processes/navigation/types";
import { ErrorView } from "../../../shared/ui/ErrorView";
import { Loader } from "../../../shared/ui/Loader";

type NavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "ShiftsList"
>;

export const ShiftsListScreen: React.FC = observer(() => {
  const navigation = useNavigation<NavigationProp>();

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
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
  },
  listContent: {
    paddingVertical: 8,
  },
});
