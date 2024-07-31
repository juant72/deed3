/** @type import('hardhat/config').HardhatUserConfig */
require('dotenv').config();

//const { network } = require('hardhat');


const PRIVATE_KEY = process.env.PRIVATE_KEY;
const RPC_URL = process.env.RPC_URL;

module.exports = {  
  defaultNetwork: "polygon_amoy",
  networks: {
    hardhat: {
      chainId: 80001,
    },
    polygon_amoy: {
      url: RPC_URL,
      accounts: [`0x${PRIVATE_KEY}`],
    },
  },
  solidity: {
    version: "0.8.9",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
};
