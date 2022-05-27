import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
  StyleSheet, 
  StatusBar, 
  ScrollView, 
  Button,
} from 'react-native';
import { logOutGoogle } from '../store/login/loginActions';
import { Header } from '../components';

class SettingsScreen extends Component {

  sendLogOutGoogle = async () => {
    await this.props.logOutGoogle();
  };

  render() {
    return (
      <ScrollView
        style={styles.background}
      >
        <StatusBar barStyle="light-content" />
        <Header />
        {this.props.user.name !== undefined && (
          <Button
            style={styles.logOutButton}
            onPress={() => this.sendLogOutGoogle()}
            title="Uitloggen"
            accessibilityLabel="Uitloggen"
          />
        )}
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
});

const mapStateToProps = (state) => ({
  token: state.token.token,
  tokenBE: state.token.tokenBE,
  openOrders: state.order.openOrders,
  user: state.login.user,
});

const mapDispatchToProps = (dispatch) => bindActionCreators(
  {
    logOutGoogle,
  },
  dispatch,
);

export default connect(mapStateToProps, mapDispatchToProps)(SettingsScreen);
