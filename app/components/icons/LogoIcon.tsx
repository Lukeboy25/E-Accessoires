import React from 'react';
import { StyleSheet, Image } from 'react-native';

function LogoIcon() {
  return <Image style={styles.headerLogo} resizeMode="contain" source={require('../../assets/logo-new-middle.png')} />;
}

const styles = StyleSheet.create({
  headerLogo: {
    height: 50,
    width: 50,
  },
});
export default LogoIcon;
