import HttpService from '../../services/HttpService';
import { OPEN_ORDERS } from './types';

export function setOpenOrders(openOrders) {
  return {
    type: OPEN_ORDERS,
    openOrders: openOrders,
  };
}

export const getOrders = (country) => async (dispatch) => {
  const httpService = new HttpService(country);
  const { orders } = await httpService.get('orders');

  if (!orders || orders === undefined) {
    return setOpenOrders([]);
  }

  const promiseArray = orders.map(async (order) => {
    return httpService.get('orders/' + order.orderId);
  });

  Promise.all(promiseArray).then((openOrdersArray) => {
    return dispatch(setOpenOrders(openOrdersArray));
  });
};
