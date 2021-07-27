import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { StyleSheet, StatusBar, ScrollView, Button, RefreshControl } from 'react-native';
import { logOutGoogle } from '../store/login/actions';
import { Header } from '../components';
import { LoadingScreen } from './index';

class SettingsScreen extends Component {
  state = { loading: false };

  setLoading(loading) {
    this.setState((state) => ({ ...state, loading }));
  }

  sendLogOutGoogle = async () => {
    this.setLoading(true);
    await this.props.logOutGoogle();
    this.setLoading(false);
  };

  render() {
    return (
      <ScrollView
        style={styles.background}
        refreshControl={<RefreshControl refreshing={this.state.loading} onRefresh={this.requestOrders} />}
      >
        <StatusBar barStyle={'light-content'} />
        <LoadingScreen show={this.state.loading} loadingMessage={'Fetching orders'} />
        <Header name={this.props.user.name} photoUrl={this.props.user.photoUrl} />
        {this.props.user.name !== undefined && (
          <Button
            style={styles.logOutButton}
            onPress={() => this.sendLogOutGoogle()}
            title='Uitloggen'
            accessibilityLabel='Uitloggen'
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
      logOutGoogle,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(SettingsScreen);
