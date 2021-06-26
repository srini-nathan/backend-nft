import { Context } from '../../context'
import { core, nonNull, stringArg } from 'nexus'
import { getUserId } from '../../utils'
import { fetchTokenIdByAssetIndex } from '../../services/nft/fetchTokenIdByAssetIndex'
import { ErrorCodesEnum } from '../ErrorCodes'
import { enforceExists } from '../../common/errors/enforce'
import NotFoundError from '../../common/errors/NotFoundError'

export const getTokenIdByAssetIndexResolver: core.FieldResolver<
  'Query',
  'getTokenIdByAssetIndex'
> = async (_, { assetIndex }, ctx: Context): Promise<string | null> => {
  const userId = getUserId(ctx)

  enforceExists(assetIndex, ErrorCodesEnum.FIELD_IS_REQUIRED, NotFoundError)

  const tokenId = await fetchTokenIdByAssetIndex(Number(assetIndex))

  return tokenId ?? null
}

export const getTokenIdByAssetIndex: core.NexusOutputFieldConfig<
  'Query',
  'getTokenIdByAssetIndex'
> = {
  type: 'String',
  args: { assetIndex: nonNull(stringArg()) },
  resolve: getTokenIdByAssetIndexResolver,
}
