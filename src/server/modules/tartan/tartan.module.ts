import { Module, Global } from '@nestjs/common'
import { TartanService } from './tartan.service'
@Global()
@Module({
  controllers: [],
  providers: [TartanService],
  exports: [TartanService],
})
export class TartanModule {}
