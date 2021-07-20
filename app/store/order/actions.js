import HttpService from '../../services/HttpService';
import { checkStockForOffer } from '../offer/actions';
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
    const notCancelledOrders = openOrdersArray.filter((order) => {
      return !order.orderItems[0].cancellationRequest;
    });

    return dispatch(setOpenOrders(notCancelledOrders));
  });
};

const toasterMessageWithColor = (color, text) => {
  return { color: color, text: text };
};

export const shipOrderItem = (orderItem, language) => async (dispatch) => {
  const httpService = new HttpService(language);

  if (orderItem.fulfilment.method === 'FBR') {
    const shipmentResponse = await httpService
      .put('orders/shipment', {
        orderItems: { orderItemId: orderItem.orderItemId },
        transport: {
          transporterCode: 'OTHER',
        },
      })
      .catch((e) => {
        console.error(e);
      });

    await dispatch(getOrders());

    const outOfStockMessage = await dispatch(checkStockForOffer(orderItem.offer.offerId, language));
    if (outOfStockMessage) {
      return toasterMessageWithColor('#F39C12', outOfStockMessage);
    }

    if (shipmentResponse && shipmentResponse.eventType == 'CONFIRM_SHIPMENT') {
      return toasterMessageWithColor('#2ECC71', 'Order succesvol verzonden!');
    }
  }

  return toasterMessageWithColor('#E74C3C', 'Er is iets fout gegaan!');
};
