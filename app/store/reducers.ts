import languageReducer, { LanguageState } from './language/languageReducer';
import orderReducer, { OrderState } from './order/orderReducer';

export interface Reducers {
    languageReducer: LanguageState,
    orderReducer: OrderState,
}

export default {
    languageReducer,
    orderReducer,
};
