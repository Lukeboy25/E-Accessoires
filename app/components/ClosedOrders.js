import React from 'react';
import { connect } from 'react-redux';
import { Order } from './index';
import { View, Text, StyleSheet } from 'react-native';
import { OrderTitle } from '../components';

export const IS_CLOSED_ORDER = true;

const ClosedOrders = ({ languageState, switchLanguage, closedOrders, toast }) => {
  return (
    <View style={styles.container}>
      <OrderTitle switchLanguage={switchLanguage} languageState={languageState} title={"Afgeronde bestellingen"} />
      <View>
        {closedOrders?.map((order) => (
          <Order key={order.orderId} order={order} toast={toast} isClosedOrder={IS_CLOSED_ORDER} />
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
    closedOrders: order.closedOrders,
  };
};

export default connect(mapStateToProps, null)(ClosedOrders);
