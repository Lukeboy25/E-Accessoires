import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { connect, Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import configureStore from './app/store';
import { LoadingScreen, HomeScreen } from './app/screens';

const Stack = createStackNavigator();
export const { store, persistor } = configureStore();

const connectedApp = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name='Home' component={HomeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const ConnectedApp = connect(null)(connectedApp);

export default function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={<LoadingScreen />} persistor={persistor}>
        <ConnectedApp />
      </PersistGate>
    </Provider>
  );
}
