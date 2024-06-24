import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePartnerRequestDto } from './dto/create-partner-request.dto';
import { UpdatePartnerRequestDto } from './dto/update-partner-request.dto';
import { PartnerRequest } from 'src/database/entities/partner-request.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PaginateQuery, Paginated, paginate } from 'nestjs-paginate';
import { PartnerMessage } from 'src/database/entities/partner-messages.entity';

@Injectable()
export class PartnerRequestService {
  constructor(@InjectRepository(PartnerRequest)
  private readonly parnerRequestRepository: Repository<PartnerRequest>) { }

  async create(createPartnerRequestDto: CreatePartnerRequestDto, image: Express.Multer.File): Promise<PartnerRequest> {
    const partnerRequest = new PartnerRequest();
    partnerRequest.category = createPartnerRequestDto.category;
    partnerRequest.title = createPartnerRequestDto.title;
    partnerRequest.description = createPartnerRequestDto.description;
    partnerRequest.image = image.filename;
    return await this.parnerRequestRepository.save(partnerRequest);
  }

  async findAll(query: PaginateQuery): Promise<Paginated<PartnerRequest>> {
    return paginate(query, this.parnerRequestRepository, {
      sortableColumns: ['id', 'category', 'title',],
      defaultSortBy: [['id', 'DESC']],
      select: ['id', 'category', 'title', 'image', 'status'],
    })
  }

  async findOne(id: number): Promise<PartnerRequest> {
    return await this.parnerRequestRepository.findOne({
      where: {
        id: id
      }
    });
  }

  async reply(id: number, createPartnerMessageDto: any, image: Express.Multer.File): Promise<PartnerRequest> {
    try {
      const partnerRequest = await this.findOne(id);
      if (!partnerRequest) {
        throw new NotFoundException('Partner request not found');
      }
      const partnerMessage = new PartnerMessage();
      partnerMessage.partnerRequestId = id;
      partnerMessage.message = createPartnerMessageDto.message;
      partnerMessage.image = image.filename;
      partnerMessage.is_admin = true;

      await this.parnerRequestRepository.manager.save(partnerMessage);

      return await this.findOne(id);
    } catch (error) {
      throw new NotFoundException('Partner request not found');
    }
  }
}
