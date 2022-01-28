//Imports
require("dotenv").config()
let secret = require('../secret')
const API_URL = process.env.API_URL
const Web3 = require("web3");
const contractAddress = secret.sot_address;
const minterAddress = secret.wallet_address;
var cloudinary = require('cloudinary').v2;
let json = require('../data/metadata.json');
var fs = require('fs');
var path = require('path')
const contract = require("../artifacts/contracts/SOT.sol/SOT.json");
const { start } = require("repl");
const { ethers } = require("hardhat");
var hre = require('hardhat')
var web3;
var nftContract;
var nonce;
var tokenURIs = [];


//Network related imports
var PRIVATE_KEY;
var ethNetwork;

if(hre.network.name == "rinkeby"){

  PRIVATE_KEY = secret.key;
  ethNetwork = secret.infura_rinkeby;
}

else if(hre.network.name == "mainnet"){

  PRIVATE_KEY = secret.key;
  ethNetwork = secret.infura_mainnet;

}

else if(hre.network.name == "matic"){
  PRIVATE_KEY = secret.key;
  ethNetwork = secret.matic;
}

//Configuring cloudinary
cloudinary.config({ 
    cloud_name: secret.cloudinary_project_name, 
    api_key: secret.cloudinary_api_key, 
    api_secret: secret.cloudinary_api_secret,
    secure: true
});

//Calling begin()
begin();

//Function where the script starts
async function begin(){
  console.log("\nGetting tokenURIs ...")
  await getTokenURIs();
  console.log("\nStarted Minting ...")
  startMinting();

}

//Starting the minting process
async function startMinting(){

  //Minting to the length of tokenURIs array
  for(var i = 0; i < tokenURIs.length; i++){
    var UUID = json[i].attributes[3].value;
    console.log("\nMinting token "+ UUID + " ...")
    await mintSOT(minterAddress, tokenURIs[i], i);
  }

}

//Filling the tokenURIs array through this method
async function getTokenURIs(){
  
  var data = {}

  //running the loop to the length of the metadata.json file
  for(var i = 0; i< json.length; i++){
      var UUID = json[i].attributes[3].value;
      data = {};
      var attributes = []
      for(var j = 0; j< json[i].attributes.length-1; j++){
          attributes.push(json[i].attributes[j])
      }
      var obj = {"attributes": attributes,  "description": json[i].description, "image": json[i].image, "name": json[i].name};
      data = obj
      var filepath = `metadataFiles/${UUID}.json`;
      await createAndUploadFile(filepath, data, UUID, i); 
  }

}

//create and upload metadata file here
async function createAndUploadFile(filepath, data, UUID, i){

  await createMetadataFile(filepath, JSON.stringify(data));
  var url = await uploadMetadataFile(filepath, UUID);
  tokenURIs.push(url);
  
}

//create the metadata file here
async function createMetadataFile(filepath, data){

  await fs.writeFile (filepath, data, function(err){});
  
}

//Upload the metadata file to cloudinary
async function uploadMetadataFile(filepath, UUID){
  
  var resultJSON = await cloudinary.uploader.upload(filepath, {resource_type: "raw", public_id: `${UUID}`});
  return resultJSON.secure_url;
  
}

//The function that interacts with the network to mint tokens
async function mintSOT(minterAddress, tokenURI, i){

  try {

    //Connecting to the network
    web3 = new Web3(new Web3.providers.HttpProvider(ethNetwork));
    //Connecting to our SOT Proxy Contract
    nftContract = new web3.eth.Contract(contract.abi, contractAddress);
    //Getting the nonce value for a new transaction
    nonce = await web3.eth.getTransactionCount(minterAddress, "latest")

    //Creating transaction object
    const tx = 
    {
      from: minterAddress, //The address of the person who is minting
      to: contractAddress, //The address of the deployed SOT Proxy Contract
      nonce: nonce, //Number of transaction that have been performed on the network so far
      gas: secret.sotGas,  
      gasPrice: secret.sotGasPrice,
      data: nftContract.methods.mint(minterAddress, tokenURI).encodeABI(), //Passing the contract method to be called in data of the transaction
    }

    //Signing the transaction
    const signPromise = await web3.eth.accounts.signTransaction(tx, PRIVATE_KEY)
    //Sending the signed transaction to the network
    const receipt = await web3.eth.sendSignedTransaction(signPromise.rawTransaction);
            
  }
  catch(e) {
      console.log("Connection Error!", e);
  }

}









