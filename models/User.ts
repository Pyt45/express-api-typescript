import { sequelize } from "../instance/instance";
import { Model, DataTypes } from "sequelize";

export class User extends Model {
    public id!: number;
    public email!: string;
    public password!: string;
}

User.init({
    email: DataTypes.STRING,
    password: DataTypes.STRING,
}, { sequelize, modelName: 'User' });

// (async () => {
//     sequelize.sync();
// })();