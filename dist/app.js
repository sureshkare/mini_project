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
const express_1 = __importDefault(require("express"));
require("reflect-metadata");
const DataSource_1 = require("./DataSource");
const empRouter_1 = __importDefault(require("./routers/empRouter"));
const projectRouter_1 = __importDefault(require("./routers/projectRouter"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
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
const connect = (AppDataSource) => __awaiter(void 0, void 0, void 0, function* () {
    yield AppDataSource.initialize().then(() => {
        console.log("Database Connected");
        // To use AppDataSource across the project
        app.set("appDataSource", AppDataSource);
        app.listen(port, () => {
            console.log(`Running at port ${port}`);
        });
    })
        .catch((err) => console.log("database connection failed", err));
});
connect(DataSource_1.AppDataSource);
app.use("/employee", empRouter_1.default);
app.use("/project", projectRouter_1.default);
// Any Invalid route
app.use("*", (req, res) => {
    res.status(404).end("Page Not Found");
});
exports.default = app;
