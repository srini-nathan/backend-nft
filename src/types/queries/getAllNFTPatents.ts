import { Context } from '../../context'
import { core, nullable, nonNull, stringArg } from 'nexus'
import { getUserId } from '../../utils'
import { AllPatents, getAllPatents } from '../../services/nft/getAllPatents'

export const getAllNFTPatentsResolver: core.FieldResolver<
  'Query',
  'getAllNFTPatents'
> = async (_, { ownerAddress }, ctx: Context): Promise<AllPatents[]> => {
  const userId = getUserId(ctx)

  const myPatents = await getAllPatents(ownerAddress) ?? []
  console.log(myPatents);
  

  return myPatents
}

export const getAllNFTPatents: core.NexusOutputFieldConfig<
  'Query',
  'getAllNFTPatents'
> = {
  type: 'AllPatents',
  args: { ownerAddress: nonNull(stringArg()) },
  resolve: getAllNFTPatentsResolver,
}
