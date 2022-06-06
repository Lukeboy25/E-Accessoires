import React from 'react';
import { View, Text } from 'react-native';
import { LoadingSpinner } from '../../components';
import { LogoIcon } from '../../components/icons';

// @ts-ignore
import styles from './NoNetworkScreen.scss';

const NoNetworkScreen = () => {
  return (
    <View style={styles['no-network']}>
      <LoadingSpinner 
        dimLights={0.0} 
        backgroundColor={'#ffffff'}
        color={'#000000'} 
        withTimeOut={false} 
        show 
      />
      <LogoIcon style={styles['no-network__logo']} />
      <View style={styles['no-network__container']}>      
        <Text style={styles['no-network__title']}>Oops</Text>
        <Text style={styles['no-network__text']}>Geen actieve internetverbinding</Text>
      </View>
    </View>
  );
};

export default NoNetworkScreen;
