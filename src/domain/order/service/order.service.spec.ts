import { Customer } from '../../customer/entity/customer';
import { Order } from '../entity/order';
import { OrderItem } from '../entity/order.item';
import { OrderService } from './order.service';

describe("Order Service unit tests", () => {

    it("Should place an order", () => {
        const customer = new Customer("1", "Ricardo");
        const item1 = new OrderItem("i1", "Item 1", "p1", 1, 10);

        const order = OrderService.placeOrder(customer, [item1]);

        expect(customer.rewardsPoints).toBe(5);
        expect(order.total()).toBe(10);
    });

    it("should get total of all orders", () => {
        const item1 = new OrderItem("item1", "Item 1", "1", 2, 10);
        const item2 = new OrderItem("item2", "Item 2", "2", 2, 20);

        const order1 = new Order("ordem1", "123", [item1]);
        const order2 = new Order("ordem2", "123", [item2]);

        const total = OrderService.total([order1, order2]);

        expect(total).toBe(60);
    });
});