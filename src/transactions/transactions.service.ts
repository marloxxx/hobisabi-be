import { Injectable } from '@nestjs/common';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { UserTransaction } from 'src/database/entities/user-transaction.entity';
import { FilterOperator, FilterSuffix, Paginate, PaginateQuery, Paginated, paginate } from 'nestjs-paginate';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class TransactionsService {
  constructor(@InjectRepository(UserTransaction)
  private readonly transactionRepository: Repository<UserTransaction>
  ) { }

  async create(createTransactionDto: CreateTransactionDto): Promise<UserTransaction> {
    return await this.transactionRepository.save(createTransactionDto);
  }

  async findAll(query: PaginateQuery): Promise<Paginated<UserTransaction>> {
    return paginate(query, this.transactionRepository, {
      sortableColumns: ['id', 'total'],
      searchableColumns: ['total'],
      defaultSortBy: [['id', 'DESC']],
      select: ['id', 'total'],
      filterableColumns: {
        total: [FilterOperator.EQ, FilterSuffix.NOT, FilterOperator.LT, FilterOperator.LTE, FilterOperator.GT, FilterOperator.GTE],
      },
    })
  }

  async update(id: number, updateTransactionDto: UpdateTransactionDto): Promise<UserTransaction> {
    await this.transactionRepository.update(id, updateTransactionDto);
    return await this.transactionRepository.findOne({
      where: {
        id: id
      }
    });
  }

  async remove(id: number): Promise<string> {
    const result = await this.transactionRepository.delete(id);
    if (result.affected === 0) {
      return 'Transaction not found';
    }
  }
}
