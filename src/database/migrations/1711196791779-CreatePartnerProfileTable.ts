import { MigrationInterface, QueryRunner, Table, TableForeignKey, TableUnique } from "typeorm";

export class CreatePartnerProfileTable1711196791779 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: "profile_partners",
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
                    name: "description",
                    type: "varchar"
                },
                {
                    name: "address",
                    type: "varchar"
                },
                {
                    name: "image",
                    type: "varchar"
                },
                {
                    name: "open",
                    type: "varchar"
                },
                {
                    name: "close",
                    type: "varchar"
                },
                {
                    name: "idCard",
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
                },
                {
                    name: "unitId",
                    type: "int"
                },
                {
                    name: "partnerId",
                    type: "int"
                }
            ]
        }));

        await queryRunner.createForeignKey("profile_partners", new TableForeignKey({
            columnNames: ["unitId"],
            referencedColumnNames: ["id"],
            referencedTableName: "units",
            onDelete: "CASCADE"
        }));

        await queryRunner.createForeignKey("profile_partners", new TableForeignKey({
            columnNames: ["partnerId"],
            referencedColumnNames: ["id"],
            referencedTableName: "partners",
            onDelete: "CASCADE"
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("profile_partners");
    }

}
