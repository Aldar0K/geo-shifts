import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { formatDate, formatTime } from "../../../shared/lib/date";
import { formatPrice } from "../../../shared/lib/number";
import { useThemedStyles } from "../../../shared/lib/theme";
import { Shift } from "../model/types";

interface ShiftCardProps {
  shift: Shift;
  onPress: () => void;
}

export const ShiftCard: React.FC<ShiftCardProps> = React.memo(
  ({ shift, onPress }) => {
    const styles = useThemedStyles(createStyles);

    return (
      <TouchableOpacity style={styles.card} onPress={onPress}>
        <View style={styles.header}>
          <Image source={{ uri: shift.logo }} style={styles.logo} />
          <View style={styles.headerInfo}>
            <Text style={styles.companyName} numberOfLines={1}>
              {shift.companyName}
            </Text>
            <Text style={styles.workType} numberOfLines={1}>
              {shift.workTypes.map((wt) => wt.name).join(", ")}
            </Text>
          </View>
        </View>

        <View style={styles.divider} />

        <View style={styles.row}>
          <Text style={styles.label}>Дата</Text>
          <Text style={styles.value}>{formatDate(shift.dateStartByCity)}</Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>Время</Text>
          <Text style={styles.value}>
            {formatTime(shift.timeStartByCity)} -{" "}
            {formatTime(shift.timeEndByCity)}
          </Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>Требуется</Text>
          <Text style={styles.value}>
            {shift.currentWorkers}/{shift.planWorkers} человек
          </Text>
        </View>

        <View style={styles.footer}>
          <Text style={styles.price}>{formatPrice(shift.priceWorker)}</Text>
          <View style={styles.rating}>
            <Text style={styles.ratingText}>
              ⭐ {shift.customerRating ?? "Новый"}
            </Text>
            <Text style={styles.reviewsCount}>
              ({shift.customerFeedbacksCount})
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  }
);

const createStyles = (colors: any) => ({
  card: {
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 16,
    marginVertical: 8,
    backgroundColor: colors.surface,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  header: {
    flexDirection: "row" as const,
    alignItems: "center" as const,
    marginBottom: 12,
  },
  logo: {
    width: 50,
    height: 50,
    borderRadius: 8,
    marginRight: 12,
  },
  headerInfo: {
    flex: 1,
  },
  companyName: {
    fontSize: 16,
    fontWeight: "600" as const,
    marginBottom: 4,
    color: colors.textPrimary,
  },
  workType: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  divider: {
    height: 1,
    marginVertical: 12,
    backgroundColor: colors.border,
  },
  row: {
    flexDirection: "row" as const,
    justifyContent: "space-between" as const,
    marginBottom: 8,
  },
  label: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  value: {
    fontSize: 14,
    fontWeight: "500" as const,
    color: colors.textPrimary,
  },
  footer: {
    flexDirection: "row" as const,
    justifyContent: "space-between" as const,
    alignItems: "center" as const,
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  price: {
    fontSize: 18,
    fontWeight: "700" as const,
    color: colors.primary,
  },
  rating: {
    flexDirection: "row" as const,
    alignItems: "center" as const,
  },
  ratingText: {
    fontSize: 14,
    fontWeight: "600" as const,
    marginRight: 4,
    color: colors.textPrimary,
  },
  reviewsCount: {
    fontSize: 12,
    color: colors.textSecondary,
  },
});
