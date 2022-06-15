import { FC } from 'react';
import { connect, useDispatch } from 'react-redux';
import {
  StyleSheet, 
  StatusBar, 
  ScrollView, 
  Button,
} from 'react-native';
import { logOutGoogle } from '../store/login/loginActions';
import { Header } from '../components';
import { GoogleUserViewModel } from '../entities/GoogleUser/GoogleUserViewModel';

export interface SettingsScreenProps {
  user: GoogleUserViewModel;
}

const SettingsScreen: FC<SettingsScreenProps> = ({
  user,
}) => {
  const dispatch = useDispatch();

  const sendLogOutGoogle = async () => {
    dispatch(logOutGoogle());
  };

  return (
    <ScrollView
      style={styles.background}
    >
      <StatusBar barStyle="light-content" />
      <Header />
      {user.name && (
        <Button
          onPress={() => sendLogOutGoogle()}
          title="Uitloggen"
          accessibilityLabel="Uitloggen"
        />
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
});

const mapStateToProps = (state: any) => ({
  user: state.login.user,
});

export default connect(mapStateToProps, null)(SettingsScreen);
