import React, { ReactElement } from 'react';

import { DHLIcon, DPDIcon, PostNLIcon } from '../../../components/icons';
import { DeliveryMethods } from '../../../entities/DeliveryOption/DeliveryOption';

export const generateDeliveryIconForLabel = (labelDisplayName: string): ReactElement | undefined => {
    if (labelDisplayName === DeliveryMethods.POST_NL_BRIEF || labelDisplayName === DeliveryMethods.POST_NL) {
        return <PostNLIcon />;
    }

    if (labelDisplayName === DeliveryMethods.DHL) {
        return <DHLIcon />;
    }

    if (labelDisplayName === DeliveryMethods.DPD) {
        return <DPDIcon />;
    }

    return undefined;
};
