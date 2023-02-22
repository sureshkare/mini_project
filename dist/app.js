"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
require("reflect-metadata");
const DataSource_1 = require("./DataSource");
const app = (0, express_1.default)();
app.use(express_1.default.json());
const port = 3005;
app.get("/", (req, res) => {
    res.send(`Hello from express`);
});
DataSource_1.AppDataSource.initialize().then(() => {
    console.log("Database Connected Successfully");
    app.listen(port, () => {
        console.log(`listening on port ${port}`);
    });
}).catch((error) => console.log("Error Connecting Database", error));
