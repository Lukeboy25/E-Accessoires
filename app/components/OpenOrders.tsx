import React, { useState } from 'react';
import { connect } from 'react-redux';
import { View, StyleSheet } from 'react-native';
import { Order, OrderTitle } from './index';
import SearchableValueInput from '../compositions/SearchableValueInput/SearchableValueInput';
import { SearchableOption } from '../compositions/types/index';

function OpenOrders({
  fetchOrders, search, languageState, switchLanguage, openOrders, orderAmount, toast, page, orderCategories,
}) {
  const [orderCategory, setOrderCategory] = useState('');

  const handleChangeOrderCategory = (orderCategoryValue: SearchableOption) => {
    setOrderCategory(orderCategoryValue.label);

    const selectedOrder = orderCategoryValue.id !== null
      ? orderCategories.find((option: SearchableOption) => option.id === orderCategoryValue.id)
      : undefined;

    if (selectedOrder) {
      fetchOrders(selectedOrder);
    }
  };

  const getTitle = () => (orderAmount === 1 ? `${orderAmount} openstaande bestelling` : `${orderAmount} openstaande bestellingen`);

  return (
    <View style={styles.container}>
      <OrderTitle switchLanguage={switchLanguage} languageState={languageState} title={getTitle()} />
      <SearchableValueInput
        isSearchable
        label="Zoek op categorie"
        value={orderCategory}
        options={orderCategories}
        onChange={handleChangeOrderCategory}
      />
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
    flex: 1,
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