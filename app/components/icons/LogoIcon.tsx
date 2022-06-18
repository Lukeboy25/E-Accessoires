import React, { ReactElement } from 'react';

import { Image } from 'react-native';

const LogoIcon = (props: any): ReactElement => (<Image {...props} resizeMode="contain" source={require('../../assets/logo-new-middle.png')} />);

export default LogoIcon;
