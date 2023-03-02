import { MigrationInterface, QueryRunner } from "typeorm";

export class test11677666506440 implements MigrationInterface {
    name = 'test11677666506440'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "employee" (
                "id" SERIAL NOT NULL,
                "name" character varying,
                CONSTRAINT "PK_3c2bc72f03fd5abbbc5ac169498" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "location" (
                "id" SERIAL NOT NULL,
                "name" character varying NOT NULL,
                "country" character varying NOT NULL,
                CONSTRAINT "PK_876d7bdba03c72251ec4c2dc827" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "employee_details" (
                "id" SERIAL NOT NULL,
                "experience" integer NOT NULL DEFAULT '0',
                "salary" numeric(12, 2) NOT NULL DEFAULT '0',
                "created_at" TIMESTAMP,
                "last_updated" TIMESTAMP,
                "phno" character varying NOT NULL,
                "employeeId" integer,
                "locationId" integer,
                CONSTRAINT "REL_b47c758283e1d7fa80e88ccc9c" UNIQUE ("employeeId"),
                CONSTRAINT "PK_a0a0a4a5e5b63b1bf07b5f89c1d" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "project" (
                "id" SERIAL NOT NULL,
                "name" character varying NOT NULL,
                CONSTRAINT "PK_4d68b1358bb5b766d3e78f32f57" PRIMARY KEY ("id")
            )
        `);
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
            DROP INDEX "public"."IDX_b3eb5f01100bb0a70d67a8d96b"
        `);
        await queryRunner.query(`
            DROP INDEX "public"."IDX_fdde92f7fa1ec8acda131e6adb"
        `);
        await queryRunner.query(`
            DROP TABLE "project_employee_employee"
        `);
        await queryRunner.query(`
            DROP TABLE "project"
        `);
        await queryRunner.query(`
            DROP TABLE "employee_details"
        `);
        await queryRunner.query(`
            DROP TABLE "location"
        `);
        await queryRunner.query(`
            DROP TABLE "employee"
        `);
    }

}
