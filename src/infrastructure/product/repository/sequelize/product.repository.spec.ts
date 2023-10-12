import { IProductRepository } from '../../../../domain/product/repository/product.repository.interface';
import { Product } from '../../../../domain/product/entity/product';
import { ProductModel } from './product.model';
import { ProductRepository } from './product.repository';
import { Sequelize } from 'sequelize-typescript';
import { v4 as uuid } from 'uuid';

describe("Product Repository unit tests", () => {
    let sequelize: Sequelize;
    let productRepository: IProductRepository;
    let product1: Product;

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: 'sqlite',
            storage: ':memory:',
            logging: false,
            sync: { force: true }
        });

        sequelize.addModels([ProductModel]);
        await sequelize.sync();

        productRepository = new ProductRepository();
        product1 = new Product(uuid(), "Product1", 10);
    });

    afterEach(async () => {
        await sequelize.close();
    });

    it("Should create a product", async () => {
        await productRepository.create(product1);

        const productModel = await ProductModel.findOne({ where: { id: product1.id } });

        expect(productModel.toJSON()).toStrictEqual({ id: product1.id, name: product1.name, price: product1.price });
    });

    it("Should update a product", async () => {
        await productRepository.create(product1);

        let productModel = await ProductModel.findOne({ where: { id: product1.id } });

        expect(productModel.toJSON()).toStrictEqual({
            id: product1.id,
            name: "Product1",
            price: 10
        });

        product1.changeName("Product Changed");
        product1.changePrice(200);

        await productRepository.update(product1);

        productModel = await ProductModel.findOne({ where: { id: product1.id } });

        expect(productModel.toJSON()).toStrictEqual({
            id: product1.id,
            name: "Product Changed",
            price: 200
        });

    });

    it("Should find a product", async () => {
        await productRepository.create(product1);

        const productModel = await ProductModel.findOne({ where: { id: product1.id } });
        const actualProduct = await productRepository.find(product1.id);

        expect(productModel.toJSON()).toStrictEqual({
            id: actualProduct.id,
            name: actualProduct.name,
            price: actualProduct.price
        });
    });

    it("Should find all products", async () => {
        const product2 = new Product(uuid(), "Product 2", 20);

        await productRepository.create(product1);
        await productRepository.create(product2);

        const foundProducts = await productRepository.findAll();
        const products = [product1, product2];

        expect(products).toEqual(foundProducts);
    });

});