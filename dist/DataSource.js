"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
const typeorm_1 = require("typeorm");
const EmployeeDetailsEntity_1 = require("./entities/EmployeeDetailsEntity");
const EmployeeEntity_1 = require("./entities/EmployeeEntity");
const ProjectEntity_1 = require("./entities/ProjectEntity");
const LocationEntity_1 = require("./entities/LocationEntity");
const _1677482839263_test1_1 = require("./migrations/1677482839263-test1");
exports.AppDataSource = new typeorm_1.DataSource({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'suresh',
    database: 'typeorm_db',
    entities: [EmployeeDetailsEntity_1.EmployeeDetails, EmployeeEntity_1.Employee, ProjectEntity_1.Project, LocationEntity_1.Location],
    migrations: [_1677482839263_test1_1.test11677482839263],
    synchronize: false,
    logging: true,
});
