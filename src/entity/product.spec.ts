import { Product } from "./product";

describe("Product unit tests", () => {
    it("Should throw error when id is empty", () => {

        expect(() => {
            const product = new Product("", "Arroz", 10);

        }).toThrowError("Id is required");

    });

    it("Should throw error when name is empty", () => {

        expect(() => {
            const product = new Product("123", "", 10);

        }).toThrowError("Name is required");

    });

    it("Should price greater than zero", () => {
        const product = new Product("1", "Arroz", 10);

        expect(product.price).toBeGreaterThan(0);
    });

    it("Should throw error price less or equal than zero", () => {
        expect(() => {
            const product = new Product("1", "Arroz", 0);
        }).toThrowError("Price must be greater then zero");
    });

    it("Should change name", () => {
        let expectedName = "Feijão";
        const product = new Product("1", "Arroz", 10);

        product.changeName(expectedName);

        expect(product.name).toBe(expectedName);
    });

    it("Should change price", () => {
        let expectedPrice = 100;
        const product = new Product("1", "Arroz", 10);

        product.changePrice(100);

        expect(product.price).toEqual(expectedPrice);
    });
});