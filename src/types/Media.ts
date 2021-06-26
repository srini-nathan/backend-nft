import { objectType } from 'nexus'

export const Media = objectType({
  name: 'Media',
  definition(t) {
    t.nonNull.string('dimensions')
    t.nonNull.string('mimeType')
    t.nullable.int('size')
  },
})
