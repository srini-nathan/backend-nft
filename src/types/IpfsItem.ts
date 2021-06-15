import { objectType } from 'nexus'

export const IpfsItem = objectType({
  name: 'IpfsItem',
  definition(t) {
    t.nonNull.string('assetItem')
    t.nonNull.string('description')
    t.nonNull.string('name')
  },
})
