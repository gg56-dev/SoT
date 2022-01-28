# Upgradeable SOT NFT (ERC721 Token) 

## Introduction

This project includes the following:

1.  Upgradeable contract - Implemented through UUPS upgradeable proxy pattern (OpenZeppelin Standard)

2.  SOT NFT (ERC721 Token) - Including the NFT's metadata implementation 

3.  Scripts for deployment and upgradation of the smart contract 

4.  Script for uploading metadata files to a cloud service

5.  Script for minting tokens

6.  Unit and Integration Tests

## Project Setup

To get started with this project, follow these steps:
    
1.  Clone the repo

2.  Run `npm install` in the root of the repo

3.  Add a `secret.json` file in your root directory, where you'll store your wallet address, key and other sensitive data. The content should be similar to this: 

    ```
    {
    "key": "72c713be8b84f8b57424e77b0f4871656570e859fd5ae1b10f70710549307958",
    "infura_rinkeby": "https://rinkeby.infura.io/v3/334d5acc5f2c4ade90ce3dbb574da722",
    "infura_mainnet": "https://rinkeby.infura.io/v3/334d5acc5f2c4ade90ce3dbb574da722",
    "matic": "https://matic-mumbai.chainstacklabs.com",
    "wallet_address": "0x04b963C3488ff35eD61a606Bdad43dA8Fa089782",
    "sot_address": "0xEb9f057D38Fb8749f51ceF2734ef48fdC4b9AD47",
    "polygonscan_api_key":"JA3XKK2W38B5C89KAVZ74N3NY3RJ1GFHJS",
    "etherscan_api_key": "M89AQ4685VZHU7P7UX7AJX3U2K6A9AXNUD",
    "cloudinary_project_name": "dhxeeeqc8",
    "cloudinary_api_key": "833124778514185",
    "cloudinary_api_secret": "fPwARdu4Ht-ryEMvRloz9nEpU-k",
    "sotGas": 500000,
    "sotGasPrice": 1100000000
}
    ```
   > **Please Note:**  Change the matic-mumbai in the matic url to matic-mainnet for deployment on matic mainnet, also the key and wallet address.
   
4.  Run `npx hardhat compile` to get all the contracts compiled

5.  Run `make deploy-matic` to deploy your contract on matic network

6.  Paste the returned SOT Proxy address in secret.json file at sot_address.

7.  Add the metadata of all the SOTs in the `metadata.json` file. You can find this file in the data folder.

> **Please Note:** You need to provide the metadata in just one single file, with metadata of all the SOTs that are to be minted, placed in an array in metadata.json file. For your convenience, 5 such instances have been placed in the file. You just need to copy one and paste, depending on how much SOTs you want to mint. Also, please make sure to follow the format.

8.  Add your cloudinary_project_name, cloudinary_api_key and cloudinary_api_secret in the secret.json file. You can find these credentials on top left of your cloudinary dashboard after signing up there. It is where your metadata.json files will be uploaded.

9.  Run `make upload-metadata` to create separate metadata files and upload them to cloudinary. 

10.  Run `make mint-matic` to start minting on matic network. (Make sure that your sot_address in secret.json is the one returned on deployment)

> **Please Note:** The number of SOTs minted depends on the length of the metadata.json file. i.e. the number of metadata objects provided.

> **Please Note:** While your tokens are being minted, avoid to press Ctrl+C or such commands which terminate the minting process. In case you accidently come accross this situation, just go to opensea and check which tokens are minted. Remove them from your metadata.json file and run the minting command again. You should be good to go and resume the minting process from where it left.

## Defining the Royalty
Now, that you are done with minting your SOTs, its time to sell them on OpenSea with some royalty. In order to do that, you need to create a new collection on OpenSea (make sure you are connected to your metamask wallet), choose the tokens that will be used to buy and sell the SOTs, define the royalty, like 2.5% in addition to OpenSea's 2.5%, which will make the contract owner receive a royalty of 2.5% on each sale of the NFT. After creating the collection, you need to move your SOTs to this collection.

![Defining the royalty](https://res.cloudinary.com/dhxeeeqc8/image/upload/v1632995848/images/royalty.png)

> **THAT'S IT!  START TRADING!**

11. To verify your smart proxy contract visit `https://etherscan.io/proxyContractChecker` enter your proxy address to verify, If main contract is not verified you need to verify using make command.


12. To verify smart main contract,please your contract main address and then  run command depending on your network `Make verify-mainnet-contract`, now go back and run reverify `https://etherscan.io/proxyContractChecker` this time your contract will be verified.
