import { getAssetNFT } from '../utils/contractHelpers'
import provider from '../utils/ethers'

export const getAssetByAssetId = async (assetIndex: number) => {
  try {
    const myAssetNFT = await getAssetNFT(provider).getAssetNFT(assetIndex)
    
    return myAssetNFT
  } catch (error) {
    throw new Error(error)
  }
}
