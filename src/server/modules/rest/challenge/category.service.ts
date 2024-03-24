import { Injectable } from '@nestjs/common'
import { PrismaService } from '@modules/prisma/prisma.service'
import { Category, Prisma } from '@prisma/client'

@Injectable()
export class CategoryService {
  constructor(private prisma: PrismaService) {}

  async categories(params: {
    skip?: number
    take?: number
    cursor?: Prisma.CategoryWhereUniqueInput
    where?: Prisma.CategoryWhereInput
    orderBy?: Prisma.CategoryOrderByWithRelationInput
  }): Promise<Category[]> {
    const { skip, take, cursor, where, orderBy } = params
    return this.prisma.category.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    })
  }

  async default(challengeId: string): Promise<Category[]> {
    const titles = [
      'cоответствие теме',
      'оригинальность замысла',
      'художественная выразительность',
      'мастерство в использовании',
      'творческая самостоятельность',
    ]

    const orders = []
    for (let i = 0; i < titles.length; i++) {
      const title = titles[i]
      const data = { title, challengeId }
      const order = this.prisma.category.create({ data })
      orders.push(order)
    }

    return this.prisma.$transaction(orders)
  }
}
