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
exports.test11677465676303 = void 0;
class test11677465676303 {
    constructor() {
        this.name = 'test11677465676303';
    }
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`
            ALTER TABLE "employee" DROP CONSTRAINT "UQ_e97a7f3c48c04b54ffc24e5fc71"
        `);
            yield queryRunner.query(`
            ALTER TABLE "employee_details"
            ALTER COLUMN "created_at" DROP NOT NULL
        `);
            yield queryRunner.query(`
            ALTER TABLE "employee_details"
            ALTER COLUMN "last_updated" DROP NOT NULL
        `);
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`
            ALTER TABLE "employee_details"
            ALTER COLUMN "last_updated"
            SET NOT NULL
        `);
            yield queryRunner.query(`
            ALTER TABLE "employee_details"
            ALTER COLUMN "created_at"
            SET NOT NULL
        `);
            yield queryRunner.query(`
            ALTER TABLE "employee"
            ADD CONSTRAINT "UQ_e97a7f3c48c04b54ffc24e5fc71" UNIQUE ("name")
        `);
        });
    }
}
exports.test11677465676303 = test11677465676303;
