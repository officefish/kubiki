import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Req,
  Res,
  UseGuards,
  //Query,
  //Put,
  //Delete
} from '@nestjs/common'
import { ChallengeService } from './challenge.service'
import { Challenge } from '@prisma/client'
import { Role } from '@prisma/client'

import {
  //ApiParam,
  //ApiCreatedResponse,
  //ApiResponse,
  ApiBody,
  //ApiQuery,
  ApiTags,
} from '@nestjs/swagger'

import { AdminGuard, AuthGuard, VisitorGuard } from '../auth/auth.guard'

import { FastifyRequest, FastifyReply } from 'fastify'
import { UserService } from '../user/user.service'
import {
  CreateChallengeDto,
  GetAllChallengesDto,
  GetLastChallengeDto,
  InitializeManyDto,
  //GetLastChallengesDto,
} from './challenge.schema'
import { CategoryService } from './category.service'
import { ArtworkService } from '../artwork/artwork.service'
import { ScoreService } from './score.service'

@ApiTags('challenge')
@Controller('challenge')
export class ChallengeController {
  constructor(
    private readonly service: ChallengeService,
    private readonly userService: UserService,
    private readonly categoryService: CategoryService,
    private readonly scoreService: ScoreService,
    private readonly artworkService: ArtworkService,
  ) {}
  //

  @UseGuards(AuthGuard)
  @Post('/')
  async createWorkspace(
    @Req() request: FastifyRequest,
    @Res() reply: FastifyReply,
    @Body() credentials: CreateChallengeDto,
  ) {
    const { title } = credentials
    const id = request['userId']
    const user = await this.userService.user({ id })

    if (!user) {
      return reply
        .code(401)
        .send({ statusCode: 401, message: 'User not found' })
    }
    const challenge = await this.service.create({
      title,
      creator: {
        connect: { id: user.id },
      },
    })

    if (!challenge) {
      return reply.code(403).send({
        statusCode: 403,
        message: 'Bad request. Database error with workspace creation',
      })
    }

    return reply.code(201).send({
      statusCode: 201,
      message: 'Challenge creation done',
      challengeId: challenge.id,
    })
  }

  @UseGuards(AuthGuard)
  @Get('/all')
  async getUserChallenges(
    @Req() request: FastifyRequest,
    @Res() reply: FastifyReply,
  ): Promise<Challenge[]> {
    // because of AuthGuard we have userId in FastifyRequest
    const id = request['userId']
    const user = await this.userService.user({ id })

    if (!user) {
      return reply
        .code(401)
        .send({ statusCode: 401, message: 'User not found' })
    }

    const challenges = await this.service.challenges({
      where: { creatorId: user.id },
    })

    return reply.code(201).send({ statusCode: 201, challenges })
  }

  @ApiBody({
    type: GetAllChallengesDto,
  })
  @Post('/many')
  async getAllChallenges(
    @Res() reply: FastifyReply,
    @Body() credentials: GetAllChallengesDto,
  ): Promise<Challenge[]> {
    console.log(credentials)

    const { skip, take } = credentials

    const challenges = await this.service.challenges({
      skip,
      take,
    })

    return reply.code(200).send({ statusCode: 200, challenges })
  }

  @UseGuards(AdminGuard)
  @Get('/initial')
  async defaultInitialize(
    @Res() reply: FastifyReply,
    @Req() request: FastifyRequest,
  ): Promise<Challenge[]> {
    //
    const challenge = await this.service.last()
    if (!challenge) {
      return reply
        .code(401)
        .send({ statusCode: 401, message: 'No one challenge found.' })
    }

    //remove all artworks
    await this.artworkService.deleteMany(challenge.id)
    //create default artworks
    const id = request['userId']
    const user = await this.userService.user({ id })
    let artworks = []
    if (user) {
      artworks = await this.artworkService.uploadMany(
        challenge.id,
        user.id,
        0,
        0,
      )
    }

    console.log('artworksNum: ', artworks.length)

    return reply.code(201).send({ statusCode: 201, artworks })
  }

