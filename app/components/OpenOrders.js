import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Order } from '.';
import { View, Text, StyleSheet, Button } from 'react-native';
import { getOrders } from '../store/order/actions';

const OpenOrders = ({ openOrders, getOrders }) => {
  const loadOrders = async () => {
    await getOrders();
  };

  return (
    <View style={styles.container}>
      <View>
        <Button
          style={styles.refreshButton}
          onPress={() => loadOrders()}
          title='Ververs'
          accessibilityLabel='Request latest orders'
        />
      </View>
      <Text style={styles.title}>E-accessoires</Text>
      <Text style={styles.orders}>
        {openOrders.length == 1
          ? `${openOrders.length} openstaande bestelling:`
          : `${openOrders.length} openstaande bestellingen:`}
      </Text>
      <View>
        {openOrders?.map((order, index) => (
          <Order key={index} order={order} />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 5,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 22,
    alignSelf: 'stretch',
    textAlign: 'center',
  },
  orders: {
    paddingTop: 10,
    fontSize: 16,
  },
});

const mapStateToProps = (state) => {
  const order = state.order;

  return {
    openOrders: order.openOrders,
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
