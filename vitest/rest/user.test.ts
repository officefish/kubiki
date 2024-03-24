import { Test, TestingModule } from '@nestjs/testing'
import { INestApplication } from '@nestjs/common'
import { faker } from '@faker-js/faker'
import { AppModule } from '@modules/app/app.module'
import { ConfigModule } from '@nestjs/config'
import { Prisma } from '@prisma/client'
//import { PrismaModule } from '@/modules/prisma/prisma.module'

//import { User } from '@prisma/client'
import { PrismaService } from '@modules/prisma/prisma.service'
import { UserService } from '@modules/rest/user/user.service'
import { CryptoService } from '@modules/crypto/crypto.service'
import { AppConfigService } from '@modules/config/config.service'
import { JwtService } from '@nestjs/jwt'

import { describe, test, beforeAll, afterAll, expect } from 'vitest'

import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify'
//import { User } from '@prisma/client'

//const url = '/healthcheck'
//const jsonType = 'application/json; charset=utf-8'
const API_PREFIX = '/api/v1'

const destroyUser = async (prisma: PrismaService, email: string) => {
  await prisma.user.delete({
    where: { email },
  })

  return await checkUserNotExist(prisma, email)
}

const getExistUser = async (prisma: PrismaService, email: string) => {
  return await prisma.user.findUnique({
    where: { email },
  })
}

const checkUserNotExist = async (prisma: PrismaService, email: string) => {
  const prismaUser = await prisma.user.findUnique({
    where: { email },
  })
  return expect(prismaUser).toBe(null)
}

interface FakeNewUser {
  email: string
  name?: string
  password: string
}

interface MakeUserDataParams {
  env: AppConfigService
  crypto: CryptoService
  userData: FakeNewUser
}

interface UserDataForDB {
  email: string
  password: string
  salt: string
  verified: boolean
  name?: string
}

const makeUserInputData = async (
  params: MakeUserDataParams,
): Promise<UserDataForDB> => {
  const { env, crypto, userData } = params
  const saltLength = env.getSaltLength()
  const salt = await crypto.generateSalt(saltLength)
  const hashedPassword = await crypto.hash(userData.password, salt)

  return {
    email: userData.email,
    password: hashedPassword,
    salt,
    verified: false,
  }
}

const generateNewUser = () => {
  return {
    email: faker.internet.email(),
    password: `${faker.internet.password()}Aa1$`,
    name: faker.person.fullName(),
  }
}

describe('UserService', () => {
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

  test('Success ::createUser with correct input data', async () => {
    const userData = generateNewUser()

    /* Sure user not exist in db */
    await checkUserNotExist(prisma, userData.email)

    const userDataForDb = await makeUserInputData({ env, crypto, userData })

    const user = await userService.createUser(userDataForDb)

    const prismaUser = await getExistUser(prisma, userData.email)
    expect(prismaUser).instanceOf(Object)

    expect(user).instanceOf(Object)
    expect(prismaUser).instanceOf(Object)
    expect(user.email == prismaUser.email).toBe(true)
    expect(user.id == prismaUser.id).toBe(true)
    expect(user.password == prismaUser.password).toBe(true)
    expect(user.salt == prismaUser.salt).toBe(true)

    await destroyUser(prisma, userData.email)
  })

  test('::createUser twice will select exist user', async () => {
    const userData = generateNewUser()

    /* Sure user not exist in db */
    await checkUserNotExist(prisma, userData.email)

    const userDataForDb = await makeUserInputData({ env, crypto, userData })

    await prisma.user.create({ data: userDataForDb })

    const prismaUser = await getExistUser(prisma, userData.email)
    expect(prismaUser).instanceOf(Object)

    const anotherUserData = generateNewUser()
    anotherUserData.email = userData.email
    const anotherUserDataForDb = await makeUserInputData({
      env,
      crypto,
      userData: anotherUserData,
    })

    const anotherUserPromise = userService.createUser(anotherUserDataForDb)
    anotherUserPromise
      .then((result) => {
        expect(result).instanceOf(Object)
        expect(result.password).toBe(userDataForDb.password)
        expect(result.password === anotherUserDataForDb.password).toBe(false)
      })
      .catch((e) => {
        expect(e).instanceOf(Error)
        /* should not throw errors */
        expect(e instanceof Prisma.PrismaClientKnownRequestError).toBe(false)
        expect(e.code === 'P2002').toBe(false)
      })

    await destroyUser(prisma, userData.email)
  })

  test('::updateUser should change user data', async () => {
    const userData = generateNewUser()

    /* Sure user not exist in db */
    await checkUserNotExist(prisma, userData.email)

    const userDataForDb = await makeUserInputData({ env, crypto, userData })

    await prisma.user.create({ data: userDataForDb })

    const prismaUser = await getExistUser(prisma, userData.email)
    expect(prismaUser).instanceOf(Object)

    const freshUserData = generateNewUser()
    freshUserData.email = userData.email
    const anotherUserDataForDb = await makeUserInputData({
      env,
      crypto,
      userData: freshUserData,
    })

    const anotherUserPromise = userService.updateUser({
      where: { email: anotherUserDataForDb.email },
      data: anotherUserDataForDb,
    })
    anotherUserPromise
      .then((result) => {
        expect(result).instanceOf(Object)
        expect(result.password).toBe(anotherUserDataForDb.password)
        expect(result.password === userDataForDb.password).toBe(false)
        expect(result.name).toBe(freshUserData.name)
        expect(result.name === userData.name).toBe(false)
      })
      .catch((e) => {
        expect(e).instanceOf(Error)
        /* should not throw errors */
        expect(e instanceof Prisma.PrismaClientKnownRequestError).toBe(false)
        expect(e.code === 'P2002').toBe(false)
      })

    await destroyUser(prisma, userData.email)
  })

  test('(GET) ::User should get user data as User', async () => {
    const userData = generateNewUser()

    /* Sure user not exist in db */
    await checkUserNotExist(prisma, userData.email)

    const userDataForDb = await makeUserInputData({ env, crypto, userData })
    userDataForDb.name = userData.name
    await prisma.user.create({ data: userDataForDb })

    const prismaUser = await userService.user(userDataForDb)
    expect(prismaUser).instanceOf(Object)

    expect(userData.email == prismaUser.email).toBe(true)
    expect(userData.name == prismaUser.name).toBe(true)
    expect(userDataForDb.password == prismaUser.password).toBe(true)

    await destroyUser(prisma, userData.email)
  })

  test('Method ::deleteUser should delete user from database', async () => {
    const userData = generateNewUser()

    /* Sure user not exist in db */
    await checkUserNotExist(prisma, userData.email)

    const userDataForDb = await makeUserInputData({ env, crypto, userData })
    userDataForDb.name = userData.name

    const prismaUser = await prisma.user.create({ data: userDataForDb })
    expect(prismaUser).instanceOf(Object)
    expect(prismaUser.email == userData.email).toBe(true)

    await userService.deleteUser({ email: userData.email })

    await checkUserNotExist(prisma, userData.email)
  })

  afterAll(async () => {
    await app.getHttpServer().close()
  })
})
