import { OrderItem } from "./order.item";

export class Order {
    private _id: string;
    private _customerId: string;
    private _items: OrderItem[] = [];

    constructor(id: string, CustomerId: string, items: OrderItem[]) {
        this._id = id;
        this._customerId = CustomerId;
        this._items = items;
        this.validate();
    }

    get id(): string {
        return this._id;
    }

    get customerId(): string {
        return this._customerId;
    }

    get items(): OrderItem[] {
        return this._items;
    }

    total(): number {
        return this._items.reduce((acc, item) => acc + item.total(), 0);
    }

    validate() {
        if (this._id.length === 0)
            throw new Error("Id is required");

        if (this._customerId.length === 0)
            throw new Error("CustomerId is required");
    }
}