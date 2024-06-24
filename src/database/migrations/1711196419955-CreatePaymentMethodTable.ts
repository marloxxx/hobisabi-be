import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreatePaymentMethodTable1711196419955 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: "payment_methods",
            columns: [
                {
                    name: "id",
                    type: "int",
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: "increment"
                },
                {
                    name: "name",
                    type: "varchar"
                },
                {
                    name: "number",
                    type: "varchar"
                },
                {
                    name: "bank",
                    type: "varchar"
                },
                {
                    name: "isActive",
                    type: "boolean",
                    default: false
                },
                {
                    name: "isDelete",
                    type: "boolean",
                    default: false
                },
                {
                    name: "createdAt",
                    type: "datetime",
                    default: "CURRENT_TIMESTAMP"
                },
                {
                    name: "updatedAt",
                    type: "datetime",
                    default: "CURRENT_TIMESTAMP",
                    onUpdate: "CURRENT_TIMESTAMP"
                }
            ]
        }));

    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("payment_methods");
    }

}
