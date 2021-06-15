import { Context } from '../../context'
import { core, nonNull, stringArg } from 'nexus'
import { getUserId } from '../../utils'
import { getMyPatents } from '../../services/nft/getMyPatents'
import { enforce, enforceExists } from '../../common/errors/enforce'
import { ErrorCodesEnum } from '../ErrorCodes'
import NotFoundError from '../../common/errors/NotFoundError'
import { isAddress } from 'web3-utils'
import ForbiddenError from '../../common/errors/ForbiddenError'

export const getMyNFTPatentsResolver: core.FieldResolver<
  'Query',
  'getMyNFTPatents'
> = async (_, { ownerAddress }, ctx: Context): Promise<string[]> => {
  const userId = getUserId(ctx)

  enforceExists(ownerAddress, ErrorCodesEnum.FIELD_IS_REQUIRED, NotFoundError)
  enforce(
    isAddress(ownerAddress),
    ErrorCodesEnum.INVALID_ACCOUNT_ADDRESS,
    ForbiddenError,
  )

  const myPatents = (await getMyPatents(ownerAddress)) ?? []

  return myPatents
}

export const getMyNFTPatents: core.NexusOutputFieldConfig<
  'Query',
  'getMyNFTPatents'
> = {
  type: 'String',
  args: { ownerAddress: nonNull(stringArg()) },
  resolve: getMyNFTPatentsResolver,
}
