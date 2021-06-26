import { booleanArg, core, nonNull, nullable, stringArg } from 'nexus'
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
  isMinted?: boolean | null
  isAssetReady?: boolean | null
}

export const updateNFTResolver: core.FieldResolver<'Mutation', 'updateNFT'> =
  async (
    _parent: any,
    { nftId, ipfsHash, isMinted, isAssetReady }: IPFSHashParams,
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
          select: { isMinted: true, isAssetReady: true },
        },
      },
    })

    const isAssetReadyValue = isAssetReady ?? currentNFT?.ipfs[0].isAssetReady
    const isMintedValue = isMinted ?? currentNFT?.ipfs[0].isMinted

    if (nftId) {
      await context.prisma.nFT.update({
        where: { id: nftId },
        data: {
          ipfs: {
            update: {
              data: {
                isMinted: isMintedValue,
                isAssetReady: isAssetReadyValue,
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

export const updateNFT: core.NexusOutputFieldConfig<'Mutation', 'updateNFT'> = {
  type: 'ApiCall',
  args: {
    ipfsHash: nonNull(stringArg()),
    nftId: nonNull(stringArg()),
    isMinted: nullable(booleanArg()),
    isAssetReady: nullable(booleanArg()),
  },
  resolve: updateNFTResolver,
}
