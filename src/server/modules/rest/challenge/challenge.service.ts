import { Injectable } from '@nestjs/common'
import { PrismaService } from '@modules/prisma/prisma.service'
import { Artwork, Challenge, Prisma, Score } from '@prisma/client'

@Injectable()
export class ChallengeService {
  constructor(private prisma: PrismaService) {}

  async challenges(params: {
    skip?: number
    take?: number
    cursor?: Prisma.ChallengeWhereUniqueInput
    where?: Prisma.ChallengeWhereInput
    orderBy?: Prisma.ChallengeOrderByWithRelationInput
  }): Promise<Challenge[]> {
    const { skip, take, cursor, where, orderBy } = params
    return this.prisma.challenge.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    })
  }

  async artworks(params: {
    skip?: number
    take?: number
    cursor?: Prisma.ArtworkWhereUniqueInput
    where?: Prisma.ArtworkWhereInput
    orderBy?: Prisma.ArtworkOrderByWithRelationInput
  }): Promise<Artwork[]> {
    const { skip, take, cursor, where, orderBy } = params
    return this.prisma.artwork.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
      include: {
        author: true, // Return all fields
        likes: true,
      },
    })
  }

  async last(): Promise<Challenge> {
    return this.prisma.challenge.findFirst({
      orderBy: { createdAt: 'desc' },
      // include: {
      //   artworks: true,
      // },
    })
  }

  async create(data: Prisma.ChallengeCreateInput): Promise<Challenge> {
    return this.prisma.challenge.create({
      data,
    })
  }

  async challenge(
    where: Prisma.ChallengeWhereUniqueInput,
    include?: Prisma.ChallengeInclude,
  ): Promise<Challenge | null> {
    return this.prisma.challenge.findUnique({
      where,
      include,
    })
  }

  async scores(): Promise<Score[]> {
    return this.prisma.score.findMany()
  }

  async deleteScores(artworkId: string): Promise<Score[]> {
    const scores = await this.prisma.score.findMany({ where: { artworkId } })

    let orders = []
    for (let i = 0; i < scores.length; i++) {
      const score = scores[i]
      const order = this.prisma.categoryScore.deleteMany({
        where: { scoreId: score.id },
      })
      orders.push(order)
    }

    await this.prisma.$transaction(orders)

    orders = []
    for (let i = 0; i < scores.length; i++) {
      const score = scores[i]
      const order = this.prisma.score.delete({
        where: { id: score.id },
      })
      orders.push(order)
    }

    return this.prisma.$transaction(orders)
  }
}
