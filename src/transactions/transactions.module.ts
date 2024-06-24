import { Module } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { TransactionsController } from './transactions.controller';
import { UserTransaction } from 'src/database/entities/user-transaction.entity';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [ConfigModule, TypeOrmModule.forFeature([UserTransaction])],
  controllers: [TransactionsController],
  providers: [TransactionsService],
})
export class TransactionsModule { }
