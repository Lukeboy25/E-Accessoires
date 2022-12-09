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

export enum DeliveryMethods {
    POST_NL_BRIEF = 'Pakketzegels via bol.com - PostNL - Brievenbuspakje',
    POST_NL = 'Pakketzegels via bol.com – PostNL – Pakket',
    DHL = 'Pakketzegels via bol.com - DHL - Pakket',
    DPD = 'Pakketzegels via bol.com – DPD – Pakket',
}
