import { FC, useEffect } from 'react';

import { useDispatch } from 'react-redux';

import { OpenOrders } from '../../containers';
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
            orderAmount={orderAmount}
            orderPages={orderPages}
            handleSwitchLanguage={handleSwitchLanguage}
            handleOnDeleteIconPress={handleOnDeleteIconPress}
            handleGetOrders={handleGetOrders}
        />
    );
};


export default ConnectedOpenOrders;
