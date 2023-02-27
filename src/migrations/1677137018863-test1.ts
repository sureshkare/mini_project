import { MigrationInterface, QueryRunner } from "typeorm";

export class test11677137018863 implements MigrationInterface {
    name = 'test11677137018863'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "project_employee_employee" (
                "projectId" integer NOT NULL,
                "employeeId" integer NOT NULL,
                CONSTRAINT "PK_b9307d521478e16a274eddd3a57" PRIMARY KEY ("projectId", "employeeId")
            )
        `);
        await queryRunner.query(`
            CREATE INDEX "IDX_fdde92f7fa1ec8acda131e6adb" ON "project_employee_employee" ("projectId")
        `);
        await queryRunner.query(`
            CREATE INDEX "IDX_b3eb5f01100bb0a70d67a8d96b" ON "project_employee_employee" ("employeeId")
        `);
        await queryRunner.query(`
            ALTER TABLE "employee_details"
            ADD "employeeId" integer
        `);
        await queryRunner.query(`
            ALTER TABLE "employee_details"
            ADD CONSTRAINT "UQ_b47c758283e1d7fa80e88ccc9c5" UNIQUE ("employeeId")
        `);
        await queryRunner.query(`
            ALTER TABLE "employee_details"
            ADD "locationId" integer
        `);
        await queryRunner.query(`
            ALTER TABLE "employee"
            ADD CONSTRAINT "UQ_e97a7f3c48c04b54ffc24e5fc71" UNIQUE ("name")
        `);
        await queryRunner.query(`
            ALTER TABLE "employee_details"
            ALTER COLUMN "experience"
            SET DEFAULT '0'
        `);
        await queryRunner.query(`
            ALTER TABLE "employee_details"
            ALTER COLUMN "salary" TYPE numeric(12, 2)
        `);
        await queryRunner.query(`
            ALTER TABLE "employee_details"
            ALTER COLUMN "salary"
            SET DEFAULT '0'
        `);
        await queryRunner.query(`
            ALTER TABLE "employee_details"
            ADD CONSTRAINT "FK_b47c758283e1d7fa80e88ccc9c5" FOREIGN KEY ("employeeId") REFERENCES "employee"("id") ON DELETE CASCADE ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "employee_details"
            ADD CONSTRAINT "FK_86957ae9098ab51862106145705" FOREIGN KEY ("locationId") REFERENCES "location"("id") ON DELETE CASCADE ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "project_employee_employee"
            ADD CONSTRAINT "FK_fdde92f7fa1ec8acda131e6adb5" FOREIGN KEY ("projectId") REFERENCES "project"("id") ON DELETE CASCADE ON UPDATE CASCADE
        `);
        await queryRunner.query(`
            ALTER TABLE "project_employee_employee"
            ADD CONSTRAINT "FK_b3eb5f01100bb0a70d67a8d96b4" FOREIGN KEY ("employeeId") REFERENCES "employee"("id") ON DELETE CASCADE ON UPDATE CASCADE
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "project_employee_employee" DROP CONSTRAINT "FK_b3eb5f01100bb0a70d67a8d96b4"
        `);
        await queryRunner.query(`
            ALTER TABLE "project_employee_employee" DROP CONSTRAINT "FK_fdde92f7fa1ec8acda131e6adb5"
        `);
        await queryRunner.query(`
            ALTER TABLE "employee_details" DROP CONSTRAINT "FK_86957ae9098ab51862106145705"
        `);
        await queryRunner.query(`
            ALTER TABLE "employee_details" DROP CONSTRAINT "FK_b47c758283e1d7fa80e88ccc9c5"
        `);
        await queryRunner.query(`
            ALTER TABLE "employee_details"
            ALTER COLUMN "salary" DROP DEFAULT
        `);
        await queryRunner.query(`
            ALTER TABLE "employee_details"
            ALTER COLUMN "salary" TYPE numeric(2, 0)
        `);
        await queryRunner.query(`
            ALTER TABLE "employee_details"
            ALTER COLUMN "experience" DROP DEFAULT
        `);
        await queryRunner.query(`
            ALTER TABLE "employee" DROP CONSTRAINT "UQ_e97a7f3c48c04b54ffc24e5fc71"
        `);
        await queryRunner.query(`
            ALTER TABLE "employee_details" DROP COLUMN "locationId"
        `);
        await queryRunner.query(`
            ALTER TABLE "employee_details" DROP CONSTRAINT "UQ_b47c758283e1d7fa80e88ccc9c5"
        `);
        await queryRunner.query(`
            ALTER TABLE "employee_details" DROP COLUMN "employeeId"
        `);
        await queryRunner.query(`
            DROP INDEX "public"."IDX_b3eb5f01100bb0a70d67a8d96b"
        `);
        await queryRunner.query(`
            DROP INDEX "public"."IDX_fdde92f7fa1ec8acda131e6adb"
        `);
        await queryRunner.query(`
            DROP TABLE "project_employee_employee"
        `);
    }

}
