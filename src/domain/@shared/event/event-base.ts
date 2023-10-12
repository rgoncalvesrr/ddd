import { IEvent } from "./event.interface";

export class EventBase implements IEvent {
    private _registeredAt: Date;
    private _data: any;

    constructor(data: any) {
        this._data = data;
        this._registeredAt = new Date();
    }

    get registeredAt(): Date {
        return this._registeredAt;
    }

    get data(): any {
        return this._data;
    }

}