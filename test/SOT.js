require('mocha')
const assert = require('assert');
const { expect } = require('chai');
const hre = require('hardhat');
Web3 = require("web3");
web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
const {expectRevert} = require('@openzeppelin/test-helpers');

before('deploy', async function (){
    this.SotV1 = await ethers.getContractFactory('SOT');
    this.SotV2 = await ethers.getContractFactory('SOT2');
    this.proxy;
    this.upgraded_SOT;
    this.accounts = await hre.ethers.getSigners();
});

it('deploys the Proxy of the SOT Token', async function() {

    this.timeout(500000)
    this.proxy = await hre.upgrades.deployProxy(this.SotV1, {kind: 'uups'}); 
    await this.proxy.deployed();
    assert.equal(await this.proxy.name(), 'FingeRate')
    console.log('SOT Proxy Deployed!')

})

it('Upgrades the proxy to point to a newer version of the SOT Token', async function(){
    
    this.timeout(500000)
    this.upgraded_SOT = await hre.upgrades.upgradeProxy(this.proxy, this.SotV2)
    await this.upgraded_SOT.deployed();
    assert.equal(await this.upgraded_SOT.version(), 'v2');
    console.log("SOT Upgraded Successfully!")

})

it('deploys the proxy and the upgrade on the same address', async function(){
    assert.equal(this.proxy.address, this.upgraded_SOT.address)
    console.log("The Addresses: ");
    console.log("initial SOT Address: " + this.proxy.address);
    console.log("Upgrade SOT Address: " + this.upgraded_SOT.address)
})

it('should have the name FingerRate', async function() {

    this.timeout(500000)
    const name = await this.proxy.name();
    assert.equal(name, "FingeRate");

})

it('should have the symbol SOT', async function() {

    this.timeout(500000)
    const symbol = await this.proxy.symbol();
    assert.equal(symbol, "SOT");

})

it('should return the balance of the passed address', async function() {

    this.timeout(500000)
    const balance = await this.proxy.balanceOf("0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266");
    console.log("The balance of this address is: ")
    console.log(balance)

})

it('should not return the tokenURI of a token that does not exist', async function () {

    this.timeout(500000)
    await assert.rejects(() => this.proxy.tokenURI(1200001));

})

it('should mint a new token and increment the token id and the supply, and should set the token URI correctly', async function () {

    this.timeout(500000)
    const previousId = await this.proxy.getSotCount();
    const previousSupply = await this.proxy.totalSupply();
    await this.proxy.mint(this.accounts[0].address, "sample uri");
    const uri = await this.proxy.tokenURI(0);
    assert.equal(uri , "sample uri")
    const newId = await this.proxy.getSotCount();
    const newSupply = await this.proxy.totalSupply();
    assert.equal(web3.utils.toNumber(newId), web3.utils.toNumber(previousId) + 1)
    assert.equal(web3.utils.toNumber(newSupply), web3.utils.toNumber(previousSupply) + 1)

})


it('should burn a token and decrement the supply', async function () {

    this.timeout(500000)
    const previousSupply = await this.proxy.totalSupply();
    await this.proxy.burn(0);
    const newSupply = await this.proxy.totalSupply();
    assert.equal(web3.utils.toNumber(newSupply), web3.utils.toNumber(previousSupply) - 1)

})







