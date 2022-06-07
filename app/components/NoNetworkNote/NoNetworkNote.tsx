import React from 'react';
import { View, Text } from 'react-native';
import { LogoIcon } from '../icons';

// @ts-ignore
import styles from './NoNetworkNote.scss';

const NoNetworkNote = () => {
  return (
    <View style={styles['no-network-note']}>
      <LogoIcon style={styles['no-network-note__logo']} />
      <View style={styles['no-network-note__container']}>      
        <Text style={styles['no-network-note__title']}>Oops</Text>
        <Text style={styles['no-network-note__text']}>Geen actieve internetverbinding</Text>
      </View>
    </View>
  );
};

export default NoNetworkNote;
