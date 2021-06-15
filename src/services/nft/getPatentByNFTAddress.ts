import { getPatentNFTData } from '../utils/contractHelpers'
import provider from '../utils/ethers'
import { AllPatents } from './getAllPatents'

export interface MyPatents {
  patentNFT: string
}

export const getPatentByNFTAddress = async (
  nFTAddress: string,
): Promise<AllPatents> => {
  try {
    const myPatent = await getPatentNFTData(provider).getPatentByNFTAddress(
      nFTAddress,
    )

    return myPatent
  } catch (error) {
    throw new Error(error)
  }
}
