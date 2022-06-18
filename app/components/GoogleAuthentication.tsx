import React from 'react';

import * as Google from 'expo-google-app-auth';
import {
    Button,
    StyleSheet,
    Text,
    View,
} from 'react-native';
import { ANDROID_CLIENT_ID, ANDROID_DEMO_CLIENT_ID } from 'react-native-dotenv';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { loginWithGoogle } from '../store/login/loginActions';
import { LogoIcon } from './icons';

const GoogleAuthentication = ({ loginWithGoogle }) => {
    const signIn = async () => {
        try {
            const result = await Google.logInAsync({
                androidClientId: ANDROID_DEMO_CLIENT_ID,
                androidStandaloneAppClientId: ANDROID_CLIENT_ID,
                // iosClientId: YOUR_CLIENT_ID_HERE,
                scopes: ['profile', 'email'],
            });

            if (result.type === 'success') {
                await loginWithGoogle(result.user);
            } else {
                console.log('cancelled');
            }
        } catch (e) {
            console.log('error', e);
        }
    };

    return (
        <View style={styles.container}>
            <LogoIcon style={{ width: 100, height: 100 }} />
            <Text style={styles.header}>Sign in with Google to get started</Text>
            <View style={styles.buttonContainer}>
                <Button title="Login" onPress={() => signIn()} />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginBottom: 60,
        alignItems: 'center',
        justifyContent: 'center',
    },
    header: {
        fontSize: 22,
        margin: 15,
    },
    buttonContainer: {
        width: 300,
        marginLeft: 'auto',
        marginRight: 'auto',
    },
});

const mapDispatchToProps = (dispatch) => bindActionCreators(
    {
        loginWithGoogle,
    },
    dispatch,
);

export default connect(null, mapDispatchToProps)(GoogleAuthentication);
