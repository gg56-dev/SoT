const { getNetwork } = require('@ethersproject/networks');
const {HardhatUserConfig} = require('hardhat/types')
require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-ethers");
require("@openzeppelin/hardhat-upgrades");
require("solidity-coverage");
require("@nomiclabs/hardhat-etherscan");
let secret = require('./secret')
// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();
  
  for (const account of accounts) {
    console.log(account.address);
    
  }
});

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: {
    version: "0.8.2",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  },
  networks: {
    
    rinkeby: {
      url: secret.infura_rinkeby, //Infura url with projectId
      accounts: [secret.key] // add the account that will deploy the contract (private key)
    },
    mainnet: {
      url: secret.infura_mainnet, //Infura url with projectId
      accounts: [secret.key] // add the account that will deploy the contract (private key)
    },
    matic: {
      url: secret.matic,
      accounts: [secret.key],
      gasPrice: secret.sotGasPrice
    }
     
  },
  etherscan: {
    apiKey: secret.polygonscan_api_key
  }
};
