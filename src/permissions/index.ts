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
      getMyNFTAsset: and(
        rules.isAuthenticatedUser,
        or(rules.isAdminToken, rules.isCreatorToken),
      ),
      getAllListings: and(
        rules.isAuthenticatedUser,
        or(rules.isAdminToken, rules.isCreatorToken),
      ),
      getTokenIdByAssetIndex: and(
        rules.isAuthenticatedUser,
        or(rules.isAdminToken, rules.isCreatorToken),
      ),
      verifyAssetIsOnSale: and(
        rules.isAuthenticatedUser,
        or(rules.isAdminToken, rules.isCreatorToken),
      ),
      getTokenOwnership: and(
        rules.isAuthenticatedUser,
        or(rules.isAdminToken, rules.isCreatorToken),
      ),
      getAssetsByUser: and(
        rules.isAuthenticatedUser,
        or(rules.isAdminToken, rules.isCreatorToken),
      ),
      verifyMintRole: and(
        rules.isAuthenticatedUser,
        or(rules.isAdminToken, rules.isCreatorToken),
      ),
      getUserIPFSByNftId: and(
        rules.isAuthenticatedUser,
        or(rules.isAdminToken),
      ),
      verifyNFTStatus: and(
        rules.isAuthenticatedUser,
        or(rules.isAdminToken, rules.isCreatorToken),
      ),
      getMyNFTCollectables: and(
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
      updateWalletAddress: and(
        rules.isAuthenticatedUser,
        or(rules.isAdminToken),
      ),
    },
  },
  { debug: true },
)
