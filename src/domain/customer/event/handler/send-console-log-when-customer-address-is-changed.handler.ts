import { CustomerAddressChangedEvent } from './../customer-address-changed.event';
import { IEventHandler } from '../../../@shared/event/event-handler.interface';

export class SendConsoleLogWhenCustomerAddressIsChangedHandler implements IEventHandler<CustomerAddressChangedEvent> {
    handle(event: CustomerAddressChangedEvent): void {
        console.log(`Endereço do cliente: ${event.data.id}, ${event.data.name} alterado para: ${event.data.address}`);
    }
}