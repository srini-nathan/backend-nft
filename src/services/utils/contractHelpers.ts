import assetNFTAbi from '../../config/contracts/Asset.sol/Asset.json'
// import assetMarketPlaceAbi from '../../config/contracts/AssetMarketPlace.sol/AssetMarketPlace.json'
import assetDrivingAbi from '../../config/contracts/AssetDriving.sol/AssetDriving.json'

import { ethers, Signer } from 'ethers'
import { Provider } from '@ethersproject/abstract-provider'

const AssetDriving = process.env.AssetDriving ?? ''
const AssetMarketPlace = process.env.AssetMarketPlace ?? ''
const AssetNFT = process.env.AssetNFTData ?? ''

const getContract = (
  abiFile: any,
  address: string,
  signerOrProvider: Signer | Provider,
) => {
  return new ethers.Contract(address, abiFile.abi, signerOrProvider)
}

// export const getAssetMarketPlace = (signerOrProvider: Signer | Provider) => {
//   return getContract(assetMarketPlaceAbi, AssetMarketPlace, signerOrProvider)
// }

export const getAssetDriving = (signerOrProvider: Signer | Provider) => {
  return getContract(assetDrivingAbi, AssetDriving, signerOrProvider)
}

export const getAssetNFT = (signerOrProvider: Signer | Provider) => {
  return getContract(assetNFTAbi, AssetNFT, signerOrProvider)
}
