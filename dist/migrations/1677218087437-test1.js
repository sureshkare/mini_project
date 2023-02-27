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
Object.defineProperty(exports, "__esModule", { value: true });
exports.test11677218087437 = void 0;
class test11677218087437 {
    constructor() {
        this.name = 'test11677218087437';
    }
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`
            ALTER TABLE "employee_details" DROP COLUMN "phno"
        `);
            yield queryRunner.query(`
            ALTER TABLE "employee_details"
            ADD "phno" character varying NOT NULL
        `);
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`
            ALTER TABLE "employee_details" DROP COLUMN "phno"
        `);
            yield queryRunner.query(`
            ALTER TABLE "employee_details"
            ADD "phno" integer NOT NULL
        `);
        });
    }
}
exports.test11677218087437 = test11677218087437;
