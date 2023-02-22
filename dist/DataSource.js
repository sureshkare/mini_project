"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
const typeorm_1 = require("typeorm");
exports.AppDataSource = new typeorm_1.DataSource({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'suresh',
    database: 'typeorm_db',
    entities: ['src/entities/*'],
    migrations: ['src/migrations/*.ts'],
    synchronize: false,
    logging: true,
});
