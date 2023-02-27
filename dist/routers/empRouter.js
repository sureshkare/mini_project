"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const express_1 = __importDefault(require("express"));
const EmployeeEntity_1 = require("../entities/EmployeeEntity");
const empRouter = express_1.default.Router();
empRouter.use(express_1.default.json());
empRouter.use(express_1.default.urlencoded({ extended: true }));
// //Find all the employees
empRouter.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const employeeRepo = req.app.get("appDataSource").getRepository(EmployeeEntity_1.Employee);
    const allEmployees = yield employeeRepo.find();
    res.json(allEmployees);
}));
//Find employee
empRouter.get("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const employeeRepo = req.app.get("appDataSource").getRepository(EmployeeEntity_1.Employee);
    const { id } = req.params;
    const emp = yield employeeRepo.findOne({ where: { id: id } });
    res.json(emp);
}));
//Delete the employee with Id
empRouter.delete("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const employeeRepo = req.app.get("appDataSource").getRepository(EmployeeEntity_1.Employee);
    yield employeeRepo.delete(id);
    res.send(`Employee with id: ${id} deleted`);
}));
//Create the employee Record
empRouter.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name } = req.body;
    const employeeRepo = req.app.get("appDataSource").getRepository(EmployeeEntity_1.Employee);
    const employee = new EmployeeEntity_1.Employee();
    employee.name = name;
    yield employeeRepo.save(employee);
    res.send("Employee inserted successfully");
}));
//Update the employee Record
empRouter.put("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name } = req.body;
    const id = req.params.id;
    const employeeRepo = req.app.get("appDataSource").getRepository(EmployeeEntity_1.Employee);
    yield employeeRepo.update(id, { name: name });
    res.send(`Employee updated with id:${id}`);
}));
// empRouter.get("/", async (req:express.Request, res:express.Response) => {
//   //Without using Relation options cascade, eager and onDelete
//   const empRepo = req.app.get("appDataSource").getRepository(Employee);
//   const empDetRepo = req.app.get("appDataSource").getRepository(EmployeeDetails);
//   const employee:Employee = new Employee();
//   employee.name = "suresh";
//   const employeeDetails:EmployeeDetails = new EmployeeDetails();
//   employeeDetails.experience = 4;
//   employeeDetails.salary = 12500;
//   employeeDetails.phno = "8328577085";
//   employeeDetails.employee = employee;
//   const empDetailsIns = await empDetRepo.save(employeeDetails);
//   res.send("successful")
// })
exports.default = empRouter;
