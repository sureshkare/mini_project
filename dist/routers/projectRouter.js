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
const ProjectEntity_1 = require("../entities/ProjectEntity");
const projectRouter = express_1.default.Router();
projectRouter.use(express_1.default.json());
projectRouter.use(express_1.default.urlencoded({ extended: true }));
//Create a project
projectRouter.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const projectRepo = req.app.get("appDataSource").getRepository(ProjectEntity_1.Project);
    let emp1 = new EmployeeEntity_1.Employee();
    emp1.name = "rana";
    let emp2 = new EmployeeEntity_1.Employee();
    emp2.name = "rohit";
    let emp3 = new EmployeeEntity_1.Employee();
    emp3.name = "srk";
    let project = new ProjectEntity_1.Project();
    project.name = "miniproj";
    project.employee = [emp1, emp2, emp3];
    const dataInserted = yield projectRepo.save(project);
    const employees = yield projectRepo.find();
    res.json(employees);
}));
exports.default = projectRouter;
