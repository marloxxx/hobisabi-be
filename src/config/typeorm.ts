import { registerAs } from "@nestjs/config"
import { DataSource, DataSourceOptions } from "typeorm";

const config = {
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: '',
    database: 'hobisabi',
    entities: ["dist/database/entities/*.entity{.ts,.js}"],
    migrations: ["dist/database/migrations/*{.ts,.js}"],
    seeds: ["dist/database/seeds/*{.ts,.js}"],
    autoLoadEntities: true,
    migrationsTableName: 'migrations_typeorm',
    synchronize: false,
}

export default registerAs('typeorm', () => config)
export const connectionSource = new DataSource(config as DataSourceOptions);