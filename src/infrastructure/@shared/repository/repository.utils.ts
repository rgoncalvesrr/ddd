import { Address } from '../../../domain/customer/value-object/address';
import { Customer } from '../../../domain/customer/entity/customer';
import { v4 as uuid } from 'uuid';

export function newCustomer(): Customer {
    const customer = new Customer(uuid(), "Customer 1");
    const address = new Address("Rua 1", 123, "09195410", "São Paulo");

    customer.changeAddress(address);
    customer.addRewardsPoints(10);
    customer.activate();
    return customer;
}