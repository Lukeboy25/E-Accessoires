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
import { getClosedOrders } from '../store/order/orderActions';
import { Header, ClosedOrders } from '../components';
import { OrderViewModel } from '../entities/Order/Order';

interface ClosedOrdersScreenProps {
  isLoading: boolean;
  closedOrders: OrderViewModel[];
  toast: any;
}

const ClosedOrdersScreen: FC<ClosedOrdersScreenProps> = ({
  isLoading,
  closedOrders,
  toast,
}) => {
  const dispatch = useDispatch();

  const [languageState, setLanguageState] = useState<string>('NL');
  
  useEffect(() => {
    requestOrders();
  }, [languageState]);

  const requestOrders = async () => {
    try {
      if (languageState == 'NL') {
        dispatch(requestTokenNL());
      } else {
        dispatch(requestTokenBE());
      }

      dispatch(getClosedOrders(languageState));
    } catch (e) {
      console.error(e);
    }
  };

  const switchLanguage = () => languageState === 'NL' ? setLanguageState('BE') : setLanguageState('NL');

  return (
    <>
      <ScrollView
        style={styles.background}
        refreshControl={<RefreshControl refreshing={isLoading} onRefresh={requestOrders} />}
      >
        <StatusBar barStyle="light-content" />
        <Header />
        {closedOrders && (
          <ClosedOrders
            isLoading={isLoading}
            languageState={languageState}
            switchLanguage={switchLanguage}
            closedOrders={closedOrders}
            toast={toast}
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
  closedOrders: state.order.closedOrders,
  isLoading: state.order.isLoading,
});

export default connect(mapStateToProps, null)(ClosedOrdersScreen);
