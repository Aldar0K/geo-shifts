import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { formatDate, formatTime } from '../../../shared/lib/date';
import { formatPrice } from '../../../shared/lib/number';
import { Shift } from '../model/types';

interface ShiftCardProps {
  shift: Shift;
  onPress: () => void;
}

export const ShiftCard: React.FC<ShiftCardProps> = React.memo(
  ({ shift, onPress }) => {
    return (
      <TouchableOpacity style={styles.card} onPress={onPress}>
        <View style={styles.header}>
          <Image source={{ uri: shift.logo }} style={styles.logo} />
          <View style={styles.headerInfo}>
            <Text style={styles.companyName} numberOfLines={1}>
              {shift.companyName}
            </Text>
            <Text style={styles.workType} numberOfLines={1}>
              {shift.workTypes.join(', ')}
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
            {formatTime(shift.timeStartByCity)} -{' '}
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
            <Text style={styles.ratingText}>⭐ {shift.customerRating}</Text>
            <Text style={styles.reviewsCount}>
              ({shift.customerFeedbacksCount})
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  },
);

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 16,
    marginVertical: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
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
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  workType: {
    fontSize: 14,
    color: '#666',
  },
  divider: {
    height: 1,
    backgroundColor: '#E5E5E5',
    marginVertical: 12,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  label: {
    fontSize: 14,
    color: '#666',
  },
  value: {
    fontSize: 14,
    color: '#333',
    fontWeight: '500',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#E5E5E5',
  },
  price: {
    fontSize: 18,
    fontWeight: '700',
    color: '#007AFF',
  },
  rating: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginRight: 4,
  },
  reviewsCount: {
    fontSize: 12,
    color: '#666',
  },
});
