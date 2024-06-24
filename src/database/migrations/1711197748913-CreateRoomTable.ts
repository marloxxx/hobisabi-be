import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class CreateRoomTable1711197748913 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: "rooms",
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
                    name: "type",
                    type: "varchar"
                },
                {
                    name: "price",
                    type: "int"
                },
                {
                    name: "description",
                    type: "varchar"
                },
                {
                    name: "number",
                    type: "int"
                },
                {
                    name: "partnerId",
                    type: "int"
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

        await queryRunner.createForeignKey("rooms", new TableForeignKey({
            columnNames: ["partnerId"],
            referencedColumnNames: ["id"],
            referencedTableName: "partners",
            onDelete: "CASCADE"
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("rooms");
    }

}
