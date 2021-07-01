import { objectType } from 'nexus'

export const NFTDetails = objectType({
  name: 'NFTDetails',
  definition(t) {
    t.nonNull.string('id')
    t.nonNull.string('ipfsHash')
    t.nonNull.string('assetIndex')
    t.nullable.string('walletAddress')
    t.nullable.string('nFTId')
  },
})
