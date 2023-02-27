import { MigrationInterface, QueryRunner } from "typeorm";

export class test11677218087437 implements MigrationInterface {
    name = 'test11677218087437'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "employee_details" DROP COLUMN "phno"
        `);
        await queryRunner.query(`
            ALTER TABLE "employee_details"
            ADD "phno" character varying NOT NULL
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "employee_details" DROP COLUMN "phno"
        `);
        await queryRunner.query(`
            ALTER TABLE "employee_details"
            ADD "phno" integer NOT NULL
        `);
    }

}
