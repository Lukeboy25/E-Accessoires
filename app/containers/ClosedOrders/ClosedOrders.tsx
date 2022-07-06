import React, { FC, useState } from 'react';

import {
    RefreshControl,
    ScrollView,
    StatusBar,
    View,
} from 'react-native';
import Toast from 'react-native-easy-toast';

import {
    Header,
    LoadingSpinner,
    NoNetworkNote,
    Order,
    OrderTitle,
} from '../../components';
import { OrderViewModel } from '../../entities/Order/Order';
import { Language } from '../../types/languageTypes';

// @ts-ignore
import styles from './ClosedOrders.scss';

export const IS_CLOSED_ORDER = true;

interface ClosedOrdersProps {
    hasConnection: boolean;
    isLoading: boolean;
    language: Language;
    closedOrders: OrderViewModel[];
    handleSwitchLanguage: (languageState: Language) => void;
    handleGetClosedOrders: (languageState: Language) => void;
}

const ClosedOrders: FC<ClosedOrdersProps> = ({
    hasConnection,
    isLoading,
    language,
    closedOrders,
    handleSwitchLanguage,
    handleGetClosedOrders,
}) => {
    const [toaster, setToaster] = useState<any>(null);

    if (!hasConnection) {
        return (
            <>
                <StatusBar barStyle="light-content" />
                <Header />
                <NoNetworkNote />
            </>
        );
    }

    return (
        <>
            <ScrollView
                contentContainerStyle={{ flexGrow: 1 }}
                refreshControl={<RefreshControl refreshing={isLoading} onRefresh={() => handleGetClosedOrders(language)} />}
            >
                <LoadingSpinner show={isLoading} />
                <StatusBar barStyle="light-content" />
                <Header />
                <View style={styles['closed-orders__container']}>
                    <OrderTitle switchLanguage={handleSwitchLanguage} language={language} title="Afgeronde bestellingen" />
                    <View>
                        {closedOrders?.map((order) => (
                            <Order
                                key={order.orderId}
                                order={order}
                                toast={toaster}
                                isClosedOrder={IS_CLOSED_ORDER}
                                languageState={language}
                            />
                        ))}
                    </View>

                </View>
            </ScrollView>
            <Toast
                ref={setToaster}
                style={styles['closed-orders__default-toast']}
                position="top"
                positionValue={0}
                fadeInDuration={800}
                fadeOutDuration={1400}
                textStyle={{ color: 'white' }}
            />
        </>
    );
};

export default ClosedOrders;
