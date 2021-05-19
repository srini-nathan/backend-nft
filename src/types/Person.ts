import { objectType } from 'nexus'

export const Person = objectType({
  name: 'Person',
  definition(t) {
    t.nonNull.string('id')
    t.nonNull.string('firstName')
    t.nonNull.string('lastName')
    t.nonNull.string('userId')
  },
})
