import React, { useState } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Order } from '.';
import { View, Text, StyleSheet, Button } from 'react-native';
import { getOrders } from '../store/order/actions';
import { LoadingScreen } from '../screens';

const OpenOrders = ({ openOrders, getOrders }) => {
  const [loading, setLoading] = useState(false);

  const requestOrders = async () => {
    setLoading(true);
    try {
      await getOrders();
    } catch (e) {
      console.error(e);
    }
    setLoading(false);
  };

  return (
    <View style={styles.container}>
      <LoadingScreen show={loading} loadingMessage={'Fetching orders'} />
      <View>
        <Button
          style={styles.refreshButton}
          onPress={() => requestOrders()}
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
