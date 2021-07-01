import { Context } from '../../context'
import { core, nonNull, stringArg } from 'nexus'
import { getUserId } from '../../utils'
import { ErrorCodesEnum } from '../ErrorCodes'
import { enforceExists } from '../../common/errors/enforce'
import NotFoundError from '../../common/errors/NotFoundError'
import { isOnSell } from '../../services/nft/isOnSell'
import { verifyAccountHasMintRole } from '../../services/nft/verifyAccountHasMintRole'
import { ethers } from 'ethers'

export const verifyMintRoleResolver: core.FieldResolver<
  'Query',
  'verifyMintRole'
> = async (_, { accountAddress }, ctx: Context): Promise<boolean> => {
  const userId = getUserId(ctx)

  enforceExists(accountAddress, ErrorCodesEnum.FIELD_IS_REQUIRED, NotFoundError)
  enforceExists(
    ethers.utils.isAddress(accountAddress),
    ErrorCodesEnum.INVALID_ACCOUNT_ADDRESS,
    NotFoundError,
  )

  const status = await verifyAccountHasMintRole(accountAddress)

  return status
}

export const verifyMintRole: core.NexusOutputFieldConfig<
  'Query',
  'verifyMintRole'
> = {
  type: 'Boolean',
  args: { accountAddress: nonNull(stringArg()) },
  resolve: verifyMintRoleResolver,
}
