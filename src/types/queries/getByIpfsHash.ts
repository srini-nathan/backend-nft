import { Context } from '../../context'
import { core, nonNull, stringArg } from 'nexus'
import { getUserId } from '../../utils'
import { Ipfs } from '.prisma/client'
import { fetchIpfsJSONMetadata } from '../../services/nft/fetchIpfsJSONMetadata'
import { enforceExists } from '../../common/errors/enforce'
import { ErrorCodesEnum } from '../ErrorCodes'
import NotFoundError from '../../common/errors/NotFoundError'

interface ipfsItem {
  name: string
  description: string
  assetFileName: string
  image: string
  media: {
    dimensions: string
    mimeType: string
    size: number | undefined
  }
  authentication: {
    metaDataHash: string | undefined
    signature: string | undefined
    owner: string | undefined
  }
  patentId: string
}

export const getByIpfsHashResolver: core.FieldResolver<
  'Query',
  'getByIpfsHash'
> = async (
  _,
  { ipfsHash }: { ipfsHash: string },
  ctx: Context,
): Promise<ipfsItem> => {
  const userId = getUserId(ctx)
  enforceExists(ipfsHash, ErrorCodesEnum.FIELD_IS_REQUIRED, NotFoundError)

  const ipfsItem: ipfsItem = await fetchIpfsJSONMetadata(ipfsHash)

  return ipfsItem
}

export const getByIpfsHash: core.NexusOutputFieldConfig<
  'Query',
  'getByIpfsHash'
> = {
  type: 'IpfsItem',
  args: { ipfsHash: nonNull(stringArg()) },
  resolve: getByIpfsHashResolver,
}
