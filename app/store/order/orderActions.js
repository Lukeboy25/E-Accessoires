import HttpService from '../../services/HttpService';
import { checkStockForOffer } from '../offer/offerActions';
import {
  OPEN_ORDERS, CLOSED_ORDERS, ORDER_PAGES, ORDER_AMOUNT,
} from './types';
import { calculatePage } from '../../helpers/calculatePage';

export function setOpenOrders(openOrders) {
  return {
    type: OPEN_ORDERS,
    openOrders,
  };
}

export function setClosedOrders(closedOrders) {
  return {
    type: CLOSED_ORDERS,
    closedOrders,
  };
}

export function setOrderPages(orderPages) {
  return {
    type: ORDER_PAGES,
    orderPages,
  };
}

export function setOrderAmount(orderAmount) {
  return {
    type: ORDER_AMOUNT,
    orderAmount,
  };
}

const PAGE_SIZE = 15;

export const calculateOrderPages = (orderAmount) => (dispatch) => {
  const orderPages = parseInt((orderAmount - 1) / PAGE_SIZE) + 1;

  dispatch(setOrderPages(orderPages));
};

export const getOrderDetails = (httpService, orders, pageNumber, itemsAmount) => {
  const selectedPage = calculatePage(pageNumber, PAGE_SIZE);
  const slicedArray = orders.slice(selectedPage, selectedPage + itemsAmount);

  const promiseArray = slicedArray.map(async (order) => await httpService.get(`orders/${order.orderId}`));

  return promiseArray;
};

export const getOrders = (language, pageNumber) => async (dispatch) => {
  const httpService = new HttpService(language);
  const { orders } = await httpService.get('orders').catch((e) => {
    console.error('error fetching orders:', e);
  });

  if (!orders || orders === undefined) {
    dispatch(calculateOrderPages(0));
    dispatch(setOrderAmount(0));

    return dispatch(setOpenOrders([]));
  }

  const notCancelledSortedOrders = orders.filter((order) => {
    if (order && order.orderItems[0]) {
      return !order.orderItems[0].cancellationRequest;
    }
  }).sort((a, b) => a.orderPlacedDateTime > b.orderPlacedDateTime);

  dispatch(calculateOrderPages(orders.length));
  dispatch(setOrderAmount(orders.length));

  const promiseArray = getOrderDetails(httpService, notCancelledSortedOrders, pageNumber, PAGE_SIZE);

  Promise.all(promiseArray).then((openOrdersArray) => dispatch(setOpenOrders(openOrdersArray)));
};

export const getClosedOrders = (language, pageNumber) => async (dispatch) => {
  const params = { status: 'ALL' };

  const httpService = new HttpService(language);
  const { orders } = await httpService.get('orders', { params }).catch((e) => {
    console.error('error while fetching orders:', e);
  });

  if (!orders || orders === undefined) {
    dispatch(calculateOrderPages(0));

    return dispatch(setClosedOrders([]));
  }

  const onlyClosedOrders = orders.filter((order) => {
    if (order && order.orderItems[0]) {
      return order.orderItems[0].quantityShipped === 1;
    }
  }).sort((a, b) => a.orderPlacedDateTime < b.orderPlacedDateTime);

  const promiseArray = getOrderDetails(httpService, onlyClosedOrders, pageNumber, 20);
  Promise.all(promiseArray).then((closedOrdersArray) => dispatch(setClosedOrders(closedOrdersArray))).catch((error) => {
    console.error('error filtering:', error);
  });
};

const toasterMessageWithColor = (color, text) => ({ color, text });

export const shipOrderItem = (orderdetail, language) => async (dispatch) => {
  const httpService = new HttpService(language);

  if (orderdetail.fulfilment.method === 'FBR') {
    // VVB = Verzenden via bol.com, TNT = PostNL
    const transporterCode = orderdetail.fulfilment.deliveryCode === 'VVB' ? 'TNT' : 'BRIEFPOST';

    const shipmentResponse = await httpService
      .put('orders/shipment', {
        orderItems: { orderItemId: orderdetail.orderItemId },
        transport: {
          transporterCode,
        },
      })
      .catch((e) => {
        console.error(e);
      });

    const outOfStockMessage = await dispatch(checkStockForOffer(orderdetail.offer.offerId, language));

    if (outOfStockMessage) {
      return toasterMessageWithColor('#F39C12', outOfStockMessage);
    }

    if (shipmentResponse && shipmentResponse.eventType == 'CONFIRM_SHIPMENT') {
      return toasterMessageWithColor('#2ECC71', 'Order succesvol verzonden!');
    }
  }

  return toasterMessageWithColor('#E74C3C', 'Er is iets fout gegaan!');
};
