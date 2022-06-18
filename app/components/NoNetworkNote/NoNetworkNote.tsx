import React from 'react';

import { Text, View } from 'react-native';

import { LogoIcon, WifiIcon } from '../icons';

// @ts-ignore
import styles from './NoNetworkNote.scss';

const NoNetworkNote = () => (
    <View style={styles['no-network-note']}>
        <WifiIcon style={styles['no-network-note__wifi-icon']} />
        <View style={styles['no-network-note__container']}>
            <Text style={styles['no-network-note__title']}>Oops</Text>
            <Text style={styles['no-network-note__text']}>Geen actieve internetverbinding</Text>
        </View>
    </View>
);

export default NoNetworkNote;
