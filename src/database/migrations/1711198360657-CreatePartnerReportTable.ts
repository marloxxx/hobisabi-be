import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class CreatePartnerReportTable1711198360657 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: "partner_reports",
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
                    name: "description",
                    type: "text"
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
        }), true)

        await queryRunner.createForeignKey("partner_reports", new TableForeignKey({
            columnNames: ["partnerId"],
            referencedColumnNames: ["id"],
            referencedTableName: "partners",
            onDelete: "CASCADE"
        }));

        await queryRunner.createForeignKey("partner_reports", new TableForeignKey({
            columnNames: ["userId"],
            referencedColumnNames: ["id"],
            referencedTableName: "users",
            onDelete: "CASCADE"
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        const table = await queryRunner.getTable("partner_reports");
        const foreignKey = table.foreignKeys.find(fk => fk.columnNames.indexOf("partnerId") !== -1);
        await queryRunner.dropForeignKey("partner_reports", foreignKey);
        await queryRunner.dropColumn("partner_reports", "partnerId");

        await queryRunner.dropTable("partner_reports");
    }

}
