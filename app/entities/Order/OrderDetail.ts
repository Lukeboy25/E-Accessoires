export interface ShipmentDetailsViewModel {
    firstName: string;
    surname: string;
    streetName: string;
    houseNumber: string;
    houseNumberExtension: string;
    extraAddressInformation: string;
    zipCode: string;
    city: string;
    countryCode: string;
    email: string;
    company: string;
    deliveryPhoneNumber: string;
    language: string;
}

export interface BillingDetailsViewModel {
    salutation: string;
    firstName: string;
    surname: string;
    streetName: string;
    houseNumber: string;
    houseNumberExtension: string;
    extraAddressInformation: string;
    zipCode: string;
    city: string;
    countryCode: string;
    email: string;
    company: string;
    vatNumber: string;
    kvkNumber: string;
    orderReference: string;
}

export interface DetailOrderItemViewModel {
    orderItemId: string;
    cancellationRequest: boolean;
    fulfilment: {
      method: string;
      distributionParty: string;
      latestDeliveryDate: string;
      exactDeliveryDate: string;
      expiryDate: string;
      timeFrameType: string;
    },
    offer: {
        offerId: string;
    },
    quantity: number;
    quantityShipped: number;
    quantityCancelled: number;
    unitPrice: number;
}

export interface OrderDetailViewModel {
    orderId: string;
    orderPlacedDateTime: Date;
    shipmentDetails: ShipmentDetailsViewModel;
    billingDetails: BillingDetailsViewModel;
    orderItems?: DetailOrderItemViewModel[];
  }
