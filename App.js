import React, { useEffect } from 'react';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { connect, Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import configureStore from './app/store';
import { HomeScreen, ClosedOrdersScreen, SettingsScreen } from './app/screens';
import { GoogleAuthentication, LoadingSpinner } from './app/components';
import { checkForGoogleUser } from './app/store/login/loginActions';
import { useDispatch } from 'react-redux';

const Stack = createStackNavigator();
const Tab = createMaterialBottomTabNavigator();
export const { store, persistor } = configureStore();

const connectedApp = (props) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkForGoogleUser());
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {(props.user.email === 'luke25spaans@gmail.com' || props.user.email === '31nmolenaar@gmail.com') 
          ? <Stack.Screen name="Home" component={BottomTabNavigation} />
          : <Stack.Screen name="Login" component={GoogleAuthentication} />
        }
      </Stack.Navigator>
    </NavigationContainer>
)};

const BottomTabNavigation = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      activeColor="#000000"
      barStyle={{ backgroundColor: '#ffffff', borderTopWidth: 1, borderTopColor: '#D0D0C0' }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabel: 'Bestellingen',
          tabBarIcon: ({ color }) => <MaterialIcons name="shopping-bag" color={color} size={26} />,
        }}
      />
      <Tab.Screen
        name="ClosedOrders"
        component={ClosedOrdersScreen}
        options={{
          tabBarLabel: 'Afgerond',
          tabBarIcon: ({ color }) => <MaterialIcons name="done" color={color} size={26} />,
        }}
      />
      <Tab.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          tabBarLabel: 'Instellingen',
          tabBarIcon: ({ color }) => <MaterialIcons name="settings" color={color} size={26} />,
        }}
      />
    </Tab.Navigator>
  );
}

function LoginScreen() {
  <Tab.Navigator
    initialRouteName="Home"
    activeColor="#000000"
    barStyle={{ backgroundColor: '#ffffff', borderTopWidth: 1, borderTopColor: '#D0D0C0' }}
  >
    <Tab.Screen
      name="Settings"
      component={SettingsScreen}
      options={{
        tabBarLabel: 'Instellingen',
        tabBarIcon: ({ color }) => <MaterialIcons name="settings" color={color} size={26} />,
      }}
    />
    </Tab.Navigator>
}

const mapStateToProps = (state) => ({
  user: state.login.user,
});

const ConnectedApp = connect(mapStateToProps, null)(connectedApp);

export default function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={<LoadingSpinner />} persistor={persistor}>
        <ConnectedApp />
      </PersistGate>
    </Provider>
  );
}
