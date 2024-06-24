import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class CreatePartnerRateTable1711198291622 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: "partner_rates",
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
                    name: "userId",
                    type: "int"
                },
                {
                    name: "rate",
                    type: "int"
                },
                {
                    name: "comment",
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
        }), true)

        await queryRunner.createForeignKey("partner_rates", new TableForeignKey({
            columnNames: ["partnerId"],
            referencedColumnNames: ["id"],
            referencedTableName: "partners",
            onDelete: "CASCADE"
        }));

        await queryRunner.createForeignKey("partner_rates", new TableForeignKey({
            columnNames: ["userId"],
            referencedColumnNames: ["id"],
            referencedTableName: "users",
            onDelete: "CASCADE"
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("partner_rates");
    }

}
