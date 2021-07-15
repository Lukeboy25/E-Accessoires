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
  const { orders } = await httpService.get('orders').catch((e) => {
    console.error(e);
  });

  if (!orders || orders === undefined) {
    return dispatch(setOpenOrders([]));
  }

  const promiseArray = orders.map(async (order) => {
    return httpService.get('orders/' + order.orderId);
  });

  Promise.all(promiseArray).then((openOrdersArray) => {
    return dispatch(setOpenOrders(openOrdersArray));
  });
};

export const MINIMUM_PRICE = 6;

export const shipOrderItems = (orderItems, language) => async (dispatch) => {
  const orderItemIds = orderItems.map((order) => {
    return { orderItemId: order.orderItemId };
  });

  const httpService = new HttpService(language);
  if (orderItems[0].unitPrice < MINIMUM_PRICE) {
    const shipmentResponse = await httpService
      .put('orders/shipment', {
        orderItems: orderItemIds,
        transport: {
          transporterCode: 'OTHER',
        },
      })
      .catch((e) => {
        console.error(e);
      });

    await dispatch(getOrders());

    if (shipmentResponse && shipmentResponse.eventType == 'CONFIRM_SHIPMENT') {
      return 'Order succesvol verzonden';
    }

    return 'Er is iets fout gegaan!';
  }
};
