import { FC } from 'react';

import { OpenOrders } from '../../containers';
import { useTypedSelector } from '../../store/store';

const ConnectedOpenOrders: FC = () => {
    const {
        isLoading,
        openOrders,
        orderCategories,
        orderAmount,
        orderPages,
    } = useTypedSelector(state => state.orderReducer);

    // TODO hasConnection

    return (
        <OpenOrders
            hasConnection
            isLoading={isLoading}
            openOrders={openOrders}
            orderCategories={orderCategories}
            orderAmount={orderAmount}
            orderPages={orderPages}
        />
    );
};


export default ConnectedOpenOrders;
