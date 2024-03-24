import assert from 'node:assert'
import fp from 'fastify-plugin'
import fastifyUnderPressure, {
  UnderPressureOptions,
} from '@fastify/under-pressure'
import { NextServer } from 'next/dist/server/next'

import type {
  RouteGenericInterface,
  RouteShorthandOptions,
} from 'fastify/types/route'

import type {
  ContextConfigDefault,
  //FastifyPluginCallback,
  //FastifyRequest,
  FastifySchema,
  HTTPMethods,
} from 'fastify'

declare module 'fastify' {
  interface FastifyInstance<RawServer, RawRequest, RawReply> {
    next<
      RouteGeneric extends RouteGenericInterface = RouteGenericInterface,
      ContextConfig = ContextConfigDefault,
      SchemaCompiler extends FastifySchema = FastifySchema,
    >(
      path: string,
      opts?:
        | (RouteShorthandOptions<
            RawServer,
            RawRequest,
            RawReply,
            RouteGeneric,
            ContextConfig,
            SchemaCompiler
          > & {
            method?: HTTPMethods
          })
        | FastifyNextCallback,
      handle?: FastifyNextCallback,
    ): void
  }

  interface FastifyReply {
    nextRender(path: string): Promise<void>
    nextRenderError(err: any): Promise<void>
  }
}

// Infer options type, because not exported from Next.
type NextServerConstructor = ConstructorParameters<typeof NextServer>[0]

interface FastifyNextOptions extends NextServerConstructor {
  underPressure?: boolean | UnderPressureOptions
  client: NextServer
  logLevel?: string
}

const nextPlugin = fp(async (fastify, options: FastifyNextOptions) => {
  const { underPressure, client } = options

  if (underPressure) {
    const opts =
      typeof underPressure === 'object' ? underPressure : Object.create(null)
    fastify.register(fastifyUnderPressure, opts)
  }

  const handleNextRequests = client.getRequestHandler()

  client.prepare().then(() => {
    fastify
      .decorate('next', route.bind(fastify))
      .decorateReply('nextRender', render)
      .decorateReply('nextRenderError', renderError)
      .addHook('onClose', function () {
        return client.close()
      })

    //   client.getServer().then((server) => {
    //     const basePath = server?.nextConfig?.basePath || ''
    //     const nextAssetsPath = `${basePath}/_next/*`

    //     fastify.after(() => {
    //       fastify.next(nextAssetsPath)
    //     })

    //     next()
    //   })
  })

  function route(path, opts, callback) {
    opts = opts || {
      logLevel: options.logLevel,
    }
    if (typeof opts === 'function') {
      callback = opts
      opts = {
        logLevel: options.logLevel,
      }
    }

    assert(typeof path === 'string', 'path must be a string')
    if (opts.method) {
      assert(typeof opts.method === 'string', 'options.method must be a string')
    }
    if (opts.schema) {
      assert(
        typeof opts.schema === 'object',
        'options.schema must be an object',
      )
    }
    if (callback) {
      assert(typeof callback === 'function', 'callback must be a function')
    }

    const method = opts.method || 'get'
    this[method.toLowerCase()](path, opts, handler)

    function handler(req, reply) {
      for (const [headerName, headerValue] of Object.entries(
        reply.getHeaders(),
      )) {
        reply.raw.setHeader(headerName, headerValue)
      }

      if (callback) {
        return callback(client, req, reply)
      }

      return handleNextRequests(req.raw, reply.raw).then(() => {
        reply.hijack()
      })
    }
  }

  async function render(path) {
    assert(typeof path === 'string', 'path must be a string')

    //const reply = this
    const { request } = this

    // set custom headers as next will finish the request
    for (const [headerName, headerValue] of Object.entries(this.getHeaders())) {
      this.raw.setHeader(headerName, headerValue)
    }

    await client.render(request.raw, this.raw, path, request.query)

    this.hijack()
  }

  async function renderError(err) {
    //const reply = this
    const { request } = this //reply

    // set custom headers as next will finish the request
    for (const [headerName, headerValue] of Object.entries(this.getHeaders())) {
      this.raw.setHeader(headerName, headerValue)
    }

    await client.renderError(
      err,
      request.raw,
      this.raw,
      request.url,
      request.query,
    )

    this.hijack()
  }
})

export { nextPlugin as NextPlugin }
