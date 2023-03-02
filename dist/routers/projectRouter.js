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
    const { proj, em1, em2, em3 } = req.body;
    const projectRepo = req.app.get("appDataSource").getRepository(ProjectEntity_1.Project);
    let emp1 = new EmployeeEntity_1.Employee();
    emp1.name = em1;
    let emp2 = new EmployeeEntity_1.Employee();
    emp2.name = em2;
    let emp3 = new EmployeeEntity_1.Employee();
    emp3.name = em3;
    let project = new ProjectEntity_1.Project();
    project.name = proj;
    project.employee = [emp1, emp2, emp3];
    const employees = yield projectRepo.save(project);
    res.send("Project has been created successfully");
}));
//Delete a project
projectRouter.delete("/:name", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const name = req.params.name;
    const projectRepo = req.app.get("appDataSource").getRepository(ProjectEntity_1.Project);
    yield projectRepo.delete(name);
    res.send(`project with name:${name} was deleted`);
}));
//Get all projects
projectRouter.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const projectRepo = req.app.get("appDataSource").getRepository(ProjectEntity_1.Project);
    const allProjects = yield projectRepo.find();
    res.json(allProjects);
}));
//Get a specific project
projectRouter.get("/users", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const name = req.params.name;
    const projectRepo = req.app.get("appDataSource").getRepository(ProjectEntity_1.Project);
    const project = yield projectRepo.findOne({
        where: {
            name: name,
        }
    });
    res.json(project);
}));
exports.default = projectRouter;
