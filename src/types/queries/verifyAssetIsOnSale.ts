import { Context } from '../../context'
import { core, nonNull, stringArg } from 'nexus'
import { getUserId } from '../../utils'
import { ErrorCodesEnum } from '../ErrorCodes'
import { enforceExists } from '../../common/errors/enforce'
import NotFoundError from '../../common/errors/NotFoundError'
import { isOnSell } from '../../services/nft/isOnSell'

export const verifyAssetIsOnSaleResolver: core.FieldResolver<
  'Query',
  'verifyAssetIsOnSale'
> = async (_, { assetIndex }, ctx: Context): Promise<boolean> => {
  const userId = getUserId(ctx)

  enforceExists(assetIndex, ErrorCodesEnum.FIELD_IS_REQUIRED, NotFoundError)

  const status = await isOnSell(Number(assetIndex))

  return status
}

export const verifyAssetIsOnSale: core.NexusOutputFieldConfig<
  'Query',
  'verifyAssetIsOnSale'
> = {
  type: 'Boolean',
  args: { assetIndex: nonNull(stringArg()) },
  resolve: verifyAssetIsOnSaleResolver,
}
