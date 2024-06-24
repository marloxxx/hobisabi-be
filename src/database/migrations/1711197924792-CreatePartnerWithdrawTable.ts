import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class CreatePartnerWithdrawTable1711197924792 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: "partner_withdraws",
            columns: [
                {
                    name: "id",
                    type: "int",
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: "increment"
                },
                {
                    name: "partnerId",
                    type: "int"
                },
                {
                    name: "amount",
                    type: "int"
                },
                {
                    name: "bank",
                    type: "varchar"
                },
                {
                    name: "number",
                    type: "varchar"
                },
                {
                    name: "name",
                    type: "varchar"
                },
                {
                    name: "status",
                    type: "varchar"
                },
                {
                    name: "proof",
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

        await queryRunner.createForeignKey("partner_withdraws", new TableForeignKey({
            columnNames: ["partnerId"],
            referencedColumnNames: ["id"],
            referencedTableName: "partners",
            onDelete: "CASCADE"
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("partner_withdraws");
    }

}
