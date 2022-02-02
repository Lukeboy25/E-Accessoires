import React from 'react';
import { connect } from 'react-redux';
import { View, StyleSheet } from 'react-native';
import { Order, OrderTitle } from './index';

function OpenOrders({
  languageState, switchLanguage, openOrders, orderAmount, toast, page,
}) {
  const getTitle = () => (orderAmount === 1
    ? `${orderAmount} openstaande bestelling`
    : `${orderAmount} openstaande bestellingen`);

  return (
    <View style={styles.container}>
      <OrderTitle switchLanguage={switchLanguage} languageState={languageState} title={getTitle()} />
      <View>
        {openOrders?.map((order) => (
          <Order key={order.orderId} order={order} toast={toast} languageState={languageState} page={page} />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 5,
  },
});

const mapStateToProps = (state) => {
  const { order } = state;

  return {
    openOrders: order.openOrders,
  };
};

export default connect(mapStateToProps, null)(OpenOrders);
