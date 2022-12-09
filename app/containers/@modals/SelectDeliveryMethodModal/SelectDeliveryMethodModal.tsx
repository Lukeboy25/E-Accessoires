import React, { FC, ReactElement } from 'react';

import {
    FlatList,
    Modal,
    Text,
    View,
} from 'react-native';

import { DeleteIcon } from '../../../components/icons';
import { DeliveryMethodItem } from '../../../compositions';
import { DeliveryOption } from '../../../entities/DeliveryOption/DeliveryOption';

// @ts-ignore
import styles from './SelectDeliveryMethodModal.scss';

interface SelectDeliveryMethodModalProps {
    deliveryOptions: DeliveryOption[];
    onCancelDeliveryMethodClick: () => void;
    onDeliveryOptionClick: (shippingLabelOfferId: string) => void;
}

const SelectDeliveryMethodModal: FC<SelectDeliveryMethodModalProps> = ({
    deliveryOptions,
    onCancelDeliveryMethodClick,
    onDeliveryOptionClick,
}): ReactElement => (
    <Modal
        transparent
        animationType="fade"
    >
        <View style={styles['select-delivery-method']}>
            <View style={styles['select-delivery-method__modal']}>
                <View style={styles['select-delivery-method__header']}>
                    <Text style={styles['select-delivery-method__title']}>Kies hier verzendmethode</Text>
                    <DeleteIcon
                        onPress={onCancelDeliveryMethodClick}
                        style={styles['select-delivery-method__close-icon']}
                    />
                </View>
                <FlatList
                    keyExtractor={item => item.shippingLabelOfferId}
                    data={deliveryOptions}
                    numColumns={1}
                    renderItem={({ item }) => (
                        <DeliveryMethodItem
                            deliveryOption={item}
                            onDeliveryOptionClick={onDeliveryOptionClick}
                        />
                    )}
                />
            </View>
        </View>
    </Modal>
);

export default SelectDeliveryMethodModal;
