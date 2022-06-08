import React from 'react';
import { connect } from 'react-redux';
import { View, StyleSheet } from 'react-native';
import { Order, OrderTitle } from './index';
import SearchableValueInput from '../compositions/SearchableValueInput/SearchableValueInput';
import { SearchableOption } from '../compositions/types/index';
import LoadingSpinner from './LoadingSpinner';

function OpenOrders({
  isLoading,
  fetchOrders, 
  selectedOrderCategory,
  onSelectedOrderCategory,
  languageState,
  switchLanguage, 
  openOrders, 
  orderAmount, 
  toast,
  page, 
  orderCategories,
}) {
  const handleChangeOrderCategory = (orderCategoryValue: SearchableOption) => {
    onSelectedOrderCategory(orderCategoryValue);

    const selectedOrder = orderCategoryValue.id !== null
      ? orderCategories.find((option: SearchableOption) => option.id === orderCategoryValue.id)
      : undefined;

    if (selectedOrder) {
      fetchOrders(selectedOrder);
    }
  };

  const getTitle = () => (orderAmount === 1 ? `${orderAmount} openstaande bestelling` : `${orderAmount} openstaande bestellingen`);

  const onDeleteIconPress = () => {
      onSelectedOrderCategory(undefined);
      fetchOrders();
  }

  // if (isLoading) {
  //   return <LoadingSpinner show={isLoading} />;
  // }

  return (
    <View style={styles.container}>
      <OrderTitle switchLanguage={switchLanguage} languageState={languageState} title={getTitle()} />
      <SearchableValueInput
        isSearchable
        label="Zoek op categorie"
        value={selectedOrderCategory && selectedOrderCategory.label}
        options={orderCategories}
        onChange={handleChangeOrderCategory} 
        onDeleteIconPress={onDeleteIconPress}      
      />
      {openOrders?.map((order) => (
        <Order
          key={order.orderId}
          order={order}
          toast={toast}
          page={page}
          isClosedOrder={false} 
          selectedOrderCategory={selectedOrderCategory}
          languageState={languageState}
          getOrders={fetchOrders}          
          />
      ))}
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
