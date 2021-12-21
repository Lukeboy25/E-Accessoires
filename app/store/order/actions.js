import HttpService from '../../services/HttpService';
import { checkStockForOffer } from '../offer/actions';
import { OPEN_ORDERS, CLOSED_ORDERS, ORDER_PAGES, ORDER_AMOUNT} from './types';
import { calculatePage } from '../../helpers/calculatePage';

export function setOpenOrders(openOrders) {
  return {
    type: OPEN_ORDERS,
    openOrders: openOrders,
  };
}

export function setClosedOrders(closedOrders) {
  return {
    type: CLOSED_ORDERS,
    closedOrders: closedOrders,
  };
}

export function setOrderPages(orderPages) {
  return {
    type: ORDER_PAGES,
    orderPages: orderPages,
  };
}

export function setOrderAmount(orderAmount) {
  return {
    type: ORDER_AMOUNT,
    orderAmount: orderAmount,
  };
}

const PAGE_SIZE = 10;

export const calculateOrderPages = (orderAmount) => (dispatch)  => {
  const orderPages = parseInt((orderAmount - 1) / PAGE_SIZE) + 1;

  dispatch(setOrderPages(orderPages));
}

export const getOrderDetails = (httpService, orders, pageNumber, itemsAmount) => {
  const selectedPage = calculatePage(pageNumber, PAGE_SIZE);
  const slicedArray = orders.slice(selectedPage, selectedPage + itemsAmount);
  
  const promiseArray = slicedArray.map(async (order) => {
    return await httpService.get('orders/' + order.orderId);
  });

  return promiseArray;
}

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

  dispatch(calculateOrderPages(orders.length));
  dispatch(setOrderAmount(orders.length));

  const sortedItems = orders.sort((a, b) => a.orderPlacedDateTime > b.orderPlacedDateTime);
  const promiseArray = getOrderDetails(httpService, sortedItems, pageNumber, PAGE_SIZE);

  Promise.all(promiseArray).then((openOrdersArray) => {
    const notCancelledOrders = openOrdersArray.filter((order) => {
      return !order.orderItems[0].cancellationRequest;
    });

    return dispatch(setOpenOrders(notCancelledOrders));
  });
};

export const getClosedOrders = (language, pageNumber) => async (dispatch) => {
  const params = {'status': 'ALL'};

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
  });

  dispatch(calculateOrderPages(onlyClosedOrders.length));
  
  const promiseArray = getOrderDetails(httpService, onlyClosedOrders, pageNumber, 15);
  Promise.all(promiseArray).then((closedOrdersArray) => {
    return dispatch(setClosedOrders(closedOrdersArray));
  }).catch((error) => { 
    console.error('error filtering:', error);
  });
};

const toasterMessageWithColor = (color, text) => {
  return { color: color, text: text };
};

export const shipOrderItem = (orderdetail, language) => async (dispatch) => {
  const httpService = new HttpService(language);

  if (orderdetail.fulfilment.method === 'FBR') {
    // VVB = Verzenden via bol.com, TNT = PostNL
    const transporterCode = orderdetail.fulfilment.deliveryCode === 'VVB' ? 'TNT' : 'BRIEFPOST';

    const shipmentResponse = await httpService
      .put('orders/shipment', {
        orderItems: { orderItemId: orderdetail.orderItemId },
        transport: {
          transporterCode: transporterCode,
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
