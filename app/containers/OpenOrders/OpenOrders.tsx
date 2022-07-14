import { FC, useState } from 'react';

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
    Pagination,
} from '../../components';
import SearchableValueInput from '../../compositions/SearchableValueInput/SearchableValueInput';
import { SearchableOption } from '../../compositions/types';
import { OrderViewModel } from '../../entities/Order/Order';
import { Language } from '../../types/languageTypes';

// @ts-ignore
import styles from './OpenOrders.scss';

interface OpenOrdersProps {
    hasConnection: boolean;
    isLoading: boolean;
    language: Language;
    openOrders: OrderViewModel[];
    orderCategories: SearchableOption[];
    orderAmount: number;
    orderPages: number;
    handleSwitchLanguage: (languageState: Language) => void;
    handleOnDeleteIconPress: (page: number) => void;
    handleGetOrders: (languageState: Language, page: number, orderCategoryLabel?: string) => void;
}

const OpenOrders: FC<OpenOrdersProps> = ({
    hasConnection,
    isLoading,
    language,
    openOrders,
    orderCategories,
    orderAmount,
    orderPages,
    handleSwitchLanguage,
    handleOnDeleteIconPress,
    handleGetOrders,
}) => {
    const [pageState, setPageState] = useState<number>(1);
    const [orderCategory, setOrderCategory] = useState<SearchableOption | undefined>(undefined);
    const [toaster, setToaster] = useState<any>(null);

    const switchLanguage = (languageState: Language): void => {
        setPageState(1);
        setOrderCategory(undefined);

        handleSwitchLanguage(languageState);
    };

    const handleSetPage = (page: number): void => {
        setPageState(page);
        handleGetOrders(language, page, orderCategory?.label);
    };

    const handleChangeOrderCategory = (orderCategoryValue: SearchableOption): void => {
        setOrderCategory(orderCategoryValue);
        const selectedOrder = orderCategoryValue.id && orderCategories.find((option: SearchableOption) => option.id === orderCategoryValue.id);

        if (selectedOrder) {
            handleGetOrders(language, pageState, orderCategoryValue.label);
        }
    };

    const onDeleteIconPress = (): void => {
        setOrderCategory(undefined);
        handleOnDeleteIconPress(pageState);
    };

    const getTitle = (): string => (orderAmount === 1 ? `${orderAmount} openstaande bestelling` : `${orderAmount} openstaande bestellingen`);

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
                refreshControl={<RefreshControl refreshing={isLoading} onRefresh={() => handleGetOrders(language, pageState, orderCategory?.label)} />}
            >
                <LoadingSpinner show={isLoading} />
                <StatusBar barStyle="light-content" />
                <Header />
                <View style={styles['open-orders__container']}>
                    <OrderTitle switchLanguage={switchLanguage} language={language} title={getTitle()} />
                    <SearchableValueInput
                        isSearchable
                        label="Zoek op categorie"
                        value={orderCategory?.label || ''}
                        options={orderCategories}
                        onChange={handleChangeOrderCategory}
                        onDeleteIconPress={onDeleteIconPress}
                    />
                    {openOrders.map(order => (
                        <Order
                            key={order.orderId}
                            order={order}
                            toast={toaster}
                            page={pageState}
                            isClosedOrder={false}
                            selectedOrderCategory={orderCategory}
                            languageState={language}
                        />
                    ))}
                </View>
                {!orderCategory && orderPages > 1 && (
                    <Pagination
                        currentPage={pageState}
                        totalPages={orderPages}
                        onPageChange={page => handleSetPage(page)}
                    />
                )}
            </ScrollView>
            <Toast
                ref={setToaster}
                style={styles['open-orders__default-toast']}
                position="top"
                positionValue={0}
                fadeInDuration={800}
                fadeOutDuration={1400}
                textStyle={{ color: 'white' }}
            />
        </>
    );
};

export default OpenOrders;
