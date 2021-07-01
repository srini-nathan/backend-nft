import { core, nonNull, stringArg } from 'nexus'
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
  walletAddress: string
}

export const updateWalletAddressResolver: core.FieldResolver<
  'Mutation',
  'updateWalletAddress'
> = async (
  _parent: any,
  { nftId, ipfsHash, walletAddress }: IPFSHashParams,
  context: Context,
): Promise<IApiCall> => {
  const userId = getUserId(context)

  enforceExists(nftId, ErrorCodesEnum.FIELD_IS_REQUIRED, NotFoundError)
  enforceExists(ipfsHash, ErrorCodesEnum.FIELD_IS_REQUIRED, NotFoundError)

  const currentNFT = await context.prisma.nFT.findUnique({
    where: { id: nftId },
    select: {
      ipfs: {
        where: { ipfsHash },
        select: { walletAddress: true },
      },
    },
  })

  const walletAddressValue = walletAddress ?? currentNFT?.ipfs[0].walletAddress

  if (nftId) {
    await context.prisma.nFT.update({
      where: { id: nftId },
      data: {
        ipfs: {
          update: {
            data: {
              walletAddress: walletAddressValue,
            },
            where: { ipfsHash },
          },
        },
      },
    })

    return { feedback: ApiFeedbackEnum.SUCCESS }
  }

  return { feedback: ApiFeedbackEnum.SUCCESS }
}

export const updateWalletAddress: core.NexusOutputFieldConfig<
  'Mutation',
  'updateWalletAddress'
> = {
  type: 'ApiCall',
  args: {
    ipfsHash: nonNull(stringArg()),
    nftId: nonNull(stringArg()),
    walletAddress: nonNull(stringArg()),
  },
  resolve: updateWalletAddressResolver,
}
