/* eslint-disable max-len */
import React, { FC, ReactElement } from 'react';

import Svg, { G, Path } from 'react-native-svg';

import { SvgIconProps } from './Icon';

const PostNLIcon: FC<SvgIconProps> = (props): ReactElement => (
    <Svg id="dhl" width="71.25px" height="10px" viewBox="0 0 143.5 20" {...props}>
        <G>
            <Path fill="#D40511" d="M0,18.5h17.4l-1,1.4H0V18.5z" />
            <Path fill="#D40511" d="M143.5,19.9h-21.3l1.1-1.4h20.3V19.9z" />
            <Path fill="#D40511" d="M0,15.9h19.4l-1.1,1.4H0V15.9z" />
            <Path fill="#D40511" d="M0,13.3h21.4l-1.1,1.4H0L0,13.3z" />
            <Path fill="#D40511" d="M143.5,17.3h-19.3l1.1-1.4h18.3V17.3z" />
            <Path fill="#D40511" d="M127.2,13.3h16.3v1.4h-17.4L127.2,13.3z" />
            <Path
                fill="#D40511"
                d="M18.8,19.9L28,7.6c0,0,10.2,0,11.4,0c1.3,0,1.3,0.5,0.6,1.3c-0.6,0.8-1.7,2.3-2.3,3.1c-0.3,0.5-0.9,1.2,1,1.2c2.1,0,15.3,0,15.3,0C52.8,15,48.6,20,41.2,20C35.2,19.9,18.8,19.9,18.8,19.9z"
            />
            <Path fill="#D40511" d="M71.5,13.3l-5,6.7H53.4l5-6.7H71.5z" />
            <Path fill="#D40511" d="M90.6,13.3l-5,6.7H72.4l5-6.7H90.6z" />
            <Path fill="#D40511" d="M94.9,13.3c0,0-1,1.3-1.4,1.9c-1.7,2.2-0.2,4.8,5.2,4.8c6.2,0,21.2,0,21.2,0l5-6.7H94.9z" />
            <Path
                fill="#D40511"
                d="M25.3,0l-4.6,6.1c0,0,23.7,0,25,0c1.3,0,1.3,0.5,0.6,1.3c-0.6,0.8-1.7,2.3-2.3,3.1c-0.3,0.4-0.9,1.2,1,1.2c2.1,0,10.2,0,10.2,0s1.7-2.2,3-4.1c1.9-2.5,0.2-7.7-6.5-7.7C45.7,0,25.3,0,25.3,0z"
            />
            <Path fill="#D40511" d="M91.7,11.7H59.5L68.3,0h13.2l-5,6.7h5.9L87.4,0h13.2L91.7,11.7z" />
            <Path fill="#D40511" d="M118.8,0L110,11.7H96L104.8,0H118.8z" />
        </G>
    </Svg>
);

export default PostNLIcon;
/* eslint-enable max-len */
