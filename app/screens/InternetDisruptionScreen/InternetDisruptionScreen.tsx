import React from 'react';
import { View, Text } from 'react-native';
import { LoadingSpinner } from '../../components';
import { LogoIcon } from '../../components/icons';

// @ts-ignore
import styles from './InternetDisruptionScreen.scss';

const InternetDisruptionScreen = () => {
  return (
    <View style={styles['internet-disruption']}>
      <LoadingSpinner 
        dimLights={0.0} 
        backgroundColor={'#ffffff'}
        color={'#000000'} 
        withTimeOut={false} 
        show 
      />
      <LogoIcon style={styles['internet-disruption__logo']} />
      <View style={styles['internet-disruption__container']}>      
        <Text style={styles['internet-disruption__title']}>Oops</Text>
        <Text style={styles['internet-disruption__text']}>Geen actieve internetverbinding</Text>
      </View>
    </View>
  );
};

export default InternetDisruptionScreen;
