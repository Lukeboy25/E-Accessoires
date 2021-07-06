import React from 'react';
import { connect } from 'react-redux';
import { TouchableOpacity, View, Text, StyleSheet, Image } from 'react-native';

const Order = ({ order, index }) => {
  return (
    <TouchableOpacity index={index} key={order.orderId}>
      <View style={styles.orderCard}>
        <View style={styles.orderCardHeader}>
          <Text style={styles.orderId}>{order.orderId}</Text>
          <View style={styles.orderCardLanguage}>
            {order.customerDetails.shipmentDetails.countryCode === 'NL' && (
              <Image style={styles.languageLogo} source={require('../components/icons/netherlands.png')} />
            )}
            {order.customerDetails.shipmentDetails.countryCode === 'BE' && (
              <Image style={styles.languageLogo} source={require('../components/icons/belgium.png')} />
            )}
            <Text> {order.customerDetails.shipmentDetails.countryCode}</Text>
          </View>
        </View>
        {order.orderItems.map((orderItem) => (
          <View>
            <Text>{orderItem.title}</Text>
            <Text>{orderItem.quantity}</Text>
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
  orderId: {
    fontWeight: 'bold',
  },
  orderCardLanguage: {
    flexDirection: 'row',
  },
  languageLogo: {
    width: 20,
    height: 20,
  },
});

export default connect(null, null)(Order);
