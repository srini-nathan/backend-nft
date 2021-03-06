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
  assetIndex: string
  nftId?: string | null
}

export const createIPFSHashResolver: core.FieldResolver<
  'Mutation',
  'createIPFSHash'
> = async (
  _parent: any,
  { ipfsHash, assetIndex, nftId }: IPFSHashParams,
  context: Context,
): Promise<IApiCall> => {
  enforceExists(ipfsHash, ErrorCodesEnum.FIELD_IS_REQUIRED, NotFoundError)
  enforceExists(assetIndex, ErrorCodesEnum.FIELD_IS_REQUIRED, NotFoundError)

  const userId = getUserId(context)
  if (nftId) {
    await context.prisma.nFT.update({
      where: { id: nftId },
      data: {
        ipfs: { create: { ipfsHash, assetIndex } },
      },
    })

    return { feedback: ApiFeedbackEnum.SUCCESS }
  }

  await context.prisma.nFT.create({
    data: {
      ipfs: { create: { ipfsHash, assetIndex } },
      user: { connect: { id: userId } },
    },
  })

  return { feedback: ApiFeedbackEnum.SUCCESS }
}

export const createIPFSHash: core.NexusOutputFieldConfig<
  'Mutation',
  'createIPFSHash'
> = {
  type: 'ApiCall',
  args: {
    ipfsHash: nonNull(stringArg()),
    assetIndex: nonNull(stringArg()),
    nftId: nullable(stringArg()),
  },
  resolve: createIPFSHashResolver,
}
