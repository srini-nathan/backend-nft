import { Context } from '../../context'
import { core, nonNull, stringArg } from 'nexus'
import { getUserId } from '../../utils'
import { fetchNFTCollection } from '../../services/nft/fetchNFTCollection'
import { enforceExists } from '../../common/errors/enforce'
import { ErrorCodesEnum } from '../ErrorCodes'
import NotFoundError from '../../common/errors/NotFoundError'
import { ethers } from 'ethers'

export const getMyNFTCollectionResolver: core.FieldResolver<
  'Query',
  'getMyNFTCollectables'
> = async (_, { caller }, ctx: Context): Promise<string[]> => {
  const userId = getUserId(ctx)

  enforceExists(caller, ErrorCodesEnum.FIELD_IS_REQUIRED, NotFoundError)
  enforceExists(
    ethers.utils.isAddress(caller),
    ErrorCodesEnum.INVALID_ACCOUNT_ADDRESS,
    NotFoundError,
  )

  const myCollectables = (await fetchNFTCollection(caller)) ?? []

  return myCollectables
}

export const getMyNFTCollection: core.NexusOutputFieldConfig<
  'Query',
  'getMyNFTCollectables'
> = {
  type: 'String',
  args: { caller: nonNull(stringArg()) },
  resolve: getMyNFTCollectionResolver,
}
