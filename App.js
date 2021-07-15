import React from 'react';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { connect, Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import configureStore from './app/store';
import { LoadingScreen, HomeScreen, SettingsScreen } from './app/screens';

const Stack = createStackNavigator();
const Tab = createMaterialBottomTabNavigator();
export const { store, persistor } = configureStore();

const connectedApp = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name='Home' component={BottomTabNavigation} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const BottomTabNavigation = () => {
  return (
    <Tab.Navigator
      initialRouteName='Home'
      activeColor={'#000000'}
      barStyle={{ backgroundColor: '#ffffff', borderTopWidth: 1, borderTopColor: '#D0D0C0' }}
    >
      <Tab.Screen
        name='Home'
        component={HomeScreen}
        options={{
          tabBarLabel: 'Bestellingen',
          tabBarIcon: ({ color }) => <MaterialIcons name='shopping-bag' color={color} size={26} />,
        }}
      />
      <Tab.Screen
        name='Settings'
        component={SettingsScreen}
        options={{
          tabBarLabel: 'Instellingen',
          tabBarIcon: ({ color }) => <MaterialIcons name='settings' color={color} size={26} />,
        }}
      />
    </Tab.Navigator>
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
