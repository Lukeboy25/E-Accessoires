import React, { useEffect } from 'react';
import {
  ActivityIndicator, 
  Modal, 
  View, 
  Text,
} from 'react-native';

const LoadingSpinner = (props) => {
  const {
    show = false, 
    color = '#ffffff', 
    backgroundColor = 'transparent', 
    dimLights = 0.3,
    withTimeOut = true,
  } = props;
  const [isShowing, setShowing] = React.useState(false);

  useEffect(() => {
    setShowing(true);
    withTimeOut && setTimeout(() => setShowing(false), 700);
  }, [show]);

  return (
    <Modal transparent animationType="none" visible={isShowing}>
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
          <ActivityIndicator animating={isShowing} color={color} size="large" />
          <Text style={{ color: `${color}` }}>Loading</Text>
        </View>
      </View>
    </Modal>
  );
}

export default LoadingSpinner;
