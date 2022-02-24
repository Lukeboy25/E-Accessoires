import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
  View, Text, StyleSheet, Image, Button,
} from 'react-native';
import Moment from 'react-moment';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { getOrders, shipOrderItem } from '../store/order/orderActions';
import { getColorForDeliveryDate } from '../helpers/getColorForDeliveryDate';
import { printShipmentLabel } from '../helpers/printShipmentLabel';

function Order({
  order,
  shipOrderItem,
  toast,
  isClosedOrder,
  getOrders,
  languageState,
  page,
}) {
  const sendShipOrderItem = async (order, orderDetail, language) => {
    const toastResponse = await shipOrderItem(orderDetail, language);

    if (!order) {
      return toast
      && toast.show(
        <Text style={[{ backgroundColor: '#E74C3C' }, styles.toastStyle]}>Kan geen order vinden.</Text>,
        2500,
      );
    }

    await getOrders(language, page);
    await printShipmentLabel(order);

   toast.show(
        <Text style={[{ backgroundColor: toastResponse.color }, styles.toastStyle]}>{toastResponse.text}</Text>,
        2500,
      );
  };

  return (
    <View style={[styles.orderCard, isClosedOrder ? styles.orderCardDark : styles.orderCard]} key={order.orderId}>
      {order.shipmentDetails
        && (
          <View style={styles.orderCardHeader}>
            <Text style={styles.orderTitle}>
              {order.orderId}
              {' '}
              -
              {' '}
              {order.shipmentDetails.firstName}
              {' '}
              {order.shipmentDetails.surname}
            </Text>
            <View style={styles.orderCardLanguage}>
              {order.shipmentDetails.countryCode === 'NL' && (
                <Image style={styles.languageLogo} source={require('../assets/netherlands.png')} />
              )}
              {order.shipmentDetails.countryCode === 'BE' && (
                <Image style={styles.languageLogo} source={require('../assets/belgium.png')} />
              )}
              <Text>
                {' '}
                {order.shipmentDetails.countryCode}
              </Text>
            </View>
          </View>
        )}
      {order.orderItems && order.orderItems.map((orderDetail) => (
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
            <Text style={styles.boldText}>{orderDetail.quantity}</Text>
          </Text>
          <Text>
            Besteld op:
            {' '}
            <Moment style={styles.boldText} format="DD-MM-yyyy, HH:mm uur" element={Text}>
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
                      style={[
                        styles.boldText,
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
          <View style={styles.shipmentButtonContainer}>
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
                  key={orderDetail.orderId}
                  style={styles.printIcon}
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

const styles = StyleSheet.create({
  orderCard: {
    margin: 5,
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
  },
  orderCardDark: {
    backgroundColor: '#d6d6d6',
    color: 'white',
  },
  orderCardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  orderTitle: {
    fontWeight: 'bold',
    alignSelf: 'stretch',
    width: '90%',
  },
  orderCardLanguage: {
    flexDirection: 'row',
  },
  languageLogo: {
    width: 20,
    height: 20,
  },

  shipmentButtonContainer: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    alignSelf: 'stretch',
    width: 100,
  },
  printIcon: {
    alignSelf: 'flex-end',
  },
  toastStyle: {
    borderRadius: 5,
    padding: 10,
    color: 'white',
  },

  boldText: {
    fontWeight: 'bold',
  },
});

const mapDispatchToProps = (dispatch) => bindActionCreators(
  {
    shipOrderItem,
    getOrders,
  },
  dispatch,
);

export default connect(null, mapDispatchToProps)(Order);
