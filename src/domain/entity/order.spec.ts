import { Order } from "./order";
import { OrderItem } from "./order.item";

describe("Order unit tests", () => {
    it("should throw error when id is empty", () => {
        expect(() => {
            const order = new Order("", "", []);
        }).toThrowError("Id is required");
    });

    it("should throw error when customerId is empty", () => {
        expect(() => {
            const order = new Order("123", "", []);
        }).toThrowError("CustomerId is required");
    });

    it("should calculate total", () => {
        const order = new Order("123", "123",
            [new OrderItem("1", "Leite", "001", 1, 4.00),
            new OrderItem("2", "Arroz", "002", 1, 10.00),
            ]);

        expect(order.total()).toEqual(14.00);
    });

    it("should throw error if the item quantity is less or equal zero", () => {
        expect(() => {
            const item = new OrderItem("123", "123", "123", -1, 10);
        }).toThrowError("Quantity must be greater than zero");
    });

});