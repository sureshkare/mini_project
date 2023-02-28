import "reflect-metadata";
import express from "express";
import { Employee } from "../entities/EmployeeEntity";
import { EmployeeDetails } from "../entities/EmployeeDetailsEntity";
import { Location } from "../entities/LocationEntity";
import { Project } from "../entities/ProjectEntity";
import empRouter from "./empRouter";

const projectRouter: express.Router = express.Router();
projectRouter.use(express.json());
projectRouter.use(express.urlencoded({ extended: true }));

//Create a project
projectRouter.post("/", async (req:express.Request, res:express.Response) => {

    const {proj,em1, em2, em3} = req.body;
         
    const projectRepo = req.app.get("appDataSource").getRepository(Project);

    let emp1 = new Employee();
    emp1.name = em1;

    let emp2 = new Employee();
    emp2.name = em2;

    let emp3 = new Employee();
    emp3.name = em3;

    let project = new Project();
    project.name = proj;
    project.employee = [emp1, emp2, emp3];

    


    const employees = await projectRepo.save(project);
    res.send("Project has been created successfully")



})

//Delete a project
projectRouter.delete("/:id", async (req:express.Request, res:express.Response) => {
    const id = req.params.id;
    const projectRepo = req.app.get("appDataSource").getRepository(Project);

     await projectRepo.delete(id);
     res.send(`project with id:${id} was deleted`);
})

//Get all projects
projectRouter.get("/", async (req:express.Request, res:express.Response) => {
    const projectRepo = req.app.get("appDataSource").getRepository(Project);
    const allProjects = await projectRepo.find();
    res.json(allProjects)
});

//Get a specific project

projectRouter.get("/:id", async (req:express.Request, res:express.Response) => {
    const id = req.params.id;
    const projectRepo = req.app.get("appDataSource").getRepository(Project);
    const project = await projectRepo.find(id);
    res.json(project);
});

export default projectRouter;