export interface OrderItemViewModel {
    orderItemId: string;
}

export interface OrderViewModel {
    orderId: string;
    orderPlacedDateTime: string;
    orderItems?: OrderItemViewModel[];
}
