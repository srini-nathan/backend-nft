import { Context } from '../../context'
import { core, nonNull, stringArg } from 'nexus'
import { getUserId } from '../../utils'
import { AssetInSale, getAllListings } from '../../services/nft/getAllListings'
import { getAssetsByUser } from '../../services/nft/getAssetsByUser'

export const fetchAssetsByUserResolver: core.FieldResolver<
  'Query',
  'getAssetsByUser'
> = async (_, { ownerAddress }, ctx: Context): Promise<AssetInSale[]> => {
  const userId = getUserId(ctx)

  const ListOfAssetsInSale = await getAssetsByUser(ownerAddress)

  return ListOfAssetsInSale
}

export const fetchAssetsByUser: core.NexusOutputFieldConfig<
  'Query',
  'getAssetsByUser'
> = {
  type: 'AssetListInSale',
  args: { ownerAddress: nonNull(stringArg()) },
  resolve: fetchAssetsByUserResolver,
}
