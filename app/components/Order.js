import React from 'react';
import { TouchableOpacity, View, Text, StyleSheet, Image } from 'react-native';
import Moment from 'react-moment';
import moment from 'moment';

const Order = ({ order, index }) => {
  const currentDate = moment(new Date());

  const getCorrectColorForDeliveryDate = (date) => {
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

  return (
    <TouchableOpacity index={index} key={order.orderId}>
      <View style={styles.orderCard}>
        <View style={styles.orderCardHeader}>
          <Text style={styles.orderTitle}>
            {order.orderId} - {order.customerDetails.shipmentDetails.firstName}{' '}
            {order.customerDetails.shipmentDetails.surName}
          </Text>
          <View style={styles.orderCardLanguage}>
            {order.customerDetails.shipmentDetails.countryCode === 'NL' && (
              <Image style={styles.languageLogo} source={require('../assets/netherlands.png')} />
            )}
            {order.customerDetails.shipmentDetails.countryCode === 'BE' && (
              <Image style={styles.languageLogo} source={require('../assets/belgium.png')} />
            )}
            <Text> {order.customerDetails.shipmentDetails.countryCode}</Text>
          </View>
        </View>
        {order.orderItems.map((orderItem) => (
          <View key={orderItem.orderId}>
            <Text>
              {orderItem.title} - &euro;{orderItem.offerPrice}
            </Text>
            <Text>
              Aantal besteld: <Text style={styles.boldText}>{orderItem.quantity}</Text>
            </Text>
            <Text>
              Besteld op:{' '}
              <Moment style={styles.boldText} format='DD-MM-yyyy, HH:mm uur' element={Text}>
                {order.dateTimeOrderPlaced}
              </Moment>
            </Text>
            <Text>
              Uiterste leverdatum:{' '}
              <Moment
                style={[styles.boldText, getCorrectColorForDeliveryDate(orderItem.latestDeliveryDate)]}
                format='DD-MM-yyyy'
                element={Text}
              >
                {orderItem.latestDeliveryDate}
              </Moment>
            </Text>
          </View>
        ))}
      </View>
    </TouchableOpacity>
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

  boldText: {
    fontWeight: 'bold',
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
});

export default Order;
