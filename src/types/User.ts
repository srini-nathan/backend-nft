import { objectType } from 'nexus'

export const User = objectType({
  name: 'User',
  definition(t) {
    t.nonNull.string('id')
    t.nonNull.string('email')
    t.nonNull.boolean('active')
    t.nonNull.string('role')
    t.field('person', { type: 'Person' })
    t.field('nft', { type: 'NFT' })
  },
})
