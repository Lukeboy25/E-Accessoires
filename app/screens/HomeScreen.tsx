import { FC, useEffect, useState } from 'react';
import { connect, useDispatch } from 'react-redux';
import {
  StyleSheet, 
  StatusBar,
  ScrollView,
  RefreshControl,
} from 'react-native';
import Toast from 'react-native-easy-toast';
import { requestTokenNL, requestTokenBE } from '../store/token/tokenActions';
import { getOrders } from '../store/order/orderActions';
import { OrderViewModel } from '../entities/Order/Order';
import { 
  OpenOrders,
  Header,
  Pagination,
  LoadingSpinner,
  NoNetworkNote,
} from '../components';
import { SearchableOption } from '../compositions/types';

interface HomeScreenProps {
  hasConnection: boolean;
  isLoading: boolean;
  openOrders: OrderViewModel[];
  orderCategories: SearchableOption[];
  orderAmount: number;
  orderPages: number;
  toast: any;
}

const HomeScreen: FC<HomeScreenProps> = ({
  hasConnection,
  isLoading,
  openOrders,
  orderCategories,
  orderAmount,
  toast,
  orderPages,
}) => {
  const dispatch = useDispatch();

  const [languageState, setLanguageState] = useState<string>('NL');
  const [page, setPage] = useState<number>(1);
  const [orderCategory, setOrderCategory] = useState<SearchableOption | undefined>(undefined);

  useEffect(() => {
    requestOrders();
  }, [languageState]);

  const requestOrders = async () => {
    if (languageState == 'NL') {
      dispatch(requestTokenNL());
    } else {
      dispatch(requestTokenBE());
    }

    dispatch(getOrders(languageState, page, orderCategory?.label));
  };

  const switchLanguage = () => {
    setPage(1);
    setOrderCategory(undefined);

    languageState === 'NL' ? setLanguageState('BE') : setLanguageState('NL');
  };

  const handleSetPage = (page: number) => {
    setPage(page);
    requestOrders();
  };

  const onSelectedOrderCategory = (selectedOrderCategory?: SearchableOption) => {
    setOrderCategory(selectedOrderCategory);
    dispatch(getOrders(languageState, page, selectedOrderCategory?.label));
  };


  if (!hasConnection) {
    return (
      <>
        <StatusBar barStyle="light-content" />
        <Header />
        <NoNetworkNote />
      </>
    );
  }

  return (
    <>
      <ScrollView
        style={styles.background}
        contentContainerStyle={{ flexGrow: 1 }}
        refreshControl={<RefreshControl refreshing={isLoading} onRefresh={requestOrders} />}
      >
        <LoadingSpinner show={isLoading} />
        <StatusBar barStyle="light-content" />
        <Header />
        {openOrders && (
          <OpenOrders
            isLoading={isLoading}
            orderCategories={orderCategories}
            switchLanguage={switchLanguage}
            openOrders={openOrders}
            orderAmount={orderAmount}
            toast={toast}
            languageState={languageState}
            page={page}
            selectedOrderCategory={orderCategory}
            onSelectedOrderCategory={onSelectedOrderCategory}
          />
        )}
        {!orderCategory && orderPages > 1
        && (
        <Pagination
          currentPage={page}
          totalPages={orderPages}
          onPageChange={page => handleSetPage(page)}
        />
        )}
      </ScrollView>
      <Toast
        ref={(toast) => (toast = toast)}
        style={styles.defaultToast}
        position="top"
        positionValue={0}
        fadeInDuration={800}
        fadeOutDuration={1400}
        textStyle={{ color: 'white' }}
      />
    </>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  defaultToast: {
    backgroundColor: 'rgba(0, 0, 0, 0)',
    margin: 8,
    alignSelf: 'flex-end',
  },
});

const mapStateToProps = (state: any) => ({
  token: state.token.token,
  tokenBE: state.token.tokenBE,
  openOrders: state.order.openOrders,
  orderAmount: state.order.orderAmount,
  orderPages: state.order.orderPages,
  orderCategories: state.order.orderCategories,
  isLoading: state.order.isLoading,
  hasConnection: state.network.hasConnection,
});

export default connect(mapStateToProps, null)(HomeScreen);
