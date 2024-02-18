import { Dialect } from 'sequelize';
import path from "path";
import dotenv from 'dotenv';

dotenv.config();
export default {
    server: {
        hostname: process.env.SERVER_HOSTNAME ?? 'localhost',
        port: process.env.SERVER_PORT ?? 4500,
        app: process.env.APP_NAME ?? 'Express API',
        env: process.env.APP_ENV ?? 'DEVELOPMENT'
    },
    
    database: {
        "main": {
            "dialect": (process.env.DB_MAIN_CONNECTION ?? "mssql") as Dialect,
            "uri": process.env.DB_MAIN_HOSTNAME ?? "127.0.0.1",
            "port": parseInt(process.env.DB_MAIN_PORT ?? "1433"),
            "database": process.env.DB_MAIN_DATABASE ?? '',
            "username": process.env.DB_MAIN_USERNAME ?? 'sa',
            "password": process.env.DB_MAIN_PASSWORD ?? 'root',
            "orm_driver": process.env.DB_ORM_DRIVER ?? 'sequelize',
            "enable": true,
            "path": [
                path.join(__dirname, "../models/pg"),
            ],
            "total_slave": process.env.DB_MAIN_TOTAL_SLAVE ?? 0,
            "db_key": process.env.DB_MAIN_KEY ?? ''
        },
    },
}
