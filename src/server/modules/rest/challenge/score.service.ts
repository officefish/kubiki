import { Injectable } from '@nestjs/common'
import { PrismaService } from '@modules/prisma/prisma.service'
import { Score, Prisma, Artwork, Category, CategoryScore } from '@prisma/client'

@Injectable()
export class ScoreService {
  constructor(private prisma: PrismaService) {}

  async scores(params: {
    skip?: number
    take?: number
    cursor?: Prisma.ScoreWhereUniqueInput
    where?: Prisma.ScoreWhereInput
    orderBy?: Prisma.ScoreOrderByWithRelationInput
  }): Promise<Score[]> {
    const { skip, take, cursor, where, orderBy } = params
    return this.prisma.score.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    })
  }

  async updateScores(
    challengeId: string,
    judgeId: string,
    artworks: Artwork[],
    categories: Category[],
  ): Promise<Score[]> {
    //
    const scores = []
    for (let i = 0; i < artworks.length; i++) {
      const artwork = artworks[i]
      const where = {
        judgeId,
        challengeId,
        artworkId: artwork.id,
      }
      let score = await this.prisma.score.findUnique({ where })
      if (score) {
        scores.push(score)
        continue
      }

      const data = {
        judgeId,
        challengeId,
        artworkId: artwork.id,
      }

      score = await this.prisma.score.create({ data })
      const scoreCategories = await this.createScoreCategories(
        score.id,
        categories,
      )
      if (scoreCategories) {
        scores.push(score)
      }
    }
    return scores
  }

  private async createScoreCategories(
    scoreId: string,
    categories: Category[],
  ): Promise<CategoryScore[]> {
    const orders = []
    for (let j = 0; j < categories.length; j++) {
      const scoreCategoryData = {
        scoreId,
        value: 0,
        title: categories[j].title,
      }
      const scoreCategoryOrder = this.prisma.categoryScore.create({
        data: scoreCategoryData,
      })
      orders.push(scoreCategoryOrder)
    }
    return this.prisma.$transaction(orders)
  }
}
