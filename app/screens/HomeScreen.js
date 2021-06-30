import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { StyleSheet, View, StatusBar, Text, Button, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { requestToken } from '../store/token/actions';
import { getOrders } from '../store/order/actions';
import BackgroundFetchScreen from './BackgroundFetchScreen';

import { GoogleAuthentication, NotificationSender } from '.';

class HomeScreen extends Component {
  state = { orders: [], name: '', photoUrl: '' };

  componentDidMount = async () => {
    await this.getGoogleData();
    await this.props.requestToken();
    await this.props.getOrders();
  };

  getGoogleData = async () => {
    try {
      const googleName = await AsyncStorage.getItem('googleName');
      const googlePhotoUrl = await AsyncStorage.getItem('googlePhotoUrl');
      this.setState({ name: googleName, photoUrl: googlePhotoUrl });
    } catch (e) {
      console.error(e);
    }
  };

  render(props) {
    if (!this.props.token) {
      this.props.requestToken();
    }

    return this.state.name === '' || this.state.name === null ? (
      <GoogleAuthentication />
    ) : (
      <View style={styles.background}>
        <StatusBar barStyle={'light-content'} />
        <View style={styles.googleHeader}>
          <Text style={styles.headerText}>Welcome: {this.state.name}</Text>
          <Image style={styles.headerImage} source={{ uri: this.state.photoUrl }} />
        </View>
        <View style={styles.container}>
          <Text>Welcome to E-accessoires</Text>
          <Text>Openstaande bestellingen: {this.props.openOrders.length}</Text>
          <Text style={styles.orders}>Bestelnummers:</Text>
          {this.props.openOrders.map((order, index) => (
            <View index={index} key={order.orderId}>
              <Text>{order.orderId}</Text>
            </View>
          ))}
        </View>

        {/* <BackgroundFetchScreen openOrders={this.props.openOrders.length} /> */}

        {this.state.willTriggerNotification && <NotificationSender />}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  googleHeader: {
    height: 100,
    backgroundColor: '#fff',
  },
  headerText: {},
  headerImage: {
    justifyContent: 'flex-end',
    margin: 15,
    width: 50,
    height: 50,
    borderColor: 'rgba(0,0,0,0.2)',
    borderWidth: 2,
    borderRadius: 25,
  },

  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  orders: {
    paddingTop: 20,
    fontWeight: 'bold',
  },

  button: {
    width: 250,
    margin: 8,
  },
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
