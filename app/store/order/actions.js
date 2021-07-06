import HttpService from '../../services/HttpService';
import { OPEN_ORDERS, ORDER } from './types';

export function setOpenOrders(openOrders) {
  return {
    type: OPEN_ORDERS,
    openOrders: openOrders,
  };
}

export function setSingleOrder(order) {
  return {
    type: ORDER,
    order: order,
  };
}

export const getOrders = () => async (dispatch) => {
  const { orders } = await HttpService.get('orders');

  if (!orders || orders.length == 0) {
    return [];
  }

  const detailedOrders = [];

  orders.map(async (order) => {
    const singleOrder = await HttpService.get('orders/' + order.orderId);
    detailedOrders.push(singleOrder);

    if (singleOrder) {
      await dispatch(setSingleOrder(singleOrder));
    }
  });

  await dispatch(setOpenOrders(detailedOrders));
};
