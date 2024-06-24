import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { WithdrawsService } from './withdraws.service';
import { CreateWithdrawDto } from './dto/create-withdraw.dto';
import { UpdateWithdrawDto } from './dto/update-withdraw.dto';
import { Paginate, PaginateQuery, Paginated } from 'nestjs-paginate';
import { PartnerWithdraw } from 'src/database/entities/partner-withdraw.entity';

@Controller('withdraws')
export class WithdrawsController {
  constructor(private readonly withdrawsService: WithdrawsService) { }

  @Post()
  create(@Body() createPartnerWithdrawDto: CreateWithdrawDto) {
    return this.withdrawsService.create(createPartnerWithdrawDto);
  }

  @Get()
  findAll(@Paginate() query: PaginateQuery): Promise<Paginated<PartnerWithdraw>> {
    return this.withdrawsService.findAll(query);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePartnerWithdrawDto: UpdateWithdrawDto) {
    return this.withdrawsService.update(+id, updatePartnerWithdrawDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.withdrawsService.remove(+id);
  }
}
