import React from 'react';
import { connect } from 'react-redux';
import { Order } from './index';
import { View, StyleSheet } from 'react-native';
import { OrderTitle } from '../components';

const OpenOrders = ({ languageState, switchLanguage, openOrders, orderAmount, toast }) => {

  const getTitle = () => {
    return orderAmount == 1
      ? `${orderAmount} openstaande bestelling`
      : `${orderAmount} openstaande bestellingen`;
  }

  return (
    <View style={styles.container}>
      <OrderTitle switchLanguage={switchLanguage} languageState={languageState} title={getTitle()} />
      <View>
        {openOrders?.map((order) => (
          <Order key={order.orderId} order={order} toast={toast} />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 5,
  },
});

const mapStateToProps = (state) => {
  const order = state.order;

  return {
    openOrders: order.openOrders,
  };
};

export default connect(mapStateToProps, null)(OpenOrders);
