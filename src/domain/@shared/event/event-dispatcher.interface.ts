import { IEvent } from './event.interface';
import { IEventHandler } from './event-handler.interface';

export interface IEventDispatcher {
    handlers: { [eventName: string]: IEventHandler[] };

    notify(event: IEvent): void;
    register(eventName: string, handler: IEventHandler): void;
    unregister(eventName: string, handler: IEventHandler): void;
    unregisterAll(): void;
}