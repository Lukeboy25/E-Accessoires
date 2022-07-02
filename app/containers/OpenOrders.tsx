import { FC, useEffect, useState } from 'react';

import {
    RefreshControl,
    ScrollView,
    StatusBar,
    StyleSheet,
    View,
} from 'react-native';
import Toast from 'react-native-easy-toast';
import { connect, useDispatch } from 'react-redux';

import {
    Header,
    LoadingSpinner,
    NoNetworkNote,
    Order,
    OrderTitle,
    Pagination,
} from '../components';
import SearchableValueInput from '../compositions/SearchableValueInput/SearchableValueInput';
import { SearchableOption } from '../compositions/types';
import { OrderViewModel } from '../entities/Order/Order';
import { getOrders } from '../store/order/orderActions';
import { requestTokenBE, requestTokenNL } from '../store/token/tokenActions';

interface OpenOrdersProps {
    hasConnection: boolean;
    isLoading: boolean;
    openOrders: OrderViewModel[];
    orderCategories: SearchableOption[];
    orderAmount: number;
    orderPages: number;
}

const OpenOrders: FC<OpenOrdersProps> = ({
    hasConnection,
    isLoading,
    openOrders,
    orderCategories,
    orderAmount,
    orderPages,
}) => {
    const dispatch = useDispatch();

    const [languageState, setLanguageState] = useState<string>('NL');
    const [page, setPage] = useState<number>(1);
    const [orderCategory, setOrderCategory] = useState<SearchableOption | undefined>(undefined);
    const [toaster, setToaster] = useState<any>(null);

    const requestOrders = async () => {
        if (languageState === 'NL') {
            dispatch(await requestTokenNL());
        } else {
            dispatch(await requestTokenBE());
        }

        dispatch(await getOrders(languageState, page, orderCategory?.label));
    };

    useEffect(() => {
        requestOrders();
    }, [languageState]);

    const switchLanguage = async () => {
        setPage(1);
        setOrderCategory(undefined);

        if (languageState === 'NL') {
            setLanguageState('BE');
        } else {
            setLanguageState('NL');
        }
    };

    const handleSetPage = (page: number) => {
        setPage(page);
        requestOrders();
    };

    const onSelectedOrderCategory = (selectedOrderCategory?: SearchableOption) => {
        setOrderCategory(selectedOrderCategory);
        dispatch(getOrders(languageState, page, selectedOrderCategory?.label));
    };

    const handleChangeOrderCategory = (orderCategoryValue: SearchableOption) => {
        const selectedOrder = orderCategoryValue.id !== null
            ? orderCategories.find((option: SearchableOption) => option.id === orderCategoryValue.id)
            : undefined;

        selectedOrder && onSelectedOrderCategory(selectedOrder);
    };

    const getTitle = () => (orderAmount === 1 ? `${orderAmount} openstaande bestelling` : `${orderAmount} openstaande bestellingen`);

    const onDeleteIconPress = () => {
        onSelectedOrderCategory(undefined);
    };


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
                style={styles.background}
                contentContainerStyle={{ flexGrow: 1 }}
                refreshControl={<RefreshControl refreshing={isLoading} onRefresh={requestOrders} />}
            >
                <LoadingSpinner show={isLoading} />
                <StatusBar barStyle="light-content" />
                <Header />
                <View style={styles.container}>
                    <OrderTitle switchLanguage={switchLanguage} languageState={languageState} title={getTitle()} />
                    <SearchableValueInput
                        isSearchable
                        label="Zoek op categorie"
                        value={orderCategory && orderCategory.label}
                        options={orderCategories}
                        onChange={handleChangeOrderCategory}
                        onDeleteIconPress={onDeleteIconPress}
                    />
                    {openOrders?.map((order) => (
                        <Order
                            key={order.orderId}
                            order={order}
                            toast={toaster}
                            page={page}
                            isClosedOrder={false}
                            selectedOrderCategory={orderCategory}
                            languageState={languageState}
                        />
                    ))}
                </View>
                {!orderCategory && orderPages > 1
        && (
            <Pagination
                currentPage={page}
                totalPages={orderPages}
                onPageChange={page => handleSetPage(page)}
            />
        )}
            </ScrollView>
            <Toast
                ref={setToaster}
                style={styles.defaultToast}
                position="top"
                positionValue={0}
                fadeInDuration={800}
                fadeOutDuration={1400}
                textStyle={{ color: 'white' }}
            />
        </>
    );
};

const styles = StyleSheet.create({
    background: {
        flex: 1,
    },
    container: {
        padding: 5,
    },
    defaultToast: {
        backgroundColor: 'rgba(0, 0, 0, 0)',
        margin: 8,
        alignSelf: 'flex-end',
    },
});

// const mapStateToProps = (state: any) => ({
//     token: state.token.token,
//     tokenBE: state.token.tokenBE,
//     orderAmount: state.order.orderAmount,
//     orderPages: state.order.orderPages,
//     orderCategories: state.order.orderCategories,
//     isLoading: state.order.isLoading,
//     hasConnection: state.network.hasConnection,
// });

export default OpenOrders;
