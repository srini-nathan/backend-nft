import { Context } from '../../context'
import { core, nonNull, stringArg } from 'nexus'
import { getUserId } from '../../utils'
import { enforce, enforceExists } from '../../common/errors/enforce'
import { ErrorCodesEnum } from '../ErrorCodes'
import NotFoundError from '../../common/errors/NotFoundError'
import { isAddress } from 'web3-utils'
import ForbiddenError from '../../common/errors/ForbiddenError'
import { getPatentByNFTAddress } from '../../services/nft/getPatentByNFTAddress'
import parseBalance from '../../common/parseBalance'
import { fetchIpfsJSONMetadata } from '../../services/nft/fetchIpfsJSONMetadata'

export interface MyPatent {
  patentNFT: string
  patentNFTName: string
  patentNFTSymbol: string
  ownerAddress: string
  patentPrice: number
  ipfsHashOfItem: string
  status: string
  assetItem: string
  name: string
  description: string
}

export const getMyNFTPatentResolver: core.FieldResolver<
  'Query',
  'getMyNFTPatent'
> = async (_, { patentNFTAddress }, ctx: Context): Promise<MyPatent> => {
  const userId = getUserId(ctx)

  enforceExists(
    patentNFTAddress,
    ErrorCodesEnum.FIELD_IS_REQUIRED,
    NotFoundError,
  )
  enforce(
    isAddress(patentNFTAddress),
    ErrorCodesEnum.INVALID_ACCOUNT_ADDRESS,
    ForbiddenError,
  )

  const result = await getPatentByNFTAddress(patentNFTAddress)
  const ipfsItem = await fetchIpfsJSONMetadata(result.ipfsHashOfItem)

  const myPatent = {
    ...ipfsItem,
    ...result,
    patentPrice: parseFloat(parseBalance(result.patentPrice)),
  }
  return myPatent
}

export const getMyNFTPatent: core.NexusOutputFieldConfig<
  'Query',
  'getMyNFTPatent'
> = {
  type: 'MyNFTPatent',
  args: { patentNFTAddress: nonNull(stringArg()) },
  resolve: getMyNFTPatentResolver,
}
