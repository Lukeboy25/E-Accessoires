import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { StyleSheet, StatusBar, ScrollView, Button, RefreshControl } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { requestTokenNL, requestTokenBE } from '../store/token/actions';
import { getOrders } from '../store/order/actions';
import { GoogleAuthentication, BackgroundFetcher, OpenOrders, Header } from '../components';
import { LoadingScreen } from './index';

class HomeScreen extends Component {
  state = { name: '', photoUrl: '', openOrders: 0, loading: false, languageState: 'NL' };

  componentDidMount = async () => {
    await this.getGoogleData();
    await this.props.requestTokenNL();
    await this.props.requestTokenBE();
    await this.requestOrders();
  };

  componentDidUpdate = async (prevProps, prevState) => {
    if (!this.state.name || this.state.name === null) {
      await this.getGoogleData();
    }

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

  getGoogleData = async () => {
    try {
      const googleName = await AsyncStorage.getItem('googleName');
      const googlePhotoUrl = await AsyncStorage.getItem('googlePhotoUrl');
      this.setState({ name: googleName, photoUrl: googlePhotoUrl });
    } catch (e) {
      console.error(e);
    }
  };

  requestOrders = async () => {
    this.setLoading(true);
    try {
      await this.props.getOrders(this.state.languageState);
    } catch (e) {
      console.error(e);
    }

    setTimeout(() => {
      this.setLoading(false);
    }, 400);
  };

  switchLanguage = async () => {
    if (this.state.languageState === 'NL') {
      this.setState({ languageState: 'BE' });
    } else {
      this.setState({ languageState: 'NL' });
    }
  };

  logOut = async () => {
    await AsyncStorage.setItem('googleName', '');
    await AsyncStorage.setItem('googlePhotoUrl', '');
    this.setState({ name: '', photoUrl: '' });
  };

  render() {
    if (!this.props.token) {
      this.props.requestTokenNL();
    }

    if (!this.props.tokenBE) {
      this.props.requestTokenBE();
    }

    return this.state.name === '' || this.state.name === null ? (
      <GoogleAuthentication />
    ) : (
      <ScrollView
        style={styles.background}
        refreshControl={<RefreshControl refreshing={this.state.loading} onRefresh={this.requestOrders} />}
      >
        <StatusBar barStyle={'light-content'} />
        <LoadingScreen show={this.state.loading} loadingMessage={'Fetching orders'} />
        <Header name={this.state.name} photoUrl={this.state.photoUrl} />
        {this.props.openOrders && (
          <OpenOrders
            languageState={this.state.languageState}
            switchLanguage={this.switchLanguage}
            openOrders={this.props.openOrders}
          />
        )}

        {this.props.openOrders.length > 0 && <BackgroundFetcher openOrdersAmount={this.props.openOrders.length} />}
        {/* {this.state.willTriggerNotification && <NotificationSender />} */}
        <Button
          style={styles.logOutButton}
          onPress={() => this.logOut()}
          title='Uitloggen'
          accessibilityLabel='Uitloggen'
        />
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  logOutButton: {},
});

const mapStateToProps = (state) => {
  const order = state.order;

  return {
    token: state.token.token,
    tokenBE: state.token.tokenBE,
    openOrders: order.openOrders,
  };
};

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      requestTokenNL,
      requestTokenBE,
      getOrders,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
