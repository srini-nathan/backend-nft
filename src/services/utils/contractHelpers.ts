import patentNFTDataAbi from '../../config/contracts/PatentNFTData.sol/PatentNFTData.json'
import patentNFTMarketplaceAbi from '../../config/contracts/PatentNFTMarketPlace.sol/PatentNFTMarketplace.json'
import patentNFTFactoryAbi from '../../config/contracts/PatentNFTFactory.sol/PatentNFTFactory.json'
import { ethers,Signer } from 'ethers'
import { Provider } from '@ethersproject/abstract-provider'

const PatentNFTData = process.env.PatentNFTData ?? ''
const PatentNFTMarketplace = process.env.PatentNFTMarketplace ?? ''
const PatentNFTFactory = process.env.PatentNFTFactory ?? ''


const getContract = (abiFile: any, address: string, signerOrProvider:Signer | Provider) => {
  return new ethers.Contract(address, abiFile.abi, signerOrProvider)
}

export const getPatentNFTData = (signerOrProvider:Signer | Provider) => {
  return getContract(patentNFTDataAbi, PatentNFTData, signerOrProvider)
}

export const getPatentNFTMarketplace = (signerOrProvider:Signer | Provider) => {
  return getContract(patentNFTMarketplaceAbi, PatentNFTMarketplace, signerOrProvider)
}

export const getPatentNFTFactory = (signerOrProvider:Signer | Provider) => {
  return getContract(patentNFTFactoryAbi, PatentNFTFactory, signerOrProvider)
}

