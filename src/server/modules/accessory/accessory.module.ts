import { Module } from '@nestjs/common'
import { AccessoryService } from '@modules/accessory/accessory.service'
import { ConfigService } from '@nestjs/config'
import { CryptoService } from '@modules/crypto/crypto.service'
import { AppConfigService } from '@modules/config/config.service'
import { CryptoModule } from '@modules/crypto/crypto.module'
@Module({
  imports: [CryptoModule],
  controllers: [],
  providers: [AccessoryService, AppConfigService, ConfigService, CryptoService],
  exports: [AccessoryService, AppConfigService, ConfigService, CryptoService],
})
export class AccessoryModule {}
