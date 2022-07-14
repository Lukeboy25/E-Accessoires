import React, { FC, ReactElement } from 'react';

import {
    Alert,
    FlatList,
    Modal,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

import { DeliveryOption } from '../../../entities/DeliveryOption/DeliveryOption';

// @ts-ignore
import styles from './SelectDeliveryMethodModal.scss';

interface SelectDeliveryMethodModalProps {
    deliveryOptions: DeliveryOption[];
}

const SelectDeliveryMethodModal: FC<SelectDeliveryMethodModalProps> = ({
    deliveryOptions,
}): ReactElement => {
    const onDeliveryOptionClick = (): void => {
        console.log('test');
    };

    return (
        <Modal
            transparent
            animationType="slide"
            onRequestClose={() => {
                Alert.alert('Modal has been closed.');
            }}
        >
            <View style={styles['select-delivery-method']}>
                <View style={styles['select-delivery-method__modal']}>
                    <Text style={styles['select-delivery-method__title']}>Kies hier verzendmethode</Text>
                    {/* TODO create close icon */}
                    <FlatList
                        style={styles['select-delivery-method__option-wrapper']}
                        keyExtractor={item => item.shippingLabelOfferId}
                        data={deliveryOptions}
                        numColumns={2}
                        renderItem={({ item }) => (
                            <TouchableOpacity style={styles['select-delivery-method__option']} onPress={onDeliveryOptionClick}>
                                <Text>{item.labelDisplayName}</Text>
                            </TouchableOpacity>
                        )}
                    />
                </View>
            </View>
        </Modal>
    );
};

export default SelectDeliveryMethodModal;

