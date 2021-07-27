import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { StyleSheet, StatusBar, ScrollView, RefreshControl } from 'react-native';
import { requestTokenNL, requestTokenBE } from '../store/token/actions';
import { checkForGoogleUser } from '../store/login/actions';
import { getOrders } from '../store/order/actions';
import { GoogleAuthentication, OpenOrders, Header, BackgroundFetcher } from '../components';
import { LoadingScreen } from './index';
import Toast from 'react-native-easy-toast';

class HomeScreen extends Component {
  state = { openOrders: 0, loading: false, languageState: 'NL' };

  componentDidMount = async () => {
    await this.props.checkForGoogleUser();
    await this.requestOrders();
  };

  componentDidUpdate = async (prevProps, prevState) => {
    if (prevProps.openOrders.length != this.state.openOrders) {
      await this.setState({ openOrders: prevProps.openOrders.length });
      await this.requestOrders();
    }

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
      await this.props.getOrders(this.state.languageState);
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
    return !this.props.user.name ? (
      <GoogleAuthentication />
    ) : (
      <>
        <ScrollView
          style={styles.background}
          refreshControl={<RefreshControl refreshing={this.state.loading} onRefresh={this.requestOrders} />}
        >
          <StatusBar barStyle={'light-content'} />
          <LoadingScreen show={this.state.loading} loadingMessage={'Fetching orders'} />
          <Header name={this.props.user.name} photoUrl={this.props.user.photoUrl} />
          {this.props.openOrders && (
            <OpenOrders
              languageState={this.state.languageState}
              switchLanguage={this.switchLanguage}
              openOrders={this.props.openOrders}
              toast={this.toast}
            />
          )}
          <BackgroundFetcher openOrdersAmount={this.props.openOrders.length} />
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
    openOrders: state.order.openOrders,
    user: state.login.user,
  };
};

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      // requestTokenNL,
      // requestTokenBE,
      getOrders,
      checkForGoogleUser,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
