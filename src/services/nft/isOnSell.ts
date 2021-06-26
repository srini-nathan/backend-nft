import { BigNumber, BigNumberish } from 'ethers'
import { getAssetNFT } from '../utils/contractHelpers'
import provider from '../utils/ethers'

export const isOnSell = async (assetIndex: number): Promise<boolean> => {
  try {
    const tokenIdResp: BigNumber = await getAssetNFT(
      provider,
    ).getTokenIdByAssetIndex(assetIndex)
    const tokenId = tokenIdResp.toNumber()

    const status: boolean = await getAssetNFT(provider).isToSell(tokenId)
    return status
  } catch (error) {
    throw new Error(error)
  }
}
