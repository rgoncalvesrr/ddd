import { Address } from "./address";
import { Customer } from "./customer";

describe("Customer unit tests", () => {
    it("should throw error when id is empty", () => {
        expect(() => {
            let customer = new Customer("", "Conceitho Tecnologia");
        }).toThrowError("ID is required");
    });

    it("should throw error when name is empty", () => {
        expect(() => {
            let customer = new Customer("123", "");
        }).toThrowError("Name is required");
    });

    it("should change name", () => {

        let customer = new Customer("123", "Conceitho Tecnologia");

        expect(customer.name).toBe("Conceitho Tecnologia");

        customer.changeName("Conceitho")

        expect(customer.name).toBe("Conceitho");
    });

    it("should activate customer", () => {

        const customer = new Customer("123", "Conceitho Tecnologia");
        customer.address = new Address("Rua Coroados", 315, "09195410", "Santo André");
        customer.activate();

        expect(customer.isActive).toBe(true);
    });

    it("should throw error when address undefined activate customer", () => {
        expect(() => {
            const customer = new Customer("123", "Conceitho Tecnologia");
            customer.activate();
        }).toThrowError("Address is mandatory to activate customer");
    });

    it("should deactivate customer", () => {

        const customer = new Customer("123", "Conceitho Tecnologia");
        customer.deactivate();

        expect(customer.isActive).toBe(false);
    });
});