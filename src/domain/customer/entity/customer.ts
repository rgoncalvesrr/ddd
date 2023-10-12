import { Address } from '../value-object/address';
import { CustomerAddressChangedEvent } from './../event/customer-address-changed.event';
import { CustomerCreatedEvent } from '../event/customer-created.event';
import { EventDispatcher } from '../../@shared/event/event-dispatcher';
import { IEventDispatcher } from '../../@shared/event/event-dispatcher.interface';
import { IEventHandler } from '../../@shared/event/event-handler.interface';

export class Customer {
    private _id: string;
    private _name: string;
    private _address?: Address;
    private _active: boolean = false;
    private _rewardsPoints: number = 0;
    private _eventDispatcher: IEventDispatcher;

    constructor(id: string, name: string, eventList: { [eventName: string]: IEventHandler[] } = {}) {
        this._id = id;
        this._name = name;
        this._eventDispatcher = new EventDispatcher(eventList);
        this.validate();

        this._eventDispatcher.notify(new CustomerCreatedEvent(this));
    }

    validate() {
        if (this._id.length === 0)
            throw new Error("ID is required");

        if (this._name.length === 0)
            throw new Error("Name is required");

        if (this._active && this._address === undefined)
            throw new Error("Address is mandatory to activate customer");
    }

    changeName(name: string) {
        this._name = name;
        this.validate();
    }

    activate() {
        this._active = true;
        this.validate();
    }

    deactivate() {
        this._active = false;
    }

    addRewardsPoints(points: number) {
        this._rewardsPoints += points;
        this.validate();
    }

    changeAddress(address: Address) {
        this._address = address;

        this._eventDispatcher.notify(
            new CustomerAddressChangedEvent({
                id: this._id,
                name: this._name,
                address: this.address.toString()
            }));
    }

    get id(): string {
        return this._id;
    }

    get name(): string {
        return this._name;
    }

    get address(): Address | undefined {
        return this._address;
    }

    get isActive(): boolean {
        return this._active;
    }

    get rewardsPoints(): number {
        return this._rewardsPoints;
    }
}