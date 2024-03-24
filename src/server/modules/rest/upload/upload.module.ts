import { Module } from '@nestjs/common'
import { FastifyMulterModule } from '@nest-lab/fastify-multer'
import { UploadController } from './upload.controller'
import { SharpModule } from 'nestjs-sharp'
import { SharpService } from 'nestjs-sharp'
import { UploadService } from './upload.service'
import * as multer from 'multer'

@Module({
  imports: [
    SharpModule,
    FastifyMulterModule.register({
      dest: '/public',
      fileFilter: (req, file, cb) => {
        //let extension = file.originalname.split('.').pop()
        //Put here your custom validation for file extensións.
        // To accept the file pass `true`, like so:
        cb(null, true)
        // To reject this file pass `false` or throw Exception, like so:
        //cb(new HttpException ("File format is not valid", HttpStatus.BAD_REQUEST), false)
      },
      limits: {
        fileSize: 2097152, //2 Megabytes
      },
      storage: multer.diskStorage({
        destination(req, file, cb) {
          cb(null, './public')
        },
        filename(req, file, cb) {
          cb(null, 'usman_' + file.originalname)
        },
      }),
    }),
  ],
  controllers: [UploadController],
  providers: [SharpService, UploadService],
})
export class UploadModule {}
