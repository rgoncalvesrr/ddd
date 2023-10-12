import { IEvent } from "./event.interface";

export interface IEventHandler<T extends IEvent = IEvent> {
    handle(event: T): void;
}