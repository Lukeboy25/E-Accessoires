import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
// import format from 'date-format';
import * as BackgroundFetch from 'expo-background-fetch';
import * as TaskManager from 'expo-task-manager';
import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import HttpService from '../services/HttpService';
import NotificationSender from './NotificationSender';

const BACKGROUND_FETCH_TASK = 'background-fetch';
const LAST_FETCH_DATE_KEY = 'background-fetch-date';
const ORDER_ITEMS = 'order-items';
const CURRENT_ORDER_ITEMS = 'current-order-items';

export default function BackgroundFetchScreen(props) {
  const [isRegistered, setIsRegistered] = React.useState(false);
  const [fetchDate, setFetchDate] = React.useState(Date || null);
  const [currentOrderItems, setCurrentOrderItems] = React.useState(Number || null);
  const [willTriggerNotification, setWilltriggerNotification] = React.useState(Boolean || null);
  const [status, setStatus] = React.useState(BackgroundFetch.Status | null);

  React.useEffect(() => {
    refreshLastFetchDateAsync();
  }, [fetchDate]);

  React.useEffect(() => {
    checkForNewNotification();
  }, [CURRENT_ORDER_ITEMS]);

  const onFocus = React.useCallback(() => {
    refreshLastFetchDateAsync();
    checkStatusAsync();
  }, []);
  useFocusEffect(onFocus);

  const refreshLastFetchDateAsync = async () => {
    const lastFetchDateStr = await AsyncStorage.getItem(LAST_FETCH_DATE_KEY);

    if (lastFetchDateStr) {
      setFetchDate(new Date(+lastFetchDateStr));
    }
  };

  const checkForNewNotification = async () => {
    const currentOpenOrders = await AsyncStorage.getItem(CURRENT_ORDER_ITEMS);

    AsyncStorage.setItem(CURRENT_ORDER_ITEMS, props.openOrders.toString());
    setCurrentOrderItems(props.openOrders);

    // console.log(currentOpenOrders);

    if (!props.openOrders || props.openOrders === 0) {
      return false;
    }

    if (props.openOrders === parseInt(currentOpenOrders)) {
      return false;
    }

    if (!currentOpenOrders) {
      return false;
    }

    setWilltriggerNotification(true);

    return true;
  };

  const checkStatusAsync = async () => {
    const status = await BackgroundFetch.getStatusAsync();
    const isRegistered = await TaskManager.isTaskRegisteredAsync(BACKGROUND_FETCH_TASK);
    console.log('registered', isRegistered);
    setStatus(status);
    setIsRegistered(isRegistered);
  };

  const toggle = async () => {
    if (isRegistered) {
      await BackgroundFetch.unregisterTaskAsync(BACKGROUND_FETCH_TASK);
    } else {
      await BackgroundFetch.registerTaskAsync(BACKGROUND_FETCH_TASK, {
        minimumInterval: 5, // 1 minute
        stopOnTerminate: false,
        startOnBoot: true,
      });
    }
    setIsRegistered(!isRegistered);
  };

  const renderText = () => {
    if (!fetchDate) {
      return <Text>There was no BackgroundFetch call yet.</Text>;
    }
    return (
      <View style={{ flexDirection: 'column', alignItems: 'center' }}>
        <Text>Last background fetch was invoked at:</Text>
        <Text style={styles.boldText}>{fetchDate.toString()}</Text>
        <Text>
          Orders: {currentOrderItems} {willTriggerNotification && <NotificationSender />}
        </Text>
      </View>
    );
  };

  return (
    <View style={styles.screen}>
      <View style={styles.textContainer}>
        <Text>
          Background fetch status: <Text style={styles.boldText}>{status ? BackgroundFetch.Status[status] : null}</Text>
        </Text>
      </View>
      <View style={styles.textContainer}>{renderText()}</View>
      <Button
        buttonStyle={styles.button}
        title={isRegistered ? 'Unregister BackgroundFetch task' : 'Register BackgroundFetch task'}
        onPress={toggle}
      />
    </View>
  );
}

BackgroundFetchScreen.navigationOptions = {
  title: 'Background Fetch',
};

TaskManager.defineTask(BACKGROUND_FETCH_TASK, async () => {
  const { orders } = await HttpService.get('orders');

  const now = Date.now();
  console.log(`Got background fetch call at date: ${new Date(now).toString()}`);
  await AsyncStorage.setItem(LAST_FETCH_DATE_KEY, now.toString());

  if (orders) {
    console.log('current orders', orders.length.toString());
    await AsyncStorage.setItem(CURRENT_ORDER_ITEMS, orders.length.toString());
  }

  return BackgroundFetch.Result.NewData;
});

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    padding: 10,
    marginVertical: 5,
  },
  textContainer: {
    margin: 10,
  },
  boldText: {
    fontWeight: 'bold',
  },
});
