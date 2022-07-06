import React, { FC } from 'react';

import {
    Image,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

import { Language } from '../types/languageTypes';

export interface OrderTitleProps {
    title: string;
    language: Language;
    switchLanguage: (language: Language) => void;
}

const OrderTitle: FC<OrderTitleProps> = ({
    title,
    language,
    switchLanguage,
}) => {
    const handleLanguagePress = () => {
        if (language === 'NL') {
            switchLanguage('BE');
        } else {
            switchLanguage('NL');
        }
    };
    return (
        <View style={styles.orderTitle}>
            <Text style={styles.title}>E-accessoires</Text>
            <Text style={styles.orders}>
                {title}
            </Text>
            <TouchableOpacity onPress={handleLanguagePress} style={styles.languageContainer}>
                <Image style={styles.languageLogo} source={language === 'NL' ? require('../assets/netherlands.png') : require('../assets/belgium.png')} />
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    orderTitle: {
        display: 'flex',
    },
    title: {
        marginTop: 10,
        fontWeight: 'bold',
        fontSize: 22,
        alignSelf: 'stretch',
        textAlign: 'center',
    },
    orders: {
        alignSelf: 'center',
        paddingTop: 10,
        fontSize: 16,
    },
    languageContainer: {
        position: 'absolute',
        top: 0,
        right: 0,
        margin: 8,
    },
    languageLogo: {
        width: 50,
        height: 50,
    },
});

export default OrderTitle;
