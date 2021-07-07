import HttpService from '../../services/HttpService';
import { OPEN_ORDERS } from './types';

export function setOpenOrders(openOrders) {
  return {
    type: OPEN_ORDERS,
    openOrders: openOrders,
  };
}

export const getOrders = () => async (dispatch) => {
  const { orders } = await HttpService.get('orders');

  if (!orders || orders.length == 0) {
    return [];
  }

  const promiseArray = orders.map(async (order) => {
    return HttpService.get('orders/' + order.orderId);
  });

  Promise.all(promiseArray).then((openOrdersArray) => {
    return dispatch(setOpenOrders(openOrdersArray));
  });
};
