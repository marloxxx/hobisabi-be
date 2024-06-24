import "reflect-metadata";
import { DataSource, DataSourceOptions } from "typeorm";
import { runSeeders, SeederOptions } from "typeorm-extension";

const options: DataSourceOptions & SeederOptions = {
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "",
    database: "hobisabi",
    entities: [__dirname + "/../entities/*.entity{.ts,.js}"],
    seeds: [__dirname + "/*.seeder{.ts,.js}"],
};

const dataSource = new DataSource(options);

dataSource.initialize().then(async () => {

    await runSeeders(dataSource);
    process.exit();
});