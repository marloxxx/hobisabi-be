import { DataSource } from "typeorm";
import { Seeder } from "typeorm-extension";
import { Maintenance } from "../entities/maintenance.entity";

export default class MaintenanceSeeder implements Seeder {
    public async run(dataSource: DataSource, _): Promise<any> {
        const maintenanceSeeder = dataSource.getRepository(Maintenance);

        maintenanceSeeder.insert({
            platform_cost: 0,
            topup_cost: 0,
            isActive: true,
        });

        maintenanceSeeder.save({
            platform_cost: 0,
            topup_cost: 0,
            isActive: true,
        });
    }
}