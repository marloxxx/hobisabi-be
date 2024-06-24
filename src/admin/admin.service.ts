import { Injectable, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { InjectRepository } from '@nestjs/typeorm';
import { Admin } from 'src/database/entities/admin.entity';
import { AuthGuard } from 'src/guard/auth.guard';
import { Repository } from 'typeorm';

@ApiTags('admin')
@Injectable()
export class AdminService {
    constructor(
        @InjectRepository(Admin)
        private adminRepository: Repository<Admin>,
    ) { }

    @UseGuards(AuthGuard)
    async getProfile(userId: number) {
        if (!this.isAdmin(userId)) {
            return { message: 'You are not authorized to access this resource' };
        }
        return this.adminRepository.findOne({
            where: {
                id: userId
            }
        });
    }

    isAdmin(userId: any): boolean {
        var admin = this.adminRepository.findOne({
            where: {
                id: userId
            }
        });

        if (admin) {
            return true;
        }
        return false;
    }
}
