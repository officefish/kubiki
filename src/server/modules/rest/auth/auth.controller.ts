import { Controller, Post, Body, Req, Get, UseGuards } from '@nestjs/common'
import { Res } from '@nestjs/common'
import { AuthService } from './auth.service'
import { FastifyRequest, FastifyReply } from 'fastify'
import { SignInDto, SignUpDto, SignInSuccessDto, FailDto } from './auth.schema'

import {
  ApiCreatedResponse,
  ApiResponse,
  ApiBody,
  ApiTags,
} from '@nestjs/swagger'
import {
  SignInResponseDesc,
  SignInBodyDesc,
  SignInValidationFailedDesc,
} from './auth.constants'

import { User as UserModel } from '@prisma/client'
import { AccessoryService } from '@modules/accessory/accessory.service'
import { CryptoService } from '@modules/crypto/crypto.service'
import { UserService } from '@modules/rest/user/user.service'
import { AppConfigService } from '@modules/config/config.service'

import { Role } from '@prisma/client'
import { AuthGuard } from './auth.guard'

interface SignInSuccessPayload {
  email: string
  id: string
  name: string
  verified: boolean
  authenticated: boolean
  role: Role
  accessToken?: string
}

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly service: AuthService,
    private readonly accessory: AccessoryService,
    private readonly crypto: CryptoService,
    private readonly userService: UserService,
    private readonly env: AppConfigService,
  ) {}

  @Post('sign-in')
  @ApiCreatedResponse({
    description: SignInResponseDesc,
    type: SignInSuccessDto,
  })
  @ApiResponse({
    status: 400,
    description: SignInValidationFailedDesc,
  })
  @ApiResponse({
    status: 403,
    description: 'UNAUTHORIZED',
    type: FailDto,
  })
  @ApiBody({
    description: SignInBodyDesc,
    type: SignInDto,
  })
  async signIn(
    @Body() credentials: SignInDto,
    @Req() request: FastifyRequest,
    @Res() reply: FastifyReply,
  ): Promise<SignInSuccessDto> {
    const { email, password } = credentials
    const user: UserModel = await this.service.signIn(email, password)

    if (!user) {
      return reply.code(401).send({ statusCode: 401, message: 'UNAUTHORIZED' })
    }

    // If the user has enabled two-factor authentication (2FA) ...
    // Don't login until a 2FA code is provided.
    if (user.secret) {
      return reply.code(403).send({ statusCode: 403, message: 'FORBIDDEN' })
    }

    // 2FA is not enabled for this account,
    // so create a new session for this user.
    //await updateSession(request, reply, user)
    const userId = user.id
    const userRole = user.role

    const { sessionId, options } = await this.accessory.regenerateSession({
      request,
      reply,
      userId,
      userRole,
    })

    /* Vitest request does not create session, so we should create jwt as parameter */
    let jwtToken: string
    if (sessionId) {
      await this.accessory.createTokenCookies({
        userId,
        sessionId,
        reply,
        options,
      })
    } else {
      jwtToken = await this.accessory.signAsync(userId, user.name)
    }

    if (!user.verified) {
      //await sendVerifyEmail(request, reply, email)
    }

    const payload = {
      id: user?.id,
      email: user?.email,
      name: user?.name,
      verified: user?.verified,
      authenticated: true,
      role: user?.role,
    } as SignInSuccessPayload
    if (jwtToken) {
      payload.accessToken = jwtToken
    }

    return reply.code(201).send({ statusCode: 201, payload })
  }

  @Post('sign-up')
  async register(
    @Body() credentials: SignUpDto,
    @Req() request: FastifyRequest,
    @Res() reply: FastifyReply,
  ) {
    const { email, password, name } = credentials

    const saltLength = this.env.getSaltLength()

    /* */
    const existUser = await this.userService.user({ email, verified: true })
    if (existUser) {
      reply.code(409).send({ statusCode: 409, message: 'CONFLICT' })
    }

    try {
      const salt = await this.crypto.generateSalt(saltLength)
      const hashedPassword = await this.crypto.hash(password, salt)

      // Insert a record into the "user" collection.
      const data = {
        name,
        email,
        password: hashedPassword,
        salt,
        verified: false,
      }
      const user = await this.userService.createUser(data)

      if (user) {
        try {
          // After successfully creating a new user, automatically log in.
          return await this.signIn(credentials, request, reply)
          //reply.code(201).send(signInPayload)
        } catch (e) {
          console.log(e)
          reply.code(403).send({ statusCode: 403, message: 'FORBIDDEN' })
        }
      } else {
        reply.code(502).send({ statusCode: 502, message: 'DATABASE ERROR' })
      }

      //console.log(user)
    } catch (e) {
      //reply.code(reply.codeStatus.CONFLICT).send(e)
      //console.log(e)
      reply.code(409).send({ statusCode: 409, message: 'CONFLICT', error: e })
    }
  }

  @UseGuards(AuthGuard)
  @Get('sign-out')
  async logout(@Req() request: FastifyRequest, @Res() reply: FastifyReply) {
    const id = request['userId']
    const user = await this.userService.user({ id })

    if (!user) {
      return reply
        .code(401)
        .send({ statusCode: 401, message: 'User not found' })
    }

    const { options } = await this.accessory.regenerateSession({
      request,
      reply,
      userId: user.id,
      userRole: user.role,
    })
    // Clear the access and refresh token cookies for this session.
    this.accessory.clearCookie({
      reply,
      name: 'access-token',
      options,
    })
    this.accessory.clearCookie({ reply, name: 'refresh-token', options })

    reply.code(200).send({ statusCode: 200, message: 'User success sign out.' })
  }
}
