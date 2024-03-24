import { Module } from '@nestjs/common'
import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'
import { UserService } from '@modules/rest/user/user.service'
import { AccessoryService } from '@modules/accessory/accessory.service'
import { AccessoryModule } from '@modules/accessory/accessory.module'
import { CryptoModule } from '@modules/crypto/crypto.module'

@Module({
  imports: [AccessoryModule, CryptoModule],
  controllers: [AuthController],
  providers: [AuthService, UserService, AccessoryService],
})
export class AuthModule {}
