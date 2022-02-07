export interface StockViewModel {
    amount: number;
    correctedStock: number;
    managedByRetailer: boolean;
}

export interface FulfilmentViewModel {
    method: string;
    deliveryCode: string;
}

export interface OfferViewModel {
    offerId: string;
    ean: number;
    stock: StockViewModel;
    fulfilment: FulfilmentViewModel;
}
