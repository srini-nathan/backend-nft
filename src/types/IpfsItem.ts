import { objectType } from 'nexus'

export const IpfsItem = objectType({
  name: 'IpfsItem',
  definition(t) {
    t.nonNull.string('image')
    t.nonNull.string('description')
    t.nonNull.string('name')
    t.nonNull.string('assetFileName')
    t.nonNull.string('patentId')
    t.nonNull.field('media', {type: 'Media'})
    t.nonNull.field('authentication', {type: 'Authentication'})
  },
})