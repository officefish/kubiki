import { Module } from '@nestjs/common'
import { ArtworkController } from './artwork.controller'
import { ArtworkService } from './artwork.service'
import { PrismaService } from '@modules/prisma/prisma.service'
import { UserService } from '@modules/rest/user/user.service'
import { CryptoService } from '@modules/crypto/crypto.service'
import { JwtService } from '@nestjs/jwt'

import { AccessoryService } from '@modules/accessory/accessory.service'
import { AccessoryModule } from '@modules/accessory/accessory.module'
import { UploadModule } from '../upload/upload.module'
import { UploadService } from '../upload/upload.service'
import { SharpModule, SharpService } from 'nestjs-sharp'
import { ScoreService } from './score.service'
import { DefaultService } from './dafult.service'
import { AppConfigService } from '../../config/config.service'
import { AppConfigModule } from '../../config/config.module'

@Module({
  imports: [AccessoryModule, UploadModule, SharpModule, AppConfigModule],
  controllers: [ArtworkController],
  providers: [
    AppConfigService,
    DefaultService,
    ScoreService,
    SharpService,
    UploadService,
    ArtworkService,
    PrismaService,
    UserService,
    CryptoService,
    JwtService,
    AccessoryService,
  ],
})
export class ArtworkModule {}
