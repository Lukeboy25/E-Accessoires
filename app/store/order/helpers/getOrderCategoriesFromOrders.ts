import { SearchableOption } from '../../../compositions/types';
import { OrderViewModel } from '../../../entities/Order/Order';
import { DetailOrderItemViewModel } from '../../../entities/Order/OrderDetail';

export const getOrderCategoriesFromOrders = (orderArray: OrderViewModel[]): SearchableOption[] => {
    const orderCategories: SearchableOption[] = [];

    orderArray.map((openOrderItem: OrderViewModel) => openOrderItem.orderItems.map((detailOrderItem: DetailOrderItemViewModel) => {
        const orderCategoryTitle = detailOrderItem.product.title.split('-', 1)[0].trim();

        if (!orderCategories.find((orderCategory => orderCategory.label === orderCategoryTitle))) {
            orderCategories.push({ id: detailOrderItem.orderItemId, label: orderCategoryTitle });
        }
    }));

    return orderCategories;
};