  @UseGuards(AdminGuard)
  @Post('/initial')
  async initializeMany(
    @Res() reply: FastifyReply,
    @Req() request: FastifyRequest,
    @Body() credentials: InitializeManyDto,
  ): Promise<Challenge[]> {
    //
    const challenge = await this.service.last()
    if (!challenge) {
      return reply
        .code(401)
        .send({ statusCode: 401, message: 'No one challenge found.' })
    }

    const { skip, take } = credentials
    console.log(`skip: ${skip}`, `take: ${take}`)

    //create default artworks
    const id = request['userId']
    const user = await this.userService.user({ id })
    let artworks = []
    if (user) {
      artworks = await this.artworkService.uploadMany(
        challenge.id,
        user.id,
        skip,
        take,
      )
    }

    console.log('artworksNum: ', artworks.length)
    return reply.code(201).send({ statusCode: 201, artworks })
  }

  @UseGuards(VisitorGuard)
  @Post('/last')
  async getLastChallenge(
    @Res() reply: FastifyReply,
    @Req() request: FastifyRequest,
    @Body() credentials: GetLastChallengeDto,
  ): Promise<Challenge[]> {
    //
    const { skip, take, ageGroup } = credentials

    const challenge = await this.service.last()
    if (!challenge) {
      return reply
        .code(401)
        .send({ statusCode: 401, message: 'No one challenge found.' })
    }

    const where = { challengeId: challenge.id }
    if (ageGroup) {
      where['ageGroup'] = ageGroup
    }

    const artworks = await this.service.artworks({
      where,
      skip,
      take,
    })

    const total = await this.artworkService.count(where)

    let categories = await this.categoryService.categories({
      where: { challengeId: challenge.id },
    })

    if (!categories.length) {
      console.log('Need to create default categories.')
      categories = await this.categoryService.default(challenge.id)
    }

    let scores = []

    const id = request['userId']
    let isJudge = false
    if (id) {
      const user = await this.userService.user({ id })
      if (user && user.role === Role.JUDGE) {
        isJudge = true
        scores = await this.scoreService.scores({
          where: { challengeId: challenge.id },
        })
        if (scores.length != artworks.length) {
          scores = await this.scoreService.updateScores(
            challenge.id,
            user.id,
            artworks,
            categories,
          )
        }
      }
    }

    const payload = {
      date: challenge.updatedAt ?? challenge.createdAt,
      title: challenge.title,
      isJudge,
      artworks,
      scores,
      total,
    }

    return reply.code(201).send({ statusCode: 201, payload })
  }

  @UseGuards(AuthGuard)
  @Get('/:id')
  async getWorkspace(
    @Res() reply: FastifyReply,
    @Req() request: FastifyRequest,
    @Param('id') id: string,
    //@Body() credentials: GetWorkspaceDto,
  ) {
    const userId = request['userId']
    const user = await this.userService.user({ id: userId })

    if (!user) {
      return reply
        .code(401)
        .send({ statusCode: 401, message: 'User not found' })
    }

    const where = { id }
    const include = { artworks: true }

    const challenge = await this.service.challenge(where, include)
    if (!challenge) {
      return reply.code(403).send({
        statusCode: 403,
        message: 'Bad request. Database error with workspace',
      })
    }

    const payload = {
      date: challenge.updatedAt ?? challenge.createdAt,
      title: challenge.title,
      artworks: challenge['artworks'] || [],
    }

    return reply.code(201).send({
      statusCode: 201,
      payload,
    })
  }

  @UseGuards(AdminGuard)
  @Get('/last/clear')
  async clearLastChallenge(@Res() reply: FastifyReply): Promise<Challenge[]> {
    const challenge = await this.service.last()
    if (!challenge) {
      return reply
        .code(401)
        .send({ statusCode: 401, message: 'No one challenge found.' })
    }

    await this.artworkService.deleteMany(challenge.id)

    return reply.code(201).send({
      statusCode: 200,
      message: 'All artworks from last challenged removed.',
    })
  }

  @UseGuards(AdminGuard)
  @Get('/score/drop')
  async scoreDrop(@Res() reply: FastifyReply) {
    //
    const challenge = await this.service.last()
    if (!challenge) {
      return reply
        .code(401)
        .send({ statusCode: 401, message: 'Last challenge not found' })
    }

    //
    const where = { challengeId: challenge.id }
    const data = { total: 0 }
    const artworks = await this.artworkService.updateMany(where, data)

    for (let i = 0; i < artworks.length; ++i) {
      const artwork = artworks[i]
      await this.service.deleteScores(artwork.id)
    }

    return reply.code(201).send({
      statusCode: 200,
      message: 'All scores success dropped.',
    })
  }
}
