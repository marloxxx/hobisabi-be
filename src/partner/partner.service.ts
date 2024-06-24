import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePartnerDto } from './dto/create-partner.dto';
import { UpdatePartnerDto } from './dto/update-partner.dto';
import { Partner } from 'src/database/entities/partner.entity';
import { FilterOperator, FilterSuffix, PaginateQuery, Paginated, paginate } from 'nestjs-paginate';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProfilePartner } from 'src/database/entities/profile-partner.entity';
import { Location } from 'src/database/entities/location.entity';
import { Advertisement } from 'src/database/entities/advertisement.entity';
import * as argon2 from 'argon2';
import { Image } from 'src/database/entities/image.entity';

@Injectable()
export class PartnerService {
  constructor(
    @InjectRepository(Partner) private readonly partnerRepository: Repository<Partner>,
    @InjectRepository(ProfilePartner) private readonly profilePartnerRepository: Repository<ProfilePartner>,
    @InjectRepository(Location) private readonly locationRepository: Repository<Location>,
    @InjectRepository(Advertisement) private readonly advertisementRepository: Repository<Advertisement>,
    @InjectRepository(Image) private readonly imageRepository: Repository<Image>,
  ) { }

  async create(createPartnerDto: CreatePartnerDto): Promise<Partner> {
    try {
      const partner = new Partner();
      partner.fullname = createPartnerDto.name;
      partner.email = createPartnerDto.email;
      partner.password = await argon2.hash(createPartnerDto.password);
      await this.partnerRepository.save(partner);

      const profile = new ProfilePartner();
      profile.partner = partner;
      profile.name = createPartnerDto.name;
      profile.description = createPartnerDto.description;
      profile.open = createPartnerDto.openCloseTime.split('-')[0];
      profile.close = createPartnerDto.openCloseTime.split('-')[1];
      profile.image = createPartnerDto.image;

      const location = new Location();
      location.partner = partner;
      location.address = createPartnerDto.address;
      location.city = createPartnerDto.city;
      location.district = createPartnerDto.district;
      location.latitude = createPartnerDto.latLong.split(',')[0];
      location.longitude = createPartnerDto.latLong.split(',')[1];
      location.maps = createPartnerDto.maps;
      await this.locationRepository.save(location);

      const advertisement = new Advertisement();
      advertisement.partner = partner;
      advertisement.duration = createPartnerDto.duration;
      advertisement.keyword = createPartnerDto.keyword;
      advertisement.popular = createPartnerDto.popular;
      advertisement.suggestion = createPartnerDto.suggestion;
      advertisement.adToken = createPartnerDto.adToken;
      advertisement.banner = createPartnerDto.banner;
      advertisement.popup = createPartnerDto.popup;
      await this.profilePartnerRepository.save(profile);

      const files = createPartnerDto.files;
      files.forEach(async file => {
        const image = new Image();
        image.partner = partner;
        image.image = file.filename;
        await this.imageRepository.save(image);
      });

      return partner;
    } catch (error) {
      throw error;
    }
  }

  async findAll(query: PaginateQuery): Promise<Paginated<Partner>> {
    return paginate(query, this.partnerRepository,
      {
        sortableColumns: ['id', 'fullname', 'email'],
        searchableColumns: ['fullname', 'email'],
        defaultSortBy: [['id', 'DESC']],
      }
    )

  }

  async findOne(id: number): Promise<Partner> {
    const partner = await this.partnerRepository.findOne({
      where: {
        id: id
      }
    });

    if (!partner) {
      throw new NotFoundException('Partner not found');
    }
    return partner;
  }

  async update(id: number, updatePartnerDto: UpdatePartnerDto): Promise<Partner> {
    await this.partnerRepository.update(id, updatePartnerDto);
    return await this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    const result = await this.partnerRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException('Partner not found');
    }
  }

  async upload(id: number, files: Array<Express.Multer.File>): Promise<void> {
    const partner = await this.partnerRepository.findOne({
      where: {
        id: id
      }
    });

    if (!partner) {
      throw new NotFoundException('Partner not found');
    }

    // check if the partner has an image
    if (files.find(file => file.fieldname === 'image')) {
      const profile = await this.profilePartnerRepository.findOne({
        where: {
          partner: partner
        }
      });

      profile.image = files.find(file => file.fieldname === 'image').filename;
      await this.profilePartnerRepository.save(profile);
    }

    // check if the partner has a banner
    if (files.find(file => file.fieldname === 'banner')) {
      const advertisement = await this.advertisementRepository.findOne({
        where: {
          partner: partner
        }
      });

      advertisement.banner = files.find(file => file.fieldname === 'banner').filename;
      await this.advertisementRepository.save(advertisement);
    }

    // check if the partner has a popup
    if (files.find(file => file.fieldname === 'popup')) {
      const advertisement = await this.advertisementRepository.findOne({
        where: {
          partner: partner
        }
      });

      advertisement.popup = files.find(file => file.fieldname === 'popup').filename;
      await this.advertisementRepository.save(advertisement);
    }

    // check if the partner has files
    if (files.find(file => file.fieldname === 'files')) {
      files.forEach(async file => {
        const image = new Image();
        image.partner = partner;
        image.image = file.filename;
        await this.imageRepository.save(image);
      });
    }
  }

  async deleteImage(id: number, imageId: number): Promise<void> {
    const partner = await this.partnerRepository.findOne({
      where: {
        id: id
      }
    });

    if (!partner) {
      throw new NotFoundException('Partner not found');
    }

    const image = await this.imageRepository.findOne({
      where: {
        id: imageId
      }
    });

    if (!image) {
      throw new NotFoundException('Image not found');
    }

    await this.imageRepository.delete(imageId);
  }
}
