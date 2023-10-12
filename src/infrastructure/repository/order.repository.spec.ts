import { IOrderRepository } from './../../domain/repository/order.repository.interface';
import { ProductRepository } from './product.repository';
import { v4 as uuid } from "uuid";
import { Sequelize } from "sequelize-typescript";
import { OrderModel } from "../db/sequelize/model/order.model";
import { OrderItemModel } from "../db/sequelize/model/order-item.model";
import { CustomerModel } from "../db/sequelize/model/customer.model";
import { ProductModel } from "../db/sequelize/model/product.model";
import { CustomerRepository } from "./customer.repository";
import { newCustomer } from "./repository.utils";
import { Product } from "../../domain/entity/product";
import { OrderItem } from '../../domain/entity/order.item';
import { OrderService } from '../../domain/service/order.service';
import { OrderRepository } from './order.repository';
import { ICustomerRepository } from '../../domain/repository/customer.repository.interface';
import { IProductRepository } from '../../domain/repository/product.repository.interface';
import { Customer } from '../../domain/entity/customer';
import { Order } from '../../domain/entity/order';

describe("Order Repository unit tests", () => {
    let sequelize: Sequelize;
    let customerRepository: ICustomerRepository;
    let productRepository: IProductRepository;
    let orderRepository: IOrderRepository;
    let customer: Customer;
    let product1: Product;

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: 'sqlite',
            storage: ':memory:',
            logging: false,
            sync: { force: true }
        });

        sequelize.addModels([OrderModel, OrderItemModel, CustomerModel, ProductModel]);
        await sequelize.sync();

        // Preparando repositórios
        customerRepository = new CustomerRepository();
        productRepository = new ProductRepository();
        orderRepository = new OrderRepository();

        // Criando um cliente
        customer = newCustomer();
        await customerRepository.create(customer);

        // Criando um produto
        product1 = new Product(uuid(), "Produto 1", 10);
        await productRepository.create(product1);

    });

    afterEach(async () => {
        await sequelize.close();
    });

    it("Should create a new order", async () => {
        // Criando um item
        const item = new OrderItem(uuid(), product1.name, product1.id, 2, product1.price);

        // Criando uma ordem
        const order = OrderService.placeOrder(customer, [item]);

        // Persistindo a ordem
        await orderRepository.create(order);

        // Recuperando a ordem do banco de dados
        const orderModel = await OrderModel.findOne({
            where:
            {
                id: order.id
            },
            include: ["items"]
        });

        // Comparando a ordem recuperado com a ordem em memória
        expect(orderModel.toJSON()).toStrictEqual(entityToJSON(order));
    });

    it("Should find a order", async () => {
        // Criando um segundo produto para ser usado no segundo item da ordem
        // O primeiro produto é criado e persistido antes de cada teste
        const product2 = new Product(uuid(), "Produto 2", 20);
        await productRepository.create(product2);

        // Criando os itens da ordem
        const item1 = new OrderItem(
            uuid(),
            product1.name,
            product1.id,
            2,
            product1.price);

        const item2 = new OrderItem(
            uuid(),
            product2.name,
            product2.id,
            3,
            product2.price);

        // Usando serviço de domínio para criar a ordem
        const order = OrderService.placeOrder(customer, [item1, item2]);
        await orderRepository.create(order);

        // Recuperando a ordem recém criada do banco de dados
        const orderModel = await OrderModel.findOne({
            where:
            {
                id: order.id
            },
            include: ["items"]
        });

        // Recuperando a ordem recém criada via repositório
        const foundOrder = await orderRepository.find(order.id)

        // Verificando se o conteúdo é o mesmo
        expect(orderModel.toJSON()).toStrictEqual(entityToJSON(foundOrder));

        // Verificando se a quantidade de itens é a mesma
        expect(foundOrder.items).toHaveLength(order.items.length);

        // Verificando se os itens são os mesmos
        expect(order.items).toEqual(foundOrder.items);
    });

    it("Should find all orders", async () => {
        // Criando um segundo produto para ser usado no segundo item da ordem
        // O primeiro produto é criado e persistido antes de cada teste
        const product2 = new Product(uuid(), "Produto 2", 20);
        await productRepository.create(product2);

        // Criando os itens da ordem
        const item1 = new OrderItem(
            uuid(),
            product1.name,
            product1.id,
            2,
            product1.price);

        const item2 = new OrderItem(
            uuid(),
            product2.name,
            product2.id,
            3,
            product2.price);

        const item3 = new OrderItem(
            uuid(),
            product1.name,
            product1.id,
            5,
            product1.price);

        // Usando serviço de domínio para criar a ordem
        const order1 = OrderService.placeOrder(customer, [item1, item2]);
        const order2 = OrderService.placeOrder(customer, [item3]);
        await orderRepository.create(order1);
        await orderRepository.create(order2);

        // Recuperando a ordem recém criada do banco de dados
        const ordersModel = await OrderModel.findAll({ include: ["items"] });

        // Recuperando a ordem recém criada via repositório
        const foundOrders = await orderRepository.findAll()

        // Verificando se o conteúdo é o mesmo
        expect(ordersModel).toHaveLength(foundOrders.length);
    });

    it("Should update a order", async () => {
        // Criando um segundo produto para ser usado no segundo item da ordem
        // O primeiro produto é criado e persistido antes de cada teste
        const product2 = new Product(uuid(), "Produto 2", 20);
        await productRepository.create(product2);

        // Criando os itens da ordem
        const item1 = new OrderItem(
            uuid(),
            product1.name,
            product1.id,
            2,
            product1.price);

        const item2 = new OrderItem(
            uuid(),
            product2.name,
            product2.id,
            3,
            product2.price);

        // Usando serviço de domínio para criar a ordem
        const order = OrderService.placeOrder(customer, [item1]);
        await orderRepository.create(order);

        // Recuperando a ordem recém criada do banco de dados
        let orderModel = await OrderModel.findOne({
            where:
            {
                id: order.id
            },
            include: ["items"]
        });

        // Recuperando a ordem recém criada via repositório
        let foundOrder = await orderRepository.find(order.id)

        // Verificando se o conteúdo é o mesmo
        expect(orderModel.toJSON()).toStrictEqual(entityToJSON(foundOrder));

        // Verificando se a quantidade de itens é a mesma
        expect(foundOrder.items).toHaveLength(order.items.length);

        // Verificando se os itens são os mesmos
        expect(order.items).toEqual(foundOrder.items);

        order.items.push(item2);

        await orderRepository.update(order);

        // Recuperando a ordem recém criada do banco de dados
        orderModel = await OrderModel.findOne({
            where:
            {
                id: order.id
            },
            include: ["items"]
        });

        // Recuperando a ordem recém criada via repositório
        foundOrder = await orderRepository.find(order.id)

        // Verificando se o conteúdo é o mesmo
        expect(orderModel.toJSON()).toStrictEqual(entityToJSON(foundOrder));

        // Verificando se a quantidade de itens é a mesma
        expect(foundOrder.items).toHaveLength(order.items.length);

        // Verificando se os itens são os mesmos
        expect(order.items).toEqual(foundOrder.items);



    });
});

function entityToJSON(entity: Order): any {
    return {
        id: entity.id,
        customer_id: entity.customerId,
        total: entity.total(),
        items: entity.items.map(item => ({
            id: item.id,
            name: item.name,
            order_id: entity.id,
            product_id: item.productId,
            quantity: item.quantity,
            price: item.price
        }))
    };
}