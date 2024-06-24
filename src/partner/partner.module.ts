import { Module } from '@nestjs/common';
import { PartnerService } from './partner.service';
import { PartnerController } from './partner.controller';
import { ConfigModule } from '@nestjs/config';
import { Partner } from 'src/database/entities/partner.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProfilePartner } from 'src/database/entities/profile-partner.entity';
import { Advertisement } from 'src/database/entities/advertisement.entity';
import { Image } from 'src/database/entities/image.entity';
import { Location } from 'src/database/entities/location.entity';

@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forFeature([Partner, ProfilePartner, Advertisement, Image, Location]),
  ],
  controllers: [PartnerController],
  providers: [PartnerService],
})
export class PartnerModule { }
