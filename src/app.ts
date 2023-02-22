import express from "express";
import "reflect-metadata";
import { DataSource } from "typeorm";
import { AppDataSource } from "./DataSource";


const app = express();

app.use(express.json());
const port = 3005;

app.get("/", (req, res) => {
  res.send(`Hello from express`);
});



// AppDataSource.initialize().then(() => {
//  console.log("Database Connected Successfully");
//  app.listen(port, () => {
//     console.log(`listening on port ${port}`);
//   });
// }).catch((error) => console.log("Error Connecting Database", error));

const connect=async (AppDataSource:DataSource) => {
    await AppDataSource.initialize()
    .then(() => {
      console.log("Database Connected");
      app.listen(port, () => {
        console.log(`Running at port ${port}`);
      });   })
    .catch((err) => console.log("database connection failed", err));
  }
  connect(AppDataSource);
