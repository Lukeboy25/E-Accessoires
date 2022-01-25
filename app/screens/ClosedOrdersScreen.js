import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { StyleSheet, StatusBar, ScrollView, RefreshControl } from 'react-native';
import { requestTokenNL, requestTokenBE } from '../store/token/tokenActions';
import { checkForGoogleUser } from '../store/login/loginActions';
import { getClosedOrders } from '../store/order/orderActions';
import { GoogleAuthentication, Header, ClosedOrders, Pagination } from '../components';
import { LoadingScreen } from './index';
import Toast from 'react-native-easy-toast';

class ClosedOrdersScreen extends Component {
  state = { loading: false, languageState: 'NL', page: 1 };

  componentDidMount = async () => {
    this.setLoading(true);

    this.props.checkForGoogleUser();
    await this.requestOrders();
  };

  componentDidUpdate = async (prevProps, prevState) => {
    if (prevState.languageState !== this.state.languageState) {
      await this.requestOrders();
    }
  };

  setLoading(loading) {
    this.setState((state) => ({ ...state, loading }));
  }

  requestOrders = async () => {
    this.setLoading(true);
    try {
      if (this.state.languageState == 'NL') {
        await this.props.requestTokenNL();
      } else {
        await this.props.requestTokenBE();
      }

      await this.props.getClosedOrders(this.state.languageState, this.state.page);
    } catch (e) {
      console.error(e);
    }

    setTimeout(() => {
      this.setLoading(false);
    }, 350);
  };

  switchLanguage = async () => {
    if (this.state.languageState === 'NL') {
      this.setState({ languageState: 'BE' });
    } else {
      this.setState({ languageState: 'NL' });
    }
  };

  render() {
    if (!this.props.user.name) {
      return <GoogleAuthentication />;
    }

    if (this.props.user.email !== 'luke25spaans@gmail.com' && this.props.user.email !== '31nmolenaar@gmail.com') {
      return <GoogleAuthentication />;
    }

    return (
      <>
        <ScrollView
          style={styles.background}
          refreshControl={<RefreshControl refreshing={this.state.loading} onRefresh={this.requestOrders} />}
        >
          <StatusBar barStyle={'light-content'} />
          <LoadingScreen show={this.state.loading} loadingMessage={'Fetching closed orders'} />
          <Header />
          {this.props.closedOrders && (
            <ClosedOrders
              languageState={this.state.languageState}
              switchLanguage={this.switchLanguage}
              closedOrders={this.props.closedOrders}
              toast={this.toast}
            />
          )}
        </ScrollView>
        <Toast
          ref={(toast) => (this.toast = toast)}
          style={styles.defaultToast}
          position='top'
          positionValue={0}
          fadeInDuration={800}
          fadeOutDuration={1400}
          textStyle={{ color: 'white' }}
        />
      </>
    );
  }
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

const mapStateToProps = (state) => {
  return {
    token: state.token.token,
    tokenBE: state.token.tokenBE,
    closedOrders: state.order.closedOrders,
    user: state.login.user,
  };
};

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      requestTokenNL,
      requestTokenBE,
      getClosedOrders,
      checkForGoogleUser,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(ClosedOrdersScreen);
