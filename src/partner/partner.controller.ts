import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFiles, ParseFilePipeBuilder, HttpStatus } from '@nestjs/common';
import { PartnerService } from './partner.service';
import { CreatePartnerDto } from './dto/create-partner.dto';
import { UpdatePartnerDto } from './dto/update-partner.dto';
import { Partner } from 'src/database/entities/partner.entity';
import { Paginate, PaginateQuery, Paginated } from 'nestjs-paginate';
import { AnyFilesInterceptor, FileFieldsInterceptor } from '@nestjs/platform-express';
import { ApiBody, ApiConsumes, ApiResponse } from '@nestjs/swagger';
import { diskStorage } from 'multer';

@Controller('partner')
export class PartnerController {
  constructor(private readonly partnerService: PartnerService) { }

  @Post()
  @UseInterceptors(FileFieldsInterceptor([
    { name: 'image', maxCount: 1 },
    { name: 'banner', maxCount: 1 },
    { name: 'popup', maxCount: 1 },
    { name: 'files', maxCount: 10 },
    { name: 'idCard', maxCount: 1 },
  ],
    {
      storage: diskStorage({
        destination: './uploads/partner',
        filename: (req, file, cb) => {
          const randomName = Array(32).fill(null).map(() => (Math.round(Math.random() * 16)).toString(16)).join('');
          cb(null, `${randomName}${file.originalname}`);
        },
      }),
    }
  ))
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    type: CreatePartnerDto,
    description: 'Create a new partner',
  })
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
  })
  create(@Body() createPartnerDto: CreatePartnerDto) {
    return this.partnerService.create(createPartnerDto);
  }

  @Get()
  @ApiResponse({
    status: 200,
    description: 'The records has been successfully retrieved.',
  })
  findAll(@Paginate() query: PaginateQuery): Promise<Paginated<Partner>> {
    return this.partnerService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.partnerService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePartnerDto: UpdatePartnerDto) {
    return this.partnerService.update(+id, updatePartnerDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.partnerService.remove(+id);
  }

  @Post('upload')
  @UseInterceptors(FileFieldsInterceptor([
    { name: 'image', maxCount: 1 },
    { name: 'banner', maxCount: 1 },
    { name: 'popup', maxCount: 1 },
    { name: 'files', maxCount: 10 },
    { name: 'idCard', maxCount: 1 },
  ],
    {
      storage: diskStorage({
        destination: './uploads/partner',
        filename: (req, file, cb) => {
          const randomName = Array(32).fill(null).map(() => (Math.round(Math.random() * 16)).toString(16)).join('');
          cb(null, `${randomName}${file.originalname}`);
        },
      }),
    }
  ))
  @ApiConsumes('multipart/form-data')
  upload(@Body() body: any, @UploadedFiles(
    new ParseFilePipeBuilder()
      .addFileTypeValidator({ fileType: 'image/jpeg' })
      .addFileTypeValidator({ fileType: 'image/png' })
      .addFileTypeValidator({ fileType: 'video/mp4' })
      .build({ errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY }),
  ) files: Array<Express.Multer.File>
  ) {
    return this.partnerService.upload(body.id, files);
  }

  @Delete(':id/image/:imageId')
  deleteImage(@Param('id') id: string, @Param('imageId') imageId: string) {
    return this.partnerService.deleteImage(+id, +imageId);
  }
}
