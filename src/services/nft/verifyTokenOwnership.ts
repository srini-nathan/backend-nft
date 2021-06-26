import { BigNumber } from 'ethers'
import { getAssetNFT } from '../utils/contractHelpers'
import provider from '../utils/ethers'

export const verifyTokenOwnership = async (assetIndex: number): Promise<string> => {
  try {
    const tokenIdResp: BigNumber = await getAssetNFT(
      provider,
    ).getTokenIdByAssetIndex(assetIndex)
    const tokenId = tokenIdResp.toNumber()

    const status: string = await getAssetNFT(provider).ownerOf(tokenId)
    return status
  } catch (error) {
    throw new Error(error)
  }
}
