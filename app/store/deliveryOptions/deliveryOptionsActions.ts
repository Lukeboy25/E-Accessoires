import { Dispatch } from 'redux';

import { DeliveryOptionResource } from '../../entities/DeliveryOption/DeliveryOption';
import HttpService from '../../services/HttpService';
import { Language } from '../../types/languageTypes';
import { setIsLoading } from '../order/orderReducer';
import { setDeliveryOptions } from './deliveryOptionsReducer';

export const getDeliveryOptions = (language: Language, orderItemId: string) => async (dispatch: Dispatch): Promise<void> => {
    dispatch(setIsLoading(true));

    const httpService = new HttpService(language);

    const deliveryOptions: DeliveryOptionResource = await httpService.post('shipping-labels/delivery-options', {
        orderItems: { orderItemId },
    });

    dispatch(setDeliveryOptions(deliveryOptions.deliveryOptions));
    dispatch(setIsLoading(false));
};
