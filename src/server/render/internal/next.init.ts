import { INestApplication, Logger } from '@nestjs/common'

import fastifyNextJS from '@fastify/nextjs'
//import { ConfigService } from '@nestjs/config'

//import NextServer from 'next'

//import { NextPlugin } from './next.fastify.plugin'

export function initializeNext(app: INestApplication) {
  //const server = app.getHttpAdapter().getInstance()
  //server.register(NextPlugin, { client })

  //const configService = app.get<ConfigService<IConfigTypes>>(ConfigService)
  //const appConfig = configService.get<IAppConfig>('app')

  const server = app.getHttpAdapter().getInstance()
  const HTTP_PORT = process.env.ROOT_PORT
  const DEV = process.env.NODE_ENV === 'development'

  server
    .register(fastifyNextJS, {
      dev: DEV,
      noServeAssets: true,
      port: HTTP_PORT,
    })
    .after(() => {
      // get all _next response as usual
      server.next(
        `${process.env.BASE_PATH || ''}/_next/*`,
        async (app, req, reply) => {
          return app
            .getRequestHandler()(req.raw, reply.raw)
            .then(() => {
              reply.hijack()
            })
        },
      )
    })
  // block hotreloading (used only for dev)
  server.get(
    `${process.env.BASE_PATH || ''}/_next/webpack-hmr`,
    async (req, reply) => {
      reply.status(200).send('ok')
    },
  )
  Logger.log('Fastify/Next module installed', 'Render')
}
