import orderReducer, { OrderState } from './order/orderReducer';

export interface Reducers {
    orderReducer: OrderState,
}

export default {
    orderReducer,
};
