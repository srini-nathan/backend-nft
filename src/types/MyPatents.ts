import { objectType } from 'nexus'

export const MyPatents = objectType({
  name: 'MyPatents',
  definition(t) {
    t.list.nonNull.string('patentNFT')
  },
})
