import { BillingDetailsViewModel, DetailOrderItemViewModel, ShipmentDetailsViewModel } from './OrderDetail';

export interface OrderItemViewModel {
    orderItemId: string;
    quantityShipped: number;
}

export interface OrdersViewModel {
    orderId: string;
    orderPlacedDateTime: string;
    orderItems?: OrderItemViewModel[];
}

export interface OrderViewModel {
    orderId: string;
    orderPlacedDateTime: Date;
    shipmentDetails: ShipmentDetailsViewModel;
    billingDetails: BillingDetailsViewModel;
    orderItems: DetailOrderItemViewModel[];
}
