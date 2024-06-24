import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { AdminService } from './admin.service';
import { CreatePartnerDto } from '../partner/dto/create-partner.dto';
import { UpdatePartnerDto } from '../partner/dto/update-partner.dto';


@Controller('admin')
export class AdminController {
    constructor(private readonly adminService: AdminService) {
    }
    // get profile admin
    @Get('profile/:userId')
    getProfile(userId: number) {
        return this.adminService.getProfile(userId);
    }
}
