import { Context } from '../../context'
import { core, nonNull, stringArg } from 'nexus'
import { getUserId } from '../../utils'
import { enforceExists } from '../../common/errors/enforce'
import { ErrorCodesEnum } from '../ErrorCodes'
import NotFoundError from '../../common/errors/NotFoundError'
import { getAssetByAssetId } from '../../services/nft/getAssetByAssetId'
import { BigNumberish, ethers } from 'ethers'

enum Status {
  'created',
  'minted',
  'listed',
  'unListed',
  'sold',
}

interface MyAsset {
  _assetPrice: number
  _ipfsHash: string
  _ownerAddress: string
  _status: string
}

interface MyAsset_Resp {
  _assetPrice: BigNumberish
  _ipfsHash: string
  _ownerAddress: string
  _status: string
}

export const getMyNFTAssetByIndexResolver: core.FieldResolver<
  'Query',
  'getMyNFTAsset'
> = async (_, { assetIndex }, ctx: Context): Promise<MyAsset> => {
  const userId = getUserId(ctx)

  enforceExists(assetIndex, ErrorCodesEnum.FIELD_IS_REQUIRED, NotFoundError)

  const myAssetResp: MyAsset_Resp = await getAssetByAssetId(Number(assetIndex))

  const price = ethers.utils.formatEther(myAssetResp._assetPrice)

  const myAsset: MyAsset = {
    ...myAssetResp,
    _assetPrice: parseFloat(price),
    _status: Status[myAssetResp._status as any],
  }

  return myAsset
}

export const getMyNFTAssetByIndex: core.NexusOutputFieldConfig<
  'Query',
  'getMyNFTAsset'
> = {
  type: 'MyNFTAsset',
  args: { assetIndex: nonNull(stringArg()) },
  resolve: getMyNFTAssetByIndexResolver,
}
