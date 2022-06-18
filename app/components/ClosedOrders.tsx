import React, { FC } from 'react';

import { StyleSheet, View } from 'react-native';

import { OrderViewModel } from '../entities/Order/Order';
import { Order, OrderTitle } from './index';
import LoadingSpinner from './LoadingSpinner';

export const IS_CLOSED_ORDER = true;

interface ClosedOrdersProps {
    isLoading: boolean;
    languageState: string;
    closedOrders: OrderViewModel[];
    toast: any;
    switchLanguage: () => void;
}

const ClosedOrders: FC<ClosedOrdersProps> = ({
    isLoading,
    languageState,
    switchLanguage,
    closedOrders,
    toast,
}) =>
// if (isLoading) {
//   return <LoadingSpinner show={isLoading} />;
// }

    (
        <View style={styles.container}>
            <OrderTitle switchLanguage={switchLanguage} languageState={languageState} title="Afgeronde bestellingen" />
            <View>
                {closedOrders?.map((order) => (
                    <Order
                        key={order.orderId}
                        order={order}
                        toast={toast}
                        isClosedOrder={IS_CLOSED_ORDER}
                        languageState={languageState}
                    />
                ))}
            </View>
        </View>
    );


const styles = StyleSheet.create({
    container: {
        padding: 5,
    },
});

export default ClosedOrders;
