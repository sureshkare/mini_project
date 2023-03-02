import "reflect-metadata";
import express from "express";
import { Employee } from "../entities/EmployeeEntity";
import { Project } from "../entities/ProjectEntity";
import { EmployeeDetails } from "../entities/EmployeeDetailsEntity";

const projectRouter: express.Router = express.Router();
projectRouter.use(express.json());
projectRouter.use(express.urlencoded({ extended: true }));

/* Add a project */
projectRouter.post("/", async (req: express.Request, res: express.Response) => {
  const { project_name } = req.query;
  const projectRepo = req.app.get("appDataSource").getRepository(Project);
  let project: Project = new Project();
  project.name = project_name as string;
  try {
    const dataInserted = await projectRepo.save(project);
    res.status(200).json(dataInserted);
  } catch (error: any) {
    res.status(400)
      .json("A project with the same name already exists. Try something else.");
  }
});

/* List all projects */
projectRouter.get("/", async (req: express.Request, res: express.Response) => {
  const projectRepo = req.app.get("appDataSource").getRepository(Project);
  const fetchedData = await projectRepo.find();
  res.status(200).json(fetchedData);
});

/* Get the details of given project */
/* ID */
projectRouter.get(
  "/id/:project",
  async (req: express.Request, res: express.Response) => {
    let id = req.params.project;
    const projectRepo = req.app.get("appDataSource").getRepository(Project);
    try {
      const dataFetched = await projectRepo.find({
        where: {
          id: id,
        },
      });
      if(dataFetched.length==0)
        res.status(200).json("Project not found");
      else
        res.status(200).json(dataFetched);
    } catch (error: any) {
      res.status(400).json(error.originalError.message);
    }
  }
);
/* Name */
projectRouter.get(
  "/name/:project",
  async (req: express.Request, res: express.Response) => {
    let name = req.params.project;
    const projectRepo = req.app.get("appDataSource").getRepository(Project);
    try {
      const dataFetched = await projectRepo.find({
        where: {
          name: name,
        },
      });
      if(dataFetched.length==0)
        res.status(200).json("Project not found");
      else
        res.status(200).json(dataFetched);
    } catch (error: any) {
      res.status(400).json(error.originalError.message);
    }
  }
);



/* Add an Employee to a project */
projectRouter.put(
  "/addemp",
  async (req: express.Request, res: express.Response) => {
    const { eid, pid, ename, pname } = req.query;
    if (eid != undefined && pid != undefined) {
      /* Check if employee exists */
      const empRepo = req.app.get("appDataSource").getRepository(Employee);
      const empData = await empRepo.find({
        where: {
          id: eid || -1,
        },
      });
      if (empData.length == 0) {
        res.status(200).json("Employee not found");
      } else {
        /* Check if project exists */
        const projectRepo = req.app.get("appDataSource").getRepository(Project);

        const projectData = await projectRepo.find({
          where: {
            id: pid || -1,
          },
        });

        if (projectData.length == 0) {
          res.status(200).json("Project not found");
        } else {
          /* Update */
          let employee: Employee = new Employee();
          employee.id = empData[0].id;
          employee.name = empData[0].name;

          let updatedEmployeelist: Employee[] = [];
          if (projectData[0].employee.length != 0)
            updatedEmployeelist = projectData[0].employee;
          updatedEmployeelist.push(employee);

          let project: Project = new Project();
          project.id = projectData[0].id;
          project.name = projectData[0].name;
          project.employee = updatedEmployeelist;

          const dataUpdated = await projectRepo.save(project);
          res.status(200).json(dataUpdated);
        }
      }
    } else if (ename != undefined && pname != undefined) {
      /* Check if employee exists */
      const empRepo = req.app.get("appDataSource").getRepository(Employee);
      const empData = await empRepo.find({
        where: {
          name: ename,
        },
      });
      if (empData.length == 0) {
        res.status(200).json("Employee not found");
      } else {
        /* Check if project exists */
        const projectRepo = req.app.get("appDataSource").getRepository(Project);

        const projectData = await projectRepo.find({
          where: {
            name: pname,
          },
        });

        if (projectData.length == 0) {
          res.status(200).json("Project not found");
        } else {
          /* Update */
          let employee: Employee = new Employee();
          employee.id = empData[0].id;
          employee.name = empData[0].name;

          let updatedEmployeelist: Employee[] = [];
          if (projectData[0].employee.length != 0)
            updatedEmployeelist = projectData[0].employee;
          updatedEmployeelist.push(employee);

          let project: Project = new Project();
          project.id = projectData[0].id;
          project.name = projectData[0].name;
          project.employee = updatedEmployeelist;

          const dataUpdated = await projectRepo.save(project);
          res.status(200).json(dataUpdated);
        }
      }
    } else res.status(400).json("Incomplete Data.");
  }
);

