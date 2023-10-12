import { Address } from "../value-object/address";

export class Customer {
    private _id: string;
    private _name: string;
    private _address?: Address;
    private _active: boolean = false;
    private _rewardsPoints: number = 0;

    constructor(id: string, name: string) {
        this._id = id;
        this._name = name;
        this.validate();
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