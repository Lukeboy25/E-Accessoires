import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';

function OrderTitle({ switchLanguage, languageState, title }) {
  return (
    <View style={styles.orderTitle}>
      <Text style={styles.title}>E-accessoires</Text>
      <Text style={styles.orders}>
        {title}
      </Text>
      <TouchableOpacity onPress={switchLanguage} style={styles.languageContainer}>
        <Image style={styles.languageLogo} source={languageState === 'NL' ? require('../assets/netherlands.png') : require('../assets/belgium.png')} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  orderTitle: {
    display: 'flex',
  },
  title: {
    marginTop: 10,
    fontWeight: 'bold',
    fontSize: 22,
    alignSelf: 'stretch',
    textAlign: 'center',
  },
  orders: {
    alignSelf: 'center',
    paddingTop: 10,
    fontSize: 16,
  },
  languageContainer: {
    position: 'absolute',
    top: 0,
    right: 0,
    margin: 8,
  },
  languageLogo: {
    width: 50,
    height: 50,
  },
});

export default OrderTitle;
