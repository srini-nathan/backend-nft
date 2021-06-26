import { Context } from '../../context'
import { core } from 'nexus'
import { getUserId } from '../../utils'
import { AssetInSale, getAllListings } from '../../services/nft/getAllListings'

export const getAllListingsInSaleResolver: core.FieldResolver<
  'Query',
  'getAllListings'
> = async (_, _args, ctx: Context):Promise<AssetInSale[]> => {
  const userId = getUserId(ctx)

  const ListOfAssetsInSale = await getAllListings()

  return ListOfAssetsInSale
}

export const getAllListingsInSale: core.NexusOutputFieldConfig<
  'Query',
  'getAllListings'
> = {
  type: 'AssetListInSale',
  resolve: getAllListingsInSaleResolver,
}
