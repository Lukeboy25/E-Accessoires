import { FC } from 'react';
import { View, StyleSheet } from 'react-native';
import { Order, OrderTitle } from './index';
import SearchableValueInput from '../compositions/SearchableValueInput/SearchableValueInput';
import { SearchableOption } from '../compositions/types/index';
import LoadingSpinner from './LoadingSpinner';
import { OrderViewModel } from '../entities/Order/Order';

interface OpenOrdersProps {
  isLoading: boolean;
  selectedOrderCategory?: SearchableOption;
  languageState: string;
  openOrders: OrderViewModel[];
  orderCategories: SearchableOption[];
  orderAmount: number;
  toast: any;
  page: number;
  onSelectedOrderCategory: (selectedOrderCategory?: SearchableOption) => void;
  switchLanguage: () => void;
}

const OpenOrders: FC<OpenOrdersProps> = ({
  isLoading,
  selectedOrderCategory,
  languageState,
  openOrders, 
  orderCategories,
  orderAmount, 
  toast,
  page, 
  onSelectedOrderCategory,
  switchLanguage, 
}) => {
  const handleChangeOrderCategory = (orderCategoryValue: SearchableOption) => {
    const selectedOrder = orderCategoryValue.id !== null
      ? orderCategories.find((option: SearchableOption) => option.id === orderCategoryValue.id)
      : undefined;

      selectedOrder && onSelectedOrderCategory(selectedOrder);
  };

  const getTitle = () => (orderAmount === 1 ? `${orderAmount} openstaande bestelling` : `${orderAmount} openstaande bestellingen`);

  const onDeleteIconPress = () => {
      onSelectedOrderCategory(undefined);
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

export default OpenOrders;
