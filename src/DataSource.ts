import { DataSource } from "typeorm";
import { EmployeeDetails } from "./entities/EmployeeDetailsEntity";
import { Employee } from "./entities/EmployeeEntity";
import { Project } from "./entities/ProjectEntity";
import { Location } from "./entities/LocationEntity";
import {test11677137018863} from './migrations/1677137018863-test1';
import {test11677218087437} from './migrations/1677218087437-test1';
import {test11677465676303} from './migrations/1677465676303-test1';
import {test11677482839263} from './migrations/1677482839263-test1'
import {test11677484403963} from './migrations/1677484403963-test1';
import {test11677666506440} from './migrations/1677666506440-test1';

export const AppDataSource = new DataSource({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'suresh',
    database: 'typeorm_db',
    entities:[EmployeeDetails, Employee, Project, Location], 
    migrations:[test11677666506440], //migrations path is not working so imported migrations class here
    synchronize: false,
    logging: true,
});

