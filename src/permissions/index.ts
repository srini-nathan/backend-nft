import { allow, IRules, rule, shield, deny, and, or } from 'graphql-shield'
import { getUserId } from '../utils'
import { Context } from '../context'

export const rules = {
  isAuthenticatedUser: rule()((_parent, _args, context: Context) => {
    const userId = getUserId(context)
    return Boolean(userId)
  }),
  isAdminToken: rule()(async (parent, args, context: Context) => {
    const userId = getUserId(context)
    const user = await context.prisma.user.findUnique({where:{id:userId}})
    const isNomineeUser = user && user.role === "Admin";
    return Boolean(isNomineeUser);
  }),
  isCreatorToken: rule()(async (parent, args, context: Context) => {
    const userId = getUserId(context)
    const user = await context.prisma.user.findUnique({where:{id:userId}})
    const isCreatorUser = user && user.role === "Creator";
    return Boolean(isCreatorUser);
  }),
}

export const permissions = shield(
  {
    Query: {
      '*': deny,
      me: and(rules.isAuthenticatedUser, or(rules.isAdminToken, rules.isCreatorToken)),
      getAllUser: and(rules.isAuthenticatedUser, rules.isAdminToken),
    },
    Mutation: {
      '*': deny,
      inviteUser: allow,
      signup: allow,
      login: allow,
      resetPassword:and(rules.isAuthenticatedUser, or(rules.isAdminToken, rules.isCreatorToken))
    },
  },
  { debug: true },
)
