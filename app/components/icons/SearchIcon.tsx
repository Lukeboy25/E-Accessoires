import React, { FC, ReactElement } from 'react';
import Svg, { Path } from 'react-native-svg';
import { SvgIconProps } from './Icon';

const SearchIcon: FC<SvgIconProps> = (props): ReactElement => (
  <Svg viewBox="0 0 100 100" {...props}>
    {/* eslint-disable-next-line max-len */}
    <Path d="M64.7 0c-19.3 0-35 15.7-35 35 0 7.6 2.5 15 7.1 21.1L0 92.9l7.1 7.1L44 63.1c15.5 11.5 37.5 8.2 49-7.3s8.2-37.5-7.3-49C79.5 2.4 72.2 0 64.7 0zm-25 35c0-13.8 11.2-25 25-25s25 11.2 25 25-11.2 25-25 25-25-11.2-25-25z" />
  </Svg>
);

export default SearchIcon;
