import { objectType } from 'nexus'

export const MyNFTAsset = objectType({
  name: 'MyNFTAsset',
  definition(t) {
    t.nonNull.float('_assetPrice')
    t.nonNull.string('_ipfsHash')
    t.nonNull.string('_ownerAddress')
    t.nonNull.string('_status')
  },
})
