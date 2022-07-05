import { Dispatch } from 'redux';

import { OrdersViewModel, OrderViewModel } from '../../entities/Order/Order';
import { DetailOrderItemViewModel } from '../../entities/Order/OrderDetail';
import { calculatePage } from '../../helpers/calculatePage';
import HttpService from '../../services/HttpService';
import { checkStockForOffer } from '../offer/offerActions';
import { getOrderCategoriesFromOrders } from './helpers/getOrderCategoriesFromOrders';
import {
    setClosedOrders,
    setIsLoading,
    setOpenOrders,
    setOrderAmount,
    setOrderCategories,
    setOrderPages, setSearch,
} from './orderReducer';

const PAGE_SIZE = 15;

const calculateOrderPages = (orderAmount: number) => (dispatch: Dispatch): void => {
    const orderPages = parseInt(String((orderAmount - 1) / PAGE_SIZE), 10) + 1;

    dispatch(setOrderPages(orderPages));
};

const getOrderDetails = (
    httpService: HttpService,
    orders: OrderViewModel[],
    pageNumber: number,
    itemsAmount: number,
    search?: string,
) => (dispatch: Dispatch) => {
    if (search) {
        dispatch(setSearch(search));

        return orders.map(async (order) => httpService.get(`orders/${order.orderId}`));
    }

    const selectedPage = calculatePage(pageNumber, PAGE_SIZE);
    const slicedArray = orders.slice(selectedPage, selectedPage + itemsAmount);

    return slicedArray.map(async (order) => httpService.get(`orders/${order.orderId}`));
};

export const getOrders = (language: string, pageNumber: number, search?: string) => async (dispatch: Dispatch) => {
    dispatch(setIsLoading(true));

    const httpService = new HttpService(language);
    const { orders } = await httpService.get('orders').catch((e) => {
        console.error('error fetching orders:', e);
        dispatch(setIsLoading(false));
    });

    if (!orders) {
        dispatch(calculateOrderPages(1));
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

    const promiseArray = dispatch(getOrderDetails(httpService, notCancelledSortedOrders, pageNumber, PAGE_SIZE, search));

    dispatch(setIsLoading(false));

    return Promise.all(promiseArray).then((openOrdersArray: OrderViewModel[]) => {
        dispatch(setOpenOrders(openOrdersArray));

        const orderCategories = getOrderCategoriesFromOrders(openOrdersArray);
        dispatch(setOrderCategories(orderCategories));
    });
};

export const getClosedOrders = (language: string, pageNumber = 1) => async (dispatch: Dispatch) => {
    dispatch(setIsLoading(true));
    const params = { status: 'ALL' };

    const httpService = new HttpService(language);
    const { orders } = await httpService.get('orders', { params }).catch((e) => {
        console.error('error while fetching orders:', e);
        dispatch(setIsLoading(false));
    });

    if (!orders) {
        dispatch(calculateOrderPages(1));
        dispatch(setIsLoading(false));

        return dispatch(setClosedOrders([]));
    }

    const onlyClosedOrders = orders.filter((order: OrdersViewModel) => {
        if (order && order.orderItems[0]) {
            return order.orderItems[0].quantityShipped === 1;
        }
    }).sort((a: OrderViewModel, b: OrderViewModel) => a.orderPlacedDateTime < b.orderPlacedDateTime);

    const promiseArray = dispatch(getOrderDetails(httpService, onlyClosedOrders, pageNumber, 20));
    Promise.all(promiseArray).then((closedOrdersArray) => dispatch(setClosedOrders(closedOrdersArray))).catch((error) => {
        console.error('error filtering:', error);
    });
    dispatch(setIsLoading(false));
};

const toasterMessageWithColor = (color: string, text: string) => ({ color, text });

export const clearSearch = () => (dispatch: Dispatch): void => {
    dispatch(setSearch(undefined));
};

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

        const outOfStockMessage = await checkStockForOffer(orderdetail.offer.offerId, language);

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
