import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { StyleSheet, View, StatusBar, Text, Image, ScrollView, Button, RefreshControl } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { requestToken } from '../store/token/actions';
import { getOrders } from '../store/order/actions';
import { LogoIcon } from '../components/icons/index';
import { GoogleAuthentication, BackgroundFetcher, OpenOrders } from '../components';
import { LoadingScreen } from './index';

class HomeScreen extends Component {
  state = { name: '', photoUrl: '', openOrders: 0, loading: false };

  componentDidMount = async () => {
    await this.getGoogleData();
    await this.props.requestToken();
    await this.requestOrders();
  };

  componentDidUpdate = async (state) => {
    if (!this.state.name || this.state.name === null) {
      await this.getGoogleData();
    }

    if (state.openOrders.length != this.state.openOrders) {
      await this.setState({ openOrders: state.openOrders.length });
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
      await this.props.getOrders();
    } catch (e) {
      console.error(e);
    }
    this.setLoading(false);
  };

  logOut = async () => {
    await AsyncStorage.setItem('googleName', '');
    await AsyncStorage.setItem('googlePhotoUrl', '');
    this.setState({ name: '', photoUrl: '' });
  };

  render() {
    if (!this.props.token) {
      this.props.requestToken();
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
        <View style={styles.header}>
          <View style={styles.headerLeftSection}>
            <LogoIcon />
            <Text style={styles.headerUserName}>{this.state.name}</Text>
          </View>
          <Image style={styles.headerImage} source={{ uri: this.state.photoUrl }} />
        </View>
        {this.props.openOrders && <OpenOrders openOrders={this.props.openOrders} />}

        {this.props.openOrders.length > 0 && <BackgroundFetcher openOrdersAmount={this.props.openOrders.length} />}
        {/* {this.state.willTriggerNotification && <NotificationSender />} */}
        <Button
          style={styles.logOutButton}
          onPress={() => this.logOut()}
          title='Log out'
          accessibilityLabel='Log out'
        />
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 80,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#D0D0D0',
  },
  headerLeftSection: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 15,
  },
  headerUserName: {
    marginLeft: 10,
    fontWeight: 'bold',
    width: 200,
  },
  headerImage: {
    margin: 15,
    width: 50,
    height: 50,
    borderRadius: 25,
  },

  logOutButton: {},
});

const mapStateToProps = (state) => {
  const order = state.order;

  return {
    token: state.token.token,
    openOrders: order.openOrders,
  };
};

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      requestToken,
      getOrders,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
