import { allow, IRules, rule, shield, deny } from 'graphql-shield'
import { getUserId } from '../utils'
import { Context } from '../context'

export const rules = {
  isAuthenticatedUser: rule()((_parent, _args, context: Context) => {
    const userId = getUserId(context)
    return Boolean(userId)
  }),
  // isPostOwner: rule()(async (_parent, args, context) => {
  //   const userId = getUserId(context)
  //   const author = await context.prisma.post
  //     .findUnique({
  //       where: {
  //         id: Number(args.id),
  //       },
  //     })
  //     .author()
  //   return userId === author.id
  // }),
}

export const permissions = shield(
  {
    Query: {
      '*': deny,
      me: rules.isAuthenticatedUser,
      getAllUser: rules.isAuthenticatedUser,
    },
    Mutation: {
      '*': deny,
      inviteUser: allow,
      signup: allow,
      login: rules.isAuthenticatedUser,
    },
  },
  { debug: true },
)
