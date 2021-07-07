import React from 'react';
import { StyleSheet, Image } from 'react-native';

const LogoIcon = (props) => {
  return <Image style={styles.headerLogo} resizeMode={'contain'} source={require('../../assets/logo-small.png')} />;
};

const styles = StyleSheet.create({
  headerLogo: {
    height: 45,
    width: 45,
  },
});
export default LogoIcon;
