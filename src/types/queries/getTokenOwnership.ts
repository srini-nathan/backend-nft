import { Context } from '../../context'
import { core, nonNull, stringArg } from 'nexus'
import { getUserId } from '../../utils'
import { ErrorCodesEnum } from '../ErrorCodes'
import { enforceExists } from '../../common/errors/enforce'
import NotFoundError from '../../common/errors/NotFoundError'
import { isOnSell } from '../../services/nft/isOnSell'
import { verifyTokenOwnership } from '../../services/nft/verifyTokenOwnership'

export const getTokenOwnershipResolver: core.FieldResolver<
  'Query',
  'getTokenOwnership'
> = async (_, { assetIndex }, ctx: Context): Promise<String> => {
  const userId = getUserId(ctx)

  enforceExists(assetIndex, ErrorCodesEnum.FIELD_IS_REQUIRED, NotFoundError)

  const status = await verifyTokenOwnership(Number(assetIndex))

  return status
}

export const getTokenOwnership: core.NexusOutputFieldConfig<
  'Query',
  'getTokenOwnership'
> = {
  type: 'String',
  args: { assetIndex: nonNull(stringArg()) },
  resolve: getTokenOwnershipResolver,
}
