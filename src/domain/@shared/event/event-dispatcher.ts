import { IEvent } from './event.interface';
import { IEventDispatcher } from './event-dispatcher.interface';
import { IEventHandler } from './event-handler.interface';

export class EventDispatcher implements IEventDispatcher {

    private _eventHandlers: { [eventName: string]: IEventHandler[] } = {};

    notify(event: IEvent): void {
        if (this._eventHandlers[event.constructor.name]) {
            this._eventHandlers[event.constructor.name].forEach(eventHandler => eventHandler.handle(event))
        }
    }

    register(eventName: string, handler: IEventHandler<IEvent>): void {
        if (!this._eventHandlers[eventName])
            this._eventHandlers[eventName] = [];

        this._eventHandlers[eventName].push(handler);
    }

    unregister(eventName: string, handler: IEventHandler<IEvent>): void {
        if (this._eventHandlers[eventName]) {
            const index = this._eventHandlers[eventName].indexOf(handler);
            if (index !== -1)
                this._eventHandlers[eventName].splice(index, 1);
        }
    }

    unregisterAll(): void {
        this._eventHandlers = {};
    }

    get handlers(): { [eventName: string]: IEventHandler[] } {
        return this._eventHandlers;
    }

}