import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import * as BackgroundFetch from 'expo-background-fetch';
import * as TaskManager from 'expo-task-manager';
import React from 'react';
import Moment from 'react-moment';
import { StyleSheet, Text, View, Button } from 'react-native';
import HttpService from '../services/HttpService';
import NotificationSender from './NotificationSender';

const BACKGROUND_FETCH_TASK = 'background-fetch';
const LAST_FETCH_DATE_KEY = 'background-fetch-date';
const ORDER_ITEMS = 'order-items';
const CURRENT_ORDER_ITEMS = 'current-order-items';

export default function BackgroundFetcher(props) {
  const [isRegistered, setIsRegistered] = React.useState(false);
  const [fetchDate, setFetchDate] = React.useState(Date || null);
  const [currentOrderItems, setCurrentOrderItems] = React.useState(Number || null);
  const [willTriggerNotification, setWilltriggerNotification] = React.useState(Boolean || null);
  const [status, setStatus] = React.useState(BackgroundFetch.Status | null);

  React.useEffect(() => {
    refreshLastFetchDateAsync();
  }, [fetchDate]);

  React.useEffect(() => {
    if (props.openOrdersAmount !== currentOrderItems) {
      setCurrentOrderItems(props.openOrdersAmount);
    }
    checkForNewNotification();
  }, [props.openOrdersAmount]);

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

    AsyncStorage.setItem(CURRENT_ORDER_ITEMS, props.openOrdersAmount.toString());
    setCurrentOrderItems(props.openOrdersAmount);

    if (!props.openOrdersAmount || props.openOrdersAmount === 0) {
      return false;
    }

    if (props.openOrdersAmount === parseInt(currentOpenOrders)) {
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
        minimumInterval: 60, // 1 minute
        stopOnTerminate: false,
        startOnBoot: true,
      });
    }
    setIsRegistered(!isRegistered);
  };

  const renderFetchTime = () => {
    if (!fetchDate) {
      return <Text>There was no BackgroundFetch call yet.</Text>;
    }
    return (
      <View style={styles.statusContainer}>
        <Text>
          Laatste meldingen check:{' '}
          <Moment style={styles.boldText} format='DD-MM-yyyy HH:mm:ss' element={Text}>
            {fetchDate}
          </Moment>
        </Text>
      </View>
    );
  };

  return (
    <View style={styles.background}>
      <Text style={styles.backgroundTitle}>Meldingen</Text>
      <View style={styles.statusContainer}>
        <Text>
          Status: <Text style={styles.boldText}>{status ? BackgroundFetch.Status[status] : null}</Text>
        </Text>
      </View>
      {renderFetchTime()}
      <Text>
        Orders: {currentOrderItems} 
        {willTriggerNotification && <NotificationSender />}
      </Text>
      <View style={styles.buttonContainer}>
        <Button
          buttonStyle={styles.button}
          title={isRegistered ? 'Zet meldingen uit' : 'Zet meldingen aan'}
          onPress={toggle}
        />
      </View>
    </View>
  );
}

BackgroundFetcher.navigationOptions = {
  title: 'Background Fetch',
};

TaskManager.defineTask(BACKGROUND_FETCH_TASK, async () => {
  const httpService = new HttpService('NL');
  const { orders } = await httpService.get('orders');

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
  background: {
    margin: 25,
  },
  boldText: {
    fontWeight: 'bold',
  },
  statusContainer: {
    alignItems: 'stretch',
  },

  backgroundTitle: {
    fontWeight: 'bold',
    fontSize: 22,
    alignSelf: 'stretch',
    textAlign: 'center',
  },

  buttonContainer: {
    alignSelf: 'stretch',
    marginTop: 10,
  },
});
