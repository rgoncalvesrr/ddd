import { Address } from '../../../domain/customer/value-object/address';
import { Customer } from '../../../domain/customer/entity/customer';
import { IEventHandler } from '../../../domain/@shared/event/event-handler.interface';
import { v4 as uuid } from 'uuid';

export function newCustomer(events: { [eventName: string]: IEventHandler[] } = {}): Customer {
    const customer = new Customer(uuid(), "Customer 1", events);
    const address = new Address("Rua 1", 123, "09195410", "São Paulo");

    customer.changeAddress(address);
    customer.addRewardsPoints(10);
    customer.activate();
    return customer;
}