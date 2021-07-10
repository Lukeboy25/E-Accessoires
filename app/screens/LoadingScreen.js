import React from 'react';
import { ActivityIndicator, Modal, View, Text } from 'react-native';

const LoadingScreen = (props) => {
  const { show = false, color = '#ffffff', backgroundColor = 'transparent', dimLights = 0.6, loadingMessage } = props;
  return (
    <Modal transparent={true} animationType='none' visible={show}>
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          paddingBottom: 25,
          backgroundColor: `rgba(0,0,0,${dimLights})`,
        }}
      >
        <View
          style={{
            padding: 13,
            backgroundColor: `${backgroundColor}`,
            borderRadius: 13,
          }}
        >
          <ActivityIndicator animating={show} color={color} size='large' />
          {loadingMessage && <Text style={{ color: `${color}` }}>{loadingMessage}</Text>}
        </View>
      </View>
    </Modal>
  );
};

export default LoadingScreen;
