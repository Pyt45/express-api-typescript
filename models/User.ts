import { sequelize } from "../instance/instance";
import { Model, DataTypes } from "sequelize";

export class User extends Model {}

User.init({
    email: DataTypes.STRING,
    password: DataTypes.STRING,
}, { sequelize, modelName: 'User' });

(async () => {
    sequelize.sync();
})();