/* eslint-disable max-len */
import React, { FC, ReactElement } from 'react';

import Svg, { Path } from 'react-native-svg';

import { SvgIconProps } from './Icon';

const PostNLIcon: FC<SvgIconProps> = (props): ReactElement => (
    <Svg id="post-nl-logo" viewBox="0 0 512 512" width="25" height="25" {...props}>
        <Path
            fill="#f29839"
            d="M40 512c-22.1 0-40-17.9-40-40V40C0 17.9 17.9 0 40 0h432c22.1 0 40 17.9 40 40v432c0 22.1-17.9 40-40 40H40z"
        />
        <Path
            fill="#fff"
            d="M409.7 338.7c-.3 0-.5-.2-.5-.5v-48.1c0-10.7-3.6-15.2-12.1-15.2-3 0-6.7 1.1-10.4 3.2-3.6 2.1-6.5 3.8-7.5 4.5-.3.2-.6.7-.6 1.1v54.6c0 .3-.2.5-.5.5h-21.4c-.3 0-.5-.2-.5-.5v-77.4c0-1.3 1-2.3 2.3-2.3h19.6c.3 0 .5.2.5.5v6.1c0 .4.3.7.7.7.2 0 .3-.1.4-.1l.6-.5c2.4-1.8 6.1-3.9 8.6-4.9 5.4-2 11.2-3.2 15.9-3.2 17.5 0 26.8 10.1 26.8 29.1v52c0 .3-.2.5-.5.5h-21.4m39.6-.1c-.3 0-.5-.2-.5-.5V219.7c0-.4.1-.5.7-.5 1.3 0 13.3 7.5 17.2 11.8 2.9 3.2 4.5 7.5 4.5 11.8v95.5c0 .3-.2.5-.5.5l-21.4-.1"
        />
        <Path
            fill="#17469e"
            d="M211.9 298.6c0 28.3-18.7 41.8-41.8 41.8-23.2 0-41.9-13.5-41.9-41.9 0-29 18.7-41.9 41.9-41.9 23.1.2 41.8 13.1 41.8 42m-23.8 0c0-15.3-7.8-22-18.1-22-10.4 0-18.1 6.7-18.1 22 0 14.1 7.8 21.9 18.1 21.9 10.4.1 18.1-7.8 18.1-21.9zm132.7-62c0-.6-.3-.8-.9-.8-1.6 0-13.6 7.8-17.4 11.9-2.8 3.1-4.6 7.4-4.6 12v51.4c0 22.3 12.9 29.3 26.8 29.3 7.9 0 13.3-1.2 16.5-2.9.7-.4 1.3-1.1 1.3-2.2v-14.6c0-.4-.4-.8-.8-.8-.8 0-6.1 2.1-9.4 2.1-7.2 0-11.5-3.4-11.5-14.7v-29.6c0-.4.3-.8.8-.8H341c.4 0 .8-.4.8-.8v-15.2c0-1.4-1.1-2.5-2.5-2.5h-17.6c-.4 0-.8-.4-.8-.8l-.1-21M40.9 260.9c0-1.4 1.2-2.6 2.6-2.6H74c30 0 45.5 18 45.5 41.3s-17.4 39.4-46 39.4h-8.9c-.4 0-.8.4-.8.8v37.8c0 .6-.3.8-.9.8-1.6 0-13.6-7.7-17.4-11.9-2.8-3.1-4.6-7.4-4.6-12v-93.6m55.9 37.5c0-9.9-6.4-19.2-23.3-19.2h-9c-.4 0-.8.4-.8.8v37.2c0 .4.3.8.8.8H74c20.1 0 22.8-14 22.8-19.6zm179.6-3.3c-4.7-3.1-10.5-4.4-16.1-5.6-1-.2-4.7-1.1-5.6-1.3-6.8-1.5-12.2-2.7-12.2-7.1 0-3.8 3.7-6.3 9.4-6.3 7.2 0 17.2 1.4 28.1 5.5.5.2 1.3-.1 1.3-.9v-15.8c0-1.1-.7-2.1-1.9-2.5-3.8-1.2-15.2-4.4-24.8-4.4-10.7 0-19.6 2.4-25.7 6.9-6.2 4.5-9.5 11.1-9.5 19 0 17.8 14.6 21.1 28.3 24.4 2.1.5 1.8.4 2.6.6 6.3 1.4 12.8 2.8 12.8 8 0 1.5-.6 2.8-1.7 4-1.8 1.7-4.5 2.5-9.6 2.5-8.8 0-25.3-4.1-30.4-5.7 0 0-.2-.1-.3-.1-.5 0-1 .4-1 .9V333c0 1.1.7 2.1 1.8 2.5.1 0 14.5 4.8 28.2 4.8 23.8 0 36-9.3 36-26.3 0-8.4-3.2-14.6-9.7-18.9"
        />
        <Path
            fill="#fff"
            d="M134.7 237.7c-1.9 0-2.7-1-2.7-3.2v-8.7c0-2 1.7-3.6 3.6-3.6h68.9c2 0 3.6 1.7 3.6 3.6v8.7c0 2.2-.8 3.2-2.7 3.2h-70.7m62.3-24.4c-.7 0-1.2-.2-1.5-.6-.3-.4-.3-1.1-.1-1.9 2.3-7.1 10-28.7 10.1-29 .5-1.4 0-3.3-1.5-3.9l-3.9-1.3c-.3-.1-.5-.1-.8-.1-.8 0-1.2.4-1.4.7-1.6 3.6-2.5 6.1-3.7 10.3-.2.7-.8 1.1-1.8 1.1h-7.6c-.6 0-1-.2-1.2-.4-.2-.3-.3-.7-.1-1.3 2-7 4-12.6 6.8-18.8.5-1.1 1.7-2.9 4.3-2.9.5 0 1 .1 1.5.2h.1c2.6.6 5.5 1.3 8.6 2.2 2.4.7 4.9 1.6 7.5 2.5 7.8 2.9 7.5 8.5 5.9 14.2-.9 3.4-5.5 16.1-8.2 23.7-.6 1.6-1.1 3-1.4 3.9-.3.9-1 1.3-2.2 1.3H197v.1zm-31.8 0c-1.7 0-1.8-1.9-1.8-2 0-.4-.5-40.7-.6-46.2 0-.4.1-1.3.7-1.9.3-.3.7-.5 1.2-.5.8 0 2.9-.1 5.4-.1s4.6.1 5.4.1c.5 0 .9.2 1.2.5.6.6.7 1.5.7 1.9-.1 5.5-.6 45.8-.6 46.2 0 0-.1 1.9-1.8 1.9h-9.8v.1zm-31.5 0c-1.2 0-1.9-.4-2.2-1.3-.3-.9-.8-2.3-1.4-3.9-2.7-7.6-7.3-20.3-8.2-23.7-1.5-5.7-1.8-11.3 5.9-14.2 2.6-.9 5.1-1.8 7.5-2.5 3.1-.9 6-1.6 8.6-2.2h.1c.5-.1 1-.2 1.5-.2 2.6 0 3.8 1.8 4.3 2.9 2.8 6.2 4.8 11.8 6.7 18.8.2.6.1 1-.1 1.3-.2.3-.6.4-1.2.4h-7.6c-1 0-1.6-.4-1.8-1.1-1.2-4.2-2.2-6.7-3.8-10.3-.2-.4-.6-.7-1.4-.7-.2 0-.5 0-.7.1L136 178c-1.5.5-2 2.5-1.5 3.9.1.2 7.8 21.8 10.1 29 .3.8.2 1.5 0 1.9-.3.4-.8.6-1.5.6l-9.4-.1zm36.3-58.8c-.4 0-.9-.2-1.3-.5-3.2-2.5-6.2-5.5-8.7-8.8-.3-.4-.9-1.1 0-2.1 2.7-3.5 5.8-6.6 9.3-9.2.4-.2.6-.3.8-.3s.5.1.9.3c3.5 2.6 6.6 5.7 9.3 9.2.7.8.4 1.5 0 2.1-2.6 3.3-5.5 6.3-8.7 8.8-.7.3-1.1.5-1.6.5z"
        />
    </Svg>
);

export default PostNLIcon;
/* eslint-enable max-len */
