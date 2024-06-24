import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PartnerWithdraw } from 'src/database/entities/partner-withdraw.entity';
import { Repository } from 'typeorm';
import { FilterOperator, FilterSuffix, PaginateQuery, Paginated, paginate } from 'nestjs-paginate';
import { CreateWithdrawDto } from './dto/create-withdraw.dto';

@Injectable()
export class WithdrawsService {
  constructor(@InjectRepository(PartnerWithdraw) private readonly parnerWithdrawRepository: Repository<PartnerWithdraw>) { }

  async create(createWithdrawDto: CreateWithdrawDto) {
    return await this.parnerWithdrawRepository.save(createWithdrawDto);
  }

  async findAll(query: PaginateQuery): Promise<Paginated<PartnerWithdraw>> {
    return paginate(query, this.parnerWithdrawRepository, {
      sortableColumns: ['id', 'name', 'bank', 'number'],
      defaultSortBy: [['id', 'DESC']],
      select: ['id', 'name', 'bank', 'number', 'partnerId'],
      filterableColumns: {
        name: [FilterOperator.EQ, FilterSuffix.NOT],
        bank: [FilterOperator.EQ, FilterSuffix.NOT],
        number: [FilterOperator.EQ, FilterSuffix.NOT],
        partnerId: [FilterOperator.EQ, FilterSuffix.NOT]
      },
    })
  }

  async findOne(id: number): Promise<PartnerWithdraw> {
    const partnerWithdraw = await this.parnerWithdrawRepository.findOne({
      where: {
        id: id
      }
    });

    if (!partnerWithdraw) {
      throw new NotFoundException('Partner withdraw not found');
    }
    return partnerWithdraw;
  }

  async update(id: number, updatePartnerWithdrawDto: any): Promise<PartnerWithdraw> {
    await this.findOne(id); // Ensure the partner withdraw exists
    await this.parnerWithdrawRepository.update(id, updatePartnerWithdrawDto);
    return await this.findOne(id); // Return the updated partner withdraw
  }

  async remove(id: number): Promise<void> {
    const result = await this.parnerWithdrawRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException('Partner withdraw not found');
    }
  }
}
