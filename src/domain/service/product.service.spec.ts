import { Product } from "../entity/product";
import { ProductService } from "./product.service";

describe("Produto Service unit tests", () => {
    it("Should change the prices of all products", () => {
        const p1 = new Product("1", "Arroz", 10);
        const p2 = new Product("2", "Feijão", 20);
        const p3 = new Product("3", "Óleo", 20);

        const products = [p1, p2, p3];

        ProductService.increasePrice(products, 10);

        expect(p1.price).toBe(11);
        expect(p2.price).toBe(22);
        expect(p3.price).toBe(22);

    });
});