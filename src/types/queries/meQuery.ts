import { Context } from '../../context'
import { core } from 'nexus'
import { User } from '.prisma/client'
import { getUserId } from '../../utils'

export const meResolver: core.FieldResolver<'Query', 'me'> = async (
  _,
  _args,
  ctx: Context,
): Promise<User> => {
  const userId = getUserId(ctx)

  return await ctx.prisma.user.findUnique({
    where: { id: userId },
    rejectOnNotFound: true,
    include: {
      person: {
        select: { id: true, firstName: true, lastName: true, userId: true },
      },
    },
  })
}

export const me: core.NexusOutputFieldConfig<'Query', 'me'> = {
  type: 'User',
  resolve: meResolver,
}
