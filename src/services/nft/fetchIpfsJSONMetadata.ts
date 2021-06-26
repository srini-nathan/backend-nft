import { fetch } from 'apollo-env'

interface IPFSJsonMetadata {
  name: string
  description: string
  assetFileName: string
  image: string
  media: {
    dimensions: string
    mimeType: string
    size: number | undefined
  }
  authentication: {
    metaDataHash: string | undefined
    signature: string | undefined
    owner: string | undefined
  }
  patentId: string
}

const fetchMetaDataJson = async (
  ipfsHash: string,
): Promise<IPFSJsonMetadata> => {
  const res = await fetch(`https://gateway.pinata.cloud/ipfs/${ipfsHash}`)
  return res.json()
}

export const fetchIpfsJSONMetadata = async (ipfsHash: string) => {
  const nFTDetail =  await fetchMetaDataJson(ipfsHash)

  return nFTDetail
}
