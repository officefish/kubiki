import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Req,
  Res,
  Put,
  UseGuards,
  Ip,
  Delete,
  UseInterceptors,
  UploadedFile,
  //Query,
  //Put,
  //Delete
} from '@nestjs/common'

import fs from 'fs/promises'

import { FileInterceptor } from '@nest-lab/fastify-multer'
//import { FilesObject } from '@nest-lab/fastify-multer'
import { diskStorage } from 'fastify-multer'
//import { memoryStorage } from 'fastify-multer'

import { File } from '@nest-lab/fastify-multer'

import { ArtworkService } from './artwork.service'
import { Artwork } from '@prisma/client'

import {
  //ApiParam,
  //ApiCreatedResponse,
  //ApiResponse,
  //ApiBody,
  //ApiQuery,
  ApiTags,
} from '@nestjs/swagger'

import { AdminGuard, AuthGuard } from '../auth/auth.guard'

import { FastifyRequest, FastifyReply } from 'fastify'
import { UserService } from '../user/user.service'
import {
  CreateArtworkDto,
  DeleteArtworkDto,
  LikeDto,
  UpdateArtworkAuthorDto,
  UpdateArtworkScoreDto,
  UploadArtworkDto,
} from './artwork.schema'
import { UploadService } from '../upload/upload.service'
import { ScoreService } from './score.service'
//import { CreateChallengeDto, GetAllChallengesDto } from './challenge.schema'

@ApiTags('artwork')
@Controller('artwork')
export class ArtworkController {
  constructor(
    private readonly service: ArtworkService,
    private readonly userService: UserService,
    private readonly imageProccesing: UploadService,
    private readonly scoreService: ScoreService,
  ) {}

  @UseGuards(AuthGuard)
  @Post('/')
  async createArtwork(
    @Req() request: FastifyRequest,
    @Res() reply: FastifyReply,
    @Body() credentials: CreateArtworkDto,
  ): Promise<Artwork> {
    const { firstName, lastName, age, challengeId, uri } = credentials

    const userId = request['userId']
    const user = await this.userService.user({ id: userId })

    if (!user) {
      return reply
        .code(401)
        .send({ statusCode: 401, message: 'User not found' })
    }

    const challenge = await this.service.challenge({ id: challengeId })
    if (!challenge) {
      return reply.code(403).send({
        statusCode: 403,
        message: 'Bad request. Database error. No challenge found.',
      })
    }

    const data = {
      firstName,
      lastName,
      age,
    }
    const author = await this.service.createAuthor(data)

    /* image processing */
    const buffer = await this.imageProccesing.bufferFromURI(uri)
    const url = await this.imageProccesing.convertToWebp(buffer)

    const artwork = await this.service.create({
      challenge: {
        connect: { id: challenge.id },
      },
      url,
      original: url,
      publisher: {
        connect: { id: user.id },
      },
      author: {
        connect: { id: author.id },
      },
    })

    if (!artwork) {
      return reply.code(403).send({
        statusCode: 403,
        message: 'Bad request. Database error with artwork creation',
      })
    }

    return reply.code(201).send({
      statusCode: 201,
      message: 'Artwork creation done',
      id: artwork.id,
    })
  }

  @UseGuards(AuthGuard)
  @Get('/score/:id')
  async getArtworkScore(
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
    const include = { categoryScores: true }

    const score = await this.scoreService.score(where, include)
    if (!score) {
      return reply.code(403).send({
        statusCode: 403,
        message: 'Bad request. Database error with score',
      })
    }

    return reply.code(201).send({
      statusCode: 201,
      score,
    })
  }

  @UseGuards(AuthGuard)
  @Put('/score')
  async updateArtworkScore(
    @Res() reply: FastifyReply,
    @Req() request: FastifyRequest,
    @Body() credentials: UpdateArtworkScoreDto,
  ) {
    const userId = request['userId']
    const user = await this.userService.user({ id: userId })

    if (!user) {
      return reply
        .code(401)
        .send({ statusCode: 401, message: 'User not found' })
    }

    const { scoreId, scores } = credentials

    const score = await this.scoreService.update(scoreId, scores)
    if (!score) {
      return reply.code(403).send({
        statusCode: 403,
        message: 'Bad request. Database error with score',
      })
    }

    const total = await this.service.updateTotalScore(score.artworkId)

    const where = { id: score.artworkId }
    const data = { total }

    const artwork = await this.service.update(where, data)
    if (!artwork) {
      return reply.code(403).send({
        statusCode: 403,
        message: 'Bad request. Database error with update artwork. (total)',
      })
    }

    return reply.code(201).send({
      statusCode: 201,
      message: 'Artwork score success updated.',
      total,
    })
  }

