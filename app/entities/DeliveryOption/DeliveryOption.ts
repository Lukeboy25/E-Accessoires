export interface DeliveryOption {
    deliveryOptions: [{
        shippingLabelOfferId: string;
        recommended: string;
        validUntilDate: string;
        transporterCode: string;
        labelDisplayName: string;
        labelPrice: {
            totalPrice: number;
        }
    }]
}
