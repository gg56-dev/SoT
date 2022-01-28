#####  Commands for Rinkeby test network  #####
deploy-rinkeby:
	@echo "deploying contract on rinkeby network" 
	npm run deployer:rinkeby

verify-rinkeby-contract:
	@npx hardhat verify 0x81487d8C7157581027D361733B4C4E9473D0bcf4 --network rinkeby

# NOTE: Run command make upload-metadata before running make mint-rinkeby

mint-rinkeby:
	@npm run minter:rinkeby


#####  Commands for Ethereum Mainnet  #####
deploy-mainnet:
	@echo "deploying contract on Ethereum Mainnet" 
	npm run deployer:mainnet

verify-mainnet-contract:
	@npx hardhat verify 0x4e092edea66a55c8894b2475f09b2bcbfe70aff9 --network mainnet

mint-mainnet:
	@npm run minter:mainnet

#####  Commands for Polygon  #####

deploy-matic:
	@echo "deploying contract on Polygon"
	npm run deployer:matic

verify-matic-contract:
	@echo "Verifying contract on Polygon"
	npx hardhat verify 0xE08362f6083a3312cCa7C96f5E9bCbc8a2597ED4 --network matic

mint-matic:
	@npm run minter:matic


# NOTE: Run make upload-metadata before running make mint-mainnet

#####  Network Independent command, has to be used in both networks before minting  #####
upload-metadata:
	@npm run meta:uploader




