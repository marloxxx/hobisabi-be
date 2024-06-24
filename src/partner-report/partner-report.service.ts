import { Injectable } from '@nestjs/common';
import { CreatePartnerReportDto } from './dto/create-partner-report.dto';
import { UpdatePartnerReportDto } from './dto/update-partner-report.dto';

@Injectable()
export class PartnerReportService {
  create(createPartnerReportDto: CreatePartnerReportDto) {
    return 'This action adds a new partnerReport';
  }

  findAll() {
    return `This action returns all partnerReport`;
  }

  findOne(id: number) {
    return `This action returns a #${id} partnerReport`;
  }

  update(id: number, updatePartnerReportDto: UpdatePartnerReportDto) {
    return `This action updates a #${id} partnerReport`;
  }

  remove(id: number) {
    return `This action removes a #${id} partnerReport`;
  }
}
