import React, { useState } from 'react';
import { connect } from 'react-redux';
import { View, StyleSheet } from 'react-native';
import { Order, OrderTitle } from './index';
import SearchableValueInput from '../compositions/SearchableValueInput/SearchableValueInput';
import { SearchableOption } from '../compositions/types/index';
import { transformOrderCategoriesToSearchableValue } from './transformOrderCategoryToSearchableValue';

function OpenOrders({ languageState, switchLanguage, openOrders, orderAmount, toast, page, orderCategories }) {
  const [orderCategory, setOrderCategory] = useState('');

  const handleChangeOrderCategory = (orderCategoryValue: SearchableOption) => {
    setOrderCategory(orderCategoryValue.label);

    const selectedOccupation = orderCategoryValue.id
      ? orderCategories.find((option) => option.id === orderCategoryValue.id)
      : undefined;

    if (selectedOccupation) {
      // Fetch order categories
      // onSelectOccupation(selectedOccupation);
    }
  };

  const getTitle = () =>
    orderAmount === 1 ? `${orderAmount} openstaande bestelling` : `${orderAmount} openstaande bestellingen`;

  return (
    <View style={styles.container}>
      <OrderTitle switchLanguage={switchLanguage} languageState={languageState} title={getTitle()} />
      <SearchableValueInput
        isSearchable
        label='Zoek op categorie'
        value={orderCategory}
        options={
          orderCategories &&
          orderCategories.map((value, index) => transformOrderCategoriesToSearchableValue(value, index))
        }
        onChange={handleChangeOrderCategory}
      />
      <View style={styles.orders}>
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
