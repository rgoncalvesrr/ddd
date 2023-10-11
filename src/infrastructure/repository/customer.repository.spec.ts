import { Sequelize } from "sequelize-typescript";
import { v4 as uuid } from "uuid";
import { CustomerModel } from "../db/sequelize/model/customer.model";
import { CustomerRepository } from "./customer.repository";
import { Customer } from "../../domain/entity/customer";
import { Address } from "../../domain/entity/address";

describe("Customer Repository unit tests", () => {
    let sequelize: Sequelize;

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: 'sqlite',
            storage: ':memory:',
            logging: false,
            sync: { force: true }
        });

        sequelize.addModels([CustomerModel]);
        await sequelize.sync();
    });

    afterEach(async () => {
        await sequelize.close();
    });

    it("Should create a customer", async () => {
        const customerRepository = new CustomerRepository();
        const customer = newCustomer();

        await customerRepository.create(customer);

        const customerModel = await CustomerModel.findOne({ where: { id: customer.id } });

        expect(customerModel.toJSON()).toStrictEqual(
            {
                id: customer.id,
                name: customer.name,
                street: customer.address.street,
                number: customer.address.number,
                zip: customer.address.zip,
                city: customer.address.city,
                active: customer.isActive,
                rewardsPoints: customer.rewardsPoints
            });
    });

    it("Should update a customer", async () => {
        const customerRepository = new CustomerRepository();
        const customer = newCustomer();

        await customerRepository.create(customer);

        let customerModel = await CustomerModel.findOne({ where: { id: customer.id } });

        expect(customerModel.toJSON()).toStrictEqual(
            {
                id: customer.id,
                name: customer.name,
                street: customer.address.street,
                number: customer.address.number,
                zip: customer.address.zip,
                city: customer.address.city,
                active: customer.isActive,
                rewardsPoints: customer.rewardsPoints
            });

        customer.changeName("Customer Changed");

        await customerRepository.update(customer);

        customerModel = await CustomerModel.findOne({ where: { id: customer.id } });

        expect(customerModel.toJSON()).toStrictEqual(
            {
                id: customer.id,
                name: customer.name,
                street: customer.address.street,
                number: customer.address.number,
                zip: customer.address.zip,
                city: customer.address.city,
                active: customer.isActive,
                rewardsPoints: customer.rewardsPoints
            });

    });

    it("Should find a customer", async () => {
        const customerRepository = new CustomerRepository();

        const customer = newCustomer();

        await customerRepository.create(customer);

        const customerModel = await CustomerModel.findOne({ where: { id: customer.id } });
        const actualProduct = await customerRepository.find(customer.id);

        expect(customerModel.toJSON()).toStrictEqual(
            {
                id: customer.id,
                name: customer.name,
                street: customer.address.street,
                number: customer.address.number,
                zip: customer.address.zip,
                city: customer.address.city,
                active: customer.isActive,
                rewardsPoints: customer.rewardsPoints
            });
    });

    it("Should find all customers", async () => {
        const customerRepository = new CustomerRepository();

        const c1 = newCustomer();
        const c2 = newCustomer();

        await customerRepository.create(c1);
        await customerRepository.create(c2);

        const foundCustomers = await customerRepository.findAll();
        const customers = [c1, c2];

        expect(customers).toHaveLength(2);
        expect(customers).toContain(c1);
        expect(customers).toContain(c2);
        expect(customers).toEqual(foundCustomers);
    });

    it("Should throw error when customer is not found", async () => {
        const repo = new CustomerRepository();
        expect(async () => {
            await repo.find("123");
        }).rejects.toThrowError("Customer not found");
    });



});

function newCustomer(): Customer {
    const customer = new Customer(uuid(), "Customer 1");
    const address = new Address("Rua 1", 123, "09195410", "São Paulo");

    customer.changeAddress(address);
    customer.addRewardsPoints(10);
    customer.activate();
    return customer;
}