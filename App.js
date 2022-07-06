import React, { useEffect } from 'react';

import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { GOOGLE_KOEN, GOOGLE_LUKE, GOOGLE_NICK } from 'react-native-dotenv';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { connect, Provider, useDispatch } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import { GoogleAuthentication, LoadingSpinner } from './app/components';
import { ConnectedClosedOrders } from './app/connectors';
import ConnectedOpenOrders from './app/connectors/ConnectedOpenOrders/ConnectedOpenOrders';
import { SettingsScreen } from './app/screens';
import configureStore from './app/store';
import { checkForGoogleUser } from './app/store/login/loginActions';
import { checkForActiveConnection } from './app/store/network/networkActions';

const Stack = createStackNavigator();
const Tab = createMaterialBottomTabNavigator();
export const { store, persistor } = configureStore();

const connectedApp = (props) => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(checkForActiveConnection());
    }, []);

    useEffect(() => {
        dispatch(checkForGoogleUser());
    }, []);

    const BottomTabNavigation = () => (
        <Tab.Navigator
            initialRouteName="Home"
            activeColor="#000000"
            barStyle={{ backgroundColor: '#ffffff', borderTopWidth: 1, borderTopColor: '#D0D0C0' }}
        >
            <Tab.Screen
                name="OpenOrders"
                component={ConnectedOpenOrders}
                options={{
                    tabBarLabel: 'Bestellingen',
                    tabBarIcon: ({ color }) => <MaterialIcons name="shopping-bag" color={color} size={26} />,
                }}
            />
            <Tab.Screen
                name="ClosedOrders"
                component={ConnectedClosedOrders}
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

    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                {(props.user.email === GOOGLE_LUKE || props.user.email === GOOGLE_NICK || props.user.email === GOOGLE_KOEN)
          ? <Stack.Screen name="Home" component={BottomTabNavigation} />
          : <Stack.Screen name="Login" component={GoogleAuthentication} />}
            </Stack.Navigator>
        </NavigationContainer>
    );
};


const mapStateToProps = (state) => ({
    user: state.login.user,
    hasConnection: state.network.hasConnection,
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
