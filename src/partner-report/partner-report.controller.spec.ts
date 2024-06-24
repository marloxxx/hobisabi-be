import { Test, TestingModule } from '@nestjs/testing';
import { PartnerReportController } from './partner-report.controller';
import { PartnerReportService } from './partner-report.service';

describe('PartnerReportController', () => {
  let controller: PartnerReportController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PartnerReportController],
      providers: [PartnerReportService],
    }).compile();

    controller = module.get<PartnerReportController>(PartnerReportController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
