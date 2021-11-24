import React, { useState } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { View, Text, StyleSheet, Image, Button } from 'react-native';
import Moment from 'react-moment';
import { LoadingScreen } from '../screens/index';
import { shipOrderItem, getOrders } from '../store/order/actions';
import { getColorForDeliveryDate } from '../helpers/getColorForDeliveryDate';

const Order = ({ order, shipOrderItem, getOrders, toast }) => {
  const [loading, setLoading] = useState(false);

  const sendShipOrderItem = async (orderItem, language) => {
    setLoading(true);

    const toastResponse = await shipOrderItem(orderItem, language);

    toast &&
      toast.show(
        <Text style={[{ backgroundColor: toastResponse.color }, styles.toastStyle]}>{toastResponse.text}</Text>,
        2500
      );

    await getOrders(language);

    setTimeout(() => {
      setLoading(false);
    }, 400);
  };

  return (
    <View style={styles.orderCard} key={order.orderId}>
      <LoadingScreen show={loading} loadingMessage={'Sending order'} />
      <View style={styles.orderCardHeader}>
        <Text style={styles.orderTitle}>
          {order.orderId} - {order.shipmentDetails.firstName} {order.shipmentDetails.surname}
        </Text>
        <View style={styles.orderCardLanguage}>
          {order.shipmentDetails.countryCode === 'NL' && (
            <Image style={styles.languageLogo} source={require('../assets/netherlands.png')} />
          )}
          {order.shipmentDetails.countryCode === 'BE' && (
            <Image style={styles.languageLogo} source={require('../assets/belgium.png')} />
          )}
          <Text> {order.shipmentDetails.countryCode}</Text>
        </View>
      </View>
      {order.orderItems.map((orderItem) => (
        <View key={orderItem.orderId}>
          <Text key={orderItem.orderId}>
            {orderItem.product.title} - &euro;{orderItem.unitPrice}
          </Text>
          <Text key={orderItem.orderId}>
            Aantal besteld: <Text style={styles.boldText}>{orderItem.quantity}</Text>
          </Text>
          <Text key={orderItem.orderId}>
            Besteld op:{' '}
            <Moment key={orderItem.orderId} style={styles.boldText} format='DD-MM-yyyy, HH:mm uur' element={Text}>
              {order.orderPlacedDateTime}
            </Moment>
          </Text>
          <Text key={orderItem.orderId}>
            Uiterste leverdatum:{' '}
            <Moment
              key={orderItem.orderId}
              style={[
                styles.boldText,
                getColorForDeliveryDate(
                  orderItem.fulfilment.latestDeliveryDate || orderItem.fulfilment.exactDeliveryDate, new Date()
                ),
              ]}
              format='DD-MM-yyyy'
              element={Text}
            >
              {orderItem.fulfilment.latestDeliveryDate || orderItem.fulfilment.exactDeliveryDate}
            </Moment>
          </Text>
          <View key={orderItem.orderId} style={styles.shipmentButtonContainer}>
            <Button
              key={orderItem.orderId}
              onPress={() => sendShipOrderItem(orderItem, order.shipmentDetails.countryCode)}
              title='Verzend'
              disabled={loading || orderItem.quantity === orderItem.quantityShipped}
            />
          </View>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  orderCard: {
    margin: 5,
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
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
  toastStyle: {
    borderRadius: 5,
    padding: 10,
    color: 'white',
  },

  boldText: {
    fontWeight: 'bold',
  },
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      shipOrderItem,
      getOrders,
    },
    dispatch
  );

export default connect(null, mapDispatchToProps)(Order);
