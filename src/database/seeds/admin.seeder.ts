import { DataSource } from "typeorm";
import { Admin } from "../entities/admin.entity";
import { Seeder } from "typeorm-extension";
import * as argon2 from 'argon2';

export default class AdminSeeder implements Seeder {
    public async run(dataSource: DataSource, _): Promise<any> {
        const adminRepository = dataSource.getRepository(Admin);

        adminRepository.insert({
            fullname: 'Admin',
            email: 'admin@gmail.com',
            password: await argon2.hash('password'),
        });

        adminRepository.save({
            fullname: 'Admin',
            email: 'admin@gmail.com',
            password: await argon2.hash('password'),
        });

    }
}