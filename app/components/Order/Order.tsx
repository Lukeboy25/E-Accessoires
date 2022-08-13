import { FC } from 'react';

import Moment from 'react-moment';
import { Image, Text, View } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import { SearchableOption } from '../../compositions/types';
import { OrderViewModel } from '../../entities/Order/Order';
import { DetailOrderItemViewModel } from '../../entities/Order/OrderDetail';
import { getColorForDeliveryDateBE, getColorForDeliveryDateNL } from '../../helpers/getColorForDeliveryDate';
import { printShipmentLabel } from '../../helpers/printShipmentLabel';
import { Language } from '../../types/languageTypes';

// @ts-ignore
import styles from './Order.scss';

interface OrderProps {
    isClosedOrder: boolean;
    order: OrderViewModel;
    toast: any;
    languageState: Language;
    onPrintClick: (orderDetail: DetailOrderItemViewModel) => void;
    selectedOrderCategory?: SearchableOption;
    page?: number;
    getOrders?: (languageState: Language, page: number, orderCategoryLabel?: string) => void;
}

const Order: FC<OrderProps> = ({
    isClosedOrder,
    order,
    toast,
    page,
    selectedOrderCategory,
    getOrders,
    onPrintClick,
    languageState,
}) => {
    const handlePrintClick = (orderDetail: DetailOrderItemViewModel): void => {
        printShipmentLabel(order);

        onPrintClick(orderDetail);

        if (getOrders) {
            getOrders(languageState, page || 1, selectedOrderCategory?.label);
        }

        // TO DO fix toast
        // const toastRes = await toastResponse(dispatch);
        //
        // toast.show(
        //     <Text style={[{ backgroundColor: toastRes.color }, styles.order__toast]}>{toastRes.text}</Text>,
        //     2500,
        // );
    };

    return (
        <View style={[styles.order, isClosedOrder && styles.order__dark]} key={order.orderId}>
            {order.shipmentDetails
        && (
            <View style={styles.order__header}>
                <Text style={styles.order__title}>
                    {order.orderId}
                    {' '}
                    -
                    {' '}
                    {order.shipmentDetails.firstName}
                    {' '}
                    {order.shipmentDetails.surname}
                </Text>
                <View style={styles.order__language}>
                    <Image style={styles['order__language-logo']} source={order.shipmentDetails.countryCode === 'NL' ? require('../../assets/netherlands.png') : require('../../assets/belgium.png')} />
                    <Text>
                        {' '}
                        {order.shipmentDetails.countryCode}
                    </Text>
                </View>
            </View>
        )}
            {order.orderItems && order.orderItems.map(orderDetail => (
                <View key={orderDetail.orderItemId} style={styles['order__item-wrapper']}>
                    <View style={styles.order__item}>
                        <Text style={styles['order__item-title']}>
                            {orderDetail.product.title}
                            {' '}
                            - &euro;
                            {orderDetail.unitPrice}
                        </Text>
                        <Text>
                            Aantal besteld:
                            {' '}
                            <Text style={styles['order__bold-label']}>{orderDetail.quantity}</Text>
                        </Text>
                        <Text>
                            Besteld op:
                            {' '}
                            <Moment style={styles['order__bold-label']} format="DD-MM-yyyy, HH:mm uur" element={Text}>
                                {order.orderPlacedDateTime}
                            </Moment>
                        </Text>
                        {!isClosedOrder
                        && (
                            <Text>
                                Uiterste leverdatum:
                                {' '}
                                {orderDetail.fulfilment
                              && (
                                  <Moment
                                      style={[styles['order__bold-label'],
                                    languageState === 'NL'
                                    ? getColorForDeliveryDateNL(orderDetail.fulfilment.latestDeliveryDate || orderDetail.fulfilment.exactDeliveryDate, new Date())
                                    : getColorForDeliveryDateBE(orderDetail.fulfilment.latestDeliveryDate || orderDetail.fulfilment.exactDeliveryDate, new Date()),
                                      ]}
                                      format="DD-MM-yyyy"
                                      element={Text}
                                  >
                                      {orderDetail.fulfilment.latestDeliveryDate || orderDetail.fulfilment.exactDeliveryDate}
                                  </Moment>
                              )}
                            </Text>
                        )}
                    </View>
                    <View style={styles['order__print-wrapper']}>
                        <MaterialIcons
                            onPress={() => handlePrintClick(orderDetail)}
                            name="print"
                            color="grey"
                            size={32}
                            style={styles[`order__print${!isClosedOrder && orderDetail.quantity === orderDetail.quantityShipped ? '--is-shipped' : ''}`]}
                        />
                    </View>
                </View>
            ))}
        </View>
    );
};

export default Order;
