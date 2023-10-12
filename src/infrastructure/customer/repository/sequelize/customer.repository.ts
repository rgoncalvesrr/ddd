import { Address } from '../../../../domain/customer/value-object/address';
import { Customer } from '../../../../domain/customer/entity/customer';
import { CustomerModel } from './customer.model';
import { ICustomerRepository } from '../../../../domain/customer/repository/customer.repository.interface';

export class CustomerRepository implements ICustomerRepository {
    async create(entity: Customer): Promise<void> {
        await CustomerModel.create(
            {
                id: entity.id,
                name: entity.name,
                street: entity.address.street,
                number: entity.address.number,
                zip: entity.address.zip,
                city: entity.address.city,
                active: entity.isActive,
                rewardsPoints: entity.rewardsPoints
            });
    }
    async update(entity: Customer): Promise<void> {
        await CustomerModel.update(
            {
                name: entity.name,
                street: entity.address.street,
                number: entity.address.number,
                zip: entity.address.zip,
                city: entity.address.city,
                active: entity.isActive,
                rewardsPoints: entity.rewardsPoints
            },
            {
                where:
                    { id: entity.id }
            });
    }

    async find(id: string): Promise<Customer> {
        try {
            const customerModel = await CustomerModel.findOne({ where: { id }, rejectOnEmpty: true });

            return this.mapModelToEntity(customerModel);
        } catch (e) {
            throw new Error("Customer not found")
        }
    }

    async findAll(): Promise<Customer[]> {
        const products = await CustomerModel.findAll();
        return products.map(customerModel => this.mapModelToEntity(customerModel));
    }

    private mapModelToEntity(model: CustomerModel): Customer {
        const customer = new Customer(
            model.id,
            model.name);

        customer.changeAddress(new Address(
            model.street,
            model.number,
            model.zip,
            model.city));

        customer.addRewardsPoints(model.rewardsPoints);

        if (model.active)
            customer.activate();
        else
            customer.deactivate();

        return customer;
    }

}