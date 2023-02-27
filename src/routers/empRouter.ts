import "reflect-metadata";
import express from "express";
import { Employee } from "../entities/EmployeeEntity";
import { EmployeeDetails } from "../entities/EmployeeDetailsEntity";
import { Location } from "../entities/LocationEntity";
import { Project } from "../entities/ProjectEntity";
import { Between } from "typeorm";

const empRouter: express.Router = express.Router();
empRouter.use(express.json());
empRouter.use(express.urlencoded({ extended: true }));

// //Find all the employees
empRouter.get("/", async (req:express.Request, res:express.Response) => {
    const employeeRepo = req.app.get("appDataSource").getRepository(Employee);


    const allEmployees = await employeeRepo.find();
    res.json(allEmployees)
});

//Find employee

empRouter.get("/:id",async (req:express.Request, res:express.Response) => {
  const employeeRepo = req.app.get("appDataSource").getRepository(Employee);
  const { id }  = req.params;

  const emp = await employeeRepo.findOne({ where: {id: id}});
  res.json(emp);

})

//Delete the employee with Id
empRouter.delete("/:id", async (req:express.Request, res:express.Response) => {
        const id = req.params.id;
        const employeeRepo = req.app.get("appDataSource").getRepository(Employee);
        
        await employeeRepo.delete(id);
        res.send(`Employee with id: ${id} deleted`)
})

//Create the employee Record
empRouter.post("/", async (req:express.Request, res:express.Response) => {
      const {name} = req.body;
      const employeeRepo = req.app.get("appDataSource").getRepository(Employee);

      const employee: Employee = new Employee();
      employee.name = name;

      await employeeRepo.save(employee);

      res.send("Employee inserted successfully");
});

//Update the employee Record
empRouter.put("/:id", async (req:express.Request, res:express.Response) => {
  const {name} = req.body;
  const id = req.params.id;
  const employeeRepo = req.app.get("appDataSource").getRepository(Employee);

  await employeeRepo.update(id, { name: name});
  res.send(`Employee updated with id:${id}`);

});

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





export default empRouter;