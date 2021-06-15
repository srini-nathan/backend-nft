import { Ipfs } from '.prisma/client'
import { objectType } from 'nexus'

export const NFT = objectType({
  name: 'NFT',
  definition(t) {
    t.nonNull.string('id')
    t.nonNull.string('userId')
    t.list.field('ipfs', { type: 'NFTDetails' })
  },
})



export interface NFT {
    id: string;
    userId: string
    ipfs: Ipfs[];
  }