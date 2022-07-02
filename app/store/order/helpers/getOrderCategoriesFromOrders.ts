import { OrderViewModel } from '../../../entities/Order/Order';
import { DetailOrderItemViewModel } from '../../../entities/Order/OrderDetail';

export const getOrderCategoriesFromOrders = (orderArray: OrderViewModel[]): string[] => {
    const orderCategories = [];

    orderArray.map(
        (openOrderItem: OrderViewModel) => openOrderItem.orderItems.map((detailOrderItem: DetailOrderItemViewModel) => {
            const orderCategoryTitle = detailOrderItem.product.title.split('-', 1)[0].trim();

            return orderCategories.push(orderCategoryTitle);
        }),
    );

    return [...new Set(orderCategories)];
};
