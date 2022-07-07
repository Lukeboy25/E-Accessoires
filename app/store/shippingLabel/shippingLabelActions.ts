import { Dispatch } from 'redux';

import { ShippingLabel } from '../../entities/ShippingLabel/ShippingLabel';
import HttpService from '../../services/HttpService';
import { Language } from '../../types/languageTypes';
import { setIsLoading } from '../order/orderReducer';
import { setShippingLabel } from './shippingLabelReducer';

export const createShippingLabel = (language: Language, orderItemId: string, shippingLabelOfferId: string) => async (dispatch: Dispatch): Promise<void> => {
    dispatch(setIsLoading(true));

    const httpService = new HttpService(language);

    const shippingLabel: ShippingLabel = await httpService.post('shipping-labels', {
        orderItems: { orderItemId },
        shippingLabelOfferId,
    });

    dispatch(setShippingLabel(shippingLabel));
    dispatch(setIsLoading(false));
};