  @Post('/like')
  async createLike(
    @Res() reply: FastifyReply,
    @Body() credentials: LikeDto,
    @Ip() ip,
  ) {
    const { artworkId } = credentials

    const where = { artworkId, ip }
    const data = {
      artwork: { connect: { id: artworkId } },
      ip,
    }

    let like = await this.service.like(where)
    if (like) {
      return reply.code(403).send({
        statusCode: 403,
        message: 'Like with such ip already exist.',
      })
    }

    like = await this.service.createLike(data)
    if (!like) {
      return reply.code(409).send({
        statusCode: 409,
        message: 'Like with such ip already exist.',
      })
    }

    return reply.code(201).send({
      statusCode: 201,
      message: 'Artwork like success created.',
    })
  }

  @Post('/like/delete')
  async deleteLike(
    @Res() reply: FastifyReply,
    @Body() credentials: LikeDto,
    @Ip() ip,
  ) {
    const { artworkId } = credentials

    const where = { artworkId, ip }
    const like = await this.service.deletelike(where)

    if (!like) {
      return reply.code(403).send({
        statusCode: 403,
        message: 'Like not found.',
      })
    }

    return reply.code(200).send({
      statusCode: 200,
      message: 'Artwork like success deleted.',
    })
  }

  @UseGuards(AdminGuard)
  @Get('/all')
  async getAllArtworks(@Res() reply: FastifyReply) {
    const include = {
      author: true,
    }
    const artworks = await this.service.all({ include })

    return reply.code(201).send({
      statusCode: 201,
      artworks,
    })
  }

  @UseGuards(AdminGuard)
  @Put('/author')
  async updateAuthor(
    @Res() reply: FastifyReply,
    //@Req() request: FastifyRequest,
    @Body() credentials: UpdateArtworkAuthorDto,
  ) {
    const { id, firstName, lastName, age } = credentials

    const where = { id }
    const data = { firstName, lastName, age }

    const author = await this.service.updateAuthor(where, data)
    if (!author) {
      return reply.code(403).send({
        statusCode: 403,
        message: 'Fail update author data.',
      })
    }

    const authorAgeGroup = this.service.getAgeGroupByAge(age)

    const input = {
      where: { authorId: id },
      data: { ageGroup: authorAgeGroup },
    }

    await this.service.update(input.where, input.data)

    return reply.code(201).send({
      statusCode: 201,
      ageGroup: authorAgeGroup,
      message: 'Author success updated,',
    })
  }

  @UseGuards(AdminGuard)
  @Delete('/')
  async deleteArtwork(
    @Res() reply: FastifyReply,
    @Body() credentials: DeleteArtworkDto,
    //@Req() request: FastifyRequest,
  ) {
    const { id } = credentials

    const where = { id }

    const artwork = await this.service.delete(where)
    if (!artwork) {
      return reply.code(403).send({
        statusCode: 403,
        message: 'Fail delete artwork.',
      })
    }
    return reply.code(200).send({
      statusCode: 200,
      message: 'Artwork success deleted.',
    })
  }

  @UseGuards(AuthGuard)
  @Post('/upload')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination(req, file, cb) {
          cb(null, './public/media')
        },
        filename(req, file, cb) {
          cb(null, 'techies_' + file.originalname)
        },
      }),
    }),
  )
  async uploadSingleFile(
    @UploadedFile() file: File,
    @Body() credentials: UploadArtworkDto,
    @Req() request: FastifyRequest,
    @Res() reply: FastifyReply,
  ) {
    // console.log(credentials)
    // console.log(file?.fieldname)
    // console.log(file)
    // return { success: !!file }

    const { firstName, lastName, age, challengeId } = credentials

    const userId = request['userId']
    const user = await this.userService.user({ id: userId })

    if (!user) {
      return reply
        .code(401)
        .send({ statusCode: 401, message: 'User not found' })
    }

    const challenge = await this.service.challenge({ id: challengeId })
    if (!challenge) {
      return reply.code(403).send({
        statusCode: 403,
        message: 'Bad request. Database error. No challenge found.',
      })
    }

    const data = {
      firstName,
      lastName,
      age,
    }
    const author = await this.service.createAuthor(data)

    if (!file) {
      return reply.code(403).send({
        statusCode: 403,
        message: 'Bad request. File not found.',
      })
    }

    /* image processing */
    const original = `/public/media/techies_${file.originalname}`
    console.log(original)
    const buffer = await fs.readFile(`${process.cwd()}${original}`)
    const url = await this.imageProccesing.convertToWebp(buffer)

    const ageGroup = this.service.getAgeGroupByAge(age)

    const artwork = await this.service.create({
      challenge: {
        connect: { id: challenge.id },
      },
      url,
      original,
      publisher: {
        connect: { id: user.id },
      },
      author: {
        connect: { id: author.id },
      },
      ageGroup,
    })

    if (!artwork) {
      return reply.code(403).send({
        statusCode: 403,
        message: 'Bad request. Database error with artwork creation',
      })
    }

    return reply.code(201).send({
      statusCode: 201,
      message: 'Artwork creation done',
      id: artwork.id,
    })
  }
}
