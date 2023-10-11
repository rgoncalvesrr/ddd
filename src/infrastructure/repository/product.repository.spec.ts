import { Sequelize } from "sequelize-typescript";
import { ProductModel } from "../db/sequelize/model/product.model";
import { Product } from "../../domain/entity/product";
import { v4 as uuid } from "uuid";
import { ProductRepository } from "./product.repository";

describe("Product Repository unit tests", () => {
    let sequelize: Sequelize;

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: 'sqlite',
            storage: ':memory:',
            logging: false,
            sync: { force: true }
        });

        sequelize.addModels([ProductModel]);
        await sequelize.sync();
    });

    afterEach(async () => {
        await sequelize.close();
    });

    it("Should create a product", async () => {
        const productRepository = new ProductRepository();
        const product = new Product(uuid(), "Product1", 10);

        await productRepository.create(product);

        const productModel = await ProductModel.findOne({ where: { id: product.id } });

        expect(productModel.toJSON()).toStrictEqual({ id: product.id, name: product.name, price: product.price });
    });

    it("Should update a product", async () => {
        const productRepository = new ProductRepository();
        const product = new Product(uuid(), "Product1", 10);

        await productRepository.create(product);

        let productModel = await ProductModel.findOne({ where: { id: product.id } });

        expect(productModel.toJSON()).toStrictEqual({
            id: product.id,
            name: "Product1",
            price: 10
        });

        product.changeName("Product Changed");
        product.changePrice(200);

        await productRepository.update(product);

        productModel = await ProductModel.findOne({ where: { id: product.id } });

        expect(productModel.toJSON()).toStrictEqual({
            id: product.id,
            name: "Product Changed",
            price: 200
        });

    });

    it("Should find a product", async () => {
        const productRepository = new ProductRepository();

        const product = new Product(uuid(), "Product 1", 10);

        await productRepository.create(product);

        const productModel = await ProductModel.findOne({ where: { id: product.id } });
        const actualProduct = await productRepository.find(product.id);

        expect(productModel.toJSON()).toStrictEqual({
            id: actualProduct.id,
            name: actualProduct.name,
            price: actualProduct.price
        });
    });

    it("Should find all products", async () => {
        const productRepository = new ProductRepository();

        const p1 = new Product(uuid(), "Product 1", 10);
        const p2 = new Product(uuid(), "Product 2", 20);

        await productRepository.create(p1);
        await productRepository.create(p2);

        const foundProducts = await productRepository.findAll();
        const products = [p1, p2];

        expect(products).toEqual(foundProducts);
    });

});