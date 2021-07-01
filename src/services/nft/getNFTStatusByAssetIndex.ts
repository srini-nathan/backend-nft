import { getAssetNFT } from '../utils/contractHelpers'
import provider from '../utils/ethers'

enum Status {
  'created',
  'minted',
  'listed',
  'unListed',
  'sold',
}

export const getNFTStatusByAssetIndex = async (assetIndex: number) => {
  let status
  try {
    status = await getAssetNFT(provider).getAssetNFTStatus(assetIndex)
    return Status[status]
  } catch (error) {
    throw new Error(error)
  }
}
