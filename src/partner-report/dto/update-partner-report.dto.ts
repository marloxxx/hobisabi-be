import { PartialType } from '@nestjs/swagger';
import { CreatePartnerReportDto } from './create-partner-report.dto';

export class UpdatePartnerReportDto extends PartialType(CreatePartnerReportDto) {}
