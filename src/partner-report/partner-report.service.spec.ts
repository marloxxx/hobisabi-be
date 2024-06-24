import { Test, TestingModule } from '@nestjs/testing';
import { PartnerReportService } from './partner-report.service';

describe('PartnerReportService', () => {
  let service: PartnerReportService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PartnerReportService],
    }).compile();

    service = module.get<PartnerReportService>(PartnerReportService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
