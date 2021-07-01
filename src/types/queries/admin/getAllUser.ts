import { User } from '.prisma/client'
import { ArgsRecord } from 'nexus/dist/core'
import { Context } from '../../../context'

export const getAllUserResolver = async (
  _: any,
  args: ArgsRecord,
  ctx: Context,
): Promise<User[]> => {
  try {
    const users = await ctx.prisma.user.findMany({ include: { person: true, nft:true } })
    return users
  } catch (error) {
    return error
  }
}
