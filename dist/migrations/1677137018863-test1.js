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
exports.test11677137018863 = void 0;
class test11677137018863 {
    constructor() {
        this.name = 'test11677137018863';
    }
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`
            CREATE TABLE "project_employee_employee" (
                "projectId" integer NOT NULL,
                "employeeId" integer NOT NULL,
                CONSTRAINT "PK_b9307d521478e16a274eddd3a57" PRIMARY KEY ("projectId", "employeeId")
            )
        `);
            yield queryRunner.query(`
            CREATE INDEX "IDX_fdde92f7fa1ec8acda131e6adb" ON "project_employee_employee" ("projectId")
        `);
            yield queryRunner.query(`
            CREATE INDEX "IDX_b3eb5f01100bb0a70d67a8d96b" ON "project_employee_employee" ("employeeId")
        `);
            yield queryRunner.query(`
            ALTER TABLE "employee_details"
            ADD "employeeId" integer
        `);
            yield queryRunner.query(`
            ALTER TABLE "employee_details"
            ADD CONSTRAINT "UQ_b47c758283e1d7fa80e88ccc9c5" UNIQUE ("employeeId")
        `);
            yield queryRunner.query(`
            ALTER TABLE "employee_details"
            ADD "locationId" integer
        `);
            yield queryRunner.query(`
            ALTER TABLE "employee"
            ADD CONSTRAINT "UQ_e97a7f3c48c04b54ffc24e5fc71" UNIQUE ("name")
        `);
            yield queryRunner.query(`
            ALTER TABLE "employee_details"
            ALTER COLUMN "experience"
            SET DEFAULT '0'
        `);
            yield queryRunner.query(`
            ALTER TABLE "employee_details"
            ALTER COLUMN "salary" TYPE numeric(12, 2)
        `);
            yield queryRunner.query(`
            ALTER TABLE "employee_details"
            ALTER COLUMN "salary"
            SET DEFAULT '0'
        `);
            yield queryRunner.query(`
            ALTER TABLE "employee_details"
            ADD CONSTRAINT "FK_b47c758283e1d7fa80e88ccc9c5" FOREIGN KEY ("employeeId") REFERENCES "employee"("id") ON DELETE CASCADE ON UPDATE NO ACTION
        `);
            yield queryRunner.query(`
            ALTER TABLE "employee_details"
            ADD CONSTRAINT "FK_86957ae9098ab51862106145705" FOREIGN KEY ("locationId") REFERENCES "location"("id") ON DELETE CASCADE ON UPDATE NO ACTION
        `);
            yield queryRunner.query(`
            ALTER TABLE "project_employee_employee"
            ADD CONSTRAINT "FK_fdde92f7fa1ec8acda131e6adb5" FOREIGN KEY ("projectId") REFERENCES "project"("id") ON DELETE CASCADE ON UPDATE CASCADE
        `);
            yield queryRunner.query(`
            ALTER TABLE "project_employee_employee"
            ADD CONSTRAINT "FK_b3eb5f01100bb0a70d67a8d96b4" FOREIGN KEY ("employeeId") REFERENCES "employee"("id") ON DELETE CASCADE ON UPDATE CASCADE
        `);
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`
            ALTER TABLE "project_employee_employee" DROP CONSTRAINT "FK_b3eb5f01100bb0a70d67a8d96b4"
        `);
            yield queryRunner.query(`
            ALTER TABLE "project_employee_employee" DROP CONSTRAINT "FK_fdde92f7fa1ec8acda131e6adb5"
        `);
            yield queryRunner.query(`
            ALTER TABLE "employee_details" DROP CONSTRAINT "FK_86957ae9098ab51862106145705"
        `);
            yield queryRunner.query(`
            ALTER TABLE "employee_details" DROP CONSTRAINT "FK_b47c758283e1d7fa80e88ccc9c5"
        `);
            yield queryRunner.query(`
            ALTER TABLE "employee_details"
            ALTER COLUMN "salary" DROP DEFAULT
        `);
            yield queryRunner.query(`
            ALTER TABLE "employee_details"
            ALTER COLUMN "salary" TYPE numeric(2, 0)
        `);
            yield queryRunner.query(`
            ALTER TABLE "employee_details"
            ALTER COLUMN "experience" DROP DEFAULT
        `);
            yield queryRunner.query(`
            ALTER TABLE "employee" DROP CONSTRAINT "UQ_e97a7f3c48c04b54ffc24e5fc71"
        `);
            yield queryRunner.query(`
            ALTER TABLE "employee_details" DROP COLUMN "locationId"
        `);
            yield queryRunner.query(`
            ALTER TABLE "employee_details" DROP CONSTRAINT "UQ_b47c758283e1d7fa80e88ccc9c5"
        `);
            yield queryRunner.query(`
            ALTER TABLE "employee_details" DROP COLUMN "employeeId"
        `);
            yield queryRunner.query(`
            DROP INDEX "public"."IDX_b3eb5f01100bb0a70d67a8d96b"
        `);
            yield queryRunner.query(`
            DROP INDEX "public"."IDX_fdde92f7fa1ec8acda131e6adb"
        `);
            yield queryRunner.query(`
            DROP TABLE "project_employee_employee"
        `);
        });
    }
}
exports.test11677137018863 = test11677137018863;
