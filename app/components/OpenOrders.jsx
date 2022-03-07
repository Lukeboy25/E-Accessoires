import React from 'react';
import { connect } from 'react-redux';
import { View, StyleSheet } from 'react-native';
import { Order, OrderTitle } from './index';
import SearchPicker from './SearchPicker';

function OpenOrders({
  languageState, switchLanguage, openOrders, orderAmount, toast, page, orderCategories,
}) {
  const getTitle = () => (orderAmount === 1
    ? `${orderAmount} openstaande bestelling`
    : `${orderAmount} openstaande bestellingen`);

  return (
    <View style={styles.container}>
      <OrderTitle switchLanguage={switchLanguage} languageState={languageState} title={getTitle()} />
      <SearchPicker orderCategories={orderCategories} />
      <View>
        {openOrders?.map((order) => (
          <Order key={order.orderId} order={order} toast={toast} page={page} />
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
    orderCategories: order.orderCategories,
  };
};

export default connect(mapStateToProps, null)(OpenOrders);
