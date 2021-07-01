import { Context } from '../../context'
import { core, nonNull, stringArg } from 'nexus'
import { getUserId } from '../../utils'
import { getNFTStatusByAssetIndex } from '../../services/nft/getNFTStatusByAssetIndex'
import { enforceExists } from '../../common/errors/enforce'
import { ErrorCodesEnum } from '../ErrorCodes'
import NotFoundError from '../../common/errors/NotFoundError'

export const verifyNFTStatusResolver: core.FieldResolver<
  'Query',
  'verifyNFTStatus'
> = async (_, { assetIndex }, ctx: Context): Promise<string> => {
  const userId = getUserId(ctx)

  enforceExists(assetIndex, ErrorCodesEnum.FIELD_IS_REQUIRED, NotFoundError)

  const ListOfAssetsInSale = await getNFTStatusByAssetIndex(Number(assetIndex))

  return ListOfAssetsInSale
}

export const verifyNFTStatus: core.NexusOutputFieldConfig<
  'Query',
  'verifyNFTStatus'
> = {
  type: 'String',
  args: { assetIndex: nonNull(stringArg()) },
  resolve: verifyNFTStatusResolver,
}
