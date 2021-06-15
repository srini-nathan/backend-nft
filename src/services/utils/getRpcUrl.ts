const getNodeUrl = () => {
    const RPC_URL = `https://ropsten.infura.io/v3/${process.env.INFURA_API_KEY}`
    return RPC_URL
  }

  export default getNodeUrl