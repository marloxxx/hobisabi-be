import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";


export class CreateAdvertisementTable1711197255227 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: "advertisements",
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
                    name: "duration",
                    type: "int"
                },
                {
                    name: "suggestion",
                    type: "varchar"
                },
                {
                    name: "keyword",
                    type: "varchar"
                },
                {
                    name: "popular",
                    type: "varchar"
                },
                {
                    name: "banner",
                    type: "varchar"
                },
                {
                    name: "popup",
                    type: "varchar"
                },
                {
                    name: "adToken",
                    type: "varchar"
                },
                {
                    name: "suggestionActive",
                    type: "boolean",
                    default: false
                },
                {
                    name: "searchActive",
                    type: "boolean",
                    default: false
                },
                {
                    name: "popularActive",
                    type: "boolean",
                    default: false
                },
                {
                    name: "bannerActive",
                    type: "boolean",
                    default: false
                },
                {
                    name: "popupActive",
                    type: "boolean",
                    default: false
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

        await queryRunner.createForeignKey("advertisements", new TableForeignKey({
            columnNames: ["partnerId"],
            referencedColumnNames: ["id"],
            referencedTableName: "partners",
            onDelete: "CASCADE"
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("advertisements");
    }

}
