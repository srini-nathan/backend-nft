import { InfuraProvider } from '@ethersproject/providers'

const provider = new InfuraProvider('ropsten', `${process.env.INFURA_API_KEY}`)

export default provider
