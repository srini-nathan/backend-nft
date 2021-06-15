import { core, nonNull, nullable, stringArg } from 'nexus'
import { enforceExists } from '../../common/errors/enforce'
import NotFoundError from '../../common/errors/NotFoundError'
import { Context } from '../../context'
import { getUserId } from '../../utils'
import { IApiCall } from '../ApiCall'
import { ApiFeedbackEnum } from '../ApiFeedback'
import { ErrorCodesEnum } from '../ErrorCodes'

interface IPFSHashParams {
  ipfsHash: string
  nftId: string
}

export const updateNFTIsMintedResolver: core.FieldResolver<
  'Mutation',
  'updateNFTIsMinted'
> = async (
  _parent: any,
  { nftId, ipfsHash }: IPFSHashParams,
  context: Context,
): Promise<IApiCall> => {
  const userId = getUserId(context)

  enforceExists(nftId, ErrorCodesEnum.FIELD_IS_REQUIRED, NotFoundError)
  enforceExists(ipfsHash, ErrorCodesEnum.FIELD_IS_REQUIRED, NotFoundError)

  if (nftId) {
    await context.prisma.nFT.update({
      where: { id: nftId },
      data: {
        ipfs: { update: { data: { isMinted: true }, where: { ipfsHash } } },
      },
    })

    return { feedback: ApiFeedbackEnum.SUCCESS }
  }

  return { feedback: ApiFeedbackEnum.SUCCESS }
}

export const updateNFTIsMinted: core.NexusOutputFieldConfig<
  'Mutation',
  'updateNFTIsMinted'
> = {
  type: 'ApiCall',
  args: {
    ipfsHash: nonNull(stringArg()),
    nftId: nonNull(stringArg()),
  },
  resolve: updateNFTIsMintedResolver,
}
