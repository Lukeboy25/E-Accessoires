import React from 'react';
import { connect } from 'react-redux';
import { View, StyleSheet } from 'react-native';
import { Order, OrderTitle } from './index';
import LoadingSpinner from './LoadingSpinner';

export const IS_CLOSED_ORDER = true;

const ClosedOrders = ({
  isLoading,
  languageState, 
  switchLanguage, 
  closedOrders, 
  toast,
}) => {
  // if (isLoading) {
  //   return <LoadingSpinner show={isLoading} />;
  // }

  return (
    <View style={styles.container}>
      <OrderTitle switchLanguage={switchLanguage} languageState={languageState} title="Afgeronde bestellingen" />
      <View>
        {closedOrders?.map((order) => (
          <Order 
            key={order.orderId} 
            order={order} 
            toast={toast} 
            isClosedOrder={IS_CLOSED_ORDER} 
            languageState={languageState} 
          />
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
    closedOrders: order.closedOrders,
  };
};

export default connect(mapStateToProps, null)(ClosedOrders);
