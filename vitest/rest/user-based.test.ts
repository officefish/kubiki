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
  generateBasicInfo,
  IncludeAllBasicInfo,
  destroyUser,
  generateRandomQuote,
  generateRandomDomain,
} from './user.generator'

const API_PREFIX = '/api/v1'

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

  test('Create basicInfo', async () => {
    const userData = generateNewUser()

    /* Sure user not exist in db */
    await checkUserNotExist(prisma, userData.email)

    const userDataForDb = await makeUserInputData({ env, crypto, userData })
    const user = await userService.createUser(userDataForDb)

    expect(user).instanceOf(Object)

    const basicInfo = generateBasicInfo(IncludeAllBasicInfo)

    const prismaBasicInfo = await userService.upsetBasicInfo({
      user: { id: user.id },
      data: basicInfo,
    })

    const fullNameData = await prisma.fullName.findUnique({
      where: { basicInfoId: prismaBasicInfo.id },
    })
    expect(fullNameData).instanceOf(Object)
    expect(fullNameData.basicInfoId == prismaBasicInfo.id).toBe(true)

    const careerData = await prisma.career.findUnique({
      where: { basicInfoId: prismaBasicInfo.id },
    })
    expect(careerData).instanceOf(Object)
    expect(careerData.basicInfoId == prismaBasicInfo.id).toBe(true)

    const educationData = await prisma.education.findUnique({
      where: { basicInfoId: prismaBasicInfo.id },
    })
    expect(educationData).instanceOf(Object)
    expect(educationData.basicInfoId == prismaBasicInfo.id).toBe(true)

    const locationData = await prisma.location.findUnique({
      where: { basicInfoId: prismaBasicInfo.id },
    })
    expect(locationData).instanceOf(Object)
    expect(locationData.basicInfoId == prismaBasicInfo.id).toBe(true)

    await destroyUser(userService, prisma, userData.email)
  })

  test('Update basicInfo', async () => {
    const userData = generateNewUser()

    /* Sure user not exist in db */
    await checkUserNotExist(prisma, userData.email)

    const userDataForDb = await makeUserInputData({ env, crypto, userData })
    const user = await userService.createUser(userDataForDb)

    expect(user).instanceOf(Object)

    let basicInfo = generateBasicInfo(IncludeAllBasicInfo)

    let prismaBasicInfo = await userService.upsetBasicInfo({
      user: { id: user.id },
      data: basicInfo,
    })
    expect(prismaBasicInfo).instanceOf(Object)

    /* second time generation then update */
    basicInfo = generateBasicInfo(IncludeAllBasicInfo)
    prismaBasicInfo = await userService.upsetBasicInfo({
      user: { id: user.id },
      data: basicInfo,
    })

    const fullNameData = await prisma.fullName.findUnique({
      where: { basicInfoId: prismaBasicInfo.id },
    })
    expect(fullNameData).instanceOf(Object)
    expect(fullNameData.basicInfoId == prismaBasicInfo.id).toBe(true)
    expect(fullNameData.firstName == basicInfo.fullName.firstName).toBe(true)
    expect(fullNameData.lastName == basicInfo.fullName.lastName).toBe(true)

    const careerData = await prisma.career.findUnique({
      where: { basicInfoId: prismaBasicInfo.id },
    })
    expect(careerData).instanceOf(Object)
    expect(careerData.basicInfoId == prismaBasicInfo.id).toBe(true)
    expect(careerData.company == basicInfo.career.company).toBe(true)
    expect(careerData.role == basicInfo.career.role).toBe(true)

    const educationData = await prisma.education.findUnique({
      where: { basicInfoId: prismaBasicInfo.id },
    })
    expect(educationData).instanceOf(Object)
    expect(educationData.basicInfoId == prismaBasicInfo.id).toBe(true)
    expect(educationData.university == basicInfo.education.university).toBe(
      true,
    )
    expect(educationData.faculty == basicInfo.education.faculty).toBe(true)

    const locationData = await prisma.location.findUnique({
      where: { basicInfoId: prismaBasicInfo.id },
    })
    expect(locationData).instanceOf(Object)
    expect(locationData.basicInfoId == prismaBasicInfo.id).toBe(true)
    expect(locationData.country == basicInfo.location.country).toBe(true)
    expect(locationData.region == basicInfo.location.region).toBe(true)
    expect(locationData.timeZone == basicInfo.location.timeZone).toBe(true)

    await destroyUser(userService, prisma, userData.email)
  })

  test('Create and then update basicInfo', async () => {
    const userData = generateNewUser()

    /* Sure user not exist in db */
    await checkUserNotExist(prisma, userData.email)

    const userDataForDb = await makeUserInputData({ env, crypto, userData })
    const user = await userService.createUser(userDataForDb)

    expect(user).instanceOf(Object)

    const basicInfo1 = generateBasicInfo({
      includeFullname: true,
      includeCareer: true,
      includeEducation: false,
      includeLocation: false,
    })

    let prismaBasicInfo = await userService.upsetBasicInfo({
      user: { id: user.id },
      data: basicInfo1,
    })
    expect(prismaBasicInfo).instanceOf(Object)

    /* second time generation then update */
    const basicInfo2 = generateBasicInfo({
      includeFullname: false,
      includeCareer: false,
      includeEducation: true,
      includeLocation: true,
    })

    prismaBasicInfo = await userService.upsetBasicInfo({
      user: { id: user.id },
      data: basicInfo2,
    })

    const fullNameData = await prisma.fullName.findUnique({
      where: { basicInfoId: prismaBasicInfo.id },
    })
    expect(fullNameData).instanceOf(Object)
    expect(fullNameData.basicInfoId == prismaBasicInfo.id).toBe(true)
    expect(fullNameData.firstName == basicInfo1.fullName.firstName).toBe(true)
    expect(fullNameData.lastName == basicInfo1.fullName.lastName).toBe(true)

    const careerData = await prisma.career.findUnique({
      where: { basicInfoId: prismaBasicInfo.id },
    })
    expect(careerData).instanceOf(Object)
    expect(careerData.basicInfoId == prismaBasicInfo.id).toBe(true)
    expect(careerData.company == basicInfo1.career.company).toBe(true)
    expect(careerData.role == basicInfo1.career.role).toBe(true)

    const educationData = await prisma.education.findUnique({
      where: { basicInfoId: prismaBasicInfo.id },
    })
    expect(educationData).instanceOf(Object)
    expect(educationData.basicInfoId == prismaBasicInfo.id).toBe(true)
    expect(educationData.university == basicInfo2.education.university).toBe(
      true,
    )
    expect(educationData.faculty == basicInfo2.education.faculty).toBe(true)

    const locationData = await prisma.location.findUnique({
      where: { basicInfoId: prismaBasicInfo.id },
    })
    expect(locationData).instanceOf(Object)
    expect(locationData.basicInfoId == prismaBasicInfo.id).toBe(true)
    expect(locationData.country == basicInfo2.location.country).toBe(true)
    expect(locationData.region == basicInfo2.location.region).toBe(true)
    expect(locationData.timeZone == basicInfo2.location.timeZone).toBe(true)

    await destroyUser(userService, prisma, userData.email)
  })

  test('Create quote', async () => {
    const userData = generateNewUser()

    /* Sure user not exist in db */
    await checkUserNotExist(prisma, userData.email)

    const userDataForDb = await makeUserInputData({ env, crypto, userData })
    const user = await userService.createUser(userDataForDb)

    expect(user).instanceOf(Object)

    const quote = generateRandomQuote()

    const prismaQuote = await userService.upsetQuote({
      user: { id: user.id },
      data: quote,
    })

    const quoteData = await prisma.quote.findUnique({
      where: { userId: user.id },
    })
    expect(prismaQuote).instanceOf(Object)
    expect(quoteData).instanceOf(Object)
    expect(quote.content == quoteData.content).toBe(true)

    await destroyUser(userService, prisma, userData.email)
  })

  test('Update quote', async () => {
    const userData = generateNewUser()

    /* Sure user not exist in db */
    await checkUserNotExist(prisma, userData.email)

    const userDataForDb = await makeUserInputData({ env, crypto, userData })
    const user = await userService.createUser(userDataForDb)

    expect(user).instanceOf(Object)

    let quote = generateRandomQuote()
    const oldConent = quote.content

    let prismaQuote = await userService.upsetQuote({
      user: { id: user.id },
      data: quote,
    })

    quote = generateRandomQuote()
    prismaQuote = await userService.upsetQuote({
      user: { id: user.id },
      data: quote,
    })

    const quoteData = await prisma.quote.findUnique({
      where: { userId: user.id },
    })
    expect(prismaQuote).instanceOf(Object)
    expect(quoteData).instanceOf(Object)
    expect(prismaQuote.content == quoteData.content).toBe(true)
    expect(quoteData.content == oldConent).toBe(false)

    await destroyUser(userService, prisma, userData.email)
  })

  test('Create domain', async () => {
    const userData = generateNewUser()

    /* Sure user not exist in db */
    await checkUserNotExist(prisma, userData.email)

    const userDataForDb = await makeUserInputData({ env, crypto, userData })
    const user = await userService.createUser(userDataForDb)

    expect(user).instanceOf(Object)

    const domain = generateRandomDomain()

    const prismaDomain = await userService.upsetDomain({
      user: { id: user.id },
      data: domain,
    })

    const domainData = await prisma.domain.findUnique({
      where: { userId: user.id },
    })
    expect(prismaDomain).instanceOf(Object)
    expect(domainData).instanceOf(Object)
    expect(domain.value == domainData.value).toBe(true)

    await destroyUser(userService, prisma, userData.email)
  })

  test('Update domain', async () => {
    const userData = generateNewUser()

    /* Sure user not exist in db */
    await checkUserNotExist(prisma, userData.email)

    const userDataForDb = await makeUserInputData({ env, crypto, userData })
    const user = await userService.createUser(userDataForDb)

    expect(user).instanceOf(Object)

    let domain = generateRandomDomain()
    const oldValue = domain.value

    let prismaDomain = await userService.upsetDomain({
      user: { id: user.id },
      data: domain,
    })

    domain = generateRandomDomain()
    prismaDomain = await userService.upsetDomain({
      user: { id: user.id },
      data: domain,
    })

    const domainData = await prisma.domain.findUnique({
      where: { userId: user.id },
    })
    expect(prismaDomain).instanceOf(Object)
    expect(domainData).instanceOf(Object)
    expect(prismaDomain.value == domainData.value).toBe(true)
    expect(domainData.value == oldValue).toBe(false)

    await destroyUser(userService, prisma, userData.email)
  })

  test('Create domain and get domain value', async () => {
    const userData = generateNewUser()

    /* Sure user not exist in db */
    await checkUserNotExist(prisma, userData.email)

    const userDataForDb = await makeUserInputData({ env, crypto, userData })
    const user = await userService.createUser(userDataForDb)

    expect(user).instanceOf(Object)

    const domain = generateRandomDomain()
    const value = domain.value

    const prismaDomain = await userService.upsetDomain({
      user: { id: user.id },
      data: domain,
    })

    expect(prismaDomain).instanceOf(Object)

    const serviceDomain = await userService.domain({
      value,
    })
    expect(serviceDomain).instanceOf(Object)

    await destroyUser(userService, prisma, userData.email)
  })

  test('Fail attemt to create two domains with same value', async () => {
    /* first user data */
    const firstUserData = generateNewUser()
    await checkUserNotExist(prisma, firstUserData.email)

    const firstUserDataForDb = await makeUserInputData({
      env,
      crypto,
      userData: firstUserData,
    })
    const firstUser = await userService.createUser(firstUserDataForDb)
    expect(firstUser).instanceOf(Object)

    const domain = generateRandomDomain()

    const firstPrismaDomain = await userService.upsetDomain({
      user: { id: firstUser.id },
      data: domain,
    })
    expect(firstPrismaDomain).instanceOf(Object)

    const secondUserData = generateNewUser()
    await checkUserNotExist(prisma, secondUserData.email)

    const secondUserDataForDb = await makeUserInputData({
      env,
      crypto,
      userData: secondUserData,
    })
    const secondUser = await userService.createUser(secondUserDataForDb)
    expect(secondUser).instanceOf(Object)

    const secondPrismaDomain = await userService.upsetDomain({
      user: { id: secondUser.id },
      data: domain,
    })

    expectTypeOf(secondPrismaDomain).not.toBeObject({} as never)

    await destroyUser(userService, prisma, firstUserData.email)
    await destroyUser(userService, prisma, secondUserData.email)
  })

  afterAll(async () => {
    await app.getHttpServer().close()
  })
})
