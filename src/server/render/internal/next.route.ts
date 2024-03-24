import { FastifyInstance } from 'fastify'
import { INestApplication, Logger } from '@nestjs/common'
//import FastifyInstance from ''

//import { FastifyRequest } from 'fastify'
//import { FastifyReply } from 'fastify'
//import { NextServer } from "next/dist/server/next"

// not working way
//import { IncomingMessage } from "http"
// declare module 'http' {
//     interface IncomingMessage {
//         server?: FastifyInstance
//     }
// }

export async function nextRoutes(app: INestApplication) {
  const server = app.getHttpAdapter().getInstance() as FastifyInstance
  //console.log(server)
  await server.after()

  server.next('/')
  server.next('/me')
  server.next('/me/settings')

  server.next(`/auth/sign-in`)
  server.next(`/auth/sign-up`)
  server.next('/auth/forgot-password')
  server.next('/auth/password-reset/*')

  server.next('/challenges')
  server.next('/challenge/[:id]')

  server.next('/admin')

  server.next('/initial')

  Logger.log('NEST endpoints register', 'Render')
}

//export { routes as NextRoutes }
