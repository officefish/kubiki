import { Injectable } from '@nestjs/common'
import { PrismaService } from '@modules/prisma/prisma.service'
import {
  Artwork,
  Author,
  Prisma,
  Like,
  Challenge,
  AgeGroup,
} from '@prisma/client'
import { DefaultService } from './dafult.service'
import { AppConfigService } from '../../config/config.service'
import { UploadService } from '../upload/upload.service'
import { DefaultArgs } from '@prisma/client/runtime/library'

@Injectable()
export class ArtworkService {
  constructor(
    private prisma: PrismaService,
    private defaultService: DefaultService,
    private env: AppConfigService,
    private imageProcessing: UploadService,
  ) {}

  async challenge(where: Prisma.ChallengeWhereUniqueInput): Promise<Challenge> {
    return this.prisma.challenge.findUnique({
      where,
    })
  }

  async createAuthor(data: Prisma.AuthorCreateInput): Promise<Author> {
    return this.prisma.author.create({
      data,
    })
  }

  //async findUniqueAuthor(name)

  async create(data: Prisma.ArtworkCreateInput): Promise<Artwork> {
    return this.prisma.artwork.create({
      data,
    })
  }

  async update(
    where: Prisma.ArtworkWhereUniqueInput,
    data: Prisma.ArtworkUpdateInput,
  ): Promise<Artwork> {
    return this.prisma.artwork.update({
      where,
      data,
    })
  }

  async updateMany(
    where: Prisma.ArtworkWhereUniqueInput,
    data: Prisma.ArtworkUpdateInput,
  ): Promise<Artwork[]> {
    const artworks = await this.prisma.artwork.findMany({ where })
    const orders = []
    for (let i = 0; i < artworks.length; i++) {
      const artwork = artworks[i]
      const order = this.prisma.artwork.update({
        where: { id: artwork.id },
        data,
      })
      orders.push(order)
    }
    return this.prisma.$transaction(orders)
  }

  async updateTotalScore(artworkId: string): Promise<number> {
    const where = { artworkId }
    const scores = await this.prisma.score.findMany({ where })
    let totalScore = 0
    scores.forEach((score) => (totalScore += score.total))
    return totalScore
  }

  async createLike(data: Prisma.LikeCreateInput): Promise<Like> {
    return this.prisma.like.create({
      data,
    })
  }

  async like(where: Prisma.LikeWhereUniqueInput): Promise<Like> {
    return this.prisma.like.findUnique({
      where,
    })
  }

  async deletelike(where: Prisma.LikeWhereUniqueInput): Promise<Like> {
    return this.prisma.like.delete({
      where,
    })
  }

  async delete(where: Prisma.ArtworkWhereUniqueInput): Promise<Artwork> {
    const artwork = await this.prisma.artwork.findUnique({ where })

    if (!artwork) return null

    const scores = await this.prisma.score.findMany({
      where: { artworkId: artwork.id },
    })

    /* delete category scores */
    for (let k = 0; k < scores.length; k++) {
      const score = scores[k]
      await this.prisma.categoryScore.deleteMany({
        where: { scoreId: score.id },
      })
    }

    await this.prisma.score.deleteMany({
      where: { artworkId: artwork.id },
    })
    await this.prisma.like.deleteMany({
      where: { artworkId: artwork.id },
    })

    return this.prisma.artwork.delete({
      where,
    })
  }

  async deleteMany(challengeId: string): Promise<Artwork[]> {
    const artworks = await this.prisma.artwork.findMany({
      where: { challengeId },
    })
    const order = []
    for (let i = 0; i < artworks.length; ++i) {
      const id = artworks[i].id
      const promise = this.delete({ id })
      if (promise) {
        order.push(promise)
      }
    }
    if (!order.length) return null
    return this.prisma.$transaction(order)
  }

  async uploadMany(
    challengeId: string,
    userId: string,
    skip = 0,
    take = 0,
  ): Promise<Artwork[]> {
    const defaultTemplate = this.defaultService.default()
    if (!take) {
      take = defaultTemplate.length
    }
    const slicedTemplate = defaultTemplate.slice(skip, skip + take)

    const orders = []
    for (let i = 0; i < slicedTemplate.length; ++i) {
      const firstName = 'Ivan'
      const lastName = 'Ivanov'
      const age = 12

      const data = {
        firstName,
        lastName,
        age,
      }
      const author = await this.prisma.author.create({ data })

      /* image processing */
      //const buffer = await this.imageProccesing.bufferFromURI(uri)
      const src = slicedTemplate[i].src
      const original = `${this.env.getDefaultArtPath()}/${src}`
      const url = await this.imageProcessing.imagePreview(original)

      const order = this.prisma.artwork.create({
        data: {
          challenge: {
            connect: { id: challengeId },
          },
          url,
          original,
          publisher: {
            connect: { id: userId },
          },
          author: {
            connect: { id: author.id },
          },
        },
      })
      orders.push(order)
    }
    return this.prisma.$transaction(orders)
  }

  async count(where: Prisma.ArtworkWhereUniqueInput): Promise<number> {
    return this.prisma.artwork.count({
      where,
    })
  }

  async all(args: Prisma.ArtworkFindManyArgs<DefaultArgs>) {
    return this.prisma.artwork.findMany({ ...args })
  }

  async updateAuthor(
    where: Prisma.AuthorWhereUniqueInput,
    data: Prisma.AuthorUpdateInput,
  ): Promise<Author> {
    return this.prisma.author.update({ where, data })
  }

  getAgeGroupByAge(age: number): AgeGroup {
    if (age <= 5) {
      return AgeGroup.KIDS
    } else if (age > 5 && age <= 7) {
      return AgeGroup.PRESCHOOL
    } else if (age > 7 && age <= 10) {
      return AgeGroup.YOUNGEST
    } else if (age > 10 && age <= 14) {
      return AgeGroup.AVERAGE
    } else {
      return AgeGroup.OLDER
    }
  }
}
