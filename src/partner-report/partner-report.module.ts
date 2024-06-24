import { Module } from '@nestjs/common';
import { PartnerReportService } from './partner-report.service';
import { PartnerReportController } from './partner-report.controller';

@Module({
  controllers: [PartnerReportController],
  providers: [PartnerReportService],
})
export class PartnerReportModule {}
