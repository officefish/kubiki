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
  generateBasicInfo,
  IncludeAllBasicInfo,
  destroyUser,
  generateRandomQuote,
  generateRandomDomain,
} from './user.generator'

const jsonType = 'application/json; charset=utf-8'
const API_PREFIX = '/api/v1'

describe('User Profile Service', () => {
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

  test('Fail Create User BasicInfo with (POST) :: UserProfile without JWT', async () => {
    const userData = generateNewUser()

    /* Sure user not exist in db */
    await checkUserNotExist(prisma, userData.email)

    const userDataForDb = await makeUserInputData({ env, crypto, userData })
    const user = await userService.createUser(userDataForDb)
    expect(user).instanceOf(Object)

    const basicInfo = generateBasicInfo(IncludeAllBasicInfo)

    const response = await app
      .getHttpAdapter()
      .getInstance()
      .inject()
      .post(`${API_PREFIX}/user/profile`)
      .payload({ basicInfo: basicInfo })

    expect(response.statusCode).toBe(401)
    expect(response.headers['content-type']).toBe(jsonType)
    const json = response.json()
    expect(json).haveOwnProperty('statusCode')
    expect(json).haveOwnProperty('message')
    expect(json['statusCode'] == 401).toBe(true)
    expect(json['message'] == 'Unauthorized').toBe(true)

    await destroyUser(userService, prisma, userData.email)
  })

  test('Success Create User BasicInfo with (POST) :: userProfile', async () => {
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

    const basicInfo = generateBasicInfo(IncludeAllBasicInfo)

    const response = await app
      .getHttpAdapter()
      .getInstance()
      .inject()
      .post(`${API_PREFIX}/user/profile`)
      .headers({ authorization: `Bearer ${token}` })
      .payload({ basicInfo: basicInfo })

    expect(response.statusCode).toBe(201)
    expect(response.headers['content-type']).toBe(jsonType)
    json = response.json()
    expect(json).haveOwnProperty('statusCode')
    expect(json.statusCode).toBe(201)

    const user = await prisma.user.findUnique({
      where: { email: userData.email },
    })

    expect(user).instanceOf(Object)

    const prismaBasicInfo = await prisma.basicInfo.findUnique({
      where: { userId: user.id },
    })

    expect(prismaBasicInfo).instanceOf(Object)

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

  test('Success Create User Quote with (POST) :: UserProfile', async () => {
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

    const quote = generateRandomQuote()

    const response = await app
      .getHttpAdapter()
      .getInstance()
      .inject()
      .post(`${API_PREFIX}/user/profile`)
      .headers({ authorization: `Bearer ${token}` })
      .payload({ quote: quote })

    expect(response.statusCode).toBe(201)
    expect(response.headers['content-type']).toBe(jsonType)
    json = response.json()
    expect(json).haveOwnProperty('statusCode')
    expect(json.statusCode).toBe(201)

    const user = await prisma.user.findUnique({
      where: { email: userData.email },
    })

    expect(user).instanceOf(Object)

    const prismaQuote = await prisma.quote.findUnique({
      where: { userId: user.id },
    })

    expect(prismaQuote).instanceOf(Object)
    expect(quote.content == prismaQuote.content).toBe(true)

    await destroyUser(userService, prisma, userData.email)
  })

  test('Success Create User Domain with (POST) :: UserProfile', async () => {
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

    const domain = generateRandomDomain()

    const response = await app
      .getHttpAdapter()
      .getInstance()
      .inject()
      .post(`${API_PREFIX}/user/profile`)
      .headers({ authorization: `Bearer ${token}` })
      .payload({ domain })

    expect(response.statusCode).toBe(201)
    expect(response.headers['content-type']).toBe(jsonType)
    json = response.json()
    expect(json).haveOwnProperty('statusCode')
    expect(json.statusCode).toBe(201)

    const user = await prisma.user.findUnique({
      where: { email: userData.email },
    })

    expect(user).instanceOf(Object)

    const prismaDomain = await prisma.domain.findUnique({
      where: { userId: user.id },
    })

    expect(prismaDomain).instanceOf(Object)
    expect(domain.value == prismaDomain.value).toBe(true)

    await destroyUser(userService, prisma, userData.email)
  })

  test('POST() ::validDomain should response false with reserved value', async () => {
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

    const domain = generateRandomDomain()

    const response = await app
      .getHttpAdapter()
      .getInstance()
      .inject()
      .post(`${API_PREFIX}/user/profile`)
      .headers({ authorization: `Bearer ${token}` })
      .payload({ domain })

    expect(response.statusCode).toBe(201)
    expect(response.headers['content-type']).toBe(jsonType)
    json = response.json()
    expectTypeOf(json).toBeObject()
    expect(json).haveOwnProperty('statusCode')
    expect(json.statusCode).toBe(201)

    const user = await prisma.user.findUnique({
      where: { email: userData.email },
    })

    expectTypeOf(user).toBeObject()

    const prismaDomain = await prisma.domain.findUnique({
      where: { userId: user.id },
    })

    expectTypeOf(prismaDomain).toBeObject()
    expect(domain.value == prismaDomain.value).toBe(true)

    const validDomainResponse = await app
      .getHttpAdapter()
      .getInstance()
      .inject()
      .post(`${API_PREFIX}/user/valid-domain`)
      .payload(domain)

    expect(validDomainResponse.statusCode).toBe(201)
    expect(validDomainResponse.headers['content-type']).toBe(jsonType)
    json = validDomainResponse.json()
    expect(json).haveOwnProperty('statusCode')
    expect(json.statusCode).toBe(201)
    expect(json).haveOwnProperty('isValid')
    expect(json.isValid).toBe(false)
    await destroyUser(userService, prisma, userData.email)
  })

  test('Fail Create User Domain with reserved value', async () => {
    /* Create first User */
    const firstUserData = generateNewUser()
    await checkUserNotExist(prisma, firstUserData.email)

    const userDataForDb = await makeUserInputData({
      env,
      crypto,
      userData: firstUserData,
    })
    const firstUser = await userService.createUser(userDataForDb)
    expectTypeOf(firstUser).toBeObject()
    /* Register domain for first user */
    const domain = generateRandomDomain()

    const prismaDomain = await userService.upsetDomain({
      user: { id: firstUser.id },
      data: domain,
    })
    expectTypeOf(prismaDomain).toBeObject()

    /* Create second user */
    const secondUserData = generateNewUser()

    // /* Sure user not exist in db */
    await checkUserNotExist(prisma, secondUserData.email)

    const registerResponse = await app
      .getHttpAdapter()
      .getInstance()
      .inject()
      .post(`${API_PREFIX}/auth/sign-up`)
      .payload(secondUserData)

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
      .post(`${API_PREFIX}/user/profile`)
      .headers({ authorization: `Bearer ${token}` })
      .payload({ domain })

    expect(response.statusCode).toBe(403)
    json = response.json()
    expect(json).haveOwnProperty('message')
    expect(json.message).toBe('Domain bad upset')

    await destroyUser(userService, prisma, firstUserData.email)
    await destroyUser(userService, prisma, secondUserData.email)
  })

  test('Fail Get() ::profile with unouthorized user', async () => {
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

    const response = await app
      .getHttpAdapter()
      .getInstance()
      .inject()
      .get(`${API_PREFIX}/user/profile`)

    expect(response.statusCode).toBe(401)
    expect(response.headers['content-type']).toBe(jsonType)
    const json = response.json()
    expect(json).haveOwnProperty('statusCode')
    expect(json).haveOwnProperty('message')
    expect(json['statusCode'] == 401).toBe(true)
    expect(json['message'] == 'Unauthorized').toBe(true)

    await destroyUser(userService, prisma, userData.email)
  })

  test('Get() ::profile Success get User Profile', async () => {
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

    const basicInfo = generateBasicInfo(IncludeAllBasicInfo)
    const quote = generateRandomQuote()
    const domain = generateRandomDomain()

    await app
      .getHttpAdapter()
      .getInstance()
      .inject()
      .post(`${API_PREFIX}/user/profile`)
      .headers({ authorization: `Bearer ${token}` })
      .payload({ basicInfo, quote, domain })

    const response = await app
      .getHttpAdapter()
      .getInstance()
      .inject()
      .get(`${API_PREFIX}/user/profile`)
      .headers({ authorization: `Bearer ${token}` })

    expect(response.statusCode).toBe(201)
    expect(response.headers['content-type']).toBe(jsonType)
    json = response.json()
    expect(json).haveOwnProperty('basicInfo')
    expect(json).haveOwnProperty('quote')
    expect(json).haveOwnProperty('domain')

    const responseBasicInfo = json.basicInfo
    expect(basicInfo.fullName.firstName).equal(
      responseBasicInfo.fullName.firstName,
    )
    expect(basicInfo.fullName.lastName).equal(
      responseBasicInfo.fullName.lastName,
    )
    expect(basicInfo.career.company).equal(responseBasicInfo.career.company)
    expect(basicInfo.career.role).equal(responseBasicInfo.career.role)

    expect(basicInfo.education.university).equal(
      responseBasicInfo.education.university,
    )
    expect(basicInfo.education.faculty).equal(
      responseBasicInfo.education.faculty,
    )

    expect(basicInfo.location.country).equal(responseBasicInfo.location.country)
    expect(basicInfo.location.region).equal(responseBasicInfo.location.region)
    expect(basicInfo.location.timeZone).equal(
      responseBasicInfo.location.timeZone,
    )

    await destroyUser(userService, prisma, userData.email)
  })

  afterAll(async () => {
    await app.getHttpServer().close()
  })
})
