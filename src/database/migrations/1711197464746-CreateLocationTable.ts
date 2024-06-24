import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class CreateLocationTable1711197464746 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: "locations",
            columns: [
                {
                    name: "id",
                    type: "int",
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: "increment"
                },
                {
                    name: "maps",
                    type: "varchar"
                },
                {
                    name: "longitude",
                    type: "varchar"
                },
                {
                    name: "latitude",
                    type: "varchar"
                },
                {
                    name: "address",
                    type: "varchar"
                },
                {
                    name: "district",
                    type: "varchar"
                },
                {
                    name: "city",
                    type: "varchar"
                },
                {
                    name: "isActive",
                    type: "boolean",
                    default: false
                },
                {
                    name: "partnerId",
                    type: "int"
                }
            ]
        }));

        await queryRunner.createForeignKey("locations", new TableForeignKey({
            columnNames: ["partnerId"],
            referencedColumnNames: ["id"],
            referencedTableName: "partners",
            onDelete: "CASCADE"
        }));

    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("locations");
    }
}
