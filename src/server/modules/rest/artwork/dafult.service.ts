import { Injectable } from '@nestjs/common'
import { DefaultArtworks } from './template'

@Injectable()
export class DefaultService {
  default() {
    return DefaultArtworks
  }
}
