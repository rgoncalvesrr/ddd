import {
    BelongsTo,
    Column,
    ForeignKey,
    Model,
    PrimaryKey,
    Table
    } from 'sequelize-typescript';
import { OrderModel } from './order.model';
import { ProductModel } from '../../../product/repository/sequelize/product.model';

@Table(
    {
        tableName: "order_items",
        timestamps: false,
    })
export class OrderItemModel extends Model {

    @PrimaryKey
    @Column
    declare id: string;

    @ForeignKey(() => ProductModel)
    @Column({ allowNull: false })
    declare product_id: string;

    @BelongsTo(() => ProductModel)
    declare product: ProductModel;

    @ForeignKey(() => OrderModel)
    @Column({ allowNull: false })
    declare order_id: string;

    @BelongsTo(() => OrderModel)
    declare order: OrderModel;

    @Column({ allowNull: false })
    declare name: string;

    @Column({ allowNull: false, defaultValue: 0 })
    declare quantity: number;

    @Column({ allowNull: false, defaultValue: 0 })
    declare price: number;
}