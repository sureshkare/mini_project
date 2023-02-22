import { DataSource } from "typeorm";
import { EmployeeDetails } from "./entities/EmployeeDetailsEntity";


export const AppDataSource = new DataSource({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'suresh',
    database: 'typeorm_db',
    entities:[EmployeeDetails], 
    migrations:['src/migrations/*.ts'],
    synchronize: false,
    logging: true,
});

