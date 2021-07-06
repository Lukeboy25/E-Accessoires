import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Order } from '../components/index';
import { View, Text, StyleSheet, Button } from 'react-native';
import { getOrders } from '../store/order/actions';

const OpenOrders = ({ detailedOpenOrders, getOrders }) => {
  const loadOrders = async () => {
    getOrders();
  };

  return (
    <View style={styles.container}>
      <Button onPress={() => loadOrders()} title='Refresh' accessibilityLabel='Request latest orders' />
      <Text style={styles.title}>E-accessoires</Text>
      <Text style={styles.orders}>
        {detailedOpenOrders.length == 1
          ? `${detailedOpenOrders.length} openstaande bestelling:`
          : `${detailedOpenOrders.length} openstaande bestellingen:`}
      </Text>
      <View>
        {detailedOpenOrders?.map((order, index) => (
          <Order order={order} index={index} />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 22,
  },
  orders: {
    paddingTop: 10,
    fontSize: 16,
  },
});

const mapStateToProps = (state) => {
  const order = state.order;

  return {
    detailedOpenOrders: order.detailedOpenOrders,
  };
};

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getOrders,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(OpenOrders);
