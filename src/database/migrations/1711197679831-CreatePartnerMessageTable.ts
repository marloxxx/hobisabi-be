import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class CreatePartnerMessageTable1711197679831 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: "partner_messages",
            columns: [
                {
                    name: "id",
                    type: "int",
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: "increment"
                },
                {
                    name: "message",
                    type: "text"
                },
                {
                    name: "image",
                    type: "varchar"
                },
                {
                    name: "is_admin",
                    type: "boolean",
                    default: false
                },
                {
                    name: "partnerRequestId",
                    type: "int"
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

        await queryRunner.createForeignKey("partner_messages", new TableForeignKey({
            columnNames: ["partnerRequestId"],
            referencedColumnNames: ["id"],
            referencedTableName: "partner_requests",
            onDelete: "CASCADE"
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        const table = await queryRunner.getTable("partner_messages");
        const foreignKey = table.foreignKeys.find(fk => fk.columnNames.indexOf("partnerRequestId") !== -1);
        await queryRunner.dropForeignKey("partner_messages", foreignKey);
        await queryRunner.dropTable("partner_messages");
    }

}
