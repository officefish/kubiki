import { createZodDto } from 'nestjs-zod'
import { z } from 'nestjs-zod/z'

const CreateArtworkSchema = z.object({
  challengeId: z.string(),
  firstName: z.string().min(2).max(24),
  lastName: z.string().min(2).max(24),
  age: z.number().min(4).max(18),
  uri: z.string(),
})

const score = z.object({
  id: z.string(),
  value: z.number().min(0).max(10),
})

const UpdateArtworkScoreSchema = z.object({
  scoreId: z.string(),
  scores: z.array(score),
})

const UpdateArtworkAuthorSchema = z.object({
  id: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  age: z.number(),
})

const LikeSchema = z.object({
  artworkId: z.string(),
})

const DeleteArtworkSchema = z.object({
  id: z.string(),
})

const UploadArtworkSchema = z.object({
  challengeId: z.string(),
  firstName: z.string().min(2).max(24),
  lastName: z.string().min(2).max(24),
  age: z.preprocess(
    (a) => parseInt(z.string().parse(a), 10),
    z.number().gte(3, 'Must be 3 and above'),
  ),
})

export class DeleteArtworkDto extends createZodDto(DeleteArtworkSchema) {}

export class CreateArtworkDto extends createZodDto(CreateArtworkSchema) {}
export class UploadArtworkDto extends createZodDto(UploadArtworkSchema) {}

export class UpdateArtworkScoreDto extends createZodDto(
  UpdateArtworkScoreSchema,
) {}

export class UpdateArtworkAuthorDto extends createZodDto(
  UpdateArtworkAuthorSchema,
) {}

export class LikeDto extends createZodDto(LikeSchema) {}
