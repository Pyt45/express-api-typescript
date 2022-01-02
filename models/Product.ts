import { sequelize } from "../instance/instance";
import { Model, DataTypes } from "sequelize";

export class Product extends Model {
    public id!: number;
    public name!: string;
    public type!: string;
    public reference!: string;
    public price!: number;
    public description!: string;
    public avatar!: string;
}

Product.init({
    name: DataTypes.STRING,
    type: DataTypes.STRING,
    reference: DataTypes.STRING,
    price: DataTypes.INTEGER,
    description: DataTypes.STRING,
    avatar: DataTypes.STRING,
}, { sequelize, modelName: 'Product' });

// (async () => {
//     sequelize.sync();
// })();