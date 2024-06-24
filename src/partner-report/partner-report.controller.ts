import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PartnerReportService } from './partner-report.service';
import { CreatePartnerReportDto } from './dto/create-partner-report.dto';
import { UpdatePartnerReportDto } from './dto/update-partner-report.dto';

@Controller('partner-report')
export class PartnerReportController {
  constructor(private readonly partnerReportService: PartnerReportService) {}

  @Post()
  create(@Body() createPartnerReportDto: CreatePartnerReportDto) {
    return this.partnerReportService.create(createPartnerReportDto);
  }

  @Get()
  findAll() {
    return this.partnerReportService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.partnerReportService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePartnerReportDto: UpdatePartnerReportDto) {
    return this.partnerReportService.update(+id, updatePartnerReportDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.partnerReportService.remove(+id);
  }
}
