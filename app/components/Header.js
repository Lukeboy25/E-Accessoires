import React, { useState } from 'react';
import {
  View, Text, StyleSheet, Image,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LogoIcon } from './icons/index';

function Header() {
  const [name, setName] = useState('');
  const [photoUrl, setPhotoUrl] = useState('');

  AsyncStorage.getItem('googleName').then((value) => {
    setName(value);
  });

  AsyncStorage.getItem('googlePhotoUrl').then((url) => {
    setPhotoUrl(url);
  });

  return (
    <View style={styles.header}>
      <View style={styles.headerLeftSection}>
        <LogoIcon />
        <Text style={styles.headerUserName}>{name}</Text>
      </View>
      {photoUrl ? <Image style={styles.headerImage} source={{ uri: photoUrl }} /> : <></>}
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 80,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#D0D0D0',
  },
  headerLeftSection: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 15,
  },
  headerUserName: {
    marginLeft: 10,
    fontWeight: 'bold',
    width: 200,
  },
  headerImage: {
    margin: 15,
    width: 50,
    height: 50,
    borderRadius: 25,
  },
});

export default Header;
