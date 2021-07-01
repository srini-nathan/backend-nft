import { objectType } from 'nexus'

export const Authentication = objectType({
  name: 'Authentication',
  definition(t) {
    t.nullable.string('metaDataHash')
    t.nullable.string('signature')
    t.nullable.string('creator')
  },
})