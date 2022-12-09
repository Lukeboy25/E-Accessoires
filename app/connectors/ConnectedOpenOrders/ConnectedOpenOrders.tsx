import { FC, useEffect } from 'react';

import { useDispatch } from 'react-redux';

import { OpenOrders } from '../../containers';
import { DetailOrderItemViewModel } from '../../entities/Order/OrderDetail';
import { switchLanguage } from '../../store/language/languageActions';
import { clearSearch, getOrders, shipPostBoxOrderItem } from '../../store/order/orderActions';
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

    const handleGetOrders = async (languageState: Language, page: number, orderCategoryLabel?: string): Promise<void> => {
        if (languageState === 'NL') {
            await dispatch(requestTokenBE());
        } else {
            await dispatch(requestTokenNL());
        }

        await dispatch(getOrders(languageState, page, orderCategoryLabel));
    };

    const handleSwitchLanguage = async (languageState: Language): Promise<void> => {
        dispatch(clearSearch());
        dispatch(switchLanguage(languageState));
    };

    const handleOnDeleteIconPress = async (page: number): Promise<void> => {
        dispatch(clearSearch());
        await dispatch(getOrders(language, page, undefined));
    };

    const handlePrintClick = async (orderDetail: DetailOrderItemViewModel): Promise<void> => {
        await dispatch(shipPostBoxOrderItem(orderDetail, language));
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
            onPrintClick={handlePrintClick}
        />
    );
};

export default ConnectedOpenOrders;
