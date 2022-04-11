import moment from 'moment';
import { StyleSheet } from 'react-native';

export const MONDAY = 1;

export const getColorForDeliveryDate = (date: string, currentDate: Date) => {
  const newDate = new Date(date);

  if (date <= moment(currentDate).format('yyyy-MM-DD')) {
    return styles.errorText;
  }

  if (date === moment(currentDate).add(1, 'days').format('yyyy-MM-DD')) {
    return styles.dangerText;
  }

  // Add two days over the weekend
  if (newDate.getDay() === MONDAY) {
    if (date <= moment(currentDate).add(3, 'days').format('yyyy-MM-DD')) {
      return styles.dangerText;
    }
  }

  if (date >= moment(currentDate).format('yyyy-MM-DD')) {
    return styles.safeText;
  }

  return styles.errorText;
};

export const getColorForBEDeliveryDate = (date: string, currentDate: Date) => {
  const newDate = new Date(date);

  if (date <= moment(currentDate).add(1, 'days').format('yyyy-MM-DD')) {
    return styles.errorText;
  }

  if (date === moment(currentDate).add(2, 'days').format('yyyy-MM-DD')) {
    return styles.dangerText;
  }

  // Add two days over the weekend
  if (newDate.getDay() === MONDAY) {
    if (date <= moment(currentDate).add(3, 'days').format('yyyy-MM-DD')) {
      return styles.dangerText;
    }
  }

  if (date >= moment(currentDate).format('yyyy-MM-DD')) {
    return styles.safeText;
  }

  return styles.errorText;
};

const styles = StyleSheet.create({
  safeText: {
    color: '#2ECC71',
  },
  dangerText: {
    color: '#F39C12',
  },
  errorText: {
    color: '#E74C3C',
  },
});
