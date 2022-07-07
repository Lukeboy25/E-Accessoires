import languageReducer, { LanguageState } from './language/languageReducer';
import networkReducer, { NetworkState } from './network/networkReducer';
import orderReducer, { OrderState } from './order/orderReducer';

export interface Reducers {
    languageReducer: LanguageState,
    networkReducer: NetworkState,
    orderReducer: OrderState,
}

export default {
    languageReducer,
    networkReducer,
    orderReducer,
};
