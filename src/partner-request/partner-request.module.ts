import { Module } from '@nestjs/common';
import { PartnerRequestService } from './partner-request.service';
import { PartnerRequestController } from './partner-request.controller';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PartnerRequest } from 'src/database/entities/partner-request.entity';

@Module({
  imports: [ConfigModule, TypeOrmModule.forFeature([PartnerRequest])],
  controllers: [PartnerRequestController],
  providers: [PartnerRequestService],
})
export class PartnerRequestModule { }
