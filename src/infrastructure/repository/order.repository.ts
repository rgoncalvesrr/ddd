import { Customer } from './../../domain/entity/customer';
import { OrderItem } from './../../domain/entity/order.item';
import { Order } from "../../domain/entity/order";
import { IOrderRepository } from "../../domain/repository/order.repository.interface";
import { OrderItemModel } from "../db/sequelize/model/order-item.model";
import { OrderModel } from "../db/sequelize/model/order.model";
import { Model } from 'sequelize';

export class OrderRepository implements IOrderRepository {
    async create(entity: Order): Promise<void> {
        await OrderModel.create(
            {
                id: entity.id,
                customer_id: entity.customerId,
                total: entity.total(),
                items: entity.items.map(item => ({
                    id: item.id,
                    name: item.name,
                    product_id: item.productId,
                    quantity: item.quantity,
                    price: item.price,
                }))
            },
            {
                include: [{ model: OrderItemModel }]
            });
    }

    async update(entity: Order): Promise<void> {
        entity.items.map(async (item) => {
            await OrderItemModel.upsert({
                id: item.id,
                order_id: entity.id,
                product_id: item.productId,
                name: item.name,
                quantity: item.quantity,
                price: item.price
            });
        });

        await OrderModel.update({ total: entity.total() }, { where: { id: entity.id } });
    }

    async find(id: string): Promise<Order> {
        const orderModel = await OrderModel.findOne(
            {
                where: { id },
                include: [{ model: OrderItemModel }]
            });

        return this.mapModelToEntity(orderModel);
    }

    async findAll(): Promise<Order[]> {
        return (await OrderModel.findAll(
            { include: [{ model: OrderItemModel }] }
        )).map(order => this.mapModelToEntity(order));
    }

    private mapModelToEntity(orderModel: OrderModel): Order {
        return new Order(orderModel.id, orderModel.customer_id,
            orderModel.items.map(item => (
                new OrderItem(item.id, item.name, item.product_id, item.quantity, item.price))));
    }

}