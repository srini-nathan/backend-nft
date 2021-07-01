import { getAssetNFT } from '../utils/contractHelpers'
import provider from '../utils/ethers'

export const verifyAccountHasMintRole = async (
  accountAddress: string,
): Promise<boolean> => {
  try {
    const hasMintRole: boolean = await getAssetNFT(provider).hasMinterRole(
      accountAddress,
    )
    return hasMintRole
  } catch (error) {
    throw new Error(error)
  }
}
