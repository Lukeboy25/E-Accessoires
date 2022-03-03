import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
  StyleSheet, View, Text, Button,
} from 'react-native';
import * as Google from 'expo-google-app-auth';
import { ANDROID_CLIENT_ID, ANDROID_DEMO_CLIENT_ID } from 'react-native-dotenv';
import { loginWithGoogle } from '../store/login/loginActions';

function GoogleAuthentication({ loginWithGoogle }) {
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
      <Text style={styles.header}>Sign in with Google to get started</Text>
      <View style={styles.buttonContainer}>
        <Button style={styles.button} title="Login" onPress={() => signIn()} />
      </View>
    </View>
  );
}

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