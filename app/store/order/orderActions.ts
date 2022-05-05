import { Dispatch } from 'redux';
import HttpService from '../../services/HttpService';
import { checkStockForOffer } from '../offer/offerActions';
import {
  OPEN_ORDERS, 
  CLOSED_ORDERS, 
  ORDER_PAGES, 
  ORDER_AMOUNT, 
  SET_IS_LOADING, 
  ORDER_CATEGORIES,
} from './orderTypes';
import { calculatePage } from '../../helpers/calculatePage';
import { DetailOrderItemViewModel } from '../../entities/Order/OrderDetail';
import { OrderViewModel } from '../../entities/Order/Order';
import { fetchOrderCategoriesFromOrders } from './helpers/fetchOrderCategoriesFromOrders';

export function setIsLoading(isLoading: boolean) {
  return {
    type: SET_IS_LOADING,
    isLoading,
  };
}

export function setOpenOrders(openOrders: OrderViewModel[], search?: string) {
  return {
    type: OPEN_ORDERS,
    openOrders,
    search,
  };
}

export function setClosedOrders(closedOrders) {
  return {
    type: CLOSED_ORDERS,
    closedOrders,
  };
}

export function setOrderPages(orderPages: number) {
  return {
    type: ORDER_PAGES,
    orderPages,
  };
}

export function setOrderAmount(orderAmount: number) {
  return {
    type: ORDER_AMOUNT,
    orderAmount,
  };
}

export function setOrderCategories(orderCategories: string[]) {
  return {
    type: ORDER_CATEGORIES,
    orderCategories,
  };
}

const PAGE_SIZE = 15;

export const calculateOrderPages = (orderAmount: number) => (dispatch: Dispatch) => {
  const orderPages = parseInt((orderAmount - 1) / PAGE_SIZE) + 1;

  dispatch(setOrderPages(orderPages));
};

export const getOrderDetails = (
  httpService: HttpService, 
  orders: OrderViewModel[], 
  pageNumber: number, 
  itemsAmount: number, 
  search?: string,
) => {
  if (search) {
    return orders.map(async (order) => httpService.get(`orders/${order.orderId}`));
  }

  const selectedPage = calculatePage(pageNumber, PAGE_SIZE);
  const slicedArray = orders.slice(selectedPage, selectedPage + itemsAmount);

  return slicedArray.map(async (order) => httpService.get(`orders/${order.orderId}`));
};

const fetchOrderCategories = (openOrdersArray: OrderViewModel[]) => (dispatch: Dispatch) => {
  const orderCategories = fetchOrderCategoriesFromOrders(openOrdersArray);

  dispatch(setOrderCategories(orderCategories));
};

export const getOrders = (language: string, pageNumber: number, search?: string) => async (dispatch: Dispatch) => {
  dispatch(setIsLoading(true));
  const httpService = new HttpService(language);
  const { orders } = await httpService.get('orders').catch((e) => {
    console.error('error fetching orders:', e);
  });

  if (!orders || orders === undefined) {
    dispatch(calculateOrderPages(0));
    dispatch(setOrderAmount(0));
    dispatch(setIsLoading(false));

    return dispatch(setOpenOrders([]));
  }

  const notCancelledSortedOrders = orders.filter((order: OrderViewModel) => {
    if (order && order.orderItems[0]) {
      return !order.orderItems[0].cancellationRequest;
    }
  }).sort((a: OrderViewModel, b: OrderViewModel) => a.orderPlacedDateTime > b.orderPlacedDateTime);

  dispatch(calculateOrderPages(orders.length));
  dispatch(setOrderAmount(orders.length));

  const promiseArray = getOrderDetails(httpService, notCancelledSortedOrders, pageNumber, PAGE_SIZE, search);

  dispatch(setIsLoading(false));

  return Promise.all(promiseArray).then((openOrdersArray: OrderViewModel[]) => {
    dispatch(setOpenOrders(openOrdersArray, search));
    dispatch(fetchOrderCategories(openOrdersArray));
  });
};

export const getClosedOrders = (language: string, pageNumber: number) => async (dispatch: Dispatch) => {
  dispatch(setIsLoading(true));
  const params = { status: 'ALL' };

  const httpService = new HttpService(language);
  const { orders } = await httpService.get('orders', { params }).catch((e) => {
    console.error('error while fetching orders:', e);
  });

  if (!orders || orders === undefined) {
    dispatch(calculateOrderPages(0));
    dispatch(setIsLoading(false));

    return dispatch(setClosedOrders([]));
  }

  const onlyClosedOrders = orders.filter((order: OrderViewModel) => {
    if (order && order.orderItems[0]) {
      return order.orderItems[0].quantityShipped === 1;
    }
  }).sort((a: OrderViewModel, b: OrderViewModel) => a.orderPlacedDateTime < b.orderPlacedDateTime);

  const promiseArray = getOrderDetails(httpService, onlyClosedOrders, pageNumber, 20);
  Promise.all(promiseArray).then((closedOrdersArray) => dispatch(setClosedOrders(closedOrdersArray))).catch((error) => {
    console.error('error filtering:', error);
  });
  dispatch(setIsLoading(false));
};

const toasterMessageWithColor = (color: string, text: string) => ({ color, text });

export const shipOrderItem = (orderdetail: DetailOrderItemViewModel, language: string) => async (dispatch: Dispatch) => {
  dispatch(setIsLoading(true));
  const httpService = new HttpService(language);

  if (orderdetail.fulfilment.method === 'FBR') {
    const transporterCode = 'BRIEFPOST';

    const shipmentResponse = await httpService
      .put('orders/shipment', {
        orderItems: { orderItemId: orderdetail.orderItemId },
        transport: {
          transporterCode,
        },
      })
      .catch((e) => {
        dispatch(setIsLoading(false));
      });

    const outOfStockMessage = await dispatch(checkStockForOffer(orderdetail.offer.offerId, language));

    if (outOfStockMessage) {
      return toasterMessageWithColor('#F39C12', outOfStockMessage);
    }

    if (shipmentResponse && shipmentResponse.eventType === 'CONFIRM_SHIPMENT') {
      return toasterMessageWithColor('#2ECC71', 'Order succesvol verzonden!');
    }
  }

  dispatch(setIsLoading(false));

  return toasterMessageWithColor('#E74C3C', 'Er is iets fout gegaan!');
};
