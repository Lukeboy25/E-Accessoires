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

    // console.log(orderCategories);

    return (
        <OpenOrders
            hasConnection
            isLoading={isLoading}
            openOrders={openOrders}
            orderCategories={orderCategories}
            orderAmount={orderAmount}
            orderPages={orderPages || 1}
        />
    );
};


export default ConnectedOpenOrders;
