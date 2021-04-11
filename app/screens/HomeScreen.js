import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { StyleSheet, View, StatusBar, Text, Button } from 'react-native';
import { requestToken } from '../store/token/actions';

class HomeScreen extends Component {
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
      </View>
    );
  }
}

const styles = StyleSheet.create({
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
  return {
    token: state.token.token,
  };
};

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      requestToken,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
