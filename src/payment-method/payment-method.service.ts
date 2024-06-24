import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePaymentMethodDto } from './dto/create-payment-method.dto';
import { UpdatePaymentMethodDto } from './dto/update-payment-method.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { PaymentMethod } from '../database/entities/payment-method.entity';
import { Repository } from 'typeorm';
import { FilterOperator, FilterSuffix, PaginateQuery, Paginated, paginate } from 'nestjs-paginate';

@Injectable()
export class PaymentMethodService {
  constructor(
    @InjectRepository(PaymentMethod)
    private readonly paymentMethodRepository: Repository<PaymentMethod>
  ) { }

  async create(createPaymentMethodDto: CreatePaymentMethodDto): Promise<PaymentMethod> {
    return await this.paymentMethodRepository.save(createPaymentMethodDto);
  }

  async findAll(query: PaginateQuery): Promise<Paginated<PaymentMethod>> {
    return paginate(query, this.paymentMethodRepository, {
      sortableColumns: ['id', 'name', 'bank', 'number'],
      searchableColumns: ['name', 'bank', 'number'],
      defaultSortBy: [['id', 'DESC']],
      select: ['id', 'name', 'bank', 'number'],
      filterableColumns: {
        name: [FilterOperator.EQ, FilterSuffix.NOT],
        bank: [FilterOperator.EQ, FilterSuffix.NOT],
        number: [FilterOperator.EQ, FilterSuffix.NOT]
      },
    })
  }

  async findOne(id: number): Promise<PaymentMethod> {
    const paymentMethod = await this.paymentMethodRepository.findOne({
      where: {
        id: id
      }
    });

    if (!paymentMethod) {
      throw new NotFoundException('Payment method not found');
    }
    return paymentMethod;
  }

  async update(id: number, updatePaymentMethodDto: UpdatePaymentMethodDto): Promise<PaymentMethod> {
    await this.paymentMethodRepository.update(id, updatePaymentMethodDto);
    return await this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    const result = await this.paymentMethodRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException('Payment method not found');
    }
  }
}
