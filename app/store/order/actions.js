import HttpService from '../../services/HttpService';
import { OPEN_ORDERS } from './types';

export function setOpenOrders(openOrders) {
  return {
    type: OPEN_ORDERS,
    openOrders: openOrders,
  };
}

export const getOrders = () => async (dispatch) => {
  const openOrders = await HttpService.get('orders');
  // if (openOrders && openOrders.length > 0) {
  //   await dispatch(setOpenOrders(openOrders));
  // }
};
