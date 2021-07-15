import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, Button } from 'react-native';
import Moment from 'react-moment';
import moment from 'moment';
import { LoadingScreen } from '../screens/index';

const Order = ({ order, shipOrderItems }) => {
  const [loading, setLoading] = useState(false);
  const currentDate = moment(new Date());

  const getColorForDeliveryDate = (date) => {
    if (date <= currentDate.format('yyyy-MM-DD')) {
      return styles.errorText;
    }

    if (date === currentDate.add(1, 'days').format('yyyy-MM-DD')) {
      return styles.dangerText;
    }

    if (date >= currentDate.format('yyyy-MM-DD')) {
      return styles.safeText;
    }

    return styles.errorText;
  };

  const sendShipOrderItems = async (orderItems, language) => {
    setLoading(true);

    await shipOrderItems(orderItems, language);

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
          <Text>
            {orderItem.product.title} - &euro;{orderItem.unitPrice}
          </Text>
          <Text>
            Aantal besteld: <Text style={styles.boldText}>{orderItem.quantity}</Text>
          </Text>
          <Text>
            Besteld op:{' '}
            <Moment style={styles.boldText} format='DD-MM-yyyy, HH:mm uur' element={Text}>
              {order.orderPlacedDateTime}
            </Moment>
          </Text>
          <Text>
            Uiterste leverdatum:{' '}
            <Moment
              style={[styles.boldText, getColorForDeliveryDate(orderItem.fulfilment.latestDeliveryDate)]}
              format='DD-MM-yyyy'
              element={Text}
            >
              {orderItem.fulfilment.latestDeliveryDate}
            </Moment>
          </Text>
        </View>
      ))}
      <View style={styles.shipmentButtonContainer}>
        <Button
          onPress={() => sendShipOrderItems(order.orderItems, order.shipmentDetails.countryCode)}
          title='Verzend'
          disabled={loading}
        ></Button>
      </View>
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

  safeText: {
    color: '#2ECC71',
  },
  dangerText: {
    color: '#F39C12',
  },
  errorText: {
    color: '#E74C3C',
  },

  shipmentButtonContainer: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    margin: 10,
    alignSelf: 'stretch',
    width: 100,
  },

  boldText: {
    fontWeight: 'bold',
  },
});

export default Order;
