import { Module } from '@nestjs/common'
import { ChallengeController } from './challenge.controller'
import { ChallengeService } from './challenge.service'
import { PrismaService } from '@modules/prisma/prisma.service'
import { UserService } from '@modules/rest/user/user.service'
import { CryptoService } from '@modules/crypto/crypto.service'
import { JwtService } from '@nestjs/jwt'

import { AccessoryService } from '@modules/accessory/accessory.service'
import { AccessoryModule } from '@modules/accessory/accessory.module'
import { CategoryService } from './category.service'
import { ScoreService } from './score.service'
import { ArtworkModule } from '../artwork/artwork.module'
import { ArtworkService } from '../artwork/artwork.service'
import { DefaultService } from '../artwork/dafult.service'
import { UploadService } from '../upload/upload.service'
import { UploadModule } from '../upload/upload.module'
import { SharpService } from 'nestjs-sharp'

@Module({
  imports: [AccessoryModule, ArtworkModule, UploadModule],
  controllers: [ChallengeController],
  providers: [
    ArtworkService,
    DefaultService,
    UploadService,
    SharpService,
    ChallengeService,
    ScoreService,
    CategoryService,
    PrismaService,
    UserService,
    CryptoService,
    JwtService,
    AccessoryService,
  ],
})
export class ChallengeModule {}
