import { v4 as uuid } from "uuid";

import { Order } from "../order/entity/order";
import { Customer } from "../customer/entity/customer";
import { OrderItem } from "../order/entity/order.item";

export class OrderService {
    static total(orders: Order[]): number {
        return orders.reduce((acc, item) => acc + item.total(), 0);
    }

    static placeOrder(customer: Customer, items: OrderItem[]): Order {
        if (items.length === 0)
            throw new Error("Order must have at least one item");

        const order = new Order(uuid(), customer.id, items);
        customer.addRewardsPoints(order.total() / 2);

        return order;
    }
}
