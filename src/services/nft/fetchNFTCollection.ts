import { BigNumberish } from 'ethers'
import { getAssetNFT } from '../utils/contractHelpers'
import provider from '../utils/ethers'

export const fetchNFTCollection = async (caller: string) => {
  try {
    const myNFTCollection: BigNumberish[] =
      (await getAssetNFT(provider).getMyTokenCollection({ from: caller })) ?? []

    const myCollectables: string[] = myNFTCollection.map((asset) => {
      return asset.toString()
    })

    return myCollectables
  } catch (error) {
    throw new Error(error)
  }
}
