import { IEventHandler } from "../../../@shared/event/event-handler.interface";
import { ProductCreatedEvent } from "../product-created.event";

export class SendEmailWhenProductIsCreateHandler implements IEventHandler<ProductCreatedEvent> {
    handle(event: ProductCreatedEvent): void {
        console.log(`Sending e-mail to ${JSON.stringify(event.data)}`);
    }

}