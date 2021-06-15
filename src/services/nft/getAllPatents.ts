import { AllPatents } from '../../types/AllPatents'
import { getPatentNFTData } from '../utils/contractHelpers'
import provider from '../utils/ethers';
import nodeFetch from "node-fetch";

export interface AllPatents {
  patentNFT: string
  patentNFTName: string
  patentNFTSymbol: string
  ownerAddress: string
  patentPrice: number
  ipfsHashOfItem: string
  status: string
  reputation: number
}

export const getAllPatents = async (
  ownerAddress?: string,
): Promise<AllPatents[]> => {
  console.log(ownerAddress);
  
  const allPatents = await getPatentNFTData(provider).getAllPatents()

    return allPatents
}