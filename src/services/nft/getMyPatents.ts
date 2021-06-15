import { AllPatents } from '../../types/AllPatents'
import { getPatentNFTData } from '../utils/contractHelpers'
import provider from '../utils/ethers'

export interface MyPatents {
  patentNFT: string
}

export const getMyPatents = async (ownerAddress: string): Promise<string[]> => {
  try {
    const allMyPatents: string[] = await getPatentNFTData(
      provider,
    ).getMyPatents(ownerAddress)

    return allMyPatents
  } catch (error) {
      throw new Error(error);
      
  }
}
