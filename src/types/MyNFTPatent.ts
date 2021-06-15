import { objectType } from 'nexus'

export const MyNFTPatent = objectType({
  name: 'MyNFTPatent',
  definition(t) {
    t.nonNull.string('patentNFT')
    t.nonNull.string('patentNFTName')
    t.nonNull.string('patentNFTSymbol')
    t.nonNull.string('ownerAddress')
    t.nonNull.float('patentPrice')
    t.nonNull.string('ipfsHashOfItem')
    t.nonNull.string('status')
    t.nonNull.string('assetItem')
    t.nonNull.string('name')
    t.nonNull.string('description')
  },
})


