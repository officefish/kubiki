import { NestFactory } from '@nestjs/core'
import {
  initializeSwagger,
  initializeCookies,
  initializeSession,
  initializeCors,
  initializeStaticAssets,
} from './bootstrap'
import { initializeNext, nextRoutes } from './render'
import { AppModule } from './modules/app/app.module'
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify'
//import Next, { NextConfig } from 'next'

async function bootstrap() {
  // Next Client need to be initialised before Fastify
  // const nextOptions = {
  //   noServeAssets: true,
  //   port: process.env.ROOT_PORT,
  // } as NextConfig
  // const client = Next(
  //   Object.assign(
  //     {},
  //     { dev: process.env.NODE_ENV === 'development' },
  //     nextOptions,
  //   ),
  // )

  // Now initialize Fastify
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  )
  // Set global prefix for api
  app.setGlobalPrefix('/api/v1')

  //const bodyLimit = 10_485_760 // 10MiB
  //app.useBodyParser('application/json', { bodyLimit })
  // should be initialized before session
  initializeCookies(app)
  initializeCors(app)
  initializeSwagger(app)
  initializeSession(app)
  initializeStaticAssets(app)

  //app.getHttpAdapter().
  initializeNext(app)
  await nextRoutes(app)

  //

  await app.listen(8001)
}
bootstrap()
