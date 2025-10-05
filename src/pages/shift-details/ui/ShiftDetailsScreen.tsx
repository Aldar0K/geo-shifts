import { RouteProp, useRoute } from "@react-navigation/native";
import { observer } from "mobx-react-lite";
import React from "react";
import { Image, ScrollView, Text, View } from "react-native";
import { shiftsStore } from "../../../entities/shift/model/shifts.store";
import { RootStackParamList } from "../../../processes/navigation/types";
import { formatDate, formatTime } from "../../../shared/lib/date";
import { formatPrice } from "../../../shared/lib/number";
import { useThemedStyles } from "../../../shared/lib/theme";
import { ErrorView } from "../../../shared/ui/ErrorView";

type ShiftDetailsRouteProp = RouteProp<RootStackParamList, "ShiftDetails">;

export const ShiftDetailsScreen: React.FC = observer(() => {
  const route = useRoute<ShiftDetailsRouteProp>();
  const styles = useThemedStyles(createStyles);
  const { shiftId } = route.params;

  const shift = shiftsStore.getShiftById(shiftId);

  if (!shift) {
    return <ErrorView message="Смена не найдена" />;
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Image source={{ uri: shift.logo }} style={styles.logo} />
        <View style={styles.headerInfo}>
          <Text style={styles.companyName}>{shift.companyName}</Text>
          <View style={styles.ratingContainer}>
            <Text style={styles.ratingText}>
              ⭐ {shift.customerRating ?? "Новый"}
            </Text>
            <Text style={styles.reviewsCount}>
              ({shift.customerFeedbacksCount})
            </Text>
          </View>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Тип работы</Text>
        <Text style={styles.sectionText}>
          {shift.workTypes.map((wt) => wt.name).join(", ")}
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Адрес</Text>
        <Text style={styles.sectionText}>{shift.address}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Дата и время</Text>
        <Text style={styles.sectionText}>
          {formatDate(shift.dateStartByCity)}
        </Text>
        <Text style={styles.sectionText}>
          {formatTime(shift.timeStartByCity)} -{" "}
          {formatTime(shift.timeEndByCity)}
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Требуется работников</Text>
        <Text style={styles.sectionText}>{shift.planWorkers} человек</Text>
        <Text style={styles.subText}>Уже набрано: {shift.currentWorkers}</Text>
      </View>

      <View style={styles.priceSection}>
        <Text style={styles.priceLabel}>Оплата за смену</Text>
        <Text style={styles.priceValue}>{formatPrice(shift.priceWorker)}</Text>
      </View>
    </ScrollView>
  );
});

const createStyles = (colors: any) => ({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    padding: 20,
    flexDirection: "row" as const,
    alignItems: "center" as const,
    borderBottomWidth: 1,
    backgroundColor: colors.surface,
    borderBottomColor: colors.border,
  },
  logo: {
    width: 80,
    height: 80,
    borderRadius: 12,
    marginRight: 16,
  },
  headerInfo: {
    flex: 1,
  },
  companyName: {
    fontSize: 20,
    fontWeight: "700" as const,
    marginBottom: 8,
    color: colors.textPrimary,
  },
  ratingContainer: {
    flexDirection: "row" as const,
    alignItems: "center" as const,
  },
  ratingText: {
    fontSize: 16,
    fontWeight: "600" as const,
    marginRight: 6,
    color: colors.textPrimary,
  },
  reviewsCount: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  section: {
    padding: 20,
    marginTop: 12,
    backgroundColor: colors.surface,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: "600" as const,
    marginBottom: 8,
    textTransform: "uppercase" as const,
    color: colors.textSecondary,
  },
  sectionText: {
    fontSize: 16,
    lineHeight: 24,
    color: colors.textPrimary,
  },
  subText: {
    fontSize: 14,
    marginTop: 4,
    color: colors.textSecondary,
  },
  priceSection: {
    padding: 20,
    marginTop: 12,
    marginBottom: 20,
    alignItems: "center" as const,
    backgroundColor: colors.surface,
  },
  priceLabel: {
    fontSize: 14,
    fontWeight: "600" as const,
    marginBottom: 8,
    color: colors.textSecondary,
  },
  priceValue: {
    fontSize: 32,
    fontWeight: "700" as const,
    color: colors.primary,
  },
});
