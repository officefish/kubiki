import { Test, TestingModule } from '@nestjs/testing'
import { INestApplication } from '@nestjs/common'
import { AppModule } from '@modules/app/app.module'
import { ConfigModule } from '@nestjs/config'
//import { Prisma } from '@prisma/client'
//import { PrismaModule } from '@/modules/prisma/prisma.module'

//import { User } from '@prisma/client'
import { PrismaService } from '@modules/prisma/prisma.service'
import { UserService } from '@modules/rest/user/user.service'
import { CryptoService } from '@modules/crypto/crypto.service'
import { AppConfigService } from '@modules/config/config.service'
import { JwtService } from '@nestjs/jwt'

import {
  describe,
  test,
  //it,
  beforeAll,
  afterAll,
  expect,
  expectTypeOf,
} from 'vitest'

import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify'

import {
  generateNewUser,
  checkUserNotExist,
  makeUserInputData,
  destroyUser,
} from './user.generator'
import { Role } from '@prisma/client'

const jsonType = 'application/json; charset=utf-8'
const API_PREFIX = '/api/v1'

describe('Exchange Data Service', () => {
  let app: INestApplication
  let userService: UserService
  let prisma: PrismaService
  let env: AppConfigService
  let crypto: CryptoService

  //let userData: FakeNewUser
  //let user: User
  //let prismaUser: User

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule, ConfigModule],
      providers: [
        PrismaService,
        UserService,
        CryptoService,
        AppConfigService,
        JwtService,
      ],
    }).compile()

    app = moduleFixture.createNestApplication<NestFastifyApplication>(
      new FastifyAdapter(),
    )
    app.setGlobalPrefix(API_PREFIX)
    await app.init()
    await app.getHttpAdapter().getInstance().ready()

    prisma = await moduleFixture.get<PrismaService>(PrismaService)
    env = await moduleFixture.get<AppConfigService>(AppConfigService)
    crypto = await moduleFixture.get<CryptoService>(CryptoService)
    userService = await moduleFixture.get<UserService>(UserService)
  })

  test('Fail get segments without JWT token', async () => {
    const userData = generateNewUser()

    /* Sure user not exist in db */
    await checkUserNotExist(prisma, userData.email)

    const userDataForDb = await makeUserInputData({ env, crypto, userData })
    const user = await userService.createUser(userDataForDb)
    expect(user).instanceOf(Object)

    const response = await app
      .getHttpAdapter()
      .getInstance()
      .inject()
      .get(`${API_PREFIX}/data/segment/many`)
      .query({ provider: 'ALPHA_VINTAGE', symbol: 'IBM' })

    expect(response.statusCode).toBe(401)
    expect(response.headers['content-type']).toBe(jsonType)
    const json = response.json()
    expect(json).haveOwnProperty('statusCode')
    expect(json).haveOwnProperty('message')
    expect(json['statusCode'] == 401).toBe(true)
    expect(json['message'] == 'Unauthorized').toBe(true)

    await destroyUser(userService, prisma, userData.email)
  })

  test('Error (GET) segments list for not ADMIN role authorised user', async () => {
    const userData = generateNewUser()

    /* Sure user not exist in db */
    await checkUserNotExist(prisma, userData.email)

    const registerResponse = await app
      .getHttpAdapter()
      .getInstance()
      .inject()
      .post(`${API_PREFIX}/auth/sign-up`)
      .payload(userData)

    expect(registerResponse.statusCode).toBe(201)
    expect(registerResponse.headers['content-type']).toBe(jsonType)
    let json = registerResponse.json()
    expect(json).haveOwnProperty('payload')
    expect(json.payload).haveOwnProperty('accessToken')

    const token = json?.payload?.accessToken || undefined
    expect(token).toBeDefined()

    const response = await app
      .getHttpAdapter()
      .getInstance()
      .inject()
      .get(`${API_PREFIX}/data/segment/many`)
      .query({ provider: 'ALPHA_VINTAGE', symbol: 'IBM' })
      .headers({ authorization: `Bearer ${token}` })

    expect(response.statusCode).toBe(403)
    expect(response.headers['content-type']).toBe(jsonType)
    json = response.json()
    expectTypeOf(json).toBeObject()
    expect(json).haveOwnProperty('statusCode')
    expect(json.statusCode).toBe(403)

    await destroyUser(userService, prisma, userData.email)
  })

  test('Success (GET) segments list for ADMIN role authorised user', async () => {
    const userData = generateNewUser()

    /* Sure user not exist in db */
    await checkUserNotExist(prisma, userData.email)

    const registerResponse = await app
      .getHttpAdapter()
      .getInstance()
      .inject()
      .post(`${API_PREFIX}/auth/sign-up`)
      .payload(userData)

    expect(registerResponse.statusCode).toBe(201)
    expect(registerResponse.headers['content-type']).toBe(jsonType)
    let json = registerResponse.json()
    expect(json).haveOwnProperty('payload')
    expect(json.payload).haveOwnProperty('accessToken')

    const token = json?.payload?.accessToken || undefined
    expect(token).toBeDefined()

    const id = json.payload?.id
    /* update user with ADMIN role */
    await prisma.user.update({
      where: { id },
      data: { role: Role.ADMIN },
    })

    const response = await app
      .getHttpAdapter()
      .getInstance()
      .inject()
      .get(`${API_PREFIX}/data/segment/many`)
      .query({ provider: 'ALPHA_VINTAGE', symbol: 'IBM' })
      .headers({ authorization: `Bearer ${token}` })

    expect(response.statusCode).toBe(201)
    expect(response.headers['content-type']).toBe(jsonType)
    json = response.json()
    expectTypeOf(json).toBeObject()
    expect(json).haveOwnProperty('statusCode')
    expect(json.statusCode).toBe(201)

    await destroyUser(userService, prisma, userData.email)
  })

  afterAll(async () => {
    await app.getHttpServer().close()
  })
})
