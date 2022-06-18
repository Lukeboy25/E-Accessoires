import moment from 'moment';

import { getColorForDeliveryDateBE, getColorForDeliveryDateNL } from './getColorForDeliveryDate';

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

    expect(getColorForDeliveryDateNL(today, currentDayMonday)).toStrictEqual(red);
    expect(getColorForDeliveryDateNL(tomorrow, currentDayMonday)).toStrictEqual(orange);
    expect(getColorForDeliveryDateNL(plusTwoDays, currentDayMonday)).toStrictEqual(green);

    expect(getColorForDeliveryDateNL(plusThreeDays, currentDayFriday)).toStrictEqual(orange);
    expect(getColorForDeliveryDateNL(plusFourDays, currentDayFriday)).toStrictEqual(green);

    expect(getColorForDeliveryDateNL(plusTwoDaysSaturday, currentDaySaturday)).toStrictEqual(orange);
    expect(getColorForDeliveryDateNL(plusThreeDaysSaturday, currentDaySaturday)).toStrictEqual(green);
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

    expect(getColorForDeliveryDateBE(today, currentDayMonday)).toStrictEqual(red);
    expect(getColorForDeliveryDateBE(tomorrow, currentDayMonday)).toStrictEqual(red);
    expect(getColorForDeliveryDateBE(plusTwoDays, currentDayMonday)).toStrictEqual(orange);

    expect(getColorForDeliveryDateBE(plusThreeDays, currentDayFriday)).toStrictEqual(orange);
    expect(getColorForDeliveryDateBE(plusFourDays, currentDayFriday)).toStrictEqual(green);

    expect(getColorForDeliveryDateBE(plusTwoDaysSaturday, currentDaySaturday)).toStrictEqual(orange);
    expect(getColorForDeliveryDateBE(plusThreeDaysSaturday, currentDaySaturday)).toStrictEqual(green);
});
