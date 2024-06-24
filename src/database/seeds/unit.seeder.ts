import { DataSource } from "typeorm";
import { Seeder } from "typeorm-extension";
import { Unit } from "../entities/unit.entity";

export default class UnitSeeder implements Seeder {
    public async run(dataSource: DataSource, _): Promise<any> {
        const unitRepository = dataSource.getRepository(Unit);
        unitRepository.insert([
            { name: 'Perjam', unit: 'jam' },
            { name: 'PerBola', unit: 'bola' },
            { name: 'PerBuah', unit: 'buah' },
            { name: 'PerAmunisi', unit: 'amunisi' },
            { name: 'PerRonde', unit: 'ronde' },
        ]);

        unitRepository.save([
            { name: 'Perjam', unit: 'jam' },
            { name: 'PerBola', unit: 'bola' },
            { name: 'PerBuah', unit: 'buah' },
            { name: 'PerAmunisi', unit: 'amunisi' },
            { name: 'PerRonde', unit: 'ronde' },
        ]);
    }
}