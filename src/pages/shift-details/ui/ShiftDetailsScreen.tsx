import { RouteProp, useRoute } from '@react-navigation/native';
import { observer } from 'mobx-react-lite';
import React from 'react';
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import { shiftsStore } from '../../../entities/shift/model/shifts.store';
import { RootStackParamList } from '../../../processes/navigation/types';
import { formatDate, formatTime } from '../../../shared/lib/date';
import { formatPrice } from '../../../shared/lib/number';
import { ErrorView } from '../../../shared/ui/ErrorView';

type ShiftDetailsRouteProp = RouteProp<RootStackParamList, 'ShiftDetails'>;

export const ShiftDetailsScreen: React.FC = observer(() => {
  const route = useRoute<ShiftDetailsRouteProp>();
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
            <Text style={styles.ratingText}>⭐ {shift.customerRating}</Text>
            <Text style={styles.reviewsCount}>
              ({shift.customerFeedbacksCount} отзыва)
            </Text>
          </View>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Тип работы</Text>
        <Text style={styles.sectionText}>{shift.workTypes.join(', ')}</Text>
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
          {formatTime(shift.timeStartByCity)} -{' '}
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  header: {
    backgroundColor: '#FFF',
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
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
    fontWeight: '700',
    color: '#333',
    marginBottom: 8,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginRight: 6,
  },
  reviewsCount: {
    fontSize: 14,
    color: '#666',
  },
  section: {
    backgroundColor: '#FFF',
    padding: 20,
    marginTop: 12,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666',
    marginBottom: 8,
    textTransform: 'uppercase',
  },
  sectionText: {
    fontSize: 16,
    color: '#333',
    lineHeight: 24,
  },
  subText: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  priceSection: {
    backgroundColor: '#FFF',
    padding: 20,
    marginTop: 12,
    marginBottom: 20,
    alignItems: 'center',
  },
  priceLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666',
    marginBottom: 8,
  },
  priceValue: {
    fontSize: 32,
    fontWeight: '700',
    color: '#007AFF',
  },
});
