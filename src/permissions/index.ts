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
    const user = await context.prisma.user.findUnique({ where: { id: userId } })
    const isNomineeUser = user && user.role === 'Admin'
    return Boolean(isNomineeUser)
  }),
  isCreatorToken: rule()(async (parent, args, context: Context) => {
    const userId = getUserId(context)
    const user = await context.prisma.user.findUnique({ where: { id: userId } })
    const isCreatorUser = user && user.role === 'Creator'
    return Boolean(isCreatorUser)
  }),
}

export const permissions = shield(
  {
    Query: {
      '*': deny,
      me: and(
        rules.isAuthenticatedUser,
        or(rules.isAdminToken, rules.isCreatorToken),
      ),
      getAllUser: and(rules.isAuthenticatedUser, rules.isAdminToken),
      getAllNFTPatents: and(
        rules.isAuthenticatedUser,
        or(rules.isAdminToken, rules.isCreatorToken),
      ),
      getMyNFTDetails: and(
        rules.isAuthenticatedUser,
        or(rules.isAdminToken, rules.isCreatorToken),
      ),
      getMyNFTPatents: and(
        rules.isAuthenticatedUser,
        or(rules.isAdminToken, rules.isCreatorToken),
      ),
      getMyNFTPatent: and(
        rules.isAuthenticatedUser,
        or(rules.isAdminToken, rules.isCreatorToken),
      ),
      getByIpfsHash: and(
        rules.isAuthenticatedUser,
        or(rules.isAdminToken, rules.isCreatorToken),
      ),
    },
    Mutation: {
      '*': deny,
      inviteUser: allow,
      signup: allow,
      login: allow,
      resetPassword: and(
        rules.isAuthenticatedUser,
        or(rules.isAdminToken, rules.isCreatorToken),
      ),
      createIPFSHash: and(
        rules.isAuthenticatedUser,
        or(rules.isAdminToken, rules.isCreatorToken),
      ),
      updateNFTIsMinted: and(
        rules.isAuthenticatedUser,
        or(rules.isAdminToken, rules.isCreatorToken),
      ),
    },
  },
  { debug: true },
)
