import { Sequelize } from 'sequelize';
import * as dotenv from 'dotenv';
dotenv.config();

export const sequelize = new Sequelize('api_db', 'root', process.env.MYSQL_ROOT_PASSWORD, {
    dialect: "mysql",
    host: '192.168.99.116',
    port: 3306,
});