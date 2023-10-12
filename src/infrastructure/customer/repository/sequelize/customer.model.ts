import {
    Column,
    Model,
    PrimaryKey,
    Table
} from 'sequelize-typescript';

@Table(
    {
        tableName: "customers",
        timestamps: false,
    })
export class CustomerModel extends Model {

    @PrimaryKey
    @Column({ allowNull: false })
    id: string;

    @Column({ allowNull: false })
    name: string;

    @Column({ allowNull: false })
    street: string;

    @Column({ allowNull: false })
    number: number;

    @Column({ allowNull: false })
    zip: string;

    @Column({ allowNull: false })
    city: string;

    @Column({ allowNull: false, defaultValue: false })
    active: boolean;

    @Column({ allowNull: false, defaultValue: 0 })
    rewardsPoints: number;
}