import { Sequelize } from "sequelize-typescript";
import { CustomerModel } from "../db/sequelize/model/customer.model";
import { CustomerRepository } from "./customer.repository";
import { Customer } from "../../domain/entity/customer";
import { newCustomer } from "./repository.utils";
import { ICustomerRepository } from "../../domain/repository/customer.repository.interface";

describe("Customer Repository unit tests", () => {
    let sequelize: Sequelize;
    let customerRepository: ICustomerRepository;

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: 'sqlite',
            storage: ':memory:',
            logging: false,
            sync: { force: true }
        });

        sequelize.addModels([CustomerModel]);
        await sequelize.sync();

        customerRepository = new CustomerRepository();
    });

    afterEach(async () => {
        await sequelize.close();
    });

    it("Should create a customer", async () => {
        const customer = newCustomer();

        await customerRepository.create(customer);

        const customerModel = await CustomerModel.findOne({ where: { id: customer.id } });

        expect(customerModel.toJSON()).toStrictEqual(ToJSON(customer));
    });

    it("Should update a customer", async () => {
        const customer = newCustomer();

        await customerRepository.create(customer);

        let customerModel = await CustomerModel.findOne({ where: { id: customer.id } });

        expect(customerModel.toJSON()).toStrictEqual(ToJSON(customer));

        customer.changeName("Customer Changed");

        await customerRepository.update(customer);

        customerModel = await CustomerModel.findOne({ where: { id: customer.id } });

        expect(customerModel.toJSON()).toStrictEqual(ToJSON(customer));

    });

    it("Should find a customer", async () => {

        const customer = newCustomer();

        await customerRepository.create(customer);

        const customerModel = await CustomerModel.findOne({ where: { id: customer.id } });
        const actualProduct = await customerRepository.find(customer.id);

        expect(customerModel.toJSON()).toStrictEqual(ToJSON(customer));

    });

    it("Should find all customers", async () => {

        const c1 = newCustomer();
        const c2 = newCustomer();

        await customerRepository.create(c1);
        await customerRepository.create(c2);

        const foundCustomers = await customerRepository.findAll();
        const customers = [c1, c2];

        expect(foundCustomers).toHaveLength(2);
        expect(customers).toEqual(foundCustomers);
    });

    it("Should throw error when customer is not found", async () => {
        expect(async () => {
            await customerRepository.find("123");
        }).rejects.toThrowError("Customer not found");
    });
});

function ToJSON(customer: Customer): any {
    return {
        id: customer.id,
        name: customer.name,
        street: customer.address.street,
        number: customer.address.number,
        zip: customer.address.zip,
        city: customer.address.city,
        active: customer.isActive,
        rewardsPoints: customer.rewardsPoints
    }
}