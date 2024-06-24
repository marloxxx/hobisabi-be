import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateRegionDto } from './dto/create-region.dto';
import { UpdateRegionDto } from './dto/update-region.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Region } from 'src/database/entities/region.entity';
import { Repository } from 'typeorm';
import { FilterOperator, FilterSuffix, PaginateQuery, Paginated, paginate } from 'nestjs-paginate';

@Injectable()
export class RegionsService {
  constructor(
    @InjectRepository(Region)
    private readonly regionRepository: Repository<Region>) { }

  async create(createRegionDto: CreateRegionDto): Promise<Region> {
    return await this.regionRepository.save(createRegionDto);
  }

  async findAll(query: PaginateQuery): Promise<Paginated<Region>> {
    return paginate(query, this.regionRepository, {
      sortableColumns: ['id', 'city', 'district'],
      searchableColumns: ['city', 'district'],
      defaultSortBy: [['id', 'DESC']],
      select: ['id', 'city', 'district'],
      filterableColumns: {
        city: [FilterOperator.EQ, FilterSuffix.NOT],
        district: [FilterOperator.EQ, FilterSuffix.NOT],
      },
    })
  }

  async findOne(id: number): Promise<Region> {
    return await this.regionRepository.findOne({
      where: {
        id: id
      }
    });
  }

  async update(id: number, updateRegionDto: UpdateRegionDto): Promise<Region> {
    await this.regionRepository.update(id, updateRegionDto);
    return await this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    const result = await this.regionRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException('Region not found');
    }
  }
}
