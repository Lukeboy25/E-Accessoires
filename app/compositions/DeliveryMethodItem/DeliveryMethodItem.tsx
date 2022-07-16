import React, { FC, ReactElement } from 'react';

import { Text, TouchableOpacity, View } from 'react-native';

import { generateDeliveryIconForLabel } from '../../containers/@modals/SelectDeliveryMethodModal/helpers/generateDeliveryIconForLabel';
import { DeliveryOption } from '../../entities/DeliveryOption/DeliveryOption';

// @ts-ignore
import styles from './DeliveryMethodItem.scss';

interface DeliveryMethodItemProps {
    deliveryOption: DeliveryOption;
    onDeliveryOptionClick: (shippingLabelOfferId: string) => void;
}

const DeliveryMethodItem: FC<DeliveryMethodItemProps> = ({
    deliveryOption,
    onDeliveryOptionClick,
}): ReactElement => {
    const handleDeliveryOptionClick = (shippingLabelOfferId: string): void => {
        onDeliveryOptionClick(shippingLabelOfferId);
    };

    return (
        <TouchableOpacity style={styles['delivery-method-item']} onPress={() => handleDeliveryOptionClick(deliveryOption.shippingLabelOfferId)}>
            <View>
                <Text style={styles['delivery-method-item__label']}>{deliveryOption.labelDisplayName}</Text>
                <View style={styles['delivery-method-item__price-wrapper']}>
                    <Text style={styles['delivery-method-item__price']}>
                        €
                        {deliveryOption.labelPrice.totalPrice}
                    </Text>
                    <View style={styles['delivery-method-item__icon']}>
                        {generateDeliveryIconForLabel ? generateDeliveryIconForLabel(deliveryOption.labelDisplayName) : <View />}
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    );
};

export default DeliveryMethodItem;

