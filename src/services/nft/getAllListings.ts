import provider from '../utils/ethers'
import { getAssetNFT } from '../utils/contractHelpers'
import { BigNumber, BigNumberish, ethers } from 'ethers'

export interface listOfSales {
  tokenId: BigNumber
  price: BigNumber
}
export interface AssetInSale {
  assetIndex: string
  price: string
}

const getAssetIndex = async (tokenId: BigNumber): Promise<string> => {
  return (
    await getAssetNFT(provider).getAssetIndexByTokenId(tokenId)
  ).toString()
}

export const getAllListings = async () => {
  const listOfAssetsInSale: listOfSales[] =
    (await getAssetNFT(provider).getAllListings()) ?? []

  const assetInSale = listOfAssetsInSale.map(async (asset) => {
    return {
      assetIndex: await getAssetIndex(asset.tokenId),
      price: ethers.utils.formatEther(asset.price.toString()),
    }
  })

  return Promise.all(assetInSale) ?? []
}
