"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmployeeDetails = void 0;
const typeorm_1 = require("typeorm");
const EmployeeEntity_1 = require("./EmployeeEntity");
const LocationEntity_1 = require("./LocationEntity");
let EmployeeDetails = class EmployeeDetails {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], EmployeeDetails.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 0 }),
    __metadata("design:type", Number)
], EmployeeDetails.prototype, "experience", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "decimal", precision: 12, scale: 2, default: 0 }),
    __metadata("design:type", Number)
], EmployeeDetails.prototype, "salary", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Date)
], EmployeeDetails.prototype, "created_at", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Date)
], EmployeeDetails.prototype, "last_updated", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], EmployeeDetails.prototype, "phno", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => EmployeeEntity_1.Employee, { cascade: true, eager: true, onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", EmployeeEntity_1.Employee)
], EmployeeDetails.prototype, "employee", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => LocationEntity_1.Location, (location) => location.employeeDetails, { eager: true, onDelete: 'CASCADE' }),
    __metadata("design:type", LocationEntity_1.Location)
], EmployeeDetails.prototype, "location", void 0);
EmployeeDetails = __decorate([
    (0, typeorm_1.Entity)()
], EmployeeDetails);
exports.EmployeeDetails = EmployeeDetails;
