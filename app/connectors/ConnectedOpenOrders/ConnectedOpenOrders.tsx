import { FC, useEffect } from 'react';

import { useDispatch } from 'react-redux';

import { OpenOrders } from '../../containers';
import { getDeliveryOptions } from '../../store/deliveryOptions/deliveryOptionsActions';
import { switchLanguage } from '../../store/language/languageActions';
import { clearSearch, getOrders } from '../../store/order/orderActions';
import { useTypedSelector } from '../../store/store';
import { requestTokenBE, requestTokenNL } from '../../store/token/tokenActions';
import { Language } from '../../types/languageTypes';

const ConnectedOpenOrders: FC = () => {
    const dispatch = useDispatch();

    const {
        isLoading,
        openOrders,
        orderCategories,
        orderAmount,
        orderPages,
    } = useTypedSelector(state => state.orderReducer);
    const { language } = useTypedSelector(state => state.languageReducer);
    const { hasConnection } = useTypedSelector(state => state.networkReducer);
    const { deliveryOptions } = useTypedSelector(state => state.deliveryOptionsReducer);

    const handleGetOrders = (languageState: Language, page: number, orderCategoryLabel?: string): void => {
        if (languageState === 'NL') {
            dispatch(requestTokenBE());
        } else {
            dispatch(requestTokenNL());
        }

        dispatch(getOrders(languageState, page, orderCategoryLabel));
    };

    const handleSwitchLanguage = (languageState: Language): void => {
        dispatch(clearSearch());
        dispatch(switchLanguage(languageState));
    };

    const handleOnDeleteIconPress = (page: number): void => {
        dispatch(clearSearch());
        dispatch(getOrders(language, page, undefined));
    };

    const handleDeliveryClick = (orderItemId: string): void => {
        dispatch(getDeliveryOptions(language, orderItemId));
    };

    const onDeliveryOptionClick = (orderItemId: string, shippingLabelOfferId: string): void => {
        // TODO Uncomment to test if creating shipping label works!
        // dispatch(createShippingLabel(language, orderItemId, shippingLabelOfferId));
    };

    useEffect(() => {
        handleGetOrders(language, 1, undefined);
    }, [language]);

    return (
        <OpenOrders
            hasConnection={hasConnection}
            isLoading={isLoading}
            language={language}
            openOrders={openOrders}
            orderCategories={orderCategories}
            deliveryOptions={deliveryOptions}
            orderAmount={orderAmount}
            orderPages={orderPages}
            handleSwitchLanguage={handleSwitchLanguage}
            handleOnDeleteIconPress={handleOnDeleteIconPress}
            handleGetOrders={handleGetOrders}
            handleDeliveryClick={handleDeliveryClick}
            onDeliveryOptionClick={onDeliveryOptionClick}
        />
    );
};

export default ConnectedOpenOrders;
