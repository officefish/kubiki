import { createZodDto } from 'nestjs-zod'
import { z } from 'nestjs-zod/z'

import { AgeGroup } from '@prisma/client'
const ageGroupEnum = z.nativeEnum(AgeGroup)

const skip = {
  skip: z.number().min(0),
}

const take = {
  take: z.number().min(5).max(100),
}

const PartialSchema = z.object({
  ...skip,
  ...take,
})

const title = {
  title: z.string().min(2).max(40),
}

const CreateChallengeSchema = z.object({
  ...title,
})

const GetLastChallengeSchema = z.object({
  skip: z.number().min(0),
  take: z.number().min(0).max(100),
  ageGroup: ageGroupEnum.optional(),
})

export class CreateChallengeDto extends createZodDto(CreateChallengeSchema) {}
export class GetAllChallengesDto extends createZodDto(PartialSchema) {}
export class InitializeManyDto extends createZodDto(PartialSchema) {}
export class GetLastChallengeDto extends createZodDto(GetLastChallengeSchema) {}
