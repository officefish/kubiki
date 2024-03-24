import { Injectable } from '@nestjs/common'
//import { PrismaService } from '@modules/prisma/prisma.service'
import { UserService } from '@modules/rest/user/user.service'
import { CryptoService } from '@modules/crypto/crypto.service'
//import { User } from '@prisma/client'
//import { Prisma } from '@prisma/client'
import { User as UserModel } from '@prisma/client'

@Injectable()
export class AuthService {
  constructor(
    //private prisma: PrismaService,
    private userService: UserService,
    private cryptoService: CryptoService,
  ) {}

  async signIn(email: string, password: string): Promise<UserModel | null> {
    const user = await this.userService.user({ email: email })
    const samePassword = await this.cryptoService.compare(
      password,
      user?.password || '',
    )
    if (!user || !samePassword) return null

    return user //new Promise(() => user.id)
  }
}
