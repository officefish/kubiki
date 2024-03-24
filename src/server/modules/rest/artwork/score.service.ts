import { Injectable } from '@nestjs/common'
import { PrismaService } from '@modules/prisma/prisma.service'
import { Score, Prisma } from '@prisma/client'

interface IScoreUpdates {
  id?: string
  value?: number
}

@Injectable()
export class ScoreService {
  constructor(private prisma: PrismaService) {}

  async score(
    where: Prisma.ScoreWhereUniqueInput,
    include: Prisma.ScoreInclude,
  ): Promise<Score | null> {
    return this.prisma.score.findUnique({
      where,
      include,
    })
  }

  async update(scoreId: string, scores: IScoreUpdates[]): Promise<Score> {
    const orders = []
    let total = 0
    for (let i = 0; i < scores.length; i++) {
      const categoryScore = scores[i]
      const where = { id: categoryScore.id }
      const data = { value: categoryScore.value }
      total += categoryScore.value
      const order = this.prisma.categoryScore.update({ where, data })
      orders.push(order)
    }
    await this.prisma.$transaction(orders)

    return this.prisma.score.update({
      where: { id: scoreId },
      data: { total },
    })
  }
}
