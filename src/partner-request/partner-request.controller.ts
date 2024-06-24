import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile, ParseFilePipeBuilder, HttpStatus } from '@nestjs/common';
import { PartnerRequestService } from './partner-request.service';
import { CreatePartnerRequestDto } from './dto/create-partner-request.dto';
import { UpdatePartnerRequestDto } from './dto/update-partner-request.dto';
import { Paginate, PaginateQuery, Paginated } from 'nestjs-paginate';
import { Region } from 'src/database/entities/region.entity';
import { PartnerRequest } from 'src/database/entities/partner-request.entity';
import { FileFieldsInterceptor, FileInterceptor } from '@nestjs/platform-express';
import { CreatePartnerMessageDto } from './dto/create-partner-message.dto';
import { ApiConsumes } from '@nestjs/swagger';

@Controller('partner-request')
export class PartnerRequestController {
  constructor(private readonly partnerRequestService: PartnerRequestService) { }

  @Post()
  @UseInterceptors(FileInterceptor('image'))
  create(@UploadedFile(
    new ParseFilePipeBuilder()
      .addFileTypeValidator({ fileType: 'image/jpeg' })
      .build({ errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY }),
  ) image: Express.Multer.File, @Body() createPartnerRequestDto: CreatePartnerRequestDto) {
    return this.partnerRequestService.create(createPartnerRequestDto, image);
  }

  @Get()
  findAll(@Paginate() query: PaginateQuery): Promise<Paginated<PartnerRequest>> {
    return this.partnerRequestService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.partnerRequestService.findOne(+id);
  }

  // reply
  @Post(':id/reply')
  @UseInterceptors(FileInterceptor('image'))
  @ApiConsumes('multipart/form-data')
  reply(@Param('id') id: string, @UploadedFile(
    new ParseFilePipeBuilder()
      .addFileTypeValidator({ fileType: 'image/jpeg' })
      .build({ errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY }),
  ) image: Express.Multer.File, @Body() createPartnerMessageDto: CreatePartnerMessageDto) {
    return this.partnerRequestService.reply(+id, createPartnerMessageDto, image);
  }
}
