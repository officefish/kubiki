import {
  Controller,
  Post,
  //Body,
  Req,
  UseInterceptors,
  UploadedFile,
  Res,
  // Injectable,
} from '@nestjs/common'
import { FastifyRequest, FastifyReply } from 'fastify'

//import fs from 'fs'

import { FileInterceptor } from '@nest-lab/fastify-multer'
//import { FilesObject } from '@nest-lab/fastify-multer'
import { diskStorage } from 'fastify-multer'
import { memoryStorage } from 'fastify-multer'

import { File } from '@nest-lab/fastify-multer'
//import { randomUUID } from 'crypto'

import { UploadService } from './upload.service'

import {
  //ApiCreatedResponse,
  //ApiResponse,
  //ApiBody,
  ApiTags,
} from '@nestjs/swagger'
import { SharpService } from 'nestjs-sharp'

@ApiTags('file')
@Controller('file')
//@Injectable({ imageProccessing: Sharp })
export class UploadController {
  constructor(
    private readonly imageProcessing: SharpService,
    private readonly service: UploadService,
  ) {}

  @Post('/single')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination(req, file, cb) {
          cb(null, './public/media')
        },
        filename(req, file, cb) {
          cb(null, 'techies_' + file.originalname)
        },
      }),
    }),
  )
  uploadSingleFile(@UploadedFile() file: File) {
    //console.log(file)
    console.log(file.fieldname)

    return { success: !!file }
  }

  @Post('/single/webp')
  @UseInterceptors(
    FileInterceptor('file', {
      //   storage: diskStorage({
      //     destination(req, file, cb) {
      //       cb(null, './public/media')
      //     },
      //     filename(req, file, cb) {
      //       cb(null, 'techies_' + Date.now() + '.webp')
      //     },
      //   }),
      storage: memoryStorage(),
    }),
  )
  async uploadSingleThenConvertToWebp(
    //@Body() credentials: SignInDto,
    @UploadedFile() file: File,
    //@Req() request: FastifyRequest,
    @Res() reply: FastifyReply,
  ): Promise<object> {
    console.log(file)
    const fileName = await this.service.convertToWebp(file.buffer)
    if (fileName) {
      console.log(fileName)
      return reply.code(201).send({ statusCode: 201, message: 'ok' })
    }
    return reply
      .code(403)
      .send({ statusCode: 403, message: 'Error processing image' })
  }

  @Post('/')
  async upload(
    //@Body() credentials: SignInDto,
    @Req() request: FastifyRequest,
    @Res() reply: FastifyReply,
  ): Promise<object> {
    return reply.code(201).send({ statusCode: 201, message: 'ok' })
  }
}
