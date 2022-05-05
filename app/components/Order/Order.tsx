import React, { FC } from 'react';
import {
  View, 
  Text, 
  Image, 
  Button,
} from 'react-native';
import Moment from 'react-moment';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { getColorForDeliveryDate } from '../../helpers/getColorForDeliveryDate';
import { printShipmentLabel } from '../../helpers/printShipmentLabel';
import { OrderViewModel } from '../../entities/Order/Order';
import { DetailOrderItemViewModel } from '../../entities/Order/OrderDetail';
import { ToastResponse } from '../../entities/Toast/Toast';

// @ts-ignore
import styles from './Order.scss';

interface OrderProps {
  isClosedOrder: boolean;
  order: OrderViewModel;
  toast: any;
  page: number;
  selectedOrderCategory: string;
  shipOrderItem: (orderdetail: DetailOrderItemViewModel, language: string) => ToastResponse;
  getOrders: (language: string, page: number, selectedOrderCategory?: string) => void;
};

const Order: FC<OrderProps> = ({
  isClosedOrder,
  order,
  toast,
  page,
  selectedOrderCategory,
  shipOrderItem,
  getOrders,
}) => {
  const sendShipOrderItem = async (order, orderDetail, language) => {
    const toastResponse = await shipOrderItem(orderDetail, language);

    if (!order) {
      return toast
      && toast.show(
        <Text style={[{ backgroundColor: '#E74C3C' }, styles['order__toast']]}>Kan geen order vinden.</Text>,
        2500,
      );
    }

    await getOrders(language, page, selectedOrderCategory);
    await printShipmentLabel(order);

    toast.show(
      <Text style={[{ backgroundColor: toastResponse.color }, styles['order__toast']]}>{toastResponse.text}</Text>,
      2500,
    );
  };

  return (
    <View style={[styles['order'], isClosedOrder && styles['order__dark']]} key={order.orderId}>
      {order.shipmentDetails
        && (
          <View style={styles['order__header']}>
            <Text style={styles['order__title']}>
              {order.orderId}
              {' '}
              -
              {' '}
              {order.shipmentDetails.firstName}
              {' '}
              {order.shipmentDetails.surname}
            </Text>
            <View style={styles['order__language']}>
              {order.shipmentDetails.countryCode === 'NL' && (
                <Image style={styles['order__language-logo']} source={require('../../assets/netherlands.png')} />
              )}
              {order.shipmentDetails.countryCode === 'BE' && (
                <Image style={styles['order__language-logo']} source={require('../../assets/belgium.png')} />
              )}
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
                        getColorForDeliveryDate(orderDetail.fulfilment.latestDeliveryDate || orderDetail.fulfilment.exactDeliveryDate, new Date()),
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
}

export default Order;
