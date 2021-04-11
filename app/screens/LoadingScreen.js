import React from 'react';
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  SafeAreaView,
  StyleSheet,
  TouchableWithoutFeedback,
} from 'react-native';

const LoadingScreen = () => {
  return (
    <KeyboardAvoidingView
      style={styles.profileOverview}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      enabled={true}
    >
      <TouchableWithoutFeedback>
        <SafeAreaView style={styles.profileHeader}>
          <ActivityIndicator animating={true} color={'#000000'} size='large' />
        </SafeAreaView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  profileOverview: {
    flex: 1,
    backgroundColor: '#000000',
  },
  profileHeader: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderColor: '#000000',
  },
});

export default LoadingScreen;
