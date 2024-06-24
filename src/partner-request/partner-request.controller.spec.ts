import { Test, TestingModule } from '@nestjs/testing';
import { PartnerRequestController } from './partner-request.controller';
import { PartnerRequestService } from './partner-request.service';

describe('PartnerRequestController', () => {
  let controller: PartnerRequestController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PartnerRequestController],
      providers: [PartnerRequestService],
    }).compile();

    controller = module.get<PartnerRequestController>(PartnerRequestController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
