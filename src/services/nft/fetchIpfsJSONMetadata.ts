import { fetch } from 'apollo-env'

interface IPFSJsonMetadata {
  name: string
  description: string
  image: string
}

const fetchMetaDataJson = async (
  ipfsHash: string,
): Promise<IPFSJsonMetadata> => {
  const res = await fetch(`https://gateway.pinata.cloud/ipfs/${ipfsHash}`)
  return res.json()
}

export const fetchIpfsJSONMetadata = async (ipfsHash: string) => {
  const {
    description,
    image: assetItem,
    name,
  } = await fetchMetaDataJson(ipfsHash)

  return { assetItem, description, name }
}
