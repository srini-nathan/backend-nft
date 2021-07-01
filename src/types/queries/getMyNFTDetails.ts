import { Context } from '../../context'
import { core } from 'nexus'
import { getUserId } from '../../utils'
import { Ipfs } from '.prisma/client'

interface ipfsType {
  id: string
  ipfsHash: string
  assetIndex:string
  nFTId: string | null
}

export const getMyNFTDetailsResolver: core.FieldResolver<'Query', 'getMyNFTDetails'> = async (
  _,
  _args,
  ctx: Context,
): Promise<ipfsType[]> => {
  const userId = getUserId(ctx)

  const nFTInfo: Ipfs[] =
    (await ctx.prisma.ipfs.findMany({
      where: { NFT: { userId } },
    })) ?? []


  return nFTInfo
}

export const getMyNFTDetails: core.NexusOutputFieldConfig<'Query', 'getMyNFTDetails'> = {
  type: 'NFTDetails',
  resolve: getMyNFTDetailsResolver,
}
