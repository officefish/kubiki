import { Test, TestingModule } from '@nestjs/testing'
import { INestApplication } from '@nestjs/common'
import { faker } from '@faker-js/faker'
import { AppModule } from '@modules/app/app.module'
import { ConfigModule } from '@nestjs/config'
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
import { User } from '@prisma/client'

//const url = '/healthcheck'
const jsonType = 'application/json; charset=utf-8'
const API_PREFIX = '/api/v1'

interface FakeNewUser {
  email: string
  name?: string
  password: string
}

describe('Authorization api', () => {
  let app: INestApplication
  //let userService: UserService
  let prisma: PrismaService
  let env: AppConfigService
  let crypto: CryptoService

  let newUser: FakeNewUser
  let prismaUser: User

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
    //userService = await moduleFixture.get<UserService>(UserService)
  })

  test('Success Register new user with name', async () => {
    /* Generate FakeUser data */
    newUser = {
      email: faker.internet.email(),
      password: `${faker.internet.password()}Aa1$`,
      name: faker.person.fullName(),
    }

    /* Sure user not exist in db */
    prismaUser = await prisma.user.findUnique({
      where: {
        email: newUser.email,
      },
    })
    expect(prismaUser).toBe(null)

    /* Request register new User */
    const response = await app
      .getHttpAdapter()
      .getInstance()
      .inject()
      .post(`${API_PREFIX}/auth/sign-up`)
      .payload(newUser)

    expect(response.statusCode).toBe(201)
    expect(response.headers['content-type']).toBe(jsonType)

    prismaUser = await prisma.user.findUnique({
      where: {
        email: newUser.email,
      },
    })

    expect(prismaUser).instanceOf(Object)
    expect(prismaUser).haveOwnProperty('email')
    expect(prismaUser.email).toBe(newUser.email)
    expect(prismaUser.name).toBe(newUser.name)

    // destroy fakeUser after test
    await prisma.user.delete({
      where: {
        email: newUser.email,
      },
    })
    prismaUser = await prisma.user.findUnique({
      where: {
        email: newUser.email,
      },
    })
    expect(prismaUser).toBe(null)
  })

  test('Success Register new user without name', async () => {
    /* Generate FakeUser data */
    newUser = {
      email: faker.internet.email(),
      password: `${faker.internet.password()}Aa1$`,
    }

    /* Sure user not exist in db */
    prismaUser = await prisma.user.findUnique({
      where: {
        email: newUser.email,
      },
    })
    expect(prismaUser).toBe(null)

    /* Request register new User */
    const response = await app
      .getHttpAdapter()
      .getInstance()
      .inject()
      .post(`${API_PREFIX}/auth/sign-up`)
      .payload(newUser)

    expect(response.statusCode).toBe(201)
    expect(response.headers['content-type']).toBe(jsonType)

    prismaUser = await prisma.user.findUnique({
      where: {
        email: newUser.email,
      },
    })

    expect(prismaUser).instanceOf(Object)
    expect(prismaUser).haveOwnProperty('email')
    expect(prismaUser.email).toBe(newUser.email)

    // destroy fakeUser after test
    await prisma.user.delete({
      where: {
        email: newUser.email,
      },
    })
    prismaUser = await prisma.user.findUnique({
      where: {
        email: newUser.email,
      },
    })
    expect(prismaUser).toBe(null)
  })

  test('Success SignIn request with registered user', async () => {
    newUser = {
      email: faker.internet.email(),
      password: `${faker.internet.password()}Aa1$`,
    }

    /* Sure user not exist in db */
    let prismaUser: User
    prismaUser = await prisma.user.findUnique({
      where: {
        email: newUser.email,
      },
    })
    expect(prismaUser).toBe(null)

    const saltLength = env.getSaltLength()
    const salt = await crypto.generateSalt(saltLength)
    const hashedPassword = await crypto.hash(newUser.password, salt)

    const data = {
      email: newUser.email,
      password: hashedPassword,
      salt,
      verified: false,
    }

    prismaUser = await prisma.user.create({ data })
    expect(prismaUser).instanceOf(Object)
    expect(prismaUser).haveOwnProperty('email')
    expect(prismaUser.email).toBe(newUser.email)

    const response = await app
      .getHttpAdapter()
      .getInstance()
      .inject()
      .post(`${API_PREFIX}/auth/sign-in`)
      .payload(newUser)

    expect(response.statusCode).toBe(201)
    expect(response.headers['content-type']).toBe(jsonType)
    const json = response.json()
    expect(json).haveOwnProperty('statusCode')
    expect(json).haveOwnProperty('payload')

    expect(json.payload).haveOwnProperty('id')
    expect(json.payload).haveOwnProperty('email')
    expect(json.payload).haveOwnProperty('name')
    expect(json.payload).haveOwnProperty('verified')
    expect(json.payload).haveOwnProperty('authenticated')
    expect(json.payload).haveOwnProperty('role')

    // destroy fakeUser after test
    await prisma.user.delete({
      where: {
        email: newUser.email,
      },
    })
    prismaUser = await prisma.user.findUnique({
      where: {
        email: newUser.email,
      },
    })
    expect(prismaUser).toBe(null)
  })

  test('Fail SignIn request with unautorized user', async () => {
    const fakeUser = {
      email: faker.internet.email(),
      password: `${faker.internet.password()}Aa1$`,
    }
    const response = await app
      .getHttpAdapter()
      .getInstance()
      .inject()
      .post(`${API_PREFIX}/auth/sign-in`)
      .payload(fakeUser)

    expect(response.statusCode).toBe(401)
    expect(response.headers['content-type']).toBe(jsonType)
    const json = response.json()
    expect(json).haveOwnProperty('statusCode')
    expect(json).haveOwnProperty('message')
  })

  test('Fail SignIn request with invalid email', async () => {
    const fakeUser = {
      email: 'invalid email',
      password: `${faker.internet.password()}Aa1$`,
    }
    const response = await app
      .getHttpAdapter()
      .getInstance()
      .inject()
      .post(`${API_PREFIX}/auth/sign-in`)
      .payload(fakeUser)

    expect(response.statusCode).toBe(400)
    expect(response.headers['content-type']).toBe(jsonType)
    const json = response.json()
    expect(json).haveOwnProperty('statusCode')
    expect(json).haveOwnProperty('message')
    expect(json).haveOwnProperty('errors')
  })

  test('Fail SignIn request with invalid password', async () => {
    const fakeUser = {
      email: faker.internet.email(),
      password: 'invalidPassword',
    }
    const response = await app
      .getHttpAdapter()
      .getInstance()
      .inject()
      .post(`${API_PREFIX}/auth/sign-in`)
      .payload(fakeUser)

    expect(response.statusCode).toBe(400)
    expect(response.headers['content-type']).toBe(jsonType)
    const json = response.json()
    expect(json).haveOwnProperty('statusCode')
    expect(json).haveOwnProperty('message')
    expect(json).haveOwnProperty('errors')
  })

  test('Fail SignIn request with invalid request data', async () => {
    const fakeUser = {
      invalid: true,
    }
    const response = await app
      .getHttpAdapter()
      .getInstance()
      .inject()
      .post(`${API_PREFIX}/auth/sign-in`)
      .payload(fakeUser)

    expect(response.statusCode).toBe(400)
    expect(response.headers['content-type']).toBe(jsonType)
    const json = response.json()
    expect(json).haveOwnProperty('statusCode')
    expect(json).haveOwnProperty('message')
    expect(json).haveOwnProperty('errors')
  })

  /* */
  test('Fail register with invalid email', async () => {
    const fakeUser = {
      email: 'invalid email',
      password: `${faker.internet.password()}Aa1$`,
    }
    const response = await app
      .getHttpAdapter()
      .getInstance()
      .inject()
      .post(`${API_PREFIX}/auth/sign-up`)
      .payload(fakeUser)

    expect(response.statusCode).toBe(400)
    expect(response.headers['content-type']).toBe(jsonType)
    const json = response.json()
    expect(json).haveOwnProperty('statusCode')
    expect(json).haveOwnProperty('message')
    expect(json).haveOwnProperty('errors')
  })

  test('Fail register with invalid password', async () => {
    const fakeUser = {
      email: faker.internet.email(),
      password: 'invalidPassword',
    }
    const response = await app
      .getHttpAdapter()
      .getInstance()
      .inject()
      .post(`${API_PREFIX}/auth/sign-up`)
      .payload(fakeUser)

    expect(response.statusCode).toBe(400)
    expect(response.headers['content-type']).toBe(jsonType)
    const json = response.json()
    expect(json).haveOwnProperty('statusCode')
    expect(json).haveOwnProperty('message')
    expect(json).haveOwnProperty('errors')
  })

  test('Fail register with invalid request data', async () => {
    const fakeUser = {
      invalid: true,
    }
    const response = await app
      .getHttpAdapter()
      .getInstance()
      .inject()
      .post(`${API_PREFIX}/auth/sign-up`)
      .payload(fakeUser)

    expect(response.statusCode).toBe(400)
    expect(response.headers['content-type']).toBe(jsonType)
    const json = response.json()
    expect(json).haveOwnProperty('statusCode')
    expect(json).haveOwnProperty('message')
    expect(json).haveOwnProperty('errors')
  })

  afterAll(async () => {
    await app.getHttpServer().close()
  })
})
