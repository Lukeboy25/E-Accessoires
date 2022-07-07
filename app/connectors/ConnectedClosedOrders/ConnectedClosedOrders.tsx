import { FC, useEffect } from 'react';

import { useDispatch } from 'react-redux';

import { ClosedOrders } from '../../containers';
import { switchLanguage } from '../../store/language/languageActions';
import { clearSearch, getClosedOrders } from '../../store/order/orderActions';
import { useTypedSelector } from '../../store/store';
import { requestTokenBE, requestTokenNL } from '../../store/token/tokenActions';
import { Language } from '../../types/languageTypes';

const ConnectedClosedOrders: FC = () => {
    const dispatch = useDispatch();

    const {
        isLoading,
        closedOrders,
    } = useTypedSelector(state => state.orderReducer);
    const { language } = useTypedSelector(state => state.languageReducer);
    const { hasConnection } = useTypedSelector(state => state.networkReducer);

    const handleGetClosedOrders = (languageState: Language): void => {
        if (languageState === 'NL') {
            dispatch(requestTokenNL());
        } else {
            dispatch(requestTokenBE());
        }

        dispatch(getClosedOrders(languageState, 1));
    };

    const handleSwitchLanguage = (languageState: Language): void => {
        dispatch(clearSearch());
        dispatch(switchLanguage(languageState));
    };

    useEffect(() => {
        handleGetClosedOrders(language);
    }, [language]);

    return (
        <ClosedOrders
            hasConnection={hasConnection}
            isLoading={isLoading}
            language={language}
            closedOrders={closedOrders}
            handleSwitchLanguage={handleSwitchLanguage}
            handleGetClosedOrders={handleGetClosedOrders}
        />
    );
};


export default ConnectedClosedOrders;
