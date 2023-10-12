import { IEventHandler } from "./event-handler.interface";
import { IEvent } from "./event.interface";

export interface IEventDispatcher {
    notify(event: IEvent): void;
    register(eventName: string, handler: IEventHandler): void;
    unregister(eventName: string, handler: IEventHandler): void;
    unregisterAll(): void;
}