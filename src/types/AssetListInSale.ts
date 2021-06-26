import { objectType } from 'nexus'

export const AssetListInSale = objectType({
  name: 'AssetListInSale',
  definition(t) {
    t.nonNull.string('assetIndex');
    t.nonNull.string('price');
  },
})