import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { StyleSheet, View, StatusBar, Text, Image, ScrollView, Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { requestToken } from '../store/token/actions';
import { getOrders } from '../store/order/actions';
import { LogoIcon } from '../components/icons/index';

import BackgroundFetchScreen from './BackgroundFetchScreen';

import { GoogleAuthentication, NotificationSender, OpenOrders } from '.';

class HomeScreen extends Component {
  state = { name: '', photoUrl: '' };

  componentDidMount = async () => {
    await this.getGoogleData();
    await this.props.requestToken();
    await this.props.getOrders();
  };

  componentDidUpdate = async (state) => {
    if (state.name !== this.state.name) {
      await this.getGoogleData();
    }
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

  logOut = async () => {
    await AsyncStorage.setItem('googleName', '');
    await AsyncStorage.setItem('googlePhotoUrl', '');
    this.setState({ name: '', photoUrl: '' });
  };

  render(props) {
    if (!this.props.token) {
      this.props.requestToken();
    }

    return this.state.name === '' || this.state.name === null ? (
      <GoogleAuthentication />
    ) : (
      <ScrollView style={styles.background}>
        <StatusBar barStyle={'light-content'} />
        <View style={styles.header}>
          <View style={styles.headerLeftSection}>
            <LogoIcon />
            <Text style={styles.headerUserName}>{this.state.name}</Text>
          </View>
          <Image style={styles.headerImage} source={{ uri: this.state.photoUrl }} />
        </View>
        {this.props.detailedOpenOrders && <OpenOrders detailedOpenOrders={this.props.detailedOpenOrders} />}

        {/* <BackgroundFetchScreen openOrders={this.props.openOrders.length} /> */}

        {this.state.willTriggerNotification && <NotificationSender />}
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
    detailedOpenOrders: order.detailedOpenOrders,
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