/* Remove an Employee from a project */
projectRouter.put(
  "/delemp",
  async (req: express.Request, res: express.Response) => {
    const { eid, pid, ename, pname } = req.query;
    if (eid != undefined && pid != undefined) {
      /* Check if employee exists */
      const empRepo = req.app.get("appDataSource").getRepository(Employee);
      const empData = await empRepo.find({
        where: {
          id: eid || -1,
        },
      });
      if (empData.length == 0) {
        res.status(200).json("Employee not found");
      } else {
        /* Check if project exists */
        const projectRepo = req.app.get("appDataSource").getRepository(Project);
        const projectData = await projectRepo.find({
          where: {
            id: pid || -1,
          },
        });
        if (projectData.length == 0) {
          res.status(200).json("Project not found");
        } else {
          /* Update */
          let employee: Employee = new Employee();
          employee.id = empData[0].id;
          employee.name = empData[0].name;

          let updatedEmployeelist: Employee[] = [];
          if (projectData[0].employee.length != 0)
            updatedEmployeelist = projectData[0].employee;
          const removeIndex = updatedEmployeelist.findIndex(
            (o) => o.id === employee.id
          );
          if (removeIndex == -1) {
            res
              .status(404)
              .json("The employee is not present in the mentioned project");
          } else {
            /* Remove the Employee from the project */
            updatedEmployeelist.splice(removeIndex, 1);

            let project: Project = new Project();
            project.id = projectData[0].id;
            project.name = projectData[0].name;
            project.employee = updatedEmployeelist;

            const dataUpdated = await projectRepo.save(project);
            res.status(200).json(dataUpdated);
          }
        }
      }
    } else if (ename != undefined && pname != undefined) {
      /* Check if employee exists */
      const empRepo = req.app.get("appDataSource").getRepository(Employee);
      const empData = await empRepo.find({
        where: {
          name: ename,
        },
      });
      if (empData.length == 0) {
        res.status(200).json("Employee not found");
      } else {
        /* Check if project exists */
        const projectRepo = req.app.get("appDataSource").getRepository(Project);
        const projectData = await projectRepo.find({
          where: {
            name: pname,
          },
        });
        if (projectData.length == 0) {
          res.status(200).json("Project not found");
        } else {
          /* Update */
          let employee: Employee = new Employee();
          employee.id = empData[0].id;
          employee.name = empData[0].name;

          let updatedEmployeelist: Employee[] = [];
          if (projectData[0].employee.length != 0)
            updatedEmployeelist = projectData[0].employee;
          const removeIndex = updatedEmployeelist.findIndex(
            (o) => o.id === employee.id
          );
          if (removeIndex == -1) {
            res
              .status(404)
              .json("The employee is not present in the mentioned project");
          } else {
            /* Remove the Employee from the project */
            updatedEmployeelist.splice(removeIndex, 1);

            let project: Project = new Project();
            project.id = projectData[0].id;
            project.name = projectData[0].name;
            project.employee = updatedEmployeelist;

            const dataUpdated = await projectRepo.save(project);
            res.status(200).json(dataUpdated);
          }
        }
      }
    } else res.status(400).json("Incomplete Data.");
  }
);

/* Delete a project */
projectRouter.delete(
  "/",
  async (req: express.Request, res: express.Response) => {
    const { pid, pname } = req.query;
    const projectRepo = req.app.get("appDataSource").getRepository(Project);
    if (pid != undefined) {
      await projectRepo.delete(pid);
    } else if (pname != undefined) {
      await projectRepo.delete({ name: pname });
    }
    res.status(200).json("Record Deleted");
  }
);

export default projectRouter;


// //Create a project
// projectRouter.post("/", async (req:express.Request, res:express.Response) => {

//     const {proj,em1, em2, em3} = req.body;
         
//     const projectRepo = req.app.get("appDataSource").getRepository(Project);

//     let emp1 = new Employee();
//     emp1.name = em1;

//     let emp2 = new Employee();
//     emp2.name = em2;

//     let emp3 = new Employee();
//     emp3.name = em3;

//     let project = new Project();
//     project.name = proj;
//     project.employee = [emp1, emp2, emp3];

    


//     const employees = await projectRepo.save(project);
//     res.send("Project has been created successfully")



// })

// //Delete a project
// projectRouter.delete("/:name", async (req:express.Request, res:express.Response) => {
//     const name = req.params.name;
//     const projectRepo = req.app.get("appDataSource").getRepository(Project);

//      await projectRepo.delete(name);
//      res.send(`project with name:${name} was deleted`);
// })

// //Get all projects
// projectRouter.get("/", async (req:express.Request, res:express.Response) => {
//     const projectRepo = req.app.get("appDataSource").getRepository(Project);
//     const allProjects = await projectRepo.find();
//     res.json(allProjects)
// });

// //Get a specific project

// projectRouter.get("/users", async (req:express.Request, res:express.Response) => {
//     const name = req.params.name;
//     const projectRepo = req.app.get("appDataSource").getRepository(Project);
//     const project = await projectRepo.findOne({
//         where: {
//             name: name,
//         }
//     });
//     res.json(project);
// });