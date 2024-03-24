import { Test, TestingModule } from '@nestjs/testing'
import { INestApplication } from '@nestjs/common'

import { AppModule } from '@modules/app/app.module'

import { describe, test, beforeAll, afterAll, expect } from 'vitest'

import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify'

//const url = '/healthcheck'
const contentType = 'application/json; charset=utf-8'
const API_PREFIX = '/api/v1'

describe('Application healthcheck', () => {
  let app: INestApplication

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile()

    app = moduleFixture.createNestApplication<NestFastifyApplication>(
      new FastifyAdapter(),
    )
    app.setGlobalPrefix(API_PREFIX)
    await app.init()
    await app.getHttpAdapter().getInstance().ready()
  })

  test('With HTTP injection', async () => {
    const response = await app
      .getHttpAdapter()
      .getInstance()
      .inject({
        method: 'GET',
        url: `${API_PREFIX}/ping`,
      })

    expect(response.statusCode).toBe(200)
    expect(response.headers['content-type']).toBe(contentType)
  })

  afterAll(async () => {
    await app.getHttpServer().close()
  })
})
