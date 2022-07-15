export interface DeliveryOptionResource {
    deliveryOptions: [{
        shippingLabelOfferId: string;
        recommended: string;
        validUntilDate: string;
        transporterCode: string;
        labelDisplayName: string;
        labelPrice: {
            totalPrice: number;
        }
    }];
}

export interface DeliveryOption {
    shippingLabelOfferId: string;
    recommended: string;
    validUntilDate: string;
    transporterCode: string;
    labelDisplayName: string;
    labelPrice: {
        totalPrice: number;
    }
}
