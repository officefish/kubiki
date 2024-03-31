import { Injectable } from '@nestjs/common'
import { PrismaService } from '@modules/prisma/prisma.service'
import {
  User,
  Prisma,
  BasicInfo,
  Quote,
  Domain,
  Avatar,
  Cover,
  Tartan,
  Role,
} from '@prisma/client'

interface FullNameInput {
  firstName?: string
  lastName?: string
}

interface CareerInput {
  company?: string
  role?: string
}

interface EducationInput {
  university?: string
  faculty?: string
}

interface LocationInput {
  country?: string
  region?: string
  timeZone?: string
}

interface BasicInfoInput {
  fullName?: FullNameInput
  career?: CareerInput
  education?: EducationInput
  location?: LocationInput
}

interface QuoteInput {
  content?: string
}

interface DomainInput {
  value?: string
}
interface AvatarInput {
  url: string
}

interface CoverInput {
  url: string
}

interface TartanInput {
  pattern: string
  hashed: string
  url: string
}
@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async user(
    userWhereUniqueInput: Prisma.UserWhereUniqueInput,
  ): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: userWhereUniqueInput,
    })
  }

  async users(params: {
    skip?: number
    take?: number
    cursor?: Prisma.UserWhereUniqueInput
    where?: Prisma.UserWhereInput
    orderBy?: Prisma.UserOrderByWithRelationInput
  }): Promise<User[]> {
    const { skip, take, cursor, where, orderBy } = params
    return this.prisma.user.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    })
  }

  async createUser(data: Prisma.UserCreateInput): Promise<User> {
    const user = await this.prisma.user.findUnique({
      where: { email: data.email },
    })
    if (user) return user

    return this.prisma.user.create({
      data,
    })
  }

  async updateUser(params: {
    where: Prisma.UserWhereUniqueInput
    data: Prisma.UserUpdateInput
  }): Promise<User> {
    const { where, data } = params
    return this.prisma.user.update({
      data,
      where,
    })
  }

  async deleteUser(where: Prisma.UserWhereUniqueInput): Promise<User | null> {
    const user = await this.prisma.user.findUnique({ where })

    /* return if not found */
    if (!user) return null

    /* delete basic info */
    const basicInfo = await this.prisma.basicInfo.findUnique({
      where: { userId: user.id },
    })

    if (basicInfo) {
      await this.prisma.$transaction([
        this.prisma.fullName.delete({ where: { basicInfoId: basicInfo.id } }),
        this.prisma.career.delete({ where: { basicInfoId: basicInfo.id } }),
        this.prisma.education.delete({ where: { basicInfoId: basicInfo.id } }),
        this.prisma.location.delete({ where: { basicInfoId: basicInfo.id } }),
        this.prisma.basicInfo.delete({ where: { id: basicInfo.id } }),
      ])
    }

    /* delete quote */
    const quote = await this.prisma.quote.findUnique({
      where: { userId: user.id },
    })
    if (quote) {
      await this.prisma.quote.delete({ where: { id: quote.id } })
    }

    /* delete domain */
    const domain = await this.prisma.domain.findUnique({
      where: { userId: user.id },
    })
    if (domain) {
      await this.prisma.domain.delete({ where: { id: domain.id } })
    }

    /* delete sessions */
    await this.prisma.session.deleteMany({ where: { userId: user.id } })

    /* finally delete user*/
    return this.prisma.user.delete({
      where,
    })
  }

  async upsetUser(params: {
    where: Prisma.UserWhereUniqueInput
    data: Prisma.UserCreateInput
  }): Promise<User> {
    const { where, data } = params

    return this.prisma.user.upsert({
      where,
      update: { ...data },
      create: { ...data },
    })
  }

  getBaseInfoCreateInputs = (data: BasicInfoInput) => {
    const firstName = data.fullName?.firstName || ''
    const lastName = data.fullName?.lastName || ''
    const company = data.career?.company || ''
    const role = data.career?.role || ''
    const university = data.education?.university || ''
    const faculty = data.education?.faculty || ''
    const country = data.location?.country || ''
    const region = data.location?.region || ''
    const timeZone = data.location?.timeZone || ''

    const fullNameCreateInput: Prisma.FullNameCreateNestedOneWithoutBasicInfoInput =
      {
        create: {
          firstName,
          lastName,
        },
      }
    const careerCreateInput: Prisma.CareerCreateNestedOneWithoutBasicInfoInput =
      {
        create: {
          company,
          role,
        },
      }
    const educationCreateInput: Prisma.EducationCreateNestedOneWithoutBasicInfoInput =
      {
        create: {
          university,
          faculty,
        },
      }
    const locationCreateInput: Prisma.LocationCreateNestedOneWithoutBasicInfoInput =
      {
        create: {
          country,
          region,
          timeZone,
        },
      }
    return {
      fullNameCreateInput,
      careerCreateInput,
      educationCreateInput,
      locationCreateInput,
    }
  }

  getBaseInfoUpdateInputs = (data: BasicInfoInput) => {
    const firstName = data.fullName?.firstName || ''
    const lastName = data.fullName?.lastName || ''
    const company = data.career?.company || ''
    const role = data.career?.role || ''
    const university = data.education?.university || ''
    const faculty = data.education?.faculty || ''
    const country = data.location?.country || ''
    const region = data.location?.region || ''
    const timeZone = data.location?.timeZone || ''

    const fullNameUpdateInput: Prisma.FullNameUpdateOneWithoutBasicInfoNestedInput =
      data.fullName
        ? {
            update: {
              firstName,
              lastName,
            },
          }
        : {}
    const careerUpdateInput: Prisma.CareerUpdateOneWithoutBasicInfoNestedInput =
      data.career
        ? {
            update: {
              company,
              role,
            },
          }
        : {}

    const educationUpdateInput: Prisma.EducationUpdateOneWithoutBasicInfoNestedInput =
      data.education
        ? {
            update: {
              university,
              faculty,
            },
          }
        : {}

    const locationUpdateInput: Prisma.LocationUpdateOneWithoutBasicInfoNestedInput =
      data.location
        ? {
            update: {
              country,
              region,
              timeZone,
            },
          }
        : {}

    return {
      fullNameUpdateInput,
      careerUpdateInput,
      educationUpdateInput,
      locationUpdateInput,
    }
  }

  async upsetBasicInfo(params: {
    user: Prisma.UserWhereUniqueInput
    data: BasicInfoInput
  }): Promise<BasicInfo> {
    const { user, data } = params

    /* Create Inputs */
    const {
      fullNameCreateInput,
      careerCreateInput,
      educationCreateInput,
      locationCreateInput,
    } = this.getBaseInfoCreateInputs(data)

    const basicInfoCreateInput: Prisma.BasicInfoCreateInput = {
      user: { connect: { id: user.id } },
      fullName: fullNameCreateInput,
      career: careerCreateInput,
      education: educationCreateInput,
      location: locationCreateInput,
    }

    /* Update Inputs */
    const {
      fullNameUpdateInput,
      careerUpdateInput,
      educationUpdateInput,
      locationUpdateInput,
    } = this.getBaseInfoUpdateInputs(data)

    const basicInfoUpdateInput: Prisma.BasicInfoUpdateInput = {
      user: { connect: { id: user.id } },
      fullName: fullNameUpdateInput,
      career: careerUpdateInput,
      education: educationUpdateInput,
      location: locationUpdateInput,
    }

    return this.prisma.basicInfo.upsert({
      where: { userId: user.id },
      create: basicInfoCreateInput,
      update: basicInfoUpdateInput,
    })
  }

  async upsetQuote(params: {
    user: Prisma.UserWhereUniqueInput
    data: QuoteInput
  }): Promise<Quote> {
    const { user, data } = params

    const content = data.content || ''

    const quoteCreateInput: Prisma.QuoteCreateInput = {
      user: { connect: { id: user.id } },
      content,
    }

    const quoteUpdateInput: Prisma.QuoteUpdateInput = {
      user: { connect: { id: user.id } },
      content,
    }

    return this.prisma.quote.upsert({
      where: { userId: user.id },
      create: quoteCreateInput,
      update: quoteUpdateInput,
    })
  }

  async upsetDomain(params: {
    user: Prisma.UserWhereUniqueInput
    data: DomainInput
  }): Promise<Domain> {
    const { user, data } = params

    const value = data.value || ''

    if (value.length) {
      const domain = await this.domain({ value })
      if (domain) {
        return domain.userId == user.id ? domain : null
      }
    }

    const domainCreateInput: Prisma.DomainCreateInput = {
      user: { connect: { id: user.id } },
      value,
    }

    const domainUpdateInput: Prisma.DomainUpdateInput = {
      user: { connect: { id: user.id } },
      value,
    }

    return this.prisma.domain.upsert({
      where: { userId: user.id },
      create: domainCreateInput,
      update: domainUpdateInput,
    })
  }

  async upsetAvatar(params: {
    user: Prisma.UserWhereUniqueInput
    data: AvatarInput
  }): Promise<Avatar> {
    const { user, data } = params

    const url = data.url || ''

    const avatarCreateInput: Prisma.AvatarCreateInput = {
      user: { connect: { id: user.id } },
      url,
    }

    const avatarUpdateInput: Prisma.AvatarUpdateInput = {
      user: { connect: { id: user.id } },
      url,
    }

    return this.prisma.avatar.upsert({
      where: { userId: user.id },
      create: avatarCreateInput,
      update: avatarUpdateInput,
    })
  }

  async avatar(input: Prisma.AvatarWhereUniqueInput): Promise<Avatar | null> {
    return this.prisma.avatar.findUnique({
      where: input,
    })
  }

  async upsetCover(params: {
    user: Prisma.UserWhereUniqueInput
    data: CoverInput
  }): Promise<Cover> {
    const { user, data } = params

    const url = data.url || ''

    const createInput: Prisma.CoverCreateInput = {
      user: { connect: { id: user.id } },
      url,
    }

    const updateInput: Prisma.CoverUpdateInput = {
      user: { connect: { id: user.id } },
      url,
    }

    return this.prisma.cover.upsert({
      where: { userId: user.id },
      create: createInput,
      update: updateInput,
    })
  }

  async cover(input: Prisma.CoverWhereUniqueInput): Promise<Cover | null> {
    return this.prisma.cover.findUnique({
      where: input,
    })
  }

  async upsetTartan(params: {
    user: Prisma.UserWhereUniqueInput
    data: TartanInput
  }): Promise<Tartan> {
    const { user, data } = params

    const pattern = data.pattern
    const hashed = data.hashed
    const url = data.url

    const createInput: Prisma.TartanCreateInput = {
      user: { connect: { id: user.id } },
      pattern,
      hashed,
      url,
    }

    const updateInput: Prisma.TartanUpdateInput = {
      user: { connect: { id: user.id } },
      pattern,
      hashed,
      url,
    }

    return this.prisma.tartan.upsert({
      where: { userId: user.id },
      create: createInput,
      update: updateInput,
    })
  }

  async tartan(input: Prisma.TartanWhereUniqueInput): Promise<Tartan | null> {
    return this.prisma.tartan.findUnique({
      where: input,
    })
  }

  async basicInfo(
    input: Prisma.BasicInfoWhereUniqueInput,
  ): Promise<BasicInfo | null> {
    return this.prisma.basicInfo.findUnique({
      where: input,
    })
  }

  async basicInfoJson(basicInfoId: string): Promise<BasicInfoInput> {
    const fullName = await this.prisma.fullName.findUnique({
      where: { basicInfoId },
    })
    const career = await this.prisma.career.findUnique({
      where: { basicInfoId },
    })
    const education = await this.prisma.education.findUnique({
      where: { basicInfoId },
    })
    const location = await this.prisma.location.findUnique({
      where: { basicInfoId },
    })
    return {
      fullName: {
        firstName: fullName?.firstName || null,
        lastName: fullName?.lastName || null,
      },
      career: {
        company: career?.company || null,
        role: career?.role || null,
      },
      education: {
        university: education?.university || null,
        faculty: education?.faculty || null,
      },
      location: {
        region: location?.region || null,
        country: location?.country || null,
        timeZone: location?.timeZone || null,
      },
    }
  }

  async quote(input: Prisma.QuoteWhereUniqueInput): Promise<Quote | null> {
    return this.prisma.quote.findUnique({
      where: input,
    })
  }

  async domain(
    domainWhereUniqueInput: Prisma.DomainWhereUniqueInput,
  ): Promise<Domain | null> {
    return this.prisma.domain.findUnique({
      where: domainWhereUniqueInput,
    })
  }

  async updateRole(id: string, role: Role): Promise<User | null> {
    const where = { id }
    const data = { role }
    return this.prisma.user.update({
      where,
      data,
    })
  }
}
