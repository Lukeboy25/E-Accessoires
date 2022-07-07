import deliveryOptionsReducer, { DeliveryOptionsState } from './deliveryOptions/deliveryOptionsReducer';
import languageReducer, { LanguageState } from './language/languageReducer';
import networkReducer, { NetworkState } from './network/networkReducer';
import orderReducer, { OrderState } from './order/orderReducer';
import shippingLabelReducer, { ShippingLabelState } from './shippingLabel/shippingLabelReducer';

export interface Reducers {
    deliveryOptionsReducer: DeliveryOptionsState,
    languageReducer: LanguageState,
    networkReducer: NetworkState,
    orderReducer: OrderState,
    shippingLabelReducer: ShippingLabelState,
}

export default {
    deliveryOptionsReducer,
    languageReducer,
    networkReducer,
    orderReducer,
    shippingLabelReducer,
};
