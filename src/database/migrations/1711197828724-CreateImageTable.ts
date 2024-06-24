import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class CreateImageTable1711197828724 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: "images",
            columns: [
                {
                    name: "id",
                    type: "int",
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: "increment"
                },
                {
                    name: "partner_id",
                    type: "int"
                },
                {
                    name: "image",
                    type: "varchar"
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

        await queryRunner.createForeignKey("images", new TableForeignKey({
            columnNames: ["partner_id"],
            referencedColumnNames: ["id"],
            referencedTableName: "partners",
            onDelete: "CASCADE"
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        const table = await queryRunner.getTable("images");
        const foreignKey = table.foreignKeys.find(fk => fk.columnNames.indexOf("room_id") !== -1);
        await queryRunner.dropForeignKey("images", foreignKey);
        await queryRunner.dropTable("images");
    }

}
