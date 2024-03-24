import { faker } from '@faker-js/faker'

import { PrismaService } from '@modules/prisma/prisma.service'
import { UserService } from '@modules/rest/user/user.service'
import { CryptoService } from '@modules/crypto/crypto.service'
import { AppConfigService } from '@modules/config/config.service'

import { expect } from 'vitest'

export interface FakeNewUser {
  email: string
  name?: string
  password: string
}

export interface MakeUserDataParams {
  env: AppConfigService
  crypto: CryptoService
  userData: FakeNewUser
}

export interface UserDataForDB {
  email: string
  password: string
  salt: string
  verified: boolean
  name?: string
}

export const makeUserInputData = async (
  params: MakeUserDataParams,
): Promise<UserDataForDB> => {
  const { env, crypto, userData } = params
  const saltLength = env.getSaltLength()
  const salt = await crypto.generateSalt(saltLength)
  const hashedPassword = await crypto.hash(userData.password, salt)

  return {
    email: userData.email,
    password: hashedPassword,
    salt,
    verified: false,
  }
}

export const generateNewUser = () => {
  return {
    email: faker.internet.email(),
    password: `${faker.internet.password()}Aa1$`,
    name: faker.person.fullName(),
  }
}

export const generateRandomQuote = () => {
  return {
    content: faker.string.alphanumeric({ length: { min: 5, max: 120 } }),
  }
}

export const generateRandomDomain = () => {
  return {
    value: faker.string.alphanumeric({ length: { min: 4, max: 22 } }),
  }
}

export interface BasicInfoGeneratorParams {
  includeFullname: boolean
  includeCareer: boolean
  includeEducation: boolean
  includeLocation: boolean
}

export const IncludeAllBasicInfo: BasicInfoGeneratorParams = {
  includeFullname: true,
  includeCareer: true,
  includeEducation: true,
  includeLocation: true,
}

export interface FullNameInput {
  firstName: string
  lastName: string
}

export interface CareerInput {
  company?: string
  role?: string
}

export interface EducationInput {
  university?: string
  faculty?: string
}

export interface LocationInput {
  country?: string
  region?: string
  timeZone?: string
}

export interface BasicInfoInput {
  fullName?: FullNameInput
  career?: CareerInput
  education?: EducationInput
  location?: LocationInput
}

export const generateBasicInfo = (params: BasicInfoGeneratorParams) => {
  const { includeFullname, includeCareer, includeEducation, includeLocation } =
    params

  const result: BasicInfoInput = {}
  /* include FullName if need */
  if (includeFullname) {
    result.fullName = {
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
    }
  }
  /* include Career if need */
  if (includeCareer) {
    result.career = {
      company: faker.company.name(),
      role: faker.person.jobTitle(),
    }
  }
  /* include Education if need*/
  if (includeEducation) {
    result.education = {
      university: 'University of culture and Art',
      faculty: 'Multimedia producer',
    }
  }
  if (includeLocation) {
    result.location = {
      country: faker.location.country(),
      region: faker.location.city(),
      timeZone: faker.location.timeZone().toString(),
    }
  }
  return result
}

export const destroyUser = async (
  userService: UserService,
  prisma: PrismaService,
  email: string,
) => {
  await userService.deleteUser({ email })
  return await checkUserNotExist(prisma, email)
}

// const getExistUser = async (prisma: PrismaService, email: string) => {
//   return await prisma.user.findUnique({
//     where: { email },
//   })
// }

export const checkUserNotExist = async (
  prisma: PrismaService,
  email: string,
) => {
  const prismaUser = await prisma.user.findUnique({
    where: { email },
  })
  return expect(prismaUser).toBe(null)
}
