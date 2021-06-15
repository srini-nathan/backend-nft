import { objectType } from 'nexus'
import { getAllUserResolver } from './queries/admin/getAllUser'
import { me } from './queries/meQuery'
import { getAllNFTPatents } from './queries/getAllNFTPatents'
import { getMyNFTDetails } from './queries/getMyNFTDetails'
import { getMyNFTPatents } from './queries/getMyNFTPatents'
import { getMyNFTPatent } from './queries/getMyNFTPatent'
import { getByIpfsHash } from './queries/getByIpfsHash'

export const Query = objectType({
  name: 'Query',
  definition: (t) => {
    t.list.field('getAllUser', { type: 'User', resolve: getAllUserResolver }),
      t.field('me', me),
      t.list.field('getAllNFTPatents', getAllNFTPatents),
      t.list.field('getMyNFTDetails', getMyNFTDetails)
      t.list.field('getMyNFTPatents', getMyNFTPatents)
      t.field('getMyNFTPatent', getMyNFTPatent)
      t.field('getByIpfsHash', getByIpfsHash)
  },
})
