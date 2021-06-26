import { objectType } from 'nexus'

export const NFTDetails = objectType({
  name: 'NFTDetails',
  definition(t) {
    t.nonNull.string('id')
    t.nonNull.string('ipfsHash')
    t.nonNull.boolean('isMinted')
    t.nonNull.boolean('isAssetReady')
    t.nullable.string('nFTId')
  },
})
