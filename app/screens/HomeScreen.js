import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { StyleSheet, View, StatusBar, Text, Button } from 'react-native';
import { requestToken } from '../store/token/actions';
import { getOrders } from '../store/order/actions';
import NotificationSender from './NotifcationSender';
import AsyncStorage from '@react-native-community/async-storage';

class HomeScreen extends Component {
  state = { willTriggerNotification: null };

  async componentDidMount() {
    await this.props.requestToken();
    await this.props.getOrders();
    const willTriggerNotification = await this.checkForNewNotification();

    this.setState({ willTriggerNotification });
  }

  async checkForNewNotification() {
    const currentOpenOrders = await AsyncStorage.getItem('currentOpenOrders');

    if (!this.props.openOrders || this.props.openOrders.length === 0) {
      return false;
    }

    if (this.props.openOrders.length === parseInt(currentOpenOrders)) {
      return false;
    }

    AsyncStorage.setItem('currentOpenOrders', this.props.openOrders.length.toString());
    this.setState({
      willTriggerNotification: false,
    });

    return true;
  }

  render(props) {
    if (!this.props.token) {
      this.props.requestToken();
    }

    return (
      <View style={styles.background}>
        <StatusBar barStyle={'light-content'} />
        <View>
          <Text>Welcome to E-accessoires</Text>
        </View>
        <Text>Openstaande bestellingen: {this.props.openOrders.length}</Text>
        <Text style={styles.orders}>Bestelnummers:</Text>
        {this.props.openOrders.map((order, index) => (
          <View index={index} key={order.orderId}>
            <Text>{order.orderId}</Text>
          </View>
        ))}
        {this.state.willTriggerNotification && <NotificationSender />}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  orders: {
    paddingTop: 20,
    fontWeight: 'bold',
  },
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
