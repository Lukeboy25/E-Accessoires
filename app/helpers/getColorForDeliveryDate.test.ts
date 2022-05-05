import moment from 'moment';
import { getColorForBEDeliveryDate, getColorForDeliveryDate } from './getColorForDeliveryDate';

it('validate different dates returns correct color', () => {
  const green = { color: '#2ECC71' };
  const orange = { color: '#F39C12' };
  const red = { color: '#E74C3C' };

  const currentDayMonday = new Date('2021-11-15');
  const currentDayFriday = new Date('2021-11-19');
  const currentDaySaturday = new Date('2021-11-20');

  const today = moment(currentDayMonday).format('yyyy-MM-DD');
  const tomorrow = moment(currentDayMonday).add(1, 'days').format('yyyy-MM-DD');
  const plusTwoDays = moment(currentDayMonday).add(2, 'days').format('yyyy-MM-DD');

  const plusThreeDays = moment(currentDayFriday).add(3, 'days').format('yyyy-MM-DD');
  const plusFourDays = moment(currentDayFriday).add(4, 'days').format('yyyy-MM-DD');

  const plusTwoDaysSaturday = moment(currentDaySaturday).add(2, 'days').format('yyyy-MM-DD');
  const plusThreeDaysSaturday = moment(currentDaySaturday).add(3, 'days').format('yyyy-MM-DD');

  expect(getColorForDeliveryDate(today, currentDayMonday)).toStrictEqual(red);
  expect(getColorForDeliveryDate(tomorrow, currentDayMonday)).toStrictEqual(orange);
  expect(getColorForDeliveryDate(plusTwoDays, currentDayMonday)).toStrictEqual(green);

  expect(getColorForDeliveryDate(plusThreeDays, currentDayFriday)).toStrictEqual(orange);
  expect(getColorForDeliveryDate(plusFourDays, currentDayFriday)).toStrictEqual(green);

  expect(getColorForDeliveryDate(plusTwoDaysSaturday, currentDaySaturday)).toStrictEqual(orange);
  expect(getColorForDeliveryDate(plusThreeDaysSaturday, currentDaySaturday)).toStrictEqual(green);
});

it('validate different dates returns correct color', () => {
  const green = { color: '#2ECC71' };
  const orange = { color: '#F39C12' };
  const red = { color: '#E74C3C' };

  const currentDayMonday = new Date('2021-11-15');
  const currentDayFriday = new Date('2021-11-19');
  const currentDaySaturday = new Date('2021-11-20');

  const today = moment(currentDayMonday).format('yyyy-MM-DD');
  const tomorrow = moment(currentDayMonday).add(1, 'days').format('yyyy-MM-DD');
  const plusTwoDays = moment(currentDayMonday).add(2, 'days').format('yyyy-MM-DD');

  const plusThreeDays = moment(currentDayFriday).add(3, 'days').format('yyyy-MM-DD');
  const plusFourDays = moment(currentDayFriday).add(4, 'days').format('yyyy-MM-DD');

  const plusTwoDaysSaturday = moment(currentDaySaturday).add(2, 'days').format('yyyy-MM-DD');
  const plusThreeDaysSaturday = moment(currentDaySaturday).add(3, 'days').format('yyyy-MM-DD');

  expect(getColorForBEDeliveryDate(today, currentDayMonday)).toStrictEqual(red);
  expect(getColorForBEDeliveryDate(tomorrow, currentDayMonday)).toStrictEqual(red);
  expect(getColorForBEDeliveryDate(plusTwoDays, currentDayMonday)).toStrictEqual(orange);

  expect(getColorForBEDeliveryDate(plusThreeDays, currentDayFriday)).toStrictEqual(orange);
  expect(getColorForBEDeliveryDate(plusFourDays, currentDayFriday)).toStrictEqual(green);

  expect(getColorForBEDeliveryDate(plusTwoDaysSaturday, currentDaySaturday)).toStrictEqual(orange);
  expect(getColorForBEDeliveryDate(plusThreeDaysSaturday, currentDaySaturday)).toStrictEqual(green);
});
