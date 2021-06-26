import { BigNumber } from 'ethers'
import { getAssetNFT } from '../utils/contractHelpers'
import provider from '../utils/ethers'

export const fetchTokenIdByAssetIndex = async (
  assetIndex: number,
): Promise<string | undefined> => {
  let tokenId: BigNumber
  try {
    tokenId = await getAssetNFT(provider).getTokenIdByAssetIndex(assetIndex)
    return tokenId.toString() ?? null
  } catch (error) {
    console.log(error)
  }
}
