import { FC } from 'react';

import Moment from 'react-moment';
import {
    Button,
    Image,
    Text,
    View,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useDispatch } from 'react-redux';

import { SearchableOption } from '../../compositions/types';
import { OrderViewModel } from '../../entities/Order/Order';
import { DetailOrderItemViewModel } from '../../entities/Order/OrderDetail';
import { getColorForDeliveryDateBE, getColorForDeliveryDateNL } from '../../helpers/getColorForDeliveryDate';
import { printShipmentLabel } from '../../helpers/printShipmentLabel';
import { getOrders, shipOrderItem } from '../../store/order/orderActions';

// @ts-ignore
import styles from './Order.scss';

interface OrderProps {
    isClosedOrder: boolean;
    order: OrderViewModel;
    toast: any;
    languageState: string;
    selectedOrderCategory?: SearchableOption;
    page?: number;
    getOrders?: (language: string, page: number, selectedOrderCategory?: string) => void;
}

const Order: FC<OrderProps> = ({
    isClosedOrder,
    order,
    toast,
    page,
    selectedOrderCategory,
    languageState,
}) => {
    const dispatch = useDispatch();

    const sendShipOrderItem = async (order: OrderViewModel, orderDetail: DetailOrderItemViewModel, language: string) => {
        const toastResponse = shipOrderItem(orderDetail, language);

        if (!order) {
            return toast && toast.show(
                <Text style={[{ backgroundColor: '#E74C3C' }, styles.order__toast]}>Kan geen order vinden.</Text>,
                2500,
            );
        }

        dispatch(await getOrders(language, page || 1, selectedOrderCategory?.label));
        await printShipmentLabel(order);

        const toastRes = await toastResponse(dispatch);

        toast.show(
            <Text style={[{ backgroundColor: toastRes.color }, styles.order__toast]}>{toastRes.text}</Text>,
            2500,
        );
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
                <View key={orderDetail.orderItemId}>
                    <Text>
                        {orderDetail.product && orderDetail.product.title}
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
                          // @ts-ignore
                          style={[
                              styles['order__bold-label'],
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
                    <View style={styles['order__send-container']}>
                        {!isClosedOrder
              ? (
                  <Button
                      key={orderDetail.orderItemId}
                      disabled={orderDetail.quantity === orderDetail.quantityShipped}
                      onPress={() => sendShipOrderItem(order, orderDetail, order.shipmentDetails.countryCode)}
                      title="Verzend"
                  />
              )
              : (
                  <MaterialIcons
                      key={orderDetail.orderItemId}
                      style={styles['order__send-container-print']}
                      onPress={() => printShipmentLabel(order)}
                      name="print"
                      color="grey"
                      size={30}
                  />
              )}
                    </View>
                </View>
            ))}
        </View>
    );
};

export default Order;
