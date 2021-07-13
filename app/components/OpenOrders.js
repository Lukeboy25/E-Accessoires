import React from 'react';
import { connect } from 'react-redux';
import { Order } from './index';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';

const OpenOrders = ({ languageState, switchLanguage, openOrders }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>E-accessoires</Text>
      <Text style={styles.orders}>
        {openOrders.length == 1
          ? `${openOrders.length} openstaande bestelling:`
          : `${openOrders.length} openstaande bestellingen:`}
      </Text>
      <TouchableOpacity onPress={switchLanguage} style={styles.languageContainer}>
        {languageState === 'NL' ? (
          <Image style={styles.languageLogo} source={require('../assets/netherlands.png')} />
        ) : (
          <Image style={styles.languageLogo} source={require('../assets/belgium.png')} />
        )}
      </TouchableOpacity>
      <View>
        {openOrders?.map((order, index) => (
          <Order key={index} order={order} />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 5,
  },
  title: {
    marginTop: 10,
    fontWeight: 'bold',
    fontSize: 22,
    alignSelf: 'stretch',
    textAlign: 'center',
  },
  orders: {
    paddingTop: 10,
    fontSize: 16,
  },
  languageContainer: {
    position: 'absolute',
    top: 0,
    right: 0,
    alignSelf: 'flex-end',
    margin: 15,
  },
  languageLogo: {
    width: 50,
    height: 50,
  },
});

const mapStateToProps = (state) => {
  const order = state.order;

  return {
    openOrders: order.openOrders,
  };
};

export default connect(mapStateToProps, null)(OpenOrders);
