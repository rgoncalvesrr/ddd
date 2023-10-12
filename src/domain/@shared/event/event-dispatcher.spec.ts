import { EventDispatcher } from './event-dispatcher';
import { IEventDispatcher } from './event-dispatcher.interface';
import { IEventHandler } from './event-handler.interface';
import { ProductCreatedEvent } from '../../product/event/product-created.event';
import { SendEmailWhenProductIsCreateHandler } from '../../product/event/handler/send-email-when-product-is-created.handler';
import { v4 as uuid } from 'uuid';

describe("Domain Event unit tests", () => {
    let eventDispatcher: IEventDispatcher;
    let eventHandler: IEventHandler;

    beforeEach(() => {
        eventDispatcher = new EventDispatcher();
        eventHandler = new SendEmailWhenProductIsCreateHandler();
    })

    it("Should register an event handler", () => {
        const eventName = "ProductCreatedEvent";

        // Tenta registrar o evento
        eventDispatcher.register(eventName, eventHandler);

        // Verifica se está definido
        expect(eventDispatcher.handlers[eventName]).toBeDefined();

        // Verificar se há apenas um evento registrado
        expect(eventDispatcher.handlers[eventName].length).toBe(1);

        // Verifica se o eventHandler registrado é o mesmo que foi passado no método
        // register
        expect(eventDispatcher.handlers[eventName][0]).toMatchObject(eventHandler);
    });

    it("Should unregister an event handler", () => {
        const eventName = "ProductCreatedEvent";

        eventDispatcher.register(eventName, eventHandler);

        expect(eventDispatcher.handlers[eventName]).toBeDefined();
        expect(eventDispatcher.handlers[eventName].length).toBe(1);
        expect(eventDispatcher.handlers[eventName][0]).toMatchObject(eventHandler);

        eventDispatcher.unregister(eventName, eventHandler);

        expect(eventDispatcher.handlers[eventName]).toBeDefined();
        expect(eventDispatcher.handlers[eventName].length).toBe(0);
    });

    it("Should unregister all events", () => {
        const eventName = "ProductCreatedEvent";

        eventDispatcher.register(eventName, eventHandler);

        expect(eventDispatcher.handlers[eventName]).toBeDefined();
        expect(eventDispatcher.handlers[eventName].length).toBe(1);
        expect(eventDispatcher.handlers[eventName][0]).toMatchObject(eventHandler);

        eventDispatcher.unregisterAll();

        expect(eventDispatcher.handlers[eventName]).toBeUndefined();
    });

    it("Should notify all event handlers", () => {
        const eventName = "ProductCreatedEvent";
        const spyEventHandler = jest.spyOn(eventHandler, "handle");

        eventDispatcher.register(eventName, eventHandler);

        expect(eventDispatcher.handlers[eventName]).toBeDefined();
        expect(eventDispatcher.handlers[eventName].length).toBe(1);
        expect(eventDispatcher.handlers[eventName][0]).toMatchObject(eventHandler);

        const productCreatedEvent = new ProductCreatedEvent({
            id: uuid(),
            name: "Produto 1",
            price: 10,
            email: "comprador@dominio.com"
        });

        // quanto o notify é executado o SendEMailProductIsCreatedHandler.handle() deve ser chamado
        eventDispatcher.notify(productCreatedEvent);

        expect(spyEventHandler).toBeCalled();
    });
})