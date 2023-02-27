import { MigrationInterface, QueryRunner } from "typeorm";

export class test11677465676303 implements MigrationInterface {
    name = 'test11677465676303'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "employee" DROP CONSTRAINT "UQ_e97a7f3c48c04b54ffc24e5fc71"
        `);
        await queryRunner.query(`
            ALTER TABLE "employee_details"
            ALTER COLUMN "created_at" DROP NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "employee_details"
            ALTER COLUMN "last_updated" DROP NOT NULL
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "employee_details"
            ALTER COLUMN "last_updated"
            SET NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "employee_details"
            ALTER COLUMN "created_at"
            SET NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "employee"
            ADD CONSTRAINT "UQ_e97a7f3c48c04b54ffc24e5fc71" UNIQUE ("name")
        `);
    }

}
