import { Context } from '../../../context'
import { core, nonNull, stringArg } from 'nexus'
import { getUserId } from '../../../utils'

interface ipfsType {
  id: string
  ipfsHash: string
  isMinted: boolean
  isAssetReady: boolean
  nFTId: string | null
}

export const getUserIPFSByNftIdResolver: core.FieldResolver<
  'Query',
  'getUserIPFSByNftId'
> = async (_, {nFTId}, ctx: Context): Promise<ipfsType[]> => {
  const userId = getUserId(ctx)

  const nFTInfo =
    await ctx.prisma.ipfs.findMany({where:{nFTId}}) ?? []

  return nFTInfo
}

export const getUserIPFSByNftId: core.NexusOutputFieldConfig<
  'Query',
  'getUserIPFSByNftId'
> = {
  type: 'NFTDetails',
  args: { nFTId: nonNull(stringArg()) },
  resolve: getUserIPFSByNftIdResolver,
}
