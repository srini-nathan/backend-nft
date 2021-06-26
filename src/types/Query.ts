import { objectType } from 'nexus'
import { getAllUserResolver } from './queries/admin/getAllUser'
import { me } from './queries/meQuery'
import { getAllNFTPatents } from './queries/getAllNFTPatents'
import { getMyNFTDetails } from './queries/getMyNFTDetails'
import { getMyNFTPatents } from './queries/getMyNFTPatents'
import { getMyNFTPatent } from './queries/getMyNFTPatent'
import { getByIpfsHash } from './queries/getByIpfsHash'
import { getMyNFTAssetByIndex } from './queries/getMyNFTAssetByIndex'
import { getAllListingsInSale } from './queries/getAllListingsInSale'
import { getTokenIdByAssetIndex } from './queries/getTokenIdByAssetIndex'
import { verifyAssetIsOnSale } from './queries/verifyAssetIsOnSale'
import { getTokenOwnership } from './queries/getTokenOwnership'
import { fetchAssetsByUser } from './queries/fetchAssetsByUser'

export const Query = objectType({
  name: 'Query',
  definition: (t) => {
    t.list.field('getAllUser', { type: 'User', resolve: getAllUserResolver })
    t.field('me', me)
    t.list.field('getAllNFTPatents', getAllNFTPatents)
    t.list.field('getMyNFTDetails', getMyNFTDetails)
    t.list.field('getMyNFTPatents', getMyNFTPatents)
    t.field('getMyNFTPatent', getMyNFTPatent)
    t.field('getByIpfsHash', getByIpfsHash)
    t.field('getMyNFTAsset', getMyNFTAssetByIndex)
    t.list.field('getAllListings', getAllListingsInSale)
    t.field('getTokenIdByAssetIndex', getTokenIdByAssetIndex)
    t.field('verifyAssetIsOnSale', verifyAssetIsOnSale)
    t.field('getTokenOwnership', getTokenOwnership)
    t.list.field('getAssetsByUser', fetchAssetsByUser)
  },
})
