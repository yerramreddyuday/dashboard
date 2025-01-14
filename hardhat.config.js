/** @type import('hardhat/config').HardhatUserConfig */
require("@nomicfoundation/hardhat-toolbox");
require("@nomicfoundation/hardhat-ethers");
// require("@nomiclabs/hardhat-truffle5");
require("@nomicfoundation/hardhat-chai-matchers");
// require('hardhat-ethernal');
// require("hardhat-tracer");

module.exports = {
  solidity: {
    version: "0.8.20",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
  networks: {
    dojimachain: {
      // url: "http://localhost:8545",
      url: process.env.VITE_APP_DOJIMA_API_URL,
      chainId: 1001,
      // gas: 5000000, //units of gas you are willing to pay, aka gas limit
      gasPrice: 2000000000, // gas is typically in units of gwei, but you must enter it as wei here
      accounts: [process.env.VITE_APP_TEST_ACCOUNT_PVTKEY],
    },
    goerli: {
      // url: "http://localhost:9545",
      url: process.env.VITE_APP_ETH_GOERLI_ALCHEMY_URL,
      // chainId: 1337,
      // gas: 5000000, //units of gas you are willing to pay, aka gas limit
      gasPrice: 2000000000, // gas is typically in units of gwei, but you must enter it as wei here
      accounts: [process.env.VITE_APP_TEST_ACCOUNT_PVTKEY],
    },
    avalanche: {
      url: "http://127.0.0.1:9650/ext/bc/C/rpc",
      chainId: 43112,
      gas: 5000000, // units of gas you are willing to pay, aka gas limit
      gasPrice: 225000000000, // gas is typically in units of gwei, but you must enter it as wei here
    },
  },
  etherscan: {
    apiKey: {
      goerli: process.env.VITE_APP_ETH_ETHERSCAN_APIKEY,
      dojimachain: "dojima",
    },
    customChains: [
      {
        network: "dojimachain",
        chainId: 1001,
        urls: {
          apiURL: process.env.VITE_APP_DOJIMA_BLOCKSCOUT_URL,
          browserURL: process.env.VITE_APP_DOJIMA_BLOCKSCOUT_API_URL,
        },
      },
    ],
  },
};
